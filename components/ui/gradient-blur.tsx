import { cn } from '@/lib/utils'

type Position = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center'
type Size = 'sm' | 'md' | 'lg'

interface GradientBlurProps {
  position?: Position
  size?: Size
  className?: string
}

const POS: Record<Position, string> = {
  'top-left': '-top-32 -left-32',
  'top-right': '-top-32 -right-32',
  'bottom-left': '-bottom-32 -left-32',
  'bottom-right': '-bottom-32 -right-32',
  center: 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
}

const SIZE: Record<Size, string> = {
  sm: 'h-[300px] w-[300px]',
  md: 'h-[500px] w-[500px]',
  lg: 'h-[800px] w-[800px]',
}

export function GradientBlur({ position = 'top-left', size = 'md', className }: GradientBlurProps) {
  return (
    <div
      aria-hidden
      className={cn(
        'pointer-events-none absolute z-0 rounded-full',
        POS[position],
        SIZE[size],
        className
      )}
      style={{
        background:
          'radial-gradient(closest-side, oklch(0.606 0.25 292 / 0.18), oklch(0.606 0.25 292 / 0.05) 60%, transparent 80%)',
        filter: 'blur(80px)',
      }}
    />
  )
}
