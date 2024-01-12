import * as R from "ramda";
import { z } from "zod";

import { procedure, router } from "../trpc";

import prisma from "@/lib/prisma";

const checklistZod = z.object({
  name: z.string(),
  taskOrder: z.string().array(),
});

const taskSchema = z.object({
  title: z.string(),
  completed: z.boolean(),
});

export const checklistRouter = router({
  getChecklistCollection: procedure
    .meta({ description: "Given the `userId` fetch all the checklists" })
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(async (opts) => {
      const checklists = await prisma.checklist.findMany({
        where: {
          createdBy: opts.input.userId,
        },
        include: {
          tasks: true,
        },
      });

      console.log(checklists);

      return checklists;
    }),
  getChecklistById: procedure.input(z.string()).query(async (opts) => {
    const checklist = await prisma.checklist.findUnique({
      where: { id: opts.input },
    });

    return checklist;
  }),
  patchChecklist: procedure
    .input(
      z.object({
        id: z.string(),
        data: checklistZod.partial(),
      })
    )
    .mutation(async (opts) => {
      const updatedChecklist = await prisma.checklist.update({
        where: {
          id: opts.input.id,
        },
        data: {
          taskOrder: {
            set: opts.input.data.taskOrder,
          },
        },
      });

      return updatedChecklist;
    }),
  addTaskToChecklist: procedure
    .input(
      z.object({
        checklistId: z.string(),
        data: z.object({
          title: z.string(),
        }),
      })
    )
    .mutation(async (opts) => {
      const newTask = await prisma.task.create({
        data: {
          ...opts.input.data,
          completed: false,
          TaskList: {
            connect: { id: opts.input.checklistId },
          },
        },
      });

      await prisma.checklist.update({
        where: { id: opts.input.checklistId },
        data: { taskOrder: { push: newTask.id } },
      });

      return newTask;
    }),
  deleteCompletedTasks: procedure
    .input(
      z.object({
        checklistId: z.string(),
      })
    )
    .mutation(async (opts) => {
      const tasksPromise = prisma.task.findMany({
        where: { taskListId: opts.input.checklistId },
        select: { id: true, completed: true },
      });

      const deleteTasksPromise = prisma.task.deleteMany({
        where: {
          taskListId: opts.input.checklistId,
          completed: true,
        },
      });

      const [tasks] = await Promise.all([tasksPromise, deleteTasksPromise]);

      const updatedTaskList = R.filter(
        (task) => task.completed === false,
        tasks
      ).map((task) => task.id);

      await prisma.checklist.update({
        where: { id: opts.input.checklistId },
        data: {
          taskOrder: {
            set: updatedTaskList,
          },
        },
      });
    }),
  deleteTaskById: procedure
    .input(
      z.object({
        checklistId: z.string(),
        taskId: z.string(),
      })
    )
    .mutation(async (opts) => {
      const checklist = await prisma.checklist.findUnique({
        where: { id: opts.input.checklistId },
        include: { tasks: true },
      });

      if (!checklist) {
        return;
      }

      await prisma.task.delete({ where: { id: opts.input.taskId } });
      await prisma.checklist.update({
        where: { id: opts.input.checklistId },
        data: {
          taskOrder: {
            set: checklist.taskOrder.filter((id) => id !== opts.input.taskId),
          },
        },
      });
    }),
  patchTask: procedure
    .input(
      z.object({
        id: z.string(),
        data: taskSchema.partial(),
      })
    )
    .mutation(async (opts) => {
      const updatedTask = await prisma.task.update({
        where: { id: opts.input.id },
        data: opts.input.data,
      });

      return updatedTask;
    }),
  createChecklist: procedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .mutation(async (opts) => {
      const newChecklist = await prisma.checklist.create({
        data: {
          name: "First Task List",
          createdBy: opts.input.userId,
        },
        include: {
          tasks: true,
        },
      });

      return newChecklist;
    }),
});
