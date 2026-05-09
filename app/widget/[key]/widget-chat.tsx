'use client'

import { Loader2, Send, Sparkles } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

interface WidgetChatProps {
  apiKey: string
  businessName: string
  agentName: string
}

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

type Step = 'lead-form' | 'chatting'

export function WidgetChat({ apiKey, businessName, agentName }: WidgetChatProps) {
  const [step, setStep] = useState<Step>('lead-form')
  const [conversationId, setConversationId] = useState<string | null>(null)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const scrollRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, step])

  async function startConversation(formData: FormData) {
    setError(null)
    setSubmitting(true)

    const payload = {
      apiKey,
      contactName: String(formData.get('name') ?? '').trim(),
      contactEmail: String(formData.get('email') ?? '').trim() || null,
      contactPhone: String(formData.get('phone') ?? '').trim() || null,
      zipCode: String(formData.get('zip') ?? '').trim() || null,
      message: String(formData.get('message') ?? '').trim(),
    }

    if (!payload.contactName || !payload.message) {
      setError('Name and message are required.')
      setSubmitting(false)
      return
    }

    try {
      const res = await fetch('/api/widget/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? 'Something went wrong.')
        return
      }
      setConversationId(data.conversationId)
      setMessages([
        { role: 'user', content: payload.message },
        { role: 'assistant', content: data.reply },
      ])
      setStep('chatting')
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  async function sendMessage(text: string) {
    if (!conversationId || !text.trim()) return
    setError(null)
    setSubmitting(true)
    setMessages((prev) => [...prev, { role: 'user', content: text }])
    setInput('')

    try {
      const res = await fetch('/api/widget/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey, conversationId, message: text }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? 'Something went wrong.')
        return
      }
      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }])
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="flex h-full w-full flex-col bg-surface text-foreground">
      {/* Header */}
      <header className="flex shrink-0 items-center gap-3 border-b border-border bg-surface-elevated px-4 py-3">
        <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-glow text-primary">
          <Sparkles className="size-4" />
          <span className="absolute right-0 top-0 size-2 rounded-full bg-success ring-2 ring-surface-elevated" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium tracking-tight">{businessName}</p>
          <p className="truncate text-xs text-muted-foreground">
            {agentName} · usually replies in seconds
          </p>
        </div>
      </header>

      {/* Body */}
      {step === 'lead-form' ? (
        <form
          action={startConversation}
          className="flex flex-1 flex-col overflow-y-auto"
        >
          <div className="flex-1 space-y-4 px-4 py-5">
            <div className="rounded-lg border border-border bg-surface-elevated/50 p-3">
              <p className="text-sm leading-relaxed text-foreground">
                Hi there — send us a quick message and {agentName.toLowerCase().includes('assistant') ? "we'll" : agentName + ' will'} get back to you in seconds.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <FieldLabel label="Name" required>
                <Field name="name" required placeholder="Your name" />
              </FieldLabel>
              <FieldLabel label="ZIP">
                <Field name="zip" placeholder="ZIP" />
              </FieldLabel>
            </div>

            <FieldLabel label="Email">
              <Field name="email" type="email" placeholder="you@example.com" />
            </FieldLabel>

            <FieldLabel label="Phone">
              <Field name="phone" type="tel" placeholder="(555) 555-5555" />
            </FieldLabel>

            <FieldLabel label="What do you need?" required>
              <textarea
                name="message"
                required
                rows={4}
                placeholder="Tell us what's going on…"
                className="w-full resize-none rounded-md border border-border bg-background px-3 py-2 text-sm leading-relaxed placeholder:text-subtle-foreground focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-ring/40"
              />
            </FieldLabel>

            {error && (
              <p className="rounded-md border border-danger/30 bg-danger/10 px-3 py-2 text-xs text-danger">
                {error}
              </p>
            )}
          </div>

          <div className="shrink-0 border-t border-border bg-surface-elevated/50 px-4 py-3">
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover disabled:opacity-60"
            >
              {submitting && <Loader2 className="size-4 animate-spin" />}
              {submitting ? 'Sending…' : 'Send message'}
            </button>
            <p className="mt-2 text-center font-mono text-[10px] uppercase tracking-wider text-subtle-foreground">
              Powered by Replyr
            </p>
          </div>
        </form>
      ) : (
        <>
          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((m, i) => (
              <Bubble key={i} role={m.role} content={m.content} />
            ))}
            {submitting && <Bubble role="assistant" content="" pending />}
          </div>

          {error && (
            <p className="border-t border-danger/30 bg-danger/10 px-4 py-2 text-xs text-danger">
              {error}
            </p>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault()
              sendMessage(input)
            }}
            className="flex shrink-0 items-end gap-2 border-t border-border bg-surface-elevated/70 p-3"
          >
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  sendMessage(input)
                }
              }}
              rows={1}
              placeholder="Type a reply…"
              className="max-h-32 flex-1 resize-none rounded-md border border-border bg-background px-3 py-2 text-sm placeholder:text-subtle-foreground focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-ring/40"
            />
            <button
              type="submit"
              disabled={!input.trim() || submitting}
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground transition-colors hover:bg-primary-hover disabled:opacity-50"
            >
              <Send className="size-4" />
            </button>
          </form>
        </>
      )}
    </div>
  )
}

function FieldLabel({
  label,
  required,
  children,
}: {
  label: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
        {label}
        {required && <span className="ml-1 text-primary">*</span>}
      </label>
      {children}
    </div>
  )
}

function Field({
  name,
  type = 'text',
  placeholder,
  required,
}: {
  name: string
  type?: string
  placeholder?: string
  required?: boolean
}) {
  return (
    <input
      name={name}
      type={type}
      required={required}
      placeholder={placeholder}
      className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm placeholder:text-subtle-foreground focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-ring/40"
    />
  )
}

function Bubble({
  role,
  content,
  pending,
}: {
  role: 'user' | 'assistant'
  content: string
  pending?: boolean
}) {
  const isUser = role === 'user'
  return (
    <div className={isUser ? 'flex justify-end' : 'flex justify-start'}>
      <div
        className={
          'max-w-[80%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed ' +
          (isUser
            ? 'bg-primary text-primary-foreground'
            : 'bg-surface-elevated text-foreground')
        }
      >
        {pending ? (
          <span className="inline-flex gap-1 py-1">
            <Dot />
            <Dot delay={150} />
            <Dot delay={300} />
          </span>
        ) : (
          <span className="whitespace-pre-wrap">{content}</span>
        )}
      </div>
    </div>
  )
}

function Dot({ delay = 0 }: { delay?: number }) {
  return (
    <span
      className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-muted-foreground"
      style={{ animationDelay: `${delay}ms` }}
    />
  )
}
