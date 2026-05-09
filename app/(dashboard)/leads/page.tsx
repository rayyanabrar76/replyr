import { createClient } from '@/lib/supabase/server'
import { LeadsRealtime } from './leads-realtime'

export default async function LeadsPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return null

  const { data: business } = await supabase
    .from('businesses')
    .select('id')
    .eq('owner_id', user.id)
    .limit(1)
    .single()

  if (!business) return null

  const { data: leads } = await supabase
    .from('leads')
    .select(
      'id, contact_name, contact_email, contact_phone, initial_message, status, created_at'
    )
    .eq('business_id', business.id)
    .order('created_at', { ascending: false })

  return (
    <div>
      <header>
        <h1 className="text-2xl font-medium tracking-tight text-foreground">Leads</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Customer inquiries, qualified by AI
        </p>
      </header>

      <LeadsRealtime
        initialLeads={(leads ?? []) as Parameters<typeof LeadsRealtime>[0]['initialLeads']}
        businessId={business.id}
      />
    </div>
  )
}
