"use client";

import { useEffect, useLayoutEffect, useState } from "react";

// useLayoutEffect runs before the browser paints (so a media-driven swap is
// never visible), but warns during SSR — fall back to useEffect on the server,
// where layout effects are a no-op anyway.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Subscribe to a CSS media query. Returns `false` on the server and on the very
 * first client render (keeping hydration stable and mobile-first), then settles
 * to the real value before the first paint and on every subsequent change.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useIsomorphicLayoutEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}
