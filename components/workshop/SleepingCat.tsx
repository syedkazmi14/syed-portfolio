import { cn } from "@/lib/utils";

/**
 * The workshop mascot, curled up asleep on the desk.
 *
 * Pass `hovered={true}` to make the cat's eyes snap open (neon-cyan irises)
 * instead of the usual sleepy-closed state — used by CatPortal in WorkshopScene
 * to signal that the cat is a clickable link.
 */
export function SleepingCat({
  className,
  hovered = false,
}: {
  className?: string;
  hovered?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 180 100"
      className={cn("h-auto w-full overflow-visible", className)}
      role="img"
      aria-label="A black cat sleeping on the desk"
    >
      <defs>
        <linearGradient id="cat-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#222a3c" />
          <stop offset="1" stopColor="#0b0e16" />
        </linearGradient>
        <linearGradient id="cat-rim" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#3ee0ff" />
          <stop offset="1" stopColor="#ad93ff" />
        </linearGradient>
      </defs>

      {/* contact shadow */}
      <ellipse cx="92" cy="92" rx="80" ry="7" fill="#000" opacity="0.45" />

      {/* tail (behind), flicks occasionally */}
      <g className="cat-tail" style={{ transformOrigin: "150px 70px" }}>
        <path
          d="M150 70 C176 66 182 90 158 92 C140 94 126 90 119 85"
          fill="none"
          stroke="#10141d"
          strokeWidth="13"
          strokeLinecap="round"
        />
        <path
          d="M152 66 C172 64 178 82 161 87"
          fill="none"
          stroke="url(#cat-rim)"
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity="0.55"
        />
      </g>

      {/* curled body (breathes) */}
      <g className="cat-breathe">
        <path
          d="M40 73 C27 45 58 30 96 32 C141 34 163 53 156 71 C150 85 119 89 89 88 C63 87 50 85 40 73 Z"
          fill="url(#cat-body)"
        />
        {/* back rim light */}
        <path
          d="M45 53 C73 35 126 37 153 61"
          fill="none"
          stroke="url(#cat-rim)"
          strokeWidth="2.4"
          strokeLinecap="round"
          opacity="0.7"
        />
        {/* front paws */}
        <path
          d="M70 86 q6 -7 13 0"
          fill="none"
          stroke="#1a2130"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="M88 87 q6 -7 13 0"
          fill="none"
          stroke="#161c29"
          strokeWidth="6"
          strokeLinecap="round"
        />
      </g>

      {/* head (left) */}
      <g>
        {/* right ear (twitches) */}
        <g className="cat-ear" style={{ transformOrigin: "60px 52px" }}>
          <path d="M53 50 L66 39 L68 56 Z" fill="url(#cat-body)" stroke="url(#cat-rim)" strokeWidth="1" strokeLinejoin="round" />
          <path d="M57 50 L65 43 L66 53 Z" fill="url(#cat-rim)" opacity="0.4" />
        </g>
        {/* left ear */}
        <path d="M40 54 L35 40 L51 49 Z" fill="url(#cat-body)" stroke="url(#cat-rim)" strokeWidth="1" strokeLinejoin="round" />
        <path d="M42 51 L40 43 L48 49 Z" fill="url(#cat-rim)" opacity="0.4" />

        {/* head */}
        <circle cx="52" cy="67" r="18" fill="url(#cat-body)" stroke="url(#cat-rim)" strokeWidth="1.1" strokeOpacity="0.6" />

        {/* ── CLOSED eyes (sleeping default) ── */}
        <g style={{ opacity: hovered ? 0 : 1, transition: "opacity 0.18s" }}>
          <path d="M41 65 Q46 69 51 65" fill="none" stroke="#aeb8d0" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M57 65 Q62 68 66 65" fill="none" stroke="#aeb8d0" strokeWidth="1.6" strokeLinecap="round" />
          {/* dreaming glint */}
          <circle className="cat-dream" cx="48" cy="64" r="1.6" fill="#3ee0ff" />
        </g>

        {/* ── OPEN eyes (hovered / alert) ── */}
        <g style={{ opacity: hovered ? 1 : 0, transition: "opacity 0.18s" }}>
          {/* left eye — soft green underglow, round iris, double sparkle */}
          <ellipse cx="46" cy="64.5" rx="6.5" ry="5.5" fill="#45e6a6" opacity="0.18" />
          <ellipse cx="46" cy="64.5" rx="5.2" ry="4.4" fill="#0d1422" />
          <ellipse cx="46" cy="64.5" rx="3.6" ry="3.1" fill="#4ef0a6" opacity="0.92" />
          <ellipse cx="46" cy="64.5" rx="2" ry="1.8" fill="#07140e" />
          <circle cx="47.4" cy="63.2" r="0.9" fill="#ffffff" opacity="0.9" />
          <circle cx="45.1" cy="65.5" r="0.5" fill="#ffffff" opacity="0.65" />
          {/* right eye — same palette, slightly smaller for perspective */}
          <ellipse cx="61.5" cy="64.5" rx="5.8" ry="4.8" fill="#45e6a6" opacity="0.18" />
          <ellipse cx="61.5" cy="64.5" rx="4.6" ry="3.9" fill="#0d1422" />
          <ellipse cx="61.5" cy="64.5" rx="3.1" ry="2.7" fill="#4ef0a6" opacity="0.92" />
          <ellipse cx="61.5" cy="64.5" rx="1.7" ry="1.5" fill="#07140e" />
          <circle cx="62.8" cy="63.2" r="0.8" fill="#ffffff" opacity="0.9" />
          <circle cx="60.6" cy="65.5" r="0.45" fill="#ffffff" opacity="0.65" />
        </g>

        {/* nose + whiskers (always visible) */}
        <path d="M50 72 L48.4 70.4 Q50 69.7 51.6 70.4 Z" fill="#ad93ff" />
        <g stroke="#ffffff" strokeOpacity="0.14" strokeWidth="0.8" strokeLinecap="round">
          <line x1="30" y1="71" x2="44" y2="72" />
          <line x1="30" y1="75" x2="44" y2="74.5" />
        </g>
      </g>
    </svg>
  );
}
