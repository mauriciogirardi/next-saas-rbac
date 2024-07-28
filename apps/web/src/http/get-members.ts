import { Role } from '@saas/auth'

import { api } from './api-client'

export type GetMembersResponse = {
  members: {
    id: string
    role: Role
    user: {
      id: string
      name: string | null
      email: string
      avatarUrl: string | null
    }
  }[]
}

export async function getMembers(org: string) {
  const result = await api
    .get(`organizations/${org}/members`, {
      next: {
        tags: [`${org}/members`],
      },
    })
    .json<GetMembersResponse>()
  return result
}
