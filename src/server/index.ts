import { httpBatchLink } from '@trpc/client';
import { z } from 'zod';

import { procedure, router } from './trpc';

import prisma from '@/lib/prisma'

export const appRouter = router({
  getTodos: procedure.query(() => {
    const response = [10, 20, 30]

    return response;
  }),
  getChecklistCollection: procedure.input(
    z.object({
      userId: z.string()
    })
  )
    .query(async (opts) => {
      const checklists = await prisma.checklist.findMany({
        where: {
          createdBy: opts.input.userId,
        },
        include: {
          tasks: true,
        }
      })

      return checklists;
    }),
  createChecklist: procedure.input(z.object({
    userId: z.string()
  }))
    .mutation(async (opts) => {
      const newChecklist = await prisma.checklist.create({
        data: {
          name: 'First Task List',
          createdBy: opts.input.userId,
        },
        include: {
          tasks: true,
        }
      });

      return newChecklist;
    })
});

// TODO:- Change this to use createCallerFactory
export const serverRouter = appRouter.createCaller({
  links: [
    httpBatchLink({
      url: "http://localhost:3000/api/trpc",
    })
  ]
})

export type AppRouter = typeof appRouter;
