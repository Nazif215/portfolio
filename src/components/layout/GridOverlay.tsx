"use client";

import { useGrid } from "@/lib/grid-context";

const COLUMNS = 12;

export function GridOverlay() {
  const { gridVisible } = useGrid();

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[55] transition-opacity duration-500"
      style={{ opacity: gridVisible ? 1 : 0.05 }}
    >
      <div className="container-edge grid h-full grid-cols-12 gap-4">
        {Array.from({ length: COLUMNS }).map((_, i) => (
          <div key={i} className="relative h-full border-x border-accent-blue/40">
            {gridVisible && (
              <span className="absolute left-1 top-24 font-mono text-[9px] text-accent-blue/70">
                {String(i + 1).padStart(2, "0")}
              </span>
            )}
          </div>
        ))}
      </div>
      {gridVisible && (
        <div className="absolute inset-x-0 top-24 h-px bg-accent-emerald/40" />
      )}
    </div>
  );
}
