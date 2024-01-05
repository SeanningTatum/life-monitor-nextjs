import { type PropsWithChildren } from 'react'
import { type Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'

import { DashboardNav } from './components/dashboard-nav'

import { AuthButton } from '@/components/auth-button.client'
import { ThemeToggle } from '@/components/theme-toggle.client'
import NextAuthProvider from '@/providers/next-auth-provider'
import { ThemeProvider } from '@/providers/theme-provider'
import { cn } from '@/lib/utils'

import '../globals.css'

export const metadata: Metadata = {
  title: 'Life Monitor | Dashboard',
  description: '',
}

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans'
})

export default function DashboardLayout({
  children
}: PropsWithChildren): JSX.Element {
  return (
    <html lang="en">
      <body
        className={cn(
          'min-h-screen bg-background font-sans ',
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextAuthProvider>
            <div className="min-h-screen flex flex-col h-full">
              <header className='sticky top-0 z-50 w-full border-b border-border/80 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
                <div className="flex h-16 items-center px-4">
                  <DashboardNav className="mx-6" />
                  <div className="ml-auto flex items-center space-x-4">
                    <ThemeToggle />
                    <AuthButton />
                  </div>
                </div>
              </header>

              <main className="container px-10 py-10 flex-1 flex">
                {children}
              </main>
            </div>
          </NextAuthProvider>
        </ThemeProvider>
      </body>
    </html>


  )
}
