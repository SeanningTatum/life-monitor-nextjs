import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@/lib/auth";

export default async function Home(): Promise<JSX.Element> {
  const session = await getServerSession(authOptions)

  if (session) {
    return redirect('/dashboard/home');
  }

  return (
    <>
      <h1>Home Page</h1>
    </>
  )
}
