import { type PropsWithChildren } from "react";

export function TypographyH2({ children }: PropsWithChildren): JSX.Element {
  return (
    <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
      {children}
    </h2>
  )
}
