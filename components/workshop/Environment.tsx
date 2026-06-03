import { cn } from "@/lib/utils";

/** Dark brick back wall (SVG pattern) + grime + vignette. */
export function BrickWall({ className }: { className?: string }) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      <svg
        className="h-full w-full"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 840 520"
        aria-hidden
      >
        <defs>
          <linearGradient id="brick-face" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#1d1714" />
            <stop offset="1" stopColor="#130f0d" />
          </linearGradient>
          <pattern
            id="bricks"
            width="84"
            height="44"
            patternUnits="userSpaceOnUse"
          >
            <rect width="84" height="44" fill="#0b0908" />
            <rect x="2" y="2" width="38" height="17" rx="2" fill="url(#brick-face)" />
            <rect x="44" y="2" width="38" height="17" rx="2" fill="url(#brick-face)" />
            <rect x="-19" y="24" width="38" height="17" rx="2" fill="url(#brick-face)" />
            <rect x="23" y="24" width="38" height="17" rx="2" fill="url(#brick-face)" />
            <rect x="65" y="24" width="38" height="17" rx="2" fill="url(#brick-face)" />
          </pattern>
        </defs>
        <rect width="840" height="520" fill="#0b0908" />
        <rect width="840" height="520" fill="url(#bricks)" />
        {/* a few darker / lighter bricks for variation */}
        <rect x="44" y="68" width="38" height="17" rx="2" fill="#241c18" opacity="0.6" />
        <rect x="234" y="200" width="38" height="17" rx="2" fill="#0e0b0a" />
        <rect x="612" y="112" width="38" height="17" rx="2" fill="#241c18" opacity="0.5" />
        <rect x="700" y="376" width="38" height="17" rx="2" fill="#0e0b0a" />
        <rect x="120" y="420" width="38" height="17" rx="2" fill="#0e0b0a" />
      </svg>

      {/* uneven grime + vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 12%, rgba(80,90,120,0.10), transparent 45%), radial-gradient(120% 120% at 50% 60%, transparent 50%, rgba(0,0,0,0.55) 100%)",
        }}
      />
    </div>
  );
}

/** The workbench: perspective tabletop + apron, with edge light + neon sheen. */
export function Workbench({ className }: { className?: string }) {
  return (
    <div className={cn("absolute inset-x-0 bottom-0 top-[58%]", className)}>
      {/* contact shadow where desk meets wall */}
      <div className="absolute inset-x-0 -top-6 h-8 bg-gradient-to-b from-black/60 to-transparent" />

      {/* tabletop */}
      <div
        className="absolute inset-x-0 top-0 h-[34%]"
        style={{
          background:
            "linear-gradient(180deg, #211a15 0%, #181310 60%, #120e0c 100%)",
        }}
      >
        {/* wood grain */}
        <div
          className="absolute inset-0 opacity-30 mix-blend-overlay"
          style={{
            background:
              "repeating-linear-gradient(90deg, rgba(255,255,255,0.05) 0 2px, transparent 2px 7px), repeating-linear-gradient(90deg, rgba(0,0,0,0.18) 0 1px, transparent 1px 26px)",
          }}
        />
        {/* neon reflection sheen on the surface */}
        <div
          className="absolute inset-x-[18%] top-0 h-full opacity-70 blur-md"
          style={{
            background:
              "radial-gradient(60% 120% at 50% 0%, rgba(62,224,255,0.22), rgba(140,108,255,0.12) 45%, transparent 72%)",
          }}
        />
      </div>

      {/* bright front edge catching the neon */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon/50 to-transparent" />
      <div className="absolute inset-x-0 top-[2px] h-[3px] bg-gradient-to-b from-white/10 to-transparent" />

      {/* apron / front face */}
      <div
        className="absolute inset-x-0 top-[34%] bottom-0"
        style={{
          background:
            "linear-gradient(180deg, #140f0c 0%, #0c0907 100%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-20 mix-blend-overlay"
          style={{
            background:
              "repeating-linear-gradient(90deg, rgba(255,255,255,0.04) 0 1px, transparent 1px 40px)",
          }}
        />
      </div>
    </div>
  );
}
