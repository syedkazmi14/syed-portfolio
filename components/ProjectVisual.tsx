"use client";

import { useState } from "react";
import Image from "next/image";
import { getAccent } from "@/lib/accents";
import type { Accent, ProjectVisualKind } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ProjectVisualProps {
  kind: ProjectVisualKind;
  accent: Accent;
  /** When set, renders this image instead of the built-in placeholder SVG. */
  image?: string;
  alt?: string;
  className?: string;
  /**
   * Passed to next/image's `sizes` attribute so the browser requests the
   * right resolution from the srcset. Defaults to project-card grid breakpoints.
   */
  sizes?: string;
}

const DEFAULT_SIZES =
  "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw";

/**
 * Project artwork. Renders a real screenshot via next/image when `image` is
 * provided — automatic WebP conversion, lazy loading, and responsive srcset.
 * Falls back to an accent-tinted abstract SVG if the file is missing or fails.
 * Drop screenshots in /public/projects/.
 */
export function ProjectVisual({
  kind,
  accent,
  image,
  alt = "",
  className,
  sizes = DEFAULT_SIZES,
}: ProjectVisualProps) {
  const c = getAccent(accent).hex;
  const [failed, setFailed] = useState(false);

  if (image && !failed) {
    return (
      // Wrapper must be `relative` so next/image fill can position against it.
      <div className={cn("relative h-full w-full overflow-hidden", className)}>
        <Image
          src={image}
          alt={alt}
          fill
          sizes={sizes}
          className="object-cover"
          onError={() => setFailed(true)}
        />
      </div>
    );
  }

  return (
    <svg
      viewBox="0 0 400 220"
      preserveAspectRatio="xMidYMid slice"
      className={cn("h-full w-full", className)}
      role="presentation"
    >
      <rect width="400" height="220" fill="#0a0e18" />
      {/* faint grid */}
      <g stroke={c} strokeWidth="1" opacity="0.08">
        {Array.from({ length: 9 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="220" />
        ))}
        {Array.from({ length: 5 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 50} x2="400" y2={i * 50} />
        ))}
      </g>
      {/* glow */}
      <ellipse cx="200" cy="110" rx="180" ry="120" fill={c} opacity="0.07" />
      <Motif kind={kind} c={c} />
    </svg>
  );
}

function Motif({ kind, c }: { kind: ProjectVisualKind; c: string }) {
  switch (kind) {
    case "map":
      return (
        <g>
          <path
            d="M40 60 q60 -20 120 10 q70 30 120 5 q40 -16 80 6"
            fill="none"
            stroke={c}
            strokeWidth="2"
            opacity="0.5"
            strokeDasharray="6 6"
          />
          <path
            d="M60 160 q80 30 150 -10 q70 -40 140 -5"
            fill="none"
            stroke={c}
            strokeWidth="2"
            opacity="0.4"
          />
          {[
            [120, 90],
            [230, 70],
            [300, 130],
          ].map(([x, y], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r="16" fill="none" stroke={c} opacity="0.4" className="anim-pulse-glow" />
              <path
                d={`M${x} ${y - 14} a9 9 0 1 1 -0.1 0 Z`}
                fill={c}
                opacity="0.9"
              />
              <circle cx={x} cy={y - 8} r="3" fill="#0a0e18" />
            </g>
          ))}
        </g>
      );
    case "pose":
      return (
        <g stroke={c} strokeWidth="3" strokeLinecap="round" fill="none">
          <circle cx="200" cy="60" r="16" fill={c} opacity="0.85" stroke="none" />
          <line x1="200" y1="76" x2="200" y2="130" />
          <line x1="200" y1="90" x2="160" y2="120" />
          <line x1="200" y1="90" x2="244" y2="112" />
          <line x1="200" y1="130" x2="172" y2="180" />
          <line x1="200" y1="130" x2="232" y2="178" />
          <g fill={c} stroke="none">
            {[
              [160, 120],
              [244, 112],
              [200, 90],
              [200, 130],
              [172, 180],
              [232, 178],
            ].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="5" />
            ))}
          </g>
          <path d="M250 100 q26 14 0 30" opacity="0.45" strokeDasharray="4 5" />
          <path d="M150 110 q-26 16 0 34" opacity="0.45" strokeDasharray="4 5" />
        </g>
      );
    case "shield":
      return (
        <g>
          <path
            d="M200 50 l54 20 v44 q0 50 -54 66 q-54 -16 -54 -66 V70 Z"
            fill={c}
            opacity="0.12"
            stroke={c}
            strokeWidth="2.5"
          />
          <path
            d="M176 110 l16 16 32 -36"
            fill="none"
            stroke={c}
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <g stroke={c} strokeWidth="1.5" opacity="0.4">
            <line x1="120" y1="70" x2="160" y2="100" />
            <line x1="280" y1="70" x2="240" y2="100" />
            <line x1="110" y1="160" x2="160" y2="140" />
            <line x1="290" y1="160" x2="240" y2="140" />
          </g>
          <g fill={c}>
            <circle cx="120" cy="70" r="5" />
            <circle cx="280" cy="70" r="5" />
            <circle cx="110" cy="160" r="5" />
            <circle cx="290" cy="160" r="5" />
          </g>
        </g>
      );
    case "tank":
      return (
        <g>
          <rect x="150" y="56" width="100" height="120" rx="14" fill="none" stroke={c} strokeWidth="2.5" />
          <rect x="150" y="120" width="100" height="56" rx="14" fill={c} opacity="0.25" />
          <line x1="150" y1="120" x2="250" y2="120" stroke={c} strokeWidth="2" />
          {[78, 100, 142, 164].map((y, i) => (
            <line key={i} x1="250" y1={y} x2="266" y2={y} stroke={c} strokeWidth="2" opacity="0.6" />
          ))}
          {/* gauge */}
          <circle cx="312" cy="84" r="22" fill="none" stroke={c} strokeWidth="2.5" opacity="0.6" />
          <line x1="312" y1="84" x2="324" y2="72" stroke={c} strokeWidth="2.5" strokeLinecap="round" />
          {/* route */}
          <path d="M70 150 q30 -30 60 0 q30 30 60 6" fill="none" stroke={c} strokeWidth="2" strokeDasharray="5 6" opacity="0.55" />
          <circle cx="70" cy="150" r="4" fill={c} />
        </g>
      );
    case "heatmap":
      return (
        <g>
          {Array.from({ length: 6 }).map((_, r) =>
            Array.from({ length: 10 }).map((_, col) => {
              const d =
                Math.hypot(col - 5, r - 3) / 6; // 0..~1 from center
              const op = Math.max(0.06, 0.75 - d);
              return (
                <rect
                  key={`${r}-${col}`}
                  x={40 + col * 32}
                  y={26 + r * 28}
                  width="28"
                  height="24"
                  rx="4"
                  fill={c}
                  opacity={op}
                />
              );
            }),
          )}
          <path
            d="M120 150 q60 -70 130 -30"
            fill="none"
            stroke="#fff"
            strokeWidth="2"
            opacity="0.25"
            strokeDasharray="4 6"
          />
        </g>
      );
    case "gauge":
      return (
        <g>
          <path
            d="M120 160 A80 80 0 0 1 280 160"
            fill="none"
            stroke={c}
            strokeWidth="3"
            opacity="0.3"
          />
          <path
            d="M120 160 A80 80 0 0 1 232 102"
            fill="none"
            stroke={c}
            strokeWidth="6"
            strokeLinecap="round"
          />
          <line x1="200" y1="160" x2="244" y2="120" stroke={c} strokeWidth="3" strokeLinecap="round" />
          <circle cx="200" cy="160" r="7" fill={c} />
          <g fill={c} opacity="0.6">
            <rect x="150" y="176" width="14" height="20" rx="2" />
            <rect x="172" y="168" width="14" height="28" rx="2" />
            <rect x="194" y="176" width="14" height="20" rx="2" />
            <rect x="216" y="160" width="14" height="36" rx="2" />
            <rect x="238" y="170" width="14" height="26" rx="2" />
          </g>
        </g>
      );
    case "detect":
      return (
        <g>
          {[
            [80, 60, 120, 80, "coil 0.98"],
            [220, 110, 110, 70, "coil 0.91"],
          ].map(([x, y, w, h, label], i) => (
            <g key={i}>
              <rect
                x={x as number}
                y={y as number}
                width={w as number}
                height={h as number}
                rx="4"
                fill="none"
                stroke={c}
                strokeWidth="2.5"
              />
              <rect x={x as number} y={(y as number) - 16} width="74" height="16" fill={c} />
              <text
                x={(x as number) + 6}
                y={(y as number) - 4}
                fontFamily="monospace"
                fontSize="10"
                fill="#04131a"
              >
                {label as string}
              </text>
            </g>
          ))}
          <circle cx="140" cy="100" r="18" fill="none" stroke={c} strokeWidth="2" opacity="0.4" />
          <circle cx="275" cy="145" r="14" fill="none" stroke={c} strokeWidth="2" opacity="0.4" />
        </g>
      );
    case "fps":
      return (
        <g>
          {/* perspective floor */}
          <g stroke={c} strokeWidth="1.5" opacity="0.3">
            <line x1="0" y1="220" x2="200" y2="120" />
            <line x1="100" y1="220" x2="200" y2="120" />
            <line x1="200" y1="220" x2="200" y2="120" />
            <line x1="300" y1="220" x2="200" y2="120" />
            <line x1="400" y1="220" x2="200" y2="120" />
            <line x1="40" y1="180" x2="360" y2="180" />
            <line x1="80" y1="150" x2="320" y2="150" />
          </g>
          {/* crosshair */}
          <g stroke={c} strokeWidth="2.5">
            <circle cx="200" cy="100" r="22" fill="none" opacity="0.8" />
            <line x1="200" y1="68" x2="200" y2="86" />
            <line x1="200" y1="114" x2="200" y2="132" />
            <line x1="168" y1="100" x2="186" y2="100" />
            <line x1="214" y1="100" x2="232" y2="100" />
          </g>
          <circle cx="200" cy="100" r="2.5" fill={c} />
        </g>
      );
    default:
      return null;
  }
}
