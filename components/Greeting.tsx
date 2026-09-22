"use client";

import { useSyncExternalStore } from "react";

/**
 * "Good evening!" — the small line above the hero.
 *
 * Read from the *visitor's* clock, not Syed's, so someone opening the page in
 * London at 9am is greeted accordingly. That means it cannot be rendered on
 * the server: the HTML would carry one timezone's answer for everybody and
 * hydration would mismatch.
 *
 * `useSyncExternalStore` with a null server snapshot is how React reads a
 * client-only value without that mismatch — and without setting state in an
 * effect, which the compiler lint (rightly) rejects. Before hydration the
 * component renders nothing at all rather than an empty line, so with
 * scripting off the headline simply starts at the name.
 *
 * It does not tick. Re-rendering the hero every minute to catch a boundary
 * nobody is watching is not worth the churn.
 */
/*
 * The night string covers both ends of the same night — 22:00 through 05:00 —
 * so someone reading at 23:00 and someone reading at 02:00 get the same line
 * rather than two different ideas about what late means.
 */
function greetingFor(hour: number): string {
  if (hour < 5) return "Hello, night owl!";
  if (hour < 12) return "Good morning!";
  if (hour < 17) return "Good afternoon!";
  if (hour < 22) return "Good evening!";
  return "Hello, night owl!";
}

/* Stable across calls within a render — getSnapshot must not return fresh
   objects, but a primitive string compares fine. */
const subscribe = () => () => {};
const getSnapshot = () => greetingFor(new Date().getHours());
const getServerSnapshot = () => null;

export function Greeting({ className }: { className?: string }) {
  const greeting = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  if (!greeting) return null;

  return <p className={className}>{greeting}</p>;
}
