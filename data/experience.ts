import type { ExperienceItem } from "@/lib/types";

/** Work experience, newest first. */
export const experience: ExperienceItem[] = [
  {
    id: "ibm",
    company: "IBM",
    role: "Software Engineering Intern",
    period: "May 2026 — Present",
    type: "software",
    current: true,
    description:
      "Working on the watsonx Orchestrate platform to expand Bring Your Own (BYO) Agent capabilities and support integrations with external agent frameworks. Developing backend systems, agent orchestration features, API integrations, and enterprise AI workflows.",
    highlights: [
      "Contributed to the watsonx Orchestrate agent ecosystem",
      "Worked on Bring Your Own Agent (BYO Agent) capabilities",
      "Integrated external agent frameworks and orchestration workflows",
      "Developed backend services and APIs for AI agents",
      "Collaborated with enterprise AI engineering teams",
      "Participated in architecture discussions and platform development",
    ],
    tech: [
      "Python",
      "TypeScript",
      "Node.js",
      "REST APIs",
      "Agentic AI",
      "LangChain",
      "CrewAI",
      "watsonx Orchestrate",
      "Cloud Services",
      "Enterprise Software",
    ],
  },
  {
    id: "techlots",
    company: "TechLots, LLC",
    role: "Hardware Technician",
    period: "August 2025 — Present",
    type: "hardware",
    current: true,
    description:
      "Diagnose and repair consumer electronics and laptops, performing advanced board-level troubleshooting, soldering, and component replacement using precision tools and test equipment.",
    tech: [
      "Diagnostics",
      "Soldering",
      "Multimeter",
      "Oscilloscope",
      "PCB Repair",
      "Component Replacement",
      "Consumer Electronics",
      "Troubleshooting",
    ],
  },
  {
    id: "infosys",
    company: "Infosys",
    role: "Software Engineering Intern",
    period: "May 2025 — July 2025",
    type: "software",
    description:
      "Designed and developed an AI-powered advisor platform enabling lifelike interactions and backend integration, deployed on cloud infrastructure with enhanced document search.",
    highlights: [
      "Built scalable APIs and backend services",
      "Integrated AWS Bedrock and ChromaDB",
      "Implemented retrieval-augmented document parsing",
    ],
    tech: [
      "React.js",
      "Node.js",
      "Flask",
      "AWS Bedrock",
      "ChromaDB",
      "HeyGen API",
      "WebRTC",
      "CI/CD",
      "LangGraph",
      "Google Cloud",
    ],
  },
  {
    id: "metropak",
    company: "Metropak, LLC",
    role: "IT Technician",
    period: "March 2024 — May 2025",
    type: "it",
    description:
      "Provided IT infrastructure management, database optimization, and automated core business workflows for enterprise systems.",
    highlights: [
      "Managed VMware-hosted critical infrastructure",
      "Performed SAP B1 and SQL optimization",
      "Developed API gateway for automation",
    ],
    tech: ["VMware vCenter", "SAP B1", "SQL", "Saltbox API", "REST API", "Automation"],
  },
];
