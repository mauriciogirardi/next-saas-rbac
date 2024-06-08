import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { PATH_PROFILE } from '@/constants/path-routes'
import { prisma } from '@/lib/prisma'

import { BadRequestError } from '../_errors/bad-request-error'

export async function getProfile(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    PATH_PROFILE,
    {
      schema: {
        tags: ['auth'],
        summary: 'Get authenticated user profile.',
        response: {
          400: z.object({
            message: z.string().default('User not found.'),
          }),
          200: z.object({
            user: z.object({
              id: z.string().uuid(),
              name: z.string().nullable(),
              email: z.string().email(),
              avatarUrl: z.string().url().nullable(),
            }),
          }),
        },
      },
    },
    async (request, reply) => {
      const { sub } = await request.jwtVerify<{ sub: string }>()

      const user = await prisma.user.findUnique({
        where: {
          id: sub,
        },
        select: {
          id: true,
          name: true,
          email: true,
          avatarUrl: true,
        },
      })

      if (!user) {
        throw new BadRequestError('User not found.')
      }

      return reply.status(200).send({ user })
    },
  )
}
