import { api } from './api-client'

export type SignInWithPasswordRequest = {
  email: string
  password: string
}

export type SignInWithPasswordResponse = {
  token: string
}

export async function signInWithPassword({
  email,
  password,
}: SignInWithPasswordRequest) {
  const result = await api
    .post('sessions/password', {
      json: {
        email,
        password,
      },
    })
    .json<SignInWithPasswordResponse>()

  return result
}
