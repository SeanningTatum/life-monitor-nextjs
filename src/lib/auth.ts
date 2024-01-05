/* eslint no-param-reassign: off */
import { type NextAuthOptions, type Session } from 'next-auth'
import NextAuth, { getServerSession } from 'next-auth/next'
import GithubProvider from 'next-auth/providers/github'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { redirect } from 'next/navigation'

import prisma from '@/lib/prisma'

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? ''
    })
  ],
  adapter: PrismaAdapter(prisma),
  callbacks: {
    jwt({ token, account, user }) {
      if (account !== null) {
        token.accessToken = account.access_token
        token.id = user?.id
      }
      return token
    },
    session({ session, user }) {
      session.user.id = user.id ?? '';

      return session;
    },
  }
}

export async function redirectIfUnauthenticated(url?: string): Promise<Session> {
  const session = await getServerSession(authOptions)

  if (session == null) {
    return redirect(url ?? '/');
  }

  return session;
}


export const authHandler = NextAuth(authOptions)

export default authHandler

// const authHandler: NextApiHandler = (req, res) =>
// NextAuth(req, res, authOptions)
