'use client'

import { ChevronRight, Mail, MessageSquare, Phone } from 'lucide-react'
import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { LeadDrawer } from './lead-drawer'

type LeadStatus =
  | 'new'
  | 'qualifying'
  | 'qualified'
  | 'booked'
  | 'lost'
  | 'handed_off'

export interface LeadRow {
  id: string
  contact_name: string | null
  contact_email: string | null
  contact_phone: string | null
  initial_message: string | null
  status: LeadStatus
  created_at: string
}

const STATUS_STYLES: Record<LeadStatus, string> = {
  new: 'bg-primary-glow text-primary border-primary/30',
  qualifying: 'bg-warning/10 text-warning border-warning/30',
  qualified: 'bg-warning/10 text-warning border-warning/30',
  booked: 'bg-success/10 text-success border-success/30',
  lost: 'bg-white/5 text-subtle-foreground border-border',
  handed_off: 'bg-white/5 text-subtle-foreground border-border',
}

function timeAgo(iso: string): string {
  const seconds = Math.floor((Date.now() - new Date(iso).getTime()) / 1000)
  if (seconds < 60) return 'just now'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 7) return `${days}d ago`
  return new Date(iso).toLocaleDateString()
}

export function LeadList({ leads }: { leads: LeadRow[] }) {
  const [activeId, setActiveId] = useState<string | null>(null)

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-border bg-surface">
        {leads.map((lead, i) => (
          <button
            key={lead.id}
            onClick={() => setActiveId(lead.id)}
            className={cn(
              'group flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-white/5',
              i !== leads.length - 1 && 'border-b border-border'
            )}
          >
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-3">
                <span className="truncate text-sm font-medium text-foreground">
                  {lead.contact_name ?? 'Unknown'}
                </span>
                <Badge
                  variant="outline"
                  className={cn('shrink-0 border text-[10px] uppercase tracking-wider', STATUS_STYLES[lead.status])}
                >
                  {lead.status.replace(/_/g, ' ')}
                </Badge>
              </div>

              <p className="mt-1 truncate text-sm text-muted-foreground">
                {lead.initial_message ?? 'No message'}
              </p>

              <div className="mt-2 flex items-center gap-4 text-xs text-subtle-foreground">
                {lead.contact_email && (
                  <span className="inline-flex items-center gap-1.5">
                    <Mail className="size-3" />
                    <span className="font-mono">{lead.contact_email}</span>
                  </span>
                )}
                {lead.contact_phone && (
                  <span className="inline-flex items-center gap-1.5">
                    <Phone className="size-3" />
                    <span className="font-mono">{lead.contact_phone}</span>
                  </span>
                )}
                <span className="inline-flex items-center gap-1.5">
                  <MessageSquare className="size-3" />
                  {timeAgo(lead.created_at)}
                </span>
              </div>
            </div>

            <ChevronRight className="size-4 shrink-0 text-subtle-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground" />
          </button>
        ))}
      </div>

      <LeadDrawer
        leadId={activeId}
        open={activeId !== null}
        onOpenChange={(open) => !open && setActiveId(null)}
      />
    </>
  )
}
