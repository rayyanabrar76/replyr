import { NextResponse, type NextRequest } from 'next/server'
import { z } from 'zod'
import { bookAppointment } from '@/lib/agent/book-appointment'
import { extractBookingIntent } from '@/lib/agent/extract-booking'
import { generateAgentReply } from '@/lib/agent/respond'
import { createServiceClient } from '@/lib/supabase/service'

const schema = z.object({
  apiKey: z.string().min(1),
  contactName: z.string().min(1).max(120),
  contactEmail: z.string().email().optional().or(z.literal('')).nullable(),
  contactPhone: z.string().max(40).optional().or(z.literal('')).nullable(),
  zipCode: z.string().max(20).optional().or(z.literal('')).nullable(),
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

  const { apiKey, contactName, contactEmail, contactPhone, zipCode, message } = parsed.data
  const supabase = createServiceClient()

  // Look up the business by widget API key
  const { data: business, error: bErr } = await supabase
    .from('businesses')
    .select(
      'id, name, industry, phone, website, services, business_hours, faqs, service_area_zips, agent_name, agent_tone, agent_instructions, google_refresh_token, google_calendar_id'
    )
    .eq('widget_api_key', apiKey)
    .maybeSingle()

  if (bErr || !business) {
    return json({ error: 'Invalid widget API key' }, 401)
  }

  const calendarConnected = Boolean(business.google_refresh_token)

  // Create the lead
  const { data: lead, error: lErr } = await supabase
    .from('leads')
    .insert({
      business_id: business.id,
      source: 'web_form',
      contact_name: contactName,
      contact_email: contactEmail || null,
      contact_phone: contactPhone || null,
      zip_code: zipCode || null,
      initial_message: message,
      status: 'new',
    })
    .select('id')
    .single()

  if (lErr || !lead) {
    return json({ error: 'Failed to create lead' }, 500)
  }

  // Create the conversation
  const { data: conversation, error: cErr } = await supabase
    .from('conversations')
    .insert({
      lead_id: lead.id,
      business_id: business.id,
      channel: 'web_chat',
      status: 'active',
      last_message_at: new Date().toISOString(),
    })
    .select('id')
    .single()

  if (cErr || !conversation) {
    return json({ error: 'Failed to create conversation' }, 500)
  }

  // Save the user's first message
  await supabase.from('messages').insert({
    conversation_id: conversation.id,
    role: 'user',
    content: message,
  })

  // Generate agent reply
  let assistantReply: string
  try {
    assistantReply = await generateAgentReply({
      business,
      history: [],
      newUserMessage: message,
      contact: {
        name: contactName,
        email: contactEmail || null,
        phone: contactPhone || null,
        zipCode: zipCode || null,
      },
      calendarConnected,
    })
  } catch (err) {
    console.error('[widget/submit] agent error:', err)
    assistantReply =
      "Thanks for reaching out! We've got your message — a team member will follow up shortly."
  }

  // Save the agent reply
  await supabase.from('messages').insert({
    conversation_id: conversation.id,
    role: 'assistant',
    content: assistantReply,
  })

  await supabase
    .from('conversations')
    .update({ last_message_at: new Date().toISOString() })
    .eq('id', conversation.id)

  // Best-effort: try to detect a booking intent + auto-book if Calendar is connected.
  // Failures here shouldn't break the customer's chat reply.
  if (calendarConnected && business.google_calendar_id && business.google_refresh_token) {
    void attemptBooking({
      history: [],
      newUserMessage: message,
      newAssistantReply: assistantReply,
      businessId: business.id,
      businessName: business.name,
      leadId: lead.id,
      contactName,
      contactEmail: contactEmail || null,
      contactPhone: contactPhone || null,
      refreshToken: business.google_refresh_token,
      calendarId: business.google_calendar_id,
    })
  }

  return json({
    conversationId: conversation.id,
    reply: assistantReply,
  })
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
