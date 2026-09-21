import { Reveal } from "@/components/Reveal";
import { AboutScrapbook } from "@/components/AboutScrapbook";

/**
 * About — the first section after the hero.
 *
 * There is deliberately no written list of interests. Personality comes from
 * the photographs, which the reader tapes onto a pile by clicking phrases in
 * the bio (see AboutScrapbook), and from the cat easter egg.
 */
export function About() {
  return (
    <section id="about" className="mx-auto w-full max-w-6xl px-6 sm:px-12">
      <Reveal>
        <h2 className="label">About</h2>
      </Reveal>

      <AboutScrapbook />
    </section>
  );
}
