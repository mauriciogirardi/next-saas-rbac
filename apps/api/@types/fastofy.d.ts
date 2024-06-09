import 'fastify'

import { Member, Organization } from '@prisma/client'

type GetUserMembershipResponse = {
  organization: Organization
  membership: Member
}

declare module 'fastify' {
  export interface FastifyRequest {
    getCurrentUserId(): Promise<string>
    getUserMembership(slug: string): Promise<GetUserMembershipResponse>
  }
}
