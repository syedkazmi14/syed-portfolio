import { getAccent } from "@/lib/accents";
import type { Accent } from "@/lib/types";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Tint the badge with an accent color; omit for a neutral pill. */
  accent?: Accent;
}

export function Badge({ accent, className, children, ...props }: BadgeProps) {
  const a = accent ? getAccent(accent) : null;
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2.5 py-1 font-mono text-[0.7rem] leading-none tracking-tight transition-colors",
        a
          ? cn(a.border, a.text, a.bgSoft)
          : "border-line bg-white/[0.03] text-muted",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
