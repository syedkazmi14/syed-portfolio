import type { NavItem } from "@/lib/types";

/**
 * Central site configuration.
 */
export const siteConfig = {
  name: "Syed Kazmi",
  shortName: "Syed",
  role: "Software Engineer",
  headline:
    "I build backend systems and the full-stack products around them — currently working on agent orchestration at IBM.",
  subheadline:
    "CS student at UT Dallas, graduating Fall 2026. Most of what I build starts as a backend problem — moving data around, making an API reliable, getting async work to behave — and ends as something you can click.",
  location: "Austin, Texas",
  url: "https://syedk.dev", // placeholder — used for SEO metadata
  links: {
    github: "https://github.com/syedkazmi14", 
    linkedin: "https://www.linkedin.com/in/syed-kazmi14", 
    email: "mailto:smjkazmi14@gmail.com",
    emailPlain: "smjkazmi14@gmail.com",
    resume: "/resume.pdf",
  },
} as const;

export const navItems: NavItem[] = [
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Research", href: "#research" },
  { label: "Awards", href: "#awards" },
  { label: "Skills", href: "#skills" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];
