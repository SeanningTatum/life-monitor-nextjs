'use client'

import { SessionProvider } from 'next-auth/react'
import type { PropsWithChildren } from 'react'

export function NextAuthProvider({ children }: PropsWithChildren): JSX.Element {
  return <SessionProvider>{children}</SessionProvider>
}
