import { createChecklist, getChecklistCollection } from "./data";
import UserChecklist from "./components/user-checklist.client";

import { TypographyH2 } from "@/components/ui/typography";
import { redirectIfUnauthenticated } from "@/lib/auth";

export default async function HomePage(): Promise<JSX.Element> {
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
        <TypographyH2>&quotSuccessful people are not gifted; they just work hard, then succeed on purpose.&quot —G.K. Nielson</TypographyH2>
      </div>

      <div className="w-[300px]">
        <UserChecklist checklist={checklist} />
      </div>
    </div>
  )
}
