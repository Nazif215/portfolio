"use client";

import { useEffect, useState } from "react";
import { Magnetic } from "@/components/motion/Magnetic";
import { useGrid } from "@/lib/grid-context";

const LINKS = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#journey", label: "Journey" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [hidden, setHidden] = useState(false);
  const { gridVisible, toggleGrid } = useGrid();

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > lastY && y > 200);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 mix-blend-difference transition-transform duration-500 ease-out ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <nav className="container-edge flex items-center justify-between py-6 text-paper">
        <a
          href="#top"
          data-cursor="link"
          className="inline-flex min-h-11 items-center font-mono text-xs tracking-[0.3em]"
        >
          N.S.
        </a>

        <div className="flex items-center gap-3 sm:gap-6 lg:gap-8">
          <span className="hidden items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-paper/70 lg:flex">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-emerald opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-emerald" />
            </span>
            Available for select projects
          </span>

          <Magnetic strength={0.5}>
            <button
              onClick={toggleGrid}
              data-cursor="link"
              data-cursor-label="Toggle"
              aria-pressed={gridVisible}
              className="hidden min-h-11 items-center gap-2 border-r border-paper/20 pr-6 font-mono text-xs uppercase tracking-[0.2em] sm:inline-flex sm:pr-8"
            >
              <span
                className={`h-1.5 w-1.5 rounded-full border border-paper transition-colors ${
                  gridVisible ? "bg-accent-blue" : "bg-transparent"
                }`}
              />
              Grid
            </button>
          </Magnetic>

          <ul className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] sm:gap-6 lg:gap-8">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Magnetic strength={0.5}>
                  <a
                    href={link.href}
                    data-cursor="link"
                    className="group relative inline-flex min-h-11 items-center py-1"
                  >
                    {link.label}
                    <span className="absolute inset-x-0 bottom-3 h-px origin-left scale-x-0 bg-paper transition-transform duration-300 group-hover:scale-x-100" />
                  </a>
                </Magnetic>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
