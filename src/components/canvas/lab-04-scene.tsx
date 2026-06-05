"use client";

import { Canvas } from "@react-three/fiber";
import { ACESFilmicToneMapping, SRGBColorSpace } from "three";
import { Lab04Mark } from "@/components/canvas/lab-04-mark";

type Lab04SceneProps = {
  compact?: boolean;
  progress: number;
  reducedMotion?: boolean;
};

const desktopCamera = {
  position: [0, 0.04, 7.25] as [number, number, number],
  fov: 35,
};

const compactCamera = {
  position: [0, 0.05, 8.65] as [number, number, number],
  fov: 41,
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
  const reveal = smoothstep(progress, 0.14, 0.68);
  const settle = smoothstep(progress, 0.76, 1);
  const opacity = 0.012 + reveal * 0.026;

  return (
    <group position={compact ? [0, -1.56, -0.62] : [0.18 + settle * 0.1, -1.56, -0.82]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} scale={compact ? [0.66, 0.28, 1] : [0.94, 0.34, 1]}>
        <circleGeometry args={[3.15, 96]} />
        <meshBasicMaterial color="#ebe6dc" transparent opacity={opacity} />
      </mesh>

      <mesh position={[0, 0.02, 0]}>
        <boxGeometry args={[compact ? 2.7 : 4.1, 0.009, 0.009]} />
        <meshBasicMaterial color="#e8e1d5" transparent opacity={0.055 + reveal * 0.035} />
      </mesh>

      <mesh position={[0, 0.22, -0.34]}>
        <boxGeometry args={[compact ? 1.45 : 2.45, 0.008, 0.008]} />
        <meshBasicMaterial color="#7a8798" transparent opacity={0.07 + reveal * 0.025} />
      </mesh>
    </group>
  );
}

function StudioFrame({ compact = false }: Pick<Lab04SceneProps, "compact">) {
  if (compact) {
    return null;
  }

  return (
    <group position={[0.34, -0.02, -1.05]}>
      <mesh position={[0, 1.04, 0]}>
        <boxGeometry args={[2.82, 0.009, 0.009]} />
        <meshBasicMaterial color="#efe9dd" transparent opacity={0.09} />
      </mesh>
      <mesh position={[-1.58, 0, 0]}>
        <boxGeometry args={[0.009, 1.74, 0.009]} />
        <meshBasicMaterial color="#7b8796" transparent opacity={0.09} />
      </mesh>
      <mesh position={[1.58, -0.42, 0]}>
        <boxGeometry args={[0.009, 0.82, 0.009]} />
        <meshBasicMaterial color="#7b8796" transparent opacity={0.06} />
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
      onCreated={({ gl }) => {
        gl.outputColorSpace = SRGBColorSpace;
        gl.toneMapping = ACESFilmicToneMapping;
        gl.toneMappingExposure = 0.86;
      }}
    >
      <color attach="background" args={["#050609"]} />
      <fog attach="fog" args={["#050609", 7.4, 16]} />

      <ambientLight intensity={0.18} />
      <hemisphereLight color="#f5ecdf" groundColor="#070b10" intensity={0.24} />
      <directionalLight color="#f2eadf" position={[2.8, 4.2, 5.6]} intensity={1.02} />
      <spotLight
        angle={0.28}
        color="#fff3e2"
        intensity={2.55}
        penumbra={0.84}
        position={[1.4, 3.6, 5.9]}
      />
      <pointLight color="#c7d3e2" position={[-3.4, 1.8, 3.8]} intensity={0.78} />
      <pointLight color="#7b8899" position={[2.8, -2.1, 3.1]} intensity={0.42} />

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
