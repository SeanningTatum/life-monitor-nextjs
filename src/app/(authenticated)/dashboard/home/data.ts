import { ChecklistWithTasks } from './types';

import prisma from '@/lib/prisma'

export async function getChecklistCollection(userId: string): Promise<ChecklistWithTasks[]> {
  const checklists = await prisma.checklist.findMany({
    where: {
      createdBy: userId,
    },
    include: {
      tasks: true,
    }
  })

  return checklists;
}

export async function createChecklist(userId: string): Promise<ChecklistWithTasks> {
  const newChecklist = await prisma.checklist.create({
    data: {
      name: 'First Task List',
      createdBy: userId,
    },
    include: {
      tasks: true,
    }
  });

  return newChecklist;
}
