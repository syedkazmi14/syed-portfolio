"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger delay in ms. */
  delay?: number;
  /** Element to render. Defaults to a div. */
  as?: ElementType;
}

/**
 * Fades + lifts its children the first time they scroll into view.
 *
 * The hidden state lives in CSS behind `[data-js]` (see globals.css), which an
 * inline script in the root layout sets before first paint. So:
 *
 *   - no JS at all          -> content renders normally, never hidden
 *   - JS on, reduced motion -> content renders normally, never hidden
 *   - JS on, motion allowed -> fades up once, then the observer disconnects
 *
 * This is the only scroll animation on the site.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Motion is off: leave the element in its default visible state.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    el.dataset.reveal = "pending";

    const show = () => {
      el.style.transitionDelay = delay ? `${delay}ms` : "";
      el.dataset.reveal = "shown";
    };

    // Already on screen at mount (above the fold): show on the next frame so
    // the transition still runs rather than snapping.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          show();
          observer.disconnect();
        }
      },
      { rootMargin: "-60px 0px" },
    );

    observer.observe(el);

    // Safety net: if the observer somehow never fires (a background tab that
    // is closed before it is ever viewed, an exotic browser), reveal anyway.
    const fallback = window.setTimeout(show, 2500);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, [delay]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
