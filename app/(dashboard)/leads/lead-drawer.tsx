'use client'

import { Loader2, Mail, MapPin, Phone, User } from 'lucide-react'
import { useEffect, useState, useTransition } from 'react'
import { toast } from 'sonner'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { createClient } from '@/lib/supabase/client'
import { updateLeadStatus } from '../settings/actions'

interface LeadDrawerProps {
  leadId: string | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface LeadDetail {
  id: string
  contact_name: string | null
  contact_email: string | null
  contact_phone: string | null
  zip_code: string | null
  initial_message: string | null
  status: string
  created_at: string
}

interface MessageRow {
  id: string
  role: string
  content: string
  created_at: string
}

const STATUSES = [
  { value: 'new', label: 'New' },
  { value: 'qualifying', label: 'Qualifying' },
  { value: 'qualified', label: 'Qualified' },
  { value: 'booked', label: 'Booked' },
  { value: 'lost', label: 'Lost' },
  { value: 'handed_off', label: 'Handed off' },
]

export function LeadDrawer({ leadId, open, onOpenChange }: LeadDrawerProps) {
  const [lead, setLead] = useState<LeadDetail | null>(null)
  const [messages, setMessages] = useState<MessageRow[]>([])
  const [loading, setLoading] = useState(false)
  const [pending, startTransition] = useTransition()

  useEffect(() => {
    if (!leadId) {
      setLead(null)
      setMessages([])
      return
    }

    let cancelled = false
    setLoading(true)
    const supabase = createClient()

    ;(async () => {
      const { data: leadData } = await supabase
        .from('leads')
        .select(
          'id, contact_name, contact_email, contact_phone, zip_code, initial_message, status, created_at'
        )
        .eq('id', leadId)
        .single()

      if (cancelled || !leadData) return
      setLead(leadData as LeadDetail)

      const { data: convo } = await supabase
        .from('conversations')
        .select('id')
        .eq('lead_id', leadId)
        .limit(1)
        .maybeSingle()

      if (cancelled) return

      if (convo?.id) {
        const { data: msgs } = await supabase
          .from('messages')
          .select('id, role, content, created_at')
          .eq('conversation_id', convo.id)
          .order('created_at', { ascending: true })
        if (!cancelled) setMessages(msgs ?? [])
      } else {
        setMessages([])
      }

      if (!cancelled) setLoading(false)
    })()

    return () => {
      cancelled = true
    }
  }, [leadId])

  function changeStatus(nextStatus: string) {
    if (!lead || nextStatus === lead.status) return
    const previous = lead.status
    setLead({ ...lead, status: nextStatus })

    startTransition(async () => {
      const result = await updateLeadStatus(lead.id, nextStatus)
      if (result.status === 'success') {
        toast.success('Status updated')
      } else if (result.status === 'error') {
        // rollback
        setLead((curr) => (curr ? { ...curr, status: previous } : curr))
        toast.error(result.message)
      }
    })
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="flex w-full flex-col gap-0 border-l border-border bg-surface p-0 sm:max-w-xl"
      >
        <SheetHeader className="space-y-1 border-b border-border px-6 py-5">
          <SheetTitle className="text-lg font-medium tracking-tight">
            {lead?.contact_name ?? 'Lead details'}
          </SheetTitle>
          <SheetDescription className="font-mono text-xs uppercase tracking-wider">
            {lead ? `Created ${new Date(lead.created_at).toLocaleString()}` : '—'}
          </SheetDescription>
        </SheetHeader>

        {loading && (
          <div className="flex flex-1 items-center justify-center">
            <Loader2 className="size-5 animate-spin text-muted-foreground" />
          </div>
        )}

        {!loading && lead && (
          <div className="flex flex-1 flex-col overflow-y-auto">
            {/* Status selector */}
            <div className="flex items-center justify-between gap-3 border-b border-border bg-surface-elevated/50 px-6 py-3">
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Status
              </span>
              <div className="flex items-center gap-2">
                {pending && (
                  <Loader2 className="size-3 animate-spin text-subtle-foreground" />
                )}
                <Select
                  value={lead.status}
                  onValueChange={changeStatus}
                  disabled={pending}
                >
                  <SelectTrigger className="h-8 w-40 border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {STATUSES.map((s) => (
                      <SelectItem key={s.value} value={s.value}>
                        {s.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Contact info */}
            <div className="space-y-2 border-b border-border px-6 py-5 text-sm">
              <ContactRow icon={User} label="Name" value={lead.contact_name} />
              <ContactRow icon={Mail} label="Email" value={lead.contact_email} mono />
              <ContactRow icon={Phone} label="Phone" value={lead.contact_phone} mono />
              <ContactRow icon={MapPin} label="ZIP" value={lead.zip_code} mono />
            </div>

            {/* Conversation */}
            <div className="flex flex-col gap-3 px-6 py-5">
              <p className="font-mono text-xs uppercase tracking-wider text-subtle-foreground">
                Conversation
              </p>
              {messages.length === 0 ? (
                <p className="text-sm text-muted-foreground">No messages yet.</p>
              ) : (
                messages.map((m) => <Bubble key={m.id} message={m} />)
              )}
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}

function ContactRow({
  icon: Icon,
  label,
  value,
  mono,
}: {
  icon: typeof User
  label: string
  value: string | null
  mono?: boolean
}) {
  return (
    <div className="flex items-center gap-3">
      <Icon className="size-3.5 shrink-0 text-subtle-foreground" />
      <span className="w-12 text-xs uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      <span
        className={
          'min-w-0 flex-1 truncate text-sm ' +
          (mono ? 'font-mono ' : '') +
          (value ? 'text-foreground' : 'text-subtle-foreground')
        }
      >
        {value ?? '—'}
      </span>
    </div>
  )
}

function Bubble({ message }: { message: MessageRow }) {
  const isUser = message.role === 'user'
  return (
    <div className={isUser ? 'flex justify-end' : 'flex justify-start'}>
      <div
        className={
          'max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ' +
          (isUser
            ? 'bg-primary text-primary-foreground'
            : 'bg-surface-elevated text-foreground')
        }
      >
        <span className="whitespace-pre-wrap">{message.content}</span>
      </div>
    </div>
  )
}
