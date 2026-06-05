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

function clamp(value: number) {
  return Math.min(1, Math.max(0, value));
}

function smoothstep(value: number, min: number, max: number) {
  const normalized = clamp((value - min) / Math.max(0.001, max - min));

  return normalized * normalized * (3 - 2 * normalized);
}

function SystemSpine({ progress }: Pick<Lab03CanvasProps, "progress">) {
  const reveal = smoothstep(progress, 0.18, 0.74);
  const finalSettle = smoothstep(progress, 0.82, 1);
  const opacity = 0.08 + reveal * 0.16;
  const settleX = 1 - finalSettle * 0.12;
  const settleY = 1 - finalSettle * 0.08;

  return (
    <group position={[0, 0, -0.42]}>
      <mesh>
        <boxGeometry args={[0.014, 3.25 * reveal, 0.014]} />
        <meshBasicMaterial color="#d8dee9" transparent opacity={opacity} />
      </mesh>

      {lab03Layers.map((layer) => {
        const x = layer.explodedPosition[0] * 0.44 * reveal * settleX;
        const y = layer.explodedPosition[1] * 0.82 * reveal * settleY;
        const z = layer.explodedPosition[2] * 0.18 * reveal;
        const lineWidth = Math.max(0.08, Math.abs(x));

        return (
          <group key={layer.id} position={[0, y, z]}>
            <mesh position={[x / 2, 0, 0]}>
              <boxGeometry args={[lineWidth, 0.01, 0.01]} />
              <meshBasicMaterial
                color={layer.accent}
                transparent
                opacity={opacity * 0.68}
              />
            </mesh>
            <mesh>
              <sphereGeometry args={[0.026, 14, 14]} />
              <meshStandardMaterial color={layer.secondary} roughness={0.38} />
            </mesh>
            <mesh position={[x, 0, 0]}>
              <sphereGeometry args={[0.022, 14, 14]} />
              <meshStandardMaterial color={layer.accent} roughness={0.32} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

function Lab03SystemObject({
  compact = false,
  progress,
  reducedMotion = false,
}: Lab03CanvasProps) {
  const finalResolve = smoothstep(progress, 0.82, 1);
  const desktopX = 0.45 + finalResolve * 0.42;
  const desktopScale = 1 - finalResolve * 0.05;

  return (
    <group
      position={compact ? [0, -0.38, 0] : [desktopX, 0.04, 0]}
      rotation={compact ? [-0.08, -0.08, 0] : [-0.1, -0.2, 0.015]}
      scale={compact ? 1 : desktopScale}
    >
      {!compact && <SystemSpine progress={progress} />}

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
        <meshBasicMaterial color="#eef1f5" transparent opacity={0.12} />
      </mesh>
      <mesh position={[0, -0.18, 0.3]}>
        <boxGeometry args={[compact ? 2.4 : 3.2, 0.01, 0.01]} />
        <meshBasicMaterial color="#8190a2" transparent opacity={0.14} />
      </mesh>
      <mesh position={[0, 0.2, -0.36]}>
        <boxGeometry args={[compact ? 1.7 : 2.5, 0.01, 0.01]} />
        <meshBasicMaterial color="#f2f0e8" transparent opacity={0.08} />
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
      <fog attach="fog" args={["#050609", 7.8, 17]} />

      <ambientLight intensity={0.3} />
      <directionalLight position={[3.8, 4.4, 5.2]} intensity={1.75} />
      <spotLight
        angle={0.36}
        color="#f2f0e8"
        intensity={3.8}
        penumbra={0.78}
        position={[1.6, 3.2, 5.6]}
      />
      <pointLight color="#c8d2df" position={[-3.2, 2.6, 4.8]} intensity={2.7} />
      <pointLight color="#eef1f5" position={[2.8, -2.2, 3.2]} intensity={1.35} />
      <pointLight color="#65758c" position={[0.4, -1.6, 1.8]} intensity={1.35} />

      <Lab03SystemObject
        compact={compact}
        progress={sceneProgress}
        reducedMotion={reducedMotion}
      />
      <SceneGuide compact={compact} />
    </Canvas>
  );
}
