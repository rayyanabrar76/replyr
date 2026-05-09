'use client'

import { Check, Copy, ExternalLink, Eye } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'

interface WidgetEmbedProps {
  appUrl: string
  apiKey: string
}

export function WidgetEmbed({ appUrl, apiKey }: WidgetEmbedProps) {
  const widgetUrl = `${appUrl}/widget/${apiKey}`
  const scriptSrc = `${appUrl}/widget.js`
  const embedCode = `<script src="${scriptSrc}" data-key="${apiKey}" defer></script>`
  const [previewing, setPreviewing] = useState(false)
  const fabHostRef = useRef<HTMLDivElement>(null)

  // Live preview: load /widget.js into the page, click the bubble = working chat
  useEffect(() => {
    if (!previewing) return

    // The script reads its own data-key attribute — inject a fresh tag
    const script = document.createElement('script')
    script.src = `${scriptSrc}?t=${Date.now()}`
    script.dataset.key = apiKey
    script.defer = true
    document.body.appendChild(script)

    return () => {
      // Clean up the bubble + panel + style + script when toggling off
      document.querySelectorAll('.replyr-fab, .replyr-panel').forEach((n) => n.remove())
      const style = document.getElementById('replyr-widget-styles')
      if (style) style.remove()
      script.remove()
      // Allow the loader to re-init on next preview
      ;(window as unknown as { __replyrLoaded?: boolean }).__replyrLoaded = false
    }
  }, [previewing, scriptSrc, apiKey])

  return (
    <div className="space-y-6">
      {/* Embed snippet */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Embed code
          </p>
          <CopyButton text={embedCode} />
        </div>
        <pre className="overflow-x-auto rounded-md border border-border bg-background p-4 font-mono text-xs leading-relaxed text-foreground">
          {embedCode}
        </pre>
        <p className="text-xs text-muted-foreground">
          Paste this into the <code className="font-mono text-foreground">&lt;body&gt;</code> of your
          website. A chat bubble will appear in the bottom-right. Customers click it to open the
          chat panel.
        </p>
      </div>

      {/* Quick actions */}
      <div className="flex flex-wrap items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="border-border"
          onClick={() => setPreviewing((p) => !p)}
        >
          <Eye className="mr-1.5 size-3.5" />
          {previewing ? 'Hide live preview' : 'Show live preview'}
        </Button>
        <Button asChild variant="outline" size="sm" className="border-border">
          <Link href={widgetUrl} target="_blank">
            <ExternalLink className="mr-1.5 size-3.5" />
            Open chat in new tab
          </Link>
        </Button>
      </div>

      {previewing && (
        <p className="rounded-md border border-primary/30 bg-primary-glow px-3 py-2 text-xs text-primary">
          Look at the bottom-right of your screen — that&apos;s exactly how the bubble will appear
          on your customers&apos; sites.
        </p>
      )}

      <div ref={fabHostRef} />

      {/* API key */}
      <div className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Widget API key
        </p>
        <div className="flex items-stretch gap-2">
          <code className="flex-1 truncate rounded-md border border-border bg-background px-3 py-2 font-mono text-xs text-foreground">
            {apiKey}
          </code>
          <CopyButton text={apiKey} compact />
        </div>
        <p className="text-xs text-subtle-foreground">
          Anyone with this key can submit leads to your account. Keep it safe.
        </p>
      </div>
    </div>
  )
}

function CopyButton({ text, compact }: { text: string; compact?: boolean }) {
  const [copied, setCopied] = useState(false)
  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      className="border-border"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text)
          setCopied(true)
          toast.success('Copied to clipboard')
          setTimeout(() => setCopied(false), 1500)
        } catch {
          toast.error('Failed to copy')
        }
      }}
    >
      {copied ? <Check className="size-3.5 text-success" /> : <Copy className="size-3.5" />}
      {!compact && <span className="ml-1.5">{copied ? 'Copied' : 'Copy'}</span>}
    </Button>
  )
}
