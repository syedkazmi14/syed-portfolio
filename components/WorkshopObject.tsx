"use client";

import { useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { getAccent } from "@/lib/accents";
import type { WorkshopObjectDef } from "@/lib/types";
import { cn, scrollToId } from "@/lib/utils";

interface WorkshopObjectProps {
  def: WorkshopObjectDef;
  /** Render the artwork; receives hover/focus state to intensify glow. */
  art: (active: boolean) => ReactNode;
}

/**
 * Positioned, clickable + keyboard-focusable hotspot in the workshop scene.
 * Highlights and shows a tooltip on hover/focus, and scrolls to its section.
 */
export function WorkshopObject({ def, art }: WorkshopObjectProps) {
  const [active, setActive] = useState(false);
  const reduce = useReducedMotion();
  const a = getAccent(def.accent);
  const tooltipBelow = def.area.top < 22;
  const hover = reduce ? undefined : { scale: 1.045, y: -4 };

  return (
    <motion.button
      type="button"
      onClick={() => scrollToId(def.target)}
      onHoverStart={() => setActive(true)}
      onHoverEnd={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
      aria-label={`${def.label}: ${def.caption}. Jump to section.`}
      className="absolute cursor-pointer rounded-xl outline-none"
      style={{
        left: `${def.area.left}%`,
        top: `${def.area.top}%`,
        width: `${def.area.width}%`,
      }}
      whileHover={hover}
      whileFocus={hover}
      whileTap={{ scale: 0.99 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
    >
      {/* accent halo */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute -inset-2 -z-10 rounded-[36%] blur-2xl transition-opacity duration-300",
          a.bgSolid,
        )}
        style={{ opacity: active ? 0.22 : 0 }}
      />

      {art(active)}

      {/* hover/focus tooltip */}
      <AnimatePresence>
        {active ? (
          <motion.div
            initial={{ opacity: 0, y: tooltipBelow ? -6 : 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: tooltipBelow ? -6 : 6, scale: 0.96 }}
            transition={{ duration: 0.16 }}
            className={cn(
              "pointer-events-none absolute left-1/2 z-30 w-max max-w-[14rem] -translate-x-1/2",
              tooltipBelow ? "top-full mt-3" : "bottom-full mb-3",
            )}
          >
            <div
              className={cn(
                "panel flex items-center gap-2 rounded-lg border px-3 py-2",
                a.border,
              )}
            >
              <span className={cn("h-1.5 w-1.5 shrink-0 rounded-full", a.bgSolid)} />
              <span className="text-xs font-semibold text-ink">{def.label}</span>
              <span className="text-[0.7rem] text-muted">· {def.caption}</span>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.button>
  );
}
