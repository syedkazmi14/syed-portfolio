"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FileText, Mail } from "lucide-react";
import { getAccent } from "@/lib/accents";
import { siteConfig } from "@/data/site";
import { workshopObjects } from "@/data/workshop";
import type { WorkshopObjectDef } from "@/lib/types";
import { buttonVariants } from "@/components/ui/Button";
import { GithubIcon, LinkedinIcon } from "@/components/icons/BrandIcons";
import { AmbientBackground } from "@/components/effects/AmbientBackground";
import { Particles } from "@/components/effects/Particles";
import { PortalCardGrid, WorkshopRoom } from "@/components/WorkshopScene";
import { CatMascot } from "@/components/CatMascot";
import { NeonSign } from "@/components/NeonSign";

interface ZoomState {
  rect: DOMRect;
  vw: number;
  vh: number;
  hex: string;
  target: string;
  label: string;
}

function hexToRgba(hex: string, alpha: number) {
  const n = hex.replace("#", "");
  const r = parseInt(n.slice(0, 2), 16);
  const g = parseInt(n.slice(2, 4), 16);
  const b = parseInt(n.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function WorkshopHub() {
  const router = useRouter();
  const reduce = useReducedMotion();
  const [zoom, setZoom] = useState<ZoomState | null>(null);

  useEffect(() => {
    workshopObjects.forEach((o) => router.prefetch(o.target));
    router.prefetch("/cats");
  }, [router]);

  function handleSelect(def: WorkshopObjectDef, rect: DOMRect) {
    if (reduce) {
      router.push(def.target);
      return;
    }
    if (zoom) return;
    setZoom({
      rect,
      vw: window.innerWidth,
      vh: window.innerHeight,
      hex: getAccent(def.accent).hex,
      target: def.target,
      label: def.label,
    });
  }

  function handleSelectCat(rect: DOMRect) {
    if (reduce) {
      router.push("/cats");
      return;
    }
    if (zoom) return;
    setZoom({
      rect,
      vw: window.innerWidth,
      vh: window.innerHeight,
      hex: getAccent("iris").hex,
      target: "/cats",
      label: "Cat Archive",
    });
  }

  return (
    <motion.section
      initial={{ opacity: 0, scale: reduce ? 1 : 1.03 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative min-h-dvh w-full overflow-hidden md:h-dvh"
    >
      <AmbientBackground intense />
      <Particles count={18} />

      <motion.div
        animate={{ opacity: zoom ? 0 : 1, scale: zoom ? 1.05 : 1 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 min-h-dvh md:h-dvh"
      >
        {/* desktop immersive room fills the viewport */}
        <div className="absolute inset-0 hidden md:block">
          <WorkshopRoom onSelect={handleSelect} onSelectCat={handleSelectCat} />
        </div>

        {/* overlaid identity bar */}
        <header className="absolute inset-x-0 top-0 z-30 flex items-center justify-between gap-4 px-5 py-4 sm:px-8 sm:py-5">
          <div className="flex items-center gap-3">
            <CatMascot className="h-11 w-11" idle />
            <div className="leading-tight">
              <p className="text-sm font-semibold tracking-tight text-ink">
                {siteConfig.name}
              </p>
              <p className="font-mono text-[0.7rem] text-muted">
                {siteConfig.role} · {siteConfig.location}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="grid h-10 w-10 place-items-center rounded-lg border border-line bg-base/40 text-muted backdrop-blur-sm transition-all hover:border-neon/50 hover:text-neon"
            >
              <GithubIcon className="h-4 w-4" aria-hidden />
            </a>
            <a
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="grid h-10 w-10 place-items-center rounded-lg border border-line bg-base/40 text-muted backdrop-blur-sm transition-all hover:border-neon/50 hover:text-neon"
            >
              <LinkedinIcon className="h-4 w-4" aria-hidden />
            </a>
            <a
              href={siteConfig.links.email}
              aria-label="Email"
              className="hidden h-10 w-10 place-items-center rounded-lg border border-line bg-base/40 text-muted backdrop-blur-sm transition-all hover:border-neon/50 hover:text-neon sm:grid"
            >
              <Mail className="h-4 w-4" aria-hidden />
            </a>
            <a
              href={siteConfig.links.resume}
              target="_blank"
              rel="noopener noreferrer"
              className={`${buttonVariants({ variant: "secondary", size: "sm" })} backdrop-blur-sm`}
            >
              <FileText className="h-4 w-4" aria-hidden />
              Resume
            </a>
          </div>
        </header>

        {/* desktop welcome caption */}
        <p className="absolute inset-x-0 bottom-4 z-30 hidden items-center justify-center gap-2 px-6 text-center font-mono text-xs text-muted/90 md:flex">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-neon anim-pulse-glow" />
          Welcome to my garage — select a station to learn more about me.
        </p>

        {/* mobile: sign + cards */}
        <div className="relative z-10 px-5 pb-12 pt-24 md:hidden">
          <NeonSign />
          <p className="mb-6 mt-3 flex items-center justify-center gap-2 text-center font-mono text-xs text-muted">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-neon anim-pulse-glow" />
            Welcome to my garage — tap a station to explore.
          </p>
          <PortalCardGrid onSelect={handleSelect} onSelectCat={handleSelectCat} />
        </div>
      </motion.div>

      {/* zoom-into-object transition */}
      <AnimatePresence>
        {zoom ? (
          <motion.div
            key="zoom"
            aria-hidden
            initial={{
              top: zoom.rect.top,
              left: zoom.rect.left,
              width: zoom.rect.width,
              height: zoom.rect.height,
              borderRadius: 20,
              opacity: 0.45,
            }}
            animate={{
              top: 0,
              left: 0,
              width: zoom.vw,
              height: zoom.vh,
              borderRadius: 0,
              opacity: 1,
            }}
            transition={{ duration: 0.55, ease: [0.7, 0, 0.2, 1] }}
            onAnimationComplete={() => router.push(zoom.target)}
            style={{
              position: "fixed",
              background: `radial-gradient(circle at 50% 45%, ${hexToRgba(
                zoom.hex,
                0.9,
              )}, ${hexToRgba(zoom.hex, 0.16)} 55%, #06070d 100%)`,
            }}
            className="z-[200] grid place-items-center"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.18 }}
              className="font-mono text-sm font-medium text-[#04070e]"
            >
              {zoom.label} →
            </motion.span>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.section>
  );
}
