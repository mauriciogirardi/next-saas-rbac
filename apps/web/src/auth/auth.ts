import { defineAbilityFor } from '@saas/auth'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { PATH_AUTH_SIGN_IN } from '@/constants/paths-application'
import { getMembership } from '@/http/get-membership'
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

export function getCurrentOrg() {
  return cookies().get('org')?.value ?? null
}

export async function getCurrentMembership() {
  const org = getCurrentOrg()

  if (!org) return null

  const { membership } = await getMembership(org)

  return membership
}

export async function ability() {
  const membership = await getCurrentMembership()

  if (!membership) return null

  const ability = defineAbilityFor({
    role: membership.role,
    id: membership.userId,
  })

  return ability
}
