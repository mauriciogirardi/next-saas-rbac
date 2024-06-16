import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { PATH_ORGANIZATIONS_SLUG_BILLING } from '@/constants/path-routes'
import { prisma } from '@/lib/prisma'
import { getUserPermission } from '@/utils/get-user-permission'

import { UnauthorizedError } from '../_errors/unauthorized-error'

export async function getOrganizationBilling(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    PATH_ORGANIZATIONS_SLUG_BILLING,
    {
      schema: {
        tags: ['billings'],
        summary: 'Get billing information from organization.',
        security: [{ bearerAuth: [] }],
        params: z.object({
          slug: z.string(),
        }),
        response: {
          200: z.object({
            billing: z.object({
              seats: z.object({
                amount: z.number(),
                unit: z.number(),
                price: z.number(),
              }),
              projects: z.object({
                amount: z.number(),
                unit: z.number(),
                price: z.number(),
              }),
              total: z.number(),
            }),
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
      const { organization, membership } = await request.getUserMembership(slug)

      const { cannot } = getUserPermission(userId, membership.role)

      if (cannot('get', 'Billing')) {
        throw new UnauthorizedError(
          "You're not allowed to get billing details from this organization.",
        )
      }

      const [amountOfMembers, amountOfProjects] = await Promise.all([
        prisma.member.count({
          where: { organizationId: organization.id, role: { not: 'BILLING' } },
        }),

        prisma.project.count({
          where: { organizationId: organization.id },
        }),
      ])

      return reply.status(200).send({
        billing: {
          seats: {
            amount: amountOfMembers,
            unit: 10,
            price: amountOfMembers * 10,
          },
          projects: {
            amount: amountOfProjects,
            unit: 20,
            price: amountOfProjects * 20,
          },
          total: amountOfMembers * 10 + amountOfProjects * 20,
        },
      })
    },
  )
}
