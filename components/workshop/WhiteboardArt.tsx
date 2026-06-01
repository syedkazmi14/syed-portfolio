import { cn } from "@/lib/utils";

/** Whiteboard → Research / AI work. Neural net + architecture sketches. */
export function WhiteboardArt({
  active = false,
  className,
}: {
  active?: boolean;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 320 240"
      className={cn("h-auto w-full", className)}
      role="presentation"
    >
      <defs>
        <linearGradient id="wb-frame" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#39435e" />
          <stop offset="1" stopColor="#1d2433" />
        </linearGradient>
        <linearGradient id="wb-surface" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0d1422" />
          <stop offset="1" stopColor="#0a1019" />
        </linearGradient>
        <radialGradient id="wb-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#45e6a6" />
          <stop offset="1" stopColor="#45e6a6" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse
        cx="160"
        cy="110"
        rx="150"
        ry="100"
        fill="url(#wb-glow)"
        opacity={active ? 0.28 : 0.16}
        className="transition-opacity duration-300"
      />

      {/* frame + surface */}
      <rect x="10" y="14" width="300" height="184" rx="10" fill="url(#wb-frame)" />
      <rect x="18" y="22" width="284" height="168" rx="5" fill="url(#wb-surface)" />

      {/* faint grid */}
      <g stroke="#172234" strokeWidth="1" opacity="0.6">
        <line x1="80" y1="22" x2="80" y2="190" />
        <line x1="160" y1="22" x2="160" y2="190" />
        <line x1="240" y1="22" x2="240" y2="190" />
        <line x1="18" y1="76" x2="302" y2="76" />
        <line x1="18" y1="134" x2="302" y2="134" />
      </g>

      {/* title */}
      <text x="30" y="44" fontFamily="monospace" fontSize="11" fill="#45e6a6">
        research/
      </text>

      {/* neural network sketch */}
      <g stroke="#45e6a6" strokeWidth="1.2" opacity="0.75">
        <line x1="46" y1="92" x2="92" y2="78" />
        <line x1="46" y1="92" x2="92" y2="106" />
        <line x1="46" y1="92" x2="92" y2="134" />
        <line x1="46" y1="120" x2="92" y2="78" />
        <line x1="46" y1="120" x2="92" y2="106" />
        <line x1="46" y1="120" x2="92" y2="134" />
        <line x1="92" y1="78" x2="138" y2="106" />
        <line x1="92" y1="106" x2="138" y2="106" />
        <line x1="92" y1="134" x2="138" y2="106" />
      </g>
      <g fill="#0a1019" stroke="#45e6a6" strokeWidth="1.6">
        <circle cx="46" cy="92" r="6" />
        <circle cx="46" cy="120" r="6" />
        <circle cx="92" cy="78" r="6" />
        <circle cx="92" cy="106" r="6" />
        <circle cx="92" cy="134" r="6" />
        <circle cx="138" cy="106" r="7" fill="#0e2a20" />
      </g>

      {/* architecture boxes */}
      <g stroke="#3ee0ff" strokeWidth="1.4" fill="#08222b">
        <rect x="178" y="70" width="46" height="24" rx="4" />
        <rect x="252" y="70" width="46" height="24" rx="4" />
        <rect x="215" y="120" width="46" height="24" rx="4" />
      </g>
      <g stroke="#3ee0ff" strokeWidth="1.4" opacity="0.8">
        <line x1="224" y1="82" x2="252" y2="82" />
        <line x1="238" y1="94" x2="238" y2="120" />
      </g>
      <text x="186" y="86" fontFamily="monospace" fontSize="8" fill="#9fe9ff">
        API
      </text>
      <text x="262" y="86" fontFamily="monospace" fontSize="8" fill="#9fe9ff">
        LLM
      </text>
      <text x="224" y="136" fontFamily="monospace" fontSize="8" fill="#9fe9ff">
        DB
      </text>

      {/* equation */}
      <text x="30" y="168" fontFamily="monospace" fontSize="11" fill="#aeb8d0">
        ŷ = σ(Σ wᵢxᵢ + b)
      </text>

      {/* sticky notes */}
      <g transform="rotate(-6 250 168)">
        <rect x="232" y="150" width="40" height="36" rx="2" fill="#45e6a6" opacity="0.9" />
        <line x1="238" y1="160" x2="266" y2="160" stroke="#0a3a28" strokeWidth="1.4" />
        <line x1="238" y1="168" x2="262" y2="168" stroke="#0a3a28" strokeWidth="1.4" />
        <line x1="238" y1="176" x2="266" y2="176" stroke="#0a3a28" strokeWidth="1.4" />
      </g>

      {/* marker tray */}
      <rect x="10" y="198" width="300" height="12" rx="4" fill="url(#wb-frame)" />
      <rect x="120" y="200" width="60" height="6" rx="3" fill="#3ee0ff" />
      <rect x="120" y="200" width="14" height="6" rx="3" fill="#cfd8e6" />
    </svg>
  );
}
