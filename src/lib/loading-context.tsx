"use client";

import { createContext, useContext, useState } from "react";

type LoadingContextValue = {
  isLoading: boolean;
  finishLoading: () => void;
};

const LoadingContext = createContext<LoadingContextValue>({
  isLoading: false,
  finishLoading: () => {},
});

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <LoadingContext.Provider
      value={{ isLoading, finishLoading: () => setIsLoading(false) }}
    >
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  return useContext(LoadingContext);
}
