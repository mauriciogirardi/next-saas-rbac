'use client'

import { AlertTriangle, Loader2, UserPlus } from 'lucide-react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useFormState } from '@/hook/use-form-state'

import { createInviteAction } from './actions'

export function CreateInviteForm() {
  const [{ errors, message, success }, handleAction, isPending] =
    useFormState(createInviteAction)

  return (
    <form className="space-y-4 overflow-x-hidden p-2" onSubmit={handleAction}>
      {success === false && message && (
        <Alert variant="destructive">
          <AlertTriangle className="size-4" />
          <AlertTitle>Invite failed!</AlertTitle>
          <AlertDescription>
            <p>{message}</p>
          </AlertDescription>
        </Alert>
      )}

      <div className="flex flex-wrap items-center  gap-4 lg:flex-nowrap">
        <div className="w-1/3 space-y-1">
          <Input name="email" type="email" placeholder="john@example.com" />
          {errors?.email && (
            <p className="text-xs text-red-500 transition-all dark:text-red-400">
              {errors.email[0]}
            </p>
          )}
        </div>

        <Select name="role" defaultValue="MEMBER">
          <SelectTrigger className="h-10 w-1/3">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ADMIN">Admin</SelectItem>
            <SelectItem value="MEMBER">Member</SelectItem>
            <SelectItem value="BILLING">Billing</SelectItem>
          </SelectContent>
        </Select>

        <Button type="submit" className="w-1/3">
          {isPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <>
              <UserPlus className="mr-2 size-4" />
              <span>Invite user</span>
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
