import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

import { ThemeToggle } from '@/components/theme-toggle'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

import { ActionCommandMenu } from './components/action-command-menu'
import { MainNav } from './components/main-nav'
import { AuthButton } from './components/auth-button.client'

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

  if (session) {
    redirect('/dashboard/home');
  }

  return (
    <>
      <header className='sticky top-0 z-50 w-full border-b border-border/80 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
        <div className="flex h-16 items-center px-4">
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <ThemeToggle />
            <AuthButton />
          </div>
        </div>
      </header>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <ActionCommandMenu />
      </main>
    </>
  )
}
