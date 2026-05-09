'use client'

import { Loader2 } from 'lucide-react'
import { useActionState, useEffect, useRef } from 'react'
import { useFormStatus } from 'react-dom'
import { toast } from 'sonner'

import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { updateProfile, updatePassword, type ActionState } from './actions'

interface AccountFormProps {
  profile: {
    full_name: string | null
  }
  email: string
}

function SaveButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus()
  return (
    <Button
      type="submit"
      disabled={pending}
      className="bg-primary text-primary-foreground hover:bg-primary-hover"
    >
      {pending && <Loader2 className="mr-2 size-4 animate-spin" />}
      {pending ? 'Saving…' : children}
    </Button>
  )
}

export function AccountForm({ profile, email }: AccountFormProps) {
  const [profileState, profileAction] = useActionState<ActionState, FormData>(
    updateProfile,
    { status: 'idle' }
  )
  const [passwordState, passwordAction] = useActionState<ActionState, FormData>(
    updatePassword,
    { status: 'idle' }
  )

  const passwordFormRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (profileState.status === 'success') toast.success(profileState.message)
  }, [profileState])

  useEffect(() => {
    if (passwordState.status === 'success') {
      toast.success(passwordState.message)
      passwordFormRef.current?.reset()
    }
  }, [passwordState])

  const profileErrors =
    profileState.status === 'error' ? profileState.fieldErrors ?? {} : {}
  const passwordErrors =
    passwordState.status === 'error' ? passwordState.fieldErrors ?? {} : {}

  return (
    <div className="space-y-8">
      {/* Profile */}
      <form action={profileAction} className="space-y-5">
        {profileState.status === 'error' && !profileState.fieldErrors && (
          <Alert variant="destructive">
            <AlertDescription>{profileState.message}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-2">
          <Label htmlFor="full_name">Full name</Label>
          <Input
            id="full_name"
            name="full_name"
            defaultValue={profile.full_name ?? ''}
            placeholder="Jane Smith"
          />
          {profileErrors.full_name && (
            <p className="text-xs text-danger">{profileErrors.full_name}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            value={email}
            readOnly
            disabled
            className="font-mono text-xs"
          />
          <p className="text-xs text-subtle-foreground">
            Email changes aren&apos;t supported yet — contact support to update.
          </p>
        </div>

        <div className="flex justify-end">
          <SaveButton>Save profile</SaveButton>
        </div>
      </form>

      <Separator />

      {/* Password change */}
      <form ref={passwordFormRef} action={passwordAction} className="space-y-5">
        <div>
          <h3 className="text-sm font-medium text-foreground">Change password</h3>
          <p className="mt-1 text-xs text-muted-foreground">
            Use a strong password — minimum 8 characters.
          </p>
        </div>

        {passwordState.status === 'error' && !passwordState.fieldErrors && (
          <Alert variant="destructive">
            <AlertDescription>{passwordState.message}</AlertDescription>
          </Alert>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="new_password">New password</Label>
            <Input
              id="new_password"
              name="new_password"
              type="password"
              autoComplete="new-password"
              required
            />
            {passwordErrors.new_password && (
              <p className="text-xs text-danger">{passwordErrors.new_password}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm_password">Confirm new password</Label>
            <Input
              id="confirm_password"
              name="confirm_password"
              type="password"
              autoComplete="new-password"
              required
            />
            {passwordErrors.confirm_password && (
              <p className="text-xs text-danger">{passwordErrors.confirm_password}</p>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <SaveButton>Update password</SaveButton>
        </div>
      </form>
    </div>
  )
}
