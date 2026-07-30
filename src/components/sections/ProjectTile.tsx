"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react";
import { FadeIn } from "@/components/motion/FadeIn";
import type { Project } from "@/lib/projects-data";
import { useReducedMotion } from "@/lib/use-reduced-motion";

/** Alternating large/small rhythm across a 12-column grid: L,S,S,L repeating. */
export function tileSpan(index: number): "large" | "small" {
  const pos = index % 4;
  return pos === 0 || pos === 3 ? "large" : "small";
}

export function ProjectTile({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: (slug: string) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, { stiffness: 150, damping: 20 });
  const rotateY = useSpring(ry, { stiffness: 150, damping: 20 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    ry.set(px * 6);
    rx.set(-py * 6);
  };

  const reset = () => {
    rx.set(0);
    ry.set(0);
  };

  const span = tileSpan(index);
  // The tall/wide alternation is a 2-column desktop rhythm — on a single
  // mobile column it just crams wide source images into a tall box. Use one
  // consistent, contain-friendly ratio below lg, and only diverge at lg+.
  const spanClass =
    span === "large"
      ? "lg:col-span-8 aspect-[4/3] lg:aspect-[16/10]"
      : "lg:col-span-4 aspect-[4/3] lg:aspect-[4/5] lg:h-full";

  return (
    <FadeIn delay={(index % 6) * 0.06} y={40} className={`col-span-12 ${spanClass}`}>
      <div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        onClick={() => onOpen(project.slug)}
        data-cursor="view"
        data-cursor-label="View"
        className="group relative h-full w-full cursor-pointer overflow-hidden border border-line"
        style={{ perspective: 800 }}
      >
        <motion.div
          className="absolute inset-0"
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        >
          <Image
            src={project.image}
            alt=""
            aria-hidden
            fill
            sizes="(min-width: 1024px) 66vw, 100vw"
            className="scale-110 object-cover opacity-40 blur-2xl"
          />
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(min-width: 1024px) 66vw, 100vw"
            className="object-contain transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-ink/40" />

          <span className="absolute left-5 top-5 font-mono text-xs text-paper/70">
            {String(index + 1).padStart(2, "0")}
          </span>

          <span className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-paper/30 bg-ink/30 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
            <ArrowUpRight className="h-4 w-4 text-paper" />
          </span>

          <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper/70">
                {project.category}
              </p>
              <h3 className="mt-2 font-display text-3xl leading-none text-paper sm:text-4xl">
                {project.title}
              </h3>
            </div>

            <div className="hidden shrink-0 text-right opacity-0 transition-opacity duration-500 group-hover:opacity-100 sm:block">
              <p className="font-display text-2xl leading-none text-accent-blue">
                {project.stat.value}
              </p>
              <p className="mt-1 max-w-[10rem] font-mono text-[9px] uppercase tracking-[0.15em] text-paper/70">
                {project.stat.label}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </FadeIn>
  );
}
