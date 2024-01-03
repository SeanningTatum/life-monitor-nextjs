'use client'

import { Button } from '@/components/ui/button'
import { signIn, signOut } from 'next-auth/react'

interface Props {
  isLoggedIn: boolean;
}

export function AuthButton({ isLoggedIn }: Props) {

  if (isLoggedIn) {
    return <Button onClick={() => signOut()}>Sign Out</Button>;
  }

  return <Button onClick={() => signIn('github')}>Not Signed In</Button>
}

