import type { Metadata } from "next";
import { experience } from "@/data/experience";
import { projects } from "@/data/projects";
import { PageShell, Subhead } from "@/components/PageShell";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { ProjectGrid } from "@/components/ProjectGrid";

export const metadata: Metadata = {
  title: "Hardware Experience",
  description:
    "Board-level repair, soldering, IT infrastructure, and hardware-software builds by Syed Kazmi.",
};

const hardwareExperience = experience.filter(
  (e) => e.type === "hardware" || e.type === "it",
);

const hardwareBuildIds = ["witchwatch", "ecodrive", "trashtrends"];
const hardwareBuilds = hardwareBuildIds
  .map((id) => projects.find((p) => p.id === id))
  .filter((p): p is NonNullable<typeof p> => Boolean(p));

export default function HardwarePage() {
  return (
    <PageShell
      accent="heat"
      eyebrow="// the soldering station"
      title="Hardware & Systems"
      description="Board-level diagnostics and soldering, enterprise IT infrastructure, and the hardware-software builds that sit between bits and atoms."
    >
      <ExperienceTimeline items={hardwareExperience} accent="heat" />

      <div className="mt-20">
        <Subhead
          title="Hardware-software builds"
          description="Projects where firmware, sensors, and the real world meet code."
          accent="heat"
        />
        <div className="mt-8">
          <ProjectGrid projects={hardwareBuilds} />
        </div>
      </div>
    </PageShell>
  );
}
