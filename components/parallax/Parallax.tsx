"use client";

import {
  createContext,
  useContext,
  useRef,
  type CSSProperties,
  type ReactNode,
} from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { cn } from "@/lib/utils";

/** Max pixel travel for a layer at depth = 1. Layers use depth 0.01–0.3. */
const RANGE = 190;

interface ParallaxCtx {
  mx: MotionValue<number>;
  my: MotionValue<number>;
  enabled: boolean;
}

const Ctx = createContext<ParallaxCtx | null>(null);

/**
 * Pointer-driven parallax stage. Tracks the cursor relative to its center and
 * exposes smoothed motion values; nested <ParallaxLayer>s translate by their
 * depth to create a "looking into a room" effect. No-op for reduced motion.
 */
export function ParallaxStage({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const mxRaw = useMotionValue(0);
  const myRaw = useMotionValue(0);
  const spring = { stiffness: 55, damping: 18, mass: 0.5 };
  const mx = useSpring(mxRaw, spring);
  const my = useSpring(myRaw, spring);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduce) return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mxRaw.set((e.clientX - r.left) / r.width - 0.5);
    myRaw.set((e.clientY - r.top) / r.height - 0.5);
  }
  function reset() {
    mxRaw.set(0);
    myRaw.set(0);
  }

  return (
    <Ctx.Provider value={{ mx, my, enabled: !reduce }}>
      <div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        className={cn("relative", className)}
      >
        {children}
      </div>
    </Ctx.Provider>
  );
}

/**
 * A depth layer. `depth` ~0.02 (far wall) → ~0.28 (foreground). Negative-signed
 * so nearer layers slide opposite the cursor, like a real diorama.
 */
export function ParallaxLayer({
  depth = 0.1,
  children,
  className,
  style,
}: {
  depth?: number;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  const ctx = useContext(Ctx);
  const mx = ctx?.mx;
  const my = ctx?.my;
  // hooks must run unconditionally; fall back to a static value
  const zero = useMotionValue(0);
  const x = useTransform(mx ?? zero, (v) => -v * depth * RANGE);
  const y = useTransform(my ?? zero, (v) => -v * depth * RANGE);

  return (
    <motion.div
      className={cn("absolute inset-0", className)}
      style={ctx?.enabled ? { x, y, ...style } : style}
    >
      {children}
    </motion.div>
  );
}
