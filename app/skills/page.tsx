import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { SkillsToolbox } from "@/components/SkillsToolbox";

export const metadata: Metadata = {
  title: "Skills",
  description:
    "Languages, frontend, backend, AI/ML, cloud/DevOps, and hardware/IT tools in Syed Kazmi's stack.",
};

export default function SkillsPage() {
  return (
    <PageShell
      accent="heat"
      eyebrow="// the toolbox"
      title="Skills & Stack"
      description="The tools I reach for — pull open a drawer."
    >
      <SkillsToolbox />
    </PageShell>
  );
}
