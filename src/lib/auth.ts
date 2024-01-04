import { NextAuthOptions } from 'next-auth'
import NextAuth, { getServerSession } from 'next-auth/next'
import GithubProvider from 'next-auth/providers/github'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import prisma from '@/lib/prisma'
import { redirect } from 'next/navigation'

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? ''
    })
  ],
  adapter: PrismaAdapter(prisma)
}

export async function redirectIfUnauthenticated(url?: string): Promise<void> {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect(url ?? '/');
  }
}


export const authHandler = NextAuth(authOptions)

export default authHandler

// const authHandler: NextApiHandler = (req, res) =>
// NextAuth(req, res, authOptions)
