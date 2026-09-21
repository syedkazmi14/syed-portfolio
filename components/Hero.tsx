import Link from "next/link";
import { siteConfig } from "@/data/site";
import { Reveal } from "@/components/Reveal";
import { ArrowRight } from "@/components/icons";
import { Saturn } from "@/components/marginalia";

const { headline, intro, location, education, links } = siteConfig;

export function Hero() {
  return (
    <section className="relative mx-auto w-full max-w-6xl px-6 pt-24 sm:px-12 sm:pt-32">
      {/* Margin drawing — placeholder until Syed's own artwork lands. */}
      <Saturn className="pointer-events-none absolute right-6 top-28 hidden h-28 w-28 text-green/70 sm:right-12 sm:top-36 lg:block" />

      <Reveal>
        <p className="label">
          {location} &nbsp;·&nbsp; Graduating {education.graduating}
        </p>

        <h1 className="mt-7 max-w-4xl font-display text-[2.75rem] font-normal leading-[1.06] tracking-[-0.015em] sm:text-6xl lg:text-[4.9rem]">
          {headline.lead}
          <br />
          <span className="text-green">{headline.accent}</span>
          <br />
          {headline.trail}
        </h1>

        <p className="mt-8 max-w-xl text-lg leading-relaxed text-body sm:text-xl">
          {intro}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Link
            href="/work"
            className="inline-flex items-center gap-2.5 rounded-sm bg-green px-6 py-3.5 text-[0.95rem] font-medium text-ground transition-colors hover:bg-green-deep"
          >
            See selected work
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
