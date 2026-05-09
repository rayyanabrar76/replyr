import { createCalendarEvent } from '@/lib/google-calendar'
import { createServiceClient } from '@/lib/supabase/service'
import type { BookingIntent } from './extract-booking'

export interface BookContext {
  businessId: string
  businessName: string
  leadId: string
  contactName: string | null
  contactEmail: string | null
  contactPhone: string | null
  contactAddress?: string | null
  refreshToken: string
  calendarId: string
  timeZone?: string // IANA, e.g. 'America/Chicago'. Falls back to UTC.
}

export interface BookResult {
  appointmentId: string
  googleEventId: string
  htmlLink: string
  scheduledAt: string
}

function toLocalISO(date: string, time: string, timeZone: string): {
  startISO: string
  endISO: string
} {
  // Build a "wall clock" datetime string. The Calendar API will interpret this
  // as the given timeZone. Default duration handled by caller.
  const startISO = `${date}T${time}:00`
  const endISO = startISO // placeholder; caller adjusts via duration
  return { startISO, endISO }
}

export async function bookAppointment(
  intent: BookingIntent,
  ctx: BookContext
): Promise<BookResult> {
  const tz = ctx.timeZone ?? 'America/Chicago'
  const duration = intent.duration_minutes ?? 60

  const { startISO } = toLocalISO(intent.date, intent.time, tz)
  // Compute end by adding minutes — keep timezone-naive string format
  const [datePart, timePart] = startISO.split('T')
  const [hh, mm] = timePart.split(':').map((n) => parseInt(n, 10))
  const totalMinutes = hh * 60 + mm + duration
  const endHH = Math.floor(totalMinutes / 60)
    .toString()
    .padStart(2, '0')
  const endMM = (totalMinutes % 60).toString().padStart(2, '0')
  const endISO = `${datePart}T${endHH}:${endMM}:00`

  const summary = `${intent.service_type} — ${ctx.contactName ?? 'Customer'}`
  const descriptionLines = [
    `Customer: ${ctx.contactName ?? 'Unknown'}`,
    ctx.contactPhone ? `Phone: ${ctx.contactPhone}` : null,
    ctx.contactEmail ? `Email: ${ctx.contactEmail}` : null,
    ctx.contactAddress ? `Address: ${ctx.contactAddress}` : null,
    intent.notes ? `\nNotes: ${intent.notes}` : null,
    `\nBooked automatically via Replyr.`,
  ].filter(Boolean)

  const event = await createCalendarEvent(ctx.refreshToken, ctx.calendarId, {
    summary,
    description: descriptionLines.join('\n'),
    startISO,
    endISO,
    timeZone: tz,
    attendees: ctx.contactEmail
      ? [{ email: ctx.contactEmail, displayName: ctx.contactName ?? undefined }]
      : undefined,
  })

  const supabase = createServiceClient()
  const scheduledAt = `${startISO}` // store local-naive ISO; will be reinterpreted

  const { data: appointment, error } = await supabase
    .from('appointments')
    .insert({
      business_id: ctx.businessId,
      lead_id: ctx.leadId,
      scheduled_at: new Date(`${intent.date}T${intent.time}:00`).toISOString(),
      duration_minutes: duration,
      service_type: intent.service_type,
      notes: intent.notes ?? null,
      customer_name: ctx.contactName,
      customer_email: ctx.contactEmail,
      customer_phone: ctx.contactPhone,
      customer_address: ctx.contactAddress ?? null,
      status: 'scheduled',
      google_event_id: event.id,
    })
    .select('id')
    .single()

  if (error || !appointment) {
    throw new Error(`Failed to record appointment: ${error?.message ?? 'unknown'}`)
  }

  // Mark lead as booked
  await supabase
    .from('leads')
    .update({ status: 'booked' })
    .eq('id', ctx.leadId)

  return {
    appointmentId: appointment.id,
    googleEventId: event.id,
    htmlLink: event.htmlLink,
    scheduledAt,
  }
}
