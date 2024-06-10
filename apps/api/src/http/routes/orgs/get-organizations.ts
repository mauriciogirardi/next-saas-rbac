import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { PATH_ORGANIZATIONS } from '@/constants/path-routes'
import { prisma } from '@/lib/prisma'

export async function getOrganizations(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    PATH_ORGANIZATIONS,
    {
      schema: {
        tags: ['organizations'],
        summary: 'Get organization where user is a member.',
        response: {
          200: z.object({
            organizations: z.array(
              z.object({
                role: z.string(),
                id: z.string().uuid(),
                name: z.string(),
                slug: z.string(),
                avatarUrl: z.string().url().nullable(),
              }),
            ),
          }),
        },
      },
    },
    async (request, reply) => {
      const userId = await request.getCurrentUserId()

      const organizations = await prisma.organization.findMany({
        where: {
          members: {
            some: {
              userId,
            },
          },
        },
        select: {
          id: true,
          name: true,
          slug: true,
          avatarUrl: true,
          members: {
            select: {
              role: true,
            },
            where: {
              userId,
            },
          },
        },
      })

      const organizationsWithUserRole = organizations.map(
        ({ members, ...orgs }) => ({
          ...orgs,
          role: members[0].role,
        }),
      )

      return reply
        .status(200)
        .send({ organizations: organizationsWithUserRole })
    },
  )
}
