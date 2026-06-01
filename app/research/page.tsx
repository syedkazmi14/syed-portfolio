import type { Metadata } from "next";
import { projects } from "@/data/projects";
import { researchProjectIds } from "@/data/research";
import { PageShell, Subhead } from "@/components/PageShell";
import { ResearchBoard } from "@/components/ResearchBoard";
import { ProjectGrid } from "@/components/ProjectGrid";

export const metadata: Metadata = {
  title: "Research & AI Work",
  description:
    "Computer vision, LLM applications, RAG, and agentic workflows — research and applied AI by Syed Kazmi.",
};

const researchProjects = researchProjectIds
  .map((id) => projects.find((p) => p.id === id))
  .filter((p): p is NonNullable<typeof p> => Boolean(p));

export default function ResearchPage() {
  return (
    <PageShell
      accent="mint"
      eyebrow="// the whiteboard"
      title="Research & AI Work"
      description="Computer vision, LLM applications, and agentic systems — sketched out, prototyped, and shipped."
    >
      <ResearchBoard />

      <div className="mt-20">
        <Subhead
          title="Project detail"
          description="A closer look at the research-driven builds."
          accent="mint"
        />
        <div className="mt-8">
          <ProjectGrid projects={researchProjects} />
        </div>
      </div>
    </PageShell>
  );
}
