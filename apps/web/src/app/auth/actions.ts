'use server'

import { env } from '@saas/env'
import { redirect } from 'next/navigation'

export async function signInWithGithub() {
  const githubSigInUrl = new URL('login/oauth/authorize', 'https://github.com')

  githubSigInUrl.searchParams.set('client_id', env.GITHUB_OAUTH_CLIENT_ID)
  githubSigInUrl.searchParams.set(
    'redirect_uri',
    env.GITHUB_OAUTH_CLIENT_REDIRECT_URI,
  )
  githubSigInUrl.searchParams.set('scope', 'user')

  redirect(githubSigInUrl.toString())
}
