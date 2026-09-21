"use client";

import { useEffect } from "react";

const KEY = (path: string) => `scroll:${path}`;

/**
 * Keeps your place on refresh.
 *
 * Browsers try to do this themselves, but a hash in the URL gets in the way:
 * after clicking a nav link the address is `/#work`, and a reload lands back
 * on that anchor rather than where you had scrolled to. So the position is
 * saved as the page is left and put back only when the page is reloaded, not
 * on a fresh visit or a link click. Mounted once in the root layout.
 */
export function ScrollMemory() {
  useEffect(() => {
    const path = location.pathname;
    const save = () => sessionStorage.setItem(KEY(path), String(window.scrollY));
    window.addEventListener("pagehide", save);

    const nav = performance.getEntriesByType("navigation")[0] as
      | PerformanceNavigationTiming
      | undefined;
    const saved = sessionStorage.getItem(KEY(path));

    let restore: (() => void) | undefined;
    if (nav?.type === "reload" && saved !== null) {
      const top = Number(saved);
      // "instant" overrides the smooth scroll-behavior set on <html>.
      restore = () => window.scrollTo({ top, behavior: "instant" });
      restore();
      // Images and fonts still loading can shift the page, and the browser's
      // own hash jump can land late. Put it back once everything has settled.
      if (document.readyState !== "complete") {
        window.addEventListener("load", restore, { once: true });
      }
    }

    return () => {
      window.removeEventListener("pagehide", save);
      if (restore) window.removeEventListener("load", restore);
    };
  }, []);

  return null;
}
