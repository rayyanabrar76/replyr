import { ArrowRight, Check, Sparkles } from 'lucide-react'
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

export const metadata = {
  title: 'Pricing — Replyr',
  description:
    '$99/month flat. Unlimited leads, AI replies, calendar booking, email channel. 14-day free trial, no credit card.',
}

const FEATURES = [
  'Unlimited AI lead replies',
  'Web chat widget (one-line embed)',
  'Email channel + auto-reply',
  'Google Calendar booking',
  'Real-time leads dashboard',
  'Customizable agent (tone, services, FAQs)',
  'Conversation transcripts',
  'Lead status tracking',
  'Multi-ZIP service area support',
  'Stripe-powered subscription portal',
]

const FAQ = [
  {
    q: 'Is there really no credit card needed?',
    a: 'Correct — you sign up with email + password, get 14 days free, and we only ask for a card if you decide to keep going.',
  },
  {
    q: 'What counts as a "lead"?',
    a: 'Anyone who fills out your widget form or sends an email through your forwarding address. We never charge per lead — flat rate, unlimited.',
  },
  {
    q: 'Can I use my own AI keys?',
    a: 'Not currently — Replyr uses our Gemini infrastructure under the hood. We absorb the API costs in your $99/month.',
  },
  {
    q: 'Do you offer annual pricing?',
    a: 'Not yet, but if you want a discount on a year up front, email hello@replyr.app and we\'ll sort something out.',
  },
  {
    q: 'What if my business has multiple locations?',
    a: 'Each location gets its own widget API key + agent. Right now it\'s one location per account — multi-location is on the roadmap.',
  },
  {
    q: 'How do refunds work?',
    a: 'Cancel anytime through your billing portal. We don\'t pro-rate, but you keep access until the end of the paid period.',
  },
]

export default function PricingPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <GradientBlur position="top-left" size="lg" />
        <Section variant="default" className="relative z-10 py-24 text-center">
          <p className="font-mono text-xs uppercase tracking-wider text-primary">Pricing</p>
          <h1 className="mt-4 text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
            Simple. One plan. Everything in.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground">
            We don&apos;t do tier games or per-lead fees. Pick the plan, get every feature, never
            worry about overages.
          </p>
        </Section>
      </section>

      {/* Pricing card */}
      <Section variant="default" className="pb-24">
        <div className="mx-auto max-w-3xl">
          <div className="relative overflow-hidden rounded-3xl border border-primary/40 bg-surface">
            <GradientBlur position="top-right" size="md" />

            <div className="relative z-10 grid gap-10 p-8 sm:p-12 lg:grid-cols-2">
              {/* Left: plan summary */}
              <div className="flex flex-col">
                <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/30 bg-primary-glow px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-primary">
                  <Sparkles className="size-3" /> Replyr Pro
                </span>

                <div className="mt-6 flex items-baseline gap-2">
                  <span className="font-mono text-6xl font-medium tracking-tight text-foreground">
                    $99
                  </span>
                  <span className="text-base text-muted-foreground">/ month</span>
                </div>

                <p className="mt-2 text-sm text-muted-foreground">
                  Billed monthly. Cancel anytime.
                </p>

                <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                  Most contractors recoup the monthly cost on the first booked job. After that, every
                  lead the AI captures is profit.
                </p>

                <div className="mt-8 flex flex-col gap-2">
                  <Button
                    asChild
                    size="lg"
                    className="bg-primary text-primary-foreground hover:bg-primary-hover"
                  >
                    <Link href="/signup">
                      Start 14-day free trial <ArrowRight className="ml-1 size-4" />
                    </Link>
                  </Button>
                  <p className="text-center text-xs text-subtle-foreground">
                    No credit card required to start
                  </p>
                </div>
              </div>

              {/* Right: feature list */}
              <div>
                <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  What&apos;s included
                </p>
                <ul className="mt-4 space-y-3">
                  {FEATURES.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <Check className="mt-0.5 size-4 shrink-0 text-success" />
                      <span className="text-foreground">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Reassurance row */}
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <Reassure title="14-day trial" sub="No card needed" />
            <Reassure title="Cancel anytime" sub="No contracts" />
            <Reassure title="Setup in 5 min" sub="No engineers needed" />
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section variant="narrow" className="pb-24">
        <div className="text-center">
          <p className="font-mono text-xs uppercase tracking-wider text-primary">FAQ</p>
          <h2 className="mt-3 text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
            Pricing questions.
          </h2>
        </div>

        <Accordion type="single" collapsible className="mt-12">
          {FAQ.map((item, i) => (
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
    </>
  )
}

function Reassure({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="rounded-xl border border-border bg-surface p-4 text-center">
      <p className="text-sm font-medium tracking-tight text-foreground">{title}</p>
      <p className="mt-1 text-xs text-subtle-foreground">{sub}</p>
    </div>
  )
}
