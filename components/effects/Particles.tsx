"use client";

import { useReducedMotion } from "framer-motion";
import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

/**
 * Deterministic pseudo-random generator (LCG). Using a fixed seed keeps the
 * SSR and client markup identical, so there's no hydration mismatch and no
 * need for an effect — while still looking scattered.
 */
function seeded(seed: number) {
  let s = (seed + 1) >>> 0;
  return () => {
    s = (Math.imul(s, 1103515245) + 12345) & 0x7fffffff;
    return s / 0x7fffffff;
  };
}

function buildParticles(count: number) {
  const rand = seeded(count * 31 + 7);
  return Array.from({ length: count }, () => ({
    left: rand() * 100,
    top: rand() * 100,
    size: 1 + rand() * 2.4,
    delay: rand() * 9,
    duration: 9 + rand() * 11,
    opacity: 0.2 + rand() * 0.45,
  }));
}

/** Floating "dust" particles. Disabled under prefers-reduced-motion. */
export function Particles({
  count = 24,
  className,
}: {
  count?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return null;

  const particles = buildParticles(count);

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      {particles.map((p, i) => (
        <span
          key={i}
          className="absolute rounded-full"
          style={
            {
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: p.size,
              height: p.size,
              background:
                "radial-gradient(circle, rgba(190,214,255,0.95), rgba(190,214,255,0))",
              animation: `floaty ${p.duration}s linear ${p.delay}s infinite`,
              "--p-op": p.opacity,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
