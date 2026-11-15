import type { ComponentPropsWithRef, ReactNode } from "react";

type Appearance = {
  children: ReactNode;
  variant?: "primary" | "secondary";
  size?: "compact" | "regular";
};

type Action = Appearance & ComponentPropsWithRef<"button"> & { href?: never };
type Destination = Appearance & ComponentPropsWithRef<"a"> & {
  href: string;
  disabled?: never;
};

export type ButtonProps = Action | Destination;

const variants = {
  primary: "border-neutral-900 bg-neutral-900 text-white enabled:hover:bg-neutral-700 [&:any-link:hover]:bg-neutral-700",
  secondary: "border-neutral-700 bg-white text-neutral-900 enabled:hover:bg-neutral-100 [&:any-link:hover]:bg-neutral-100",
};

const sizes = {
  compact: "min-h-11 px-4 py-2 text-sm",
  regular: "min-h-12 px-6 py-3 text-base",
};

export function Button({ children, variant = "primary", size = "regular", className, ...props }: ButtonProps) {
  const classes = [
    "inline-flex max-w-full items-center justify-center rounded-full border text-center font-medium wrap-anywhere",
    "focus-visible:outline-3 focus-visible:outline-offset-4",
    "focus-visible:outline-neutral-800 disabled:cursor-not-allowed disabled:opacity-50",
    variants[variant], sizes[size], className,
  ].filter(Boolean).join(" ");

  if (typeof props.href === "string") {
    if (!props.href.trim()) return null;
    return <a {...props} className={classes}>{children}</a>;
  }

  return <button type="button" {...props} className={classes}>{children}</button>;
}
