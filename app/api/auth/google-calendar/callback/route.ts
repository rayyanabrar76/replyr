import { NextResponse, type NextRequest } from 'next/server'
import { exchangeCodeForTokens } from '@/lib/google-calendar'
import { createClient } from '@/lib/supabase/server'

const NONCE_COOKIE = 'gcal_oauth_nonce'

export async function GET(request: NextRequest) {
  const appUrl =
    process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, '') ?? request.nextUrl.origin
  const redirectBack = (qs: string) =>
    NextResponse.redirect(new URL(`/settings?tab=integrations&${qs}`, request.url))

  const code = request.nextUrl.searchParams.get('code')
  const state = request.nextUrl.searchParams.get('state')
  const errorParam = request.nextUrl.searchParams.get('error')

  if (errorParam) {
    return redirectBack(`error=oauth_${encodeURIComponent(errorParam)}`)
  }

  if (!code || !state) {
    return redirectBack('error=oauth_missing_params')
  }

  // CSRF: state must match the nonce cookie set in /api/auth/google-calendar
  const cookieNonce = request.cookies.get(NONCE_COOKIE)?.value
  if (!cookieNonce || cookieNonce !== state) {
    return redirectBack('error=oauth_state_mismatch')
  }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  let tokens
  try {
    tokens = await exchangeCodeForTokens(
      code,
      `${appUrl}/api/auth/google-calendar/callback`
    )
  } catch (err) {
    console.error('[gcal callback] token exchange failed:', err)
    return redirectBack('error=token_exchange_failed')
  }

  if (!tokens.refresh_token) {
    // Google only returns refresh_token on first consent; if missing, the user
    // already authorized. They need to revoke + reconnect.
    return redirectBack('error=no_refresh_token')
  }

  const { error } = await supabase
    .from('businesses')
    .update({
      google_refresh_token: tokens.refresh_token,
      google_calendar_id: 'primary',
    })
    .eq('owner_id', user.id)

  if (error) {
    console.error('[gcal callback] DB update failed:', error)
    return redirectBack('error=db_update_failed')
  }

  const response = redirectBack('connected=google')
  response.cookies.delete(NONCE_COOKIE)
  return response
}
