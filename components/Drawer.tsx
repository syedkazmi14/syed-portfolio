"use client";

import { useEffect, useRef, useSyncExternalStore, type ReactNode } from "react";
import { createPortal } from "react-dom";

/**
 * A side panel that slides in from the right.
 *
 * Used for both project and experience detail so clicking a row never leaves
 * the page. The panel is always mounted and moved off-canvas with a transform
 * rather than being added and removed, so the slide runs in both directions on
 * the compositor.
 *
 * Behaviour: Escape closes, clicking the backdrop closes, focus moves to the
 * close button on open and returns to the trigger on close, and the page
 * behind is locked from scrolling (compensating for the scrollbar so the
 * layout doesn't jump).
 *
 * It renders through a portal onto <body>. That is not optional: the sections
 * holding these lists use `isolate` so their photo backdrops can sit at
 * `-z-10`, and an isolated ancestor traps everything inside it — the drawer's
 * z-index would lose to the header's, and the nav would paint over the panel.
 */
/** Never changes, so useSyncExternalStore never re-subscribes. */
const subscribeNoop = () => () => {};

export function Drawer({
  open,
  onClose,
  eyebrow,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  eyebrow?: string;
  title: string;
  children: ReactNode;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const restoreTo = useRef<HTMLElement | null>(null);

  // Escape to close.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Lock the page behind the drawer, and keep the drawer's own scroll at top.
  useEffect(() => {
    if (!open) return;

    restoreTo.current = document.activeElement as HTMLElement | null;

    const { body } = document;
    const gap = window.innerWidth - document.documentElement.clientWidth;
    const prevOverflow = body.style.overflow;
    const prevPad = body.style.paddingRight;

    body.style.overflow = "hidden";
    if (gap > 0) body.style.paddingRight = `${gap}px`;

    if (bodyRef.current) bodyRef.current.scrollTop = 0;
    closeRef.current?.focus();

    return () => {
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPad;
      restoreTo.current?.focus?.();
    };
  }, [open]);

  // Portals need the DOM, so hold off until after hydration. useSyncExternalStore
  // gives us "false on the server, true on the client" without a setState in an
  // effect, which would cascade a second render on every mount.
  const mounted = useSyncExternalStore(subscribeNoop, () => true, () => false);
  if (!mounted) return null;

  return createPortal(
    <>
      <div
        aria-hidden
        onClick={onClose}
        className={`fixed inset-0 z-[90] bg-ink transition-opacity duration-300 ease-out ${
          open ? "pointer-events-auto opacity-30" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label={title}
        aria-hidden={!open}
        className={`fixed inset-y-0 right-0 z-[91] flex w-full max-w-[30rem] flex-col border-l border-rule bg-ground transition-transform duration-[420ms] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ transitionTimingFunction: "cubic-bezier(0.32, 0.72, 0, 1)" }}
      >
        {/* dotted inset frame — a small nod to the paper the site is printed on */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-2 left-2 right-0 border-l border-t border-dotted border-rule opacity-50"
        />

        <header className="relative z-10 flex h-[4.5rem] shrink-0 items-center justify-between gap-4 border-b border-rule px-6">
          <p className="truncate font-mono text-[0.68rem] uppercase tracking-[0.12em] text-faint">
            {eyebrow}
          </p>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="-mr-2 grid h-11 w-11 shrink-0 place-items-center rounded-sm text-muted transition-colors hover:text-ink"
          >
            <svg
              viewBox="0 0 16 16"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.6}
              strokeLinecap="round"
              aria-hidden
            >
              <path d="M4 4l8 8M12 4l-8 8" />
            </svg>
          </button>
        </header>

        <div
          ref={bodyRef}
          className="drawer-body relative z-10 flex-1 overflow-y-auto overscroll-contain px-6 pb-16 pt-8"
        >
          {children}
        </div>
      </aside>
    </>,
    document.body,
  );
}
