import { NextResponse, type NextRequest } from 'next/server'
import { z } from 'zod'
import { generateAgentReply } from '@/lib/agent/respond'
import { buildForwardingAddress, sendEmail } from '@/lib/email'
import { createServiceClient } from '@/lib/supabase/service'

export const runtime = 'nodejs'

// Generic schema. Most providers send a flatter shape — we accept several
// common variants. Resend Inbound and SendGrid Parse / Mailgun all roughly fit.
const schema = z
  .object({
    from: z
      .union([
        z.string(),
        z.object({ email: z.string(), name: z.string().optional() }),
      ])
      .optional(),
    sender: z.string().optional(),
    to: z
      .union([
        z.string(),
        z.array(z.union([z.string(), z.object({ email: z.string() })])),
      ])
      .optional(),
    recipient: z.string().optional(),
    subject: z.string().optional(),
    text: z.string().optional(),
    'body-plain': z.string().optional(),
    html: z.string().optional(),
  })
  .passthrough()

function extractEmail(value: unknown): string | null {
  if (!value) return null
  if (typeof value === 'string') {
    // "Name <email@host>" or "email@host"
    const angle = value.match(/<([^>]+)>/)?.[1]
    if (angle) return angle.toLowerCase()
    if (value.includes('@')) return value.trim().toLowerCase()
    return null
  }
  if (Array.isArray(value)) {
    for (const v of value) {
      const got = extractEmail(v)
      if (got) return got
    }
    return null
  }
  if (typeof value === 'object' && value !== null && 'email' in value) {
    const e = (value as { email: unknown }).email
    if (typeof e === 'string') return e.toLowerCase()
  }
  return null
}

function extractName(value: unknown): string | null {
  if (typeof value === 'string') {
    const m = value.match(/^([^<]+)<[^>]+>/)
    if (m) return m[1].trim().replace(/^"|"$/g, '')
    return null
  }
  if (typeof value === 'object' && value !== null && 'name' in value) {
    const n = (value as { name: unknown }).name
    if (typeof n === 'string') return n
  }
  return null
}

export async function POST(request: NextRequest) {
  // Shared-secret check — set INBOUND_EMAIL_WEBHOOK_SECRET, configure your
  // email provider to send "Authorization: Bearer <secret>".
  const expected = process.env.INBOUND_EMAIL_WEBHOOK_SECRET
  if (expected) {
    const authHeader = request.headers.get('authorization') ?? ''
    const presented = authHeader.replace(/^Bearer\s+/i, '')
    if (presented !== expected) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  }

  // Accept both JSON and form-encoded payloads (Mailgun uses form-encoded)
  let body: Record<string, unknown> = {}
  const contentType = request.headers.get('content-type') ?? ''

  try {
    if (contentType.includes('application/json')) {
      body = (await request.json()) as Record<string, unknown>
    } else if (contentType.includes('application/x-www-form-urlencoded')) {
      const form = await request.formData()
      body = Object.fromEntries(form.entries()) as Record<string, unknown>
    } else {
      body = (await request.json()) as Record<string, unknown>
    }
  } catch {
    return NextResponse.json({ error: 'Could not parse body' }, { status: 400 })
  }

  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
  }

  const data = parsed.data
  const fromEmail = extractEmail(data.from ?? data.sender)
  const fromName = extractName(data.from)
  const toEmail = extractEmail(data.to ?? data.recipient)
  const subject = data.subject ?? '(no subject)'
  const text = data.text ?? data['body-plain'] ?? ''

  if (!fromEmail || !toEmail) {
    return NextResponse.json({ error: 'Missing from/to' }, { status: 400 })
  }

  // Identify business by slug — local part of the inbound address
  const slug = toEmail.split('@')[0]
  const supabase = createServiceClient()

  const { data: business } = await supabase
    .from('businesses')
    .select(
      'id, name, industry, phone, website, services, business_hours, faqs, service_area_zips, agent_name, agent_tone, agent_instructions, google_refresh_token, forwarding_email_slug'
    )
    .eq('forwarding_email_slug', slug)
    .maybeSingle()

  if (!business) {
    // Don't tell senders the address doesn't exist — return 200 silently
    return NextResponse.json({ received: true })
  }

  // Create lead + conversation + initial message in one go
  const { data: lead } = await supabase
    .from('leads')
    .insert({
      business_id: business.id,
      source: 'email',
      contact_name: fromName ?? null,
      contact_email: fromEmail,
      initial_message: `${subject}\n\n${text}`.trim(),
      status: 'new',
    })
    .select('id')
    .single()

  if (!lead) {
    return NextResponse.json({ error: 'Failed to create lead' }, { status: 500 })
  }

  const { data: conversation } = await supabase
    .from('conversations')
    .insert({
      lead_id: lead.id,
      business_id: business.id,
      channel: 'email',
      status: 'active',
      last_message_at: new Date().toISOString(),
    })
    .select('id')
    .single()

  if (!conversation) {
    return NextResponse.json({ error: 'Failed to create conversation' }, { status: 500 })
  }

  await supabase.from('messages').insert({
    conversation_id: conversation.id,
    role: 'user',
    content: text || subject,
  })

  // Generate agent reply
  let reply: string
  try {
    reply = await generateAgentReply({
      business,
      history: [],
      newUserMessage: text || subject,
      contact: {
        name: fromName,
        email: fromEmail,
        phone: null,
        zipCode: null,
      },
      calendarConnected: Boolean(business.google_refresh_token),
    })
  } catch (err) {
    console.error('[email webhook] agent error:', err)
    reply = `Thanks for reaching out to ${business.name} — a team member will follow up shortly.`
  }

  await supabase.from('messages').insert({
    conversation_id: conversation.id,
    role: 'assistant',
    content: reply,
  })

  await supabase
    .from('conversations')
    .update({ last_message_at: new Date().toISOString() })
    .eq('id', conversation.id)

  // Send the reply back via email — best effort
  if (process.env.RESEND_API_KEY && business.forwarding_email_slug) {
    try {
      await sendEmail({
        from: `${business.name} <${buildForwardingAddress(business.forwarding_email_slug)}>`,
        to: fromEmail,
        subject: subject.startsWith('Re:') ? subject : `Re: ${subject}`,
        text: reply,
      })
    } catch (err) {
      console.error('[email webhook] send failed:', err)
    }
  }

  return NextResponse.json({ received: true, leadId: lead.id })
}
