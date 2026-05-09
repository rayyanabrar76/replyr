import { GradientBlur } from '@/components/ui/gradient-blur'
import { Skeleton } from '@/components/ui/skeleton'
import { Wordmark } from '@/components/ui/wordmark'

export default function OnboardingLoading() {
  return (
    <div className="relative flex min-h-screen flex-col items-center overflow-hidden bg-background px-4 py-12">
      <GradientBlur position="top-left" size="lg" />
      <GradientBlur position="bottom-right" size="lg" />

      <div className="relative z-10 flex w-full max-w-xl flex-col items-center">
        <div className="mb-8">
          <Wordmark size="md" />
        </div>

        <div className="w-full overflow-hidden rounded-xl border border-border bg-surface">
          {/* Card header */}
          <div className="space-y-2 p-6">
            <Skeleton className="h-5 w-56" />
            <Skeleton className="h-3.5 w-full max-w-md" />
            <Skeleton className="h-3.5 w-3/4" />
          </div>

          {/* Form fields */}
          <div className="space-y-6 p-6 pt-0">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-3 w-32" />
                <Skeleton className={i === 3 ? 'h-20 w-full' : 'h-9 w-full'} />
              </div>
            ))}
            <Skeleton className="mt-4 h-10 w-full" />
          </div>
        </div>
      </div>
    </div>
  )
}
