"use client";

import { EnvelopeSimple, LinkedinLogo, type Icon } from "@phosphor-icons/react";
import { FadeIn } from "@/components/motion/FadeIn";
import { Magnetic } from "@/components/motion/Magnetic";
import { SOCIAL_LINKS } from "@/lib/social-links";
import { RegistrationMarks } from "@/components/layout/RegistrationMarks";
import { StudioClock } from "@/components/layout/StudioClock";

const ICONS: Record<string, Icon> = {
  EnvelopeSimple,
  LinkedinLogo,
};

export function Contact() {
  return (
    <section id="contact" className="relative bg-ink py-28 sm:py-40">
      <RegistrationMarks />
      <div className="container-edge text-center">
        <FadeIn>
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-mist">
            04 — Contact <span className="text-mist-dim">/ COL 01–12</span>
          </span>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h2 className="mx-auto mt-8 max-w-3xl text-balance font-display text-4xl leading-tight text-paper sm:text-6xl lg:text-7xl">
            Let&rsquo;s build something unforgettable.
          </h2>
        </FadeIn>

        <FadeIn delay={0.2}>
          <Magnetic className="mt-10 inline-block" strength={0.3}>
            <a
              href="mailto:Nasifsafeer215@gmail.com"
              data-cursor="link"
              className="inline-flex items-center gap-3 rounded-full border border-line px-8 py-4 font-mono text-sm uppercase tracking-[0.2em] text-paper transition-colors hover:border-accent-blue hover:text-accent-blue"
            >
              Nasifsafeer215@gmail.com
            </a>
          </Magnetic>
        </FadeIn>

        <FadeIn delay={0.3}>
          <ul className="mt-16 flex flex-wrap items-center justify-center gap-4">
            {SOCIAL_LINKS.map((social) => {
              const IconCmp = ICONS[social.icon];
              return (
                <li key={social.label}>
                  <Magnetic strength={0.5}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={social.label}
                      data-cursor="link"
                      className="group flex min-h-11 items-center gap-2 rounded-full border border-line px-5 py-3 font-mono text-xs uppercase tracking-[0.15em] text-mist transition-colors hover:border-accent-emerald hover:text-paper"
                    >
                      <IconCmp className="h-4 w-4" />
                      {social.label}
                    </a>
                  </Magnetic>
                </li>
              );
            })}
          </ul>
        </FadeIn>
      </div>

      <footer className="container-edge mt-32 flex flex-col items-center justify-between gap-4 border-t border-line pt-8 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-mist-dim sm:flex-row sm:text-left">
        <span>© {new Date().getFullYear()} Nasif Muhammed Safeer</span>
        <StudioClock />
        <span>Designed &amp; built with obsessive attention to detail</span>
      </footer>
    </section>
  );
}
