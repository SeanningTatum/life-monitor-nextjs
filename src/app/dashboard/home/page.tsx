import { TypographyH2 } from "@/components/ui/typography";
import { authOptions } from "@/lib/auth";
import { redirectIfUnauthenticated } from "@/lib/utils"

export default async function HomePage() {
  await redirectIfUnauthenticated(authOptions);

  return (
    <div className="align-self-end">
      <div className="w-[300px]">
        <TypographyH2>"Successful people are not gifted; they just work hard, then succeed on purpose." —G.K. Nielson</TypographyH2>
      </div>
    </div>
  )
}