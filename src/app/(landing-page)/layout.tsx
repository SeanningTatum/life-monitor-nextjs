import { PropsWithChildren } from 'react'
import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import '../globals.css'

import { cn } from '@/lib/utils'
import { ThemeProvider } from '@/providers/theme-provider'
import NextAuthProvider from '@/providers/next-auth-provider'
import { ThemeToggle } from '@/components/theme-toggle'
import { MainNav } from '../components/main-nav'
import { AuthButton } from '@/components/auth-button.client'

export const metadata: Metadata = {
  title: 'Life Monitor',
  description: 'Enhance your productivity and well-being with Life-Monitor - your all-in-one companion for seamless organization and focus. Juggle tasks effortlessly with a personal Kanban board, amplify study sessions with a dedicated page featuring curated music, and capture thoughts on the go with our intuitive note-taking feature. Elevate your daily routine with Life-Monitor – where organization meets inspiration',
}

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans'
})

export default async function RootLayout({
  children
}: PropsWithChildren): Promise<JSX.Element> {

  return (
    <html lang="en">
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
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
                  <MainNav className="mx-6" />
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
