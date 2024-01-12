import { renderTrpcPanel } from "trpc-panel";
import { NextResponse } from "next/server";

import { appRouter } from "@/server";

export function GET(): NextResponse {
  return new NextResponse(
    renderTrpcPanel(appRouter, {
      url: "http://localhost:3000/api/trpc",
    }),
    {
      headers: { "content-type": "text/html" },
    }
  );
}
