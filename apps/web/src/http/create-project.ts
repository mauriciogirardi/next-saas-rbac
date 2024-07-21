import { api } from './api-client'

export type CreateProjectRequest = {
  org: string
  name: string
  description: string
}

export type CreateProjectResponse = void

export async function createProject({
  description,
  name,
  org,
}: CreateProjectRequest) {
  const result = await api
    .post(`organizations/${org}/projects`, {
      json: {
        description,
        name,
      },
    })
    .json<CreateProjectResponse>()

  return result
}
