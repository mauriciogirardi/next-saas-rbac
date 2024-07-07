import { api } from './api-client'

export type CreateOrganizationRequest = {
  name: string
  domain: string | null
  shouldAttachUsersByDomain: boolean
}

export type CreateOrganizationResponse = void

export async function createOrganization({
  domain,
  name,
  shouldAttachUsersByDomain,
}: CreateOrganizationRequest) {
  const result = await api
    .post('organizations', {
      json: {
        domain,
        name,
        shouldAttachUsersByDomain,
      },
    })
    .json<CreateOrganizationResponse>()

  return result
}
