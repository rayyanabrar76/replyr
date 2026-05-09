import * as React from 'react'
import { cn } from '@/lib/utils'

type Variant = 'ghost' | 'subtle' | 'primary'
type Size = 'sm' | 'md' | 'lg'

const VARIANT: Record<Variant, string> = {
  ghost: 'hover:bg-white/5 text-muted-foreground hover:text-foreground',
  subtle: 'bg-white/5 hover:bg-white/10 text-foreground',
  primary: 'bg-primary text-primary-foreground hover:bg-primary-hover',
}

const SIZE: Record<Size, string> = {
  sm: 'h-8 w-8',
  md: 'h-9 w-9',
  lg: 'h-10 w-10',
}

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ variant = 'ghost', size = 'md', className, ...rest }, ref) => (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center rounded-md transition-colors',
        'focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
        '[&_svg]:size-4 [&_svg]:shrink-0',
        VARIANT[variant],
        SIZE[size],
        className
      )}
      {...rest}
    />
  )
)

IconButton.displayName = 'IconButton'
