import { organizationSchema } from '@saas/auth'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { PATH_ORGANIZATIONS_SLUG_OWNER } from '@/constants/path-routes'
import { prisma } from '@/lib/prisma'
import { getUserPermission } from '@/utils/get-user-permission'

import { BadRequestError } from '../_errors/bad-request-error'
import { UnauthorizedError } from '../_errors/unauthorized-error'

export async function transferOrganization(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().patch(
    PATH_ORGANIZATIONS_SLUG_OWNER,
    {
      schema: {
        tags: ['organizations'],
        summary: 'Transfer organization ownership.',
        security: [{ bearerAuth: [] }],
        params: z.object({
          slug: z.string(),
        }),
        body: z.object({
          transferToUserId: z.string().uuid(),
        }),
        response: {
          204: z.null(),
          400: z.object({
            message: z.string(),
          }),
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

      const { transferToUserId } = request.body

      const authOrganization = organizationSchema.parse(organization)

      const { cannot } = getUserPermission(userId, membership.role)

      if (cannot('transfer_ownership', authOrganization)) {
        throw new UnauthorizedError(
          "You're not allowed to transfer this organization ownership.",
        )
      }

      const transferToMembership = await prisma.member.findUnique({
        where: {
          organizationId_userId: {
            organizationId: organization.id,
            userId: transferToUserId,
          },
        },
      })

      if (!transferToMembership) {
        throw new BadRequestError(
          'Target user is not a member of this organization.',
        )
      }

      await prisma.$transaction([
        prisma.member.update({
          where: {
            organizationId_userId: {
              organizationId: organization.id,
              userId: transferToUserId,
            },
          },
          data: {
            role: 'ADMIN',
          },
        }),

        prisma.organization.update({
          where: { id: organization.id },
          data: {
            ownerId: transferToUserId,
          },
        }),
      ])

      return reply.status(204).send()
    },
  )
}
