import { cn } from "@/lib/utils";

/** Trophy shelf → Awards. Wall plank with a cup, medal, and star award. */
export function TrophyShelfArt({
  active = false,
  className,
}: {
  active?: boolean;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 300 230"
      className={cn("h-auto w-full", className)}
      role="presentation"
    >
      <defs>
        <linearGradient id="tr-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffe08a" />
          <stop offset="0.5" stopColor="#f6b73c" />
          <stop offset="1" stopColor="#b97e1e" />
        </linearGradient>
        <linearGradient id="tr-shelf" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3a445e" />
          <stop offset="1" stopColor="#1d2433" />
        </linearGradient>
        <radialGradient id="tr-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ad93ff" />
          <stop offset="1" stopColor="#ad93ff" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse
        cx="150"
        cy="92"
        rx="140"
        ry="86"
        fill="url(#tr-glow)"
        opacity={active ? 0.34 : 0.2}
        className="transition-opacity duration-300"
      />

      {/* ---- center cup trophy ---- */}
      <g>
        {/* handles */}
        <path
          d="M118 54 q-22 2 -22 22 q0 16 18 18"
          fill="none"
          stroke="url(#tr-gold)"
          strokeWidth="6"
        />
        <path
          d="M182 54 q22 2 22 22 q0 16 -18 18"
          fill="none"
          stroke="url(#tr-gold)"
          strokeWidth="6"
        />
        {/* cup */}
        <path d="M118 44 h64 v18 q0 38 -32 46 q-32 -8 -32 -46 Z" fill="url(#tr-gold)" />
        <path d="M132 50 h36 v10 q0 22 -18 30 q-18 -8 -18 -30 Z" fill="#fff" opacity="0.12" />
        {/* star */}
        <path
          d="M150 64 l4 9 10 1 -7.5 7 2 10 -8.5 -5 -8.5 5 2 -10 -7.5 -7 10 -1 Z"
          fill="#fff7df"
        />
        {/* stem + base */}
        <rect x="144" y="104" width="12" height="16" fill="url(#tr-gold)" />
        <rect x="128" y="120" width="44" height="8" rx="2" fill="url(#tr-gold)" />
        <rect x="120" y="128" width="60" height="10" rx="3" fill="#2b3346" />
        <rect x="128" y="130" width="44" height="5" rx="2" fill="#ad93ff" opacity="0.6" />
      </g>

      {/* ---- left medal ---- */}
      <g transform="translate(52 60)">
        <path d="M8 0 l10 26 M30 0 l-10 26" stroke="#6c79ff" strokeWidth="6" fill="none" />
        <circle cx="19" cy="44" r="20" fill="url(#tr-gold)" stroke="#b97e1e" strokeWidth="2" />
        <circle cx="19" cy="44" r="12" fill="none" stroke="#fff7df" strokeWidth="1.5" opacity="0.7" />
        <text x="19" y="49" textAnchor="middle" fontFamily="monospace" fontSize="13" fill="#7a531a" fontWeight="bold">
          1
        </text>
      </g>

      {/* ---- right star award ---- */}
      <g transform="translate(214 66)">
        <rect x="6" y="60" width="32" height="10" rx="3" fill="#2b3346" />
        <rect x="18" y="40" width="8" height="22" fill="#5b6680" />
        <path
          d="M22 0 l6 14 15 1 -11.5 10 3.5 15 -13 -8 -13 8 3.5 -15 -11.5 -10 15 -1 Z"
          fill="url(#tr-gold)"
          stroke="#b97e1e"
          strokeWidth="1.2"
        />
      </g>

      {/* sparkles */}
      <g fill="#ffffff" className="anim-blink">
        <path d="M96 30 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2 Z" opacity="0.8" />
      </g>
      <g fill="#e9d6ff" className="anim-pulse-glow">
        <path d="M210 36 l1.5 4 4 1.5 -4 1.5 -1.5 4 -1.5 -4 -4 -1.5 4 -1.5 Z" />
      </g>

      {/* ---- shelf plank ---- */}
      <rect x="20" y="150" width="260" height="14" rx="4" fill="url(#tr-shelf)" />
      <rect x="20" y="150" width="260" height="4" rx="2" fill="#4a5468" opacity="0.5" />
      {/* brackets */}
      <path d="M60 164 l14 0 l-2 22 Z" fill="#161c28" />
      <path d="M226 164 l14 0 l-2 22 Z" fill="#161c28" />
      {/* under-shelf accent line */}
      <rect x="20" y="163" width="260" height="2" fill="#ad93ff" opacity="0.45" />
    </svg>
  );
}
