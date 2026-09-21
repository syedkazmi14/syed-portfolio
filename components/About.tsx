import Image from "next/image";
import { siteConfig } from "@/data/site";
import { Reveal } from "@/components/Reveal";

const { bio, portrait, education, location } = siteConfig;

/**
 * About — the first section after the hero.
 *
 * There is deliberately no written list of interests. Personality comes from
 * the photographs and their captions, and from the cat easter egg.
 */
export function About() {
  return (
    <section id="about" className="mx-auto w-full max-w-6xl px-6 sm:px-12">
      <Reveal>
        <h2 className="label">About</h2>
      </Reveal>

      <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-20">
        <Reveal>
          <div className="max-w-xl space-y-5">
            {bio.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="text-lg leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          <dl className="mt-9 grid max-w-xl grid-cols-1 gap-x-8 gap-y-4 border-t border-rule-soft pt-6 sm:grid-cols-2">
            <div>
              <dt className="label">Education</dt>
              <dd className="mt-1.5 text-[0.97rem] text-ink">
                {education.degree}
                <span className="block text-muted">
                  {education.school} · {education.graduating}
                </span>
              </dd>
            </div>
            <div>
              <dt className="label">Based in</dt>
              <dd className="mt-1.5 text-[0.97rem] text-ink">{location}</dd>
            </div>
          </dl>

        </Reveal>

        <Reveal delay={80}>
          <figure className="max-w-[17rem]">
            {/* Polaroid: even white border, deeper strip at the bottom. */}
            <div className="bg-white p-3 pb-0 shadow-[0_1px_2px_rgba(20,32,26,0.10),0_8px_24px_-12px_rgba(20,32,26,0.28)]">
              <div className="relative aspect-square overflow-hidden bg-rule-soft">
                <Image
                  src={portrait.src}
                  alt={portrait.alt}
                  fill
                  sizes="17rem"
                  className="object-cover"
                />
              </div>
              <figcaption className="px-0.5 py-3.5 font-mono text-[0.68rem] uppercase tracking-[0.1em] text-faint">
                {portrait.caption}
              </figcaption>
            </div>
          </figure>

        </Reveal>
      </div>
    </section>
  );
}
