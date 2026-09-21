/**
 * Syed's avatar — an original monoline ink drawing.
 *
 * Messy ~2in spiky hair, goatee, no glasses. Drawn as paths rather than an
 * image so it inherits `currentColor` (green in the nav, ink elsewhere) and
 * stays crisp at any size.
 *
 * Idle: an occasional blink. Hover/focus (via `group` on the parent link):
 * a small head tilt and the hair lifts. Both animations are defined in
 * globals.css and disabled under prefers-reduced-motion.
 *
 * Keep the line work simple — this also has to read at 16px as a favicon.
 */
export function Avatar({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <g className="avatar-tilt">
        {/* head */}
        <path d="M32 19c8.5 0 14 6.5 14 15v4c0 9.5-5.5 16-14 16s-14-6.5-14-16v-4c0-8.5 5.5-15 14-15z" />

        {/* ears */}
        <path d="M18 35c-2.2-.6-3.6.8-3.4 2.8.2 2 1.8 3.2 3.4 2.9" />
        <path d="M46 35c2.2-.6 3.6.8 3.4 2.8-.2 2-1.8 3.2-3.4 2.9" />

        {/* messy spiky hair */}
        <g className="avatar-hair">
          <path d="M17.5 31.5c-.6-4 .4-7 2.4-9.2" />
          <path d="M19.9 22.3l.6-6.1 3.2 4.6 1.9-7.2 2.7 5.6 2.4-6.6 3 6.1 2.6-5.2 2.3 6.3 3.4-4.4 1.2 5.9 2.9-3.1c1.9 2.4 2.6 5.6 2.4 9.3" />
          <path d="M22.5 20.9c3.2 2.6 8 3.9 14.2 3.6 2.9-.2 5.3-.8 7.3-1.8" />
        </g>

        {/* eyes — the blink target */}
        <g className="avatar-eyes" fill="currentColor" stroke="none">
          <ellipse cx="26" cy="36" rx="1.7" ry="2.1" />
          <ellipse cx="38" cy="36" rx="1.7" ry="2.1" />
        </g>

        {/* brows */}
        <path d="M23.2 31.2c1.6-1 3.6-1.1 5.4-.3" strokeWidth={1.9} />
        <path d="M35.4 30.9c1.8-.8 3.8-.7 5.4.3" strokeWidth={1.9} />

        {/* nose */}
        <path d="M32 37.5v3.2c0 .8-.5 1.3-1.4 1.5" strokeWidth={1.9} />

        {/* goatee: moustache + chin patch, no glasses */}
        <path d="M26.6 45.2c1.7 1.2 3.5 1.8 5.4 1.8s3.7-.6 5.4-1.8" strokeWidth={2.1} />
        <path d="M27.4 48.6c1.4.9 3 1.4 4.6 1.4s3.2-.5 4.6-1.4c-.3 4.4-2 6.7-4.6 6.7s-4.3-2.3-4.6-6.7z" />
      </g>
    </svg>
  );
}
