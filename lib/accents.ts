import type { Accent } from "@/lib/types";

/**
 * Pre-built Tailwind class strings per accent.
 *
 * Tailwind can't see dynamically-constructed class names, so every accent
 * variant is spelled out in full here. Components read from this map instead
 * of interpolating color names.
 */
export interface AccentClasses {
  /** raw hex (for SVG fills / inline styles) */
  hex: string;
  text: string;
  border: string;
  borderHover: string;
  /** subtle translucent background tint */
  bgSoft: string;
  /** solid fill, e.g. for dots / pills */
  bgSolid: string;
  ring: string;
  /** outer glow shadow */
  glow: string;
  glowHover: string;
}

export const ACCENTS: Record<Accent, AccentClasses> = {
  neon: {
    hex: "#3ee0ff",
    text: "text-neon",
    border: "border-neon/30",
    borderHover: "hover:border-neon/70",
    bgSoft: "bg-neon/10",
    bgSolid: "bg-neon",
    ring: "ring-neon/40",
    glow: "shadow-[0_0_28px_-6px_var(--color-neon)]",
    glowHover: "hover:shadow-[0_0_40px_-4px_var(--color-neon)]",
  },
  heat: {
    hex: "#ff8f43",
    text: "text-heat",
    border: "border-heat/30",
    borderHover: "hover:border-heat/70",
    bgSoft: "bg-heat/10",
    bgSolid: "bg-heat",
    ring: "ring-heat/40",
    glow: "shadow-[0_0_28px_-6px_var(--color-heat)]",
    glowHover: "hover:shadow-[0_0_40px_-4px_var(--color-heat)]",
  },
  mint: {
    hex: "#45e6a6",
    text: "text-mint",
    border: "border-mint/30",
    borderHover: "hover:border-mint/70",
    bgSoft: "bg-mint/10",
    bgSolid: "bg-mint",
    ring: "ring-mint/40",
    glow: "shadow-[0_0_28px_-6px_var(--color-mint)]",
    glowHover: "hover:shadow-[0_0_40px_-4px_var(--color-mint)]",
  },
  iris: {
    hex: "#ad93ff",
    text: "text-iris",
    border: "border-iris/30",
    borderHover: "hover:border-iris/70",
    bgSoft: "bg-iris/10",
    bgSolid: "bg-iris",
    ring: "ring-iris/40",
    glow: "shadow-[0_0_28px_-6px_var(--color-iris)]",
    glowHover: "hover:shadow-[0_0_40px_-4px_var(--color-iris)]",
  },
};

export const getAccent = (accent: Accent): AccentClasses => ACCENTS[accent];
