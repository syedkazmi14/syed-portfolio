import { experience } from "@/data/experience";
import { Reveal } from "@/components/Reveal";

/**
 * All roles in one reverse-chronological list.
 *
 * The old site split these across /projects and /hardware by `type`. They are
 * one list now — the hardware and IT roles show range rather than forming a
 * separate pillar.
 */
export function ExperienceList() {
  return (
    <div>
      {experience.map((item, i) => (
        <Reveal
          as="article"
          key={item.id}
          delay={i * 50}
          className="grid grid-cols-1 gap-x-8 gap-y-1.5 border-t border-rule-soft py-5 sm:grid-cols-[10.5rem_minmax(0,1fr)]"
        >
          <p className="font-mono text-[0.78rem] leading-6 text-muted">
            {item.period}
          </p>
          <div>
            <h3 className="text-[1.02rem] font-semibold leading-6 text-ink">
              {item.role}
              <span className="font-normal text-muted">, {item.company}</span>
            </h3>
          </div>
        </Reveal>
      ))}
      <div className="border-t border-rule-soft" />
    </div>
  );
}
