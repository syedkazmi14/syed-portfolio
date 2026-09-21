"use client";

import { useState, type MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/types";
import { Reveal } from "@/components/Reveal";
import { ArrowUpRight } from "@/components/icons";
import { HoverTile } from "@/components/HoverTile";
import { Drawer } from "@/components/Drawer";

/** Tech shown inline on a row before it gets noisy. */
const MAX_TECH = 6;

function techLine(tech: string[]) {
  const shown = tech.slice(0, MAX_TECH).join(" · ");
  return tech.length > MAX_TECH ? `${shown} · +${tech.length - MAX_TECH}` : shown;
}

/**
 * True when a click should be left alone: a modified click or a middle click
 * is the reader asking for a new tab, and we should not hijack it.
 */
function isPlainClick(e: MouseEvent) {
  return !(e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0);
}

function WorkRow({
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
   * opens the drawer: it keeps the eight project pages crawlable and linked,
   * and lets cmd-click / middle-click open them in a new tab as expected.
   */
  const handle = (e: MouseEvent) => {
    if (!isPlainClick(e)) return;
    e.preventDefault();
    onOpen(project);
  };

  return (
    <Reveal as="article" delay={index * 60} className="border-t border-rule">
      <HoverTile image={project.image} intensity={0.18}>
        <div className="grid grid-cols-1 gap-x-8 gap-y-4 px-4 py-8 sm:grid-cols-[3.5rem_minmax(0,1fr)] lg:grid-cols-[3.5rem_minmax(0,1fr)_13rem]">
          <span className="font-mono text-[0.8rem] text-faint lg:pt-2.5">
            {String(index + 1).padStart(2, "0")}
          </span>

          <div>
            {project.badge ? (
              <p className="mb-1.5 font-mono text-[0.7rem] uppercase tracking-[0.1em] text-green">
                {project.badge}
              </p>
            ) : null}

            <h3 className="font-display text-3xl leading-tight sm:text-[2.35rem]">
              <Link
                href={`/work/${project.id}`}
                onClick={handle}
                className="transition-colors hover:text-green"
              >
                {project.name}
              </Link>
            </h3>

            <p className="mt-2 max-w-xl leading-relaxed text-body">
              {project.tagline}. {project.problem}
            </p>

            <p className="mt-3.5 font-mono text-xs leading-relaxed text-muted">
              {techLine(project.tech)}
            </p>
          </div>

          <div className="flex flex-wrap items-start gap-x-5 gap-y-2 lg:flex-col lg:pt-2">
            <Link
              href={`/work/${project.id}`}
              onClick={handle}
              className="border-b border-green pb-px text-[0.9rem] font-medium text-green transition-colors hover:text-green-deep"
            >
              Details
            </Link>

            {project.links?.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[0.9rem] text-muted transition-colors hover:text-ink"
              >
                {link.label}
                <ArrowUpRight className="h-3.5 w-3.5" />
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
      {projects.map((project, i) => (
        <WorkRow key={project.id} project={project} index={i} onOpen={setActive} />
      ))}
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
      <p className="mt-2 text-lg leading-relaxed text-body">{project.tagline}</p>

      {project.image ? (
        <div className="relative mt-7 aspect-[16/9] overflow-hidden border border-rule bg-rule-soft">
          <Image
            src={project.image}
            alt={`${project.name} — screenshot`}
            fill
            sizes="30rem"
            className="object-cover"
          />
        </div>
      ) : null}

      <section className="mt-8">
        <h3 className="label">The problem</h3>
        <p className="mt-2.5 leading-relaxed">{project.problem}</p>
      </section>

      <section className="mt-6">
        <h3 className="label">What I built</h3>
        <p className="mt-2.5 leading-relaxed">{project.solution}</p>
      </section>

      <section className="mt-6 border-t border-rule-soft pt-6">
        <h3 className="label">How it works</h3>
        <p className="mt-2.5 leading-relaxed">{project.description}</p>
      </section>

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
