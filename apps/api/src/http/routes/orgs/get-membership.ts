import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { PATH_ORGANIZATION_SLUG_MEMBERSHIP } from '@/constants/path-routes'
import { auth } from '@/http/middlewares/auth'

export async function getMembership(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      PATH_ORGANIZATION_SLUG_MEMBERSHIP,
      {
        schema: {
          tags: ['organizations'],
          summary: 'Get user membership on organization.',
          security: [{ bearerAuth: [] }],
          params: z.object({
            slug: z.string(),
          }),
          response: {
            200: z.object({
              membership: z.object({
                id: z.string().uuid(),
                role: z.string(),
                organizationId: z.string().uuid(),
              }),
            }),
          },
        },
      },
      async (request, replay) => {
        const { slug } = request.params
        const {
          membership: { role, id, organizationId },
        } = await request.getUserMembership(slug)

        return replay.status(200).send({
          membership: {
            role,
            id,
            organizationId,
          },
        })
      },
    )
}
