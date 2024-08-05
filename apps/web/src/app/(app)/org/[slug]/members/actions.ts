'use server'

import { Role } from '@saas/auth'
import { revalidateTag } from 'next/cache'

import { getCurrentOrg } from '@/auth/auth'
import { removeMember } from '@/http/remove-member'
import { revokeInvite } from '@/http/revoke-invite'
import { updateMember } from '@/http/update-member'

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
