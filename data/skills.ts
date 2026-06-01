import type { SkillCategory } from "@/lib/types";

/** Skills grouped into "toolbox drawers". Icons resolve in SkillsToolbox. */
export const skills: SkillCategory[] = [
  {
    id: "languages",
    title: "Languages",
    icon: "Code2",
    accent: "neon",
    items: ["Python", "TypeScript", "JavaScript", "C++", "SQL"],
  },
  {
    id: "frontend",
    title: "Frontend",
    icon: "LayoutTemplate",
    accent: "iris",
    items: ["React", "Next.js", "Tailwind CSS", "Framer Motion"],
  },
  {
    id: "backend",
    title: "Backend",
    icon: "Server",
    accent: "mint",
    items: ["Node.js", "Express.js", "FastAPI", "Flask", "REST APIs"],
  },
  {
    id: "ai-ml",
    title: "AI / ML",
    icon: "Cpu",
    accent: "heat",
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
    icon: "Cloud",
    accent: "neon",
    items: ["AWS", "Google Cloud", "Docker", "CI/CD", "PostgreSQL", "MongoDB", "Redis"],
  },
  {
    id: "hardware-it",
    title: "Hardware / IT",
    icon: "Wrench",
    accent: "heat",
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
