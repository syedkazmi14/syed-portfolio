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
    "CS undergraduate at UTD with previous SWE internships at IBM and Infosys. I am a creative individual who is interested in cloud and agentic AI.",
    "Away from my laptop, I\u2019m a father of two cats, I like getting outside, and I spend time volunteering and finding ways to give back to the people around me.",
  ],

  /**
   * The bottom photo of the About scrapbook pile, always showing.
   *
   * `caption` is shown under the pile while this photo is on top. Swap `src`
   * for a better photo whenever you have one — anything roughly square works.
   */
  portrait: {
    src: "/photos/syedheadshot.webp",
    alt: "Syed Kazmi",
    caption: "he/him/his",
  },

  /**
   * Photos that tape onto the About pile when their phrase in `bio` is
   * clicked. `phrase` must appear word for word in a bio paragraph; that is
   * what becomes the button. `src: null` renders a labelled placeholder card
   * until a real photo is supplied.
   */
  aboutPhotos: [
    {
      phrase: "two cats",
      src: "/cats/bailey-louise-couch.webp",
      alt: "Bailey and Louise asleep together on the couch",
      caption: "Bailey & Louise",
    },
    {
      phrase: "getting outside",
      src: "/interests/lake-travis.webp",
      alt: "Syed on a boat at Lake Travis",
      caption: "Lake Travis",
    },
    {
      phrase: "volunteering",
      src: "/photos/lahore.webp",
      alt: "Syed outside Allama Iqbal International Airport in Lahore",
      caption: "Lahore, Pakistan",
    },
  ],

  /**
   * The photo that closes the page, sitting on the jali band under the
   * colophon. Swap `src` for whichever loafed shot you want — anything in
   * /public/cats works, and a cut-out with a transparent background would sit
   * on the lattice better than a rectangle.
   */
  footerPhoto: {
    src: "/cats/loaf-cutout.webp",
    alt: "Louise and Bailey, loafed",
    width: 1283,
    height: 954,
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
  { label: "Experience", href: "/#experience" },
  { label: "Projects", href: "/#work" },
  { label: "Contact", href: "/#contact" },
];
