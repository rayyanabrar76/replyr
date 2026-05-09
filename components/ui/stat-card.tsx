import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StatCardProps {
  label: string
  value: string | number
  change?: string
  icon?: LucideIcon
  className?: string
}

export function StatCard({ label, value, change, icon: Icon, className }: StatCardProps) {
  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-xl border border-border bg-surface p-5',
        'transition-colors hover:border-border-strong',
        className
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
        {Icon && (
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary-glow text-primary">
            <Icon className="size-3.5" />
          </div>
        )}
      </div>

      <div className="mt-4 font-mono text-3xl font-medium tracking-tight text-foreground">
        {value}
      </div>

      {change && (
        <div className="mt-1 text-xs text-subtle-foreground">{change}</div>
      )}
    </div>
  )
}
