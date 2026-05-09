import { Section } from '@/components/ui/section'

export const metadata = {
  title: 'Terms of Service — Replyr',
  description: 'The legal terms governing your use of Replyr.',
}

export default function TermsPage() {
  return (
    <Section variant="narrow" className="prose-invert py-16">
      <header className="mb-12">
        <p className="font-mono text-xs uppercase tracking-wider text-primary">Legal</p>
        <h1 className="mt-3 text-4xl font-medium tracking-tight text-foreground">
          Terms of Service
        </h1>
        <p className="mt-3 font-mono text-xs uppercase tracking-wider text-subtle-foreground">
          Last updated · 2026-05-09
        </p>
      </header>

      <div className="space-y-10 text-sm leading-relaxed text-muted-foreground">
        <P>
          These terms govern your use of Replyr (&quot;we&quot;, &quot;us&quot;, the
          &quot;Service&quot;). By creating an account or using the Service, you agree to be
          bound by these terms. If you don&apos;t agree, don&apos;t use the Service.
        </P>

        <Block title="1. Account">
          <P>
            You must be at least 18 years old and have authority to bind your business to these
            terms. You&apos;re responsible for keeping your password secure and for everything that
            happens under your account.
          </P>
          <P>
            One account per business. We may suspend accounts we believe are being used for
            fraudulent, abusive, or illegal activity.
          </P>
        </Block>

        <Block title="2. Subscription &amp; billing">
          <P>
            Replyr is a subscription service. Pricing is shown on the Pricing page. We bill in
            advance, monthly, via Stripe. You can cancel at any time through your billing portal —
            cancellation stops future charges; we don&apos;t pro-rate the current period.
          </P>
          <P>
            We offer a free trial period at signup. If you don&apos;t add a payment method, your
            access to paid features ends when the trial ends.
          </P>
          <P>
            We may change pricing on 30 days&apos; notice. Continued use after notice constitutes
            acceptance of the new pricing.
          </P>
        </Block>

        <Block title="3. Acceptable use">
          <P>You agree not to use the Service to:</P>
          <ul className="list-disc space-y-1 pl-5">
            <li>Send spam, phishing messages, or any content you don&apos;t have rights to</li>
            <li>Impersonate another business or person</li>
            <li>Attempt to bypass rate limits, scrape data, or reverse-engineer the Service</li>
            <li>Resell access to the Service without our written permission</li>
            <li>Use the Service for any business that&apos;s illegal in your jurisdiction</li>
          </ul>
        </Block>

        <Block title="4. AI-generated content">
          <P>
            Replyr&apos;s AI replies to your customers based on the configuration and instructions
            you provide. The AI can make mistakes — it may misunderstand a customer, give
            inaccurate information, or fail to follow your instructions in edge cases.
          </P>
          <P>
            <strong className="text-foreground">You are responsible for the messages your
            agent sends.</strong> We strongly recommend reviewing conversations regularly,
            especially when you first set up. Don&apos;t use Replyr in contexts where an
            inaccurate response could cause harm (medical, legal, safety-critical advice).
          </P>
        </Block>

        <Block title="5. Your data">
          <P>
            You own the business information you put into Replyr. You also own the lead and
            conversation data that flows through the Service. We process this data to provide the
            Service to you, as described in our Privacy Policy.
          </P>
          <P>
            You can export or delete your data at any time. If you cancel, we retain your data for
            30 days then delete it.
          </P>
        </Block>

        <Block title="6. Service availability">
          <P>
            We aim for high availability but make no uptime guarantees. The Service depends on
            third parties (Supabase, Stripe, Vercel, OpenAI/Google AI). When they have outages,
            we will too.
          </P>
        </Block>

        <Block title="7. Termination">
          <P>
            You can stop using the Service at any time. We can suspend or terminate accounts that
            violate these terms or pose risk to other users.
          </P>
        </Block>

        <Block title="8. Disclaimers &amp; limits of liability">
          <P>
            The Service is provided &quot;as is&quot;. To the maximum extent permitted by law, we
            disclaim warranties of merchantability, fitness for a particular purpose, and
            non-infringement.
          </P>
          <P>
            Our total liability arising out of these terms is capped at the greater of $100 or the
            amount you paid us in the prior 12 months. We are not liable for indirect, incidental,
            consequential, or special damages — including lost profits or lost leads.
          </P>
        </Block>

        <Block title="9. Changes">
          <P>
            We may update these terms occasionally. Material changes will be announced by email or
            in-app notice. Continued use after changes means you accept the updated terms.
          </P>
        </Block>

        <Block title="10. Contact">
          <P>
            Questions? Email{' '}
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

function P({ children }: { children: React.ReactNode }) {
  return <p>{children}</p>
}
