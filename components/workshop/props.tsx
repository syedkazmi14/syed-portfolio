import { getAccent } from "@/lib/accents";
import type { Accent } from "@/lib/types";
import { cn } from "@/lib/utils";

type P = { className?: string };

/* -------------------------------------------------------------- keyboard */
export function Keyboard({ className }: P) {
  const keys = [];
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 14; c++) {
      keys.push(
        <rect
          key={`${r}-${c}`}
          x={8 + c * 15}
          y={10 + r * 14}
          width="12"
          height="11"
          rx="2"
          fill="#0f1420"
          stroke="#222a3c"
          strokeWidth="0.6"
        />,
      );
    }
  }
  return (
    <svg viewBox="0 0 224 80" className={cn("h-auto w-full", className)} aria-hidden>
      <rect x="2" y="2" width="220" height="74" rx="6" fill="#0a0d15" stroke="#1c2434" />
      <rect x="2" y="68" width="220" height="8" rx="4" fill="#3ee0ff" opacity="0.18" />
      <rect x="2" y="68" width="220" height="8" rx="4" fill="url(#kb-glow)" opacity="0.5" />
      <defs>
        <linearGradient id="kb-glow" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#3ee0ff" />
          <stop offset="0.5" stopColor="#7c5cff" />
          <stop offset="1" stopColor="#ad93ff" />
        </linearGradient>
      </defs>
      {keys}
      <rect x="53" y="66" width="120" height="8" rx="2" fill="#0f1420" stroke="#222a3c" strokeWidth="0.6" />
    </svg>
  );
}

/* ----------------------------------------------------------------- mouse */
export function Mouse({ className }: P) {
  return (
    <svg viewBox="0 0 64 100" className={cn("h-auto w-full", className)} aria-hidden>
      <path d="M32 4 C50 4 58 20 58 46 C58 78 48 96 32 96 C16 96 6 78 6 46 C6 20 14 4 32 4 Z" fill="#10141f" stroke="#222a3c" />
      <line x1="32" y1="8" x2="32" y2="40" stroke="#222a3c" strokeWidth="1.2" />
      <rect x="29" y="16" width="6" height="14" rx="3" fill="#3ee0ff" opacity="0.85" />
      <path d="M10 70 C20 92 44 92 54 70" fill="none" stroke="#3ee0ff" strokeWidth="1.6" opacity="0.5" />
    </svg>
  );
}

/* ------------------------------------------------------------------- mug */
export function Mug({ className }: P) {
  return (
    <svg viewBox="0 0 80 86" className={cn("h-auto w-full overflow-visible", className)} aria-hidden>
      {/* steam */}
      <g stroke="#9fb0c8" strokeWidth="2" fill="none" opacity="0.25" strokeLinecap="round" className="anim-breathe">
        <path d="M34 16 q8 -10 -1 -20" />
        <path d="M46 16 q8 -10 -1 -20" />
      </g>
      <ellipse cx="40" cy="84" rx="26" ry="4" fill="#000" opacity="0.4" />
      <path d="M18 26 h44 v36 a22 22 0 0 1 -44 0 Z" fill="#11151f" stroke="#2a3346" />
      <ellipse cx="40" cy="26" rx="22" ry="6" fill="#1a2030" stroke="#2a3346" />
      <ellipse cx="40" cy="26" rx="16" ry="4" fill="#06121a" />
      <path d="M62 34 a12 12 0 0 1 0 22" fill="none" stroke="#2a3346" strokeWidth="5" />
      {/* cat logo */}
      <g transform="translate(40 48)" fill="none" stroke="#3ee0ff" strokeWidth="1.6">
        <path d="M-7 4 L-9 -4 L-3 0 Z" />
        <path d="M7 4 L9 -4 L3 0 Z" />
        <circle cx="0" cy="5" r="7" />
        <circle cx="-3" cy="4" r="0.8" fill="#3ee0ff" />
        <circle cx="3" cy="4" r="0.8" fill="#3ee0ff" />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------- circuit board */
export function CircuitBoard({ className }: P) {
  return (
    <svg viewBox="0 0 120 80" className={cn("h-auto w-full", className)} aria-hidden>
      <rect x="2" y="2" width="116" height="76" rx="5" fill="#0c2a1c" stroke="#0a3a23" />
      <g stroke="#39d98a" strokeWidth="1" opacity="0.55" fill="none">
        <path d="M14 16 H60 V40 H92" />
        <path d="M14 60 H44 V44" />
        <path d="M70 14 V34 H104" />
        <path d="M30 70 H86" />
      </g>
      <rect x="40" y="28" width="26" height="20" rx="2" fill="#0a0f17" stroke="#2a6b48" />
      <rect x="84" y="44" width="20" height="12" rx="2" fill="#0a0f17" stroke="#2a6b48" />
      <circle cx="100" cy="20" r="6" fill="#0a0f17" stroke="#2a6b48" />
      <g fill="#cfd8e6">
        <circle cx="14" cy="16" r="1.6" />
        <circle cx="92" cy="40" r="1.6" />
        <circle cx="14" cy="60" r="1.6" />
      </g>
      <circle cx="22" cy="24" r="2.2" fill="#39d98a" className="anim-blink" />
    </svg>
  );
}

/* ----------------------------------------------------------- dev board (Pi) */
export function DevBoard({ className }: P) {
  return (
    <svg viewBox="0 0 120 80" className={cn("h-auto w-full", className)} aria-hidden>
      <rect x="2" y="2" width="116" height="76" rx="5" fill="#123a2a" stroke="#0a3a23" />
      {/* GPIO header */}
      <g fill="#d9b44a">
        {Array.from({ length: 20 }).map((_, i) => (
          <rect key={i} x={10 + i * 5} y={8} width="3" height="3" />
        ))}
        {Array.from({ length: 20 }).map((_, i) => (
          <rect key={`b${i}`} x={10 + i * 5} y={13} width="3" height="3" />
        ))}
      </g>
      <rect x="44" y="34" width="30" height="26" rx="2" fill="#0a0f17" stroke="#2a6b48" />
      <rect x="6" y="40" width="16" height="14" rx="1" fill="#9aa6b8" />
      <rect x="6" y="58" width="16" height="14" rx="1" fill="#9aa6b8" />
      <rect x="92" y="36" width="22" height="16" rx="1" fill="#0a0f17" stroke="#2a6b48" />
      <circle cx="86" cy="66" r="2" fill="#ff5b5b" className="anim-blink" />
      <circle cx="94" cy="66" r="2" fill="#39d98a" />
    </svg>
  );
}

/* ------------------------------------------------------------- sticky note */
export function StickyNote({
  lines,
  accent = "heat",
  doodle,
  className,
}: {
  lines: string[];
  accent?: Accent;
  /** small hand-drawn mark in the corner */
  doodle?: "cat";
  className?: string;
}) {
  const a = getAccent(accent);
  return (
    <svg viewBox="0 0 90 90" className={cn("h-auto w-full", className)} aria-hidden>
      <rect x="3" y="3" width="84" height="84" fill={a.hex} opacity="0.92" />
      <path d="M70 87 L87 87 L87 70 Z" fill="#000" opacity="0.16" />
      {/* tape */}
      <rect x="32" y="-2" width="26" height="9" fill="#ffffff" opacity="0.18" />
      <g
        fontFamily="var(--font-geist-mono), monospace"
        fontSize="11"
        fill="#0b0f17"
        fontWeight="600"
      >
        {lines.map((l, i) => (
          <text key={i} x="11" y={26 + i * 17}>
            {l}
          </text>
        ))}
      </g>
      {doodle === "cat" ? (
        <g
          transform="translate(67 70)"
          stroke="#0b0f17"
          strokeWidth="1.4"
          fill="none"
          strokeLinejoin="round"
          strokeLinecap="round"
        >
          <path d="M-6 -3 L-8 -10 L-2 -5 Z" />
          <path d="M6 -3 L8 -10 L2 -5 Z" />
          <circle cx="0" cy="2" r="7" />
          <circle cx="-2.6" cy="1" r="0.7" fill="#0b0f17" />
          <circle cx="2.6" cy="1" r="0.7" fill="#0b0f17" />
          <path d="M-7 1 l-5 -1 M-7 3 l-5 1 M7 1 l5 -1 M7 3 l5 1" />
        </g>
      ) : null}
    </svg>
  );
}

/* ------------------------------------------------------------------ plant */
export function Plant({ className }: P) {
  return (
    <svg viewBox="0 0 70 96" className={cn("h-auto w-full overflow-visible", className)} aria-hidden>
      <g fill="none" stroke="#2f7d52" strokeWidth="5" strokeLinecap="round">
        <path d="M35 60 C20 44 16 26 22 12" />
        <path d="M35 60 C50 46 56 28 50 14" />
        <path d="M35 62 C34 44 34 28 35 16" />
        <path d="M35 58 C26 50 16 48 8 50" />
        <path d="M35 58 C44 50 54 48 62 50" />
      </g>
      <g fill="#3fa86a" opacity="0.9">
        <ellipse cx="22" cy="12" rx="6" ry="11" transform="rotate(-18 22 12)" />
        <ellipse cx="50" cy="14" rx="6" ry="11" transform="rotate(18 50 14)" />
        <ellipse cx="35" cy="14" rx="5" ry="12" />
      </g>
      <path d="M18 60 h34 l-4 30 h-26 Z" fill="#1a2433" stroke="#2a3346" />
      <rect x="16" y="56" width="38" height="8" rx="2" fill="#222d40" stroke="#2a3346" />
    </svg>
  );
}

/* ------------------------------------------------------------ desk lamp */
export function DeskLamp({ className }: P) {
  return (
    <svg viewBox="0 0 150 180" className={cn("h-auto w-full overflow-visible", className)} aria-hidden>
      {/* light cone */}
      <path d="M44 60 L150 120 L150 180 L20 180 Z" fill="url(#lamp-cone)" opacity="0.5" />
      <defs>
        <linearGradient id="lamp-cone" x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0" stopColor="#fff2cc" stopOpacity="0.5" />
          <stop offset="1" stopColor="#fff2cc" stopOpacity="0" />
        </linearGradient>
      </defs>
      <g stroke="#2a3346" strokeWidth="6" fill="none" strokeLinecap="round">
        <path d="M20 175 L34 96" />
        <path d="M34 96 L70 60" />
      </g>
      <circle cx="20" cy="175" r="8" fill="#222d40" />
      <circle cx="34" cy="96" r="5" fill="#2a3346" />
      <g transform="rotate(40 60 56)">
        <path d="M44 44 h36 a8 8 0 0 1 8 8 v6 a26 26 0 0 1 -52 0 v-6 a8 8 0 0 1 8 -8 Z" fill="#1a2230" stroke="#2a3346" />
        <ellipse cx="62" cy="64" rx="20" ry="6" fill="#fff2cc" />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------- commits calendar */
export function CommitsCalendar({ className }: P) {
  const cells = [];
  for (let c = 0; c < 14; c++) {
    for (let r = 0; r < 7; r++) {
      const seed = (c * 7 + r) * 9301 + 49297;
      const v = ((seed % 233280) / 233280) ** 1.4;
      const fill =
        v > 0.78 ? "#39d98a" : v > 0.55 ? "#1f9c63" : v > 0.32 ? "#15603f" : "#10241c";
      cells.push(<rect key={`${c}-${r}`} x={8 + c * 13} y={22 + r * 13} width="10" height="10" rx="2" fill={fill} />);
    }
  }
  return (
    <svg viewBox="0 0 200 130" className={cn("h-auto w-full", className)} aria-hidden>
      <rect x="2" y="2" width="196" height="126" rx="8" fill="#0a0f17" stroke="#1c2434" />
      <text x="10" y="15" fontFamily="var(--font-geist-mono), monospace" fontSize="9" fill="#39d98a">
        /commits
      </text>
      {cells}
    </svg>
  );
}

/* --------------------------------------------------------- blueprint sheet */
export function BlueprintSheet({
  variant = "arch",
  className,
}: {
  variant?: "arch" | "flow" | "api";
  className?: string;
}) {
  return (
    <svg viewBox="0 0 160 120" className={cn("h-auto w-full", className)} aria-hidden>
      <rect x="2" y="2" width="156" height="116" rx="3" fill="#0a1622" stroke="#16344a" />
      <rect x="2" y="2" width="156" height="116" rx="3" fill="url(#bp-grid)" />
      <defs>
        <pattern id="bp-grid" width="12" height="12" patternUnits="userSpaceOnUse">
          <path d="M12 0 H0 V12" fill="none" stroke="#16344a" strokeOpacity="0.5" strokeWidth="0.6" />
        </pattern>
      </defs>
      <g stroke="#4cc9ff" strokeWidth="1.2" fill="none" opacity="0.7">
        {variant === "arch" ? (
          <>
            <rect x="18" y="22" width="40" height="20" rx="2" />
            <rect x="100" y="22" width="40" height="20" rx="2" />
            <rect x="60" y="70" width="40" height="20" rx="2" />
            <path d="M58 32 H100 M80 42 V70" />
            <circle cx="80" cy="100" r="8" />
          </>
        ) : variant === "flow" ? (
          <>
            <circle cx="30" cy="40" r="9" />
            <circle cx="80" cy="40" r="9" />
            <circle cx="130" cy="40" r="9" />
            <circle cx="55" cy="85" r="9" />
            <circle cx="105" cy="85" r="9" />
            <path d="M39 40 H71 M89 40 H121 M37 47 L48 78 M88 47 L99 78" />
          </>
        ) : (
          <>
            <rect x="20" y="26" width="120" height="14" rx="7" />
            <rect x="20" y="50" width="90" height="14" rx="7" />
            <rect x="20" y="74" width="110" height="14" rx="7" />
            <circle cx="132" cy="57" r="4" />
          </>
        )}
      </g>
    </svg>
  );
}

/* --------------------------------------------------------------- notebook */
export function DerivedNote({ className }: P) {
  return (
    <svg viewBox="0 0 90 70" className={cn("h-auto w-full", className)} aria-hidden>
      <rect x="3" y="4" width="84" height="62" rx="3" fill="#11151d" stroke="#222a3c" />
      <rect x="3" y="4" width="84" height="62" rx="3" fill="#e9eef7" opacity="0.04" />
      <g stroke="#2a3346" strokeWidth="0.8">
        <line x1="12" y1="18" x2="78" y2="18" />
        <line x1="12" y1="30" x2="78" y2="30" />
        <line x1="12" y1="42" x2="78" y2="42" />
        <line x1="12" y1="54" x2="78" y2="54" />
        <line x1="20" y1="6" x2="20" y2="64" stroke="#7a3b3b" strokeOpacity="0.5" />
      </g>
      <text x="24" y="27" fontFamily="var(--font-geist-mono), monospace" fontSize="9" fill="#7c89a6">
        ŷ = σ(Wx+b)
      </text>
      <path d="M26 38 q10 8 20 0 q10 -8 20 0" fill="none" stroke="#3ee0ff" strokeWidth="1" opacity="0.5" />
    </svg>
  );
}

/* ------------------------------------------------------------ small cables */
export function CableDrape({ className }: P) {
  return (
    <svg viewBox="0 0 200 120" className={cn("h-auto w-full overflow-visible", className)} aria-hidden>
      <path d="M10 4 C30 70 60 60 70 116" fill="none" stroke="#0c0f17" strokeWidth="5" strokeLinecap="round" />
      <path d="M40 4 C60 50 120 70 150 116" fill="none" stroke="#10141d" strokeWidth="4" strokeLinecap="round" />
      <path d="M120 4 C140 40 150 70 190 100" fill="none" stroke="#0c0f17" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}
