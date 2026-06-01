import { cn } from "@/lib/utils";

/** Desk phone → Contact. Handset on cradle, keypad, coiled cord, status LED. */
export function DeskPhoneArt({
  active = false,
  className,
}: {
  active?: boolean;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 240 220"
      className={cn("h-auto w-full", className)}
      role="presentation"
    >
      <defs>
        <linearGradient id="ph-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2a3247" />
          <stop offset="1" stopColor="#141925" />
        </linearGradient>
        <linearGradient id="ph-hand" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#39435e" />
          <stop offset="1" stopColor="#1c2333" />
        </linearGradient>
        <radialGradient id="ph-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#3ee0ff" />
          <stop offset="1" stopColor="#3ee0ff" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse
        cx="120"
        cy="120"
        rx="112"
        ry="84"
        fill="url(#ph-glow)"
        opacity={active ? 0.34 : 0.2}
        className="transition-opacity duration-300"
      />
      <ellipse cx="120" cy="196" rx="98" ry="12" fill="#000" opacity="0.35" />

      {/* base body (angled top) */}
      <path
        d="M44 120 q0 -10 10 -12 l132 -16 q12 -1 12 12 v62 q0 10 -10 10 H54 q-10 0 -10 -10 Z"
        fill="url(#ph-body)"
        stroke="#39435e"
        strokeWidth="1.5"
      />

      {/* mini screen */}
      <rect x="58" y="104" width="54" height="26" rx="4" fill="#06222b" stroke="#11505f" />
      <rect x="64" y="110" width="34" height="4" rx="2" fill="#3ee0ff" opacity="0.8" />
      <rect x="64" y="118" width="24" height="4" rx="2" fill="#1f6b7d" />

      {/* keypad 3x4 */}
      <g fill="#0e1422" stroke="#2c3550">
        {Array.from({ length: 12 }).map((_, i) => {
          const col = i % 3;
          const row = Math.floor(i / 3);
          return (
            <rect
              key={i}
              x={130 + col * 20}
              y={104 + row * 16}
              width="15"
              height="11"
              rx="2.5"
            />
          );
        })}
      </g>

      {/* cradle hooks */}
      <rect x="70" y="60" width="14" height="16" rx="3" fill="#1c2333" />
      <rect x="156" y="60" width="14" height="16" rx="3" fill="#1c2333" />

      {/* handset resting on cradle */}
      <g>
        <rect x="58" y="52" width="124" height="20" rx="10" fill="url(#ph-hand)" stroke="#454f66" />
        <circle cx="64" cy="62" r="15" fill="url(#ph-hand)" stroke="#454f66" />
        <circle cx="176" cy="62" r="15" fill="url(#ph-hand)" stroke="#454f66" />
        {/* speaker holes */}
        <g fill="#0c1018">
          <circle cx="60" cy="58" r="1.4" />
          <circle cx="66" cy="58" r="1.4" />
          <circle cx="63" cy="64" r="1.4" />
          <circle cx="172" cy="58" r="1.4" />
          <circle cx="180" cy="58" r="1.4" />
          <circle cx="176" cy="64" r="1.4" />
        </g>
      </g>

      {/* coiled cord */}
      <path
        d="M176 78 q8 8 0 16 q-8 8 0 16 q8 8 0 16 q-8 8 0 16 q6 8 18 8 h6"
        fill="none"
        stroke="#3ee0ff"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.55"
      />

      {/* status LED + notification */}
      <circle cx="196" cy="120" r="3" fill="#3ee0ff" className="anim-blink" />
      <g className="anim-pulse-glow">
        <circle cx="186" cy="42" r="9" fill="#3ee0ff" />
        <text x="186" y="46" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="#04131a" fontWeight="bold">
          1
        </text>
      </g>
    </svg>
  );
}
