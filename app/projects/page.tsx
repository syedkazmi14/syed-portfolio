import type { Metadata } from "next";
import { experience } from "@/data/experience";
import { PageShell, Subhead } from "@/components/PageShell";
import { ProjectGrid } from "@/components/ProjectGrid";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";

export const metadata: Metadata = {
  title: "Software Projects",
  description:
    "Full-stack products, AI systems, and hardware-software builds by Syed Kazmi — BlueRelief, TeleKinetics, GuardianGram and more.",
};

const softwareExperience = experience.filter((e) => e.type === "software");

export default function ProjectsPage() {
  return (
    <PageShell
      accent="neon"
      eyebrow="// the main monitor"
      title="Software Projects"
      description="Full-stack products, AI systems, and hardware-software builds. Open any card for the problem, the solution, and the full stack."
    >
      <ProjectGrid />

      <div className="mt-20">
        <Subhead
          title="Software Experience"
          description="Where I build software professionally."
          accent="neon"
        />
        <div className="mt-8">
          <ExperienceTimeline items={softwareExperience} accent="neon" />
        </div>
      </div>
    </PageShell>
  );
}
