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
 * "Smart hacker cat" mascot — a dark cat head on an app-icon tile with neon
 * cyan/purple accents. Hover for a head tilt, ear twitch, blink, and glow.
 * Self-contained (also used to generate the favicon, see app/icon.svg).
 */
export function CatMascot({
  className,
  idle = false,
  label = "Syed Kazmi — hacker cat mascot",
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
            <stop offset="0" stopColor="#2b3447" />
            <stop offset="1" stopColor="#10151f" />
          </linearGradient>
          <linearGradient id={id("rim")} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#3ee0ff" />
            <stop offset="1" stopColor="#ad93ff" />
          </linearGradient>
          <linearGradient id={id("ear")} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#3ee0ff" />
            <stop offset="1" stopColor="#ad93ff" />
          </linearGradient>
          <radialGradient id={id("eye")} cx="0.5" cy="0.4" r="0.7">
            <stop offset="0" stopColor="#d6f9ff" />
            <stop offset="0.5" stopColor="#3ee0ff" />
            <stop offset="1" stopColor="#1aa6d8" />
          </radialGradient>
          <radialGradient id={id("glow")} cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#3ee0ff" stopOpacity="0.75" />
            <stop offset="0.6" stopColor="#7c5cff" stopOpacity="0.25" />
            <stop offset="1" stopColor="#3ee0ff" stopOpacity="0" />
          </radialGradient>
          <filter id={id("eyeGlow")} x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="1.1" />
          </filter>
        </defs>

        {/* glow behind head */}
        <motion.ellipse
          cx="32"
          cy="35"
          rx="19"
          ry="15"
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
          <path d="M48 25 L51 8 L35 18 Z" fill={`url(#${id("fur")})`} stroke={`url(#${id("rim")})`} strokeWidth="1" strokeLinejoin="round" />
          <path d="M46 22 L48 12 L39 18 Z" fill={`url(#${id("ear")})`} fillOpacity="0.5" />

          {/* left ear (twitches) */}
          <motion.g
            style={{ transformBox: "fill-box", transformOrigin: "70% 100%" }}
            animate={{ rotate: hovered ? -9 : 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 8 }}
          >
            <path d="M16 25 L13 8 L29 18 Z" fill={`url(#${id("fur")})`} stroke={`url(#${id("rim")})`} strokeWidth="1" strokeLinejoin="round" />
            <path d="M18 22 L16 12 L25 18 Z" fill={`url(#${id("ear")})`} fillOpacity="0.5" />
            {/* hacker LED on ear tip */}
            <circle cx="13" cy="8" r="1.6" fill="#3ee0ff" className="anim-blink" />
          </motion.g>

          {/* head */}
          <path
            d="M16 31 C16 22 22 17 32 17 C42 17 48 22 48 31 C48 35 48 39 45.5 43 C42.5 50 38 53.5 32 53.5 C26 53.5 21.5 50 18.5 43 C16 39 16 35 16 31 Z"
            fill={`url(#${id("fur")})`}
            stroke={`url(#${id("rim")})`}
            strokeWidth="1.1"
          />

          {/* whiskers */}
          <g stroke="#ffffff" strokeOpacity="0.16" strokeWidth="0.8" strokeLinecap="round">
            <line x1="11" y1="39" x2="20" y2="39.5" />
            <line x1="11.5" y1="42.5" x2="20" y2="41.5" />
            <line x1="53" y1="39" x2="44" y2="39.5" />
            <line x1="52.5" y1="42.5" x2="44" y2="41.5" />
          </g>

          {/* eyes (blink) */}
          <motion.g
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
            animate={{ scaleY: blink ? 0.12 : 1 }}
            transition={{ duration: 0.09, ease: "easeOut" }}
          >
            {/* glow */}
            <g filter={`url(#${id("eyeGlow")})`}>
              <path d="M21.5 35 C23 31.6 27 31.4 30 33.2 C28.2 35.8 23.5 36.2 21.5 35 Z" fill="#3ee0ff" />
              <path d="M42.5 35 C41 31.6 37 31.4 34 33.2 C35.8 35.8 40.5 36.2 42.5 35 Z" fill="#3ee0ff" />
            </g>
            {/* sharp eyes */}
            <path d="M21.5 35 C23 31.6 27 31.4 30 33.2 C28.2 35.8 23.5 36.2 21.5 35 Z" fill={`url(#${id("eye")})`} />
            <path d="M42.5 35 C41 31.6 37 31.4 34 33.2 C35.8 35.8 40.5 36.2 42.5 35 Z" fill={`url(#${id("eye")})`} />
            {/* slit pupils */}
            <ellipse cx="26" cy="33.7" rx="0.85" ry="2" fill="#06121a" />
            <ellipse cx="38" cy="33.7" rx="0.85" ry="2" fill="#06121a" />
            {/* highlights */}
            <circle cx="24.8" cy="32.8" r="0.7" fill="#ffffff" fillOpacity="0.95" />
            <circle cx="36.8" cy="32.8" r="0.7" fill="#ffffff" fillOpacity="0.95" />
          </motion.g>

          {/* nose */}
          <path d="M32 41.6 L30.4 39.7 Q32 38.9 33.6 39.7 Z" fill="#ad93ff" />
          {/* smug mouth */}
          <path
            d="M32 41.6 V43 M32 43 Q29.6 45 27.6 43.4 M32 43 Q34.4 45 36.4 43.4"
            fill="none"
            stroke="#ffffff"
            strokeOpacity="0.28"
            strokeWidth="0.9"
            strokeLinecap="round"
          />
        </motion.g>
      </svg>
    </motion.span>
  );
}
