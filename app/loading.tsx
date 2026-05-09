import { Loader2 } from 'lucide-react'
import { Wordmark } from '@/components/ui/wordmark'

// Global fallback used while a route segment is suspending and no nearer
// loading.tsx is defined. Most route groups have their own skeleton.
export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="mb-6 opacity-60">
        <Wordmark size="md" />
      </div>
      <Loader2 className="size-5 animate-spin text-muted-foreground" />
    </div>
  )
}
