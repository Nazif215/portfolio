"use client";

import { useEffect, useState } from "react";
import { useLoading } from "@/lib/loading-context";
import { useReducedMotion } from "@/lib/use-reduced-motion";

export function Loader() {
  const { isLoading, finishLoading } = useLoading();
  const reduced = useReducedMotion();
  const [count, setCount] = useState(0);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    // A backgrounded/hidden tab gets its timers throttled or paused by the
    // browser — never gate the whole site behind an intro animation nobody
    // is watching yet.
    if (reduced || document.visibilityState === "hidden") {
      finishLoading();
      return;
    }

    const duration = 1400;
    const stepMs = 30;
    const start = Date.now();

    const interval = setInterval(() => {
      const progress = Math.min((Date.now() - start) / duration, 1);
      setCount(Math.round(progress * 100));
      if (progress >= 1) {
        clearInterval(interval);
        setTimeout(finishLoading, 250);
      }
    }, stepMs);

    // Hard safety net: never let the intro block the site indefinitely,
    // even if a throttled/backgrounded tab stalls the interval above.
    const safety = setTimeout(finishLoading, duration + 1500);

    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") finishLoading();
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      clearInterval(interval);
      clearTimeout(safety);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  // pointer-events flips the instant `isLoading` goes false — a plain class
  // change applied synchronously at render, not dependent on the fade
  // transition (or any animation frame loop) ever completing.
  useEffect(() => {
    if (isLoading) return;
    const t = setTimeout(() => setMounted(false), 650);
    return () => clearTimeout(t);
  }, [isLoading]);

  if (!mounted) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink transition-opacity duration-[600ms] ease-out ${
        isLoading ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <div className="flex flex-col items-center gap-6">
        <span className="font-mono text-xs tracking-[0.3em] text-mist">
          ENTERING THE WORLD
        </span>
        <span className="font-display text-6xl tabular-nums text-paper sm:text-8xl">
          {count}
        </span>
      </div>
      <div
        className="absolute bottom-12 h-px w-40 origin-left bg-accent-blue transition-transform duration-100 ease-linear sm:w-64"
        style={{ transform: `scaleX(${count / 100})` }}
      />
    </div>
  );
}
