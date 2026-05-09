import { redirect } from 'next/navigation'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { GradientBlur } from '@/components/ui/gradient-blur'
import { Wordmark } from '@/components/ui/wordmark'
import { createClient } from '@/lib/supabase/server'
import { OnboardingForm } from './onboarding-form'

export const metadata = {
  title: 'Set up your business · Replyr',
}

export default async function OnboardingPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  // If they already have a business, skip onboarding
  const { data: existing } = await supabase
    .from('businesses')
    .select('id')
    .eq('owner_id', user.id)
    .limit(1)
    .maybeSingle()

  if (existing) redirect('/leads')

  return (
    <div className="relative flex min-h-screen flex-col items-center overflow-hidden bg-background px-4 py-12">
      <GradientBlur position="top-left" size="lg" />
      <GradientBlur position="bottom-right" size="lg" />

      <div className="relative z-10 flex w-full max-w-xl flex-col items-center">
        <div className="mb-8">
          <Wordmark size="md" href="/" />
        </div>

        <Card className="w-full border-border bg-surface">
          <CardHeader>
            <CardTitle className="text-xl font-medium tracking-tight">
              Tell us about your business
            </CardTitle>
            <CardDescription>
              Replyr&apos;s AI uses this to answer customer questions and qualify leads.
              You can update everything later in Settings.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <OnboardingForm />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
