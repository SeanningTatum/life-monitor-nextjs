import { TypographyH2 } from "@/components/ui/typography";
import { redirectIfUnauthenticated } from "@/lib/auth";
import UserChecklist from "./components/user-checklist";

export default async function HomePage() {
  await redirectIfUnauthenticated();

  return (
    <div className="flex justify-between w-full">
      <div className="w-[300px] self-end">
        <TypographyH2>"Successful people are not gifted; they just work hard, then succeed on purpose." —G.K. Nielson</TypographyH2>
      </div>

      <div className="w-[300px]">
        <UserChecklist />
      </div>
    </div>
  )
}