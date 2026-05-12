import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArrowRight, CalendarCheck, Check, Zap } from 'lucide-react'
import Link from 'next/link'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { GradientBlur } from '@/components/ui/gradient-blur'
import { Section } from '@/components/ui/section'
import { JsonLd, faqPageSchema, serviceSchema, breadcrumbSchema } from '@/components/seo/JsonLd'
import { VERTICALS } from './vertical-data'

interface PageProps {
  params: Promise<{ vertical: string }>
}

const SITE = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.NEXT_PUBLIC_APP_URL ??
  'https://replyr.com'
).replace(/\/$/, '')

export function generateStaticParams() {
  return Object.keys(VERTICALS).map((v) => ({ vertical: v }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { vertical } = await params
  const data = VERTICALS[vertical]
  if (!data) return {}

  return {
    title: data.metaTitle,
    description: data.metaDescription,
    alternates: { canonical: `/for/${vertical}` },
    openGraph: {
      title: data.metaTitle,
      description: data.metaDescription,
      images: [{ url: `/for/${vertical}/opengraph-image`, width: 1200, height: 630 }],
    },
  }
}

const SHARED_FEATURES = [
  '30-second AI replies, 24/7',
  'Google Calendar appointment booking',
  'Web chat widget + email channel',
  'Real-time leads dashboard',
  'Agent trained on your specific business',
  'Lead qualification before you call back',
]

export default async function VerticalPage({ params }: PageProps) {
  const { vertical } = await params
  const data = VERTICALS[vertical]
  if (!data) notFound()

  const pageUrl = `${SITE}/for/${vertical}`

  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: `AI Lead Response for ${data.displayName}`,
          description: data.metaDescription,
          url: pageUrl,
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', url: SITE },
          { name: 'For Contractors', url: `${SITE}/for/plumbers` },
          { name: data.displayName, url: pageUrl },
        ])}
      />
      <JsonLd data={faqPageSchema(data.faq)} />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <GradientBlur position="top-left" size="lg" />
        <GradientBlur position="bottom-right" size="md" />
        <Section variant="default" className="relative z-10 py-24 sm:py-28">
          <div className="mx-auto max-w-3xl">
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex items-center gap-1.5 font-mono text-xs text-subtle-foreground">
                <li>
                  <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
                </li>
                <li aria-hidden>/</li>
                <li>
                  <Link href="/for/plumbers" className="hover:text-foreground transition-colors">For Contractors</Link>
                </li>
                <li aria-hidden>/</li>
                <li className="text-muted-foreground">{data.displayName}</li>
              </ol>
            </nav>

            <p className="font-mono text-xs uppercase tracking-wider text-primary">
              Built for {data.displayName}
            </p>
            <h1 className="mt-4 text-4xl font-medium tracking-tight text-foreground sm:text-5xl md:text-6xl">
              {data.headline}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {data.subhead}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{data.intro}</p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary-hover"
              >
                <Link href="/signup">
                  Start 14-day free trial <ArrowRight className="ml-1 size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-border">
                <Link href="/pricing">See pricing — $99/mo</Link>
              </Button>
            </div>
            <p className="mt-3 text-xs text-subtle-foreground">
              No credit card required · 5-minute setup · Cancel anytime
            </p>
          </div>
        </Section>
      </section>

      {/* Stats */}
      <Section variant="default" className="py-16">
        <div className="grid gap-6 rounded-2xl border border-border bg-surface p-8 sm:grid-cols-3 sm:p-10">
          {data.stats.map((s) => (
            <div key={s.label}>
              <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                {s.label}
              </p>
              <p className="mt-2 font-mono text-4xl font-medium tracking-tight text-foreground">
                {s.value}
              </p>
              <p className="mt-1 text-xs text-subtle-foreground">{s.sub}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Content sections */}
      <Section variant="default" className="py-8">
        <div className="space-y-20">
          {data.sections.map((section, i) => (
            <div
              key={i}
              className={`grid gap-10 md:grid-cols-2 md:gap-16 ${i % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''}`}
            >
              <div>
                <h2 className="text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
                  {section.h2}
                </h2>
                <div className="mt-4 space-y-4">
                  {section.body.split('\n\n').map((para, j) => (
                    <p key={j} className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {para}
                    </p>
                  ))}
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-full rounded-2xl border border-border bg-surface p-6">
                  <div className="flex items-center gap-2 text-primary">
                    {i === 0 ? (
                      <Zap className="size-4" />
                    ) : i === 1 ? (
                      <CalendarCheck className="size-4" />
                    ) : (
                      <Check className="size-4" />
                    )}
                    <span className="font-mono text-xs uppercase tracking-wider">
                      {i === 0
                        ? 'Why speed wins'
                        : i === 1
                          ? 'How it qualifies'
                          : 'What you get'}
                    </span>
                  </div>
                  <ul className="mt-4 space-y-3">
                    {SHARED_FEATURES.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm">
                        <Check className="mt-0.5 size-4 shrink-0 text-success" />
                        <span className="text-muted-foreground">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 border-t border-border pt-4">
                    <div className="flex items-baseline gap-1">
                      <span className="font-mono text-3xl font-medium text-foreground">$99</span>
                      <span className="text-sm text-muted-foreground">/mo</span>
                    </div>
                    <p className="mt-1 text-xs text-subtle-foreground">
                      14-day free trial · No credit card
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <section id="faq" className="border-t border-border/60 py-24">
        <Section variant="narrow">
          <div className="text-center">
            <p className="font-mono text-xs uppercase tracking-wider text-primary">FAQ</p>
            <h2 className="mt-3 text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
              Questions from {data.displayName.toLowerCase()}.
            </h2>
          </div>

          <Accordion type="single" collapsible className="mt-12">
            {data.faq.map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-border last:border-b-0">
                <AccordionTrigger className="text-left text-base font-medium tracking-tight">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Section>
      </section>

      {/* CTA */}
      <Section variant="default" className="pb-24">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-surface p-10 text-center sm:p-12">
          <GradientBlur position="center" size="md" />
          <div className="relative z-10">
            <p className="font-mono text-xs uppercase tracking-wider text-primary">
              Built for {data.displayName}
            </p>
            <h2 className="mt-3 text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
              Start capturing leads tonight.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">
              5 minutes to set up. 14 days free. Most contractors recoup the cost on the very first
              booked job.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button
                asChild
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary-hover"
              >
                <Link href="/signup">
                  Start free trial <ArrowRight className="ml-1 size-4" />
                </Link>
              </Button>
              <Button asChild variant="ghost" size="lg" className="text-muted-foreground">
                <Link href="/pricing">See full pricing</Link>
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* Internal links to other verticals */}
      <Section variant="default" className="pb-16">
        <p className="font-mono text-xs uppercase tracking-wider text-subtle-foreground">
          Also built for
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {Object.values(VERTICALS)
            .filter((v) => v.slug !== vertical)
            .map((v) => (
              <Link
                key={v.slug}
                href={`/for/${v.slug}`}
                className="rounded-full border border-border px-3 py-1 text-sm text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground"
              >
                {v.displayName}
              </Link>
            ))}
        </div>
      </Section>
    </>
  )
}
