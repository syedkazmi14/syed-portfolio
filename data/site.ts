import type { NavItem } from "@/lib/types";

/**
 * Central site configuration — name, positioning copy, education, links.
 * Everything here is factual; nothing is generated.
 */
export const siteConfig = {
  name: "Syed Kazmi",
  shortName: "Syed",
  role: "Software Developer",

  /** The hero statement. Three lines by design — see components/Hero.tsx. */
  headline: {
    lead: "I build the backend —",
    accent: "cloud services and AI agents —",
    trail: "and the products around it.",
  },

  /**
   * The paragraph under the hero. Past tense: the IBM internship ended in
   * August 2026.
   */
  intro:
    "Software developer, full-stack by necessity and backend by preference. This past summer I was at IBM, working on watsonx Orchestrate — letting teams run agents they built in LangChain or CrewAI inside IBM's platform.",

  location: "Austin, Texas",

  education: {
    school: "The University of Texas at Dallas",
    shortSchool: "UT Dallas",
    degree: "B.S. Computer Science",
    graduating: "December 2026",
  },

  /** Short status line, kept separate so it's easy to update often. */
  status: "Finishing a CS degree at UT Dallas, December 2026.",

  /** About copy. Every claim here is drawn from the experience data. */
  bio: [
    "Software developer \u2014 full-stack by necessity, backend by preference. I'm finishing a CS degree at UT Dallas.",
    "This past summer I was at IBM working on watsonx Orchestrate, helping teams plug agents they built elsewhere into the platform. Before that I built a video-avatar advisor at Infosys, won the AI track at the Axxess hackathon with a pose-estimation form coach, and spent two years fixing laptops down to the board \u2014 reflowing chips and tracing shorts with a multimeter.",
    "I like work that goes the whole way down: a backend that doesn't fall over and a front end people actually want to use.",
  ],

  /**
   * The one personal photograph, shown polaroid-style.
   *
   * `caption` is a place and a date, the way you'd write on the white strip
   * under a real polaroid. Swap `src` for a better photo whenever you have
   * one — anything roughly square works.
   */
  portrait: {
    src: "/photos/syedheadshot.webp",
    alt: "Syed Kazmi",
    caption: "Austin, Texas",
  },

  url: "https://syedk.dev",

  links: {
    github: "https://github.com/syedkazmi14",
    linkedin: "https://www.linkedin.com/in/syed-kazmi14",
    email: "mailto:smjkazmi14@gmail.com",
    emailPlain: "smjkazmi14@gmail.com",
    resume: "/resume.pdf",
  },
} as const;

export const navItems: NavItem[] = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];
