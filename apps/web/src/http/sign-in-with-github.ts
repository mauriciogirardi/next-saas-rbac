import { api } from './api-client'

export type SignInWithGithubRequest = {
  code: string
}

export type SignInWithGithubResponse = {
  token: string
}

export async function signInWithGithub({ code }: SignInWithGithubRequest) {
  const result = await api
    .post('sessions/github', {
      json: {
        code,
      },
    })
    .json<SignInWithGithubResponse>()

  return result
}
