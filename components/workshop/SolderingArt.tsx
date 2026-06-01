import { cn } from "@/lib/utils";

/** Soldering station → Hardware experience. Heat glow + iron + PCB + LED. */
export function SolderingArt({
  active = false,
  className,
}: {
  active?: boolean;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 300 240"
      className={cn("h-auto w-full", className)}
      role="presentation"
    >
      <defs>
        <linearGradient id="sol-base" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2a2230" />
          <stop offset="1" stopColor="#15101a" />
        </linearGradient>
        <linearGradient id="sol-metal" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3a445e" />
          <stop offset="1" stopColor="#1b2230" />
        </linearGradient>
        <linearGradient id="sol-pcb" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0f5132" />
          <stop offset="1" stopColor="#07331f" />
        </linearGradient>
        <radialGradient id="sol-heat" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ffb648" />
          <stop offset="0.4" stopColor="#ff8f43" stopOpacity="0.6" />
          <stop offset="1" stopColor="#ff8f43" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="sol-iron" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#454f66" />
          <stop offset="1" stopColor="#272f41" />
        </linearGradient>
      </defs>

      {/* ambient heat glow */}
      <ellipse
        cx="206"
        cy="92"
        rx="78"
        ry="62"
        fill="url(#sol-heat)"
        opacity={active ? 0.6 : 0.4}
        className="transition-opacity duration-300"
      />

      {/* desk shadow */}
      <ellipse cx="150" cy="214" rx="132" ry="14" fill="#000" opacity="0.35" />

      {/* control base unit */}
      <rect x="18" y="120" width="120" height="84" rx="10" fill="url(#sol-base)" stroke="#3a3043" strokeWidth="1.5" />
      {/* display */}
      <rect x="32" y="134" width="58" height="30" rx="5" fill="#1a0f08" stroke="#52331a" />
      <text
        x="61"
        y="155"
        textAnchor="middle"
        fontFamily="monospace"
        fontSize="15"
        fill="#ff8f43"
        className="anim-flicker"
      >
        350°
      </text>
      {/* dial */}
      <circle cx="112" cy="150" r="15" fill="#1b1622" stroke="#473a52" strokeWidth="2" />
      <line x1="112" y1="150" x2="112" y2="139" stroke="#ff8f43" strokeWidth="2.5" strokeLinecap="round" />
      {/* power led */}
      <circle cx="36" cy="190" r="3" fill="#45e6a6" className="anim-blink" />
      <rect x="48" y="186" width="80" height="8" rx="4" fill="#241c2c" />

      {/* iron holder coil */}
      <path
        d="M150 150 q20 -8 40 0 q-18 14 -40 6 Z"
        fill="none"
        stroke="#4a5468"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <rect x="150" y="150" width="46" height="54" rx="6" fill="url(#sol-metal)" />

      {/* soldering iron (angled), tip heated */}
      <g transform="rotate(-32 210 95)">
        <rect x="150" y="86" width="96" height="16" rx="8" fill="url(#sol-iron)" />
        <rect x="150" y="86" width="30" height="16" rx="8" fill="#1d2433" />
        <rect x="244" y="89" width="26" height="10" rx="3" fill="#7a8499" />
        <polygon points="270,90 292,94 270,98" fill="#ffae52" />
      </g>
      {/* glowing tip dot */}
      <circle cx="206" cy="62" r="4.5" fill="#ffd27a" className="anim-pulse-glow" />

      {/* smoke wisp */}
      <path
        d="M206 56 q8 -14 -2 -26 q-8 -10 2 -22"
        fill="none"
        stroke="#9fb0c8"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.25"
        className="anim-breathe"
      />

      {/* PCB in front */}
      <rect x="96" y="176" width="118" height="44" rx="6" fill="url(#sol-pcb)" stroke="#0a3a23" />
      {/* traces */}
      <path d="M108 198 h40 v-12 h26" fill="none" stroke="#5ff0a8" strokeWidth="1.5" opacity="0.5" />
      <path d="M112 210 h70" fill="none" stroke="#5ff0a8" strokeWidth="1.5" opacity="0.4" />
      {/* components */}
      <rect x="118" y="184" width="16" height="10" rx="2" fill="#0b0f17" />
      <rect x="150" y="200" width="22" height="9" rx="2" fill="#0b0f17" />
      <circle cx="190" cy="190" r="6" fill="#0b0f17" stroke="#2a6b48" />
      {/* solder joints */}
      <circle cx="124" cy="206" r="2.6" fill="#cfd8e6" />
      <circle cx="176" cy="186" r="2.6" fill="#cfd8e6" />
      <circle cx="200" cy="208" r="2.6" fill="#ffd27a" className="anim-pulse-glow" />
    </svg>
  );
}
