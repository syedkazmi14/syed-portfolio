/**
 * Margin drawings.
 *
 * One mark: Syed's cat, which is the back-to-top control in the footer
 * colophon. It used to open a /cats gallery, since deleted. The Saturn, coupe and
 * sauropod placeholders that used to live here were removed once Syed's own
 * artwork replaced them and the About marginalia came out.
 *
 * To add another: export the drawing as an SVG with `fill="none"
 * stroke="currentColor"`, keep the same props signature, and colour and
 * sizing follow automatically.
 *
 * Decorative, so aria-hidden.
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
