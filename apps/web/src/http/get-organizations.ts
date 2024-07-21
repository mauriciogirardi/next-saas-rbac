import { Role } from '@saas/auth'

import { api } from './api-client'

export type GetOrganizationsResponse = {
  organizations: {
    id: string
    name: string
    slug: string
    avatarUrl: string | null
    role: Role
  }[]
}

export async function getOrganizations() {
  const result = await api.get('organizations').json<GetOrganizationsResponse>()

  return result
}
