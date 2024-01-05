'use client'

import { signIn, signOut, useSession } from 'next-auth/react'

import { Skeleton } from './ui/skeleton'

import { Button } from '@/components/ui/button'

export function AuthButton(): JSX.Element {
  const session = useSession()

  function onClickSignIn(): void {
    signIn('github', { callbackUrl: '/dashboard/home' })
      .catch(console.error)
  }

  function onClickSignOut(): void {
    signOut({ callbackUrl: '/' }).catch(console.error);
  }

  if (session.status === 'loading') return <Skeleton className="rounded h-9 w-28" />

  if (session.status === 'authenticated') {
    return <Button onClick={onClickSignOut}>Sign Out</Button>
  }

  return <Button onClick={onClickSignIn}>Not Signed In</Button>
}


