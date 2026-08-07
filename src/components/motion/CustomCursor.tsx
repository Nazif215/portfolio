"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type CursorMode = "default" | "link" | "view" | "close";

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<CursorMode>("default");
  const [label, setLabel] = useState("");
  const coordRef = useRef<HTMLSpanElement>(null);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { damping: 30, stiffness: 300, mass: 0.4 });
  const ringY = useSpring(y, { damping: 30, stiffness: 300, mass: 0.4 });
  const tagX = useSpring(x, { damping: 26, stiffness: 220, mass: 0.5 });
  const tagY = useSpring(y, { damping: 26, stiffness: 220, mass: 0.5 });

  useEffect(() => {
    const query = window.matchMedia("(hover: hover) and (pointer: fine)");
    setEnabled(query.matches);
    const listener = (e: MediaQueryListEvent) => setEnabled(e.matches);
    query.addEventListener("change", listener);
    return () => query.removeEventListener("change", listener);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (coordRef.current) {
        const nx = (e.clientX / window.innerWidth).toFixed(3);
        const ny = (e.clientY / window.innerHeight).toFixed(3);
        coordRef.current.textContent = `X ${nx} · Y ${ny}`;
      }
    };

    const over = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest("[data-cursor]");
      if (target) {
        setMode((target.getAttribute("data-cursor") as CursorMode) || "link");
        setLabel(target.getAttribute("data-cursor-label") || "");
      } else if ((e.target as HTMLElement)?.closest("a, button")) {
        setMode("link");
        setLabel("");
      } else {
        setMode("default");
        setLabel("");
      }
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const scale = mode === "default" ? 1 : mode === "close" ? 1.1 : 2.6;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[100] flex items-center justify-center rounded-full border border-paper/40 mix-blend-difference"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          width: 28,
          height: 28,
        }}
        animate={{ scale }}
        transition={{ scale: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } }}
      >
        {label && (
          <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-paper">
            {label}
          </span>
        )}
      </motion.div>

      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[100] whitespace-nowrap mix-blend-difference"
        style={{
          x: tagX,
          y: tagY,
          translateX: "18px",
          translateY: "18px",
        }}
        animate={{ opacity: mode === "default" ? 0.75 : 0 }}
        transition={{ duration: 0.25 }}
      >
        <span
          ref={coordRef}
          className="font-mono text-[9px] uppercase tracking-[0.1em] text-accent-blue"
        >
          X 0.000 · Y 0.000
        </span>
      </motion.div>
    </>
  );
}
