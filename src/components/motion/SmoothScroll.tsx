"use client";

import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "@/lib/use-reduced-motion";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: !reduced,
        syncTouch: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}
