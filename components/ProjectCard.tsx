"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { getAccent } from "@/lib/accents";
import type { Project } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { buttonVariants } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { ProjectVisual } from "@/components/ProjectVisual";

const MAX_TECH = 5;

export function ProjectCard({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const a = getAccent(project.accent);
  const featured = !!project.featured;
  const overflow = project.tech.length - MAX_TECH;

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        whileHover={reduce ? undefined : { y: -6 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        aria-label={`${project.name} — view details`}
        className={cn(
          "group panel relative flex h-full flex-col overflow-hidden rounded-2xl border text-left transition-colors duration-300",
          a.border,
          a.borderHover,
          "hover:shadow-[0_18px_60px_-30px_var(--color-base)]",
        )}
      >
        {/* visual header */}
        <div
          className={cn(
            "relative w-full overflow-hidden",
            featured ? "h-48" : "h-40",
          )}
        >
          <ProjectVisual
            kind={project.visual}
            accent={project.accent}
            image={project.image}
            alt={`${project.name} preview`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-panel via-panel/20 to-transparent" />
          {featured ? (
            <span
              className={cn(
                "absolute right-3 top-3 inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[0.65rem] font-medium backdrop-blur-sm",
                a.border,
                a.bgSoft,
                a.text,
              )}
            >
              <Sparkles className="h-3 w-3" aria-hidden />
              Featured
            </span>
          ) : null}
          {project.badge ? (
            <span className="panel absolute bottom-3 left-3 rounded-md px-2 py-1 text-[0.65rem] font-medium text-ink">
              {project.badge}
            </span>
          ) : null}
        </div>

        {/* body */}
        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-lg font-semibold tracking-tight text-ink">
              {project.name}
            </h3>
            <ArrowUpRight
              className="mt-1 h-4 w-4 shrink-0 text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
              aria-hidden
            />
          </div>
          <p className={cn("mt-0.5 text-sm font-medium", a.text)}>
            {project.tagline}
          </p>
          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">
            {project.description}
          </p>

          <div className="mt-4 flex flex-1 flex-wrap content-end gap-1.5">
            {project.tech.slice(0, MAX_TECH).map((t) => (
              <Badge key={t}>{t}</Badge>
            ))}
            {overflow > 0 ? (
              <Badge accent={project.accent}>+{overflow}</Badge>
            ) : null}
          </div>
        </div>
      </motion.button>

      <Modal
        open={open}
        onOpenChange={setOpen}
        title={project.name}
        description={project.tagline}
      >
        <div className="-mx-6 -mt-6 mb-5 h-44 overflow-hidden rounded-t-2xl sm:-mx-7 sm:-mt-7 sm:h-52">
          <div className="relative h-full w-full">
            <ProjectVisual
              kind={project.visual}
              accent={project.accent}
              image={project.image}
              alt={`${project.name} preview`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-panel to-transparent" />
          </div>
        </div>

        {project.badge ? (
          <span
            className={cn(
              "mb-3 inline-flex rounded-md border px-2.5 py-1 text-xs font-medium",
              a.border,
              a.bgSoft,
              a.text,
            )}
          >
            {project.badge}
          </span>
        ) : null}

        <h3 className="text-2xl font-semibold tracking-tight text-ink">
          {project.name}
        </h3>
        <p className={cn("mt-1 font-medium", a.text)}>{project.tagline}</p>

        <div className="mt-5 space-y-4">
          <Detail label="Problem" accentHex={a.hex}>
            {project.problem}
          </Detail>
          <Detail label="Solution" accentHex={a.hex}>
            {project.solution}
          </Detail>
        </div>

        <div className="mt-5">
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.18em] text-muted">
            Tech stack
          </p>
          <div className="flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <Badge key={t} accent={project.accent}>
                {t}
              </Badge>
            ))}
          </div>
        </div>

        {project.links && project.links.length > 0 ? (
          <div className="mt-6 flex flex-wrap gap-3">
            {project.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({ variant: "secondary", size: "sm" })}
              >
                {l.label}
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </a>
            ))}
          </div>
        ) : null}
      </Modal>
    </>
  );
}

function Detail({
  label,
  accentHex,
  children,
}: {
  label: string;
  accentHex: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-l-2 pl-4" style={{ borderColor: accentHex }}>
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
        {label}
      </p>
      <p className="mt-1 text-sm leading-relaxed text-ink/90">{children}</p>
    </div>
  );
}
