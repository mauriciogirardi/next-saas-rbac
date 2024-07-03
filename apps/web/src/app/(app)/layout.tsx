import { redirect } from 'next/navigation'

import { isAuthenticated } from '@/auth/auth'
import { PATH_AUTH_SIGN_IN } from '@/constants/paths-application'

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  if (!isAuthenticated()) {
    redirect(PATH_AUTH_SIGN_IN)
  }

  return <>{children}</>
}
