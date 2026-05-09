'use client'

import { Loader2 } from 'lucide-react'
import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'

import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { createBusiness } from './actions'

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full bg-primary text-primary-foreground hover:bg-primary-hover"
    >
      {pending && <Loader2 className="mr-2 size-4 animate-spin" />}
      {pending ? 'Setting up your business…' : 'Continue'}
    </Button>
  )
}

export function OnboardingForm() {
  const [state, formAction] = useActionState(createBusiness, {})

  return (
    <form action={formAction} className="space-y-6">
      {state.error && !state.fieldErrors && (
        <Alert variant="destructive">
          <AlertDescription>{state.error}</AlertDescription>
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
          placeholder="Acme Plumbing & Heating"
        />
        {state.fieldErrors?.name && (
          <p className="text-xs text-danger">{state.fieldErrors.name}</p>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" name="phone" type="tel" placeholder="(555) 123-4567" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="website">Website</Label>
          <Input id="website" name="website" type="url" placeholder="https://acmeplumbing.com" />
          {state.fieldErrors?.website && (
            <p className="text-xs text-danger">{state.fieldErrors.website}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="services">
          Services you offer
          <span className="ml-2 text-xs text-subtle-foreground">(comma-separated)</span>
        </Label>
        <Textarea
          id="services"
          name="services"
          rows={3}
          placeholder="Drain cleaning, water heater install, leak repair, emergency plumbing"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="serviceAreaZips">
          Service area ZIP codes
          <span className="ml-2 text-xs text-subtle-foreground">(comma or space separated)</span>
        </Label>
        <Input
          id="serviceAreaZips"
          name="serviceAreaZips"
          placeholder="78701, 78702, 78703"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="agentInstructions">
          Anything specific your AI should know?
          <span className="ml-2 text-xs text-subtle-foreground">(optional)</span>
        </Label>
        <Textarea
          id="agentInstructions"
          name="agentInstructions"
          rows={3}
          placeholder="Always ask if it's an emergency. Mention our 24/7 service. Don't quote prices — say a tech will follow up."
        />
      </div>

      <input type="hidden" name="industry" value="home_services" />
      <input type="hidden" name="agentTone" value="friendly_professional" />

      <SubmitButton />
    </form>
  )
}
