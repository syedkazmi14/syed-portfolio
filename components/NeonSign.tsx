"use client";

/**
 * Custom neon workshop sign — "SYED KAZMI" + "SOFTWARE ENGINEER".
 *
 * The letters are NOT a font. Each glyph is a hand-routed monoline tube path
 * (below), rendered as layered strokes (outer glow → glass tube → white-hot
 * core → traveling shimmer) so it reads as real neon glass. The sign is mounted
 * on a dark acrylic backboard with hanging chains + standoffs, and casts glow
 * onto the wall and a reflection below.
 */

type Glyph = { d: string; w: number };

// Monoline tube centerlines. Cell: x≥0, y 0 (top) .. 100 (bottom).
// Commands are space-separated (M/L = 1 point, C = 3 points) so they can be
// translated programmatically into one continuous word path.
const GLYPHS: Record<string, Glyph> = {
  S: { w: 62, d: "M 56 22 C 56 8 38 4 26 8 C 12 13 12 32 30 40 C 50 48 58 60 50 76 C 42 90 22 92 8 82" },
  Y: { w: 62, d: "M 6 6 L 31 48 L 56 6 M 31 48 L 31 96" },
  E: { w: 56, d: "M 52 6 L 10 6 L 10 96 L 52 96 M 10 51 L 44 51" },
  D: { w: 60, d: "M 12 6 L 12 96 M 12 6 C 42 6 56 24 56 51 C 56 78 42 96 12 96" },
  K: { w: 58, d: "M 10 6 L 10 96 M 50 6 L 12 50 M 22 42 L 52 96" },
  A: { w: 62, d: "M 6 96 L 31 6 L 56 96 M 17 62 L 45 62" },
  Z: { w: 58, d: "M 8 6 L 52 6 L 8 96 L 52 96" },
  M: { w: 72, d: "M 8 96 L 8 6 L 36 54 L 64 6 L 64 96" },
  I: { w: 16, d: "M 8 6 L 8 96" },
  O: { w: 62, d: "M 31 5 C 49 5 58 24 58 50 C 58 76 49 95 31 95 C 13 95 4 76 4 50 C 4 24 13 5 31 5 Z" },
  F: { w: 52, d: "M 12 6 L 12 96 M 12 6 L 50 6 M 12 51 L 42 51" },
  T: { w: 60, d: "M 6 6 L 54 6 M 30 6 L 30 96" },
  W: { w: 78, d: "M 6 6 L 20 96 L 39 42 L 58 96 L 72 6" },
  R: { w: 58, d: "M 12 96 L 12 6 M 12 6 C 40 6 52 14 52 30 C 52 45 40 52 12 52 M 30 52 L 52 96" },
  N: { w: 62, d: "M 8 96 L 8 6 L 54 96 L 54 6" },
  G: { w: 64, d: "M 56 26 C 48 10 26 4 14 14 C 2 24 2 52 10 68 C 20 86 44 90 54 76 C 58 70 58 62 58 56 L 42 56" },
};

const SPACE = 30;
const SPACING = 13;

/** Offset every coordinate pair in a (M/L/C/Z) path by dx/dy. */
function translatePath(d: string, dx: number, dy: number): string {
  const t = d.trim().split(/\s+/);
  const out: string[] = [];
  let i = 0;
  while (i < t.length) {
    const cmd = t[i++];
    out.push(cmd);
    if (cmd === "Z" || cmd === "z") continue;
    const pairs = cmd === "C" || cmd === "c" ? 3 : 1;
    for (let p = 0; p < pairs; p++) {
      out.push(String(+t[i++] + dx), String(+t[i++] + dy));
    }
  }
  return out.join(" ");
}

/** Build one combined path string for a whole word + its total width. */
function buildWord(word: string) {
  let x = 0;
  const parts: string[] = [];
  for (const ch of word.toUpperCase()) {
    if (ch === " ") {
      x += SPACE;
      continue;
    }
    const g = GLYPHS[ch];
    if (!g) {
      x += SPACE;
      continue;
    }
    parts.push(translatePath(g.d, x, 0));
    x += g.w + SPACING;
  }
  return { d: parts.join(" "), width: Math.max(0, x - SPACING) };
}

const TITLE = buildWord("SYED KAZMI");
const SUBTITLE = buildWord("SOFTWARE ENGINEER");

const VB_W = 860;
const VB_H = 330;

// title placement
const titleScale = 600 / TITLE.width;
const titleX = VB_W / 2 - (TITLE.width * titleScale) / 2;
const titleY = 96;
// subtitle placement
const subScale = 360 / SUBTITLE.width;
const subX = VB_W / 2 - (SUBTITLE.width * subScale) / 2;
const subY = 236;

function WordLayers({
  d,
  transform,
  stroke,
  glow,
  tube,
  core,
  shimmer,
}: {
  d: string;
  transform: string;
  stroke: string;
  glow: number;
  tube: number;
  core: number;
  shimmer?: boolean;
}) {
  return (
    <g transform={transform} fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path
        className="neon-breathe"
        d={d}
        stroke={stroke}
        strokeWidth={glow}
        filter="url(#neon-blur)"
      />
      <path d={d} stroke={stroke} strokeWidth={tube} opacity={0.95} />
      <path d={d} stroke="#f4ffff" strokeWidth={core} />
      {shimmer ? (
        <path
          className="neon-shimmer"
          d={d}
          stroke="#ffffff"
          strokeWidth={core + 0.6}
          opacity={0.5}
          pathLength={100}
          strokeDasharray="9 91"
        />
      ) : null}
    </g>
  );
}

export function NeonSign() {
  return (
    <div className="relative mx-auto w-full max-w-3xl select-none px-2">
      {/* document heading for SEO / a11y */}
      <h1 className="sr-only">Syed Kazmi — Software Engineer</h1>

      {/* glow cast on the wall behind the sign */}
      <div
        aria-hidden
        className="neon-breathe pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[78%] w-[88%] -translate-x-1/2 -translate-y-1/2 rounded-[40%] blur-[80px]"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 45%, rgba(62,224,255,0.42), rgba(140,108,255,0.22) 55%, transparent 78%)",
        }}
      />

      <svg
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        className="h-auto w-full overflow-visible"
        role="img"
        aria-label="Neon workshop sign reading Syed Kazmi, Software Engineer"
      >
        <defs>
          <linearGradient id="neon-title" x1="0" y1="0" x2="1" y2="0.25">
            <stop offset="0" stopColor="#4ff0ff" />
            <stop offset="0.5" stopColor="#3aa0ff" />
            <stop offset="1" stopColor="#b07cff" />
          </linearGradient>
          <linearGradient id="neon-sub" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#d6f7ff" />
            <stop offset="1" stopColor="#7fe6ff" />
          </linearGradient>
          <linearGradient id="board" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#121826" stopOpacity="0.92" />
            <stop offset="1" stopColor="#080b12" stopOpacity="0.92" />
          </linearGradient>
          <linearGradient id="board-sheen" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.06" />
            <stop offset="0.5" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="screw" cx="0.35" cy="0.3" r="0.8">
            <stop offset="0" stopColor="#aeb8c8" />
            <stop offset="1" stopColor="#3a4456" />
          </radialGradient>
          <filter id="neon-blur" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>

        {/* ---- mounting: wall anchors + hanging chains ---- */}
        {[300, 560].map((cx) => (
          <g key={cx} stroke="#5b6680" strokeWidth="2.4" fill="none">
            {/* wall anchor plate */}
            <rect x={cx - 9} y={6} width="18" height="7" rx="2" fill="#2a3344" stroke="#46506a" strokeWidth="1.5" />
            <circle cx={cx} cy={9.5} r="2" fill="#1a2030" stroke="#5b6680" strokeWidth="1" />
            {/* chain links down to the board */}
            {[18, 28, 38, 48].map((y) => (
              <ellipse key={y} cx={cx} cy={y} rx="3.4" ry="5.4" />
            ))}
          </g>
        ))}

        {/* ---- acrylic backboard ---- */}
        <rect x="80" y="56" width="700" height="246" rx="20" fill="url(#board)" stroke="#5f7bd0" strokeOpacity="0.22" strokeWidth="1.5" />
        <rect x="80" y="56" width="700" height="246" rx="20" fill="url(#board-sheen)" />
        {/* corner standoff screws */}
        {[
          [108, 84],
          [752, 84],
          [108, 274],
          [752, 274],
        ].map(([sx, sy]) => (
          <circle key={`${sx}-${sy}`} cx={sx} cy={sy} r="5" fill="url(#screw)" stroke="#3ee0ff" strokeOpacity="0.35" strokeWidth="0.8" />
        ))}

        {/* ---- main neon: SYED KAZMI ---- */}
        <g className="neon-flicker">
          <WordLayers
            d={TITLE.d}
            transform={`translate(${titleX} ${titleY}) scale(${titleScale})`}
            stroke="url(#neon-title)"
            glow={17}
            tube={8}
            core={2.6}
            shimmer
          />
        </g>

        {/* divider */}
        <line x1="300" y1="222" x2="560" y2="222" stroke="#3ee0ff" strokeOpacity="0.25" strokeWidth="1.5" />

        {/* ---- subtitle neon: SOFTWARE ENGINEER ---- */}
        <WordLayers
          d={SUBTITLE.d}
          transform={`translate(${subX} ${subY}) scale(${subScale})`}
          stroke="url(#neon-sub)"
          glow={11}
          tube={5}
          core={1.8}
        />
      </svg>

      {/* reflection cast on the surface below */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-10 -bottom-6 -z-10 h-16 rounded-[50%] opacity-50 blur-2xl"
        style={{
          background:
            "radial-gradient(60% 100% at 50% 0%, rgba(62,224,255,0.5), rgba(140,108,255,0.18) 60%, transparent 80%)",
        }}
      />
    </div>
  );
}
