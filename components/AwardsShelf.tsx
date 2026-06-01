"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Award as AwardIcon, Trophy, Users, type LucideIcon } from "lucide-react";
import { getAccent } from "@/lib/accents";
import { awards } from "@/data/awards";
import { cn } from "@/lib/utils";
import { itemVariants, StaggerGroup } from "@/components/ui/Reveal";
import { Section } from "@/components/Section";
import { SectionHeader } from "@/components/SectionHeader";

const iconById: Record<string, LucideIcon> = {
  aes: AwardIcon,
  axxess: Trophy,
  "peoples-choice": Users,
};

export function AwardsShelf() {
  return (
    <Section id="awards">
      <SectionHeader
        index="04"
        eyebrow="On the trophy shelf"
        title="Awards & Recognition"
        description="Hackathon wins, audience picks, and university honors."
        accent="iris"
      />

      <div className="mt-10">
        <StaggerGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {awards.map((award) => {
            const a = getAccent(award.accent);
            const Icon = iconById[award.id] ?? Trophy;
            return (
              <AwardCard key={award.id}>
                <article
                  className={cn(
                    "panel group relative flex h-full flex-col rounded-2xl border p-6 transition-all duration-300",
                    a.border,
                    a.borderHover,
                    a.glowHover,
                  )}
                >
                  <span
                    className={cn(
                      "grid h-14 w-14 place-items-center rounded-2xl border transition-transform duration-300 group-hover:-translate-y-1",
                      a.border,
                      a.bgSoft,
                      a.glow,
                    )}
                  >
                    <Icon className={cn("h-7 w-7", a.text)} aria-hidden />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold tracking-tight text-ink">
                    {award.title}
                  </h3>
                  <p className={cn("mt-1 text-sm font-medium", a.text)}>
                    {award.org}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {award.description}
                  </p>
                </article>
              </AwardCard>
            );
          })}
        </StaggerGroup>

        {/* shelf plank */}
        <div className="mx-auto mt-6 max-w-5xl">
          <div className="h-3 rounded-md bg-gradient-to-b from-[#3a445e] to-[#1d2433] shadow-[0_18px_40px_-22px_#000]" />
          <div className="h-[2px] bg-iris/40" />
          <div className="mx-auto flex max-w-3xl justify-between px-10">
            <span className="h-5 w-3 bg-[#161c28]" />
            <span className="h-5 w-3 bg-[#161c28]" />
          </div>
        </div>
      </div>
    </Section>
  );
}

function AwardCard({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      variants={itemVariants}
      whileHover={reduce ? undefined : { y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="h-full"
    >
      {children}
    </motion.div>
  );
}
