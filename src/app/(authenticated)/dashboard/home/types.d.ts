import { Prisma } from "@prisma/client";

const checklistWithTask = Prisma.validator<Prisma.ChecklistDefaultArgs>()({
  include: {
    tasks: true,
  }
})

export type ChecklistWithTasks = Prisma.ChecklistGetPayload<typeof checklistWithTask>;



