import { Skeleton } from '@/components/ui/skeleton'

export default function SettingsLoading() {
  return (
    <div>
      <header>
        <Skeleton className="h-8 w-28" />
        <Skeleton className="mt-2 h-4 w-80" />
      </header>

      {/* Tab strip */}
      <div className="mt-8">
        <div className="flex flex-wrap gap-1 rounded-md bg-surface p-1">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-24 rounded" />
          ))}
        </div>

        {/* Active tab card */}
        <div className="mt-6 rounded-xl border border-border bg-surface">
          <div className="flex items-center gap-3 border-b border-border p-6">
            <Skeleton className="h-9 w-9 shrink-0 rounded-md" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-3 w-72" />
            </div>
          </div>

          <div className="space-y-6 p-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-9 w-full" />
              </div>
            ))}
            <div className="flex justify-end">
              <Skeleton className="h-9 w-32" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
