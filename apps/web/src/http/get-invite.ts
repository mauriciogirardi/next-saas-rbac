import { Role } from '@saas/auth'

import { api } from './api-client'

export type GetInviteResponse = {
  invite: {
    email: string
    role: Role
    id: string
    createdAt: Date
    author: {
      id: string
      name: string | null
      avatarUrl: string | null
    } | null
    organization: {
      name: string
    }
  }
}

export async function getInvite(inviteId: string) {
  const result = await api.get(`invites/${inviteId}`).json<GetInviteResponse>()
  return result
}
