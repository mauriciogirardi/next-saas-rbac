import { organizationSchema } from '@saas/auth'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { PATH_ORGANIZATIONS_SLUG } from '@/constants/path-routes'
import { prisma } from '@/lib/prisma'
import { getUserPermission } from '@/utils/get-user-permission'

import { UnauthorizedError } from '../_errors/unauthorized-error'

export async function shutdownOrganization(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().delete(
    PATH_ORGANIZATIONS_SLUG,
    {
      schema: {
        tags: ['organizations'],
        summary: 'Shutdown organization.',
        security: [{ bearerAuth: [] }],
        params: z.object({
          slug: z.string(),
        }),
        response: {
          204: z.null(),
          401: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { slug } = request.params
      const userId = await request.getCurrentUserId()
      const { membership, organization } = await request.getUserMembership(slug)

      const authOrganization = organizationSchema.parse(organization)

      const { cannot } = getUserPermission(userId, membership.role)

      if (cannot('delete', authOrganization)) {
        throw new UnauthorizedError(
          "You're not allowed to shutdown this organization.",
        )
      }

      await prisma.organization.delete({
        where: {
          id: organization.id,
        },
      })

      return reply.status(204).send()
    },
  )
}
