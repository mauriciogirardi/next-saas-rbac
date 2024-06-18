import { Metadata } from 'next'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PATH_AUTH_SIGN_IN } from '@/constants/paths-application'

export const metadata: Metadata = {
  title: 'Forgot password',
}

export default function ForgotPasswordPage() {
  return (
    <form className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="email">E-mail</Label>
        <Input name="email" id="email" type="email" />
      </div>

      <Button type="submit" className="w-full">
        Recover password
      </Button>
      <Button asChild variant="link" className="w-full" size="sm">
        <Link href={PATH_AUTH_SIGN_IN}>Sign in instead</Link>
      </Button>
    </form>
  )
}
