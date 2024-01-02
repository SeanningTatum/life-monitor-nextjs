import { getServerSession } from 'next-auth'

import { ThemeToggle } from '@/components/theme-toggle'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

import { ActionCommandMenu } from './components/action-command-menu'
import { MainNav } from './components/main-nav'
import { LoginButton } from './components/login-button.client'
import { LogoutButton } from './components/logout-button.client'

async function getUser(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email
    }
  })

  return user
}

export default async function Home(): Promise<JSX.Element> {
  const session = await getServerSession(authOptions)
  const user = await getUser(session?.user?.email! ?? '')

  return (
    <>
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <ThemeToggle />
          </div>
        </div>
      </div>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <ActionCommandMenu />
        {!user ? (
          <LoginButton />
        ) : (
          <>
            <h3>Current User is {user.email}</h3>
            <LogoutButton />
          </>
        )}
        {/* <h1>Current User is {user?.email}</h1> */}
      </main>
    </>
  )
}
