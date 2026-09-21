import Link from "next/link";
import { siteConfig, navItems } from "@/data/site";

/**
 * Site header. Plain links, no dropdowns, no mobile drawer — four destinations
 * fit on one line without one.
 *
 * Below `sm` the wordmark collapses to just the monogram: the full name plus
 * four links overflowed 320px and 360px viewports (caught by e2e/no-overflow).
 */
export function Nav() {
  return (
    <header className="mx-auto w-full max-w-6xl px-6 pt-7 sm:px-12 sm:pt-8">
      <nav
        aria-label="Main"
        className="flex items-center justify-between gap-4"
      >
        <Link
          href="/"
          className="group flex shrink-0 items-center gap-2.5"
          aria-label={`${siteConfig.name} — home`}
        >
          <span
            aria-hidden
            className="grid h-7 w-7 place-items-center rounded-full bg-green font-display text-[0.95rem] leading-none text-ground"
          >
            S
          </span>
          <span className="hidden font-mono text-xs uppercase tracking-[0.1em] text-ink sm:inline">
            {siteConfig.name}
          </span>
        </Link>

        <ul className="flex items-center gap-4 sm:gap-7">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="font-mono text-xs uppercase tracking-[0.08em] text-muted transition-colors hover:text-ink"
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <a
              href={siteConfig.links.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="border-b border-green pb-0.5 font-mono text-xs uppercase tracking-[0.08em] text-green transition-colors hover:text-green-deep"
            >
              Résumé
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
