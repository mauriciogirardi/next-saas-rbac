import { BringToFrontIcon, Slash } from 'lucide-react'

import { ability } from '@/auth/auth'

import { OrganizationSwitcher } from './organization-switcher'
import { ProfileButton } from './profile-button'
import { ProjectSwitcher } from './project-switcher'
import { ThemeSwitcher } from './theme/theme-switcher'
import { Separator } from './ui/separator'

export async function Header() {
  const permissions = await ability()

  return (
    <div className="mb-4 border-b pb-4">
      <header className="mx-auto flex max-w-[1280px] items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <BringToFrontIcon className="text-orange-300" />
          <Slash className="size-3 -rotate-[24deg] text-muted-foreground" />
          <OrganizationSwitcher />

          {permissions?.can('get', 'Project') && (
            <>
              <Slash className="size-3 -rotate-[24deg] text-muted-foreground" />
              <ProjectSwitcher />
            </>
          )}
        </div>

        <div className="flex items-center gap-4">
          <ThemeSwitcher />
          <Separator orientation="vertical" className="h-5" />
          <ProfileButton />
        </div>
      </header>
    </div>
  )
}
