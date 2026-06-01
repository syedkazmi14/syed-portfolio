"use client";

import { motion } from "framer-motion";
import { projects as allProjects } from "@/data/projects";
import type { Project } from "@/lib/types";
import { itemVariants, StaggerGroup } from "@/components/ui/Reveal";
import { ProjectCard } from "@/components/ProjectCard";

/** Responsive grid of project cards. Defaults to every project. */
export function ProjectGrid({
  projects = allProjects,
}: {
  projects?: Project[];
}) {
  return (
    <StaggerGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <motion.div key={project.id} variants={itemVariants} className="h-full">
          <ProjectCard project={project} />
        </motion.div>
      ))}
    </StaggerGroup>
  );
}
