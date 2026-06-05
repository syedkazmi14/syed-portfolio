"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import {
  Brain,
  CircuitBoard as CircuitIcon,
  Monitor as MonitorIcon,
  MoveRight,
  Phone,
  Trophy,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { getAccent } from "@/lib/accents";
import { workshopObjects } from "@/data/workshop";
import type { WorkshopObjectDef } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ParallaxLayer, ParallaxStage } from "@/components/parallax/Parallax";
import { WorkshopObject } from "@/components/WorkshopObject";
import { NeonSign } from "@/components/NeonSign";
import { BrickWall, Workbench } from "@/components/workshop/Environment";
import { SleepingCat } from "@/components/workshop/SleepingCat";
import {
  BlueprintSheet,
  CableDrape,
  CircuitBoard,
  DeskLamp,
  DevBoard,
  Keyboard,
  Mouse,
  Mug,
  Plant,
  StickyNote,
} from "@/components/workshop/props";
import { IbmBadge, InfosysBadge } from "@/components/workshop/storytelling";
import { EasterEgg, ENGINEER_QUOTES } from "@/components/workshop/EasterEgg";
import { MonitorStation } from "@/components/workshop/MonitorScreen";
import { SolderingArt } from "@/components/workshop/SolderingArt";
import { WhiteboardArt } from "@/components/workshop/WhiteboardArt";
import { TrophyShelfArt } from "@/components/workshop/TrophyShelfArt";
import { ToolboxArt } from "@/components/workshop/ToolboxArt";
import { DeskPhoneArt } from "@/components/workshop/DeskPhoneArt";

function renderArt(id: string, active: boolean) {
  switch (id) {
    case "monitor":
      return <MonitorStation active={active} />;
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

/** which depth layer each portal lives in */
const MID = ["monitor", "whiteboard", "trophy-shelf"];
const byId = (id: string) => workshopObjects.find((o) => o.id === id)!;

interface SelectFn {
  onSelect: (def: WorkshopObjectDef, rect: DOMRect) => void;
  /** Cat easter-egg portal — fires the same zoom transition as a regular portal. */
  onSelectCat: (rect: DOMRect) => void;
}

/** absolutely-positioned decoration */
function Placed({
  left,
  top,
  width,
  rotate,
  z,
  children,
}: {
  left: number;
  top: number;
  width: number;
  rotate?: number;
  z?: number;
  children: ReactNode;
}) {
  const style: CSSProperties = {
    left: `${left}%`,
    top: `${top}%`,
    width: `${width}%`,
    zIndex: z,
  };
  if (rotate) style.transform = `rotate(${rotate}deg)`;
  return (
    <div className="absolute" style={style}>
      {children}
    </div>
  );
}

/**
 * The sleeping cat as a clickable portal — matches the hover/tooltip/zoom
 * behaviour of WorkshopObject but uses the iris accent and /cats target.
 */
function CatPortal({ onSelect }: { onSelect: (rect: DOMRect) => void }) {
  const [active, setActive] = useState(false);
  const reduce = useReducedMotion();
  const a = getAccent("iris");
  const hover = reduce ? undefined : { scale: 1.05, y: -5 };

  return (
    <motion.button
      type="button"
      onClick={(e) => onSelect(e.currentTarget.getBoundingClientRect())}
      onHoverStart={() => setActive(true)}
      onHoverEnd={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
      aria-label="Louise & Bailey: cat archive. Open gallery."
      className="pointer-events-auto relative w-full cursor-pointer rounded-xl outline-none"
      whileHover={hover}
      whileFocus={hover}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
    >
      {/* iris halo — same pattern as WorkshopObject */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute -inset-2 -z-10 rounded-[36%] blur-2xl transition-opacity duration-300",
          a.bgSolid,
        )}
        style={{ opacity: active ? 0.24 : 0 }}
      />

      <SleepingCat hovered={active} />

      {/* tooltip — appears above the cat */}
      <AnimatePresence>
        {active ? (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            transition={{ duration: 0.16 }}
            className="pointer-events-none absolute bottom-full left-1/2 z-30 mb-3 w-max -translate-x-1/2"
          >
            <div
              className={cn(
                "panel flex items-center gap-2 rounded-lg border px-3 py-2",
                a.border,
              )}
            >
              <span className={cn("h-1.5 w-1.5 shrink-0 rounded-full", a.bgSolid)} />
              <span className="text-xs font-semibold text-ink">Louise &amp; Bailey</span>
              <span className="text-[0.7rem] text-muted">· cat archive</span>
              <span className={cn("ml-1 text-[0.7rem] font-medium", a.text)}>→</span>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.button>
  );
}

/* ===================================================================== */
/*  Desktop: the immersive parallax room                                 */
/* ===================================================================== */
export function WorkshopRoom({ onSelect, onSelectCat }: SelectFn) {
  const portal = (id: string) => (
    <WorkshopObject
      key={id}
      def={byId(id)}
      art={(active) => renderArt(id, active)}
      onSelect={onSelect}
    />
  );

  return (
    <ParallaxStage className="h-full w-full overflow-hidden">
      {/* ---------------- BACKGROUND: wall + sign + diagrams ------------- */}
      <ParallaxLayer depth={0.022}>
        <div className="absolute -inset-8">
          <BrickWall />
        </div>

        {/* neon light spill on the brick */}
        <div
          aria-hidden
          className="neon-breathe pointer-events-none absolute left-1/2 top-[18%] h-[40%] w-[64%] -translate-x-1/2 -translate-y-1/2 rounded-[40%] blur-[90px]"
          style={{
            background:
              "radial-gradient(50% 60% at 50% 50%, rgba(62,224,255,0.32), rgba(140,108,255,0.18) 55%, transparent 78%)",
          }}
        />

        {/* wall diagrams + pinned notes */}
        <Placed left={2.5} top={5} width={12} rotate={-3}>
          <BlueprintSheet variant="flow" />
        </Placed>
        <Placed left={85.5} top={4} width={12.5} rotate={2.5}>
          <BlueprintSheet variant="api" />
        </Placed>
        <Placed left={1.5} top={62} width={11} rotate={-2}>
          <BlueprintSheet variant="arch" className="opacity-80" />
        </Placed>
        <Placed left={20.5} top={30} width={6.5} rotate={-7}>
          <StickyNote accent="iris" lines={["watsonx", "orchestrate", "BYO agents"]} />
        </Placed>
        <Placed left={70} top={9} width={6.5} rotate={5}>
          <StickyNote accent="mint" lines={["focus", "build", "grow"]} />
        </Placed>

        {/* employee badges — right wall, below trophy shelf */}
        <Placed left={87.5} top={41} width={4.0} rotate={8}>
          <InfosysBadge />
        </Placed>
        <Placed left={84.5} top={38.5} width={4.3} rotate={-5}>
          <IbmBadge />
        </Placed>
      </ParallaxLayer>

      {/* ---------------- the neon sign (mounted, slightly proud) -------- */}
      <ParallaxLayer depth={0.035}>
        <Placed left={20} top={1} width={60}>
          <NeonSign />
        </Placed>
        {/* power cable from the sign down the wall */}
        <Placed left={72} top={20} width={14}>
          <CableDrape />
        </Placed>
      </ParallaxLayer>

      {/* ---------------- MIDGROUND: desk + monitor/research/awards ------ */}
      <ParallaxLayer depth={0.075}>
        <Workbench />
        {MID.map((id) => portal(id))}
      </ParallaxLayer>

      {/* ---------------- FOREGROUND: clutter, cat, near portals --------- */}
      <ParallaxLayer depth={0.155}>
        {/* desk lamp reaching in from the top-left */}
        <Placed left={-6} top={2} width={14} z={5}>
          <DeskLamp />
        </Placed>

        {/* left side: boards + mug */}
        <Placed left={2} top={75} width={12} rotate={-4}>
          <CircuitBoard />
        </Placed>
        <Placed left={13.5} top={80} width={11} rotate={3}>
          <DevBoard />
        </Placed>
        <Placed left={22} top={69} width={6.5}>
          <EasterEgg message="Caffeine level: 87% ☕" accent="heat" label="Coffee mug">
            <Mug />
          </EasterEgg>
        </Placed>

        {/* center-front: keyboard + mouse + cat portal */}
        <Placed left={28} top={82} width={27}>
          <Keyboard />
        </Placed>
        <Placed left={57.5} top={84} width={5}>
          <Mouse />
        </Placed>
        <Placed left={40} top={62} width={21} z={6}>
          <CatPortal onSelect={onSelectCat} />
        </Placed>

        {/* clickable quote note, with a cat doodle */}
        <Placed left={62} top={64} width={6.5} rotate={6}>
          <EasterEgg
            message={() =>
              ENGINEER_QUOTES[Math.floor(Math.random() * ENGINEER_QUOTES.length)]
            }
            accent="heat"
            label="Sticky note"
          >
            <StickyNote
              accent="heat"
              lines={["Bedrock", "+ ChromaDB"]}
              doodle="cat"
            />
          </EasterEgg>
        </Placed>

        <Placed left={91} top={70} width={8}>
          <Plant />
        </Placed>

        {/* foreground portals */}
        {["soldering-station", "toolbox", "desk-phone"].map((id) => portal(id))}
      </ParallaxLayer>

      {/* edge vignette to seat everything in the room */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20"
        style={{
          background:
            "radial-gradient(120% 100% at 50% 45%, transparent 60%, rgba(4,5,9,0.6) 100%)",
        }}
      />
    </ParallaxStage>
  );
}

/* ===================================================================== */
/*  Mobile: tap-friendly portal cards                                    */
/* ===================================================================== */
const iconMap: Record<string, LucideIcon> = {
  Monitor: MonitorIcon,
  CircuitBoard: CircuitIcon,
  Brain,
  Trophy,
  Wrench,
  Phone,
};

export function PortalCardGrid({ onSelect, onSelectCat }: SelectFn) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {workshopObjects.map((def, i) => {
        const a = getAccent(def.accent);
        const Icon = iconMap[def.icon] ?? MonitorIcon;
        return (
          <motion.button
            key={def.id}
            type="button"
            onClick={(e) => onSelect(def, e.currentTarget.getBoundingClientRect())}
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
            <span className={cn("grid h-11 w-11 place-items-center rounded-xl border", a.border, a.bgSoft)}>
              <Icon className={cn("h-5 w-5", a.text)} aria-hidden />
            </span>
            <span className="mt-auto">
              <span className="block text-sm font-semibold text-ink">{def.label}</span>
              <span className="mt-0.5 block text-xs text-muted">{def.caption}</span>
            </span>
            <MoveRight className={cn("h-4 w-4 transition-transform group-hover:translate-x-1", a.text)} aria-hidden />
          </motion.button>
        );
      })}
      {/* Cat archive card for mobile */}
      <motion.button
        type="button"
        onClick={(e) => onSelectCat(e.currentTarget.getBoundingClientRect())}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: workshopObjects.length * 0.05 }}
        whileTap={{ scale: 0.97 }}
        aria-label="Cat Archive: Louise & Bailey. Open gallery."
        className={cn(
          "group panel flex min-h-[8.5rem] flex-col gap-3 rounded-2xl border p-4 text-left transition-colors",
          "hover:border-iris/70",
        )}
      >
        <span className="grid h-11 w-11 place-items-center rounded-xl border border-iris/30 bg-iris/10 text-2xl">
          🐱
        </span>
        <span className="mt-auto">
          <span className="block text-sm font-semibold text-ink">Cat Archive</span>
          <span className="mt-0.5 block text-xs text-muted">Louise &amp; Bailey</span>
        </span>
        <MoveRight className="h-4 w-4 text-iris transition-transform group-hover:translate-x-1" aria-hidden />
      </motion.button>
    </div>
  );
}
