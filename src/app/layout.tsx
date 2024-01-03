import { PropsWithChildren } from 'react'
import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import './globals.css'

import { cn } from '@/lib/utils'
import { ThemeProvider } from '@/providers/theme-provider'
import NextAuthProvider from '@/providers/next-auth-provider'

export const metadata: Metadata = {
  title: 'Life Monitor',
  description: 'Enhance your productivity and well-being with Life-Monitor - your all-in-one companion for seamless organization and focus. Juggle tasks effortlessly with a personal Kanban board, amplify study sessions with a dedicated page featuring curated music, and capture thoughts on the go with our intuitive note-taking feature. Elevate your daily routine with Life-Monitor – where organization meets inspiration',
}

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans'
})

export default function RootLayout({
  children
}: PropsWithChildren): JSX.Element {
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
          <NextAuthProvider>{children}</NextAuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
