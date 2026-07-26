"use client";

import { createContext, useContext, useEffect, useState } from "react";

type GridContextValue = {
  gridVisible: boolean;
  toggleGrid: () => void;
};

const GridContext = createContext<GridContextValue>({
  gridVisible: false,
  toggleGrid: () => {},
});

export function GridProvider({ children }: { children: React.ReactNode }) {
  const [gridVisible, setGridVisible] = useState(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() !== "g") return;
      const target = e.target as HTMLElement;
      if (["INPUT", "TEXTAREA"].includes(target.tagName)) return;
      setGridVisible((v) => !v);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <GridContext.Provider
      value={{ gridVisible, toggleGrid: () => setGridVisible((v) => !v) }}
    >
      {children}
    </GridContext.Provider>
  );
}

export function useGrid() {
  return useContext(GridContext);
}
