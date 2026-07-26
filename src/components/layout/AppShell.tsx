"use client";

import { LoadingProvider } from "@/lib/loading-context";
import { GridProvider } from "@/lib/grid-context";
import { Loader } from "@/components/motion/Loader";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { CustomCursor } from "@/components/motion/CustomCursor";
import { GridOverlay } from "@/components/layout/GridOverlay";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <LoadingProvider>
      <GridProvider>
        <Loader />
        <div className="grain" aria-hidden />
        <GridOverlay />
        <CustomCursor />
        <SmoothScroll>{children}</SmoothScroll>
      </GridProvider>
    </LoadingProvider>
  );
}
