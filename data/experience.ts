import type { ExperienceItem } from "@/lib/types";

/** Work experience, newest first. */
export const experience: ExperienceItem[] = [
  {
    id: "ibm",
    company: "IBM",
    role: "Software Engineering Intern",
    period: "May 2026 — August 2026",
    type: "software",
    images: ["/experience/ibm-team.webp", "/experience/ibm-intern.webp"],
    description:
      "I worked on watsonx Orchestrate, IBM's platform for building and running AI agents. My focus was the Bring Your Own Agent path — letting teams register agents they built in frameworks like LangChain or CrewAI and run them inside Orchestrate next to IBM's own.",
    highlights: [
      "Built backend services and REST endpoints for registering and running external agents",
      "Connected outside frameworks like LangChain and CrewAI to Orchestrate's agent runtime",
      "Worked across the Python and TypeScript codebase with the platform team",
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
    id: "infosys",
    company: "Infosys",
    role: "Software Engineering Intern",
    period: "May 2025 — July 2025",
    type: "software",
    images: [
      "/experience/infosys-team.webp",
      "/experience/infosys-group.webp",
    ],
    description:
      "I built an advisor app where people talk to a video avatar instead of reading through documents. The avatar streamed through HeyGen over WebRTC; behind it, a Flask and Node backend answered questions from a ChromaDB + AWS Bedrock retrieval pipeline, all running on Google Cloud.",
    highlights: [
      "Streamed a HeyGen avatar over WebRTC so the advisor answered in real time",
      "Built the document-Q&A pipeline: ChromaDB vector search into AWS Bedrock, wired together with LangGraph",
      "Set up the Flask/Node APIs and CI/CD to ship it on Google Cloud",
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
