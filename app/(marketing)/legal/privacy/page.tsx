import { Section } from '@/components/ui/section'

export const metadata = {
  title: 'Privacy Policy — Replyr',
  description: 'How Replyr collects, uses, and protects your data.',
}

export default function PrivacyPage() {
  return (
    <Section variant="narrow" className="py-16">
      <header className="mb-12">
        <p className="font-mono text-xs uppercase tracking-wider text-primary">Legal</p>
        <h1 className="mt-3 text-4xl font-medium tracking-tight text-foreground">
          Privacy Policy
        </h1>
        <p className="mt-3 font-mono text-xs uppercase tracking-wider text-subtle-foreground">
          Last updated · 2026-05-09
        </p>
      </header>

      <div className="space-y-10 text-sm leading-relaxed text-muted-foreground">
        <P>
          This policy explains what data Replyr collects, how we use it, who we share it with, and
          your rights. Plain English. No tricks.
        </P>

        <Block title="1. What we collect">
          <P>From <strong className="text-foreground">contractors</strong> (paying customers):</P>
          <ul className="list-disc space-y-1 pl-5">
            <li>Name and email (account)</li>
            <li>Business profile (name, services, hours, FAQs, agent settings)</li>
            <li>Payment data — handled and stored by Stripe, not us</li>
            <li>Google Calendar refresh tokens (if you connect Calendar)</li>
          </ul>
          <P className="mt-3">
            From <strong className="text-foreground">end customers</strong> (people chatting with
            your widget):
          </P>
          <ul className="list-disc space-y-1 pl-5">
            <li>Name, email, phone, ZIP code (whatever they enter into the widget)</li>
            <li>Conversation messages with the AI</li>
            <li>Booking details if they schedule an appointment</li>
          </ul>
          <P className="mt-3">
            From <strong className="text-foreground">everyone</strong>: standard server logs (IP
            address, user agent) for security and debugging.
          </P>
        </Block>

        <Block title="2. How we use it">
          <ul className="list-disc space-y-1 pl-5">
            <li>To run the Service — store leads, generate AI replies, book appointments</li>
            <li>To bill you (via Stripe)</li>
            <li>To send service emails (account, billing, security)</li>
            <li>To improve Replyr (aggregate usage statistics, never tied back to identifiable
              users without consent)</li>
            <li>To comply with legal obligations</li>
          </ul>
          <P className="mt-3">
            We do <strong className="text-foreground">not</strong> sell your data. We do{' '}
            <strong className="text-foreground">not</strong> use lead conversation content to
            train AI models.
          </P>
        </Block>

        <Block title="3. Subprocessors">
          <P>We rely on these third-party services to deliver Replyr:</P>
          <ul className="list-disc space-y-1 pl-5">
            <li><strong className="text-foreground">Supabase</strong> — database, auth, storage</li>
            <li><strong className="text-foreground">Vercel</strong> — application hosting</li>
            <li><strong className="text-foreground">Stripe</strong> — payments &amp; billing</li>
            <li><strong className="text-foreground">Google</strong> — Gemini AI API + Calendar API
              (for booking)</li>
            <li><strong className="text-foreground">Anthropic</strong> — Claude AI API (alternate
              LLM provider)</li>
            <li><strong className="text-foreground">Resend</strong> — outbound and inbound email</li>
          </ul>
          <P className="mt-3">
            Each handles data per their own privacy policy and is contractually required to keep
            it secure.
          </P>
        </Block>

        <Block title="4. Cookies">
          <P>
            We use cookies for authentication and session management. We don&apos;t use ad tracking
            cookies or third-party analytics that profile users.
          </P>
        </Block>

        <Block title="5. Your rights">
          <P>You can:</P>
          <ul className="list-disc space-y-1 pl-5">
            <li>Access the data we have on you (visible in your dashboard, or email us)</li>
            <li>Correct or update it (in Settings)</li>
            <li>Delete your account and all associated data (email{' '}
              <a
                href="mailto:hello@replyr.app"
                className="text-foreground underline-offset-4 hover:underline"
              >
                hello@replyr.app
              </a>
              )</li>
            <li>Export it (we&apos;ll provide a JSON dump on request)</li>
          </ul>
          <P className="mt-3">
            If you&apos;re an EU/UK resident, the same rights are guaranteed under GDPR. California
            residents have similar rights under CCPA.
          </P>
        </Block>

        <Block title="6. Data retention">
          <P>
            We keep your data while your account is active. After cancellation, we retain it for
            30 days in case you reactivate, then delete. Backups are wiped within 90 days of
            cancellation.
          </P>
        </Block>

        <Block title="7. Security">
          <P>
            All data is encrypted in transit (TLS 1.2+) and at rest. Database access is restricted
            via Supabase Row Level Security. We use industry-standard practices but no system is
            100% secure — if you suspect a breach affecting your account, contact us immediately.
          </P>
        </Block>

        <Block title="8. Children">
          <P>
            Replyr is for businesses. We don&apos;t knowingly collect data from anyone under 13.
            If you believe a minor has used the Service, contact us and we&apos;ll delete the data.
          </P>
        </Block>

        <Block title="9. Changes">
          <P>
            We&apos;ll announce material changes by email and update the date at the top of this
            page.
          </P>
        </Block>

        <Block title="10. Contact">
          <P>
            Privacy questions or requests:{' '}
            <a
              href="mailto:hello@replyr.app"
              className="text-foreground underline-offset-4 hover:underline"
            >
              hello@replyr.app
            </a>
            .
          </P>
        </Block>
      </div>
    </Section>
  )
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-lg font-medium tracking-tight text-foreground">{title}</h2>
      <div className="mt-3 space-y-3">{children}</div>
    </section>
  )
}

function P({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={className}>{children}</p>
}
