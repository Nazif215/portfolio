"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, Play, MagnifyingGlassPlus } from "@phosphor-icons/react";
import { referenceImages, processImages, type Project } from "@/lib/projects-data";
import { Lightbox, type LightboxState } from "./Lightbox";

const FIELDS: {
  label: string;
  key: "challenge" | "process" | "outcome" | "lessons";
}[] = [
  { label: "Challenge", key: "challenge" },
  { label: "Process", key: "process" },
  { label: "Final Outcome", key: "outcome" },
  { label: "Lessons Learned", key: "lessons" },
];

export function ProjectCaseStudy({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const [lightbox, setLightbox] = useState<LightboxState>(null);

  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && !lightbox && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose, lightbox]);

  useEffect(() => {
    setLightbox(null);
  }, [project]);

  const referenceList = project ? referenceImages(project) : [];
  const processList = project ? processImages(project) : [];

  return (
    <>
      <AnimatePresence>
        {project && (
          <motion.div
            className="fixed inset-0 z-[80] overflow-y-auto bg-ink"
            data-lenis-prevent
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              onClick={onClose}
              data-cursor="close"
              data-cursor-label="Close"
              className="fixed right-6 top-6 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-line bg-ink/80 backdrop-blur-sm"
              aria-label="Close case study"
            >
              <X className="h-5 w-5 text-paper" />
            </button>

            <div className="container-edge pb-0 pt-32">
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-mist">
                {project.category}
              </span>
              <h2 className="mt-4 font-display text-5xl text-paper sm:text-7xl">
                {project.title}
              </h2>
            </div>

            <div className="container-edge mt-10">
              {project.video ? (
                <div className="relative aspect-video w-full overflow-hidden border border-line bg-surface">
                  <iframe
                    src={`https://www.youtube.com/embed/${project.video}`}
                    title={`${project.title} — reel`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full"
                  />
                </div>
              ) : (
                <div
                  onClick={() => setLightbox({ images: [project.image], index: 0 })}
                  data-cursor="view"
                  data-cursor-label="Zoom"
                  className="group relative aspect-video w-full cursor-pointer overflow-hidden border border-line bg-ink"
                >
                  {project.heroFit === "contain" && (
                    <Image
                      src={project.image}
                      alt=""
                      aria-hidden
                      fill
                      sizes="100vw"
                      className="scale-110 object-cover opacity-40 blur-2xl"
                    />
                  )}
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="100vw"
                    className={
                      project.heroFit === "contain" ? "object-contain" : "object-cover"
                    }
                    priority
                  />
                  <div className="absolute inset-0 bg-ink/50" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full border border-paper/40">
                      <Play weight="fill" className="h-5 w-5 text-paper" />
                    </span>
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-paper/80">
                      Reel — coming soon
                    </span>
                  </div>
                  <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-paper/30 bg-ink/40 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                    <MagnifyingGlassPlus className="h-4 w-4 text-paper" />
                  </span>
                </div>
              )}
            </div>

            <div className="container-edge grid grid-cols-1 gap-16 py-20 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-accent-blue">
                  Result
                </h4>
                <p className="mt-2 font-display text-4xl text-paper">{project.stat.value}</p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-mist">
                  {project.stat.label}
                </p>

                <h4 className="mt-10 font-mono text-xs uppercase tracking-[0.2em] text-mist">
                  Role
                </h4>
                <p className="mt-2 font-body text-lg text-paper">{project.role}</p>

                <h4 className="mt-10 font-mono text-xs uppercase tracking-[0.2em] text-mist">
                  Tools
                </h4>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {project.tools.map((tool) => (
                    <li
                      key={tool}
                      className="rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-mist"
                    >
                      {tool}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-12 lg:col-span-8">
                {FIELDS.map((field) => (
                  <div key={field.key}>
                    <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-accent-blue">
                      {field.label}
                    </h4>
                    <p className="mt-3 max-w-2xl font-body text-base leading-relaxed text-mist">
                      {project[field.key]}
                    </p>
                  </div>
                ))}

                <div>
                  <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-accent-emerald">
                    Gallery
                  </h4>
                  <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {project.gallery.map((src, i) => (
                      <div
                        key={src}
                        onClick={() => setLightbox({ images: project.gallery, index: i })}
                        data-cursor="view"
                        data-cursor-label="Zoom"
                        className="group relative aspect-[3/2] cursor-pointer overflow-hidden border border-line bg-surface"
                      >
                        <Image
                          src={src}
                          alt={`${project.title} — process detail`}
                          fill
                          sizes="(min-width: 640px) 33vw, 50vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-paper/30 bg-ink/40 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                          <MagnifyingGlassPlus className="h-4 w-4 text-paper" />
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {project.processCount > 0 && (
                  <div>
                    <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-mist">
                      Process{" "}
                      <span className="text-mist-dim">
                        / {project.processCount}{" "}
                        {project.processCount === 1 ? "image" : "images"}
                      </span>
                    </h4>
                    <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-6">
                      {processList.map((src, i) => (
                        <div
                          key={src}
                          onClick={() => setLightbox({ images: processList, index: i })}
                          data-cursor="view"
                          data-cursor-label="Zoom"
                          className="group relative aspect-square cursor-pointer overflow-hidden border border-line bg-surface"
                        >
                          <Image
                            src={src}
                            alt={`${project.title} — process detail`}
                            fill
                            sizes="(min-width: 1024px) 16vw, (min-width: 640px) 25vw, 33vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {project.referenceCount > 0 && (
                  <div>
                    <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-mist">
                      Reference{" "}
                      <span className="text-mist-dim">
                        / {project.referenceCount}{" "}
                        {project.referenceCount === 1 ? "image" : "images"}
                      </span>
                    </h4>
                    <p className="mt-2 max-w-2xl font-body text-sm text-mist-dim">
                      Reference material gathered during research — not the artist&rsquo;s
                      own work.
                    </p>
                    <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-6">
                      {referenceList.map((src, i) => (
                        <div
                          key={src}
                          onClick={() => setLightbox({ images: referenceList, index: i })}
                          data-cursor="view"
                          data-cursor-label="Zoom"
                          className="group relative aspect-square cursor-pointer overflow-hidden border border-line bg-surface"
                        >
                          <Image
                            src={src}
                            alt={`${project.title} — reference`}
                            fill
                            sizes="(min-width: 1024px) 16vw, (min-width: 640px) 25vw, 33vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Lightbox
        state={lightbox}
        onClose={() => setLightbox(null)}
        onNavigate={(index) => setLightbox((prev) => (prev ? { ...prev, index } : prev))}
      />
    </>
  );
}
