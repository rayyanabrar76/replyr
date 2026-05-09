import { cn } from '@/lib/utils'

type Variant = 'default' | 'narrow' | 'wide'

const MAX_W: Record<Variant, string> = {
  default: 'max-w-6xl',
  narrow: 'max-w-2xl',
  wide: 'max-w-7xl',
}

interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: Variant
  as?: keyof React.JSX.IntrinsicElements
}

export function Section({
  variant = 'default',
  as: Tag = 'div',
  className,
  children,
  ...rest
}: SectionProps) {
  const Element = Tag as React.ElementType
  return (
    <Element
      className={cn('mx-auto w-full px-6 sm:px-8', MAX_W[variant], className)}
      {...rest}
    >
      {children}
    </Element>
  )
}
