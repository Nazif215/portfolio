"use client";

import { useState } from "react";
import { PHOTOGRAMMETRY_PROJECTS } from "@/lib/projects-data";
import { ProjectTile } from "./ProjectTile";
import { ProjectCaseStudy } from "./ProjectCaseStudy";
import { RegistrationMarks } from "@/components/layout/RegistrationMarks";
import { FadeIn } from "@/components/motion/FadeIn";

export function Photogrammetry() {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  const activeProject =
    PHOTOGRAMMETRY_PROJECTS.find((p) => p.slug === activeSlug) ?? null;
  const single = PHOTOGRAMMETRY_PROJECTS.length === 1;

  return (
    <section id="photogrammetry" className="relative bg-ink pb-28 sm:pb-40">
      <RegistrationMarks />
      <div className="container-edge">
        <FadeIn>
          <h2 className="font-display text-4xl text-paper sm:text-5xl">
            Photogrammetry
          </h2>
          <p className="mt-4 max-w-xl font-body text-base leading-relaxed text-mist">
            Reality capture — laser scanning and drone photogrammetry turned
            into real-time environments.
          </p>
        </FadeIn>

        <div className="mt-10 grid grid-cols-12 gap-4 lg:gap-6">
          {PHOTOGRAMMETRY_PROJECTS.map((project, i) => (
            <ProjectTile
              key={project.slug}
              project={project}
              index={i}
              onOpen={setActiveSlug}
              fullWidth={single}
            />
          ))}
        </div>
      </div>

      <ProjectCaseStudy project={activeProject} onClose={() => setActiveSlug(null)} />
    </section>
  );
}
