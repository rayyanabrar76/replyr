import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArrowRight, Check, Minus, X } from 'lucide-react'
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
import { JsonLd, breadcrumbSchema, faqPageSchema } from '@/components/seo/JsonLd'
import { COMPETITORS } from './compare-data'

interface PageProps {
  params: Promise<{ competitor: string }>
}

const SITE = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.NEXT_PUBLIC_APP_URL ??
  'https://replyr.com'
).replace(/\/$/, '')

export function generateStaticParams() {
  return Object.keys(COMPETITORS).map((c) => ({ competitor: c }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { competitor } = await params
  const data = COMPETITORS[competitor]
  if (!data) return {}

  return {
    title: data.metaTitle,
    description: data.metaDescription,
    alternates: { canonical: `/compare/${competitor}` },
    openGraph: {
      title: data.metaTitle,
      description: data.metaDescription,
      images: [{ url: `/compare/${competitor}/opengraph-image`, width: 1200, height: 630 }],
    },
  }
}

export default async function ComparePage({ params }: PageProps) {
  const { competitor } = await params
  const data = COMPETITORS[competitor]
  if (!data) notFound()

  const pageUrl = `${SITE}/compare/${competitor}`

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', url: SITE },
          { name: 'Compare', url: `${SITE}/compare/podium-alternative` },
          { name: data.headline, url: pageUrl },
        ])}
      />
      <JsonLd data={faqPageSchema(data.faq)} />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <GradientBlur position="top-left" size="lg" />
        <Section variant="default" className="relative z-10 py-24 sm:py-28">
          <div className="mx-auto max-w-3xl">
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex items-center gap-1.5 font-mono text-xs text-subtle-foreground">
                <li>
                  <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
                </li>
                <li aria-hidden>/</li>
                <li className="text-muted-foreground">Compare</li>
                <li aria-hidden>/</li>
                <li className="text-muted-foreground">{data.headline}</li>
              </ol>
            </nav>

            <p className="font-mono text-xs uppercase tracking-wider text-primary">
              Replyr vs. {data.name}
            </p>
            <h1 className="mt-4 text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
              {data.headline}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">{data.subhead}</p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{data.intro}</p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary-hover"
              >
                <Link href="/signup">
                  Try Replyr free — 14 days <ArrowRight className="ml-1 size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-border">
                <Link href="/pricing">See pricing</Link>
              </Button>
            </div>
          </div>
        </Section>
      </section>

      {/* Why contractors switch */}
      <section className="border-y border-border/60 bg-surface/30 py-24">
        <Section variant="default">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-mono text-xs uppercase tracking-wider text-primary">
              Why contractors choose Replyr
            </p>
            <h2 className="mt-3 text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
              What makes Replyr different from {data.name}.
            </h2>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {data.whySwitchPoints.map((point, i) => (
              <div key={i} className="rounded-2xl border border-border bg-surface p-6">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary-glow font-mono text-sm font-medium text-primary">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="mt-4 text-base font-medium tracking-tight text-foreground">
                  {point.title}
                </h3>
                <div className="mt-3 space-y-3">
                  {point.body.split('\n\n').map((para, j) => (
                    <p key={j} className="text-sm leading-relaxed text-muted-foreground">
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>
      </section>

      {/* Comparison table */}
      <Section variant="default" className="py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs uppercase tracking-wider text-primary">
            Feature comparison
          </p>
          <h2 className="mt-3 text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
            Side by side.
          </h2>
        </div>

        <div className="mt-12 overflow-hidden rounded-2xl border border-border">
          {/* Table header */}
          <div className="grid grid-cols-3 border-b border-border bg-surface px-6 py-4">
            <div className="text-sm font-medium text-muted-foreground">Feature</div>
            <div className="text-center">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary-glow px-3 py-1 font-mono text-xs text-primary">
                Replyr
              </span>
            </div>
            <div className="text-center">
              <span className="font-mono text-xs text-muted-foreground">{data.name}</span>
            </div>
          </div>

          {/* Table rows */}
          {data.table.map((row, i) => (
            <div
              key={i}
              className={`grid grid-cols-3 px-6 py-3.5 ${i !== data.table.length - 1 ? 'border-b border-border/60' : ''} ${i % 2 === 0 ? '' : 'bg-surface/30'}`}
            >
              <div className="text-sm text-muted-foreground">{row.feature}</div>
              <div className="flex justify-center">
                <CellValue value={row.replyr} positive />
              </div>
              <div className="flex justify-center">
                <CellValue value={row.competitor} />
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Verdict */}
      <Section variant="narrow" className="pb-16">
        <div className="rounded-2xl border border-primary/30 bg-surface p-8">
          <p className="font-mono text-xs uppercase tracking-wider text-primary">
            Our honest verdict
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">{data.verdict}</p>
        </div>
      </Section>

      {/* FAQ */}
      <section className="border-t border-border/60 py-24">
        <Section variant="narrow">
          <div className="text-center">
            <p className="font-mono text-xs uppercase tracking-wider text-primary">FAQ</p>
            <h2 className="mt-3 text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
              Common questions.
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
            <h2 className="text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
              Try Replyr free for 14 days.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">
              No credit card. 5-minute setup. See the difference for yourself.
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

      {/* Other comparisons */}
      <Section variant="default" className="pb-16">
        <p className="font-mono text-xs uppercase tracking-wider text-subtle-foreground">
          More comparisons
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {Object.values(COMPETITORS)
            .filter((c) => c.slug !== competitor)
            .map((c) => (
              <Link
                key={c.slug}
                href={`/compare/${c.slug}`}
                className="rounded-full border border-border px-3 py-1 text-sm text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground"
              >
                Replyr vs. {c.name}
              </Link>
            ))}
        </div>
      </Section>
    </>
  )
}

function CellValue({
  value,
  positive = false,
}: {
  value: string | boolean
  positive?: boolean
}) {
  if (typeof value === 'boolean') {
    if (value) {
      return <Check className="size-4 text-success" aria-label="Yes" />
    }
    return positive ? (
      <Minus className="size-4 text-muted-foreground" aria-label="Not available" />
    ) : (
      <X className="size-4 text-danger" aria-label="No" />
    )
  }
  return (
    <span className={`text-xs font-medium ${positive ? 'text-foreground' : 'text-muted-foreground'}`}>
      {value}
    </span>
  )
}
