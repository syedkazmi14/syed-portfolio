"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowDown, FileText, Mail, MousePointerClick } from "lucide-react";
import {
  GithubIcon,
  LinkedinIcon,
  type IconComponent,
} from "@/components/icons/BrandIcons";
import { siteConfig } from "@/data/site";
import { cn, scrollToId } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/Button";
import { WorkshopScene } from "@/components/WorkshopScene";

const socials: {
  label: string;
  href: string;
  Icon: IconComponent;
  external: boolean;
}[] = [
  { label: "GitHub", href: siteConfig.links.github, Icon: GithubIcon, external: true },
  {
    label: "LinkedIn",
    href: siteConfig.links.linkedin,
    Icon: LinkedinIcon,
    external: true,
  },
  { label: "Email", href: siteConfig.links.email, Icon: Mail, external: false },
];

export function Hero() {
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 18 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <div className="relative mx-auto max-w-6xl px-5 pt-28 sm:px-8 sm:pt-32">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto max-w-3xl text-center"
      >
        {/* status chip */}
        <motion.div variants={item} className="flex justify-center">
          <span className="panel inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs text-muted">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-mint" />
            </span>
            <span className="font-mono">
              SWE Intern @ IBM · Graduating Spring 2026
            </span>
          </span>
        </motion.div>

        {/* name */}
        <motion.h1
          variants={item}
          className="mt-6 text-5xl font-semibold tracking-tight sm:text-6xl md:text-7xl"
        >
          <span className="text-gradient">Syed Kazmi</span>
        </motion.h1>

        {/* headline */}
        <motion.p
          variants={item}
          className="mx-auto mt-5 max-w-2xl text-balance text-lg font-medium text-ink sm:text-xl"
        >
          Software Engineer building{" "}
          <span className="text-neon text-glow-neon">AI-powered</span>{" "}
          full-stack systems.
        </motion.p>

        {/* subheadline */}
        <motion.p
          variants={item}
          className="mx-auto mt-4 max-w-2xl text-pretty leading-relaxed text-muted"
        >
          {siteConfig.subheadline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={item}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <Button size="lg" onClick={() => scrollToId("#projects")}>
            View Projects
            <ArrowDown className="h-4 w-4" aria-hidden />
          </Button>
          <a
            href={siteConfig.links.resume}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ variant: "secondary", size: "lg" })}
          >
            Resume
            <FileText className="h-4 w-4" aria-hidden />
          </a>
          <Button
            size="lg"
            variant="outline"
            onClick={() => scrollToId("#contact")}
          >
            Contact
          </Button>
        </motion.div>

        {/* socials */}
        <motion.div
          variants={item}
          className="mt-7 flex items-center justify-center gap-2"
        >
          {socials.map(({ label, href, Icon, external }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              {...(external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="group grid h-11 w-11 place-items-center rounded-xl border border-line bg-white/[0.02] text-muted transition-all hover:border-neon/50 hover:text-neon hover:shadow-[0_0_22px_-8px_var(--color-neon)]"
            >
              <Icon className="h-5 w-5" aria-hidden />
            </a>
          ))}
        </motion.div>
      </motion.div>

      {/* interactivity hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="mt-14 flex items-center justify-center gap-2 text-center font-mono text-xs text-muted"
      >
        <MousePointerClick className="h-4 w-4 text-neon" aria-hidden />
        <span className="hidden sm:inline">
          Explore the workshop — hover or tap any object
        </span>
        <span className="sm:hidden">Tap an object to explore</span>
      </motion.p>

      {/* the interactive scene */}
      <motion.div
        initial={{ opacity: 0, y: reduce ? 0 : 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={cn("mt-6 sm:mt-8")}
      >
        <WorkshopScene />
      </motion.div>
    </div>
  );
}
