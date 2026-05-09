'use server'

import { redirect } from 'next/navigation'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'

const schema = z.object({
  name: z.string().min(1, 'Business name is required').max(120),
  phone: z.string().max(40).optional(),
  website: z.string().url().optional().or(z.literal('')),
  industry: z.string().max(60).default('home_services'),
  services: z.string().max(2000).optional(),
  serviceAreaZips: z.string().max(500).optional(),
  agentTone: z.string().max(60).default('friendly_professional'),
  agentInstructions: z.string().max(2000).optional(),
})

type ActionState = {
  error?: string
  fieldErrors?: Record<string, string>
}

export async function createBusiness(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const parsed = schema.safeParse({
    name: formData.get('name'),
    phone: formData.get('phone') || undefined,
    website: formData.get('website') || undefined,
    industry: formData.get('industry') || 'home_services',
    services: formData.get('services') || undefined,
    serviceAreaZips: formData.get('serviceAreaZips') || undefined,
    agentTone: formData.get('agentTone') || 'friendly_professional',
    agentInstructions: formData.get('agentInstructions') || undefined,
  })

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {}
    for (const issue of parsed.error.issues) {
      const key = issue.path[0]
      if (typeof key === 'string') fieldErrors[key] = issue.message
    }
    return { error: 'Please fix the errors below.', fieldErrors }
  }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated.' }

  const data = parsed.data

  // Parse comma-separated services into JSON array
  const servicesJson = data.services
    ? data.services
        .split(/[,\n]/)
        .map((s) => s.trim())
        .filter(Boolean)
    : null

  // Parse comma-separated zips into text[]
  const zips = data.serviceAreaZips
    ? data.serviceAreaZips
        .split(/[,\s]+/)
        .map((z) => z.trim())
        .filter(Boolean)
    : null

  const { error } = await supabase.from('businesses').insert({
    owner_id: user.id,
    name: data.name,
    industry: data.industry,
    phone: data.phone || null,
    website: data.website || null,
    services: servicesJson,
    service_area_zips: zips,
    agent_tone: data.agentTone,
    agent_instructions: data.agentInstructions || null,
  })

  if (error) {
    return { error: error.message }
  }

  redirect('/leads')
}
