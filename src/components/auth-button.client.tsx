'use client'

import { signIn, signOut, useSession } from 'next-auth/react'

import { Skeleton } from './ui/skeleton'

import { Button } from '@/components/ui/button'

export function AuthButton() {
  const session = useSession()

  if (session.status === 'loading') return <Skeleton className="rounded h-9 w-28" />

  if (session.status === 'authenticated') {
    return <Button onClick={async () => { await signOut({ callbackUrl: '/' }); }}>Sign Out</Button>
  }

  return <Button onClick={async () => await signIn('github', { callbackUrl: '/dashboard/home' })}>Not Signed In</Button>
}


