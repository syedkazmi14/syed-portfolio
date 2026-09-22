import Link from "next/link";
import { siteConfig } from "@/data/site";
import { Reveal } from "@/components/Reveal";
import { Greeting } from "@/components/Greeting";
import { NameToggle } from "@/components/NameToggle";
import { ArrowRight } from "@/components/icons";

const { name, nameUrdu, role, links } = siteConfig;

/*
 * The type scale here is tuned to Young Serif, which sets appreciably wider
 * than the previous display face: at the old 5.2rem the two-line headline
 * wrapped to four even at 1440px. Re-measure this if the display face changes
 * again.
 */
/**
 * A nameplate rather than a sentence: greeting, name, role, one per line.
 *
 * Location and graduation date used to sit in the line above the headline.
 * They were not dropped — both still read in the About card, and the location
 * also sits in the footer colophon. The line above is now the greeting alone.
 *
 * The name line carries a fixed `min-h`, because the Urdu spelling sets taller
 * than the Latin one: without it, flipping the name would shove the role line
 * down the page. Pinning it means the toggle changes exactly one thing.
 *
 * That pin is also why the h1 margin is small. `items-center` splits the slack
 * between the 1.5em box and the ~1.08em Latin line, dropping ~14px of optical
 * space above the name — so the margin here is tuned to the gap you actually
 * see, not the gap in the markup. Re-measure it if the pin changes.
 */
export function Hero() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 pb-4 pt-36 sm:px-12 sm:pt-44">
      <Reveal>
        <Greeting className="label" />

        <h1 className="mt-3 max-w-4xl font-display text-[2.35rem] font-normal leading-[1.08] tracking-[-0.015em] sm:text-5xl lg:text-[4.1rem]">
          <span className="flex min-h-[1.5em] items-center">
            <NameToggle name={name} urdu={nameUrdu} />
          </span>
          <span className="block">{role}</span>
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
