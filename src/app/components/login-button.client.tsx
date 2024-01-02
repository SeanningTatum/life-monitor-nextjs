'use client'

import { Button } from '@/components/ui/button'
import { signIn } from 'next-auth/react'

export function LoginButton() {
  return <Button onClick={() => signIn('github')}>Not Signed In</Button>
}
