import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { CircuitBoard, DevBoard, StickyNote } from "@/components/workshop/props";

type P = { className?: string };
const MONO = "var(--font-geist-mono), monospace";

/* -------- employee badges on lanyards (IBM current, Infosys past) ------- */
export function IbmBadge({ className }: P) {
  return (
    <svg viewBox="0 0 70 176" className={cn("h-auto w-full overflow-visible", className)} aria-hidden>
      <path d="M14 2 L31 60 M56 2 L39 60" stroke="#0b3aa0" strokeWidth="7" fill="none" />
      <path d="M16 4 L31 56" stroke="#3a7bff" strokeWidth="1.4" opacity="0.5" />
      <rect x="30" y="56" width="10" height="11" rx="2" fill="#9aa6b8" />
      <rect x="9" y="64" width="52" height="88" rx="6" fill="#0d1422" stroke="#2f6bff" strokeOpacity="0.5" />
      <rect x="9" y="64" width="52" height="20" rx="6" fill="#0f1d33" />
      <text x="35" y="78" textAnchor="middle" fontFamily={MONO} fontSize="12" fontWeight="700" fill="#4f8bff">
        IBM
      </text>
      <line x1="16" y1="93" x2="54" y2="93" stroke="#2f6bff" strokeOpacity="0.3" />
      <text x="35" y="108" textAnchor="middle" fontFamily={MONO} fontSize="7.5" fill="#9fc0ff">
        watsonx
      </text>
      <text x="35" y="118" textAnchor="middle" fontFamily={MONO} fontSize="5.4" fill="#7c89a6">
        Orchestrate
      </text>
      <text x="35" y="130" textAnchor="middle" fontFamily={MONO} fontSize="5" fill="#56607a">
        SWE INTERN
      </text>
      <g fill="#c7d2e6">
        {[0, 3, 5, 9, 12, 15, 19, 22, 26, 30, 34, 38].map((x, i) => (
          <rect key={x} x={18 + x} y="137" width={i % 2 ? 1 : 2} height="11" />
        ))}
      </g>
    </svg>
  );
}

export function InfosysBadge({ className }: P) {
  return (
    <svg viewBox="0 0 70 176" className={cn("h-auto w-full overflow-visible", className)} aria-hidden>
      <path d="M14 2 L31 60 M56 2 L39 60" stroke="#0c5a6b" strokeWidth="7" fill="none" />
      <path d="M16 4 L31 56" stroke="#2fd0d8" strokeWidth="1.4" opacity="0.5" />
      <rect x="30" y="56" width="10" height="11" rx="2" fill="#9aa6b8" />
      <rect x="9" y="64" width="52" height="88" rx="6" fill="#0a1620" stroke="#19b3c6" strokeOpacity="0.5" />
      <rect x="9" y="64" width="52" height="20" rx="6" fill="#0e2630" />
      <text x="35" y="78" textAnchor="middle" fontFamily={MONO} fontSize="10" fontWeight="700" fill="#2fd0d8">
        Infosys
      </text>
      <line x1="16" y1="93" x2="54" y2="93" stroke="#19b3c6" strokeOpacity="0.3" />
      <text x="35" y="108" textAnchor="middle" fontFamily={MONO} fontSize="7" fill="#8fd9e0">
        AI Advisor
      </text>
      <text x="35" y="118" textAnchor="middle" fontFamily={MONO} fontSize="5.2" fill="#7c89a6">
        Platform
      </text>
      <text x="35" y="130" textAnchor="middle" fontFamily={MONO} fontSize="5" fill="#56707a">
        SWE INTERN &apos;25
      </text>
      <g fill="#c7d2e6">
        {[0, 3, 5, 9, 12, 15, 19, 22, 26, 30, 34, 38].map((x, i) => (
          <rect key={x} x={18 + x} y="137" width={i % 2 ? 1 : 2} height="11" />
        ))}
      </g>
    </svg>
  );
}

/* -------- Infosys folder (past internship) ----------------------------- */
export function InfosysFolder({ className }: P) {
  return (
    <svg viewBox="0 0 132 88" className={cn("h-auto w-full", className)} aria-hidden>
      <rect x="84" y="12" width="36" height="24" rx="1" fill="#e9eef7" opacity="0.1" transform="rotate(7 84 12)" />
      <path
        d="M6 22 h40 l8 8 h66 a4 4 0 0 1 4 4 v44 a4 4 0 0 1 -4 4 H6 a4 4 0 0 1 -4 -4 V26 a4 4 0 0 1 4 -4 Z"
        fill="#1a1c22"
        stroke="#3a3f4a"
      />
      <rect x="4" y="34" width="124" height="46" rx="3" fill="#20242e" opacity="0.55" />
      <text x="14" y="56" fontFamily={MONO} fontSize="11" fontWeight="600" fill="#aeb8d0">
        AI Advisor Platform
      </text>
      <text x="14" y="70" fontFamily={MONO} fontSize="8" fill="#6f7b92">
        Infosys · Summer &apos;25
      </text>
    </svg>
  );
}

/* -------- stack of engineering books ----------------------------------- */
export function Books({ className }: P) {
  const books = [
    { c: "#2b5fb0", t: "DDIA" },
    { c: "#3a3f4a", t: "CLEAN CODE" },
    { c: "#7a3b3b", t: "CLRS" },
    { c: "#2f6b48", t: "PRAGMATIC" },
  ];
  return (
    <svg viewBox="0 0 124 112" className={cn("h-auto w-full", className)} aria-hidden>
      {books.map((b, i) => (
        <g key={b.t} transform={`translate(${i * 2} ${78 - i * 20})`}>
          <rect x="6" y="0" width="110" height="18" rx="2" fill={b.c} />
          <rect x="6" y="0" width="110" height="4" rx="2" fill="#ffffff" opacity="0.12" />
          <rect x="11" y="5" width="5" height="9" fill="#ffffff" opacity="0.22" />
          <text x="22" y="13" fontFamily={MONO} fontSize="8" fill="#e9eef7" opacity="0.85">
            {b.t}
          </text>
        </g>
      ))}
    </svg>
  );
}

/* -------- tiny "AI Track" win trophy (TeleKinetics) -------------------- */
export function MiniTrophy({ className }: P) {
  return (
    <svg viewBox="0 0 64 88" className={cn("h-auto w-full overflow-visible", className)} aria-hidden>
      <defs>
        <linearGradient id="mt-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffe08a" />
          <stop offset="1" stopColor="#c8901f" />
        </linearGradient>
      </defs>
      <ellipse cx="32" cy="83" rx="20" ry="3" fill="#000" opacity="0.4" />
      <ellipse cx="32" cy="32" rx="22" ry="19" fill="#ffd27a" opacity="0.16" />
      <path d="M18 18 q-9 2 -9 11 q0 7 8 8" fill="none" stroke="url(#mt-gold)" strokeWidth="3" />
      <path d="M46 18 q9 2 9 11 q0 7 -8 8" fill="none" stroke="url(#mt-gold)" strokeWidth="3" />
      <path d="M18 12 h28 v8 q0 16 -14 20 q-14 -4 -14 -20 Z" fill="url(#mt-gold)" />
      <rect x="29" y="40" width="6" height="10" fill="url(#mt-gold)" />
      <rect x="22" y="50" width="20" height="5" rx="1" fill="url(#mt-gold)" />
      <rect x="16" y="55" width="32" height="15" rx="2" fill="#1a2030" stroke="#2a3346" />
      <text x="32" y="63" textAnchor="middle" fontFamily={MONO} fontSize="6.5" fill="#ffd27a">
        AI TRACK
      </text>
      <text x="32" y="70" textAnchor="middle" fontFamily={MONO} fontSize="5" fill="#9aa6b8">
        1st · Axxess
      </text>
    </svg>
  );
}

/* -------- GuardianGram safety notification (easter egg) ---------------- */
export function GuardianGramNotif({ className }: P) {
  return (
    <svg viewBox="0 0 162 56" className={cn("h-auto w-full", className)} aria-hidden>
      <rect x="2" y="2" width="158" height="52" rx="13" fill="#0d1422" opacity="0.96" stroke="#22406a" />
      <rect x="10" y="12" width="32" height="32" rx="8" fill="#13233f" />
      <g transform="translate(26 28)" stroke="#3ee0ff" strokeWidth="2" fill="none" strokeLinejoin="round" strokeLinecap="round">
        <path d="M0 -9 l9 4 v6 q0 8 -9 11 q-9 -3 -9 -11 v-6 Z" />
        <path d="M-4 0 l3 3 6 -7" />
      </g>
      <text x="50" y="25" fontFamily="var(--font-geist-sans), sans-serif" fontSize="10.5" fontWeight="600" fill="#e9eef7">
        GuardianGram
      </text>
      <text x="50" y="39" fontFamily="var(--font-geist-sans), sans-serif" fontSize="8.5" fill="#9aa6b8">
        Safe check-in received
      </text>
      <text x="140" y="18" fontFamily={MONO} fontSize="6.5" fill="#6f7b92">
        now
      </text>
    </svg>
  );
}

/* -------- '95 SC300 project-car sticker (hardware page) ----------------- */
export function CarSticker({ className }: P) {
  return (
    <svg viewBox="0 0 184 100" className={cn("h-auto w-full overflow-visible", className)} aria-hidden>
      <rect x="4" y="4" width="176" height="76" rx="12" fill="#0d1422" stroke="#2a3346" />
      <rect x="4" y="4" width="176" height="76" rx="12" fill="none" stroke="#3ee0ff" strokeOpacity="0.25" strokeDasharray="3 3" />
      {/* body */}
      <path
        d="M20 54 q6 -15 26 -17 q10 -9 30 -9 q22 0 34 11 l22 3 q14 2 14 13 H20 Z"
        fill="#1b2740"
        stroke="#5fa8ff"
        strokeWidth="1.6"
      />
      {/* greenhouse */}
      <path d="M50 38 q9 -11 26 -11 q17 0 24 9 l-5 8 H54 Z" fill="#0a1626" stroke="#5fa8ff" strokeWidth="1.2" />
      {/* wheels */}
      <g fill="#0b0f17" stroke="#5fa8ff" strokeWidth="1.4">
        <circle cx="50" cy="60" r="9" />
        <circle cx="122" cy="60" r="9" />
      </g>
      <circle cx="156" cy="46" r="2.2" fill="#ffd27a" />
      <text x="16" y="94" fontFamily={MONO} fontSize="10.5" fill="#9fc6ff">
        &apos;95 SC300 · the weekend project
      </text>
    </svg>
  );
}

/* -------- repair tools -------------------------------------------------- */
export function Multimeter({ className }: P) {
  return (
    <svg viewBox="0 0 120 172" className={cn("h-auto w-full overflow-visible", className)} aria-hidden>
      <path d="M30 150 C10 130 8 100 26 86" fill="none" stroke="#e03b3b" strokeWidth="3" />
      <path d="M90 150 C110 130 112 100 94 86" fill="none" stroke="#1a1f2a" strokeWidth="3" />
      <rect x="20" y="10" width="80" height="120" rx="10" fill="#d9a52a" stroke="#a87d18" />
      <rect x="26" y="16" width="68" height="40" rx="4" fill="#10241c" stroke="#0a3a23" />
      <text x="88" y="45" textAnchor="end" fontFamily={MONO} fontSize="18" fill="#39d98a">
        0.00
      </text>
      <text x="30" y="28" fontFamily={MONO} fontSize="6" fill="#39d98a">
        DC V
      </text>
      <circle cx="60" cy="92" r="22" fill="#1a1c22" stroke="#0c0e12" />
      <line x1="60" y1="92" x2="60" y2="74" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="40" cy="122" r="3" fill="#e03b3b" />
      <circle cx="80" cy="122" r="3" fill="#1a1f2a" />
    </svg>
  );
}

export function FluxBottle({ className }: P) {
  return (
    <svg viewBox="0 0 50 122" className={cn("h-auto w-full", className)} aria-hidden>
      <path d="M14 116 h22 v-44 q0 -8 -6 -10 v-10 h-4 v10 q-6 2 -6 10 Z" fill="#11151f" stroke="#2a3346" />
      <rect x="22" y="40" width="6" height="10" rx="1" fill="#2a3346" />
      <line x1="25" y1="40" x2="25" y2="30" stroke="#9aa6b8" strokeWidth="1.5" />
      <rect x="14" y="78" width="22" height="28" fill="#e9eef7" opacity="0.9" />
      <text x="25" y="92" textAnchor="middle" fontFamily={MONO} fontSize="7" fontWeight="700" fill="#0b0f17">
        FLUX
      </text>
      <text x="25" y="101" textAnchor="middle" fontFamily={MONO} fontSize="4.4" fill="#0b0f17">
        no-clean
      </text>
    </svg>
  );
}

export function Screwdrivers({ className }: P) {
  const colors = ["#e03b3b", "#2f6bff", "#39d98a", "#d9a52a", "#ad93ff"];
  return (
    <svg viewBox="0 0 170 70" className={cn("h-auto w-full", className)} aria-hidden>
      <rect x="2" y="40" width="166" height="26" rx="4" fill="#1a140f" stroke="#3a2f25" />
      {colors.map((c, i) => (
        <g key={c} transform={`translate(${18 + i * 30} 0)`}>
          <rect x="-4" y="44" width="8" height="18" rx="2" fill="#2a2018" />
          <rect x="-3.5" y="8" width="7" height="22" rx="3.5" fill={c} />
          <rect x="-1.2" y="28" width="2.4" height="18" fill="#9aa6b8" />
          <rect x="-1.6" y="44" width="3.2" height="3" fill="#cfd8e6" />
        </g>
      ))}
    </svg>
  );
}

/* -------- the repair bench (hardware page) ----------------------------- */
function Bit({
  left,
  top,
  width,
  rotate,
  children,
}: {
  left: number;
  top: number;
  width: number;
  rotate?: number;
  children: ReactNode;
}) {
  return (
    <div
      className="absolute"
      style={{
        left: `${left}%`,
        top: `${top}%`,
        width: `${width}%`,
        transform: rotate ? `rotate(${rotate}deg)` : undefined,
      }}
    >
      {children}
    </div>
  );
}

export function HardwareBench({ className }: P) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-2xl border border-line bg-[#0a0d12] bg-grid-fine p-5 sm:p-6",
        className,
      )}
    >
      <div className="mb-4 flex items-center gap-3">
        <span className="font-mono text-sm text-heat">repair-bench/</span>
        <span className="h-px flex-1 bg-line" />
        <span className="hidden font-mono text-xs text-muted sm:inline">
          board-level · soldering · diagnostics
        </span>
      </div>

      <div className="relative h-[200px] w-full sm:h-[230px]">
        <Bit left={1} top={6} width={13}>
          <Multimeter />
        </Bit>
        <Bit left={16} top={2} width={4.5}>
          <FluxBottle />
        </Bit>
        <Bit left={23} top={34} width={20} rotate={-4}>
          <CircuitBoard />
        </Bit>
        <Bit left={40} top={6} width={23} rotate={2}>
          <DevBoard />
        </Bit>
        <Bit left={2} top={66} width={34}>
          <Screwdrivers />
        </Bit>
        {/* loose components */}
        <svg viewBox="0 0 120 40" className="absolute" style={{ left: "44%", top: "70%", width: "16%" }} aria-hidden>
          <rect x="2" y="14" width="22" height="9" rx="1" fill="#0b0f17" stroke="#2a6b48" />
          <rect x="30" y="10" width="10" height="16" rx="1" fill="#1a1f2a" />
          <circle cx="56" cy="18" r="7" fill="#0b0f17" stroke="#2a6b48" />
          <g stroke="#c2a25a" strokeWidth="2">
            <line x1="70" y1="18" x2="86" y2="18" />
            <line x1="90" y1="14" x2="106" y2="14" />
          </g>
        </svg>
        <Bit left={64} top={20} width={30} rotate={3}>
          <CarSticker />
        </Bit>
        <Bit left={70} top={2} width={11} rotate={-5}>
          <StickyNote accent="heat" lines={["boards by", "day, SC300", "by weekend"]} />
        </Bit>
      </div>
    </div>
  );
}
