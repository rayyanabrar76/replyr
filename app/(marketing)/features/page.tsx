import type { Metadata } from 'next'
import {
  ArrowRight,
  CalendarCheck,
  Clock,
  Code,
  Globe,
  Inbox,
  MessageCircle,
  Settings,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Zap,
} from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { GradientBlur } from '@/components/ui/gradient-blur'
import { Section } from '@/components/ui/section'

export const metadata: Metadata = {
  title: 'Features — AI Lead Response, Booking & Dashboard',
  description:
    'Replyr gives contractors a 30-second AI responder, Google Calendar booking, web and email lead capture, real-time dashboard, and a customizable agent trained on your business.',
  alternates: { canonical: '/features' },
}

const FEATURES = [
  {
    icon: Zap,
    title: '30-second AI replies',
    body: 'The moment a lead lands on your website and sends a message, Replyr replies — day, night, weekend, holiday. Average response time under 30 seconds. The industry average is over 2 hours.',
    tag: 'Core',
  },
  {
    icon: CalendarCheck,
    title: 'Google Calendar booking',
    body: 'Connect your Google Calendar once. When a customer agrees to a time slot, Replyr creates the event and sends them a calendar invite — no double-booking, no phone tag.',
    tag: 'Integration',
  },
  {
    icon: Inbox,
    title: 'Email lead capture',
    body: 'Get a Replyr forwarding address. Point your website contact form or Google Business email there. Inbound emails become leads with auto-replies, all logged in your dashboard.',
    tag: 'Channel',
  },
  {
    icon: MessageCircle,
    title: 'Real-time leads dashboard',
    body: 'Every lead appears live the moment it comes in. Read the full conversation, see contact details, track status (new → qualifying → booked), and follow up — all in one place.',
    tag: 'Dashboard',
  },
  {
    icon: ShieldCheck,
    title: 'Agent trained on your business',
    body: 'During onboarding you tell Replyr: your services, pricing rules, hours, service area ZIP codes, FAQs, and custom instructions. The AI sticks to what you define — no hallucinated prices.',
    tag: 'Customization',
  },
  {
    icon: TrendingUp,
    title: 'Lead qualification',
    body: 'By the time a lead reaches you, Replyr has already gathered: job type, urgency, contact info, and service area. Less time on the phone for you, more ready-to-book leads.',
    tag: 'Qualification',
  },
  {
    icon: Code,
    title: 'One-line embed',
    body: 'Add a single `<script>` tag to your website. A chat bubble appears in the corner — styled to blend in. No developer required, no page rebuilds. Works on WordPress, Wix, Squarespace, and custom sites.',
    tag: 'Setup',
  },
  {
    icon: Settings,
    title: 'Tone and persona control',
    body: 'Choose from friendly-professional, formal, or casual. Name your agent, set a greeting, and add instructions like "always ask if it\'s an emergency" or "never quote exact prices over chat."',
    tag: 'Customization',
  },
  {
    icon: Globe,
    title: 'Service area filtering',
    body: 'Enter your service area ZIP codes. Replyr politely declines leads outside your area and explains that you only serve certain locations — saving everyone\'s time.',
    tag: 'Filtering',
  },
  {
    icon: Clock,
    title: 'Business hours awareness',
    body: 'Tell Replyr your hours. During off-hours, the AI lets customers know when to expect follow-up while still capturing their details and booking appointments for the next available slot.',
    tag: 'Scheduling',
  },
  {
    icon: Sparkles,
    title: 'Conversation transcripts',
    body: 'Every message is stored. Read any conversation in full from the dashboard. Know exactly what your AI said and what the customer asked — full audit trail.',
    tag: 'Transparency',
  },
  {
    icon: MessageCircle,
    title: 'Hand-off control',
    body: 'Change a lead status to "handed off" and reply directly. The AI steps back. You can take over any conversation at any point without confusing the customer.',
    tag: 'Control',
  },
]

const WORKFLOW = [
  {
    n: '01',
    title: 'Customer visits your website',
    body: 'They see the chat bubble in the corner. They click it and type their question.',
  },
  {
    n: '02',
    title: 'Replyr replies in under 30 seconds',
    body: 'The AI greets them, identifies their need, asks qualifying questions (urgency, location, job type).',
  },
  {
    n: '03',
    title: 'Lead is qualified and captured',
    body: 'Contact info, job type, urgency, and service area — all gathered before you ever look at the lead.',
  },
  {
    n: '04',
    title: 'Appointment booked to Google Calendar',
    body: 'If the customer agrees to a time, Replyr creates the event and sends a confirmation.',
  },
  {
    n: '05',
    title: 'You wake up to a full calendar',
    body: 'Check your dashboard. See every lead, every conversation, every appointment — sorted and ready.',
  },
]

export default function FeaturesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <GradientBlur position="top-left" size="lg" />
        <Section variant="default" className="relative z-10 py-24 text-center sm:py-28">
          <p className="font-mono text-xs uppercase tracking-wider text-primary">Features</p>
          <h1 className="mt-4 text-4xl font-medium tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Every tool a contractor needs to capture and book leads.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            One platform. AI that replies in 30 seconds, Google Calendar booking, real-time
            dashboard, email capture, and a custom agent trained on your specific business.
          </p>
          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
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
              <Link href="/pricing">See pricing</Link>
            </Button>
          </div>
        </Section>
      </section>

      {/* Workflow */}
      <section className="border-y border-border/60 bg-surface/30 py-24">
        <Section variant="default">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-mono text-xs uppercase tracking-wider text-primary">How it flows</p>
            <h2 className="mt-3 text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
              From first message to booked appointment.
            </h2>
          </div>

          <div className="relative mt-16">
            <div className="absolute left-4 top-0 hidden h-full w-px bg-border md:block" />
            <div className="space-y-8">
              {WORKFLOW.map((step) => (
                <div key={step.n} className="relative flex gap-6 md:items-start">
                  <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-primary-glow font-mono text-xs text-primary">
                    {step.n}
                  </div>
                  <div className="pb-2">
                    <h3 className="text-base font-medium tracking-tight text-foreground">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>
      </section>

      {/* Feature grid */}
      <Section variant="default" className="py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs uppercase tracking-wider text-primary">Full feature list</p>
          <h2 className="mt-3 text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
            Everything included at $99/month.
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            No feature tiers. No per-lead fees. Every feature below is included.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-border-strong"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary-glow text-primary">
                  <f.icon className="size-4" />
                </div>
                <span className="rounded-full border border-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-subtle-foreground">
                  {f.tag}
                </span>
              </div>
              <h3 className="mt-4 text-base font-medium tracking-tight text-foreground">
                {f.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section variant="default" className="pb-24">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-surface p-12 text-center">
          <GradientBlur position="center" size="md" />
          <div className="relative z-10">
            <h2 className="text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
              Start capturing leads tonight.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">
              5-minute setup. 14 days free. Most contractors recoup the cost on the first booked job.
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
                <Link href="/pricing">View pricing</Link>
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}
