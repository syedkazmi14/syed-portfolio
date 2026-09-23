/* ------------------------------------------------------------------ */
/*  Shared domain types                                                */
/* ------------------------------------------------------------------ */

export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  id: string;
  name: string;
  /**
   * Everything below the name is optional. Newer entries often arrive with
   * only a name, a date and a line of description, and a half-filled project
   * is better than an invented one — the UI omits whatever is missing.
   */
  tagline?: string;
  /** Short summary — used on the project page under "How it works". */
  description?: string;
  /** What problem the project solves. */
  problem?: string;
  /** How it solves it. */
  solution?: string;
  /** e.g. "Jul 2026 — Present". */
  period?: string;
  tech: string[];
  featured?: boolean;
  /** Award or event tag, e.g. "1st Place · Axxess AI Track". */
  badge?: string;
  /** Repo / demo / writeup links. Empty array renders nothing. */
  links?: ProjectLink[];
  /**
   * Screenshots under /public/projects. The first is the primary — it is what
   * the hover wash and the OG card use; the rest are paged through in the
   * drawer and on the project page.
   */
  images?: string[];
}

export type ExperienceType = "software" | "hardware" | "it";

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  location?: string;
  type: ExperienceType;
  description: string;
  highlights?: string[];
  tech: string[];
  /**
   * Photos or logos for this role. The first is revealed faintly behind the
   * row on hover; all of them are paged through in the drawer.
   * Put files in public/experience/ and run `npm run optimize:images`.
   */
  images?: string[];
}

export interface SkillCategory {
  id: string;
  title: string;
  items: string[];
}

export interface Award {
  id: string;
  title: string;
  org: string;
  description: string;
}

export interface Certification {
  id: string;
  title: string;
  org: string;
}

export interface Interest {
  id: string;
  title: string;
  /** One line on the tile. */
  blurb: string;
  /** Paragraphs shown in the drawer. */
  body: string[];
  images?: string[];
  imageAlt?: string;
  /** Optional pointer at related work. */
  link?: { label: string; href: string };
}

export interface NavItem {
  label: string;
  href: string;
  /**
   * Show this item in the phone nav. The header is fixed, so an overflowing
   * nav is clipped rather than scrolling the page — which means the overflow
   * e2e suite cannot catch it. Below `sm` there is room for two labels, so
   * the rest are hidden there and reached by scrolling instead.
   */
  compact?: boolean;
}
