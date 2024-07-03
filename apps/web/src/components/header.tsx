import { BringToFrontIcon, Slash } from 'lucide-react'

import { OrganizationSwitcher } from './organization-switcher'
import { ProfileButton } from './profile-button'

export function Header() {
  return (
    <header className="mx-auto flex max-w-[1280px] items-center justify-between px-4">
      <div className="flex items-center gap-3">
        <BringToFrontIcon className="text-orange-300" />
        <Slash className="size-3 -rotate-[24deg] text-muted-foreground" />
        <OrganizationSwitcher />
      </div>

      <div className="flex items-center gap-4">
        <ProfileButton />
      </div>
    </header>
  )
}
