import { organizationSchema } from '@saas/auth'
import { ArrowLeftRight, Crown, UserMinus } from 'lucide-react'

import { ability, getCurrentOrg } from '@/auth/auth'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { getMembers } from '@/http/get-members'
import { getMembership } from '@/http/get-membership'
import { getOrganization } from '@/http/get-organization'

import { removeMemberAction } from './actions'
import { UpdateMemberRoleSelect } from './update-member-role-select'

export async function MemberList() {
  const currentOrg = getCurrentOrg()
  const permissions = await ability()
  const [{ members }, { membership }, { organization }] = await Promise.all([
    getMembers(currentOrg!),
    getMembership(currentOrg!),
    getOrganization(currentOrg!),
  ])

  const authOrganization = organizationSchema.parse(organization)

  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold">Members</h2>

      <div className="rounded border">
        <Table>
          <TableBody>
            {members?.map(({ user, id, role }) => (
              <TableRow key={id}>
                <TableCell className="py-2.5" style={{ width: 48 }}>
                  <Avatar>
                    <AvatarFallback />
                    {user.avatarUrl && (
                      <AvatarImage
                        src={user.avatarUrl}
                        alt={user.name ?? undefined}
                        width={32}
                        height={32}
                        className="aspect-square size-full"
                      />
                    )}
                  </Avatar>
                </TableCell>

                <TableCell className="py-2.5">
                  <div className="flex flex-col">
                    <span className="inline-flex items-center gap-2 font-medium">
                      {user.name}
                      {user.id === membership.userId && ' (me)'}
                      {user.id === organization.ownerId && (
                        <span className="inline-flex items-center gap-2 text-xs text-muted-foreground">
                          <Crown className="size-4" />
                          Owner
                        </span>
                      )}
                    </span>
                    <span className="pt-1 text-xs text-muted-foreground">
                      {user.email}
                    </span>
                  </div>
                </TableCell>

                <TableCell className="py-2.5">
                  <div className="flex items-center justify-end gap-2">
                    {permissions?.can(
                      'transfer_ownership',
                      authOrganization,
                    ) && (
                      <Button size="sm" variant="ghost">
                        <ArrowLeftRight className="mr-2 size-4" />
                        Transfer ownership
                      </Button>
                    )}

                    {permissions?.can('update', 'User') && (
                      <UpdateMemberRoleSelect
                        memberId={id}
                        value={role}
                        disabled={
                          user.id === membership.userId ||
                          user.id === organization.ownerId
                        }
                      />
                    )}

                    {permissions?.can('delete', 'User') && (
                      <form action={removeMemberAction.bind(null, id)}>
                        <Button
                          disabled={
                            user.id === membership.userId ||
                            user.id === organization.ownerId
                          }
                          type="submit"
                          size="sm"
                          variant="destructive"
                        >
                          <UserMinus className="mr-2 size-4" />
                          Remove
                        </Button>
                      </form>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
