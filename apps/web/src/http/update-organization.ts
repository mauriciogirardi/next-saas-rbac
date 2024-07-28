import { api } from './api-client'

export type UpdateOrganizationRequest = {
  name: string
  domain: string | null
  shouldAttachUsersByDomain: boolean
  org: string
}

export type UpdateOrganizationResponse = void

export async function updateOrganization({
  domain,
  name,
  shouldAttachUsersByDomain,
  org,
}: UpdateOrganizationRequest) {
  const result = await api
    .put(`organizations/${org}`, {
      json: {
        domain,
        name,
        shouldAttachUsersByDomain,
      },
    })
    .json<UpdateOrganizationResponse>()

  return result
}
