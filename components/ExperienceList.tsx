import { experience } from "@/data/experience";
import { Reveal } from "@/components/Reveal";
import { HoverTile } from "@/components/HoverTile";

/**
 * All roles in one reverse-chronological list.
 *
 * Each row reveals a photo on hover, the same as the work rows — but only once
 * an `image` exists on the role in data/experience.ts. None do yet, so these
 * currently render flat. Drop a logo or a photo in public/experience/, run
 * `npm run optimize:images`, and set `image` to turn the effect on.
 */
export function ExperienceList() {
  return (
    <div>
      {experience.map((item, i) => (
        <Reveal
          as="article"
          key={item.id}
          delay={i * 50}
          className="border-t border-rule-soft"
        >
          <HoverTile image={item.image}>
            <div className="grid grid-cols-1 gap-x-8 gap-y-1.5 px-4 py-5 sm:grid-cols-[10.5rem_minmax(0,1fr)]">
              <p className="font-mono text-[0.78rem] leading-6 text-muted">
                {item.period}
              </p>
              <div>
                <h3 className="text-[1.02rem] font-semibold leading-6 text-ink">
                  {item.role}
                  <span className="font-normal text-muted">, {item.company}</span>
                </h3>
              </div>
            </div>
          </HoverTile>
        </Reveal>
      ))}
      <div className="border-t border-rule-soft" />
    </div>
  );
}
