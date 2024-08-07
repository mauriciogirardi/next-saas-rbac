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
                userId: z.string().uuid(),
                role: z.union([
                  z.literal('ADMIN'),
                  z.literal('MEMBER'),
                  z.literal('BILLING'),
                ]),
                organizationId: z.string().uuid(),
              }),
            }),
          },
        },
      },
      async (request, reply) => {
        const { slug } = request.params
        const {
          membership: { role, id, organizationId, userId },
        } = await request.getUserMembership(slug)

        return reply.status(200).send({
          membership: {
            role,
            id,
            organizationId,
            userId,
          },
        })
      },
    )
}
