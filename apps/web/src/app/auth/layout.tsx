import { redirect } from 'next/navigation'

import { isAuthenticated } from '@/auth/auth'
import { PATH_HOME } from '@/constants/paths-application'

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  if (isAuthenticated()) redirect(PATH_HOME)

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="w-full max-w-xs animate-opacity">{children}</div>
    </div>
  )
}
