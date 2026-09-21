import { skills } from "@/data/skills";
import { awards, certifications } from "@/data/awards";
import { Reveal } from "@/components/Reveal";

/**
 * Skills and awards, compact.
 *
 * The old site gave each of these a whole page (a "toolbox" and a "trophy
 * shelf"). Two hackathon awards now sit on the projects that won them, so what
 * remains here is the university honour plus the full stack list — enough to
 * be findable, small enough not to dominate.
 */
export function Credentials() {
  return (
    <section
      id="stack"
      className="mx-auto w-full max-w-6xl px-6 sm:px-12"
    >
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-20">
        <Reveal>
          <h2 className="label">Stack</h2>
          <dl className="mt-6 grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-2">
            {skills.map((group) => (
              <div key={group.id}>
                <dt className="font-mono text-[0.72rem] uppercase tracking-[0.1em] text-green">
                  {group.title}
                </dt>
                <dd className="mt-2 leading-relaxed text-body">
                  {group.items.join(" · ")}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={80}>
          <h2 className="label">Recognition</h2>
          <ul className="mt-6 space-y-5">
            {awards.map((award) => (
              <li key={award.id}>
                <p className="text-[0.97rem] font-semibold text-ink">
                  {award.title}
                </p>
                <p className="font-mono text-xs text-muted">{award.org}</p>
              </li>
            ))}
          </ul>

          {certifications.length > 0 ? (
            <>
              <h2 className="label mt-9">Certifications</h2>
              <ul className="mt-6 space-y-5">
                {certifications.map((cert) => (
                  <li key={cert.id}>
                    <p className="text-[0.97rem] font-semibold text-ink">
                      {cert.title}
                    </p>
                    <p className="font-mono text-xs text-muted">{cert.org}</p>
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </Reveal>
      </div>
    </section>
  );
}
