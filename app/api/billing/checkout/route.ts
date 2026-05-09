import { NextResponse, type NextRequest } from 'next/server'
import { getStripe, STRIPE_PRICE_ID } from '@/lib/stripe'
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
    .select('id, name, stripe_customer_id')
    .eq('owner_id', user.id)
    .limit(1)
    .single()

  if (!business) {
    return NextResponse.json({ error: 'No business found' }, { status: 404 })
  }

  if (!STRIPE_PRICE_ID) {
    return NextResponse.json(
      { error: 'STRIPE_PRICE_ID not configured on server' },
      { status: 500 }
    )
  }

  const stripe = getStripe()
  const appUrl = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, '') ?? request.nextUrl.origin

  // Reuse customer if we already have one; otherwise let Stripe Checkout create one
  let customerId = business.stripe_customer_id
  if (!customerId) {
    const customer = await stripe.customers.create({
      email: user.email ?? undefined,
      name: business.name,
      metadata: { business_id: business.id, user_id: user.id },
    })
    customerId = customer.id
    await supabase
      .from('businesses')
      .update({ stripe_customer_id: customerId })
      .eq('id', business.id)
  }

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    customer: customerId,
    line_items: [{ price: STRIPE_PRICE_ID, quantity: 1 }],
    success_url: `${appUrl}/settings?tab=billing&checkout=success`,
    cancel_url: `${appUrl}/settings?tab=billing&checkout=canceled`,
    allow_promotion_codes: true,
    subscription_data: {
      metadata: { business_id: business.id },
    },
    metadata: { business_id: business.id },
  })

  if (!session.url) {
    return NextResponse.json({ error: 'Stripe did not return a URL' }, { status: 500 })
  }

  return NextResponse.json({ url: session.url })
}
