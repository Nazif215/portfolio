"use client";

import { Canvas } from "@react-three/fiber";
import { ParticleField } from "./ParticleField";
import { useReducedMotion } from "@/lib/use-reduced-motion";

export function HeroBackground() {
  const reduced = useReducedMotion();

  return (
    <Canvas
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, 7.5], fov: 50 }}
      className="!absolute inset-0"
    >
      <ParticleField reduced={reduced} />
    </Canvas>
  );
}
