import Link from 'next/link'
import { cn } from '@/lib/utils'

interface WordmarkProps {
  size?: 'sm' | 'md' | 'lg'
  href?: string
  className?: string
}

const SIZES = {
  sm: { text: 'text-base', dot: 'h-1.5 w-1.5' },
  md: { text: 'text-lg', dot: 'h-2 w-2' },
  lg: { text: 'text-2xl', dot: 'h-2.5 w-2.5' },
}

export function Wordmark({ size = 'md', href, className }: WordmarkProps) {
  const s = SIZES[size]
  const content = (
    <span
      className={cn(
        'inline-flex items-center gap-2 font-medium tracking-tight text-foreground',
        s.text,
        className
      )}
    >
      <span
        aria-hidden
        className={cn(
          'rounded-full bg-primary',
          s.dot,
          'shadow-[0_0_12px_var(--primary-glow)]'
        )}
      />
      Replyr
    </span>
  )

  if (href) {
    return (
      <Link href={href} className="inline-flex">
        {content}
      </Link>
    )
  }
  return content
}
