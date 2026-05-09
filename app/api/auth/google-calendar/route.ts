import { NextResponse, type NextRequest } from 'next/server'
import { buildAuthUrl } from '@/lib/google-calendar'
import { createClient } from '@/lib/supabase/server'

const NONCE_COOKIE = 'gcal_oauth_nonce'

export async function GET(request: NextRequest) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (!process.env.GOOGLE_CLIENT_ID) {
    return NextResponse.redirect(
      new URL('/settings?tab=integrations&error=missing_google_config', request.url)
    )
  }

  const appUrl =
    process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, '') ?? request.nextUrl.origin
  const redirectUri = `${appUrl}/api/auth/google-calendar/callback`

  const nonce = crypto.randomUUID()
  const url = buildAuthUrl(redirectUri, nonce)

  const response = NextResponse.redirect(url)
  response.cookies.set(NONCE_COOKIE, nonce, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 600, // 10 minutes
    path: '/',
  })
  return response
}
