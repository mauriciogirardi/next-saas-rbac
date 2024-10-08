'use client'

import { AlertTriangle, Loader2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

import githubIcon from '@/assets/github-icon.svg'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import {
  PATH_AUTH_FORGOT,
  PATH_AUTH_SIGN_UP,
  PATH_HOME,
} from '@/constants/paths-application'
import { useFormState } from '@/hook/use-form-state'

import { signInWithGithub } from '../actions'
import { signInWithEmailAndPassword } from './actions'

export function SignInForm() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [{ message, errors, success }, handleAction, isPending] = useFormState(
    signInWithEmailAndPassword,
    () => {
      router.push(PATH_HOME)
    },
  )

  return (
    <div className="space-y-4">
      <form className="space-y-4" onSubmit={handleAction}>
        {success === false && message && (
          <Alert variant="destructive">
            <AlertTriangle className="size-4" />
            <AlertTitle>Sign in failed!</AlertTitle>
            <AlertDescription>
              <p>{message}</p>
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-1">
          <Label htmlFor="email">E-mail</Label>
          <Input
            name="email"
            id="email"
            type="email"
            defaultValue={searchParams.get('email') ?? ''}
          />
          {errors?.email && (
            <p className="text-xs text-red-500 transition-all dark:text-red-400">
              {errors.email[0]}
            </p>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="password">Password</Label>
          <Input name="password" id="password" type="password" />
          {errors?.password && (
            <p className="text-xs text-red-500 transition-all dark:text-red-400">
              {errors.password[0]}
            </p>
          )}

          <Link
            href={PATH_AUTH_FORGOT}
            className="text-xs font-medium text-foreground hover:underline"
          >
            Forgot your password
          </Link>
        </div>

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            'Sign in with e-mail'
          )}
        </Button>
        <Button asChild variant="link" className="w-full" size="sm">
          <Link href={PATH_AUTH_SIGN_UP}>Create a new account</Link>
        </Button>
      </form>

      <form action={signInWithGithub}>
        <Separator />

        <Button
          type="submit"
          className="w-full"
          variant="outline"
          disabled={isPending}
        >
          <Image className="mr-2 size-4 dark:invert" src={githubIcon} alt="" />
          Sign in with Github
        </Button>
      </form>
    </div>
  )
}
