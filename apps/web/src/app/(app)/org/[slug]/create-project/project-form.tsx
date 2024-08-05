'use client'

import { AlertTriangle, Loader2 } from 'lucide-react'
import { useParams } from 'next/navigation'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useFormState } from '@/hook/use-form-state'
import { queryClient } from '@/lib/react-query'

import { createProjectAction } from './actions'

export function ProjectForm() {
  const { slug: org } = useParams<{ slug: string }>()

  const [{ message, errors, success }, handleAction, isPending] = useFormState(
    createProjectAction,
    () => {
      queryClient.invalidateQueries({ queryKey: [org, 'projects'] })
    },
  )

  return (
    <form className="space-y-4 overflow-x-hidden p-2" onSubmit={handleAction}>
      {success === false && message && (
        <Alert variant="destructive">
          <AlertTriangle className="size-4" />
          <AlertTitle>Save project failed!</AlertTitle>
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

      <div className="flex flex-col gap-5">
        <div className="flex-1 space-y-1">
          <Label htmlFor="name">Project name</Label>
          <Input name="name" id="name" />
          {errors?.name && (
            <p className="text-xs text-red-500 transition-all dark:text-red-400">
              {errors.name[0]}
            </p>
          )}
        </div>

        <div className="flex-1 space-y-1">
          <Label htmlFor="description">Description</Label>
          <Textarea name="description" id="description" />
          {errors?.description && (
            <p className="text-xs text-red-500 transition-all dark:text-red-400">
              {errors.description[0]}
            </p>
          )}
        </div>
      </div>
      <div className="flex w-full justify-end pt-6">
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending && <Loader2 className="size-4 animate-spin" />}
          {!isPending && 'Save project'}
        </Button>
      </div>
    </form>
  )
}
