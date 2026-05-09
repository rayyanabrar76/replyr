'use client'

import { Calendar, Check, Loader2, Mail, Unplug } from 'lucide-react'
import { useEffect, useState, useTransition } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { disconnectGoogleCalendar } from './actions'

interface IntegrationsSectionProps {
  calendarConnected: boolean
  forwardingAddress: string | null
  inboundConfigured: boolean
}

interface URLBanner {
  type: 'success' | 'error'
  message: string
}

function readBannerFromQuery(): URLBanner | null {
  if (typeof window === 'undefined') return null
  const params = new URLSearchParams(window.location.search)
  if (params.get('connected') === 'google') {
    return { type: 'success', message: 'Google Calendar connected.' }
  }
  const err = params.get('error')
  if (err) {
    const map: Record<string, string> = {
      oauth_state_mismatch: 'OAuth verification failed (state mismatch). Please try again.',
      oauth_missing_params: 'OAuth flow returned without required parameters.',
      oauth_failed: 'Google sign-in failed.',
      missing_google_config: 'Google OAuth credentials are not configured on the server.',
      no_refresh_token:
        'Google didn’t return a refresh token. Revoke Replyr at myaccount.google.com → Security → Third-party access, then reconnect.',
      token_exchange_failed: 'Failed to exchange code for tokens.',
      db_update_failed: 'Connected with Google, but failed to save the token.',
    }
    return { type: 'error', message: map[err] ?? `Integration error: ${err}` }
  }
  return null
}

export function IntegrationsSection({
  calendarConnected,
  forwardingAddress,
  inboundConfigured,
}: IntegrationsSectionProps) {
  const [banner, setBanner] = useState<URLBanner | null>(null)
  const [pending, startTransition] = useTransition()
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const b = readBannerFromQuery()
    if (b) {
      setBanner(b)
      // Clear query so banner doesn't persist on refresh
      const url = new URL(window.location.href)
      url.searchParams.delete('connected')
      url.searchParams.delete('error')
      window.history.replaceState(null, '', url.toString())
    }
  }, [])

  function handleDisconnect() {
    startTransition(async () => {
      const result = await disconnectGoogleCalendar()
      if (result.status === 'success') toast.success(result.message)
      else if (result.status === 'error') toast.error(result.message)
    })
  }

  async function copyAddress() {
    if (!forwardingAddress) return
    try {
      await navigator.clipboard.writeText(forwardingAddress)
      setCopied(true)
      toast.success('Copied')
      setTimeout(() => setCopied(false), 1500)
    } catch {
      toast.error('Failed to copy')
    }
  }

  return (
    <div className="space-y-6">
      {banner && (
        <div
          className={
            'rounded-md border px-3 py-2 text-xs ' +
            (banner.type === 'success'
              ? 'border-success/30 bg-success/10 text-success'
              : 'border-danger/30 bg-danger/10 text-danger')
          }
        >
          {banner.message}
        </div>
      )}

      {/* Google Calendar */}
      <IntegrationRow
        icon={Calendar}
        title="Google Calendar"
        description="When connected, your AI agent can book confirmed appointments directly to your calendar."
        connected={calendarConnected}
        action={
          calendarConnected ? (
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="border-border"
              disabled={pending}
              onClick={handleDisconnect}
            >
              {pending ? (
                <Loader2 className="mr-1.5 size-3.5 animate-spin" />
              ) : (
                <Unplug className="mr-1.5 size-3.5" />
              )}
              Disconnect
            </Button>
          ) : (
            <Button
              asChild
              size="sm"
              className="bg-primary text-primary-foreground hover:bg-primary-hover"
            >
              <a href="/api/auth/google-calendar">Connect</a>
            </Button>
          )
        }
      />

      <Separator />

      {/* Email forwarding */}
      <IntegrationRow
        icon={Mail}
        title="Email forwarding"
        description="Forward customer emails to this address and your agent will reply automatically. Each lead gets logged in the dashboard."
        connected={inboundConfigured && !!forwardingAddress}
        action={
          forwardingAddress ? (
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="border-border"
              onClick={copyAddress}
            >
              {copied ? (
                <Check className="mr-1.5 size-3.5 text-success" />
              ) : null}
              {copied ? 'Copied' : 'Copy address'}
            </Button>
          ) : null
        }
      >
        {forwardingAddress && (
          <code className="mt-3 block rounded-md border border-border bg-background px-3 py-2 font-mono text-xs">
            {forwardingAddress}
          </code>
        )}
        {!inboundConfigured && (
          <p className="mt-3 text-xs text-subtle-foreground">
            Inbound email isn&apos;t fully wired up yet. Configure your email
            provider (Resend Inbound, Mailgun, etc.) to forward to this address
            and POST to <code className="font-mono">/api/webhooks/email</code>.
          </p>
        )}
      </IntegrationRow>
    </div>
  )
}

function IntegrationRow({
  icon: Icon,
  title,
  description,
  connected,
  action,
  children,
}: {
  icon: typeof Calendar
  title: string
  description: string
  connected: boolean
  action: React.ReactNode
  children?: React.ReactNode
}) {
  return (
    <div>
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary-glow text-primary">
          <Icon className="size-4" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-medium text-foreground">{title}</h3>
            {connected && (
              <span className="inline-flex items-center gap-1 rounded-full border border-success/30 bg-success/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-success">
                <Check className="size-2.5" /> Connected
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          {children}
        </div>
        <div className="shrink-0">{action}</div>
      </div>
    </div>
  )
}
