import { notFound } from 'next/navigation'
import { createServiceClient } from '@/lib/supabase/service'
import { WidgetChat } from './widget-chat'

interface PageProps {
  params: Promise<{ key: string }>
}

export default async function WidgetPage({ params }: PageProps) {
  const { key } = await params
  const supabase = createServiceClient()

  const { data: business } = await supabase
    .from('businesses')
    .select('id, name, agent_name')
    .eq('widget_api_key', key)
    .maybeSingle()

  if (!business) notFound()

  return (
    <WidgetChat
      apiKey={key}
      businessName={business.name}
      agentName={business.agent_name}
    />
  )
}
