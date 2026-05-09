// Lightweight Google Calendar client — uses fetch, no googleapis SDK.

const TOKEN_URL = 'https://oauth2.googleapis.com/token'
const CALENDAR_API = 'https://www.googleapis.com/calendar/v3'
const SCOPES = ['https://www.googleapis.com/auth/calendar.events']

export const GOOGLE_OAUTH_SCOPE = SCOPES.join(' ')

export function buildAuthUrl(redirectUri: string, state: string): string {
  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID ?? '',
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: GOOGLE_OAUTH_SCOPE,
    access_type: 'offline',
    include_granted_scopes: 'true',
    prompt: 'consent', // force refresh_token issuance
    state,
  })
  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`
}

export interface TokenResponse {
  access_token: string
  refresh_token?: string
  expires_in: number
  scope: string
  token_type: 'Bearer'
}

export async function exchangeCodeForTokens(
  code: string,
  redirectUri: string
): Promise<TokenResponse> {
  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID ?? '',
      client_secret: process.env.GOOGLE_CLIENT_SECRET ?? '',
      code,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code',
    }),
  })
  if (!res.ok) {
    throw new Error(`Token exchange failed: ${res.status} ${await res.text()}`)
  }
  return (await res.json()) as TokenResponse
}

async function refreshAccessToken(refreshToken: string): Promise<string> {
  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID ?? '',
      client_secret: process.env.GOOGLE_CLIENT_SECRET ?? '',
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
    }),
  })
  if (!res.ok) {
    throw new Error(`Refresh failed: ${res.status} ${await res.text()}`)
  }
  const data = (await res.json()) as { access_token: string }
  return data.access_token
}

export interface CalendarEventInput {
  summary: string
  description?: string
  startISO: string // full ISO 8601 with TZ offset, e.g. 2026-05-12T14:00:00-05:00
  endISO: string
  attendees?: { email: string; displayName?: string }[]
  timeZone?: string // e.g. 'America/Chicago'
}

export interface CalendarEventResult {
  id: string
  htmlLink: string
}

export async function createCalendarEvent(
  refreshToken: string,
  calendarId: string,
  event: CalendarEventInput
): Promise<CalendarEventResult> {
  const accessToken = await refreshAccessToken(refreshToken)

  const body = {
    summary: event.summary,
    description: event.description,
    start: { dateTime: event.startISO, timeZone: event.timeZone },
    end: { dateTime: event.endISO, timeZone: event.timeZone },
    attendees: event.attendees,
  }

  const res = await fetch(
    `${CALENDAR_API}/calendars/${encodeURIComponent(calendarId)}/events?sendUpdates=all`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }
  )

  if (!res.ok) {
    const errBody = await res.text()
    throw new Error(`Calendar event creation failed: ${res.status} ${errBody}`)
  }

  return (await res.json()) as CalendarEventResult
}

export async function revokeRefreshToken(refreshToken: string): Promise<void> {
  await fetch(`https://oauth2.googleapis.com/revoke?token=${encodeURIComponent(refreshToken)}`, {
    method: 'POST',
  })
}
