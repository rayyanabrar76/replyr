import { NextResponse, type NextRequest } from 'next/server'
import { getStripe } from '@/lib/stripe'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const { data: business } = await supabase
    .from('businesses')
    .select('stripe_customer_id')
    .eq('owner_id', user.id)
    .limit(1)
    .single()

  if (!business?.stripe_customer_id) {
    return NextResponse.json(
      { error: 'No Stripe customer — start a subscription first.' },
      { status: 400 }
    )
  }

  const stripe = getStripe()
  const appUrl =
    process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, '') ?? request.nextUrl.origin

  const session = await stripe.billingPortal.sessions.create({
    customer: business.stripe_customer_id,
    return_url: `${appUrl}/settings?tab=billing`,
  })

  return NextResponse.json({ url: session.url })
}
