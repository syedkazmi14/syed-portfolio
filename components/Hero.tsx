import Link from "next/link";
import { siteConfig } from "@/data/site";
import { Reveal } from "@/components/Reveal";
import { ArrowRight } from "@/components/icons";
import { Saturn } from "@/components/marginalia";

const { name, location, education, links } = siteConfig;

/**
 * Deliberately short. The hero states who he is and what he does; everything
 * else — the IBM detail, the backend/cloud/agents positioning — lives in the
 * About section directly below it.
 */
export function Hero() {
  return (
    <section className="relative mx-auto w-full max-w-6xl px-6 pb-4 pt-36 sm:px-12 sm:pt-44">
      <Saturn className="pointer-events-none absolute right-6 top-40 hidden h-28 w-28 text-green/70 sm:right-12 lg:block" />

      <Reveal>
        <p className="label">
          {location} &nbsp;·&nbsp; Graduating {education.graduating}
        </p>

        <h1 className="mt-7 max-w-3xl font-display text-[2.9rem] font-normal leading-[1.06] tracking-[-0.015em] sm:text-6xl lg:text-[5.2rem]">
          Hi, I&rsquo;m <span className="text-green">{name}</span>,
          <br />a software developer.
        </h1>

        <div className="mt-11 flex flex-wrap items-center gap-3">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2.5 rounded-sm bg-green px-6 py-3.5 text-[0.95rem] font-medium text-ground transition-colors hover:bg-green-deep"
          >
            See projects
            <ArrowRight className="h-[0.95rem] w-[0.95rem]" />
          </Link>
          <a
            href={links.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-sm border border-rule px-6 py-3.5 text-[0.95rem] font-medium text-ink transition-colors hover:border-green hover:text-green"
          >
            Résumé
          </a>
        </div>
      </Reveal>
    </section>
  );
}
