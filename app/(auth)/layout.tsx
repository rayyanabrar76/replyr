import { GradientBlur } from '@/components/ui/gradient-blur'
import { Wordmark } from '@/components/ui/wordmark'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4">
      <GradientBlur position="top-left" size="lg" />
      <GradientBlur position="bottom-right" size="lg" />

      <div className="relative z-10 flex w-full max-w-sm flex-col items-center">
        <div className="mb-8">
          <Wordmark size="md" href="/" />
        </div>
        {children}
      </div>
    </div>
  )
}
