"use client";

import {
  Brain,
  CircuitBoard,
  Monitor as MonitorIcon,
  MoveRight,
  Phone,
  Trophy,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { getAccent } from "@/lib/accents";
import { workshopObjects } from "@/data/workshop";
import type { WorkshopObjectDef } from "@/lib/types";
import { cn } from "@/lib/utils";
import { WorkshopObject } from "@/components/WorkshopObject";
import { MonitorArt } from "@/components/workshop/MonitorArt";
import { SolderingArt } from "@/components/workshop/SolderingArt";
import { WhiteboardArt } from "@/components/workshop/WhiteboardArt";
import { TrophyShelfArt } from "@/components/workshop/TrophyShelfArt";
import { ToolboxArt } from "@/components/workshop/ToolboxArt";
import { DeskPhoneArt } from "@/components/workshop/DeskPhoneArt";

/** Render the right placeholder artwork for an object id. Swap art here. */
function renderArt(id: string, active: boolean) {
  switch (id) {
    case "monitor":
      return <MonitorArt active={active} />;
    case "soldering-station":
      return <SolderingArt active={active} />;
    case "whiteboard":
      return <WhiteboardArt active={active} />;
    case "trophy-shelf":
      return <TrophyShelfArt active={active} />;
    case "toolbox":
      return <ToolboxArt active={active} />;
    case "desk-phone":
      return <DeskPhoneArt active={active} />;
    default:
      return null;
  }
}

const iconMap: Record<string, LucideIcon> = {
  Monitor: MonitorIcon,
  CircuitBoard,
  Brain,
  Trophy,
  Wrench,
  Phone,
};

interface WorkshopSceneProps {
  onSelect: (def: WorkshopObjectDef, rect: DOMRect) => void;
}

export function WorkshopScene({ onSelect }: WorkshopSceneProps) {
  return (
    <div className="w-full">
      {/* ---------- Desktop / tablet: the interactive room ---------- */}
      <div
        className="relative mx-auto hidden md:block"
        style={{
          width: "min(92vw, calc((100dvh - 27.5rem) * 1.6))",
          aspectRatio: "16 / 10",
        }}
      >
        {/* desk surface */}
        <div
          aria-hidden
          className="absolute inset-x-[1%] top-[63%] h-[13%] rounded-2xl border-t border-white/10 bg-gradient-to-b from-[#1a2132] to-[#0c1019] shadow-[0_30px_80px_-30px_#000]"
        />
        <div
          aria-hidden
          className="absolute inset-x-[3%] top-[63%] h-[2px] rounded bg-gradient-to-r from-transparent via-neon/40 to-transparent"
        />
        <div
          aria-hidden
          className="absolute inset-x-[8%] bottom-[2%] h-10 rounded-[50%] bg-black/40 blur-xl"
        />

        {workshopObjects.map((def) => (
          <WorkshopObject
            key={def.id}
            def={def}
            art={(active) => renderArt(def.id, active)}
            onSelect={onSelect}
          />
        ))}
      </div>

      {/* ---------- Mobile: tap-friendly portal grid ---------- */}
      <div className="grid grid-cols-2 gap-3 md:hidden">
        {workshopObjects.map((def, i) => {
          const a = getAccent(def.accent);
          const Icon = iconMap[def.icon] ?? MonitorIcon;
          return (
            <motion.button
              key={def.id}
              type="button"
              onClick={(e) =>
                onSelect(def, e.currentTarget.getBoundingClientRect())
              }
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              whileTap={{ scale: 0.97 }}
              aria-label={`${def.label}: ${def.caption}. Open page.`}
              className={cn(
                "group panel flex min-h-[8.5rem] flex-col gap-3 rounded-2xl border p-4 text-left transition-colors",
                a.borderHover,
              )}
            >
              <span
                className={cn(
                  "grid h-11 w-11 place-items-center rounded-xl border",
                  a.border,
                  a.bgSoft,
                )}
              >
                <Icon className={cn("h-5 w-5", a.text)} aria-hidden />
              </span>
              <span className="mt-auto">
                <span className="block text-sm font-semibold text-ink">
                  {def.label}
                </span>
                <span className="mt-0.5 block text-xs text-muted">
                  {def.caption}
                </span>
              </span>
              <MoveRight
                className={cn("h-4 w-4 transition-transform group-hover:translate-x-1", a.text)}
                aria-hidden
              />
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
