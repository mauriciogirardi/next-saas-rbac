'use client'

import { AlertTriangle, Loader2 } from 'lucide-react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormState } from '@/hook/use-form-state'
import { cn } from '@/lib/utils'

import { createOrganizationAction } from './actions'

type TOrganizationFormProps = {
  isSheet?: boolean
}

export function OrganizationForm({ isSheet = false }: TOrganizationFormProps) {
  const [{ message, errors, success }, handleAction, isPending] = useFormState(
    createOrganizationAction,
  )

  return (
    <form
      className="animate-opacity space-y-4 overflow-x-hidden p-2"
      onSubmit={handleAction}
    >
      {success === false && message && (
        <Alert variant="destructive">
          <AlertTriangle className="size-4" />
          <AlertTitle>Save organization failed!</AlertTitle>
          <AlertDescription>
            <p>{message}</p>
          </AlertDescription>
        </Alert>
      )}
      {success === true && message && (
        <Alert variant="success" className="ml-auto w-max animate-message">
          <AlertTriangle className="size-4" />
          <AlertTitle>Success!</AlertTitle>
          <AlertDescription>
            <p>{message}</p>
          </AlertDescription>
        </Alert>
      )}

      <div
        className={cn(
          'flex gap-5 md:flex-row',
          isSheet ? 'flex-wrap' : 'flex-col',
        )}
      >
        <div className={cn('space-y-1', isSheet ? 'w-full' : 'flex-1')}>
          <Label htmlFor="name">Organization name</Label>
          <Input name="name" id="name" />
          {errors?.name && (
            <p className="text-xs text-red-500 transition-all dark:text-red-400">
              {errors.name[0]}
            </p>
          )}
        </div>

        <div className="flex-1 space-y-1">
          <Label htmlFor="domain">E-mail domain</Label>
          <Input
            name="domain"
            id="domain"
            inputMode="url"
            placeholder="exemplo.com"
          />
          {errors?.domain && (
            <p className="text-xs text-red-500 transition-all dark:text-red-400">
              {errors.domain[0]}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-1">
        <div className="flex items-baseline space-x-2">
          <div>
            <Checkbox
              name="shouldAttachUsersByDomain"
              id="shouldAttachUsersByDomain"
            />
          </div>
          <label htmlFor="shouldAttachUsersByDomain" className="space-y-1">
            <span className="text-sm font-medium leading-none">
              Auto-join new members
            </span>
            <p className="text-xs text-muted-foreground">
              This will automatically invite all members with same e-mail domain
              to this organization.
            </p>
          </label>
        </div>
      </div>

      <div className="flex w-full justify-end pt-6">
        <Button
          type="submit"
          className={cn('w-full ', !isSheet && 'md:w-[200px]')}
          disabled={isPending}
        >
          {isPending && <Loader2 className="size-4 animate-spin" />}
          {!isPending && 'Save organization'}
        </Button>
      </div>
    </form>
  )
}
