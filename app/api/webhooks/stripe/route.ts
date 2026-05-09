import { NextResponse, type NextRequest } from 'next/server'
import type Stripe from 'stripe'
import { getStripe, STRIPE_WEBHOOK_SECRET } from '@/lib/stripe'
import { createServiceClient } from '@/lib/supabase/service'
import type { SubscriptionStatus } from '@/types/database'

export const runtime = 'nodejs' // Stripe SDK uses Node crypto

// Map Stripe subscription statuses to our subscription_status enum
function mapStatus(stripeStatus: Stripe.Subscription.Status): SubscriptionStatus {
  switch (stripeStatus) {
    case 'trialing':
      return 'trialing'
    case 'active':
      return 'active'
    case 'past_due':
    case 'unpaid':
      return 'past_due'
    case 'canceled':
    case 'incomplete_expired':
      return 'canceled'
    case 'incomplete':
    case 'paused':
    default:
      return 'trialing'
  }
}

export async function POST(request: NextRequest) {
  if (!STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 })
  }

  const signature = request.headers.get('stripe-signature')
  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe-signature' }, { status: 400 })
  }

  const rawBody = await request.text()
  const stripe = getStripe()

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    console.error('[stripe webhook] invalid signature:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const supabase = createServiceClient()

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const businessId = session.metadata?.business_id
        if (!businessId) break

        const customerId = typeof session.customer === 'string' ? session.customer : null
        const subscriptionId =
          typeof session.subscription === 'string' ? session.subscription : null

        if (subscriptionId) {
          const sub = await stripe.subscriptions.retrieve(subscriptionId)
          await supabase
            .from('businesses')
            .update({
              stripe_customer_id: customerId,
              stripe_subscription_id: subscriptionId,
              subscription_status: mapStatus(sub.status),
            })
            .eq('id', businessId)
        }
        break
      }

      case 'customer.subscription.created':
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const sub = event.data.object as Stripe.Subscription
        const businessId = sub.metadata?.business_id

        if (businessId) {
          await supabase
            .from('businesses')
            .update({
              stripe_subscription_id: sub.id,
              subscription_status:
                event.type === 'customer.subscription.deleted'
                  ? 'canceled'
                  : mapStatus(sub.status),
            })
            .eq('id', businessId)
        } else {
          // Fallback: look up by customer_id
          const customerId = typeof sub.customer === 'string' ? sub.customer : null
          if (customerId) {
            await supabase
              .from('businesses')
              .update({
                stripe_subscription_id: sub.id,
                subscription_status:
                  event.type === 'customer.subscription.deleted'
                    ? 'canceled'
                    : mapStatus(sub.status),
              })
              .eq('stripe_customer_id', customerId)
          }
        }
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        const customerId = typeof invoice.customer === 'string' ? invoice.customer : null
        if (customerId) {
          await supabase
            .from('businesses')
            .update({ subscription_status: 'past_due' })
            .eq('stripe_customer_id', customerId)
        }
        break
      }

      default:
        // Unhandled event types — fine to ignore
        break
    }
  } catch (err) {
    console.error(`[stripe webhook] error handling ${event.type}:`, err)
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 })
  }

  return NextResponse.json({ received: true })
}
