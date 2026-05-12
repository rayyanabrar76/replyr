import type { Metadata } from 'next'
import {
  ArrowRight,
  CalendarCheck,
  Check,
  Clock,
  Code,
  Inbox,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Zap,
} from 'lucide-react'
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
import { JsonLd, softwareAppSchema, faqPageSchema } from '@/components/seo/JsonLd'

export const metadata: Metadata = {
  title: 'Replyr — AI Lead Response for Home Services Contractors',
  description:
    'Stop losing leads to slow replies. Replyr responds to contractor inquiries in 30 seconds, qualifies leads, and books appointments straight to Google Calendar. 14-day free trial.',
  alternates: { canonical: '/' },
}

const INDUSTRIES = [
  'Plumbing',
  'HVAC',
  'Roofing',
  'Electrical',
  'Cleaning',
  'Handyman',
  'Landscaping',
  'Pest Control',
]

const STATS = [
  { label: 'Average reply time', value: '30s', sub: 'vs. 2+ hours industry avg' },
  { label: 'Available', value: '24/7', sub: 'including nights & weekends' },
  { label: 'Lead capture rate', value: '95%+', sub: 'never miss a website inquiry' },
]

const STEPS = [
  {
    n: '01',
    icon: Code,
    title: 'Paste one line of code',
    description:
      'Drop our embed snippet on your website. A chat bubble appears in the corner — no design work needed.',
  },
  {
    n: '02',
    icon: Sparkles,
    title: 'Your AI takes the call',
    description:
      'When customers message, your agent replies in seconds — qualifies the lead, answers FAQs, gauges urgency.',
  },
  {
    n: '03',
    icon: CalendarCheck,
    title: 'Booked on your calendar',
    description:
      'Once the customer agrees to a time, the appointment lands on your Google Calendar. You just show up.',
  },
]

const FEATURES = [
  {
    icon: Zap,
    title: '30-second replies',
    description:
      'The fastest contractor wins. Replyr answers in seconds, day or night, while competitors are still asleep.',
  },
  {
    icon: CalendarCheck,
    title: 'Google Calendar booking',
    description:
      'Connect once. The AI books confirmed appointments straight to your calendar — no double-booking, no back-and-forth.',
  },
  {
    icon: Inbox,
    title: 'Email channel too',
    description:
      'Get a forwarding address. Customer emails become leads with auto-replies, all logged in your dashboard.',
  },
  {
    icon: MessageCircle,
    title: 'Real-time dashboard',
    description:
      'Leads appear live as they come in. Read every conversation, change status, follow up — all in one place.',
  },
  {
    icon: ShieldCheck,
    title: 'Trained on your business',
    description:
      'Tell it your services, hours, FAQs, and tone. The AI sticks to what you offer and how you talk.',
  },
  {
    icon: TrendingUp,
    title: 'Pre-qualified leads',
    description:
      'By the time you see a lead, the AI has already gathered details and confirmed intent. Less time tire-kicking.',
  },
]

const FAQ = [
  {
    q: 'How does the AI know about my business?',
    a: 'When you sign up, you tell it: your services, hours, service area ZIP codes, FAQs, and any custom rules ("always ask if it\'s an emergency", "never quote prices", etc.). The AI sticks to what you tell it.',
  },
  {
    q: "What if a customer asks something the AI doesn't know?",
    a: 'It says "let me have a team member follow up shortly" and logs the conversation in your dashboard. You take it from there — the lead is captured either way.',
  },
  {
    q: 'Does it actually book on my calendar?',
    a: 'Yes — connect Google Calendar once, and confirmed appointments get added automatically. The customer gets a calendar invite to their email.',
  },
  {
    q: 'Can I customize the AI tone?',
    a: 'Yes. Pick friendly-professional, formal, or casual, and add specific instructions ("mention 24/7 service", "ask if it\'s an emergency"). You can edit anytime.',
  },
  {
    q: 'What does it cost?',
    a: '$99/month flat. Unlimited leads, unlimited messages, all features included. 14-day free trial, no credit card needed to start. Cancel anytime.',
  },
  {
    q: 'How long does setup take?',
    a: 'About 5 minutes. Sign up → fill in your business info → paste one line of code on your site. Done.',
  },
  {
    q: 'What if I want to take over a conversation?',
    a: 'You can change the lead status to "handed off" at any point and reply directly. The AI steps back as soon as you do.',
  },
]

export default function LandingPage() {
  return (
    <>
      <JsonLd data={softwareAppSchema} />
      <JsonLd data={faqPageSchema(FAQ)} />
      {/* ─────────────────── HERO ─────────────────── */}
      <section className="relative overflow-hidden">
        <GradientBlur position="top-left" size="lg" />
        <GradientBlur position="bottom-right" size="lg" />

        <Section variant="default" className="relative z-10 py-24 text-center sm:py-32">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary-glow px-3 py-1 font-mono text-xs uppercase tracking-wider text-primary">
            <Sparkles className="size-3" />
            AI lead response for home services
          </div>

          <h1 className="mt-8 text-5xl font-medium tracking-tight text-foreground sm:text-6xl md:text-7xl">
            Never miss another lead.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            AI assistant that responds to your customers in 30 seconds — qualifies leads, answers
            questions, and books jobs straight to your calendar. Built for contractors.
          </p>

          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button
              asChild
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary-hover"
            >
              <Link href="/signup">
                Start 14-day free trial
                <ArrowRight className="ml-1 size-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              size="lg"
              className="text-muted-foreground hover:text-foreground"
            >
              <Link href="#how-it-works">See how it works</Link>
            </Button>
          </div>

          <p className="mt-6 text-xs text-subtle-foreground">
            No credit card required · 5-minute setup · Cancel anytime
          </p>

          {/* Industry strip */}
          <div className="mt-16">
            <p className="font-mono text-[10px] uppercase tracking-wider text-subtle-foreground">
              Built for
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {INDUSTRIES.map((i) => (
                <span
                  key={i}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {i}
                </span>
              ))}
            </div>
          </div>
        </Section>
      </section>

      {/* ─────────────────── STATS BAR ─────────────────── */}
      <Section variant="default" className="py-16">
        <div className="grid gap-8 rounded-2xl border border-border bg-surface p-8 sm:grid-cols-3 sm:p-10">
          {STATS.map((s) => (
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

      {/* ─────────────────── PROBLEM ─────────────────── */}
      <Section variant="default" className="py-24">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-primary">The problem</p>
            <h2 className="mt-3 text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
              78% of leads go to whoever responds first.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              When a customer&apos;s pipe bursts at 11pm, they don&apos;t leave a message and
              wait for a callback — they message three contractors and book the first one to reply.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Average reply time across home services? <span className="font-mono text-foreground">2 hours and 17 minutes.</span> Most of those leads are already gone.
            </p>
          </div>

          <div className="relative">
            <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
              <div className="flex items-center gap-3 border-b border-border pb-4">
                <Phone className="size-4 text-subtle-foreground" />
                <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  A typical day
                </span>
              </div>
              <div className="mt-5 space-y-4">
                <Timeline time="11:42 PM" event="Customer messages your website" status="lead" />
                <Timeline time="11:42 PM" event="Customer messages 2 competitors" status="lost" />
                <Timeline time="11:43 PM" event="One competitor replies (with AI)" status="lost" />
                <Timeline time="11:46 PM" event="Customer books with competitor" status="lost" />
                <Timeline time="8:14 AM" event="You see the message" status="too-late" />
              </div>
              <div className="mt-6 rounded-md border border-danger/30 bg-danger/10 p-3">
                <p className="text-xs text-danger">
                  Lead lost. Competitor wins. You lost a $400 job before you woke up.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ─────────────────── HOW IT WORKS ─────────────────── */}
      <section
        id="how-it-works"
        className="relative overflow-hidden border-y border-border/60 bg-surface/30 py-24"
      >
        <Section variant="default" className="relative z-10">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-mono text-xs uppercase tracking-wider text-primary">How it works</p>
            <h2 className="mt-3 text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
              Live in 5 minutes.
            </h2>
            <p className="mt-4 text-base text-muted-foreground">
              Three steps. No engineers, no contracts, no monthly setup calls.
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {STEPS.map((step) => (
              <div
                key={step.n}
                className="relative rounded-2xl border border-border bg-surface p-6"
              >
                <span className="font-mono text-xs uppercase tracking-wider text-subtle-foreground">
                  {step.n}
                </span>
                <div className="mt-5 flex h-10 w-10 items-center justify-center rounded-md bg-primary-glow text-primary">
                  <step.icon className="size-5" />
                </div>
                <h3 className="mt-5 text-base font-medium tracking-tight text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </Section>
      </section>

      {/* ─────────────────── FEATURES ─────────────────── */}
      <section id="features">
        <Section variant="default" className="py-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-mono text-xs uppercase tracking-wider text-primary">Features</p>
            <h2 className="mt-3 text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
              Everything in one place.
            </h2>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="group rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-border-strong"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary-glow text-primary">
                  <f.icon className="size-4" />
                </div>
                <h3 className="mt-5 text-base font-medium tracking-tight text-foreground">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </Section>
      </section>

      {/* ─────────────────── PRODUCT PREVIEW ─────────────────── */}
      <Section variant="default" className="py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs uppercase tracking-wider text-primary">
            What you'll see
          </p>
          <h2 className="mt-3 text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
            Your dashboard, real-time.
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            Every lead, every conversation, every booking — live as it happens.
          </p>
        </div>

        <div className="relative mt-16">
          <GradientBlur position="center" size="lg" />
          <div className="relative z-10 grid gap-6 lg:grid-cols-2">
            {/* Stat cards mock */}
            <div className="rounded-2xl border border-border bg-surface p-6">
              <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                Live dashboard
              </p>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <MockStat label="New this week" value="12" icon={Inbox} />
                <MockStat label="Booked" value="5" icon={CalendarCheck} />
                <MockStat label="Conversion" value="42%" icon={TrendingUp} />
                <MockStat label="Reply time" value="28s" icon={Clock} />
              </div>
            </div>

            {/* Conversation mock */}
            <div className="rounded-2xl border border-border bg-surface p-6">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  Live conversation
                </span>
                <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-success">
                  <span className="relative flex size-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
                    <span className="relative inline-flex size-1.5 rounded-full bg-success" />
                  </span>
                  Active
                </span>
              </div>
              <div className="mt-4 space-y-3">
                <MockBubble role="user">
                  Hi, my water heater is leaking. Can someone come tomorrow?
                </MockBubble>
                <MockBubble role="assistant">
                  Sorry to hear that! Is it leaking actively or just not heating? If it&apos;s an
                  active leak, we have 24/7 emergency service.
                </MockBubble>
                <MockBubble role="user">
                  Active leak. Tomorrow afternoon would be great.
                </MockBubble>
                <MockBubble role="assistant">
                  Got it — I have you down for tomorrow at 2pm. We&apos;ll send a calendar invite to
                  your email shortly.
                </MockBubble>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ─────────────────── PRICING TEASER ─────────────────── */}
      <Section variant="default" className="py-24">
        <div className="overflow-hidden rounded-2xl border border-primary/30 bg-surface">
          <div className="grid items-center gap-10 p-8 sm:grid-cols-5 sm:p-12">
            <div className="sm:col-span-3">
              <p className="font-mono text-xs uppercase tracking-wider text-primary">Pricing</p>
              <h2 className="mt-3 text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
                One plan. Everything included.
              </h2>
              <p className="mt-4 text-base text-muted-foreground">
                $99/month flat. Unlimited leads, unlimited replies, all integrations. 14 days free
                — no credit card to start.
              </p>
              <div className="mt-6 flex flex-col gap-2 sm:flex-row">
                <Button
                  asChild
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary-hover"
                >
                  <Link href="/signup">
                    Start free trial <ArrowRight className="ml-1 size-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-border">
                  <Link href="/pricing">See full pricing</Link>
                </Button>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-background p-6 sm:col-span-2">
              <div className="flex items-baseline gap-1">
                <span className="font-mono text-5xl font-medium tracking-tight text-foreground">
                  $99
                </span>
                <span className="text-sm text-muted-foreground">/mo</span>
              </div>
              <p className="mt-1 text-xs text-subtle-foreground">Billed monthly. Cancel anytime.</p>
              <ul className="mt-6 space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 size-4 shrink-0 text-success" />
                  <span className="text-muted-foreground">Unlimited AI replies</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 size-4 shrink-0 text-success" />
                  <span className="text-muted-foreground">Calendar booking</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 size-4 shrink-0 text-success" />
                  <span className="text-muted-foreground">Web + email channels</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 size-4 shrink-0 text-success" />
                  <span className="text-muted-foreground">Real-time dashboard</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* ─────────────────── FAQ ─────────────────── */}
      <section id="faq">
        <Section variant="narrow" className="py-24">
          <div className="text-center">
            <p className="font-mono text-xs uppercase tracking-wider text-primary">FAQ</p>
            <h2 className="mt-3 text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
              Common questions.
            </h2>
          </div>

          <Accordion type="single" collapsible className="mt-12">
            {FAQ.map((item, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border-border last:border-b-0"
              >
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

      {/* ─────────────────── FINAL CTA ─────────────────── */}
      <Section variant="default" className="pb-24">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-surface p-12 text-center">
          <GradientBlur position="center" size="md" />
          <div className="relative z-10">
            <h2 className="text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
              Stop losing leads.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">
              5 minutes to set up. 14 days free. Most contractors recoup the monthly cost on the
              first booked job.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button
                asChild
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary-hover"
              >
                <Link href="/signup">
                  Start your free trial <ArrowRight className="ml-1 size-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                size="lg"
                className="text-muted-foreground hover:text-foreground"
              >
                <Link href="/login">Sign in</Link>
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}

// ─── helper components ────────────────────────────────────────────────────

function Timeline({
  time,
  event,
  status,
}: {
  time: string
  event: string
  status: 'lead' | 'lost' | 'too-late'
}) {
  const colors = {
    lead: 'bg-primary',
    lost: 'bg-danger',
    'too-late': 'bg-subtle-foreground',
  }
  return (
    <div className="flex items-start gap-3">
      <div className="flex flex-col items-center pt-1">
        <span className={`size-1.5 rounded-full ${colors[status]}`} />
      </div>
      <div className="flex-1">
        <p className="font-mono text-xs text-subtle-foreground">{time}</p>
        <p
          className={`text-sm ${
            status === 'lost' || status === 'too-late'
              ? 'text-muted-foreground line-through'
              : 'text-foreground'
          }`}
        >
          {event}
        </p>
      </div>
    </div>
  )
}

function MockStat({
  label,
  value,
  icon: Icon,
}: {
  label: string
  value: string
  icon: typeof Inbox
}) {
  return (
    <div className="rounded-lg border border-border bg-background p-3">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
        <Icon className="size-3 text-primary" />
      </div>
      <p className="mt-2 font-mono text-2xl font-medium text-foreground">{value}</p>
    </div>
  )
}

function MockBubble({
  role,
  children,
}: {
  role: 'user' | 'assistant'
  children: React.ReactNode
}) {
  const isUser = role === 'user'
  return (
    <div className={isUser ? 'flex justify-end' : 'flex justify-start'}>
      <div
        className={
          'max-w-[85%] rounded-2xl px-3 py-2 text-xs leading-relaxed ' +
          (isUser
            ? 'bg-primary text-primary-foreground'
            : 'bg-surface-elevated text-foreground border border-border')
        }
      >
        {children}
      </div>
    </div>
  )
}
