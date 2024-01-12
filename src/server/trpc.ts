import { initTRPC } from "@trpc/server";
import { TRPCPanelMeta } from "trpc-panel";
// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.meta<TRPCPanelMeta>().create();

export const router = t.router;
export const createCallerFactory = t.createCallerFactory;
export const procedure = t.procedure;
