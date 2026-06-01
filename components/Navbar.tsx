"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navItems, siteConfig } from "@/data/site";
import { cn, scrollToId } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/Button";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string>("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = navItems.map((n) => n.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  function go(href: string) {
    setOpen(false);
    scrollToId(href);
  }

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-line bg-base/80 backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8"
      >
        {/* logo */}
        <button
          type="button"
          onClick={() => go("#home")}
          className="flex items-center gap-2.5 rounded-lg outline-none"
          aria-label="Back to top"
        >
          <span className="grid h-9 w-9 place-items-center rounded-lg border border-neon/30 bg-gradient-to-br from-neon/15 to-iris/15 font-bold tracking-tight text-neon">
            SK
          </span>
          <span className="hidden text-sm font-semibold tracking-tight text-ink sm:block">
            {siteConfig.name}
          </span>
        </button>

        {/* desktop links */}
        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const active = activeId === item.href.slice(1);
            return (
              <button
                key={item.href}
                type="button"
                onClick={() => go(item.href)}
                className={cn(
                  "relative rounded-lg px-3 py-2 text-sm transition-colors",
                  active ? "text-ink" : "text-muted hover:text-ink",
                )}
              >
                {item.label}
                {active ? (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-2 -bottom-px h-px bg-neon"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                ) : null}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <a
            href={siteConfig.links.resume}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ variant: "secondary", size: "sm" }),
              "hidden sm:inline-flex",
            )}
          >
            Resume
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="grid h-10 w-10 place-items-center rounded-lg border border-line text-ink lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* mobile menu */}
      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-b border-line bg-base/95 backdrop-blur-xl lg:hidden"
          >
            <div className="mx-auto grid max-w-6xl gap-1 px-5 py-4 sm:px-8">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  type="button"
                  onClick={() => go(item.href)}
                  className="rounded-lg px-3 py-2.5 text-left text-sm text-muted transition-colors hover:bg-white/5 hover:text-ink"
                >
                  {item.label}
                </button>
              ))}
              <a
                href={siteConfig.links.resume}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ variant: "secondary", size: "md" }), "mt-2")}
              >
                Resume
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
