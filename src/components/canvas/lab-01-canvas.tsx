"use client";

import { Canvas } from "@react-three/fiber";
import { Lab01Object } from "@/components/canvas/lab-01-object";
import {
  canvasDprSettings,
  canvasGlSettings,
} from "@/lib/three/canvas-settings";

type Lab01CanvasProps = {
  progress: number;
  reducedMotion: boolean;
};

const cameraSettings = {
  position: [0, 0, 7.4] as [number, number, number],
  fov: 38,
};

export function Lab01Canvas({ progress, reducedMotion }: Lab01CanvasProps) {
  return (
    <Canvas
      aria-hidden
      camera={cameraSettings}
      dpr={canvasDprSettings}
      frameloop={reducedMotion ? "demand" : "always"}
      gl={canvasGlSettings}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[3.8, 4.2, 5]} intensity={2.05} />
      <pointLight color="#9eb3d6" position={[-3, 2.2, 3.4]} intensity={4.8} />
      <pointLight color="#f4f1e8" position={[2.8, -2.4, 3.2]} intensity={1.35} />

      <Lab01Object progress={progress} reducedMotion={reducedMotion} />

      <mesh
        position={[0, -2.2, -0.55]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[1.9, 0.32, 1]}
      >
        <circleGeometry args={[2.25, 48]} />
        <meshBasicMaterial color="#d7dde8" transparent opacity={0.045} />
      </mesh>
    </Canvas>
  );
}
