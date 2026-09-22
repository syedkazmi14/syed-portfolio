"use client";

import { useEffect, useRef } from "react";

/**
 * A small label that rides alongside the cursor over anything carrying a
 * `data-cursor-label` attribute — "View project" on a project tile, "View
 * details" on an experience row.
 *
 * Mounted once in the root layout. Position and text are written straight to
 * the DOM inside a rAF, so moving the mouse never triggers a React render.
 *
 * Only runs for fine pointers, and not at all under reduced motion: it is an
 * affordance on top of links and buttons that already say what they do, never
 * the only thing communicating it.
 */
export function CursorLabel() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const fine = window.matchMedia("(pointer: fine)");
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || calm.matches) return;

    let frame = 0;
    let x = 0;
    let y = 0;
    let label: string | null = null;

    const paint = () => {
      frame = 0;
      el.style.transform = `translate3d(${x + 18}px, ${y + 18}px, 0)`;
      el.style.opacity = label ? "1" : "0";
    };

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;

      const target = e.target as Element | null;
      const host = target?.closest?.("[data-cursor-label]") ?? null;
      const next = host?.getAttribute("data-cursor-label") ?? null;

      if (next !== label) {
        label = next;
        if (next) el.textContent = next;
      }

      if (!frame) frame = requestAnimationFrame(paint);
    };

    const onLeave = () => {
      label = null;
      if (!frame) frame = requestAnimationFrame(paint);
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("blur", onLeave);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="cursor-label pointer-events-none fixed left-0 top-0 z-[200] whitespace-nowrap rounded-sm bg-ink px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-[0.1em] text-ground opacity-0 transition-opacity duration-150"
      style={{ transform: "translate3d(-300px, -300px, 0)" }}
    />
  );
}
