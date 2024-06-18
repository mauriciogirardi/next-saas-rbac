import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import githubIcon from '@/assets/github-icon.svg'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { PATH_AUTH_FORGOT } from '@/constants/paths-application'

export const metadata: Metadata = {
  title: 'Sign in',
}

export default function SignInPage() {
  return (
    <form className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="email">E-mail</Label>
        <Input name="email" id="email" type="email" />
      </div>
      <div className="space-y-1">
        <Label htmlFor="password">Password</Label>
        <Input name="password" id="password" type="password" />
        <Link
          href={PATH_AUTH_FORGOT}
          className="text-xs font-medium text-foreground hover:underline"
        >
          Forgot your password
        </Link>
      </div>

      <Button type="submit" className="w-full">
        Sign in with e-mail
      </Button>

      <Separator />

      <Button type="submit" className="w-full" variant="outline">
        <Image className="mr-2 size-4 dark:invert" src={githubIcon} alt="" />
        Sign in with Github
      </Button>
    </form>
  )
}
