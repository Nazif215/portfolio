"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function ParticleField({ reduced }: { reduced: boolean }) {
  const pointsRef = useRef<THREE.Points>(null);
  const gridRef = useRef<THREE.LineSegments>(null);
  const mouse = useRef({ x: 0, y: 0 });

  const positions = useMemo(() => {
    const count = 2200;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 5.5 + Math.random() * 6.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.55;
      pos[i * 3 + 2] = radius * Math.cos(phi) - 3;
    }
    return pos;
  }, []);

  useEffect(() => {
    if (reduced) return;
    const handler = (e: PointerEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", handler);
    return () => window.removeEventListener("pointermove", handler);
  }, [reduced]);

  useFrame((state, delta) => {
    if (pointsRef.current && !reduced) {
      pointsRef.current.rotation.y += delta * 0.025;
      pointsRef.current.rotation.x += delta * 0.004;
    }
    if (gridRef.current && !reduced) {
      gridRef.current.rotation.z += delta * 0.01;
    }

    const targetX = mouse.current.x * 0.7;
    const targetY = -mouse.current.y * 0.45;
    state.camera.position.x += (targetX - state.camera.position.x) * 0.025;
    state.camera.position.y += (targetY - state.camera.position.y) * 0.025;
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <group>
      <fog attach="fog" args={["#0a0a0b", 6, 18]} />
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.045}
          sizeAttenuation
          transparent
          opacity={0.75}
          color="#8fd0ff"
          depthWrite={false}
        />
      </points>

      <lineSegments ref={gridRef} position={[0, -2.6, -2]} rotation={[Math.PI / 2.4, 0, 0]}>
        <edgesGeometry args={[new THREE.PlaneGeometry(16, 16, 18, 18)]} />
        <lineBasicMaterial color="#5ecbaa" transparent opacity={0.12} />
      </lineSegments>

      <mesh position={[0, 0, -5]} rotation={[0.4, 0.6, 0]}>
        <icosahedronGeometry args={[2.4, 1]} />
        <meshBasicMaterial color="#f4f3ef" wireframe transparent opacity={0.06} />
      </mesh>
    </group>
  );
}
