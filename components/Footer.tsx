"use client";

import { ArrowUp, Mail } from "lucide-react";
import {
  GithubIcon,
  LinkedinIcon,
  type IconComponent,
} from "@/components/icons/BrandIcons";
import { navItems, siteConfig } from "@/data/site";
import { cn, scrollToId } from "@/lib/utils";

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

export function Footer() {
  return (
    <footer className="relative border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <button
              type="button"
              onClick={() => scrollToId("#home")}
              className="flex items-center gap-2.5 outline-none"
              aria-label="Back to top"
            >
              <span className="grid h-9 w-9 place-items-center rounded-lg border border-neon/30 bg-gradient-to-br from-neon/15 to-iris/15 font-bold text-neon">
                SK
              </span>
              <span className="text-sm font-semibold text-ink">
                {siteConfig.name}
              </span>
            </button>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              {siteConfig.headline}
            </p>
          </div>

          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-x-10 gap-y-2 sm:grid-cols-3"
          >
            {navItems.map((item) => (
              <button
                key={item.href}
                type="button"
                onClick={() => scrollToId(item.href)}
                className="text-left text-sm text-muted transition-colors hover:text-ink"
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-10 flex flex-col-reverse items-start gap-6 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} {siteConfig.name}. Built with Next.js,
            TypeScript, Tailwind CSS &amp; Framer Motion.
          </p>
          <div className="flex items-center gap-2">
            {socials.map(({ label, href, Icon, external }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                {...(external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="grid h-10 w-10 place-items-center rounded-lg border border-line text-muted transition-all hover:border-neon/50 hover:text-neon"
              >
                <Icon className="h-4 w-4" aria-hidden />
              </a>
            ))}
            <button
              type="button"
              onClick={() => scrollToId("#home")}
              aria-label="Back to top"
              className={cn(
                "grid h-10 w-10 place-items-center rounded-lg border border-line text-muted transition-all hover:border-neon/50 hover:text-neon",
              )}
            >
              <ArrowUp className="h-4 w-4" aria-hidden />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
