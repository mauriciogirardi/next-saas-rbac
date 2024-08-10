import { Role } from '@saas/auth'

import { api } from './api-client'

export type CreateInviteRequest = {
  org: string
  email: string
  role: Role
}

export type CreateProjectResponse = void

export async function createInvite({ email, role, org }: CreateInviteRequest) {
  const result = await api
    .post(`organizations/${org}/invites`, {
      json: {
        email,
        role,
      },
    })
    .json<CreateProjectResponse>()

  return result
}
