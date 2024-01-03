import { type ClassValue, clsx } from 'clsx'
import { NextAuthOptions, getServerSession } from 'next-auth';
import { twMerge } from 'tailwind-merge'
import { redirect } from 'next/navigation';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

export async function redirectIfUnauthenticated(options: NextAuthOptions, url?: string): Promise<void> {
  const session = await getServerSession(options)

  if (!session) {
    redirect(url ?? '/');
  }
}
