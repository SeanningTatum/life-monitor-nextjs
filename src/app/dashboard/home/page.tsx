import { authOptions } from "@/lib/auth";
import { redirectIfUnauthenticated } from "@/lib/utils"


export default async function HomePage() {
  await redirectIfUnauthenticated(authOptions);

  return (
    <h1>Home</h1>
  )
}