import { api } from './api-client'

export type SignUpRequest = {
  email: string
  password: string
  name: string
}

export async function signUp({ email, password, name }: SignUpRequest) {
  await api.post('users', {
    json: {
      name,
      email,
      password,
    },
  })
}
