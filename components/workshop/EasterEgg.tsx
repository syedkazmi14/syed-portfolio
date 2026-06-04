"use client";

import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { getAccent } from "@/lib/accents";
import type { Accent } from "@/lib/types";
import { cn } from "@/lib/utils";

/**
 * Wraps a decorative prop to make it a clickable easter egg that pops a tiny
 * message. Opts back into pointer events (the parallax layers are
 * pointer-events-none) and is keyboard-accessible.
 */
export function EasterEgg({
  message,
  accent = "neon",
  below = false,
  label,
  className,
  children,
}: {
  /** static message, or a function (e.g. to pick a random one) */
  message: string | (() => string);
  accent?: Accent;
  below?: boolean;
  label?: string;
  className?: string;
  children: ReactNode;
}) {
  const a = getAccent(accent);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!msg) return;
    const t = setTimeout(() => setMsg(null), 2800);
    return () => clearTimeout(t);
  }, [msg]);

  function toggle() {
    setMsg((m) => (m ? null : typeof message === "function" ? message() : message));
  }

  return (
    <div
      className={cn("pointer-events-auto relative cursor-pointer outline-none", className)}
      onClick={toggle}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggle();
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={label ?? "Workshop detail"}
    >
      {children}
      <AnimatePresence>
        {msg ? (
          <motion.div
            initial={{ opacity: 0, y: below ? -4 : 4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.16 }}
            className={cn(
              "panel pointer-events-none absolute left-1/2 z-50 w-max max-w-[15rem] -translate-x-1/2 rounded-lg border px-3 py-1.5 text-center",
              a.border,
              below ? "top-full mt-2" : "bottom-full mb-2",
            )}
          >
            <span className={cn("font-mono text-[0.72rem] font-medium", a.text)}>
              {msg}
            </span>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export const ENGINEER_QUOTES = [
  "It works on my machine. 🤷",
  "There are 2 hard things: caching, naming, and off-by-one errors.",
  "git commit -m 'final' ... final_v2 ... final_REAL",
  "Make it work, make it right, make it fast.",
  "99 little bugs in the code... 127 little bugs in the code.",
  "Premature optimization is the root of all evil.",
  "Ship it. Then ship it better.",
];
