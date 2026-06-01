"use client";

import { Check, CircuitBoard, Code2, Server, type LucideIcon } from "lucide-react";
import { getAccent } from "@/lib/accents";
import type { Accent, ExperienceType } from "@/lib/types";
import { experience } from "@/data/experience";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/Section";
import { SectionHeader } from "@/components/SectionHeader";

const typeAccent: Record<ExperienceType, Accent> = {
  software: "neon",
  hardware: "heat",
  it: "iris",
};
const typeLabel: Record<ExperienceType, string> = {
  software: "Software Engineering",
  hardware: "Hardware",
  it: "IT / Infrastructure",
};
const typeIcon: Record<ExperienceType, LucideIcon> = {
  software: Code2,
  hardware: CircuitBoard,
  it: Server,
};

export function ExperienceTimeline() {
  return (
    <Section id="experience">
      <SectionHeader
        index="02"
        eyebrow="At the soldering station"
        title="Experience"
        description="From enterprise AI platforms to board-level hardware repair — a hands-on path across software, infrastructure, and electronics."
        accent="heat"
      />

      <div className="relative mt-10">
        {/* vertical rail */}
        <div className="absolute bottom-2 left-4 top-2 w-px bg-gradient-to-b from-heat/50 via-line to-transparent" />

        <div className="space-y-7">
          {experience.map((item, i) => {
            const a = getAccent(typeAccent[item.type]);
            const Icon = typeIcon[item.type];
            return (
              <Reveal key={item.id} delay={i * 0.05} className="relative pl-12">
                {/* node */}
                <span className="absolute left-4 top-6 -translate-x-1/2">
                  <span
                    className={cn(
                      "block h-3.5 w-3.5 rounded-full ring-4 ring-base",
                      a.bgSolid,
                    )}
                  />
                  {item.current ? (
                    <span
                      className={cn(
                        "absolute inset-0 animate-ping rounded-full",
                        a.bgSolid,
                        "opacity-60",
                      )}
                    />
                  ) : null}
                </span>

                <article
                  className={cn(
                    "panel rounded-2xl border p-5 transition-colors duration-300",
                    a.border,
                    a.borderHover,
                  )}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={cn(
                        "grid h-10 w-10 shrink-0 place-items-center rounded-xl border",
                        a.border,
                        a.bgSoft,
                      )}
                    >
                      <Icon className={cn("h-5 w-5", a.text)} aria-hidden />
                    </span>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <h3 className="text-base font-semibold text-ink sm:text-lg">
                          {item.role}
                        </h3>
                        <span className="text-muted">·</span>
                        <span className={cn("font-medium", a.text)}>
                          {item.company}
                        </span>
                        {item.current ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-mint/30 bg-mint/10 px-2 py-0.5 text-[0.65rem] font-medium text-mint">
                            <span className="h-1.5 w-1.5 rounded-full bg-mint" />
                            Current
                          </span>
                        ) : null}
                      </div>
                      <p className="mt-1 font-mono text-xs text-muted">
                        {item.period} · {typeLabel[item.type]}
                      </p>
                    </div>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-muted">
                    {item.description}
                  </p>

                  {item.highlights && item.highlights.length > 0 ? (
                    <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                      {item.highlights.map((h) => (
                        <li
                          key={h}
                          className="flex items-start gap-2 text-sm text-ink/85"
                        >
                          <Check
                            className={cn("mt-0.5 h-4 w-4 shrink-0", a.text)}
                            aria-hidden
                          />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {item.tech.map((t) => (
                      <Badge key={t}>{t}</Badge>
                    ))}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
