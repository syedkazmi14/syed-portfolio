"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { getAccent } from "@/lib/accents";
import { workshopObjects } from "@/data/workshop";
import type { Accent, WorkshopObjectDef } from "@/lib/types";
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
/*  Mobile: a compact, scrollable version of the SAME room               */
/* ===================================================================== */

/** Tiled dark-brick wall (data-URI so it tiles cleanly at any height). */
const BRICK_SVG =
  "<svg xmlns='http://www.w3.org/2000/svg' width='84' height='44'>" +
  "<rect width='84' height='44' fill='#0b0908'/>" +
  "<g fill='#181210'>" +
  "<rect x='2' y='2' width='38' height='17' rx='2'/>" +
  "<rect x='44' y='2' width='38' height='17' rx='2'/>" +
  "<rect x='-19' y='24' width='38' height='17' rx='2'/>" +
  "<rect x='23' y='24' width='38' height='17' rx='2'/>" +
  "<rect x='65' y='24' width='38' height='17' rx='2'/>" +
  "</g></svg>";
const BRICK_TILE = `data:image/svg+xml,${encodeURIComponent(BRICK_SVG)}`;

/** Full-height room shell that sits behind the scrolling mobile content. */
function MobileRoomShell() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* tiled brick */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: "#0b0908",
          backgroundImage: `url("${BRICK_TILE}")`,
          backgroundSize: "116px 61px",
        }}
      />
      {/* depth darkening top→bottom */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(8,8,12,0.35) 0%, rgba(6,6,10,0.72) 60%, rgba(5,5,9,0.9) 100%)",
        }}
      />
      {/* neon spill behind the sign */}
      <div
        className="neon-breathe absolute left-1/2 top-[7%] h-52 w-[82%] -translate-x-1/2 rounded-[42%] blur-[64px]"
        style={{
          background:
            "radial-gradient(50% 60% at 50% 50%, rgba(62,224,255,0.30), rgba(140,108,255,0.16) 55%, transparent 80%)",
        }}
      />
      {/* edge vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 70% at 50% 26%, transparent 52%, rgba(4,5,9,0.72) 100%)",
        }}
      />
    </div>
  );
}

/**
 * One interactive object in the mobile room. It is the object ITSELF (its SVG
 * art) sitting on the wall — never a card. A small name-tag teaches what it is,
 * a pulsing accent dot signals it's interactive, and pressing highlights it
 * before the shared zoom transition fires.
 */
function MobileStation({
  label,
  accent,
  onTap,
  art,
  className,
}: {
  label: string;
  accent: Accent;
  onTap: (rect: DOMRect) => void;
  /** receives the pressed state so the artwork can light up on touch */
  art: (pressed: boolean) => ReactNode;
  className?: string;
}) {
  const [pressed, setPressed] = useState(false);
  const a = getAccent(accent);

  return (
    <button
      type="button"
      onClick={(e) => onTap(e.currentTarget.getBoundingClientRect())}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      onPointerCancel={() => setPressed(false)}
      aria-label={`${label}. Open.`}
      className={cn(
        "pointer-events-auto relative flex flex-col items-center outline-none transition-transform duration-200 active:scale-95",
        className,
      )}
    >
      {/* faint always-on glow so the object reads as interactive */}
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute left-1/2 top-[44%] -z-10 h-[72%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-[44%] opacity-[0.10] blur-2xl",
          a.bgSolid,
        )}
      />
      {/* press highlight */}
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute left-1/2 top-[44%] -z-10 h-[84%] w-[88%] -translate-x-1/2 -translate-y-1/2 rounded-[44%] blur-2xl transition-opacity duration-200",
          a.bgSolid,
        )}
        style={{ opacity: pressed ? 0.42 : 0 }}
      />

      <span className="w-full">{art(pressed)}</span>

      {/* name tag (the mobile equivalent of the desktop hover label) */}
      <span
        className={cn(
          "mt-2 inline-flex items-center gap-1.5 rounded-full border bg-base/55 px-2.5 py-1 backdrop-blur-sm",
          a.border,
        )}
      >
        <span className={cn("anim-pulse-glow h-1.5 w-1.5 shrink-0 rounded-full", a.bgSolid)} />
        <span className="whitespace-nowrap text-[0.72rem] font-semibold text-ink">
          {label}
        </span>
      </span>
    </button>
  );
}

/** A grounding ledge (desk / bench surface) the objects sit on. */
function Ledge({ accent = "neon" }: { accent?: Accent }) {
  const a = getAccent(accent);
  return (
    <div
      aria-hidden
      className="absolute inset-x-0 bottom-2 -z-0 h-14 rounded-lg"
      style={{
        background:
          "linear-gradient(180deg, #221a15 0%, #15100d 65%, #0d0a08 100%)",
      }}
    >
      <div className={cn("absolute inset-x-3 top-0 h-px", a.bgSolid, "opacity-50")} />
      <div className="absolute inset-x-0 -top-3 h-3 bg-gradient-to-b from-black/50 to-transparent" />
    </div>
  );
}

export function MobileWorkshop({ onSelect, onSelectCat }: SelectFn) {
  const station = (
    id: string,
    art: (pressed: boolean) => ReactNode,
    className?: string,
  ) => {
    const d = byId(id);
    return (
      <MobileStation
        label={d.label}
        accent={d.accent}
        onTap={(rect) => onSelect(d, rect)}
        art={art}
        className={className}
      />
    );
  };

  return (
    <div className="relative w-full overflow-hidden">
      <MobileRoomShell />

      <div className="relative z-10 flex flex-col items-center gap-12 px-5 pb-24 pt-24">
        {/* 1 ── NEON SIGN (hero) ──────────────────────────────────────── */}
        <div className="w-full max-w-sm">
          <NeonSign />
          <p className="mt-3 flex items-center justify-center gap-2 text-center font-mono text-xs text-muted">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-neon anim-pulse-glow" />
            Welcome to my garage — tap a station to explore.
          </p>
        </div>

        {/* 2 ── WORKSTATION: monitor on desk ledge ───────────────────────── */}
        <section className="w-full max-w-sm">
          {station("monitor", (p) => <MonitorStation active={p} />)}
          <div className="relative mt-1">
            <Ledge accent="neon" />
            <div className="relative flex items-end justify-center gap-2 px-3 pb-2">
              <div aria-hidden className="w-[46%] pb-1 opacity-85">
                <Keyboard />
              </div>
              <div aria-hidden className="w-[9%] pb-1 opacity-85">
                <Mouse />
              </div>
            </div>
          </div>
        </section>

        {/* 3 ── THE WALL: whiteboard + trophy shelf ───────────────────── */}
        <section className="grid w-full max-w-sm grid-cols-2 items-end gap-5">
          {station("whiteboard", (p) => <WhiteboardArt active={p} />)}
          {station("trophy-shelf", (p) => <TrophyShelfArt active={p} />)}
        </section>

        {/* 4 ── THE BENCH: soldering + toolbox + phone + cat ────────────── */}
        <section className="relative w-full max-w-sm">
          <Ledge accent="heat" />
          <div className="relative grid grid-cols-2 items-end gap-5 px-2 pb-2">
            {station("soldering-station", (p) => <SolderingArt active={p} />)}
            {station("toolbox", (p) => <ToolboxArt active={p} />)}
            {/* phone + cat side by side — cat rests near the contact station */}
            {station("desk-phone", (p) => <DeskPhoneArt active={p} />)}
            <MobileStation
              label="Louise & Bailey"
              accent="iris"
              onTap={onSelectCat}
              art={(p) => <SleepingCat hovered={p} />}
            />
          </div>
        </section>
      </div>
    </div>
  );
}
