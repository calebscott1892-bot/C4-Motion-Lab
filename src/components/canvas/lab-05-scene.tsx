"use client";

import { RoundedBox } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo } from "react";
import {
  ACESFilmicToneMapping,
  MathUtils,
  SRGBColorSpace,
  Vector3,
} from "three";
import { lab05ProcessCards } from "@/lib/animation/lab-05-story";
import {
  canvasDprSettings,
  canvasGlSettings,
} from "@/lib/three/canvas-settings";

type Lab05SceneProps = {
  compact?: boolean;
  progress: number;
  reducedMotion?: boolean;
};

type VectorTuple = [number, number, number];

const desktopCamera = {
  fov: 36,
  position: [0, 0.04, 8.15] as VectorTuple,
};

const compactCamera = {
  fov: 43,
  position: [0, 0.1, 9.35] as VectorTuple,
};

function clamp(value: number) {
  return Math.min(1, Math.max(0, value));
}

function smoothstep(value: number, min: number, max: number) {
  const normalized = clamp((value - min) / Math.max(0.001, max - min));

  return normalized * normalized * (3 - 2 * normalized);
}

function lerpTuple(from: VectorTuple, to: VectorTuple, amount: number): VectorTuple {
  return [
    MathUtils.lerp(from[0], to[0], amount),
    MathUtils.lerp(from[1], to[1], amount),
    MathUtils.lerp(from[2], to[2], amount),
  ];
}

function getLayerPosition(index: number, progress: number): VectorTuple {
  const assemble = smoothstep(progress, 0.16, 0.3);
  const split = smoothstep(progress, 0.34, 0.52);
  const connect = smoothstep(progress, 0.52, 0.68);
  const resolve = smoothstep(progress, 0.72, 0.9);
  const centeredIndex = index - 2;
  const angle = -Math.PI * 0.82 + index * (Math.PI * 0.41);

  const start: VectorTuple = [centeredIndex * 0.018, centeredIndex * -0.012, -0.2];
  const assembled: VectorTuple = [
    centeredIndex * 0.026,
    centeredIndex * -0.045,
    centeredIndex * 0.045,
  ];
  const splitPosition: VectorTuple = [
    centeredIndex * 0.12,
    centeredIndex * -0.32,
    centeredIndex * 0.14,
  ];
  const ecosystem: VectorTuple = [
    Math.cos(angle) * 1.12,
    Math.sin(angle) * 0.58,
    -0.06 + Math.sin(angle) * 0.15,
  ];
  const resolved: VectorTuple = [
    ecosystem[0] * 0.66 + 0.26,
    ecosystem[1] * 0.48,
    ecosystem[2] - 0.04,
  ];

  return lerpTuple(
    lerpTuple(
      lerpTuple(lerpTuple(start, assembled, assemble), splitPosition, split),
      ecosystem,
      connect,
    ),
    resolved,
    resolve,
  );
}

function StoryCameraRig({
  compact = false,
  progress,
}: Pick<Lab05SceneProps, "compact" | "progress">) {
  const targetPosition = useMemo(() => new Vector3(), []);
  const lookTarget = useMemo(() => new Vector3(), []);

  useFrame(({ camera }, delta) => {
    const approach = smoothstep(progress, 0.06, 0.24);
    const split = smoothstep(progress, 0.34, 0.58);
    const resolve = smoothstep(progress, 0.72, 0.9);

    targetPosition.set(
      compact ? 0 : MathUtils.lerp(0, 0.34, resolve),
      MathUtils.lerp(compact ? 0.1 : 0.04, compact ? -0.05 : 0.12, split),
      MathUtils.lerp(compact ? 9.35 : 8.15, compact ? 7.65 : 5.82, approach) +
        resolve * 0.62,
    );

    lookTarget.set(
      compact ? 0 : MathUtils.lerp(0, 0.2, resolve),
      MathUtils.lerp(0, -0.02, split),
      0,
    );

    camera.position.lerp(targetPosition, 1 - Math.exp(-delta * 2.55));
    camera.lookAt(lookTarget);
  });

  return null;
}

function SignatureMark({ progress }: Pick<Lab05SceneProps, "progress">) {
  const assemble = smoothstep(progress, 0.16, 0.34);
  const resolve = smoothstep(progress, 0.72, 0.9);
  const opacity = Math.max(0.14, 1 - assemble * 0.72 - resolve * 0.18);
  const scale = MathUtils.lerp(1, 0.7, assemble) * MathUtils.lerp(1, 0.82, resolve);

  return (
    <group
      position={[0, MathUtils.lerp(0.05, 0.2, assemble), -0.08 - assemble * 0.24]}
      rotation={[0.02, MathUtils.lerp(-0.18, 0.08, progress), -0.012]}
      scale={scale}
    >
      <mesh rotation={[0, 0, Math.PI * 0.18]}>
        <torusGeometry args={[0.52, 0.055, 24, 96, Math.PI * 1.52]} />
        <meshPhysicalMaterial
          clearcoat={0.34}
          clearcoatRoughness={0.52}
          color="#e9e1d1"
          metalness={0.06}
          opacity={opacity}
          roughness={0.34}
          transparent
        />
      </mesh>

      <RoundedBox args={[0.11, 0.92, 0.14]} position={[0.46, 0, 0.02]} radius={0.018}>
        <meshPhysicalMaterial
          clearcoat={0.3}
          clearcoatRoughness={0.58}
          color="#c8d0da"
          metalness={0.08}
          opacity={opacity}
          roughness={0.36}
          transparent
        />
      </RoundedBox>
      <RoundedBox
        args={[0.66, 0.1, 0.13]}
        position={[0.17, 0.08, 0.04]}
        radius={0.018}
      >
        <meshPhysicalMaterial
          clearcoat={0.3}
          clearcoatRoughness={0.6}
          color="#8f9aa8"
          metalness={0.07}
          opacity={opacity}
          roughness={0.38}
          transparent
        />
      </RoundedBox>
      <RoundedBox
        args={[0.11, 0.78, 0.13]}
        position={[-0.08, 0.22, 0.025]}
        radius={0.018}
        rotation={[0, 0, -0.55]}
      >
        <meshPhysicalMaterial
          clearcoat={0.32}
          clearcoatRoughness={0.54}
          color="#ded8cd"
          metalness={0.06}
          opacity={opacity}
          roughness={0.34}
          transparent
        />
      </RoundedBox>

      <mesh position={[0.25, -0.42, 0.07]}>
        <sphereGeometry args={[0.055, 18, 18]} />
        <meshPhysicalMaterial color="#d2d7df" opacity={opacity} roughness={0.34} transparent />
      </mesh>
    </group>
  );
}

function InterfaceShell({ progress }: Pick<Lab05SceneProps, "progress">) {
  const assemble = smoothstep(progress, 0.18, 0.32);
  const split = smoothstep(progress, 0.36, 0.56);
  const resolve = smoothstep(progress, 0.72, 0.9);
  const opacity = assemble * (1 - split * 0.72) * (1 - resolve * 0.34);

  return (
    <group position={[0, -0.02, -0.2]} scale={[1, 1, 1]}>
      <RoundedBox args={[2.16, 1.28, 0.052]} radius={0.04}>
        <meshPhysicalMaterial
          clearcoat={0.24}
          clearcoatRoughness={0.74}
          color="#10151d"
          metalness={0.04}
          opacity={0.08 + opacity * 0.24}
          roughness={0.64}
          transparent
        />
      </RoundedBox>
      <RoundedBox args={[1.86, 0.018, 0.012]} position={[0, 0.51, 0.04]} radius={0.006}>
        <meshBasicMaterial color="#efe7d8" opacity={opacity * 0.2} transparent />
      </RoundedBox>
      <RoundedBox args={[1.24, 0.012, 0.012]} position={[0.24, 0.33, 0.048]} radius={0.005}>
        <meshBasicMaterial color="#718092" opacity={opacity * 0.16} transparent />
      </RoundedBox>
      <RoundedBox args={[0.018, 0.92, 0.012]} position={[-0.9, -0.02, 0.04]} radius={0.006}>
        <meshBasicMaterial color="#7f8a99" opacity={opacity * 0.18} transparent />
      </RoundedBox>
      <RoundedBox args={[0.62, 0.032, 0.014]} position={[-0.5, -0.46, 0.05]} radius={0.006}>
        <meshBasicMaterial color="#cfd8e6" opacity={opacity * 0.2} transparent />
      </RoundedBox>
      <RoundedBox args={[0.28, 0.032, 0.014]} position={[0.56, -0.46, 0.05]} radius={0.006}>
        <meshBasicMaterial color="#efe7d8" opacity={opacity * 0.14} transparent />
      </RoundedBox>
    </group>
  );
}

function GrowthLayer({
  cardIndex,
  progress,
}: {
  cardIndex: number;
  progress: number;
}) {
  const card = lab05ProcessCards[cardIndex];
  const assemble = smoothstep(progress, 0.16, 0.3);
  const split = smoothstep(progress, 0.34, 0.52);
  const resolve = smoothstep(progress, 0.72, 0.9);
  const position = getLayerPosition(cardIndex, progress);
  const width = MathUtils.lerp(0.48, 1.36, assemble) * MathUtils.lerp(1, 0.58, resolve);
  const height = MathUtils.lerp(0.08, 0.18, assemble) * MathUtils.lerp(1, 0.86, resolve);
  const opacity = Math.min(0.88, 0.08 + assemble * 0.68 + split * 0.12);

  return (
    <group position={position}>
      <RoundedBox args={[width * 1.02, height * 1.08, 0.018]} position={[0.018, -0.018, -0.04]} radius={0.022}>
        <meshBasicMaterial color="#040507" opacity={opacity * 0.46} transparent />
      </RoundedBox>
      <RoundedBox args={[width, height, 0.052]} radius={0.022}>
        <meshPhysicalMaterial
          clearcoat={0.26}
          clearcoatRoughness={0.68}
          color="#151b24"
          metalness={0.04}
          opacity={opacity}
          roughness={0.58}
          transparent
        />
      </RoundedBox>
      <RoundedBox
        args={[0.012, height * 0.76, 0.014]}
        position={[-width * 0.46, 0, 0.04]}
        radius={0.005}
      >
        <meshBasicMaterial color={card.accent} opacity={opacity * 0.52} transparent />
      </RoundedBox>
      <RoundedBox
        args={[width * 0.22, height * 0.14, 0.012]}
        position={[-width * 0.33, height * 0.05, 0.036]}
        radius={0.006}
      >
        <meshBasicMaterial color={card.accent} opacity={opacity * 0.66} transparent />
      </RoundedBox>
      <RoundedBox
        args={[width * 0.46, height * 0.1, 0.012]}
        position={[width * 0.12, -height * 0.1, 0.036]}
        radius={0.006}
      >
        <meshBasicMaterial color="#d9e1ec" opacity={opacity * 0.24} transparent />
      </RoundedBox>
      <mesh position={[width * 0.42, 0, 0.042]}>
        <sphereGeometry args={[0.018 + split * 0.012, 16, 16]} />
        <meshStandardMaterial color={card.accent} opacity={opacity} roughness={0.38} transparent />
      </mesh>
    </group>
  );
}

function Connector({
  from,
  opacity,
  to,
}: {
  from: VectorTuple;
  opacity: number;
  to: VectorTuple;
}) {
  const dx = to[0] - from[0];
  const dy = to[1] - from[1];
  const length = Math.sqrt(dx * dx + dy * dy);
  const angle = Math.atan2(dy, dx);

  return (
    <group position={[(from[0] + to[0]) / 2, (from[1] + to[1]) / 2, -0.05]} rotation={[0, 0, angle]}>
      <mesh>
        <boxGeometry args={[length, 0.008, 0.008]} />
        <meshBasicMaterial color="#d9e1ec" opacity={opacity} transparent />
      </mesh>
    </group>
  );
}

function EcosystemConnectors({ progress }: Pick<Lab05SceneProps, "progress">) {
  const connect = smoothstep(progress, 0.52, 0.7);
  const resolve = smoothstep(progress, 0.72, 0.9);
  const hub: VectorTuple = [resolve * 0.18, 0, -0.05];
  const opacity = connect * MathUtils.lerp(0.18, 0.12, resolve);

  return (
    <group>
      <group position={hub} scale={1 + resolve * 0.12}>
        <mesh>
          <torusGeometry args={[0.24 + connect * 0.12, 0.004, 8, 72]} />
          <meshBasicMaterial color="#efe7d8" opacity={connect * 0.16} transparent />
        </mesh>
        <mesh rotation={[0.22, 0.14, 0.18]}>
          <torusGeometry args={[0.43 + connect * 0.08, 0.003, 8, 72]} />
          <meshBasicMaterial color="#7f8ea1" opacity={connect * 0.1} transparent />
        </mesh>
      </group>
      <mesh position={hub}>
        <sphereGeometry args={[0.045 + connect * 0.035, 20, 20]} />
        <meshPhysicalMaterial
          clearcoat={0.24}
          clearcoatRoughness={0.52}
          color="#f1e4cc"
          opacity={connect * 0.82}
          roughness={0.34}
          transparent
        />
      </mesh>
      {lab05ProcessCards.map((card, index) => (
        <Connector
          key={card.id}
          from={hub}
          opacity={opacity}
          to={getLayerPosition(index, progress)}
        />
      ))}
    </group>
  );
}

function ResolutionPlate({ progress }: Pick<Lab05SceneProps, "progress">) {
  const resolve = smoothstep(progress, 0.72, 0.92);

  return (
    <group position={[0.18, -0.02, -0.28]} scale={[1 + resolve * 0.08, 1, 1]}>
      <RoundedBox args={[2.52, 1.26, 0.026]} radius={0.052}>
        <meshPhysicalMaterial
          clearcoat={0.18}
          clearcoatRoughness={0.78}
          color="#080d14"
          metalness={0.03}
          opacity={resolve * 0.18}
          roughness={0.72}
          transparent
        />
      </RoundedBox>
      <RoundedBox args={[1.7, 0.012, 0.01]} position={[0.1, 0.49, 0.03]} radius={0.005}>
        <meshBasicMaterial color="#efe7d8" opacity={resolve * 0.13} transparent />
      </RoundedBox>
      <RoundedBox args={[0.68, 0.012, 0.01]} position={[-0.54, -0.49, 0.03]} radius={0.005}>
        <meshBasicMaterial color="#cfd8e6" opacity={resolve * 0.13} transparent />
      </RoundedBox>
    </group>
  );
}

function SceneGuides({ progress }: Pick<Lab05SceneProps, "progress">) {
  const approach = smoothstep(progress, 0.06, 0.32);
  const resolve = smoothstep(progress, 0.72, 0.9);

  return (
    <group position={[resolve * 0.18, -1.46, -0.62]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} scale={[0.94, 0.34, 1]}>
        <circleGeometry args={[3.1, 72]} />
        <meshBasicMaterial color="#ebe6dc" opacity={0.014 + approach * 0.026} transparent />
      </mesh>
      <mesh position={[0, 0.02, 0]}>
        <boxGeometry args={[4.4, 0.009, 0.009]} />
        <meshBasicMaterial color="#e8e1d5" opacity={0.06 + approach * 0.035} transparent />
      </mesh>
      <mesh position={[0, 0.2, -0.34]}>
        <boxGeometry args={[2.55, 0.008, 0.008]} />
        <meshBasicMaterial color="#7a8798" opacity={0.07 + approach * 0.025} transparent />
      </mesh>
    </group>
  );
}

function StorySystem({
  compact = false,
  progress,
}: Pick<Lab05SceneProps, "compact" | "progress">) {
  const resolve = smoothstep(progress, 0.78, 0.94);
  const split = smoothstep(progress, 0.38, 0.62);

  return (
    <group
      position={
        compact
          ? [0, -0.72, 0]
          : [
              MathUtils.lerp(0.22, 0.38, resolve),
              MathUtils.lerp(0, -0.04, split),
              0,
            ]
      }
      rotation={compact ? [-0.04, -0.1, 0] : [-0.045, MathUtils.lerp(-0.14, 0.09, progress), 0.006]}
      scale={compact ? 0.82 : MathUtils.lerp(1, 0.92, resolve)}
    >
      <SignatureMark progress={progress} />
      <ResolutionPlate progress={progress} />
      <InterfaceShell progress={progress} />
      {lab05ProcessCards.map((card, index) => (
        <GrowthLayer key={card.id} cardIndex={index} progress={progress} />
      ))}
      <EcosystemConnectors progress={progress} />
    </group>
  );
}

export function Lab05Scene({
  compact = false,
  progress,
  reducedMotion = false,
}: Lab05SceneProps) {
  const camera = compact ? compactCamera : desktopCamera;
  const sceneProgress = reducedMotion
    ? 0.68
    : compact
      ? Math.min(progress * 0.9, 0.88)
      : progress;

  return (
    <Canvas
      aria-hidden
      camera={camera}
      dpr={canvasDprSettings}
      frameloop={reducedMotion ? "demand" : "always"}
      gl={canvasGlSettings}
      onCreated={({ gl }) => {
        gl.outputColorSpace = SRGBColorSpace;
        gl.toneMapping = ACESFilmicToneMapping;
        gl.toneMappingExposure = 0.88;
      }}
    >
      <color attach="background" args={["#050609"]} />
      <fog attach="fog" args={["#050609", 7.2, 17]} />

      <ambientLight intensity={0.2} />
      <hemisphereLight color="#f5ecdf" groundColor="#070b10" intensity={0.22} />
      <directionalLight color="#f2eadf" position={[2.8, 4.2, 5.6]} intensity={1.02} />
      <spotLight
        angle={0.28}
        color="#fff1dd"
        intensity={2.4}
        penumbra={0.84}
        position={[1.5, 3.6, 5.9]}
      />
      <pointLight color="#c7d3e2" position={[-3.4, 1.8, 3.8]} intensity={0.72} />
      <pointLight color="#7b8899" position={[2.8, -2.1, 3.1]} intensity={0.42} />

      {!reducedMotion && <StoryCameraRig compact={compact} progress={sceneProgress} />}
      <StorySystem compact={compact} progress={sceneProgress} />
      <SceneGuides progress={sceneProgress} />
    </Canvas>
  );
}
