import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { PATH_AUTH_SIGN_IN } from '@/constants/paths-application'
import { getProfile } from '@/http/get-profile'

export function isAuthenticated() {
  return !!cookies().get('token')?.value
}

export async function auth() {
  const token = cookies().get('token')?.value

  if (!token) {
    redirect(PATH_AUTH_SIGN_IN)
  }

  try {
    const { user } = await getProfile()
    return { user }
  } catch (error) {
    console.error(error)
  }

  redirect('/api/auth/sign-out')
}
