"use client";

import { Canvas } from "@react-three/fiber";
import { Lab03Layer } from "@/components/canvas/lab-03-layer";
import { lab03Layers } from "@/lib/animation/lab-03-layers";

type Lab03CanvasProps = {
  compact?: boolean;
  progress: number;
  reducedMotion?: boolean;
};

const desktopCamera = {
  position: [0.12, 0.04, 7.1] as [number, number, number],
  fov: 38,
};

const compactCamera = {
  position: [0.05, 0.08, 8.6] as [number, number, number],
  fov: 44,
};

const dprSettings = [1, 1.5] as [number, number];

const glSettings = {
  alpha: true,
  antialias: true,
  powerPreference: "high-performance" as const,
};

function Lab03SystemObject({
  compact = false,
  progress,
  reducedMotion = false,
}: Lab03CanvasProps) {
  return (
    <group
      position={compact ? [0, -0.38, 0] : [0.45, 0.04, 0]}
      rotation={compact ? [-0.08, -0.08, 0] : [-0.1, -0.2, 0.015]}
    >
      {lab03Layers.map((layer, index) => (
        <Lab03Layer
          key={layer.id}
          compact={compact}
          layer={layer}
          layerIndex={index}
          progress={progress}
          reducedMotion={reducedMotion}
        />
      ))}
    </group>
  );
}

function SceneGuide({ compact = false }: Pick<Lab03CanvasProps, "compact">) {
  return (
    <group position={compact ? [0, -1.35, -0.4] : [0, -1.62, -0.5]}>
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        scale={compact ? [0.76, 0.42, 1] : [1, 0.5, 1]}
      >
        <circleGeometry args={[2.95, 96]} />
        <meshBasicMaterial color="#d8dee9" transparent opacity={0.026} />
      </mesh>
      <mesh position={[0, 0.02, 0]}>
        <boxGeometry args={[compact ? 3.8 : 4.8, 0.012, 0.012]} />
        <meshBasicMaterial color="#eef1f5" transparent opacity={0.14} />
      </mesh>
      <mesh position={[0, -0.18, 0.3]}>
        <boxGeometry args={[compact ? 2.4 : 3.2, 0.01, 0.01]} />
        <meshBasicMaterial color="#8190a2" transparent opacity={0.14} />
      </mesh>
    </group>
  );
}

export function Lab03Canvas({
  compact = false,
  progress,
  reducedMotion = false,
}: Lab03CanvasProps) {
  const camera = compact ? compactCamera : desktopCamera;
  const sceneProgress = reducedMotion
    ? 0.78
    : compact
      ? Math.min(progress * 0.9, 0.84)
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
      <fog attach="fog" args={["#050609", 7.2, 16]} />

      <ambientLight intensity={0.38} />
      <directionalLight position={[3.8, 4.4, 5.2]} intensity={1.65} />
      <pointLight color="#c8d2df" position={[-3.2, 2.6, 4.8]} intensity={3.1} />
      <pointLight color="#eef1f5" position={[2.8, -2.2, 3.2]} intensity={1.35} />
      <pointLight color="#65758c" position={[0.4, -1.6, 1.8]} intensity={1.6} />

      <Lab03SystemObject
        compact={compact}
        progress={sceneProgress}
        reducedMotion={reducedMotion}
      />
      <SceneGuide compact={compact} />
    </Canvas>
  );
}
