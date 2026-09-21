"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { siteConfig, navItems } from "@/data/site";

/**
 * Fixed site header with a scroll-progress hairline along its bottom edge.
 *
 * The bar is driven by a scaleX transform rather than a width change so it
 * stays on the compositor. Both the progress and the on-scroll bottom border
 * are written straight to the DOM in a rAF callback — no React state, so
 * scrolling never triggers a re-render.
 *
 * Below `sm` the wordmark collapses to its monogram: the full name plus four
 * links overflowed 320/360px viewports (caught by e2e/no-overflow).
 */
export function Nav() {
  const headerRef = useRef<HTMLElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    const fill = fillRef.current;
    if (!header || !fill) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const scrolled = window.scrollY;
      const max =
        document.documentElement.scrollHeight - window.innerHeight;

      const progress = max > 0 ? Math.min(scrolled / max, 1) : 0;
      fill.style.transform = `scaleX(${progress})`;

      // Hairline appears only once the page has moved, so the header sits
      // flush with the hero on load.
      header.dataset.scrolled = scrolled > 8 ? "true" : "false";
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      data-scrolled="false"
      className="fixed inset-x-0 top-0 z-50 bg-ground/95 backdrop-blur-[2px] transition-colors data-[scrolled=true]:border-b data-[scrolled=true]:border-rule"
    >
      <div className="mx-auto w-full max-w-6xl px-6 py-4 sm:px-12 sm:py-5">
        <nav aria-label="Main" className="flex items-center justify-between gap-4">
          <Link
            href="/"
            className="group flex shrink-0 items-center gap-2.5"
            aria-label={`${siteConfig.name} — home`}
          >
            <span
              aria-hidden
              className="grid h-7 w-7 place-items-center rounded-full bg-green font-display text-[0.95rem] leading-none text-ground"
            >
              S
            </span>
            <span className="hidden font-mono text-xs uppercase tracking-[0.1em] text-ink sm:inline">
              {siteConfig.name}
            </span>
          </Link>

          <ul className="flex items-center gap-4 sm:gap-7">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="font-mono text-xs uppercase tracking-[0.08em] text-muted transition-colors hover:text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={siteConfig.links.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="border-b border-green pb-0.5 font-mono text-xs uppercase tracking-[0.08em] text-green transition-colors hover:text-green-deep"
              >
                Résumé
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* scroll progress */}
      <div
        aria-hidden
        className="absolute inset-x-0 -bottom-px h-0.5 overflow-hidden bg-green/10"
      >
        {/*
          The initial scaleX(0) is an inline style, not Tailwind's `scale-x-0`.
          In Tailwind v4 that utility sets the CSS `scale` property rather than
          `transform`, so it would multiply against the `transform` this
          component writes each frame and pin the bar at zero width.
        */}
        <span
          ref={fillRef}
          style={{ transform: "scaleX(0)" }}
          className="block h-full w-full origin-left bg-green transition-transform duration-150 ease-out"
        />
      </div>
    </header>
  );
}
