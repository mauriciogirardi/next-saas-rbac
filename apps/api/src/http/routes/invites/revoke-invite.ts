import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { PATH_ORGANIZATIONS_SLUG_INVITES_INVITE_ID } from '@/constants/path-routes'
import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { getUserPermission } from '@/utils/get-user-permission'

import { BadRequestError } from '../_errors/bad-request-error'
import { UnauthorizedError } from '../_errors/unauthorized-error'

export async function revokeInvite(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .delete(
      PATH_ORGANIZATIONS_SLUG_INVITES_INVITE_ID,
      {
        schema: {
          tags: ['invites'],
          summary: 'Revoke an invite',
          security: [{ bearerAuth: [] }],
          params: z.object({
            slug: z.string(),
            inviteId: z.string().uuid(),
          }),
          response: {
            204: z.null(),
            401: z.object({
              message: z.string(),
            }),
            400: z.object({
              message: z.string(),
            }),
          },
        },
      },
      async (request, reply) => {
        const { slug, inviteId } = request.params

        const userId = await request.getCurrentUserId()
        const { membership, organization } =
          await request.getUserMembership(slug)

        const { cannot } = getUserPermission(userId, membership.role)

        if (cannot('delete', 'Invite')) {
          throw new UnauthorizedError("You're not allowed to delete an invite.")
        }

        const invite = await prisma.invite.findUnique({
          where: { id: inviteId },
        })

        if (!invite) {
          throw new BadRequestError('Invite not found.')
        }

        await prisma.invite.delete({
          where: {
            id: inviteId,
            organizationId: organization.id,
          },
        })

        return reply.status(204).send()
      },
    )
}
