import { Role } from '@saas/auth'

import { api } from './api-client'

export type GetMembershipResponse = {
  membership: {
    id: string
    organizationId: string
    role: Role
    userId: string
  }
}

export async function getMembership(org: string) {
  const result = await api
    .get(`organizations/${org}/membership`)
    .json<GetMembershipResponse>()

  return result
}
