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
import { updateAgent, type ActionState } from './actions'

const TONES = [
  { value: 'friendly_professional', label: 'Friendly & professional' },
  { value: 'formal', label: 'Formal' },
  { value: 'casual', label: 'Casual' },
]

interface AgentFormProps {
  agent: {
    agent_name: string
    agent_tone: string
    agent_instructions: string | null
  }
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

export function AgentForm({ agent }: AgentFormProps) {
  const [state, formAction] = useActionState<ActionState, FormData>(updateAgent, {
    status: 'idle',
  })

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

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="agent_name">Agent name</Label>
          <Input
            id="agent_name"
            name="agent_name"
            defaultValue={agent.agent_name}
            placeholder="Avery"
          />
          <p className="text-xs text-subtle-foreground">
            What customers will see in the chat header.
          </p>
          {fieldErrors.agent_name && (
            <p className="text-xs text-danger">{fieldErrors.agent_name}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="agent_tone">Tone</Label>
          <Select name="agent_tone" defaultValue={agent.agent_tone}>
            <SelectTrigger id="agent_tone">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {TONES.map((t) => (
                <SelectItem key={t.value} value={t.value}>
                  {t.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="agent_instructions">
          Custom instructions
          <span className="ml-2 text-xs text-subtle-foreground">(optional)</span>
        </Label>
        <Textarea
          id="agent_instructions"
          name="agent_instructions"
          rows={6}
          defaultValue={agent.agent_instructions ?? ''}
          placeholder={
            'Always ask if it is an emergency. Mention 24/7 service. Never quote prices — say a tech will follow up. Confirm we serve their ZIP before booking.'
          }
        />
        <p className="text-xs text-subtle-foreground">
          Anything specific your agent should always do or say.
        </p>
      </div>

      <div className="flex justify-end">
        <SubmitButton />
      </div>
    </form>
  )
}
