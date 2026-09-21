"use client";

import { useState } from "react";
import { experience } from "@/data/experience";
import type { ExperienceItem } from "@/lib/types";
import { Reveal } from "@/components/Reveal";
import { HoverTile } from "@/components/HoverTile";
import { Drawer } from "@/components/Drawer";

/**
 * All roles in one reverse-chronological list. A row opens its detail in the
 * side drawer rather than navigating — there are no /experience routes, so
 * unlike the project rows these are plain buttons.
 *
 * Rows reveal a photo on hover once an `image` is set on the role in
 * data/experience.ts. None have one yet, so they currently render flat.
 */
export function ExperienceList() {
  const [active, setActive] = useState<ExperienceItem | null>(null);

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
            <button
              type="button"
              onClick={() => setActive(item)}
              data-cursor-label="View details"
              aria-label={`${item.role} at ${item.company} — details`}
              className="grid w-full grid-cols-1 gap-x-8 gap-y-1.5 px-4 py-5 text-left transition-colors sm:grid-cols-[10.5rem_minmax(0,1fr)]"
            >
              <p className="font-mono text-[0.78rem] leading-6 text-muted">
                {item.period}
              </p>
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-[1.02rem] font-semibold leading-6 text-ink">
                  {item.role}
                  <span className="font-normal text-muted">, {item.company}</span>
                </h3>
                <span
                  aria-hidden
                  className="shrink-0 font-mono text-[0.68rem] uppercase tracking-[0.1em] text-faint"
                >
                  Details
                </span>
              </div>
            </button>
          </HoverTile>
        </Reveal>
      ))}
      <div className="border-t border-rule-soft" />

      <Drawer
        open={!!active}
        onClose={() => setActive(null)}
        eyebrow={active?.period}
        title={active ? `${active.role}, ${active.company}` : ""}
      >
        {active ? <ExperienceDetail item={active} /> : null}
      </Drawer>
    </div>
  );
}

function ExperienceDetail({ item }: { item: ExperienceItem }) {
  return (
    <article>
      <h2 className="font-display text-4xl leading-tight">{item.company}</h2>
      <p className="mt-2 text-lg leading-relaxed text-body">{item.role}</p>
      <p className="mt-1 font-mono text-xs text-muted">{item.period}</p>

      <p className="mt-7 leading-relaxed">{item.description}</p>

      {item.highlights && item.highlights.length > 0 ? (
        <section className="mt-7 border-t border-rule-soft pt-6">
          <h3 className="label">Highlights</h3>
          <ul className="mt-3 space-y-2.5">
            {item.highlights.map((highlight) => (
              <li key={highlight} className="flex gap-2.5 leading-relaxed">
                <span aria-hidden className="mt-2.5 h-px w-3 shrink-0 bg-green" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="mt-7 border-t border-rule-soft pt-6">
        <h3 className="label">Stack</h3>
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {item.tech.map((tech) => (
            <li
              key={tech}
              className="rounded-sm border border-rule px-2.5 py-1 font-mono text-xs text-muted"
            >
              {tech}
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
