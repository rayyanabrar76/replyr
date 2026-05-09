import { redirect } from 'next/navigation'
import { TopNav } from '@/components/dashboard/top-nav'
import { Section } from '@/components/ui/section'
import { createClient } from '@/lib/supabase/server'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  // Onboarding gate
  const { data: business } = await supabase
    .from('businesses')
    .select('id')
    .eq('owner_id', user.id)
    .limit(1)
    .maybeSingle()

  if (!business) redirect('/onboarding')

  // Profile (for nav)
  const profileQuery = await supabase
    .from('profiles')
    .select('full_name')
    .eq('id', user.id)
    .maybeSingle()

  const profile = profileQuery.data as { full_name: string | null } | null

  const fullName =
    profile?.full_name ??
    (typeof user.user_metadata?.full_name === 'string'
      ? user.user_metadata.full_name
      : null)

  return (
    <div className="flex min-h-screen flex-col">
      <TopNav user={{ fullName, email: user.email ?? '' }} />
      <main className="flex-1 py-8">
        <Section variant="default">{children}</Section>
      </main>
    </div>
  )
}
