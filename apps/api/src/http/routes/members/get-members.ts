import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { PATH_ORGANIZATIONS_SLUG_MEMBERS } from '@/constants/path-routes'
import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { getUserPermission } from '@/utils/get-user-permission'

import { BadRequestError } from '../_errors/bad-request-error'
import { UnauthorizedError } from '../_errors/unauthorized-error'

export async function getMembers(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      PATH_ORGANIZATIONS_SLUG_MEMBERS,
      {
        schema: {
          tags: ['members'],
          summary: 'Get all members details',
          security: [{ bearerAuth: [] }],
          params: z.object({
            slug: z.string(),
          }),
          response: {
            201: z.object({
              members: z.array(
                z.object({
                  id: z.string().uuid(),
                  role: z.string(),
                  user: z.object({
                    id: z.string().uuid(),
                    name: z.string().nullable(),
                    email: z.string().email(),
                    avatarUrl: z.string().nullable(),
                  }),
                }),
              ),
            }),
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
        const { slug } = request.params

        const userId = await request.getCurrentUserId()
        const { membership, organization } =
          await request.getUserMembership(slug)

        const { cannot } = getUserPermission(userId, membership.role)

        if (cannot('get', 'User')) {
          throw new UnauthorizedError(
            "You're not allowed to see organization members.",
          )
        }

        const members = await prisma.member.findMany({
          where: {
            organizationId: organization.id,
          },
          select: {
            id: true,
            role: true,
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                avatarUrl: true,
              },
            },
          },
          orderBy: { role: 'asc' },
        })

        if (!members) {
          throw new BadRequestError('Members not found.')
        }

        return reply.status(201).send({ members })
      },
    )
}
