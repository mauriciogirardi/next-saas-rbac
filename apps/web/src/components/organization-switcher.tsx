import { ChevronsUpDown, PlusCircleIcon } from 'lucide-react'
import Link from 'next/link'

import { getCurrentOrg } from '@/auth/auth'
import { PATH_CREATE_ORGANIZATION } from '@/constants/paths-application'
import { getOrganizations } from '@/http/get-organizations'
import { getInitials } from '@/utils/getInitials'

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

export async function OrganizationSwitcher() {
  const currentOrg = getCurrentOrg()
  const { organizations } = await getOrganizations()

  const currentOrganization = organizations?.find(
    (org) => org.slug === currentOrg,
  )

  return (
    <DropdownMenu key="organization">
      <DropdownMenuTrigger className="group flex w-[168px] items-center gap-2 p-1 text-sm font-medium  outline-none focus-visible:rounded focus-visible:ring-2 focus-visible:ring-primary">
        {currentOrganization ? (
          <>
            <Avatar className="size-5">
              {currentOrganization.avatarUrl && (
                <AvatarImage src={currentOrganization.avatarUrl} />
              )}
              <AvatarFallback className="text-[8px]">
                {getInitials(currentOrganization.name)}
              </AvatarFallback>
            </Avatar>
            <span
              className="truncate text-left group-hover:opacity-70"
              title={currentOrganization.name}
            >
              {currentOrganization.name}
            </span>
          </>
        ) : (
          <span className="group-hover:text-muted-foreground/70">
            Select organization
          </span>
        )}

        <ChevronsUpDown className="ml-auto size-4 text-muted-foreground group-hover:text-muted-foreground/70" />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        alignOffset={-16}
        sideOffset={12}
        className="w-[200px]"
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel>Organization</DropdownMenuLabel>
          {organizations.map((org) => (
            <DropdownMenuItem key={org.id} asChild>
              <Link href={`/org/${org.slug}`}>
                <Avatar className="mr-2 size-5">
                  {org.avatarUrl && <AvatarImage src={org.avatarUrl} />}
                  <AvatarFallback className="text-[8px]">
                    {getInitials(org.name)}
                  </AvatarFallback>
                </Avatar>
                <span className="line-clamp-1">{org.name}</span>
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href={PATH_CREATE_ORGANIZATION}>
            <PlusCircleIcon className="mr-2 size-5" />
            Create new
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
