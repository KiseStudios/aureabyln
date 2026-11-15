import type { ComponentPropsWithRef } from "react";

export function Container({ className = "", ...props }: ComponentPropsWithRef<"div">) {
  return (
    <div
      {...props}
      className={`mx-auto box-border w-full max-w-[90rem] px-6 md:px-12 xl:px-24 ${className}`}
    />
  );
}
