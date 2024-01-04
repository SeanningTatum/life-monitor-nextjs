'use client'

import { Button } from '@/components/ui/button'
import { signIn, signOut, useSession } from 'next-auth/react'

export function AuthButton() {
  const session = useSession()

  if (session.status === 'authenticated') {
    return <Button onClick={() => signOut({ callbackUrl: '/' })}>Sign Out</Button>
  }

  return <Button onClick={() => signIn('github', { callbackUrl: '/dashboard/home' })}>Not Signed In</Button>
}


