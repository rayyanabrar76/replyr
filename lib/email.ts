// Outbound email via Resend's REST API. Uses fetch — no SDK dep.

interface SendEmailArgs {
  from: string // "Acme Plumbing <hello@inbound.replyr.com>"
  to: string
  subject: string
  text: string
  html?: string
  reply_to?: string
}

export async function sendEmail(args: SendEmailArgs): Promise<{ id: string }> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not set')
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(args),
  })

  if (!res.ok) {
    const errBody = await res.text()
    throw new Error(`Resend send failed: ${res.status} ${errBody}`)
  }

  return (await res.json()) as { id: string }
}

export const INBOUND_EMAIL_DOMAIN =
  process.env.NEXT_PUBLIC_INBOUND_EMAIL_DOMAIN ?? 'inbound.replyr.app'

export function buildForwardingAddress(slug: string): string {
  return `${slug}@${INBOUND_EMAIL_DOMAIN}`
}
