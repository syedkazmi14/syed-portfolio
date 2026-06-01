import { getAccent } from "@/lib/accents";
import type { Accent } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";

interface SectionHeaderProps {
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
  accent?: Accent;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  index,
  eyebrow,
  title,
  description,
  accent = "neon",
  align = "left",
  className,
}: SectionHeaderProps) {
  const a = getAccent(accent);
  return (
    <Reveal
      className={cn(
        align === "center" && "mx-auto max-w-2xl text-center",
        className,
      )}
    >
      <div
        className={cn(
          "flex items-center gap-3",
          align === "center" && "justify-center",
        )}
      >
        <span className={cn("font-mono text-xs font-medium", a.text)}>
          {index}
        </span>
        <span className={cn("h-px w-8", a.bgSolid, "opacity-60")} />
        <span className="font-mono text-[0.7rem] uppercase tracking-[0.25em] text-muted">
          {eyebrow}
        </span>
      </div>
      <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-ink sm:text-4xl md:text-[2.7rem] md:leading-[1.1]">
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-4 max-w-2xl text-pretty leading-relaxed text-muted",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
