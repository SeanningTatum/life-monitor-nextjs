/* eslint-disable @typescript-eslint/space-before-function-paren */

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'

const ROUTES = [
  { name: 'Home', href: '/dashboard/home' },
  { name: 'Board', href: '/dashboard/board' },
  { name: 'Study', href: '/dashboard/study' },
  { name: 'Notes', href: '/dashboard/note' },
]

export function DashboardNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>): JSX.Element {
  const pathname = usePathname();

  return (
    <nav
      className={cn('flex items-center space-x-4 lg:space-x-6', className)}
      {...props}
    >
      {ROUTES.map(route => (
        <Link
          href={route.href}
          className={cn("text-sm font-medium transition-colors hover:text-primary", pathname !== route.href && 'text-muted-foreground')}
        >
          {route.name}
        </Link>
      ))}
    </nav>
  )
}
