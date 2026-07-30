"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useLoading } from "@/lib/loading-context";
import { RevealText } from "@/components/motion/RevealText";
import { useIsMobile } from "@/lib/use-is-mobile";
import { RegistrationMarks } from "@/components/layout/RegistrationMarks";

const HeroBackground = dynamic(
  () => import("@/components/three/HeroBackground").then((m) => m.HeroBackground),
  { ssr: false }
);

const ROLES = ["3D Artist", "Environment Artist", "Exploring Photogrammetry & Immersive Experiences"];

export function Hero() {
  const { isLoading } = useLoading();
  const isMobile = useIsMobile();
  const introState = isLoading ? "hidden" : "visible";

  return (
    <section className="relative flex min-h-[78dvh] flex-col justify-end overflow-hidden bg-ink sm:min-h-dvh">
      <RegistrationMarks />
      <div className="absolute inset-0">
        {!isMobile && <HeroBackground />}
        <div
          className="absolute inset-0 opacity-70 sm:hidden"
          style={{
            background:
              "radial-gradient(120% 90% at 20% 0%, rgba(111,183,255,0.14), transparent 60%), radial-gradient(120% 90% at 80% 20%, rgba(94,203,170,0.12), transparent 60%)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/10 via-transparent to-ink" />
        <div className="absolute inset-0 [background:radial-gradient(120%_90%_at_50%_100%,transparent_20%,#0a0a0b_88%)]" />
      </div>

      <div className="relative z-10 flex items-center justify-between container-edge pt-32">
        <motion.span
          className="font-mono text-xs tracking-[0.3em] text-mist"
          initial={{ opacity: 0 }}
          animate={{ opacity: introState === "visible" ? 1 : 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          NASIF
        </motion.span>
      </div>

      <div className="relative z-10 container-edge pb-16 sm:pb-24">
        <RevealText
          as="h1"
          start={introState}
          lines={["Portfolio."]}
          className="font-display text-[clamp(2.75rem,11vw,7.5rem)] font-semibold leading-[0.95] tracking-tight text-paper"
        />

        <motion.p
          className="mt-6 max-w-md font-display text-lg italic text-mist sm:text-xl"
          initial={{ opacity: 0, y: 16 }}
          animate={
            introState === "visible" ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }
          }
          transition={{ duration: 0.9, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          I turn imagination into immersive realities.
        </motion.p>

        <motion.ul
          className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs uppercase tracking-[0.2em] text-paper/80"
          initial={{ opacity: 0, y: 16 }}
          animate={
            introState === "visible" ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }
          }
          transition={{ duration: 0.9, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          {ROLES.map((role, i) => (
            <li key={role} className="flex items-center gap-4">
              {role}
              {i < ROLES.length - 1 && (
                <span className="h-1 w-1 rounded-full bg-accent-blue" />
              )}
            </li>
          ))}
        </motion.ul>
      </div>

      <ScrollCue visible={introState === "visible"} />
    </section>
  );
}

function ScrollCue({ visible }: { visible: boolean }) {
  return (
    <motion.a
      href="#about"
      data-cursor="link"
      className="group absolute bottom-8 right-6 z-10 flex flex-col items-center gap-3 sm:right-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 1, delay: 1.1 }}
    >
      <span
        className="font-mono text-[10px] uppercase tracking-[0.3em] text-mist"
        style={{ writingMode: "vertical-rl" }}
      >
        Scroll
      </span>
      <span className="relative h-16 w-px overflow-hidden bg-line">
        <motion.span
          className="absolute inset-x-0 top-0 h-1/2 bg-accent-blue"
          animate={{ y: ["-100%", "200%"] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </span>
    </motion.a>
  );
}
