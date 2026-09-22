import type { SkillCategory } from "@/lib/types";

/**
 * Skills grouped for the Stack list in components/Credentials.tsx.
 *
 * A "Hardware / IT" group (soldering, PCB repair, oscilloscope, multimeter,
 * VMware vCenter, SAP B1) was removed at Syed's request. The two IT entries
 * still read on the Metropak role in data/experience.ts; the four bench-work
 * ones are deliberately no longer claimed anywhere on the site.
 */
export const skills: SkillCategory[] = [
  {
    id: "languages",
    title: "Languages",
    items: ["Python", "TypeScript", "JavaScript", "C++", "SQL"],
  },
  {
    id: "frontend",
    title: "Frontend",
    items: ["React", "Next.js", "Tailwind CSS", "Framer Motion"],
  },
  {
    id: "backend",
    title: "Backend",
    items: ["Node.js", "Express.js", "FastAPI", "Flask", "REST APIs"],
  },
  {
    id: "ai-ml",
    title: "AI / ML",
    items: [
      "LangGraph",
      "OpenAI",
      "Gemini API",
      "TensorFlow",
      "ChromaDB",
      "RAG",
      "YOLOv8",
    ],
  },
  {
    id: "cloud-devops",
    title: "Cloud / DevOps",
    items: ["AWS", "Google Cloud", "Docker", "CI/CD", "PostgreSQL", "MongoDB", "Redis"],
  },
];
