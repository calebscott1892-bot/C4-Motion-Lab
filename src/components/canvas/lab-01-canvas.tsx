"use client";

import { Canvas } from "@react-three/fiber";
import { Lab01Object } from "@/components/canvas/lab-01-object";

type Lab01CanvasProps = {
  progress: number;
  reducedMotion: boolean;
};

const cameraSettings = {
  position: [0, 0, 7] as [number, number, number],
  fov: 42,
};

const glSettings = {
  alpha: true,
  antialias: true,
  powerPreference: "high-performance" as const,
};

export function Lab01Canvas({ progress, reducedMotion }: Lab01CanvasProps) {
  return (
    <Canvas
      aria-hidden
      camera={cameraSettings}
      dpr={[1, 1.5]}
      frameloop={reducedMotion ? "demand" : "always"}
      gl={glSettings}
    >
      <ambientLight intensity={0.62} />
      <directionalLight position={[3.5, 4.5, 5]} intensity={2.4} />
      <pointLight color="#7ea8ff" position={[-3, 2.4, 3.2]} intensity={8.5} />
      <pointLight color="#f4f1e8" position={[2.8, -2, 3]} intensity={2.2} />

      <Lab01Object progress={progress} reducedMotion={reducedMotion} />

      <mesh position={[0, -2.22, -0.35]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[3.4, 64]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.035} />
      </mesh>
    </Canvas>
  );
}
