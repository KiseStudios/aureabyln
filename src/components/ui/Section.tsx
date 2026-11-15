import type { ComponentPropsWithRef } from "react";

export function Section({ className = "", ...props }: ComponentPropsWithRef<"section">) {
  return <section {...props} className={`py-12 md:py-16 xl:py-24 ${className}`} />;
}
