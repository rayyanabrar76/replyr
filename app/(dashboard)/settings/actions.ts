'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'

export type ActionState =
  | { status: 'idle' }
  | { status: 'success'; message: string }
  | { status: 'error'; message: string; fieldErrors?: Record<string, string> }

// Helper: convert comma-or-newline-separated text into a clean string array
function splitList(input: FormDataEntryValue | null): string[] | null {
  if (typeof input !== 'string' || !input.trim()) return null
  return input
    .split(/[,\n]/)
    .map((s) => s.trim())
    .filter(Boolean)
}

// ---------------------------------------------------------------
// Business profile
// ---------------------------------------------------------------

const businessSchema = z.object({
  name: z.string().min(1, 'Business name is required').max(120),
  industry: z.string().min(1).max(60),
  phone: z.string().max(40).optional().or(z.literal('')),
  website: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  hoursDescription: z.string().max(500).optional().or(z.literal('')),
})

export async function updateBusiness(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const parsed = businessSchema.safeParse({
    name: formData.get('name'),
    industry: formData.get('industry'),
    phone: formData.get('phone'),
    website: formData.get('website'),
    hoursDescription: formData.get('hoursDescription'),
  })
  if (!parsed.success) {
    return mapZodErrors(parsed.error)
  }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { status: 'error', message: 'Not authenticated' }

  const services = splitList(formData.get('services'))
  const zips = splitList(formData.get('serviceAreaZips'))
  const faqs = splitList(formData.get('faqs'))

  const businessHours = parsed.data.hoursDescription
    ? { description: parsed.data.hoursDescription }
    : null

  const { error } = await supabase
    .from('businesses')
    .update({
      name: parsed.data.name,
      industry: parsed.data.industry,
      phone: parsed.data.phone || null,
      website: parsed.data.website || null,
      services,
      service_area_zips: zips,
      faqs,
      business_hours: businessHours,
    })
    .eq('owner_id', user.id)

  if (error) return { status: 'error', message: error.message }

  revalidatePath('/settings')
  return { status: 'success', message: 'Business profile saved.' }
}

// ---------------------------------------------------------------
// AI Agent
// ---------------------------------------------------------------

const agentSchema = z.object({
  agent_name: z.string().min(1, 'Agent name is required').max(60),
  agent_tone: z.enum(['friendly_professional', 'formal', 'casual']),
  agent_instructions: z.string().max(2000).optional().or(z.literal('')),
})

export async function updateAgent(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const parsed = agentSchema.safeParse({
    agent_name: formData.get('agent_name'),
    agent_tone: formData.get('agent_tone'),
    agent_instructions: formData.get('agent_instructions'),
  })
  if (!parsed.success) {
    return mapZodErrors(parsed.error)
  }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { status: 'error', message: 'Not authenticated' }

  const { error } = await supabase
    .from('businesses')
    .update({
      agent_name: parsed.data.agent_name,
      agent_tone: parsed.data.agent_tone,
      agent_instructions: parsed.data.agent_instructions || null,
    })
    .eq('owner_id', user.id)

  if (error) return { status: 'error', message: error.message }

  revalidatePath('/settings')
  return { status: 'success', message: 'AI agent saved.' }
}

// ---------------------------------------------------------------
// Account (profile + password)
// ---------------------------------------------------------------

const profileSchema = z.object({
  full_name: z.string().max(120).optional().or(z.literal('')),
})

export async function updateProfile(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const parsed = profileSchema.safeParse({
    full_name: formData.get('full_name'),
  })
  if (!parsed.success) {
    return mapZodErrors(parsed.error)
  }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { status: 'error', message: 'Not authenticated' }

  const { error } = await supabase
    .from('profiles')
    .update({ full_name: parsed.data.full_name || null })
    .eq('id', user.id)

  if (error) return { status: 'error', message: error.message }

  revalidatePath('/settings')
  revalidatePath('/leads')
  return { status: 'success', message: 'Profile saved.' }
}

const passwordSchema = z
  .object({
    new_password: z.string().min(8, 'Password must be at least 8 characters'),
    confirm_password: z.string(),
  })
  .refine((d) => d.new_password === d.confirm_password, {
    path: ['confirm_password'],
    message: 'Passwords do not match',
  })

export async function updatePassword(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const parsed = passwordSchema.safeParse({
    new_password: formData.get('new_password'),
    confirm_password: formData.get('confirm_password'),
  })
  if (!parsed.success) {
    return mapZodErrors(parsed.error)
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.updateUser({
    password: parsed.data.new_password,
  })

  if (error) return { status: 'error', message: error.message }

  return { status: 'success', message: 'Password updated.' }
}

// ---------------------------------------------------------------
// Lead status (used by the lead drawer)
// ---------------------------------------------------------------

const leadStatusSchema = z.object({
  leadId: z.string().uuid(),
  status: z.enum([
    'new',
    'qualifying',
    'qualified',
    'booked',
    'lost',
    'handed_off',
  ]),
})

export async function updateLeadStatus(
  leadId: string,
  status: string
): Promise<ActionState> {
  const parsed = leadStatusSchema.safeParse({ leadId, status })
  if (!parsed.success) {
    return mapZodErrors(parsed.error)
  }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { status: 'error', message: 'Not authenticated' }

  // RLS will restrict to leads under owned businesses
  const { error } = await supabase
    .from('leads')
    .update({
      status: parsed.data.status,
      qualified_at:
        parsed.data.status === 'qualified' ? new Date().toISOString() : undefined,
    })
    .eq('id', parsed.data.leadId)

  if (error) return { status: 'error', message: error.message }

  revalidatePath('/leads')
  return { status: 'success', message: 'Lead status updated.' }
}

// ---------------------------------------------------------------
// Forwarding email slug
// ---------------------------------------------------------------

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 30)
}

export async function ensureForwardingEmailSlug(): Promise<string | null> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return null

  const { data: business } = await supabase
    .from('businesses')
    .select('id, name, forwarding_email_slug')
    .eq('owner_id', user.id)
    .limit(1)
    .single()

  if (!business) return null
  if (business.forwarding_email_slug) return business.forwarding_email_slug

  const base = slugify(business.name) || 'inbox'
  const suffix = crypto.randomUUID().replace(/-/g, '').slice(0, 6)
  const slug = `${base}-${suffix}`

  const { error } = await supabase
    .from('businesses')
    .update({ forwarding_email_slug: slug })
    .eq('id', business.id)

  if (error) return null
  return slug
}

// ---------------------------------------------------------------
// Disconnect Google Calendar
// ---------------------------------------------------------------

export async function disconnectGoogleCalendar(): Promise<ActionState> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { status: 'error', message: 'Not authenticated' }

  const { error } = await supabase
    .from('businesses')
    .update({ google_refresh_token: null, google_calendar_id: null })
    .eq('owner_id', user.id)

  if (error) return { status: 'error', message: error.message }

  revalidatePath('/settings')
  return { status: 'success', message: 'Google Calendar disconnected.' }
}

// ---------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------

function mapZodErrors(error: z.ZodError): ActionState {
  const fieldErrors: Record<string, string> = {}
  for (const issue of error.issues) {
    const key = issue.path[0]
    if (typeof key === 'string' && !fieldErrors[key]) {
      fieldErrors[key] = issue.message
    }
  }
  return {
    status: 'error',
    message: 'Please fix the errors below.',
    fieldErrors,
  }
}
