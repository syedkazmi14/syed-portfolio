import type { Metadata } from "next";
import { projects } from "@/data/projects";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { WorkIndex } from "@/components/WorkIndex";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Every project by Syed Kazmi — crisis mapping, pose estimation, oil-tank telemetry, drone computer vision, and more.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <Nav />
      <main className="mx-auto w-full max-w-6xl px-6 pt-36 sm:px-12 sm:pt-44">
        <Reveal>
          <h1 className="max-w-3xl font-display text-[2.75rem] leading-[1.06] tracking-[-0.015em] sm:text-6xl">
            Projects
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-body">
            Backend systems, hackathon builds, and research projects. Most of
            them start with a sensor or a feed and end with something you can
            act on.
          </p>
        </Reveal>

        <WorkIndex projects={projects} className="mt-14" />
      </main>
      <Footer />
    </>
  );
}
