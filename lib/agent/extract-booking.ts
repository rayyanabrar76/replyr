import { getLLMProvider } from '@/lib/llm'
import type { Message } from '@/lib/llm/types'

export interface BookingIntent {
  service_type: string
  date: string // YYYY-MM-DD
  time: string // HH:MM (24-hour)
  duration_minutes?: number
  notes?: string
}

const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}$/
const TIME_RE = /^([01]?\d|2[0-3]):[0-5]\d$/

export interface ExtractInput {
  history: Pick<Message, 'role' | 'content'>[]
  newUserMessage: string
  newAssistantReply: string
  todayISO: string // YYYY-MM-DD in business timezone
}

/**
 * After every customer turn, ask a small classifier whether they just
 * confirmed a specific date+time. Returns null if no confirmed booking.
 */
export async function extractBookingIntent(
  input: ExtractInput
): Promise<BookingIntent | null> {
  const llm = getLLMProvider()

  // Take only the last few turns — enough context, no token waste
  const recent = [
    ...input.history.slice(-6),
    { role: 'user' as const, content: input.newUserMessage },
    { role: 'assistant' as const, content: input.newAssistantReply },
  ]

  const transcript = recent
    .filter((m) => m.role === 'user' || m.role === 'assistant')
    .map((m) => `${m.role === 'user' ? 'Customer' : 'Agent'}: ${m.content}`)
    .join('\n\n')

  const prompt = `Today is ${input.todayISO}. You are an extraction tool, not a chat agent.

Read the conversation below. Did the customer just CONFIRM a specific appointment date and time (not just ask about availability — actually agree)?

Output a JSON object with this exact shape and nothing else:
{ "booking": null }
OR
{ "booking": { "service_type": string, "date": "YYYY-MM-DD", "time": "HH:MM", "duration_minutes": number, "notes": string } }

Rules:
- Only output a booking when there is unambiguous agreement on a specific date AND time.
- If the customer said "tomorrow at 2pm", resolve to absolute date based on today.
- If only a date OR time is given, output null.
- "service_type" is a short phrase (e.g. "Water heater repair").
- "duration_minutes" defaults to 60.
- "notes" should capture relevant details (urgency, address hints, etc).

Conversation:
${transcript}`

  let raw: string
  try {
    const res = await llm.chat([{ role: 'user', content: prompt }], {
      temperature: 0,
      maxTokens: 300,
    })
    raw = res.content
  } catch (err) {
    console.error('[extract-booking] LLM error:', err)
    return null
  }

  // Pull out the first JSON object
  const match = raw.match(/\{[\s\S]*\}/)
  if (!match) return null

  let parsed: unknown
  try {
    parsed = JSON.parse(match[0])
  } catch {
    return null
  }

  if (!parsed || typeof parsed !== 'object') return null
  const obj = parsed as { booking?: unknown }
  if (!obj.booking || typeof obj.booking !== 'object') return null

  const b = obj.booking as Record<string, unknown>
  if (
    typeof b.service_type !== 'string' ||
    typeof b.date !== 'string' ||
    typeof b.time !== 'string'
  ) {
    return null
  }
  if (!ISO_DATE_RE.test(b.date) || !TIME_RE.test(b.time)) {
    return null
  }

  return {
    service_type: b.service_type,
    date: b.date,
    time: b.time,
    duration_minutes:
      typeof b.duration_minutes === 'number' ? b.duration_minutes : 60,
    notes: typeof b.notes === 'string' ? b.notes : undefined,
  }
}
