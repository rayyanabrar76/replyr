'use client'

import { CalendarCheck, Inbox, MessageCircle, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { EmptyState } from '@/components/ui/empty-state'
import { StatCard } from '@/components/ui/stat-card'
import { createClient } from '@/lib/supabase/client'
import { LeadList, type LeadRow } from './lead-list'

const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000

interface LeadsRealtimeProps {
  initialLeads: LeadRow[]
  businessId: string
}

interface RealtimeLeadPayload {
  id: string
  contact_name: string | null
  contact_email: string | null
  contact_phone: string | null
  initial_message: string | null
  status: LeadRow['status']
  created_at: string
}

function pickLeadFields(row: RealtimeLeadPayload): LeadRow {
  return {
    id: row.id,
    contact_name: row.contact_name,
    contact_email: row.contact_email,
    contact_phone: row.contact_phone,
    initial_message: row.initial_message,
    status: row.status,
    created_at: row.created_at,
  }
}

export function LeadsRealtime({ initialLeads, businessId }: LeadsRealtimeProps) {
  const [leads, setLeads] = useState<LeadRow[]>(initialLeads)

  useEffect(() => {
    const supabase = createClient()

    const channel = supabase
      .channel(`leads-${businessId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'leads',
          filter: `business_id=eq.${businessId}`,
        },
        (payload) => {
          const row = pickLeadFields(payload.new as RealtimeLeadPayload)
          setLeads((prev) => {
            if (prev.some((l) => l.id === row.id)) return prev
            return [row, ...prev]
          })
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'leads',
          filter: `business_id=eq.${businessId}`,
        },
        (payload) => {
          const row = pickLeadFields(payload.new as RealtimeLeadPayload)
          setLeads((prev) => prev.map((l) => (l.id === row.id ? row : l)))
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'DELETE',
          schema: 'public',
          table: 'leads',
          filter: `business_id=eq.${businessId}`,
        },
        (payload) => {
          const id = (payload.old as { id: string }).id
          setLeads((prev) => prev.filter((l) => l.id !== id))
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [businessId])

  const stats = useMemo(() => {
    const weekAgo = Date.now() - ONE_WEEK_MS
    const newThisWeek = leads.filter(
      (l) => new Date(l.created_at).getTime() >= weekAgo
    ).length
    const qualifying = leads.filter((l) => l.status === 'qualifying').length
    const booked = leads.filter((l) => l.status === 'booked').length
    const conversionRate =
      leads.length > 0
        ? `${Math.round((booked / leads.length) * 100)}%`
        : '—'
    return { newThisWeek, qualifying, booked, conversionRate }
  }, [leads])

  return (
    <>
      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard icon={Inbox} label="New this week" value={stats.newThisWeek} />
        <StatCard icon={MessageCircle} label="Qualifying" value={stats.qualifying} />
        <StatCard icon={CalendarCheck} label="Booked" value={stats.booked} />
        <StatCard
          icon={TrendingUp}
          label="Conversion rate"
          value={stats.conversionRate}
        />
      </div>

      {leads.length === 0 ? (
        <div className="mt-10">
          <EmptyState
            icon={Inbox}
            title="No leads yet"
            description="Connect your website widget in Settings to start receiving qualified leads automatically."
            action={
              <Button
                asChild
                className="bg-primary text-primary-foreground hover:bg-primary-hover"
              >
                <Link href="/settings?tab=widget">Open widget settings</Link>
              </Button>
            }
          />
        </div>
      ) : (
        <div className="mt-8">
          <div className="mb-4 flex items-center gap-2">
            <span className="font-mono text-xs uppercase tracking-wider text-subtle-foreground">
              {leads.length} {leads.length === 1 ? 'lead' : 'leads'}
            </span>
            <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-success">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
                <span className="relative inline-flex size-1.5 rounded-full bg-success" />
              </span>
              Live
            </span>
          </div>
          <LeadList leads={leads} />
        </div>
      )}
    </>
  )
}
