/* ------------------------------------------------------------------ */
/*  Shared domain types                                                */
/* ------------------------------------------------------------------ */

/** Accent color keys mapped to the design-token palette in globals.css. */
export type Accent = "neon" | "heat" | "mint" | "iris";

/** Keys for the built-in placeholder project artwork (see ProjectVisual). */
export type ProjectVisualKind =
  | "map"
  | "pose"
  | "shield"
  | "tank"
  | "heatmap"
  | "gauge"
  | "detect"
  | "fps";

export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  id: string;
  name: string;
  tagline: string;
  /** Short marketing-style summary. */
  description: string;
  /** What problem the project solves. */
  problem: string;
  /** How it solves it. */
  solution: string;
  tech: string[];
  accent: Accent;
  featured?: boolean;
  /** Optional ribbon, e.g. an award or event tag. */
  badge?: string;
  /** Which built-in placeholder illustration to render. */
  visual: ProjectVisualKind;
  links?: ProjectLink[];
  /**
   * Optional real image. When set, ProjectVisual renders this instead of the
   * built-in SVG placeholder. Drop a file in /public and set e.g. "/projects/x.png".
   */
  image?: string;
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
  current?: boolean;
}

export interface SkillCategory {
  id: string;
  title: string;
  /** lucide-react icon key, resolved in SkillsToolbox. */
  icon: string;
  accent: Accent;
  items: string[];
}

export interface Award {
  id: string;
  title: string;
  org: string;
  description: string;
  accent: Accent;
}

export interface ResearchInterest {
  label: string;
  note: string;
  accent: Accent;
}

export interface NavItem {
  label: string;
  href: string;
}

/** A clickable/hoverable object in the workshop scene. */
export interface WorkshopObjectDef {
  id: string;
  /** Short label shown in the tooltip. */
  label: string;
  /** One-line caption shown under the label. */
  caption: string;
  /** Section id this object navigates to. */
  target: string;
  accent: Accent;
  /** lucide-react icon key for the mobile card fallback. */
  icon: string;
  /** Placement within the desktop scene, in % of the scene box. */
  area: { left: number; top: number; width: number };
}
