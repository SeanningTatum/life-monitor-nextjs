import { PropsWithChildren } from 'react'
import { DashboardNav } from './components/dashboard-nav'
import { ThemeToggle } from '@/components/theme-toggle'

export default function DashboardLayout({
  children
}: PropsWithChildren): JSX.Element {
  return (
    <>
      <header className='sticky top-0 z-50 w-full border-b border-border/80 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
        <div className="flex h-16 items-center px-4">
          {/* <MainNav className="mx-6" /> */}
          <DashboardNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <ThemeToggle />
            {/* <AuthButton isLoggedIn={!!user} /> */}
          </div>
        </div>
      </header>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        {children}
      </main>
    </>
  )
}
