'use client'

import { Button } from '@/components/ui/button'
import { signIn, signOut, useSession } from 'next-auth/react'
import { Skeleton } from './ui/skeleton'

export function AuthButton() {
  const session = useSession()

  if (session.status === 'loading') return <Skeleton className="rounded h-9 w-28" />

  if (session.status === 'authenticated') {
    return <Button onClick={() => signOut({ callbackUrl: '/' })}>Sign Out</Button>
  }

  return <Button onClick={() => signIn('github', { callbackUrl: '/dashboard/home' })}>Not Signed In</Button>
}


