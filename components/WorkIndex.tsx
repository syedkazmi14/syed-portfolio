import Link from "next/link";
import type { Project } from "@/lib/types";
import { Reveal } from "@/components/Reveal";
import { ArrowUpRight } from "@/components/icons";
import { HoverTile } from "@/components/HoverTile";

/** Tech shown inline on a row before it gets noisy. */
const MAX_TECH = 6;

function techLine(tech: string[]) {
  const shown = tech.slice(0, MAX_TECH).join(" · ");
  return tech.length > MAX_TECH ? `${shown} · +${tech.length - MAX_TECH}` : shown;
}

function WorkRow({ project, index }: { project: Project; index: number }) {
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
                className="transition-colors hover:text-green"
              >
                {project.name}
                <span className="sr-only"> — read the case study</span>
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
              className="border-b border-green pb-px text-[0.9rem] font-medium text-green transition-colors hover:text-green-deep"
            >
              Case study
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
  return (
    <div className={className}>
      {projects.map((project, i) => (
        <WorkRow key={project.id} project={project} index={i} />
      ))}
      <div className="border-t border-rule" />
    </div>
  );
}
