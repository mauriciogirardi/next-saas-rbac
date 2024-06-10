import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { PATH_ORGANIZATIONS_SLUG } from '@/constants/path-routes'

export async function getOrganization(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    PATH_ORGANIZATIONS_SLUG,
    {
      schema: {
        tags: ['organizations'],
        summary: 'Get organization by slug.',
        params: z.object({
          slug: z.string(),
        }),
        response: {
          200: z.object({
            organization: z.object({
              id: z.string().uuid(),
              name: z.string(),
              slug: z.string(),
              domain: z.string().nullable(),
              shouldAttachUsersByDomain: z.boolean(),
              avatarUrl: z.string().url().nullable(),
              createdAt: z.date(),
              updatedAt: z.date(),
              ownerId: z.string().uuid(),
            }),
          }),
        },
      },
    },
    async (request, reply) => {
      const { slug } = request.params
      const { organization } = await request.getUserMembership(slug)

      return reply.status(200).send({ organization })
    },
  )
}
