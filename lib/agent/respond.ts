import { getLLMProvider } from '@/lib/llm'
import type { Message } from '@/lib/llm/types'
import type { Database } from '@/types/database'

type BusinessRow = Database['public']['Tables']['businesses']['Row']
type MessageRow = Database['public']['Tables']['messages']['Row']

export interface AgentInput {
  business: Pick<
    BusinessRow,
    | 'name'
    | 'industry'
    | 'phone'
    | 'website'
    | 'services'
    | 'business_hours'
    | 'faqs'
    | 'service_area_zips'
    | 'agent_name'
    | 'agent_tone'
    | 'agent_instructions'
  >
  history: Pick<MessageRow, 'role' | 'content'>[]
  newUserMessage: string
  contact: {
    name: string | null
    email: string | null
    phone: string | null
    zipCode: string | null
  }
  // Whether Google Calendar is connected — changes how the agent talks
  // about scheduling.
  calendarConnected?: boolean
}

const TONE_GUIDE: Record<string, string> = {
  friendly_professional:
    'Warm, helpful, and professional. Speak like a friendly neighbor who happens to know the trade. Avoid jargon.',
  formal: 'Polite and professional. Avoid contractions. Match a B2B service tone.',
  casual: 'Conversational and laid-back. Short sentences, light on formality.',
}

function formatList(items: unknown): string | null {
  if (!items) return null
  if (Array.isArray(items)) return items.filter(Boolean).join(', ') || null
  if (typeof items === 'string') return items
  return null
}

export function buildSystemPrompt(
  business: AgentInput['business'],
  contact: AgentInput['contact'],
  calendarConnected: boolean
) {
  const tone = TONE_GUIDE[business.agent_tone] ?? TONE_GUIDE.friendly_professional
  const services = formatList(business.services)
  const zips = formatList(business.service_area_zips)
  const faqs = formatList(business.faqs)
  const today = new Date().toISOString().slice(0, 10)

  const schedulingGuidance = calendarConnected
    ? `# Scheduling
Once you understand the issue and have the customer's contact info, OFFER to book an appointment. Suggest a couple of windows (e.g. "tomorrow afternoon, or Thursday morning"). When the customer agrees to a specific date AND time, CONFIRM IT BACK TO THEM EXPLICITLY in your reply, like:
"Great — I have you down for Thursday April 11th at 2pm. We'll send a calendar invite to your email shortly."
This explicit confirmation is critical — it's what triggers the booking on our end.`
    : `# Scheduling
Once you have the issue and contact info, tell them a team member will follow up shortly to confirm a time. Don't promise a specific time slot — we don't have your calendar connected yet.`

  return `You are ${business.agent_name}, the AI assistant for ${business.name}, a ${business.industry.replace(/_/g, ' ')} business. Today is ${today}.

# Tone
${tone}

# Your job
- Greet the customer and acknowledge their message warmly.
- Ask clarifying questions to understand what they need (issue, urgency, location, timing).
- Confirm the service they're asking about is something we offer.
- NEVER quote specific prices. Always say a technician will provide a quote after assessing the work.
- Keep replies short — 2-4 sentences. This is a chat, not an email.

${schedulingGuidance}

# Business info
- Name: ${business.name}
${business.phone ? `- Phone: ${business.phone}` : ''}
${business.website ? `- Website: ${business.website}` : ''}
${services ? `- Services we offer: ${services}` : ''}
${zips ? `- Service area ZIP codes: ${zips}` : ''}
${faqs ? `- FAQs: ${faqs}` : ''}

# Customer info we have so far
- Name: ${contact.name ?? '(unknown)'}
- Email: ${contact.email ?? '(unknown)'}
- Phone: ${contact.phone ?? '(unknown)'}
- ZIP: ${contact.zipCode ?? '(unknown)'}

${business.agent_instructions ? `# Owner's special instructions\n${business.agent_instructions}` : ''}

Respond now to the customer's latest message.`
}

export async function generateAgentReply(input: AgentInput): Promise<string> {
  const llm = getLLMProvider()
  const systemPrompt = buildSystemPrompt(
    input.business,
    input.contact,
    input.calendarConnected ?? false
  )

  // Build conversation history. Filter to user/assistant only — system is set via options.
  const history: Message[] = input.history
    .filter((m) => m.role === 'user' || m.role === 'assistant')
    .map((m) => ({ role: m.role as 'user' | 'assistant', content: m.content }))

  const messages: Message[] = [
    ...history,
    { role: 'user', content: input.newUserMessage },
  ]

  const response = await llm.chat(messages, {
    systemPrompt,
    maxTokens: 400,
    temperature: 0.7,
  })

  return response.content.trim() || "Thanks — let me get back to you on that."
}
