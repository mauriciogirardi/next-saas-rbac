import { Role } from '@saas/auth'

import { api } from './api-client'

export type GetPendingInvitesResponse = {
  invites: {
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
  }[]
}

export async function getPendingInvites() {
  const result = await api
    .get('pending-invites')
    .json<GetPendingInvitesResponse>()

  return result
}
