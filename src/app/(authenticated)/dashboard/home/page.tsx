import UserChecklist from "./components/user-checklist.client";

import { TypographyH2 } from "@/components/ui/typography";
import { redirectIfUnauthenticated } from "@/lib/auth";
import prisma from '@/lib/prisma'
import { } from '@prisma/client'

async function getChecklistCollection(userId: string) {
  const checklists = await prisma.user.findUnique({
    where: {
      id: userId
    }
  }).Checklist({
    include: {
      tasks: true,
    }
  })

  return checklists;
}


async function createChecklist(userId: string) {
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

export default async function HomePage() {
  const session = await redirectIfUnauthenticated();

  // TEMP:- Get first task as we don't have any feature to create a new task list
  // or shift through them
  let [checklist] = await getChecklistCollection(session.user.id) ?? [];

  if (!checklist) {
    checklist = await createChecklist(session.user.id);
  }

  return (
    <div className="flex justify-between w-full">
      <div className="w-[300px] self-end">
        <TypographyH2>"Successful people are not gifted; they just work hard, then succeed on purpose." —G.K. Nielson</TypographyH2>
      </div>

      <div className="w-[300px]">
        <UserChecklist checklist={checklist} />
      </div>
    </div>
  )
}