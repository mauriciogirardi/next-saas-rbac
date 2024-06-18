import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import githubIcon from '@/assets/github-icon.svg'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { PATH_AUTH_SIGN_IN } from '@/constants/paths-application'

export const metadata: Metadata = {
  title: 'Sign up',
}

export default function SignUpPage() {
  return (
    <form className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="name">Name</Label>
        <Input name="name" id="name" />
      </div>
      <div className="space-y-1">
        <Label htmlFor="email">E-mail</Label>
        <Input name="email" id="email" type="email" />
      </div>
      <div className="space-y-1">
        <Label htmlFor="password">Password</Label>
        <Input name="password" id="password" type="password" />
      </div>
      <div className="space-y-1">
        <Label htmlFor="password_confirmation">Confirm your password</Label>
        <Input
          name="password_confirmation"
          id="password_confirmation"
          type="password"
        />
      </div>

      <Button type="submit" className="w-full">
        Create account
      </Button>
      <Button asChild variant="link" className="w-full" size="sm">
        <Link href={PATH_AUTH_SIGN_IN}>Already registered sign in</Link>
      </Button>

      <Separator />

      <Button type="submit" className="w-full" variant="outline">
        <Image className="mr-2 size-4 dark:invert" src={githubIcon} alt="" />
        Sign up with Github
      </Button>
    </form>
  )
}
