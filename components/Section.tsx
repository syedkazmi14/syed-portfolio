import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  id: string;
  children: ReactNode;
  className?: string;
  /** Wrap content in the standard centered container. */
  container?: boolean;
}

/** Consistent section shell: anchor id, vertical rhythm, max-width container. */
export function Section({
  id,
  children,
  className,
  container = true,
}: SectionProps) {
  return (
    <section id={id} className={cn("relative py-20 sm:py-28", className)}>
      {container ? (
        <div className="mx-auto max-w-6xl px-5 sm:px-8">{children}</div>
      ) : (
        children
      )}
    </section>
  );
}
