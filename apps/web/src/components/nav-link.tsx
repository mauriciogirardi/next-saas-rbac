'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ComponentProps } from 'react'

type NavLinkProps = ComponentProps<typeof Link>

export function NavLink({ ...rest }: NavLinkProps) {
  const pathname = usePathname()

  const isCurrent = rest.href.toString() === pathname

  return <Link data-current={isCurrent} {...rest} />
}
