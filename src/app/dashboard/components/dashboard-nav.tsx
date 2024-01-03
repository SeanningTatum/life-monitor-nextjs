/* eslint-disable @typescript-eslint/space-before-function-paren */
import Link from 'next/link'

import { cn } from '@/lib/utils'

export function DashboardNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>): JSX.Element {
  return (
    <nav
      className={cn('flex items-center space-x-4 lg:space-x-6', className)}
      {...props}
    >
      <Link
        href="/dashboard/home"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Home
      </Link>
      <Link
        href="/dashboard/board"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Board
      </Link>
      <Link
        href="/dashboard/study"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Study
      </Link>
      <Link
        href="/dashboard/notes"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Notes
      </Link>
    </nav>
  )
}
