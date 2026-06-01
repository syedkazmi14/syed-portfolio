"use client";

import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import { itemVariants, StaggerGroup } from "@/components/ui/Reveal";
import { Section } from "@/components/Section";
import { SectionHeader } from "@/components/SectionHeader";
import { ProjectCard } from "@/components/ProjectCard";

export function ProjectsSection() {
  return (
    <Section id="projects">
      <SectionHeader
        index="01"
        eyebrow="On the main monitor"
        title="Software Projects"
        description="Full-stack products, AI systems, and hardware-software builds. Tap any card for the problem, the solution, and the full stack."
        accent="neon"
      />

      <StaggerGroup className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <motion.div key={project.id} variants={itemVariants} className="h-full">
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </StaggerGroup>
    </Section>
  );
}
