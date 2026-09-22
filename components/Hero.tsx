import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import { Reveal } from "@/components/Reveal";
import { ArrowRight } from "@/components/icons";

const { name, location, education, links } = siteConfig;

/*
 * The type scale here is tuned to Young Serif, which sets appreciably wider
 * than the previous display face: at the old 5.2rem the two-line headline
 * wrapped to four even at 1440px. Re-measure this if the display face changes
 * again.
 */
/**
 * Deliberately short. The hero states who he is and what he does; everything
 * else — the IBM detail, the backend/cloud/agents positioning — lives in the
 * About section directly below it.
 */
export function Hero() {
  return (
    <section className="relative mx-auto w-full max-w-6xl px-6 pb-4 pt-36 sm:px-12 sm:pt-44">
      {/*
        Syed's drawn astronaut cat. Portrait (0.817), unlike the square mark it
        replaced, so it is sized by height and left to find its own width.
        Desktop only — there is no room beside the headline below lg.
      */}
      <Image
        src="/logo/astronaut-cat.webp"
        alt=""
        width={868}
        height={1062}
        priority
        className="pointer-events-none absolute right-6 top-28 hidden h-44 w-auto sm:right-12 lg:block"
      />

      <Reveal>
        <p className="label">
          {location} &nbsp;·&nbsp; Graduating {education.graduating}
        </p>

        <h1 className="mt-7 max-w-4xl font-display text-[2.35rem] font-normal leading-[1.08] tracking-[-0.015em] sm:text-5xl lg:text-[4.1rem]">
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
