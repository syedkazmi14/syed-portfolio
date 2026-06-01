"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Cloud,
  Code2,
  Cpu,
  LayoutTemplate,
  Server,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { getAccent } from "@/lib/accents";
import { skills } from "@/data/skills";
import { cn } from "@/lib/utils";
import { itemVariants, StaggerGroup } from "@/components/ui/Reveal";
import { Section } from "@/components/Section";
import { SectionHeader } from "@/components/SectionHeader";

const iconMap: Record<string, LucideIcon> = {
  Code2,
  LayoutTemplate,
  Server,
  Cpu,
  Cloud,
  Wrench,
};

export function SkillsToolbox() {
  return (
    <Section id="skills">
      <SectionHeader
        index="05"
        eyebrow="In the toolbox"
        title="Skills"
        description="The stack I reach for — pull open a drawer."
        accent="heat"
      />

      <StaggerGroup className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((cat) => {
          const a = getAccent(cat.accent);
          const Icon = iconMap[cat.icon] ?? Wrench;
          return (
            <Drawer key={cat.id}>
              <div
                className={cn(
                  "panel group h-full rounded-2xl border p-5 transition-all duration-300",
                  a.border,
                  a.borderHover,
                )}
              >
                {/* drawer pull */}
                <div className="mx-auto mb-5 h-1.5 w-16 rounded-full bg-line transition-colors group-hover:bg-white/20" />

                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "grid h-10 w-10 shrink-0 place-items-center rounded-xl border",
                      a.border,
                      a.bgSoft,
                    )}
                  >
                    <Icon className={cn("h-5 w-5", a.text)} aria-hidden />
                  </span>
                  <h3 className="text-base font-semibold text-ink">
                    {cat.title}
                  </h3>
                  <span className="ml-auto font-mono text-xs text-muted">
                    {String(cat.items.length).padStart(2, "0")}
                  </span>
                </div>

                <ul className="mt-4 flex flex-wrap gap-2">
                  {cat.items.map((item) => (
                    <li
                      key={item}
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-lg border border-line bg-white/[0.03] px-2.5 py-1 text-sm text-ink/85 transition-colors",
                        a.borderHover,
                      )}
                    >
                      <span className={cn("h-1.5 w-1.5 rounded-full", a.bgSolid)} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Drawer>
          );
        })}
      </StaggerGroup>
    </Section>
  );
}

function Drawer({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      variants={itemVariants}
      whileHover={reduce ? undefined : { y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="h-full"
    >
      {children}
    </motion.div>
  );
}
