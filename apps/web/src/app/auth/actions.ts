'use server'

import { redirect } from 'next/navigation'

export async function signInWithGithub() {
  const githubSigInUrl = new URL('login/oauth/authorize', 'https://github.com')

  githubSigInUrl.searchParams.set('client_id', 'Ov23ctP5kNGwbAWpuDeL')
  githubSigInUrl.searchParams.set(
    'redirect_uri',
    'http://localhost:3000/api/auth/callback',
  )
  githubSigInUrl.searchParams.set('scope', 'user')

  redirect(githubSigInUrl.toString())
}
