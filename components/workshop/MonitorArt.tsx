import { cn } from "@/lib/utils";

/** Main monitor → Software Projects. Cyan screen glow + scanline + power LED. */
export function MonitorArt({
  active = false,
  className,
}: {
  active?: boolean;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 320 250"
      className={cn("h-auto w-full", className)}
      role="presentation"
    >
      <defs>
        <linearGradient id="mon-bezel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#222a3f" />
          <stop offset="1" stopColor="#11151f" />
        </linearGradient>
        <linearGradient id="mon-screen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#06222b" />
          <stop offset="1" stopColor="#04141b" />
        </linearGradient>
        <linearGradient id="mon-stand" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2a3247" />
          <stop offset="1" stopColor="#161b27" />
        </linearGradient>
        <radialGradient id="mon-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#3ee0ff" />
          <stop offset="1" stopColor="#3ee0ff" stopOpacity="0" />
        </radialGradient>
        <clipPath id="mon-clip">
          <rect x="26" y="20" width="268" height="150" rx="9" />
        </clipPath>
      </defs>

      {/* screen glow */}
      <ellipse
        cx="160"
        cy="92"
        rx="155"
        ry="105"
        fill="url(#mon-glow)"
        opacity={active ? 0.5 : 0.32}
        className="transition-opacity duration-300"
      />

      {/* stand */}
      <rect x="150" y="168" width="20" height="40" fill="url(#mon-stand)" />
      <path d="M120 214 h80 l-10 -10 H130 Z" fill="url(#mon-stand)" />
      <rect x="116" y="212" width="88" height="8" rx="4" fill="#2a3247" />

      {/* bezel */}
      <rect
        x="14"
        y="8"
        width="292"
        height="174"
        rx="14"
        fill="url(#mon-bezel)"
        stroke="#39435e"
        strokeWidth="1.5"
      />

      {/* screen */}
      <rect x="26" y="20" width="268" height="150" rx="9" fill="url(#mon-screen)" />

      {/* screen content (flickers subtly) */}
      <g clipPath="url(#mon-clip)" className="anim-flicker">
        {/* top app bar */}
        <rect x="26" y="20" width="268" height="20" fill="#0a2a35" />
        <circle cx="40" cy="30" r="3" fill="#ff6b6b" />
        <circle cx="52" cy="30" r="3" fill="#ffd166" />
        <circle cx="64" cy="30" r="3" fill="#45e6a6" />
        <rect x="120" y="26" width="120" height="8" rx="4" fill="#0e3a47" />

        {/* sidebar */}
        <rect x="34" y="48" width="58" height="114" rx="6" fill="#072530" />
        <rect x="42" y="58" width="42" height="6" rx="3" fill="#11505f" />
        <rect x="42" y="70" width="34" height="6" rx="3" fill="#0d3f4c" />
        <rect x="42" y="82" width="40" height="6" rx="3" fill="#0d3f4c" />
        <rect x="42" y="94" width="30" height="6" rx="3" fill="#0d3f4c" />

        {/* chart card */}
        <rect x="100" y="48" width="180" height="64" rx="6" fill="#08303d" />
        <polyline
          points="110,98 130,84 150,90 172,66 196,76 220,54 248,62 270,46"
          fill="none"
          stroke="#3ee0ff"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <polyline
          points="110,98 130,84 150,90 172,66 196,76 220,54 248,62 270,46 270,108 110,108"
          fill="#3ee0ff"
          opacity="0.12"
        />

        {/* code lines */}
        <rect x="100" y="122" width="86" height="40" rx="6" fill="#072530" />
        <rect x="108" y="130" width="48" height="5" rx="2.5" fill="#1f6b7d" />
        <rect x="108" y="140" width="64" height="5" rx="2.5" fill="#11505f" />
        <rect x="108" y="150" width="40" height="5" rx="2.5" fill="#0d3f4c" />
        {/* stat card */}
        <rect x="194" y="122" width="86" height="40" rx="6" fill="#072530" />
        <rect x="202" y="130" width="30" height="10" rx="3" fill="#1f6b7d" />
        <rect x="202" y="146" width="60" height="5" rx="2.5" fill="#0d3f4c" />

        {/* moving scanline */}
        <rect
          x="26"
          y="20"
          width="268"
          height="26"
          fill="#3ee0ff"
          opacity="0.06"
          className="anim-scan"
        />
      </g>

      {/* glass highlight */}
      <path
        d="M26 20 h268 v10 q-130 26 -268 0 Z"
        fill="#ffffff"
        opacity="0.04"
      />

      {/* power LED */}
      <circle cx="160" cy="176" r="2.6" fill="#3ee0ff" className="anim-blink" />
    </svg>
  );
}
