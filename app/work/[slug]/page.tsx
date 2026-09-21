import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, getProject } from "@/data/projects";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { ArrowUpRight } from "@/components/icons";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.id }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: project.name,
    description: `${project.tagline} — ${project.problem}`,
    alternates: { canonical: `/work/${project.id}` },
    openGraph: {
      title: project.name,
      description: project.tagline,
      images: project.image ? [{ url: project.image }] : undefined,
    },
  };
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.id === project.id);
  const next = projects[(index + 1) % projects.length];

  return (
    <>
      <Nav />
      <main className="mx-auto w-full max-w-4xl px-6 pt-32 sm:px-12 sm:pt-40">
        <Reveal>
          <Link
            href="/work"
            className="font-mono text-xs uppercase tracking-[0.08em] text-muted transition-colors hover:text-ink"
          >
            ← All projects
          </Link>

          {project.badge ? (
            <p className="mt-10 font-mono text-[0.7rem] uppercase tracking-[0.1em] text-green">
              {project.badge}
            </p>
          ) : null}

          <h1 className="mt-3 font-display text-[2.75rem] leading-[1.06] tracking-[-0.015em] sm:text-6xl">
            {project.name}
          </h1>
          <p className="mt-4 max-w-2xl text-xl leading-relaxed text-body">
            {project.tagline}
          </p>
        </Reveal>

        {project.image ? (
          <Reveal delay={60}>
            <figure className="mt-12">
              <div className="relative aspect-[16/9] overflow-hidden border border-rule bg-rule-soft">
                <Image
                  src={project.image}
                  alt={`${project.name} — screenshot`}
                  fill
                  sizes="(max-width: 896px) 100vw, 896px"
                  className="object-cover"
                  priority
                />
              </div>
            </figure>
          </Reveal>
        ) : null}

        <Reveal delay={80}>
          <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2">
            <div>
              <h2 className="label">The problem</h2>
              <p className="mt-3 leading-relaxed">{project.problem}</p>
            </div>
            <div>
              <h2 className="label">What I built</h2>
              <p className="mt-3 leading-relaxed">{project.solution}</p>
            </div>
          </div>

          <div className="mt-12 border-t border-rule pt-8">
            <h2 className="label">How it works</h2>
            <p className="mt-3 max-w-2xl text-lg leading-relaxed">
              {project.description}
            </p>
          </div>

          <div className="mt-12 border-t border-rule pt-8">
            <h2 className="label">Stack</h2>
            <ul className="mt-4 flex flex-wrap gap-x-2 gap-y-2">
              {project.tech.map((tech) => (
                <li
                  key={tech}
                  className="rounded-sm border border-rule px-2.5 py-1 font-mono text-xs text-muted"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>

          {project.links && project.links.length > 0 ? (
            <div className="mt-12 flex flex-wrap gap-3 border-t border-rule pt-8">
              {project.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-sm border border-rule px-5 py-3 text-[0.95rem] font-medium text-ink transition-colors hover:border-green hover:text-green"
                >
                  {link.label}
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              ))}
            </div>
          ) : null}
        </Reveal>

        <nav
          aria-label="More projects"
          className="mt-20 flex items-baseline justify-between gap-6 border-t border-rule pt-8"
        >
          <span className="label">Next</span>
          <Link
            href={`/work/${next.id}`}
            className="text-right font-display text-3xl leading-tight transition-colors hover:text-green sm:text-4xl"
          >
            {next.name} →
          </Link>
        </nav>
      </main>
      <Footer />
    </>
  );
}
