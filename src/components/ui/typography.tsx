import React, { type PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

// MARK:- TypographyH1
const TypographyH1 = React.forwardRef<
  HTMLHeadingElement,
  React.BaseHTMLAttributes<HTMLHeadElement>
>(({ children, ...props }, ref) => (
  <h1
    {...props}
    className={cn(
      "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
      props.className
    )}
    ref={ref}
  >
    {children}
  </h1>
));

TypographyH1.displayName = "H1";

export { TypographyH1 };

// MARK:- TypographyH2

const TypographyH2 = React.forwardRef<
  HTMLHeadingElement,
  React.BaseHTMLAttributes<HTMLHeadElement>
>(({ children, ...props }, ref) => (
  <h2
    {...props}
    className={cn(
      "scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0",
      props.className
    )}
    ref={ref}
  >
    {children}
  </h2>
));

TypographyH2.displayName = "H2";

export { TypographyH2 };

// MARK:- TypographyH3
const TypographyH3 = React.forwardRef<
  HTMLHeadingElement,
  React.BaseHTMLAttributes<HTMLHeadElement>
>(({ children, ...props }, ref) => (
  <h3
    {...props}
    className={cn(
      "scroll-m-20 text-2xl font-semibold tracking-tight",
      props.className
    )}
    ref={ref}
  >
    {children}
  </h3>
));

TypographyH3.displayName = "H3";

export { TypographyH3 };

// MARK:- TypographyH4
const TypographyH4 = React.forwardRef<
  HTMLHeadingElement,
  React.BaseHTMLAttributes<HTMLHeadElement>
>(({ children, ...props }, ref) => (
  <h4
    className={cn(
      "scroll-m-20 text-xl font-semibold tracking-tight",
      props.className
    )}
    ref={ref}
  >
    {children}
  </h4>
));

TypographyH4.displayName = "H4";

export { TypographyH4 };

// MARK:- TypographyP
const TypographyP = React.forwardRef<
  HTMLHeadingElement,
  React.BaseHTMLAttributes<HTMLHeadElement>
>(({ children, ...props }, ref) => (
  <h4
    className={cn("leading-7 [&:not(:first-child)]:mt-6", props.className)}
    ref={ref}
  >
    {children}
  </h4>
));

TypographyP.displayName = "P";

export { TypographyP };

// MARK:- TypographyLead
const TypographyLead = React.forwardRef<
  HTMLHeadingElement,
  React.BaseHTMLAttributes<HTMLHeadElement>
>(({ children, ...props }, ref) => (
  <h4
    className={cn("text-xl text-muted-foreground", props.className)}
    ref={ref}
  >
    {children}
  </h4>
));

TypographyLead.displayName = "P";

export { TypographyLead };
