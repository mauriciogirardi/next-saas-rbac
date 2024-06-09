import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),

    JWT_SECRET: z.string(),

    NODE_ENV: z.enum(['developer', 'test', 'production']).default('developer'),

    GITHUB_OAUTH_CLIENT_ID: z.string(),
    GITHUB_OAUTH_CLIENT_SECRET: z.string(),
    GITHUB_OAUTH_CLIENT_REDIRECT_URI: z.string().url(),

    PORT_BACKEND: z.coerce.number().default(3333),
  },

  client: {},

  shared: {},

  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    PORT_BACKEND: process.env.PORT_BACKEND,
    JWT_SECRET: process.env.JWT_SECRET,
    NODE_ENV: process.env.NODE_ENV,
    GITHUB_OAUTH_CLIENT_ID: process.env.GITHUB_OAUTH_CLIENT_ID,
    GITHUB_OAUTH_CLIENT_SECRET: process.env.GITHUB_OAUTH_CLIENT_SECRET,
    GITHUB_OAUTH_CLIENT_REDIRECT_URI:
      process.env.GITHUB_OAUTH_CLIENT_REDIRECT_URI,
  },

  emptyStringAsUndefined: true,
})
