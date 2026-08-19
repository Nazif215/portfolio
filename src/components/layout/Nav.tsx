"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CaretDown } from "@phosphor-icons/react";
import { Magnetic } from "@/components/motion/Magnetic";
import { useGrid } from "@/lib/grid-context";

type NavLink = {
  href: string;
  label: string;
  children?: { href: string; label: string }[];
};

const LINKS: NavLink[] = [
  {
    href: "#work",
    label: "Work",
    children: [
      { href: "#work", label: "Projects" },
      { href: "#photogrammetry", label: "Photogrammetry" },
    ],
  },
  { href: "#about", label: "About" },
  { href: "#journey", label: "Journey" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [hidden, setHidden] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const { gridVisible, toggleGrid } = useGrid();
  const headerRef = useRef<HTMLElement>(null);

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

  // Close the submenu on outside click, Escape, or when the bar hides itself.
  useEffect(() => {
    if (!openMenu) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setOpenMenu(null);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenMenu(null);
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [openMenu]);

  useEffect(() => {
    if (hidden) setOpenMenu(null);
  }, [hidden]);

  return (
    <header
      ref={headerRef}
      className={`fixed inset-x-0 top-0 z-50 transition-transform duration-500 ease-out ${
        hidden ? "-translate-y-full" : "translate-y-0"
      } ${
        // mix-blend-difference would swallow the submenu panel's own
        // background, so drop it while the menu is open. The site is dark
        // throughout, so the bar itself looks the same either way.
        openMenu ? "mix-blend-normal" : "mix-blend-difference"
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
            {LINKS.map((link) => {
              const isOpen = openMenu === link.label;

              if (!link.children) {
                return (
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
                );
              }

              return (
                <li key={link.href} className="relative">
                  <Magnetic strength={0.5}>
                    <button
                      onClick={() => setOpenMenu(isOpen ? null : link.label)}
                      data-cursor="link"
                      aria-expanded={isOpen}
                      aria-haspopup="true"
                      className="group relative inline-flex min-h-11 items-center gap-1.5 py-1 font-mono text-xs uppercase tracking-[0.2em]"
                    >
                      {link.label}
                      <CaretDown
                        className={`h-3 w-3 transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                      <span className="absolute inset-x-0 bottom-3 h-px origin-left scale-x-0 bg-paper transition-transform duration-300 group-hover:scale-x-100" />
                    </button>
                  </Magnetic>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.ul
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute left-0 top-full z-10 min-w-[11rem] border border-line bg-ink/95 py-1 backdrop-blur-sm"
                      >
                        {link.children.map((child) => (
                          <li key={child.label}>
                            <a
                              href={child.href}
                              onClick={() => setOpenMenu(null)}
                              data-cursor="link"
                              className="flex min-h-11 items-center px-4 text-mist transition-colors hover:text-paper"
                            >
                              {child.label}
                            </a>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </header>
  );
}
