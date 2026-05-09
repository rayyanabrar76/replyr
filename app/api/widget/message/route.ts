import { NextResponse, type NextRequest } from 'next/server'
import { z } from 'zod'
import { bookAppointment } from '@/lib/agent/book-appointment'
import { extractBookingIntent } from '@/lib/agent/extract-booking'
import { generateAgentReply } from '@/lib/agent/respond'
import { createServiceClient } from '@/lib/supabase/service'

const schema = z.object({
  apiKey: z.string().min(1),
  conversationId: z.string().uuid(),
  message: z.string().min(1).max(4000),
})

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

export async function OPTIONS() {
  return new NextResponse(null, { headers: corsHeaders })
}

export async function POST(request: NextRequest) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return json({ error: 'Invalid JSON body' }, 400)
  }

  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return json({ error: 'Invalid request', issues: parsed.error.issues }, 400)
  }

  const { apiKey, conversationId, message } = parsed.data
  const supabase = createServiceClient()

  // 1. Load conversation
  const { data: convo } = await supabase
    .from('conversations')
    .select('id, lead_id, business_id')
    .eq('id', conversationId)
    .maybeSingle()

  if (!convo) {
    return json({ error: 'Conversation not found' }, 404)
  }

  // Auto-promote lead from 'new' -> 'qualifying' on first follow-up message
  await supabase
    .from('leads')
    .update({ status: 'qualifying' })
    .eq('id', convo.lead_id)
    .eq('status', 'new')

  // 2. Load business and verify API key
  const { data: business } = await supabase
    .from('businesses')
    .select(
      'id, widget_api_key, name, industry, phone, website, services, business_hours, faqs, service_area_zips, agent_name, agent_tone, agent_instructions, google_refresh_token, google_calendar_id'
    )
    .eq('id', convo.business_id)
    .maybeSingle()

  if (!business) {
    return json({ error: 'Business not found' }, 404)
  }

  if (business.widget_api_key !== apiKey) {
    return json({ error: 'API key mismatch' }, 401)
  }

  const calendarConnected = Boolean(business.google_refresh_token)

  // 3. Load lead for contact context
  const { data: lead } = await supabase
    .from('leads')
    .select('contact_name, contact_email, contact_phone, zip_code')
    .eq('id', convo.lead_id)
    .maybeSingle()

  if (!lead) {
    return json({ error: 'Lead not found' }, 404)
  }

  // 4. Save the user message
  await supabase.from('messages').insert({
    conversation_id: conversationId,
    role: 'user',
    content: message,
  })

  // 5. Load history for context
  const { data: historyRaw } = await supabase
    .from('messages')
    .select('role, content')
    .eq('conversation_id', conversationId)
    .order('created_at', { ascending: true })

  // Drop the message we just inserted (we pass it as newUserMessage to the agent)
  const history = (historyRaw ?? []) as Array<{
    role: 'user' | 'assistant' | 'system' | 'tool'
    content: string
  }>
  const priorHistory = history.slice(0, -1)
  const userAssistantOnly = priorHistory.filter(
    (m): m is { role: 'user' | 'assistant'; content: string } =>
      m.role === 'user' || m.role === 'assistant'
  )

  // 6. Generate reply
  let assistantReply: string
  try {
    assistantReply = await generateAgentReply({
      business,
      history: priorHistory,
      newUserMessage: message,
      contact: {
        name: lead.contact_name,
        email: lead.contact_email,
        phone: lead.contact_phone,
        zipCode: lead.zip_code,
      },
      calendarConnected,
    })
  } catch (err) {
    console.error('[widget/message] agent error:', err)
    assistantReply = "Thanks — a team member will follow up shortly."
  }

  // 7. Save reply + bump conversation timestamp
  await supabase.from('messages').insert({
    conversation_id: conversationId,
    role: 'assistant',
    content: assistantReply,
  })

  await supabase
    .from('conversations')
    .update({ last_message_at: new Date().toISOString() })
    .eq('id', conversationId)

  // 8. Best-effort booking detection (no await — let the response return immediately)
  if (calendarConnected && business.google_calendar_id && business.google_refresh_token) {
    void attemptBooking({
      history: userAssistantOnly,
      newUserMessage: message,
      newAssistantReply: assistantReply,
      businessId: business.id,
      businessName: business.name,
      leadId: convo.lead_id,
      contactName: lead.contact_name,
      contactEmail: lead.contact_email,
      contactPhone: lead.contact_phone,
      refreshToken: business.google_refresh_token,
      calendarId: business.google_calendar_id,
    })
  }

  return json({ reply: assistantReply })
}

interface AttemptBookingArgs {
  history: { role: 'user' | 'assistant'; content: string }[]
  newUserMessage: string
  newAssistantReply: string
  businessId: string
  businessName: string
  leadId: string
  contactName: string | null
  contactEmail: string | null
  contactPhone: string | null
  refreshToken: string
  calendarId: string
}

async function attemptBooking(args: AttemptBookingArgs) {
  try {
    const todayISO = new Date().toISOString().slice(0, 10)
    const intent = await extractBookingIntent({
      history: args.history,
      newUserMessage: args.newUserMessage,
      newAssistantReply: args.newAssistantReply,
      todayISO,
    })
    if (!intent) return

    await bookAppointment(intent, {
      businessId: args.businessId,
      businessName: args.businessName,
      leadId: args.leadId,
      contactName: args.contactName,
      contactEmail: args.contactEmail,
      contactPhone: args.contactPhone,
      refreshToken: args.refreshToken,
      calendarId: args.calendarId,
    })
  } catch (err) {
    console.error('[attemptBooking] failed:', err)
  }
}

function json(body: unknown, status = 200) {
  return NextResponse.json(body, { status, headers: corsHeaders })
}
