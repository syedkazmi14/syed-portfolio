"use client";

import { useState } from "react";
import Link from "next/link";
import { interests } from "@/data/interests";
import type { Interest } from "@/lib/types";
import { Reveal } from "@/components/Reveal";
import { HoverTile } from "@/components/HoverTile";
import { PhotoCarousel } from "@/components/PhotoCarousel";
import { Drawer } from "@/components/Drawer";
import { ArrowUpRight } from "@/components/icons";

/**
 * Four interest tiles, each opening its detail in the same side drawer the
 * projects and experience rows use.
 *
 * These are plain buttons rather than links: unlike projects there are no
 * /interests routes to fall back to, so there is nothing to preserve for
 * cmd-click or crawlers.
 */
export function Interests() {
  const [active, setActive] = useState<Interest | null>(null);

  return (
    <section id="interests" className="mx-auto w-full max-w-6xl px-6 sm:px-12">
      <Reveal>
        <h2 className="label">Interests</h2>
      </Reveal>

      <div className="mt-6 grid grid-cols-1 gap-x-10 sm:grid-cols-2 lg:grid-cols-4">
        {interests.map((interest, i) => (
          <Reveal
            as="article"
            key={interest.id}
            delay={(i % 4) * 60}
            className="border-t border-rule"
          >
            <HoverTile image={interest.images?.[0]} intensity={0.2}>
              <button
                type="button"
                onClick={() => setActive(interest)}
                data-cursor-label="Read more"
                aria-label={`${interest.title} — read more`}
                className="flex h-full w-full flex-col px-3 py-6 text-left"
              >
                <h3 className="font-display text-[1.6rem] leading-tight text-ink">
                  {interest.title}
                </h3>
                <p className="mt-1.5 text-[0.95rem] leading-relaxed text-body">
                  {interest.blurb}
                </p>
                <span className="mt-4 border-b border-green pb-px font-mono text-[0.7rem] uppercase tracking-[0.1em] text-green">
                  Read more
                </span>
              </button>
            </HoverTile>
          </Reveal>
        ))}
      </div>
      {/*
        No closing rule here, deliberately. Interests is the last section on
        the homepage and the footer opens with its own `border-t` — two
        identical hairlines 113px apart with nothing between them read as a
        mistake. The footer's rule is the one that has to stay: on
        /work/[slug] it separates the contact block from a "Next project" nav.
        WorkIndex keeps its closing rule because a section follows it, not the
        footer.
      */}

      <Drawer
        open={!!active}
        onClose={() => setActive(null)}
        eyebrow="Interest"
        title={active?.title ?? ""}
      >
        {active ? <InterestDetail interest={active} /> : null}
      </Drawer>
    </section>
  );
}

function InterestDetail({ interest }: { interest: Interest }) {
  return (
    <article>
      <h2 className="font-display text-4xl leading-tight">{interest.title}</h2>
      <p className="mt-2 text-lg leading-relaxed text-body">{interest.blurb}</p>

      {interest.images?.length ? (
        <PhotoCarousel
          className="mt-7"
          images={interest.images}
          alt={interest.imageAlt ?? interest.title}
          aspect="aspect-[4/3]"
        />
      ) : null}

      <div className="mt-7 space-y-4">
        {/* Index keys: this array is static, never reordered or filtered, and
            two paragraphs can easily share an opening phrase. */}
        {interest.body.map((paragraph, i) => (
          <p key={i} className="leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>

      {interest.link ? (
        <Link
          href={interest.link.href}
          className="mt-8 inline-flex items-center gap-1.5 border-b border-rule pb-px font-mono text-[0.7rem] uppercase tracking-[0.1em] text-muted transition-colors hover:border-green hover:text-green"
        >
          {interest.link.label}
          <ArrowUpRight className="h-3 w-3" />
        </Link>
      ) : null}
    </article>
  );
}
