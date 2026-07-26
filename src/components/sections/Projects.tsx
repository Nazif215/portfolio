"use client";

import { useState } from "react";
import { PROJECTS } from "@/lib/projects-data";
import { ProjectTile } from "./ProjectTile";
import { ProjectCaseStudy } from "./ProjectCaseStudy";
import { RegistrationMarks } from "@/components/layout/RegistrationMarks";
import { FadeIn } from "@/components/motion/FadeIn";

export function Projects() {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  const activeProject = PROJECTS.find((p) => p.slug === activeSlug) ?? null;

  return (
    <section id="work" className="relative bg-ink py-28 sm:py-40">
      <RegistrationMarks />
      <div className="container-edge">
        <FadeIn>
          <h2 className="mb-10 font-display text-4xl text-paper sm:text-5xl">
            Projects
          </h2>
        </FadeIn>
        <div className="grid grid-cols-12 gap-4 lg:gap-6">
          {PROJECTS.map((project, i) => (
            <ProjectTile
              key={project.slug}
              project={project}
              index={i}
              onOpen={setActiveSlug}
            />
          ))}
        </div>
      </div>

      <ProjectCaseStudy project={activeProject} onClose={() => setActiveSlug(null)} />
    </section>
  );
}
