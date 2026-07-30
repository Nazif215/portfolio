"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CaretDown } from "@phosphor-icons/react";
import { useLenis } from "lenis/react";
import { FadeIn } from "@/components/motion/FadeIn";
import { AsciiArt } from "@/components/motion/AsciiArt";
import { RegistrationMarks } from "@/components/layout/RegistrationMarks";
import { STORY_PARAGRAPHS } from "@/lib/story-data";

export function MyJourney() {
  const [open, setOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const lenis = useLenis();

  // Lenis (root mode) measures document.documentElement, which is pinned to
  // 100% viewport height by our layout — it never notices this section's
  // accordion growing/shrinking the real page height. Watch this section
  // directly and force Lenis to recompute its scroll bounds when it does.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new ResizeObserver(() => lenis?.resize());
    observer.observe(el);
    return () => observer.disconnect();
  }, [lenis]);

  return (
    <section
      ref={sectionRef}
      id="journey"
      className="relative overflow-hidden bg-ink py-28 sm:py-40"
    >
      <RegistrationMarks />

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.12 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-none absolute inset-0"
          >
            <AsciiArt className="h-full w-full" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container-edge relative z-10">
        <FadeIn>
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-mist">
            03 — My Journey <span className="text-mist-dim">/ COL 01–12</span>
          </span>
        </FadeIn>

        <div className="mt-10 max-w-2xl">
          <FadeIn>
            <button
              onClick={() => setOpen((v) => !v)}
              data-cursor="link"
              aria-expanded={open}
              className="group flex w-full min-h-11 items-center justify-between gap-6 border-y border-line py-6 text-left"
            >
              <span className="font-display text-2xl text-paper sm:text-3xl">
                {open ? "My Journey" : "Read my story."}
              </span>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line transition-colors group-hover:border-paper/40">
                <CaretDown
                  className={`h-4 w-4 text-paper transition-transform duration-300 ${
                    open ? "rotate-180" : ""
                  }`}
                />
              </span>
            </button>
          </FadeIn>

          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <div className="pt-10">
                  {STORY_PARAGRAPHS.map((paragraph, i) => (
                    <FadeIn key={i} y={16} className="mt-6 first:mt-0">
                      <p className="font-body text-lg leading-relaxed text-mist sm:text-xl">
                        {paragraph}
                      </p>
                    </FadeIn>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
