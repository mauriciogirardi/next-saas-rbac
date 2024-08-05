import { Info } from 'lucide-react'

import { ability, getCurrentOrg } from '@/auth/auth'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { getInvites } from '@/http/get-invites'

import { RevokeInviteButton } from './revoke-invite-button'

export async function Invites() {
  const currentOrg = getCurrentOrg()
  const permissions = await ability()
  const { invites } = await getInvites(currentOrg!)

  return (
    <div className="space-y-4">
      {permissions?.can('create', 'Invite') && (
        <Card>
          <CardHeader>
            <CardTitle>Invite member</CardTitle>
          </CardHeader>
          <CardContent>form</CardContent>
        </Card>
      )}

      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Invites</h2>

        {invites.length > 0 ? (
          <div className="rounded border">
            <Table>
              <TableBody>
                {invites?.map(({ email, id, role }) => (
                  <TableRow key={id}>
                    <TableCell className="py-2.5">
                      <span className="text-muted-foreground">{email}</span>
                    </TableCell>

                    <TableCell className="py-2.5 font-medium">{role}</TableCell>

                    <TableCell className="py-2.5">
                      <div className="flex justify-end">
                        {permissions?.can('delete', 'Invite') && (
                          <RevokeInviteButton inviteId={id} />
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <Card>
            <CardContent className="flex h-20 flex-col items-center justify-center gap-1 py-0">
              <Info className="size-5 text-orange-300" />
              <h2 className="text-sm text-muted-foreground">
                No invites found!
              </h2>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
