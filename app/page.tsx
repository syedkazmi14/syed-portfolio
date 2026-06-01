import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { AmbientBackground } from "@/components/effects/AmbientBackground";
import { Particles } from "@/components/effects/Particles";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { ResearchBoard } from "@/components/ResearchBoard";
import { AwardsShelf } from "@/components/AwardsShelf";
import { SkillsToolbox } from "@/components/SkillsToolbox";
import { AboutSection } from "@/components/AboutSection";
import { ContactPanel } from "@/components/ContactPanel";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Hero + interactive workshop */}
        <section id="home" className="relative isolate overflow-hidden">
          <AmbientBackground intense />
          <Particles count={28} />
          <div className="relative z-10 pb-16 sm:pb-24">
            <Hero />
          </div>
          {/* fade into the rest of the page */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-40 bg-gradient-to-b from-transparent to-base" />
        </section>

        <ProjectsSection />
        <ExperienceTimeline />
        <ResearchBoard />
        <AwardsShelf />
        <SkillsToolbox />
        <AboutSection />
        <ContactPanel />
      </main>
      <Footer />
    </>
  );
}
