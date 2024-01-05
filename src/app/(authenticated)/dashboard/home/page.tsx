import UserChecklist from "./components/user-checklist.client";

import { TypographyH2 } from "@/components/ui/typography";
import { redirectIfUnauthenticated } from "@/lib/auth";
import { serverRouter } from "@/server";

export default async function HomePage(): Promise<JSX.Element> {
  const session = await redirectIfUnauthenticated();

  // TEMP:- Get first task as we don't have any feature to create a new task list
  // or shift through them
  let [checklist] = await serverRouter.getChecklistCollection({ userId: session.user.id }) ?? [];

  if (!checklist) {
    checklist = await serverRouter.createChecklist({ userId: session.user.id });
  }

  return (
    <div className="flex justify-between w-full">
      <div className="w-[300px] self-end">
        <TypographyH2>Hi</TypographyH2>
      </div>

      <div className="w-[300px]">
        <UserChecklist checklist={checklist} />
      </div>
    </div>
  )
}
