"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MousePointerClick } from "lucide-react";
import { getAccent } from "@/lib/accents";
import { getProject } from "@/data/projects";
import type { Project } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ProjectVisual } from "@/components/ProjectVisual";
import { MonitorArt } from "@/components/workshop/MonitorArt";

/** Projects shown in the workstation slideshow, in order. */
const SLIDE_IDS = [
  "blue-relief",
  "guardiangram",
  "telekinetics",
  "trashtrends",
  "witchwatch",
  "ecodrive",
];

const slides = SLIDE_IDS.map(getProject).filter(Boolean) as Project[];
const INTERVAL = 7000;

/** The live screen content (slideshow). Pauses + zooms when `active`. */
function MonitorScreen({ active }: { active: boolean }) {
  const [i, setI] = useState(0);
  const [loading, setLoading] = useState(false);
  const p = slides[i];
  const a = getAccent(p.accent);

  useEffect(() => {
    if (active) return; // paused on hover
    const t = setTimeout(() => {
      setLoading(true);
      setI((v) => (v + 1) % slides.length);
      setTimeout(() => setLoading(false), 650);
    }, INTERVAL);
    return () => clearTimeout(t);
  }, [i, active]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#05080e]">
      {/* app chrome */}
      <div className="absolute inset-x-0 top-0 z-20 flex h-[14%] items-center gap-[3%] bg-[#0a0f1aee] px-[3%]">
        <span className="flex gap-[3px]">
          <span className="h-1 w-1 rounded-full bg-[#ff6b6b]" />
          <span className="h-1 w-1 rounded-full bg-[#ffd166]" />
          <span className="h-1 w-1 rounded-full bg-mint" />
        </span>
        <span className="truncate text-[0.5rem] font-medium text-ink/90">
          {p.name}
        </span>
        <span className="ml-auto flex items-center gap-1 text-[0.45rem] text-muted">
          <span className="h-1 w-1 rounded-full bg-mint anim-blink" />
          live
        </span>
      </div>

      {/* slides */}
      <AnimatePresence>
        <motion.div
          key={p.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 top-[14%]"
        >
          <motion.div
            animate={{ scale: active ? 1.06 : 1 }}
            transition={{ duration: 0.4 }}
            className="h-full w-full"
          >
            <ProjectVisual
              kind={p.visual}
              accent={p.accent}
              image={p.image}
              alt={p.name}
              sizes="30vw"
            />
          </motion.div>
          {/* caption */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-[3%] pb-[2%] pt-[8%]">
            <p className={cn("text-[0.55rem] font-semibold", a.text)}>{p.name}</p>
            <p className="truncate text-[0.45rem] text-muted">{p.tagline}</p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* refresh flash + loading bar on slide change */}
      {loading ? (
        <>
          <motion.div
            className="absolute inset-0 top-[14%] z-20 bg-white"
            initial={{ opacity: 0.18 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          />
          <motion.div
            className={cn("absolute left-0 top-[14%] z-30 h-[2px]", a.bgSolid)}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.6 }}
          />
        </>
      ) : null}

      {/* moving scanline */}
      <div className="anim-scan pointer-events-none absolute inset-x-0 top-[14%] z-10 h-[20%] bg-white/[0.04]" />

      {/* hover overlay */}
      <AnimatePresence>
        {active ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-30 grid place-items-center bg-black/55 px-2 text-center backdrop-blur-[1px]"
          >
            <span className="flex items-center gap-1.5 text-[0.6rem] font-semibold text-white">
              <MousePointerClick className="h-3 w-3 text-neon" aria-hidden />
              Click to open Projects &amp; Experience
            </span>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

/** Monitor frame (SVG) with the live slideshow overlaid on its screen. */
export function MonitorStation({
  active,
  wallMounted = false,
}: {
  active: boolean;
  /** Mobile-only: hide the stand and show a wall-mount bracket instead. */
  wallMounted?: boolean;
}) {
  // The screen area in SVG coords: x=26 y=20 w=268 h=150, viewBox width=320.
  // desktop viewBox 0 0 320 250 → top=20/250=8%  height=150/250=60%
  // wall-mount viewBox 0 0 320 198 → top=20/198≈10.1% height=150/198≈75.76%
  const overlayTop = wallMounted ? "10.1%" : "8%";
  const overlayHeight = wallMounted ? "75.76%" : "60%";

  return (
    <div className="relative w-full">
      <MonitorArt active={active} wallMounted={wallMounted} />
      <div
        className="absolute overflow-hidden rounded-[4px]"
        style={{
          left: "8.125%",
          top: overlayTop,
          width: "83.75%",
          height: overlayHeight,
        }}
      >
        <MonitorScreen active={active} />
      </div>
    </div>
  );
}
