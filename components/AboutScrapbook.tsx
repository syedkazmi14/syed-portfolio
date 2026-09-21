"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import { siteConfig } from "@/data/site";
import { Reveal } from "@/components/Reveal";

const { bio, portrait, aboutPhotos, education, location } = siteConfig;

type Photo = (typeof aboutPhotos)[number];

/**
 * Hand-placed tilt and offset for each photo, so the pile looks stuck down by
 * hand rather than generated. Index matches `aboutPhotos`. Kept small: the
 * photos underneath should peek out, not fan out.
 */
const PLACEMENT = [
  { rotate: 2, x: 14, y: -10 },
  { rotate: -2.4, x: -14, y: 12 },
  { rotate: 1.4, x: 10, y: 16 },
];
const PORTRAIT_TILT = -1.2;

/**
 * About — bio on the left, a scrapbook pile of taped photos on the right
 * (above the text on mobile).
 *
 * Phrases in the bio that match an `aboutPhotos` entry become buttons. Each
 * click tapes that photo on top of the pile; clicking one already on the pile
 * brings it back to the top. The portrait stays at the bottom. Photos appear
 * instantly — no drop animation, the motion budget is spent elsewhere.
 */
export function AboutScrapbook() {
  // Indexes into aboutPhotos, bottom to top.
  const [stack, setStack] = useState<number[]>([]);

  const add = (i: number) =>
    setStack((s) => [...s.filter((j) => j !== i), i]);

  const top = stack.length ? aboutPhotos[stack[stack.length - 1]] : null;

  return (
    <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-20">
      <Reveal>
        <div className="max-w-xl space-y-5">
          {bio.map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className="text-lg leading-relaxed">
              {withPhotoButtons(paragraph, add)}
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

      {/* Pile leads (centred) on mobile, sits right of the text from lg up. */}
      <Reveal delay={80} className="order-first lg:order-none">
        <figure className="mx-auto w-full max-w-[16rem] lg:mx-0">
          <div className="relative aspect-square">
            <Taped rotate={PORTRAIT_TILT} x={0} y={0} tape="corners">
              <Image
                src={portrait.src}
                alt={portrait.alt}
                fill
                sizes="16rem"
                className="object-cover"
              />
            </Taped>

            {stack.map((i) => (
              <Taped key={i} {...PLACEMENT[i % PLACEMENT.length]} tape="top">
                <PhotoFace photo={aboutPhotos[i]} />
              </Taped>
            ))}
          </div>

          <figcaption
            aria-live="polite"
            className="mt-6 text-center font-mono text-[0.68rem] uppercase tracking-[0.1em] text-faint lg:text-left"
          >
            {top ? top.caption : portrait.caption}
          </figcaption>
        </figure>
      </Reveal>
    </div>
  );
}

/** Turns each `aboutPhotos` phrase inside a paragraph into a button. */
function withPhotoButtons(text: string, add: (i: number) => void): ReactNode[] {
  const out: ReactNode[] = [];
  let rest = text;

  while (rest) {
    // Earliest phrase left in the remaining text.
    let hit: { at: number; i: number } | null = null;
    aboutPhotos.forEach((photo, i) => {
      const at = rest.indexOf(photo.phrase);
      if (at !== -1 && (!hit || at < hit.at)) hit = { at, i };
    });
    if (!hit) break;

    const { at, i } = hit;
    const phrase = aboutPhotos[i].phrase;
    if (at) out.push(rest.slice(0, at));
    out.push(
      <button
        key={i}
        type="button"
        onClick={() => add(i)}
        data-cursor-label="Add photo"
        className="cursor-pointer text-green underline decoration-rule decoration-1 underline-offset-[5px] transition-colors hover:text-green-deep hover:decoration-green"
      >
        {phrase}
        <span className="sr-only"> (show photo)</span>
      </button>,
    );
    rest = rest.slice(at + phrase.length);
  }

  if (rest) out.push(rest);
  return out;
}

/** A photo stuck to the page with a strip or two of masking tape. */
function Taped({
  rotate,
  x,
  y,
  tape,
  children,
}: {
  rotate: number;
  x: number;
  y: number;
  tape: "corners" | "top";
  children: ReactNode;
}) {
  return (
    <div
      className="absolute inset-0"
      style={{ transform: `translate(${x}px, ${y}px) rotate(${rotate}deg)` }}
    >
      <div className="relative h-full w-full overflow-hidden bg-rule-soft">
        {children}
      </div>
      {tape === "corners" ? (
        <>
          <Tape className="-left-5 top-2 -rotate-[38deg]" />
          <Tape className="-right-5 bottom-2 -rotate-[38deg]" />
        </>
      ) : (
        <Tape className="-top-2.5 left-1/2 -ml-10 rotate-[-4deg]" />
      )}
    </div>
  );
}

/**
 * Masking tape: translucent, with torn ends. The clip-path zigzags each end;
 * no shadow, the translucency alone lifts it off the photo.
 */
function Tape({ className }: { className: string }) {
  return (
    <span
      aria-hidden
      className={`absolute h-6 w-20 bg-rule/70 ${className}`}
      style={{
        clipPath:
          "polygon(0 0, 100% 0, 97% 20%, 100% 40%, 96% 60%, 100% 80%, 97% 100%, 0 100%, 3% 80%, 0 60%, 4% 40%, 0 20%)",
      }}
    />
  );
}

/** The photo itself, or a labelled card while no real photo exists yet. */
function PhotoFace({ photo }: { photo: Photo }) {
  if (!photo.src) {
    return (
      <div
        role="img"
        aria-label={photo.alt}
        className="flex h-full w-full flex-col items-center justify-center gap-2 border border-rule bg-green-wash p-6 text-center"
      >
        <span className="label text-green">Photo placeholder</span>
        <span className="font-mono text-[0.7rem] text-muted">{photo.phrase}</span>
      </div>
    );
  }
  return (
    <Image
      src={photo.src}
      alt={photo.alt}
      fill
      sizes="16rem"
      className="object-cover"
    />
  );
}
