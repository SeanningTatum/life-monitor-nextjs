'use client'

import { Button } from '@/components/ui/button'
import { signIn, signOut } from 'next-auth/react'

export function AuthButton() {
  return <Button onClick={() => signIn('github', { callbackUrl: '/dashboard/home' })}>Not Signed In</Button>
}

