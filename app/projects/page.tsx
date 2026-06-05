import type { Metadata } from "next";
import { experience } from "@/data/experience";
import { PageShell, Subhead } from "@/components/PageShell";
import { ProjectGrid } from "@/components/ProjectGrid";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";

export const metadata: Metadata = {
  title: "Software Experience",
  description:
    "Software engineering experience and projects by Syed Kazmi — IBM watsonx, Infosys, BlueRelief, TeleKinetics, GuardianGram and more.",
};

const softwareExperience = experience.filter((e) => e.type === "software");

export default function ProjectsPage() {
  return (
    <PageShell
      accent="neon"
      eyebrow="// the main monitor"
      title="Software Experience"
      description="Where I've built software professionally, and what I've shipped on the side."
    >
      {/* Experience — no redundant subhead since the page title says it */}
      <ExperienceTimeline items={softwareExperience} accent="neon" />

      {/* Projects underneath */}
      <div className="mt-20">
        <Subhead
          title="Projects"
          description="Side projects, hackathon builds, and research systems."
          accent="neon"
        />
        <div className="mt-8">
          <ProjectGrid />
        </div>
      </div>
    </PageShell>
  );
}
