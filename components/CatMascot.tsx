"use client";

import { useEffect, useId, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CatMascotProps {
  className?: string;
  /** Run a periodic idle blink (for prominent placements like the hub). */
  idle?: boolean;
  label?: string;
}

/**
 * The mascot — a cute round-faced cat with big sparkly green eyes and a neon
 * cyan/purple rim. Hover for a head tilt, ear twitch, blink, and glow.
 * Self-contained (also mirrored as the favicon, see app/icon.svg).
 */
export function CatMascot({
  className,
  idle = false,
  label = "Syed Kazmi — cat mascot",
}: CatMascotProps) {
  const reduce = useReducedMotion();
  const uid = useId().replace(/:/g, "");
  const id = (n: string) => `${n}-${uid}`;
  const [hovered, setHovered] = useState(false);
  const [blink, setBlink] = useState(false);

  // idle blink loop
  useEffect(() => {
    if (!idle || reduce) return;
    let timer: ReturnType<typeof setTimeout>;
    const loop = () => {
      setBlink(true);
      setTimeout(() => setBlink(false), 150);
      timer = setTimeout(loop, 3200 + Math.random() * 2800);
    };
    timer = setTimeout(loop, 2200);
    return () => clearTimeout(timer);
  }, [idle, reduce]);

  function onEnter() {
    if (reduce) return;
    setHovered(true);
    setBlink(true);
    setTimeout(() => setBlink(false), 150);
  }

  return (
    <motion.span
      className={cn("relative inline-grid place-items-center", className)}
      onMouseEnter={onEnter}
      onMouseLeave={() => setHovered(false)}
    >
      <svg
        viewBox="5 3 54 54"
        className="h-full w-full overflow-visible"
        role="img"
        aria-label={label}
      >
        <defs>
          <linearGradient id={id("fur")} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#313c52" />
            <stop offset="1" stopColor="#10151f" />
          </linearGradient>
          <linearGradient id={id("rim")} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#3ee0ff" />
            <stop offset="1" stopColor="#ad93ff" />
          </linearGradient>
          <linearGradient id={id("inner")} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffd2e7" />
            <stop offset="1" stopColor="#ff8fc4" />
          </linearGradient>
          <radialGradient id={id("eye")} cx="0.5" cy="0.38" r="0.72">
            <stop offset="0" stopColor="#e6fff2" />
            <stop offset="0.45" stopColor="#4ef0a6" />
            <stop offset="1" stopColor="#16a86b" />
          </radialGradient>
          <radialGradient id={id("glow")} cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#3ee0ff" stopOpacity="0.7" />
            <stop offset="0.55" stopColor="#45e6a6" stopOpacity="0.22" />
            <stop offset="1" stopColor="#7c5cff" stopOpacity="0" />
          </radialGradient>
          <filter id={id("eyeGlow")} x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="1" />
          </filter>
        </defs>

        {/* glow behind head */}
        <motion.ellipse
          cx="32"
          cy="36"
          rx="19"
          ry="16"
          fill={`url(#${id("glow")})`}
          className="anim-pulse-glow"
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
          animate={{ scale: hovered ? 1.14 : 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 18 }}
        />

        {/* head + features (tilts on hover) */}
        <motion.g
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
          animate={{ rotate: hovered ? -6 : 0 }}
          transition={{ type: "spring", stiffness: 180, damping: 12 }}
        >
          {/* right ear (static) */}
          <path d="M44.5 21.5 Q49 12 48.5 9 Q41.5 11 35 18.5 Z" fill={`url(#${id("fur")})`} stroke={`url(#${id("rim")})`} strokeWidth="1.1" strokeLinejoin="round" />
          <path d="M43.5 20.4 Q46.4 14.2 46.2 11.4 Q41.8 13 37.4 18 Z" fill={`url(#${id("inner")})`} fillOpacity="0.65" />

          {/* left ear (twitches) */}
          <motion.g
            style={{ transformBox: "fill-box", transformOrigin: "70% 100%" }}
            animate={{ rotate: hovered ? -9 : 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 8 }}
          >
            <path d="M19.5 21.5 Q15 12 15.5 9 Q22.5 11 29 18.5 Z" fill={`url(#${id("fur")})`} stroke={`url(#${id("rim")})`} strokeWidth="1.1" strokeLinejoin="round" />
            <path d="M20.5 20.4 Q17.6 14.2 17.8 11.4 Q22.2 13 26.6 18 Z" fill={`url(#${id("inner")})`} fillOpacity="0.65" />
          </motion.g>

          {/* round, chubby head */}
          <path
            d="M32 17.5 C40.5 17.5 48.5 22.5 48.5 32 C48.5 38 46.5 44 41.5 48 C38.5 50.5 35.5 51.5 32 51.5 C28.5 51.5 25.5 50.5 22.5 48 C17.5 44 15.5 38 15.5 32 C15.5 22.5 23.5 17.5 32 17.5 Z"
            fill={`url(#${id("fur")})`}
            stroke={`url(#${id("rim")})`}
            strokeWidth="1.1"
          />

          {/* blush cheeks */}
          <ellipse cx="21.8" cy="41.5" rx="2.9" ry="1.7" fill="#ff8fc4" opacity="0.32" />
          <ellipse cx="42.2" cy="41.5" rx="2.9" ry="1.7" fill="#ff8fc4" opacity="0.32" />

          {/* whiskers */}
          <g stroke="#ffffff" strokeOpacity="0.16" strokeWidth="0.8" strokeLinecap="round">
            <line x1="10.5" y1="40" x2="19" y2="40.8" />
            <line x1="11" y1="43.5" x2="19" y2="42.6" />
            <line x1="53.5" y1="40" x2="45" y2="40.8" />
            <line x1="53" y1="43.5" x2="45" y2="42.6" />
          </g>

          {/* eyes (blink) — big, round, sparkly green */}
          <motion.g
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
            animate={{ scaleY: blink ? 0.1 : 1 }}
            transition={{ duration: 0.09, ease: "easeOut" }}
          >
            {/* soft green underglow */}
            <g filter={`url(#${id("eyeGlow")})`} fill="#45e6a6">
              <circle cx="25.3" cy="36" r="4.7" />
              <circle cx="38.7" cy="36" r="4.7" />
            </g>
            {/* eyeballs */}
            <circle cx="25.3" cy="36" r="4.3" fill={`url(#${id("eye")})`} />
            <circle cx="38.7" cy="36" r="4.3" fill={`url(#${id("eye")})`} />
            {/* big round pupils */}
            <circle cx="25.3" cy="36.3" r="2.6" fill="#07140e" />
            <circle cx="38.7" cy="36.3" r="2.6" fill="#07140e" />
            {/* sparkle highlights */}
            <circle cx="23.9" cy="34.5" r="1.2" fill="#ffffff" />
            <circle cx="37.3" cy="34.5" r="1.2" fill="#ffffff" />
            <circle cx="26.7" cy="37.4" r="0.6" fill="#ffffff" fillOpacity="0.9" />
            <circle cx="40.1" cy="37.4" r="0.6" fill="#ffffff" fillOpacity="0.9" />
          </motion.g>

          {/* tiny nose */}
          <path d="M30.2 41.4 Q32 40.7 33.8 41.4 Q32.7 43.2 32 43.6 Q31.3 43.2 30.2 41.4 Z" fill="#ff8fc4" />
          {/* cute :3 mouth */}
          <path
            d="M32 43.6 V44.2 M32 44.2 Q30.4 45.8 28.9 44.8 M32 44.2 Q33.6 45.8 35.1 44.8"
            fill="none"
            stroke="#ffffff"
            strokeOpacity="0.32"
            strokeWidth="0.9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.g>
      </svg>
    </motion.span>
  );
}
