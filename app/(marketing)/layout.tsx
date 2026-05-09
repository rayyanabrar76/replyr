import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Section } from '@/components/ui/section'
import { Wordmark } from '@/components/ui/wordmark'

const NAV_LINKS = [
  { href: '/#features', label: 'Features' },
  { href: '/#how-it-works', label: 'How it works' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/#faq', label: 'FAQ' },
]

const FOOTER_LINKS = [
  {
    title: 'Product',
    links: [
      { href: '/#features', label: 'Features' },
      { href: '/#how-it-works', label: 'How it works' },
      { href: '/pricing', label: 'Pricing' },
      { href: '/login', label: 'Sign in' },
    ],
  },
  {
    title: 'Company',
    links: [
      { href: '/#faq', label: 'FAQ' },
      { href: 'mailto:hello@replyr.app', label: 'Contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { href: '/legal/terms', label: 'Terms' },
      { href: '/legal/privacy', label: 'Privacy' },
    ],
  },
]

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
        <Section variant="wide" as="nav" className="flex h-14 items-center justify-between gap-6">
          <Wordmark size="sm" href="/" />

          <ul className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
            >
              <Link href="/login">Sign in</Link>
            </Button>
            <Button
              asChild
              size="sm"
              className="bg-primary text-primary-foreground hover:bg-primary-hover"
            >
              <Link href="/signup">
                Start free
                <ArrowRight className="ml-1 size-3.5" />
              </Link>
            </Button>
          </div>
        </Section>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="mt-24 border-t border-border/60 py-12">
        <Section variant="wide">
          <div className="grid gap-12 md:grid-cols-4">
            <div className="md:col-span-1">
              <Wordmark size="sm" href="/" />
              <p className="mt-4 max-w-xs text-sm text-muted-foreground">
                AI lead-response agent for US home services contractors. Never miss another job.
              </p>
            </div>

            {FOOTER_LINKS.map((col) => (
              <div key={col.title}>
                <h4 className="font-mono text-xs uppercase tracking-wider text-subtle-foreground">
                  {col.title}
                </h4>
                <ul className="mt-4 space-y-2">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border/60 pt-6 sm:flex-row sm:items-center">
            <p className="text-xs text-subtle-foreground">© 2026 Replyr · Made for contractors</p>
            <p className="font-mono text-[10px] uppercase tracking-wider text-subtle-foreground">
              Built with care
            </p>
          </div>
        </Section>
      </footer>
    </div>
  )
}
