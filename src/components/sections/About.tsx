"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FadeIn } from "@/components/motion/FadeIn";
import { JOURNEY } from "@/lib/journey-data";
import { RegistrationMarks } from "@/components/layout/RegistrationMarks";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !lineRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            end: "bottom 65%",
            scrub: 0.6,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="relative bg-ink py-28 sm:py-40">
      <RegistrationMarks />
      <div className="container-edge">
        <FadeIn>
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-mist">
            01 — About <span className="text-mist-dim">/ COL 01–12</span>
          </span>
        </FadeIn>

        <div className="mt-8 grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <FadeIn>
              <p className="font-display text-2xl italic leading-snug text-paper sm:text-3xl">
                A creative technologist working at the seam between art and
                engineering — building environments, tools and experiences
                that reward curiosity.
              </p>
            </FadeIn>
          </div>

          <div className="lg:col-span-7 lg:pl-8">
            <div ref={containerRef} className="relative">
              <div className="absolute left-[7px] top-2 bottom-2 w-px bg-line sm:left-[9px]" />
              <div
                ref={lineRef}
                className="absolute left-[7px] top-2 bottom-2 w-px origin-top bg-gradient-to-b from-accent-blue to-accent-emerald sm:left-[9px]"
              />

              <ol className="space-y-12">
                {JOURNEY.map((step, i) => (
                  <FadeIn key={step.title} delay={i * 0.04} y={16}>
                    <li className="relative pl-8 sm:pl-10">
                      <span className="absolute left-0 top-1.5 h-[15px] w-[15px] rounded-full border-2 border-ink bg-line sm:h-[19px] sm:w-[19px]" />
                      <h3 className="font-display text-2xl text-paper sm:text-3xl">
                        {step.title}
                      </h3>
                      <p className="mt-2 max-w-lg font-body text-sm leading-relaxed text-mist sm:text-base">
                        {step.text}
                      </p>
                    </li>
                  </FadeIn>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
