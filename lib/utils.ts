import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind class names safely (clsx + tailwind-merge). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Smooth-scroll to an element id, accounting for the sticky navbar. */
export function scrollToId(id: string) {
  if (typeof document === "undefined") return;
  const el = document.getElementById(id.replace(/^#/, ""));
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}
