import { renderTrpcPanel } from "trpc-panel";

import { appRouter } from "@/server";

const handler = renderTrpcPanel(appRouter, { url: 'http://localhost:3000/api/trpc' })

export { handler as GET, handler as POST };
