import { Skeleton } from '@/components/ui/skeleton'

export default function AppointmentsLoading() {
  return (
    <div>
      <header>
        <Skeleton className="h-8 w-40" />
        <Skeleton className="mt-2 h-4 w-64" />
      </header>

      {/* Tabs */}
      <div className="mt-8">
        <div className="flex gap-1 rounded-md bg-surface p-1 sm:w-fit">
          <Skeleton className="h-8 w-20 rounded" />
          <Skeleton className="h-8 w-24 rounded" />
        </div>

        {/* Empty-state placeholder */}
        <div className="mt-6 flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-surface/30 px-6 py-16">
          <Skeleton className="mb-5 h-12 w-12 rounded-full" />
          <Skeleton className="h-5 w-48" />
          <Skeleton className="mt-2 h-4 w-72" />
        </div>
      </div>
    </div>
  )
}
