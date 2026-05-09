import { Skeleton } from '@/components/ui/skeleton'

export default function LeadsLoading() {
  return (
    <div>
      {/* Header */}
      <header>
        <Skeleton className="h-8 w-24" />
        <Skeleton className="mt-2 h-4 w-72" />
      </header>

      {/* Stat cards */}
      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl border border-border bg-surface p-5"
          >
            <div className="flex items-center justify-between">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-7 w-7 rounded-md" />
            </div>
            <Skeleton className="mt-4 h-8 w-16" />
            <Skeleton className="mt-1 h-3 w-28" />
          </div>
        ))}
      </div>

      {/* Lead count + live indicator */}
      <div className="mt-8 mb-4 flex items-center gap-2">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-3 w-12" />
      </div>

      {/* Lead list */}
      <div className="overflow-hidden rounded-xl border border-border bg-surface">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className={
              'flex items-center gap-4 px-5 py-4 ' +
              (i !== 4 ? 'border-b border-border' : '')
            }
          >
            <div className="min-w-0 flex-1 space-y-2">
              <div className="flex items-center gap-3">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-16 rounded-full" />
              </div>
              <Skeleton className="h-3.5 w-3/4" />
              <div className="flex items-center gap-4 pt-0.5">
                <Skeleton className="h-3 w-36" />
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
            <Skeleton className="h-4 w-4 shrink-0" />
          </div>
        ))}
      </div>
    </div>
  )
}
