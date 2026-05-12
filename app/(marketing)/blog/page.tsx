import type { Metadata } from 'next'
import { ArrowRight, BookOpen } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Section } from '@/components/ui/section'

export const metadata: Metadata = {
  title: 'Blog — Contractor Lead Generation & AI Guides',
  description:
    'Practical guides for home services contractors on AI lead response, faster follow-up, Google Calendar booking, and growing revenue without more headcount.',
  alternates: { canonical: '/blog' },
}

const COMING_SOON_POSTS = [
  {
    title: 'Why 78% of Home Service Leads Go to Whoever Replies First',
    category: 'Lead Response',
    excerpt:
      'The data on contractor response times is brutal. Here\'s what the research says and how to fix it.',
  },
  {
    title: 'How to Set Up an AI Chatbot for Your Plumbing Business (Step-by-Step)',
    category: 'How-To',
    excerpt:
      'A complete walkthrough: from embedding the widget to customizing your AI agent\'s tone and services.',
  },
  {
    title: 'HVAC Lead Generation: The 5 Channels That Actually Work in 2026',
    category: 'Lead Generation',
    excerpt:
      'Google LSA, Angi, Facebook, your website widget, and referrals — ranked by cost-per-lead for HVAC.',
  },
  {
    title: 'Missed Call Text Back vs. AI Chat Widget: Which Converts Better?',
    category: 'Comparison',
    excerpt:
      'Both claim to capture more leads. We break down where each wins and why most contractors need both.',
  },
  {
    title: 'How to Qualify Roofing Leads Without Wasting Time on Tire-Kickers',
    category: 'Lead Qualification',
    excerpt:
      'The 5 questions to ask every roofing lead before scheduling a site visit — and how to automate them.',
  },
  {
    title: 'Google Calendar + Contractor Software: The Complete Booking Setup',
    category: 'Integrations',
    excerpt:
      'Connect Replyr to Google Calendar and let the AI book jobs while you\'re on the job site.',
  },
]

export default function BlogPage() {
  return (
    <>
      <Section variant="default" className="py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs uppercase tracking-wider text-primary">Blog</p>
          <h1 className="mt-4 text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
            Guides for contractors who want more leads.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground">
            Practical, no-fluff advice on AI lead response, contractor software, and growing a home
            services business.
          </p>
        </div>

        {/* Coming soon banner */}
        <div className="mx-auto mt-16 max-w-3xl rounded-2xl border border-primary/30 bg-primary-glow p-8 text-center">
          <BookOpen className="mx-auto size-8 text-primary" />
          <h2 className="mt-4 text-xl font-medium tracking-tight text-foreground">
            First posts dropping soon.
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            We&apos;re writing practical guides specifically for HVAC, plumbing, roofing, and
            electrical contractors. Sign up to get notified.
          </p>
          <Button
            asChild
            size="lg"
            className="mt-6 bg-primary text-primary-foreground hover:bg-primary-hover"
          >
            <Link href="/signup">
              Get notified — start free trial <ArrowRight className="ml-1 size-4" />
            </Link>
          </Button>
        </div>

        {/* Preview of upcoming posts */}
        <div className="mt-16">
          <p className="font-mono text-xs uppercase tracking-wider text-subtle-foreground">
            Upcoming articles
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {COMING_SOON_POSTS.map((post) => (
              <div
                key={post.title}
                className="rounded-xl border border-border bg-surface p-5 opacity-60"
              >
                <span className="rounded-full border border-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-subtle-foreground">
                  {post.category}
                </span>
                <h3 className="mt-3 text-sm font-medium tracking-tight text-foreground">
                  {post.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{post.excerpt}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </>
  )
}
