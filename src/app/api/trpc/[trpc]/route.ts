import { fetchRequestHandler } from "@trpc/server/adapters/fetch"

import { appRouter } from "@/server"

const handler = (req: Request): Promise<Response> => fetchRequestHandler({
  endpoint: '/api/trpc',
  req,
  router: appRouter,
  createContext: () => ({}),
})

export { handler as GET, handler as POST };
