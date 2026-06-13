"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, FileText, Mail } from "lucide-react";
import { getAccent } from "@/lib/accents";
import type { Accent } from "@/lib/types";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";
import { GithubIcon, LinkedinIcon } from "@/components/icons/BrandIcons";
import { CatMascot } from "@/components/CatMascot";
import { AmbientBackground } from "@/components/effects/AmbientBackground";

interface PageShellProps {
  accent: Accent;
  /** Mono kicker, e.g. "// the main monitor". */
  eyebrow: string;
  title: string;
  description?: string;
  children: ReactNode;
}

/**
 * Themed shell for a workshop "destination" page: accent-tinted background,
 * a sticky Back-to-Workshop bar, an entrance animation, and an accent flash
 * that bridges the zoom transition coming from the hub.
 */
export function PageShell({
  accent,
  eyebrow,
  title,
  description,
  children,
}: PageShellProps) {
  const a = getAccent(accent);
  const reduce = useReducedMotion();

  return (
    <div className="relative min-h-dvh">
      <AmbientBackground />
      {/* per-page accent wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-0 h-[36rem] opacity-[0.12] blur-[120px]"
        style={{ background: a.hex }}
      />

      {/* sticky top bar */}
      <div className="sticky top-0 z-40 border-b border-line/60 bg-base/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
          <Link
            href="/"
            className={cn(
              "group inline-flex items-center gap-2 rounded-lg border border-line bg-white/[0.02] px-3.5 py-2 text-sm text-ink transition-all",
              a.borderHover,
            )}
          >
            <ArrowLeft
              className={cn(
                "h-4 w-4 transition-transform group-hover:-translate-x-0.5",
                a.text,
              )}
              aria-hidden
            />
            <span>
              <span className="hidden sm:inline">Back to&nbsp;</span>Workshop
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <a
              href={siteConfig.links.resume}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Resume (PDF)"
              className={cn(
                "inline-flex h-9 w-9 items-center justify-center rounded-lg border border-line text-muted transition-all hover:text-ink",
                "sm:w-auto sm:gap-2 sm:px-3 sm:text-sm sm:text-ink",
                a.borderHover,
              )}
            >
              <FileText className="h-4 w-4" aria-hidden />
              <span className="hidden sm:inline">Resume</span>
            </a>
            <Link
              href="/"
              aria-label="Back to workshop"
              className="flex items-center gap-2.5"
            >
              <span className="hidden font-mono text-xs text-muted md:block">
                {siteConfig.name}
              </span>
              <CatMascot className="h-9 w-9" />
            </Link>
          </div>
        </div>
      </div>

      {/* content */}
      <motion.main
        initial={{ opacity: 0, y: reduce ? 0 : 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16"
      >
        <header>
          <p className={cn("font-mono text-xs tracking-[0.2em]", a.text)}>
            {eyebrow}
          </p>
          <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight text-ink sm:text-5xl md:text-6xl">
            {title}
          </h1>
          {description ? (
            <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-muted">
              {description}
            </p>
          ) : null}
        </header>

        <div className="mt-12">{children}</div>
      </motion.main>

      {/* slim footer */}
      <footer className="relative z-10 border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-4 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} {siteConfig.name}. Built with Next.js,
            TypeScript, Tailwind &amp; Framer Motion.
          </p>
          <div className="flex items-center gap-2">
            <a
              href={siteConfig.links.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 items-center gap-2 rounded-lg border border-line px-3 text-xs text-muted transition-all hover:border-neon/50 hover:text-neon"
            >
              <FileText className="h-4 w-4" aria-hidden />
              Resume
            </a>
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="grid h-9 w-9 place-items-center rounded-lg border border-line text-muted transition-all hover:border-neon/50 hover:text-neon"
            >
              <GithubIcon className="h-4 w-4" aria-hidden />
            </a>
            <a
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="grid h-9 w-9 place-items-center rounded-lg border border-line text-muted transition-all hover:border-neon/50 hover:text-neon"
            >
              <LinkedinIcon className="h-4 w-4" aria-hidden />
            </a>
            <a
              href={siteConfig.links.email}
              aria-label="Email"
              className="grid h-9 w-9 place-items-center rounded-lg border border-line text-muted transition-all hover:border-neon/50 hover:text-neon"
            >
              <Mail className="h-4 w-4" aria-hidden />
            </a>
          </div>
        </div>
      </footer>

      {/* accent flash to bridge the zoom from the hub */}
      {reduce ? null : (
        <motion.div
          aria-hidden
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{
            position: "fixed",
            inset: 0,
            background: `radial-gradient(circle at 50% 45%, ${a.hex}, #06070d 70%)`,
          }}
          className="pointer-events-none z-[120]"
        />
      )}
    </div>
  );
}

/** Secondary section heading used within a PageShell. */
export function Subhead({
  title,
  description,
  accent = "neon",
}: {
  title: string;
  description?: string;
  accent?: Accent;
}) {
  const a = getAccent(accent);
  return (
    <div>
      <div className="flex items-center gap-3">
        <span className={cn("h-px w-8", a.bgSolid, "opacity-70")} />
        <h2 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          {title}
        </h2>
      </div>
      {description ? (
        <p className="mt-2 max-w-2xl leading-relaxed text-muted">{description}</p>
      ) : null}
    </div>
  );
}
