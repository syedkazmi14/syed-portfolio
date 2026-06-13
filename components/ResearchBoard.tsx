"use client";

import { motion, useReducedMotion } from "framer-motion";
import { getAccent } from "@/lib/accents";
import type { Project } from "@/lib/types";
import { projects } from "@/data/projects";
import { researchInterests, researchProjectIds } from "@/data/research";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectVisual } from "@/components/ProjectVisual";

const researchProjects = researchProjectIds
  .map((id) => projects.find((p) => p.id === id))
  .filter(Boolean) as Project[];

/** The whiteboard: pinned research sketches + sticky-note focus areas. */
export function ResearchBoard() {
  return (
    <Reveal>
      <div className="relative overflow-hidden rounded-3xl border border-line bg-[#0b1018] bg-grid-fine p-5 sm:p-8">
        {/* board header */}
        <div className="mb-6 flex items-center gap-3">
          <span className="font-mono text-sm text-mint">research/ai-work</span>
          <span className="h-px flex-1 bg-line" />
          <span className="hidden font-mono text-xs text-muted sm:inline">
            ~/syed/notes
          </span>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          {/* pinned project sketches */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-3">
            {researchProjects.map((p) => (
              <PinnedCard key={p.id} project={p} />
            ))}
          </div>

          {/* sticky-note focus areas */}
          <div className="lg:col-span-2">
            <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-muted">
              AI / ML focus areas
            </h3>
            <div className="flex flex-wrap gap-3">
              {researchInterests.map((interest, i) => (
                <StickyNote key={interest.label} interest={interest} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function PinnedCard({ project }: { project: Project }) {
  const a = getAccent(project.accent);
  return (
    <article
      className={cn(
        "panel relative rounded-xl border p-3 transition-colors",
        a.border,
        a.borderHover,
      )}
    >
      <span
        className={cn(
          "absolute -top-2 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full ring-2 ring-base",
          a.bgSolid,
        )}
      />
      <div className="h-24 w-full overflow-hidden rounded-lg">
        <ProjectVisual
          kind={project.visual}
          accent={project.accent}
          image={project.image}
        />
      </div>
      <h4 className="mt-3 text-sm font-semibold text-ink">{project.name}</h4>
      <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted">
        {project.solution}
      </p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {project.tech.slice(0, 3).map((t) => (
          <Badge key={t}>{t}</Badge>
        ))}
      </div>
    </article>
  );
}

function StickyNote({
  interest,
  index,
}: {
  interest: (typeof researchInterests)[number];
  index: number;
}) {
  const reduce = useReducedMotion();
  const a = getAccent(interest.accent);
  const rotate = index % 2 === 0 ? -2.5 : 2;

  return (
    <motion.div
      initial={reduce ? false : { rotate, opacity: 0, y: 10 }}
      whileInView={{ rotate, opacity: 1, y: 0 }}
      whileHover={reduce ? undefined : { rotate: 0, y: -3 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={cn(
        "relative w-[calc(50%-0.375rem)] rounded-md border p-3 backdrop-blur-sm",
        a.border,
        a.bgSoft,
      )}
    >
      <span className="absolute -top-1.5 left-1/2 h-3 w-10 -translate-x-1/2 rounded-sm bg-white/10" />
      <p className={cn("text-sm font-semibold", a.text)}>{interest.label}</p>
      <p className="mt-1 text-xs leading-relaxed text-muted">{interest.note}</p>
    </motion.div>
  );
}
