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
  tagline: string;
  /** Short summary — used on the project page under "How it works". */
  description: string;
  /** What problem the project solves. */
  problem: string;
  /** How it solves it. */
  solution: string;
  tech: string[];
  featured?: boolean;
  /** Award or event tag, e.g. "1st Place · Axxess AI Track". */
  badge?: string;
  /** Repo / demo / writeup links. Empty array renders nothing. */
  links?: ProjectLink[];
  /** Screenshot under /public/projects. */
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
  /**
   * Optional photo or logo, revealed faintly behind the row on hover.
   * Put files in public/experience/ and run `npm run optimize:images`.
   */
  image?: string;
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

export interface NavItem {
  label: string;
  href: string;
}
