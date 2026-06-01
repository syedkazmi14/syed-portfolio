import type { NavItem } from "@/lib/types";

/**
 * Central site configuration.
 *
 * 👉 UPDATE YOUR LINKS HERE — replace the placeholders in `links` with your
 *    real GitHub / LinkedIn / email / resume. The resume points to a file in
 *    /public (drop `resume.pdf` there) or change it to an external URL.
 */
export const siteConfig = {
  name: "Syed Kazmi",
  shortName: "Syed",
  role: "Software Engineer",
  headline: "Software Engineer building AI-powered full-stack systems.",
  subheadline:
    "Computer Science student at UT Dallas graduating Spring 2026. Focused on AI applications, backend systems, cloud infrastructure, and polished full-stack products.",
  location: "Dallas, Texas",
  url: "https://syedkazmi.dev", // placeholder — used for SEO metadata
  links: {
    github: "https://github.com/your-username", // ← replace
    linkedin: "https://www.linkedin.com/in/your-handle", // ← replace
    email: "mailto:syed@example.com", // ← replace
    emailPlain: "syed@example.com", // ← replace
    resume: "/resume.pdf", // ← drop resume.pdf in /public, or use an external URL
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
