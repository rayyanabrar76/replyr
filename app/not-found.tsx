import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { GradientBlur } from '@/components/ui/gradient-blur'
import { Wordmark } from '@/components/ui/wordmark'

export const metadata = {
  title: 'Page not found · Replyr',
}

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-4 text-center">
      <GradientBlur position="top-left" size="lg" />
      <GradientBlur position="bottom-right" size="lg" />

      <div className="relative z-10 flex flex-col items-center">
        <div className="mb-12">
          <Wordmark size="md" href="/" />
        </div>

        <p className="font-mono text-xs uppercase tracking-wider text-primary">404</p>
        <h1 className="mt-3 text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
          Page not found.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-base text-muted-foreground">
          We couldn&apos;t find the page you&apos;re looking for. It may have moved or never
          existed.
        </p>

        <div className="mt-10">
          <Button
            asChild
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary-hover"
          >
            <Link href="/">
              <ArrowLeft className="mr-1.5 size-4" />
              Back home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
