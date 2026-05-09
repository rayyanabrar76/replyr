'use client'

import { AlertTriangle, RotateCw } from 'lucide-react'
import Link from 'next/link'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { GradientBlur } from '@/components/ui/gradient-blur'
import { Wordmark } from '@/components/ui/wordmark'

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-4 text-center">
      <GradientBlur position="top-left" size="lg" />
      <GradientBlur position="bottom-right" size="lg" />

      <div className="relative z-10 flex flex-col items-center">
        <div className="mb-12">
          <Wordmark size="md" href="/" />
        </div>

        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-danger/10 text-danger">
          <AlertTriangle className="size-5" />
        </div>

        <p className="font-mono text-xs uppercase tracking-wider text-danger">Error</p>
        <h1 className="mt-3 text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
          Something went wrong.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-base text-muted-foreground">
          An unexpected error occurred. Try again, or head home if it keeps happening.
        </p>

        {error.digest && (
          <p className="mt-3 font-mono text-[10px] uppercase tracking-wider text-subtle-foreground">
            Reference · {error.digest}
          </p>
        )}

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button
            type="button"
            size="lg"
            onClick={reset}
            className="bg-primary text-primary-foreground hover:bg-primary-hover"
          >
            <RotateCw className="mr-1.5 size-4" />
            Try again
          </Button>
          <Button asChild variant="outline" size="lg" className="border-border">
            <Link href="/">Back home</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
