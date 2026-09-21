/**
 * Margin drawings.
 *
 * PLACEHOLDERS. These are rough monoline stand-ins that establish placement,
 * scale and line weight — Syed is drawing the real ones (Saturn, the '95
 * SC300, a cat, a dinosaur). To swap one in: export the drawing as an SVG with
 * `fill="none" stroke="currentColor"`, drop it in below keeping the same
 * props signature, and the colour and sizing will follow automatically.
 *
 * They are decorative, so every one is aria-hidden.
 */

type MarkProps = { className?: string };

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

/** Space. */
export function Saturn({ className }: MarkProps) {
  return (
    <svg viewBox="0 0 132 132" {...stroke} className={className}>
      <circle cx="66" cy="62" r="30" />
      <ellipse cx="66" cy="62" rx="58" ry="17" transform="rotate(-18 66 62)" />
      <circle cx="54" cy="52" r="5" strokeWidth="1.1" />
      <circle cx="77" cy="70" r="3" strokeWidth="1.1" />
    </svg>
  );
}

/** The '95 SC300. */
export function Coupe({ className }: MarkProps) {
  return (
    <svg viewBox="0 0 76 46" {...stroke} className={className}>
      <path d="M4 33h68M9 33c0-13 9-20 25-20s22 7 28 20" />
      <path d="M18 14l6-6h20l8 6" />
      <circle cx="22" cy="34" r="6" />
      <circle cx="56" cy="34" r="6" />
    </svg>
  );
}

/** Louise or Bailey, depending on who you ask. */
export function Cat({ className }: MarkProps) {
  return (
    <svg viewBox="0 0 52 46" {...stroke} className={className}>
      <path d="M10 40c-2-12 3-22 16-22s18 10 16 22" />
      <path d="M14 21l-2-11 9 6M38 21l2-11-9 6" />
      <circle cx="21" cy="28" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="31" cy="28" r="1.4" fill="currentColor" stroke="none" />
      <path d="M24 32h4" />
    </svg>
  );
}

/** Dinosaurs. */
export function Sauropod({ className }: MarkProps) {
  return (
    <svg viewBox="0 0 84 52" {...stroke} className={className}>
      <path d="M6 44c0-10 8-16 20-16h14c10 0 16 4 20 10" />
      <path d="M60 38c6-2 10-8 10-16 0-6-4-10-9-10-4 0-7 3-7 7 0 3 2 5 5 5" />
      <path d="M14 44v6M26 44v6M44 42v8M56 42v6" />
      <path d="M6 44c-3-3-4-7-2-10" />
    </svg>
  );
}
