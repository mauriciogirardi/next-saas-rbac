'use client'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Check, Loader2, UserPlus2, X } from 'lucide-react'
import { useState } from 'react'

import { getPendingInvites } from '@/http/get-pending-invites'

import { Button } from '../ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { acceptInviteAction, rejectInviteAction } from './actions'

dayjs.extend(relativeTime)

export function PendingInvites() {
  const [isOpen, setIsOpen] = useState(false)

  const queryClient = useQueryClient()
  const { data, isLoading } = useQuery({
    queryKey: ['pending-invites'],
    queryFn: getPendingInvites,
  })

  console.log(data)

  const quantityInvites = data?.invites.length ?? 0

  async function handleAcceptInvite(inviteId: string) {
    await acceptInviteAction(inviteId)
    queryClient.invalidateQueries({ queryKey: ['pending-invites'] })
  }

  async function handleRejectInvite(inviteId: string) {
    await rejectInviteAction(inviteId)
    queryClient.invalidateQueries({ queryKey: ['pending-invites'] })
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button size="icon" variant="ghost" className="relative">
          <UserPlus2 className="size-4" />
          <span className="sr-only">Pending invites</span>
          {quantityInvites > 0 && (
            <span className="absolute right-0 top-0 animate-bounce rounded-full bg-red-600 px-1 text-xs font-medium">
              {quantityInvites}
            </span>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-80 space-y-4">
        <span className="block text-sm font-medium">
          Pending invites ({quantityInvites})
        </span>

        <div className="space-y-2">
          {isLoading && (
            <div className="flex h-20 items-center justify-center">
              <Loader2 className="size-7 animate-spin" />
            </div>
          )}

          {!isLoading &&
            data?.invites.map((invite) => (
              <Card key={invite.id}>
                <CardHeader className="p-3">
                  <CardTitle className="text-lg font-medium">Invite</CardTitle>
                </CardHeader>
                <CardContent className="p-3 pt-0">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    <span className="font-medium text-foreground">
                      {invite.author?.name ?? 'Someone'}{' '}
                    </span>{' '}
                    invited you to join{' '}
                    <span className="font-medium text-foreground">
                      {invite.organization.name}
                    </span>{' '}
                    {dayjs(invite.createdAt).fromNow()}.
                  </p>
                </CardContent>
                <CardFooter className="px-3">
                  <div className="flex gap-1">
                    <Button
                      size="xs"
                      variant="outline"
                      onClick={() => handleAcceptInvite(invite.id)}
                    >
                      <Check className="mr-1.5 size-3" />
                      Accept
                    </Button>
                    <Button
                      size="xs"
                      variant="ghost"
                      className="text-muted-foreground"
                      onClick={() => handleRejectInvite(invite.id)}
                    >
                      <X className="mr-1.5 size-3" />
                      Reject
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
