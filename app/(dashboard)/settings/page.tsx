import {
  Building2,
  Code,
  CreditCard,
  Plug,
  Sparkles,
  User,
  type LucideIcon,
} from 'lucide-react'
import { redirect } from 'next/navigation'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { buildForwardingAddress, INBOUND_EMAIL_DOMAIN } from '@/lib/email'
import { createClient } from '@/lib/supabase/server'
import { AccountForm } from './account-form'
import { ensureForwardingEmailSlug } from './actions'
import { AgentForm } from './agent-form'
import { BillingSection } from './billing-section'
import { BusinessForm } from './business-form'
import { IntegrationsSection } from './integrations-section'
import { WidgetEmbed } from './widget-embed'

interface TabConfig {
  value: string
  label: string
  icon: LucideIcon
  title: string
  description: string
}

const TABS: TabConfig[] = [
  {
    value: 'business',
    label: 'Business',
    icon: Building2,
    title: 'Business profile',
    description:
      'Name, industry, hours, services, ZIPs, and FAQs — used by your AI to answer customer questions.',
  },
  {
    value: 'agent',
    label: 'AI Agent',
    icon: Sparkles,
    title: 'AI Agent',
    description: 'Tone, name, and custom instructions. Tune how your AI talks to customers.',
  },
  {
    value: 'widget',
    label: 'Widget',
    icon: Code,
    title: 'Website widget',
    description: 'Embed this on your site to capture leads and reply with AI.',
  },
  {
    value: 'integrations',
    label: 'Integrations',
    icon: Plug,
    title: 'Integrations',
    description: 'Connect Google Calendar for booking and email forwarding for inbound leads.',
  },
  {
    value: 'billing',
    label: 'Billing',
    icon: CreditCard,
    title: 'Billing',
    description: 'Plan, usage, and payment method. Powered by Stripe.',
  },
  {
    value: 'account',
    label: 'Account',
    icon: User,
    title: 'Account',
    description: 'Your profile and password.',
  },
]

interface SettingsPageProps {
  searchParams: Promise<{ tab?: string }>
}

export default async function SettingsPage({ searchParams }: SettingsPageProps) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const businessQuery = await supabase
    .from('businesses')
    .select(
      'id, name, industry, phone, website, services, service_area_zips, business_hours, faqs, agent_name, agent_tone, agent_instructions, widget_api_key, google_refresh_token, forwarding_email_slug, subscription_status, stripe_customer_id'
    )
    .eq('owner_id', user.id)
    .limit(1)
    .single()

  const business = businessQuery.data
  if (!business) redirect('/onboarding')

  const profileQuery = await supabase
    .from('profiles')
    .select('full_name')
    .eq('id', user.id)
    .maybeSingle()

  const profile = (profileQuery.data as { full_name: string | null } | null) ?? {
    full_name: null,
  }

  const appUrl =
    process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, '') ?? 'http://localhost:3000'

  // Auto-create a forwarding slug the first time the user lands on settings.
  let forwardingSlug = business.forwarding_email_slug
  if (!forwardingSlug) {
    forwardingSlug = await ensureForwardingEmailSlug()
  }
  const forwardingAddress = forwardingSlug ? buildForwardingAddress(forwardingSlug) : null

  const stripeConfigured = !!process.env.STRIPE_SECRET_KEY && !!process.env.STRIPE_PRICE_ID
  const inboundConfigured = !!INBOUND_EMAIL_DOMAIN

  const { tab } = await searchParams
  const validTabs = TABS.map((t) => t.value)
  const initialTab = tab && validTabs.includes(tab) ? tab : 'business'

  return (
    <div>
      <header>
        <h1 className="text-2xl font-medium tracking-tight text-foreground">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Configure your business, agent, and integrations
        </p>
      </header>

      <div className="mt-8">
        <Tabs defaultValue={initialTab}>
          <TabsList className="flex h-auto w-full flex-wrap justify-start gap-1 bg-surface p-1">
            {TABS.map(({ value, label, icon: Icon }) => (
              <TabsTrigger key={value} value={value} className="gap-2">
                <Icon className="size-3.5" />
                {label}
              </TabsTrigger>
            ))}
          </TabsList>

          {TABS.map((tab) => {
            const { value, title, description, icon: Icon } = tab
            return (
              <TabsContent key={value} value={value} className="mt-6">
                <Card className="border-border bg-surface">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary-glow text-primary">
                        <Icon className="size-4" />
                      </div>
                      <div>
                        <CardTitle className="text-base font-medium tracking-tight">
                          {title}
                        </CardTitle>
                        <CardDescription className="mt-1 text-sm">
                          {description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {value === 'business' && <BusinessForm business={business} />}
                    {value === 'agent' && <AgentForm agent={business} />}
                    {value === 'widget' && (
                      <WidgetEmbed appUrl={appUrl} apiKey={business.widget_api_key} />
                    )}
                    {value === 'integrations' && (
                      <IntegrationsSection
                        calendarConnected={!!business.google_refresh_token}
                        forwardingAddress={forwardingAddress}
                        inboundConfigured={inboundConfigured}
                      />
                    )}
                    {value === 'billing' && (
                      <BillingSection
                        status={business.subscription_status}
                        hasStripeCustomer={!!business.stripe_customer_id}
                        stripeConfigured={stripeConfigured}
                      />
                    )}
                    {value === 'account' && (
                      <AccountForm profile={profile} email={user.email ?? ''} />
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            )
          })}
        </Tabs>
      </div>
    </div>
  )
}
