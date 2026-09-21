import type { SkillCategory } from "@/lib/types";

/** Skills grouped into "toolbox drawers". Icons resolve in SkillsToolbox. */
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
  {
    id: "hardware-it",
    title: "Hardware / IT",
    items: [
      "Soldering",
      "PCB Repair",
      "Oscilloscope",
      "Multimeter",
      "VMware vCenter",
      "SAP B1",
    ],
  },
];
