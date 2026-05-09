'use client'

import { CheckCircle2, Loader2, Sparkles } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import type { SubscriptionStatus } from '@/types/database'

interface BillingSectionProps {
  status: SubscriptionStatus
  hasStripeCustomer: boolean
  stripeConfigured: boolean
}

const STATUS_LABEL: Record<SubscriptionStatus, string> = {
  trialing: 'Trial',
  active: 'Active',
  past_due: 'Past due',
  canceled: 'Canceled',
}

const STATUS_STYLES: Record<SubscriptionStatus, string> = {
  trialing: 'border-primary/30 bg-primary-glow text-primary',
  active: 'border-success/30 bg-success/10 text-success',
  past_due: 'border-warning/30 bg-warning/10 text-warning',
  canceled: 'border-border bg-white/5 text-muted-foreground',
}

export function BillingSection({
  status,
  hasStripeCustomer,
  stripeConfigured,
}: BillingSectionProps) {
  const [loading, setLoading] = useState<'checkout' | 'portal' | null>(null)
  const [banner, setBanner] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const params = new URLSearchParams(window.location.search)
    if (params.get('checkout') === 'success') {
      setBanner('Subscription updated. It can take a few seconds to reflect here.')
      const url = new URL(window.location.href)
      url.searchParams.delete('checkout')
      window.history.replaceState(null, '', url.toString())
    }
  }, [])

  async function startCheckout() {
    setLoading('checkout')
    try {
      const res = await fetch('/api/billing/checkout', { method: 'POST' })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Failed to start checkout')
      window.location.href = data.url
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Checkout failed')
      setLoading(null)
    }
  }

  async function openPortal() {
    setLoading('portal')
    try {
      const res = await fetch('/api/billing/portal', { method: 'POST' })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Failed to open portal')
      window.location.href = data.url
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Portal failed')
      setLoading(null)
    }
  }

  return (
    <div className="space-y-6">
      {banner && (
        <div className="flex items-center gap-2 rounded-md border border-success/30 bg-success/10 px-3 py-2 text-xs text-success">
          <CheckCircle2 className="size-3.5" />
          {banner}
        </div>
      )}

      {/* Plan summary */}
      <div className="rounded-xl border border-border bg-background p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              Current plan
            </p>
            <p className="mt-1 text-base font-medium tracking-tight">Replyr Pro</p>
          </div>
          <span
            className={
              'inline-flex items-center rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider ' +
              STATUS_STYLES[status]
            }
          >
            {STATUS_LABEL[status]}
          </span>
        </div>

        <div className="mt-5 grid gap-3 text-sm">
          <Feature>Unlimited AI lead replies</Feature>
          <Feature>Calendar booking + Stripe payments</Feature>
          <Feature>Email + web widget channels</Feature>
        </div>
      </div>

      {!stripeConfigured && (
        <div className="rounded-md border border-warning/30 bg-warning/10 px-3 py-2 text-xs text-warning">
          Stripe isn&apos;t configured yet. Add{' '}
          <code className="font-mono">STRIPE_SECRET_KEY</code> and{' '}
          <code className="font-mono">STRIPE_PRICE_ID</code> to your environment
          to enable checkout.
        </div>
      )}

      {/* CTAs */}
      <div className="flex flex-wrap items-center gap-3">
        {status === 'trialing' || status === 'canceled' ? (
          <Button
            type="button"
            disabled={loading !== null || !stripeConfigured}
            onClick={startCheckout}
            className="bg-primary text-primary-foreground hover:bg-primary-hover"
          >
            {loading === 'checkout' && <Loader2 className="mr-2 size-4 animate-spin" />}
            <Sparkles className="mr-1.5 size-4" />
            {status === 'trialing' ? 'Subscribe to Replyr Pro' : 'Reactivate subscription'}
          </Button>
        ) : null}

        {hasStripeCustomer && (
          <Button
            type="button"
            variant="outline"
            disabled={loading !== null}
            onClick={openPortal}
            className="border-border"
          >
            {loading === 'portal' && <Loader2 className="mr-2 size-4 animate-spin" />}
            Manage subscription
          </Button>
        )}
      </div>

      <p className="text-xs text-subtle-foreground">
        Cancel anytime. Payments and invoices are handled by Stripe.
      </p>
    </div>
  )
}

function Feature({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <CheckCircle2 className="size-3.5 text-success" />
      {children}
    </div>
  )
}
