"use client";

import { Canvas } from "@react-three/fiber";
import { Lab04Mark } from "@/components/canvas/lab-04-mark";

type Lab04SceneProps = {
  compact?: boolean;
  progress: number;
  reducedMotion?: boolean;
};

const desktopCamera = {
  position: [0, 0.08, 6.8] as [number, number, number],
  fov: 38,
};

const compactCamera = {
  position: [0, 0.08, 8.2] as [number, number, number],
  fov: 43,
};

const dprSettings = [1, 1.5] as [number, number];

const glSettings = {
  alpha: true,
  antialias: true,
  powerPreference: "high-performance" as const,
};

function clamp(value: number) {
  return Math.min(1, Math.max(0, value));
}

function smoothstep(value: number, min: number, max: number) {
  const normalized = clamp((value - min) / Math.max(0.001, max - min));

  return normalized * normalized * (3 - 2 * normalized);
}

function SceneDepth({ compact = false, progress }: Pick<Lab04SceneProps, "compact" | "progress">) {
  const reveal = smoothstep(progress, 0.08, 0.58);
  const settle = smoothstep(progress, 0.76, 1);
  const opacity = 0.02 + reveal * 0.04;

  return (
    <group position={compact ? [0, -1.52, -0.6] : [0.24 + settle * 0.16, -1.62, -0.68]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} scale={compact ? [0.72, 0.34, 1] : [1, 0.42, 1]}>
        <circleGeometry args={[3.15, 96]} />
        <meshBasicMaterial color="#d8dee9" transparent opacity={opacity} />
      </mesh>

      <mesh position={[0, 0.02, 0]}>
        <boxGeometry args={[compact ? 3.2 : 4.8, 0.012, 0.012]} />
        <meshBasicMaterial color="#eef1f5" transparent opacity={0.1 + reveal * 0.04} />
      </mesh>

      <mesh position={[0, 0.22, -0.34]}>
        <boxGeometry args={[compact ? 1.8 : 3.1, 0.01, 0.01]} />
        <meshBasicMaterial color="#8797ad" transparent opacity={0.1 + reveal * 0.04} />
      </mesh>
    </group>
  );
}

function StudioFrame({ compact = false }: Pick<Lab04SceneProps, "compact">) {
  if (compact) {
    return null;
  }

  return (
    <group position={[0.4, 0.02, -0.9]}>
      <mesh position={[0, 1.04, 0]}>
        <boxGeometry args={[3.2, 0.012, 0.012]} />
        <meshBasicMaterial color="#f2f0e8" transparent opacity={0.12} />
      </mesh>
      <mesh position={[-1.58, 0, 0]}>
        <boxGeometry args={[0.012, 1.95, 0.012]} />
        <meshBasicMaterial color="#8797ad" transparent opacity={0.12} />
      </mesh>
      <mesh position={[1.58, -0.42, 0]}>
        <boxGeometry args={[0.012, 0.92, 0.012]} />
        <meshBasicMaterial color="#8797ad" transparent opacity={0.08} />
      </mesh>
    </group>
  );
}

export function Lab04Scene({
  compact = false,
  progress,
  reducedMotion = false,
}: Lab04SceneProps) {
  const camera = compact ? compactCamera : desktopCamera;
  const sceneProgress = reducedMotion
    ? 0.56
    : compact
      ? Math.min(progress * 0.86, 0.82)
      : progress;

  return (
    <Canvas
      aria-hidden
      camera={camera}
      dpr={dprSettings}
      frameloop={reducedMotion ? "demand" : "always"}
      gl={glSettings}
    >
      <color attach="background" args={["#050609"]} />
      <fog attach="fog" args={["#050609", 7.4, 16]} />

      <ambientLight intensity={0.28} />
      <directionalLight position={[3.5, 4.4, 5.2]} intensity={1.42} />
      <spotLight
        angle={0.34}
        color="#f2f0e8"
        intensity={4.1}
        penumbra={0.78}
        position={[1.8, 3.2, 5.6]}
      />
      <pointLight color="#c8d2df" position={[-3.2, 2.4, 4.4]} intensity={2.4} />
      <pointLight color="#eef1f5" position={[2.7, -2.4, 3.2]} intensity={1.15} />
      <pointLight color="#61718a" position={[0, -1.5, 2]} intensity={1.2} />

      <Lab04Mark
        compact={compact}
        progress={sceneProgress}
        reducedMotion={reducedMotion}
      />
      <SceneDepth compact={compact} progress={sceneProgress} />
      <StudioFrame compact={compact} />
    </Canvas>
  );
}
