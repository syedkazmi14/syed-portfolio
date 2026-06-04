import { cn } from "@/lib/utils";

/** Toolbox → Skills. Metal box with tools poking out + accent label. */
export function ToolboxArt({
  active = false,
  className,
}: {
  active?: boolean;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 300 220"
      className={cn("h-auto w-full", className)}
      role="presentation"
    >
      <defs>
        <linearGradient id="tb-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e0673a" />
          <stop offset="1" stopColor="#9a3b1c" />
        </linearGradient>
        <linearGradient id="tb-lid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f08146" />
          <stop offset="1" stopColor="#c1502a" />
        </linearGradient>
        <linearGradient id="tb-metal" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#cfd8e6" />
          <stop offset="1" stopColor="#7a8499" />
        </linearGradient>
        <radialGradient id="tb-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ff8f43" />
          <stop offset="1" stopColor="#ff8f43" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse
        cx="150"
        cy="130"
        rx="140"
        ry="84"
        fill="url(#tb-glow)"
        opacity={active ? 0.3 : 0.18}
        className="transition-opacity duration-300"
      />
      <ellipse cx="150" cy="196" rx="118" ry="13" fill="#000" opacity="0.35" />

      {/* tools poking out behind */}
      {/* screwdriver */}
      <g transform="rotate(18 150 70)">
        <rect x="96" y="40" width="26" height="12" rx="6" fill="#ff8f43" />
        <rect x="122" y="43" width="40" height="6" rx="2" fill="url(#tb-metal)" />
        <polygon points="162,43 172,46 162,49" fill="#aeb8d0" />
      </g>
      {/* wrench */}
      <g transform="rotate(-20 188 60)">
        <rect x="176" y="40" width="44" height="9" rx="4" fill="url(#tb-metal)" />
        <path d="M214 36 a10 10 0 1 0 0 17 l-5 0 0 -6 -6 0 0 -5 6 0 0 -6 5 0 Z" fill="url(#tb-metal)" />
      </g>
      {/* chip / IC */}
      <g transform="translate(150 34)">
        <rect x="-13" y="-2" width="26" height="22" rx="2" fill="#0b0f17" stroke="#2b3346" />
        <g stroke="#7a8499" strokeWidth="2">
          <line x1="-13" y1="3" x2="-19" y2="3" />
          <line x1="-13" y1="11" x2="-19" y2="11" />
          <line x1="13" y1="3" x2="19" y2="3" />
          <line x1="13" y1="11" x2="19" y2="11" />
        </g>
        <circle cx="-6" cy="6" r="1.6" fill="#ff8f43" />
      </g>

      {/* lid / cantilever tray */}
      <path d="M58 92 h184 l-14 26 H72 Z" fill="url(#tb-lid)" stroke="#7a2e15" strokeWidth="1.5" />
      {/* handle */}
      <path
        d="M120 92 q30 -34 60 0"
        fill="none"
        stroke="url(#tb-metal)"
        strokeWidth="7"
        strokeLinecap="round"
      />

      {/* body */}
      <rect x="62" y="118" width="176" height="74" rx="9" fill="url(#tb-body)" stroke="#7a2e15" strokeWidth="1.5" />
      {/* drawer split */}
      <line x1="62" y1="152" x2="238" y2="152" stroke="#7a2e15" strokeWidth="1.5" opacity="0.7" />
      {/* drawer handles */}
      <rect x="120" y="132" width="60" height="6" rx="3" fill="#5a2410" />
      <rect x="120" y="168" width="60" height="6" rx="3" fill="#5a2410" />
      {/* latches */}
      <rect x="78" y="112" width="16" height="16" rx="3" fill="url(#tb-metal)" />
      <rect x="206" y="112" width="16" height="16" rx="3" fill="url(#tb-metal)" />

      {/* label plate */}
      <rect x="110" y="176" width="80" height="14" rx="3" fill="#1b1208" opacity="0.85" />
      <text x="150" y="186" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#ffb648" letterSpacing="2">
        SKILLS
      </text>
      {/* status dot */}
      <circle cx="226" cy="128" r="2.6" fill="#ffd27a" className="anim-blink" />

      {/* cat sticker decal */}
      <g transform="translate(86 150)">
        <circle cx="0" cy="1" r="11" fill="#0b0f17" opacity="0.55" />
        <g stroke="#3ee0ff" strokeWidth="1.4" fill="none">
          <path d="M-6 -2 L-8 -9 L-2 -4 Z" />
          <path d="M6 -2 L8 -9 L2 -4 Z" />
          <circle cx="0" cy="2" r="6.5" />
        </g>
        <circle cx="-2.6" cy="1" r="1" fill="#3ee0ff" />
        <circle cx="2.6" cy="1" r="1" fill="#3ee0ff" />
        <path d="M0 3.5 l-1.4 -1.6 h2.8 Z" fill="#ad93ff" />
      </g>
    </svg>
  );
}
