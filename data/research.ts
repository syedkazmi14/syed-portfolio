import type { ResearchInterest } from "@/lib/types";

/** Project ids (from data/projects.ts) surfaced on the research board. */
export const researchProjectIds = ["hbs-cv", "trashtrends"] as const;

/** AI / ML focus areas — rendered as sticky notes on the whiteboard. */
export const researchInterests: ResearchInterest[] = [
  {
    label: "Computer Vision",
    note: "YOLOv8 detection, drone video, pose estimation",
    accent: "mint",
  },
  {
    label: "LLM Applications",
    note: "Gemini & OpenAI powered product features",
    accent: "neon",
  },
  {
    label: "Retrieval-Augmented Generation",
    note: "ChromaDB + document parsing for grounded answers",
    accent: "iris",
  },
  {
    label: "Agentic Workflows",
    note: "LangGraph / CrewAI orchestration & BYO agents",
    accent: "heat",
  },
  {
    label: "Cloud AI Systems",
    note: "AWS Bedrock, scalable inference & pipelines",
    accent: "neon",
  },
];
