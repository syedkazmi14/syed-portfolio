import type { NavItem } from "@/lib/types";

/**
 * Central site configuration — name, positioning copy, education, links.
 * Everything here is factual; nothing is generated.
 */
export const siteConfig = {
  name: "Syed Kazmi",
  /** Syed's own spelling, supplied by him. Rendered by components/NameToggle. */
  nameUrdu: "سید کاظمی",
  shortName: "Syed",
  role: "Software Developer",

  /**
   * The line on the share card (Open Graph / Twitter), and nothing else.
   *
   * This used to be a three-part `headline` the hero rendered. Once the hero
   * became greeting / name / role, the share card was the only thing still
   * reading it — which is why a shared link showed a sentence written to be
   * a headline. The city is appended from `location` in app/layout.tsx, so
   * it cannot go stale independently of the rest of the site.
   */
  tagline: "Backend, cloud, and AI agents.",

  /**
   * The paragraph under the hero. Past tense: the IBM internship ended in
   * August 2026.
   */
  intro:
    "Software developer. This past summer I was at IBM, working on watsonx Orchestrate — letting teams run agents they built in LangChain or CrewAI inside IBM's platform.",

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
  { label: "Experience", href: "/#experience", compact: true },
  // Hidden on phones: the hero's "See projects" button already leads here.
  { label: "Projects", href: "/#work" },
  { label: "Contact", href: "/#contact", compact: true },
];
