'use server'

import { Role } from '@saas/auth'
import { HTTPError } from 'ky'
import { revalidateTag } from 'next/cache'
import { z } from 'zod'

import { getCurrentOrg } from '@/auth/auth'
import { createInvite } from '@/http/create-invite'
import { removeMember } from '@/http/remove-member'
import { revokeInvite } from '@/http/revoke-invite'
import { updateMember } from '@/http/update-member'

const inviteSchema = z.object({
  email: z.string().email({ message: 'Invalid e-mail address.' }),
  role: z
    .union([z.literal('ADMIN'), z.literal('MEMBER'), z.literal('BILLING')])
    .default('MEMBER'),
})

export async function createInviteAction(data: FormData) {
  const result = inviteSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors
    return { success: false, message: null, errors }
  }

  const { email, role } = result.data
  const currentOrg = getCurrentOrg()!

  try {
    await createInvite({
      email,
      role,
      org: currentOrg,
    })

    revalidateTag(`${currentOrg}/invites`)
  } catch (error) {
    if (error instanceof HTTPError) {
      const { message } = await error.response.json()
      return { success: false, message, errors: null }
    }

    console.error(error)
    return {
      success: false,
      message: 'Unexpected error, try again in a few minutes.',
      errors: null,
    }
  }

  return {
    success: true,
    message: 'Successfully created the invite.',
    errors: null,
  }
}

export async function removeMemberAction(memberId: string) {
  const currentOrg = getCurrentOrg()

  try {
    await removeMember({
      org: currentOrg!,
      memberId,
    })

    revalidateTag(`${currentOrg}/members`)
  } catch (error) {
    console.error(error)
  }
}

export async function updateMemberAction(memberId: string, role: Role) {
  const currentOrg = getCurrentOrg()

  try {
    await updateMember({
      org: currentOrg!,
      memberId,
      role,
    })

    revalidateTag(`${currentOrg}/members`)
  } catch (error) {
    console.error(error)
  }
}

export async function revokeInviteAction(inviteId: string) {
  const currentOrg = getCurrentOrg()

  try {
    await revokeInvite({
      org: currentOrg!,
      inviteId,
    })

    revalidateTag(`${currentOrg}/invites`)
  } catch (error) {
    console.error(error)
  }
}
