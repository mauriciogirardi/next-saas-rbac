import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { PATH_ORGANIZATIONS_SLUG_MEMBERS_MEMBER_ID } from '@/constants/path-routes'
import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { getUserPermission } from '@/utils/get-user-permission'

import { UnauthorizedError } from '../_errors/unauthorized-error'

export async function removeMembers(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .delete(
      PATH_ORGANIZATIONS_SLUG_MEMBERS_MEMBER_ID,
      {
        schema: {
          tags: ['members'],
          summary: 'Remove a member from the organization',
          security: [{ bearerAuth: [] }],
          params: z.object({
            slug: z.string(),
            memberId: z.string().uuid(),
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
        const { slug, memberId } = request.params

        const userId = await request.getCurrentUserId()
        const { membership, organization } =
          await request.getUserMembership(slug)

        const { cannot } = getUserPermission(userId, membership.role)

        if (cannot('delete', 'User')) {
          throw new UnauthorizedError("You're not allowed remove this member.")
        }

        await prisma.member.delete({
          where: {
            id: memberId,
            organizationId: organization.id,
          },
        })

        return reply.status(204).send()
      },
    )
}
