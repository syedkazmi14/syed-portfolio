"use client";

import { useState, type MouseEvent } from "react";
import Link from "next/link";
import type { Project } from "@/lib/types";
import { Reveal } from "@/components/Reveal";
import { ArrowUpRight } from "@/components/icons";
import { HoverTile } from "@/components/HoverTile";
import { PhotoCarousel } from "@/components/PhotoCarousel";
import { Drawer } from "@/components/Drawer";

/** Tech shown on a tile before it gets noisy. Tiles are narrow now. */
const MAX_TECH = 4;

function techLine(tech: string[]) {
  const shown = tech.slice(0, MAX_TECH).join(" · ");
  return tech.length > MAX_TECH ? `${shown} · +${tech.length - MAX_TECH}` : shown;
}

/**
 * True when a click should be left alone: a modified or middle click is the
 * reader asking for a new tab, and we should not hijack it.
 */
function isPlainClick(e: MouseEvent) {
  return !(e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0);
}

function WorkTile({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: (p: Project) => void;
}) {
  /*
   * The title stays a real <a href="/work/<id>"> even though a plain click
   * opens the drawer: it keeps the project pages crawlable and lets
   * cmd-click / middle-click open them in a new tab as expected.
   */
  const handle = (e: MouseEvent) => {
    if (!isPlainClick(e)) return;
    e.preventDefault();
    onOpen(project);
  };

  return (
    <Reveal as="article" delay={(index % 2) * 120} className="border-t border-rule">
      <HoverTile image={project.images?.[0]} intensity={0.2}>
        <div data-cursor-label="View project" className="flex h-full flex-col px-3 py-6">
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-[0.72rem] text-faint">
              {String(index + 1).padStart(2, "0")}
            </span>
            {project.badge ? (
              <p className="truncate font-mono text-[0.65rem] uppercase tracking-[0.1em] text-green">
                {project.badge}
              </p>
            ) : null}
          </div>

          <h3 className="mt-1.5 font-display text-[1.75rem] leading-tight">
            <Link
              href={`/work/${project.id}`}
              onClick={handle}
              className="transition-colors hover:text-green"
            >
              {project.name}
            </Link>
          </h3>

          {project.tagline || project.description ? (
            <p className="mt-1.5 text-[0.95rem] leading-relaxed text-body">
              {project.tagline ?? project.description}
            </p>
          ) : null}

          {project.period ? (
            <p className="mt-2 font-mono text-[0.7rem] text-faint">{project.period}</p>
          ) : null}

          {project.tech.length > 0 ? (
            <p className="mt-3 font-mono text-[0.7rem] leading-relaxed text-muted">
              {techLine(project.tech)}
            </p>
          ) : null}

          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 pt-1">
            <Link
              href={`/work/${project.id}`}
              onClick={handle}
              className="border-b border-green pb-px text-[0.85rem] font-medium text-green transition-colors hover:text-green-deep"
            >
              Details
            </Link>
            {project.links?.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[0.85rem] text-muted transition-colors hover:text-ink"
              >
                {link.label}
                <ArrowUpRight className="h-3 w-3" />
              </a>
            ))}
          </div>
        </div>
      </HoverTile>
    </Reveal>
  );
}

export function WorkIndex({
  projects,
  className = "",
}: {
  projects: Project[];
  className?: string;
}) {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <div className={className}>
      {/* Two columns from sm up: eight tiles fit in four rows instead of
          eight full-width bands. */}
      <div className="grid grid-cols-1 gap-x-10 sm:grid-cols-2">
        {projects.map((project, i) => (
          <WorkTile key={project.id} project={project} index={i} onOpen={setActive} />
        ))}
      </div>
      <div className="border-t border-rule" />

      <Drawer
        open={!!active}
        onClose={() => setActive(null)}
        eyebrow={active?.badge ?? "Project"}
        title={active?.name ?? ""}
      >
        {active ? <ProjectDetail project={active} /> : null}
      </Drawer>
    </div>
  );
}

function ProjectDetail({ project }: { project: Project }) {
  return (
    <article>
      <h2 className="font-display text-4xl leading-tight">{project.name}</h2>
      {project.tagline ? (
        <p className="mt-2 text-lg leading-relaxed text-body">{project.tagline}</p>
      ) : null}
      {project.period ? (
        <p className="mt-1 font-mono text-xs text-muted">{project.period}</p>
      ) : null}

      {project.images?.length ? (
        <PhotoCarousel
          className="mt-7"
          images={project.images}
          alt={`${project.name} — screenshot`}
        />
      ) : null}

      {project.problem ? (
        <section className="mt-8">
          <h3 className="label">The problem</h3>
          <p className="mt-2.5 leading-relaxed">{project.problem}</p>
        </section>
      ) : null}

      {project.solution ? (
        <section className="mt-6">
          <h3 className="label">What I built</h3>
          <p className="mt-2.5 leading-relaxed">{project.solution}</p>
        </section>
      ) : null}

      {project.description ? (
        <section className="mt-6 border-t border-rule-soft pt-6">
          <h3 className="label">How it works</h3>
          <p className="mt-2.5 leading-relaxed">{project.description}</p>
        </section>
      ) : null}

      {project.tech.length > 0 ? (
      <section className="mt-6 border-t border-rule-soft pt-6">
        <h3 className="label">Stack</h3>
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {project.tech.map((tech) => (
            <li
              key={tech}
              className="rounded-sm border border-rule px-2.5 py-1 font-mono text-xs text-muted"
            >
              {tech}
            </li>
          ))}
        </ul>
      </section>
      ) : null}

      {project.links && project.links.length > 0 ? (
        <div className="mt-7 flex flex-wrap gap-2.5 border-t border-rule-soft pt-6">
          {project.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-sm border border-rule px-4 py-2.5 text-[0.9rem] font-medium text-ink transition-colors hover:border-green hover:text-green"
            >
              {link.label}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          ))}
        </div>
      ) : null}

      <Link
        href={`/work/${project.id}`}
        className="mt-8 inline-flex items-center gap-1.5 border-b border-rule pb-px font-mono text-[0.7rem] uppercase tracking-[0.1em] text-muted transition-colors hover:border-green hover:text-green"
      >
        Open as a page
        <ArrowUpRight className="h-3 w-3" />
      </Link>
    </article>
  );
}
