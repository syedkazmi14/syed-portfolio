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
 * Fades + lifts its children the first time they come into view.
 *
 * Every Reveal is server-rendered with `data-reveal="load"`, which (behind
 * `[data-js]`, see globals.css) plays a CSS keyframe fade-up from the very
 * first paint. That covers whatever is on screen when the page opens, with no
 * flash of visible content before hydration. A keyframe always runs to the
 * end on its own, so it can never leave anything hidden.
 *
 * On mount, anything still below the fold is switched to "pending" (hidden,
 * off screen so nobody sees the switch) and fades in via a transition when it
 * scrolls into view. So:
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

    // Motion is off: the CSS doesn't apply either, nothing to do.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // On screen at mount: the load keyframe is already playing it in.
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    el.dataset.reveal = "pending";

    const show = () => {
      el.style.transitionDelay = delay ? `${delay}ms` : "";
      el.dataset.reveal = "shown";
    };

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

    return () => observer.disconnect();
  }, [delay]);

  return (
    <Tag
      ref={ref}
      className={className}
      data-reveal="load"
      style={delay ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
