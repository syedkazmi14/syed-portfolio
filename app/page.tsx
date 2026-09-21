import Link from "next/link";
import { featuredProjects } from "@/data/projects";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { WorkIndex } from "@/components/WorkIndex";
import { ExperienceList } from "@/components/ExperienceList";
import { Credentials } from "@/components/Credentials";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />

        {/* About leads: who he is comes before what he shipped. */}
        <div className="mt-20 sm:mt-24">
          <About />
        </div>

        <section
          id="work"
          className="mx-auto mt-24 w-full max-w-6xl px-6 sm:mt-32 sm:px-12"
        >
          <Reveal className="flex items-baseline justify-between gap-6 pb-2">
            <h2 className="label">Selected work</h2>
            <Link
              href="/work"
              className="font-mono text-xs uppercase tracking-[0.08em] text-green transition-colors hover:text-green-deep"
            >
              All eight →
            </Link>
          </Reveal>

          <WorkIndex projects={featuredProjects} className="mt-4" />
        </section>

        <section
          id="experience"
          className="mx-auto mt-24 w-full max-w-6xl px-6 sm:mt-32 sm:px-12"
        >
          <Reveal>
            <h2 className="label">Experience</h2>
          </Reveal>
          <div className="mt-6 max-w-3xl">
            <ExperienceList />
          </div>
        </section>

        <div className="mt-24 sm:mt-32">
          <Credentials />
        </div>
      </main>
      <Footer />
    </>
  );
}
