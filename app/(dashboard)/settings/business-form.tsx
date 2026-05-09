'use client'

import { Loader2 } from 'lucide-react'
import { useActionState, useEffect } from 'react'
import { useFormStatus } from 'react-dom'
import { toast } from 'sonner'

import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { updateBusiness, type ActionState } from './actions'

const INDUSTRIES = [
  { value: 'home_services', label: 'Home services (general)' },
  { value: 'plumbing', label: 'Plumbing' },
  { value: 'hvac', label: 'HVAC' },
  { value: 'electrical', label: 'Electrical' },
  { value: 'roofing', label: 'Roofing' },
  { value: 'landscaping', label: 'Landscaping & lawn care' },
  { value: 'cleaning', label: 'Cleaning' },
  { value: 'handyman', label: 'Handyman' },
  { value: 'pest_control', label: 'Pest control' },
  { value: 'general_contracting', label: 'General contracting' },
]

interface BusinessFormProps {
  business: {
    name: string
    industry: string
    phone: string | null
    website: string | null
    services: unknown
    service_area_zips: string[] | null
    business_hours: unknown
    faqs: unknown
  }
}

function joinArray(value: unknown): string {
  if (Array.isArray(value)) return value.filter(Boolean).join('\n')
  return ''
}

function getHoursDescription(value: unknown): string {
  if (value && typeof value === 'object' && 'description' in value) {
    const d = (value as { description: unknown }).description
    if (typeof d === 'string') return d
  }
  if (typeof value === 'string') return value
  return ''
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button
      type="submit"
      disabled={pending}
      className="bg-primary text-primary-foreground hover:bg-primary-hover"
    >
      {pending && <Loader2 className="mr-2 size-4 animate-spin" />}
      {pending ? 'Saving…' : 'Save changes'}
    </Button>
  )
}

export function BusinessForm({ business }: BusinessFormProps) {
  const [state, formAction] = useActionState<ActionState, FormData>(
    updateBusiness,
    { status: 'idle' }
  )

  useEffect(() => {
    if (state.status === 'success') toast.success(state.message)
  }, [state])

  const fieldErrors =
    state.status === 'error' ? state.fieldErrors ?? {} : {}

  return (
    <form action={formAction} className="space-y-6">
      {state.status === 'error' && !state.fieldErrors && (
        <Alert variant="destructive">
          <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="name">
          Business name <span className="text-danger">*</span>
        </Label>
        <Input
          id="name"
          name="name"
          required
          defaultValue={business.name}
          placeholder="Acme Plumbing"
        />
        {fieldErrors.name && <p className="text-xs text-danger">{fieldErrors.name}</p>}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="industry">Industry</Label>
          <Select name="industry" defaultValue={business.industry}>
            <SelectTrigger id="industry">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {INDUSTRIES.map((i) => (
                <SelectItem key={i.value} value={i.value}>
                  {i.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            defaultValue={business.phone ?? ''}
            placeholder="(555) 123-4567"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="website">Website</Label>
        <Input
          id="website"
          name="website"
          type="url"
          defaultValue={business.website ?? ''}
          placeholder="https://acmeplumbing.com"
        />
        {fieldErrors.website && <p className="text-xs text-danger">{fieldErrors.website}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="hoursDescription">
          Business hours
          <span className="ml-2 text-xs text-subtle-foreground">(plain English is fine)</span>
        </Label>
        <Input
          id="hoursDescription"
          name="hoursDescription"
          defaultValue={getHoursDescription(business.business_hours)}
          placeholder="Mon-Fri 8am-6pm, Sat 9am-3pm, 24/7 emergency"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="services">
          Services
          <span className="ml-2 text-xs text-subtle-foreground">(one per line)</span>
        </Label>
        <Textarea
          id="services"
          name="services"
          rows={4}
          defaultValue={joinArray(business.services)}
          placeholder={'Drain cleaning\nWater heater install\nLeak repair'}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="serviceAreaZips">
          Service area ZIP codes
          <span className="ml-2 text-xs text-subtle-foreground">(comma or newline separated)</span>
        </Label>
        <Textarea
          id="serviceAreaZips"
          name="serviceAreaZips"
          rows={2}
          defaultValue={joinArray(business.service_area_zips)}
          placeholder="78701, 78702, 78703"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="faqs">
          FAQs
          <span className="ml-2 text-xs text-subtle-foreground">
            (one per line, format: &quot;Q: ... A: ...&quot;)
          </span>
        </Label>
        <Textarea
          id="faqs"
          name="faqs"
          rows={4}
          defaultValue={joinArray(business.faqs)}
          placeholder={'Q: Do you charge for estimates? A: Free estimates on all jobs over $500.\nQ: Are you licensed? A: Yes, fully licensed and insured in TX.'}
        />
      </div>

      <div className="flex justify-end">
        <SubmitButton />
      </div>
    </form>
  )
}
