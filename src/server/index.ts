import { createCallerFactory, router } from './trpc';
import { checklistRouter } from './routers/checklist';

export const appRouter = router({
  checklist: checklistRouter,
});

const caller = createCallerFactory(appRouter);
export const serverRouter = caller({});

export type AppRouter = typeof appRouter;
