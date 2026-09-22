"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/**
 * A fixed-size photo frame you can page through.
 *
 * Occupies exactly the space one photo did — arrows sit *over* the image
 * rather than beside it, and the frame never changes height, so adding photos
 * to a project costs no extra room in the drawer.
 *
 * Only the active image is mounted, so a project with eight photos still
 * fetches one. Paging is a crossfade rather than a slide: the site's motion
 * budget is small, and a slide would need every frame in the DOM.
 *
 * Works with the arrows, arrow keys, and a swipe. With a single photo it
 * renders as a plain figure with no controls at all.
 */
export function PhotoCarousel({
  images,
  alt,
  aspect = "aspect-[16/9]",
  sizes = "30rem",
  className = "",
}: {
  images: string[];
  alt: string;
  /** Tailwind aspect class — keep it the same as the single photo it replaces. */
  aspect?: string;
  sizes?: string;
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const frameRef = useRef<HTMLDivElement>(null);
  const startX = useRef<number | null>(null);

  const count = images.length;
  const go = (n: number) => setIndex((i) => (i + n + count) % count);

  /*
   * Reset to the first photo when the drawer swaps to a different subject.
   * Adjusted during render rather than in an effect — an effect here would
   * render the new subject's photos at the old index for a frame first, and
   * cascade a second render to correct it.
   */
  const [seen, setSeen] = useState(images);
  if (seen !== images) {
    setSeen(images);
    setIndex(0);
  }

  useEffect(() => {
    const el = frameRef.current;
    if (!el || count < 2) return;

    // Scoped to the focused frame so arrow keys still scroll the page.
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + count) % count);
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % count);
    };
    el.addEventListener("keydown", onKey);
    return () => el.removeEventListener("keydown", onKey);
  }, [count]);

  if (count === 0) return null;

  const onPointerDown = (e: React.PointerEvent) => {
    startX.current = e.clientX;
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (startX.current === null || count < 2) return;
    const dx = e.clientX - startX.current;
    startX.current = null;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
  };

  return (
    <figure className={className}>
      <div
        ref={frameRef}
        tabIndex={count > 1 ? 0 : -1}
        aria-roledescription={count > 1 ? "carousel" : undefined}
        aria-label={count > 1 ? `${alt} — ${count} photos` : undefined}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        className={`group relative ${aspect} overflow-hidden border border-rule bg-rule-soft`}
      >
        <Image
          key={images[index]}
          src={images[index]}
          alt={count > 1 ? `${alt} — photo ${index + 1} of ${count}` : alt}
          fill
          sizes={sizes}
          className="animate-[fadeIn_240ms_ease-out] object-cover"
        />

        {count > 1 ? (
          <>
            <Arrow side="left" onClick={() => go(-1)} />
            <Arrow side="right" onClick={() => go(1)} />

            <p className="absolute bottom-2 right-2 rounded-sm bg-ink/70 px-1.5 py-0.5 font-mono text-[0.6rem] text-ground">
              {index + 1}/{count}
            </p>
          </>
        ) : null}
      </div>
    </figure>
  );
}

function Arrow({
  side,
  onClick,
}: {
  side: "left" | "right";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={side === "left" ? "Previous photo" : "Next photo"}
      className={`absolute top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-rule bg-ground/85 text-ink opacity-0 transition-opacity hover:bg-ground focus-visible:opacity-100 group-hover:opacity-100 ${
        side === "left" ? "left-2" : "right-2"
      }`}
    >
      <svg
        viewBox="0 0 16 16"
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d={side === "left" ? "M10 3L5 8l5 5" : "M6 3l5 5-5 5"} />
      </svg>
    </button>
  );
}
