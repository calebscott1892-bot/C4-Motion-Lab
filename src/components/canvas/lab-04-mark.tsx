"use client";

import { RoundedBox } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { MathUtils } from "three";
import type { Group } from "three";

type Lab04MarkProps = {
  compact?: boolean;
  progress: number;
  reducedMotion?: boolean;
};

type MarkTransform = {
  groupPosition: [number, number, number];
  groupRotation: [number, number, number];
  leftPosition: [number, number, number];
  rightPosition: [number, number, number];
  platePosition: [number, number, number];
  scale: number;
};

function clamp(value: number) {
  return Math.min(1, Math.max(0, value));
}

function smoothstep(value: number, min: number, max: number) {
  const normalized = clamp((value - min) / Math.max(0.001, max - min));

  return normalized * normalized * (3 - 2 * normalized);
}

function getMarkTransform({
  compact = false,
  progress,
  reducedMotion = false,
}: Lab04MarkProps): MarkTransform {
  const sceneProgress = reducedMotion ? 0.58 : progress;
  const push = smoothstep(sceneProgress, 0.16, 0.84);
  const separate = smoothstep(sceneProgress, 0.36, 0.92);
  const settle = smoothstep(sceneProgress, 0.84, 1);
  const compactScale = compact ? 0.74 : 1;
  const horizontalShift = compact ? 0 : MathUtils.lerp(0, 0.16, push);

  return {
    groupPosition: [
      horizontalShift,
      compact ? -0.66 : MathUtils.lerp(0.05, 0.03, push),
      MathUtils.lerp(0, 0.16, push),
    ],
    groupRotation: [
      MathUtils.lerp(-0.032, 0.018, push),
      MathUtils.lerp(-0.16, 0.11, push),
      MathUtils.lerp(0.012, -0.006, push),
    ],
    leftPosition: [
      (-0.44 - separate * 0.06) * compactScale,
      separate * 0.012,
      separate * 0.032,
    ],
    rightPosition: [
      (0.445 + separate * 0.045) * compactScale,
      -separate * 0.006,
      separate * 0.072,
    ],
    platePosition: [0, 0, -0.19 - separate * 0.055],
    scale:
      (compact ? 0.8 : 0.94) *
      MathUtils.lerp(0.97, 1.015, push) *
      (1 - settle * 0.018),
  };
}

function CMark() {
  return (
    <group>
      <mesh rotation={[0, 0, Math.PI * 0.19]}>
        <torusGeometry args={[0.56, 0.062, 34, 144, Math.PI * 1.52]} />
        <meshPhysicalMaterial
          clearcoat={0.42}
          clearcoatRoughness={0.5}
          color="#ebe7dc"
          metalness={0.06}
          reflectivity={0.42}
          roughness={0.32}
        />
      </mesh>

      <mesh position={[-0.025, -0.01, -0.072]} rotation={[0, 0, Math.PI * 0.19]}>
        <torusGeometry args={[0.56, 0.064, 28, 112, Math.PI * 1.52]} />
        <meshBasicMaterial color="#34404c" transparent opacity={0.24} />
      </mesh>

      <mesh position={[0.45, 0.33, 0.028]}>
        <sphereGeometry args={[0.063, 24, 24]} />
        <meshPhysicalMaterial
          clearcoat={0.36}
          clearcoatRoughness={0.42}
          color="#f4efe4"
          metalness={0.05}
          roughness={0.3}
        />
      </mesh>

      <mesh position={[0.34, -0.43, 0.024]}>
        <sphereGeometry args={[0.059, 24, 24]} />
        <meshPhysicalMaterial
          clearcoat={0.34}
          clearcoatRoughness={0.48}
          color="#d7dce4"
          metalness={0.08}
          roughness={0.36}
        />
      </mesh>

      <RoundedBox args={[0.52, 0.018, 0.018]} position={[-0.22, -0.61, 0.01]} radius={0.008}>
        <meshBasicMaterial color="#87919f" transparent opacity={0.36} />
      </RoundedBox>
      <RoundedBox args={[0.34, 0.014, 0.016]} position={[-0.35, 0.62, 0.018]} radius={0.006}>
        <meshBasicMaterial color="#f1ece1" transparent opacity={0.28} />
      </RoundedBox>
    </group>
  );
}

function Stroke({
  args,
  color,
  opacity,
  position,
  rotation,
}: {
  args: [number, number, number];
  color: string;
  opacity?: number;
  position: [number, number, number];
  rotation?: [number, number, number];
}) {
  return (
    <RoundedBox
      args={args}
      bevelSegments={8}
      position={position}
      radius={Math.min(args[0], args[1]) * 0.22}
      rotation={rotation}
      smoothness={8}
    >
      <meshPhysicalMaterial
        clearcoat={0.36}
        clearcoatRoughness={0.54}
        color={color}
        metalness={0.08}
        opacity={opacity}
        reflectivity={0.36}
        roughness={0.34}
        transparent={opacity !== undefined}
      />
    </RoundedBox>
  );
}

function ShadowStroke({
  args,
  position,
  rotation,
}: {
  args: [number, number, number];
  position: [number, number, number];
  rotation?: [number, number, number];
}) {
  return (
    <RoundedBox
      args={args}
      bevelSegments={6}
      position={position}
      radius={Math.min(args[0], args[1]) * 0.18}
      rotation={rotation}
      smoothness={6}
    >
      <meshBasicMaterial color="#26313c" transparent opacity={0.34} />
    </RoundedBox>
  );
}

function FourMark() {
  return (
    <group>
      <ShadowStroke args={[0.14, 1.08, 0.15]} position={[0.25, -0.02, -0.07]} />
      <ShadowStroke args={[0.78, 0.12, 0.14]} position={[-0.08, 0.1, -0.065]} />
      <ShadowStroke
        args={[0.12, 0.86, 0.14]}
        position={[-0.24, 0.24, -0.075]}
        rotation={[0, 0, -0.56]}
      />

      <Stroke args={[0.13, 1.08, 0.18]} color="#dde3ec" position={[0.25, -0.02, 0]} />
      <Stroke args={[0.76, 0.118, 0.17]} color="#c0c9d5" position={[-0.08, 0.1, 0.018]} />
      <Stroke
        args={[0.124, 0.88, 0.17]}
        color="#f2efe8"
        position={[-0.245, 0.235, 0.006]}
        rotation={[0, 0, -0.56]}
      />

      <RoundedBox args={[0.19, 0.118, 0.105]} position={[0.305, -0.54, -0.035]} radius={0.018}>
        <meshStandardMaterial color="#586574" metalness={0.1} roughness={0.42} />
      </RoundedBox>

      <RoundedBox args={[0.26, 0.02, 0.014]} position={[0.09, 0.248, 0.106]} radius={0.007}>
        <meshBasicMaterial color="#f4efe4" transparent opacity={0.32} />
      </RoundedBox>
      <RoundedBox args={[0.016, 0.36, 0.014]} position={[0.34, 0.18, 0.104]} radius={0.006}>
        <meshBasicMaterial color="#8e9aaa" transparent opacity={0.28} />
      </RoundedBox>
    </group>
  );
}

function BackPlate() {
  return (
    <group>
      <RoundedBox args={[2.18, 1.34, 0.052]} bevelSegments={6} radius={0.045} smoothness={8}>
        <meshPhysicalMaterial
          clearcoat={0.28}
          clearcoatRoughness={0.72}
          color="#10151d"
          metalness={0.04}
          opacity={0.34}
          roughness={0.62}
          transparent
        />
      </RoundedBox>

      <RoundedBox args={[2.02, 0.014, 0.012]} position={[0, 0.64, 0.04]} radius={0.006}>
        <meshBasicMaterial color="#efe9dd" transparent opacity={0.22} />
      </RoundedBox>

      <RoundedBox args={[0.014, 1.16, 0.012]} position={[-1.01, 0, 0.04]} radius={0.006}>
        <meshBasicMaterial color="#7f8b9a" transparent opacity={0.2} />
      </RoundedBox>

      <RoundedBox args={[0.18, 0.014, 0.012]} position={[0.94, -0.61, 0.04]} radius={0.006}>
        <meshBasicMaterial color="#efe9dd" transparent opacity={0.16} />
      </RoundedBox>
    </group>
  );
}

function LightCatchers() {
  return (
    <group>
      <RoundedBox
        args={[0.64, 0.014, 0.012]}
        position={[-0.76, -0.72, 0.11]}
        radius={0.006}
        rotation={[0, 0, -0.035]}
      >
        <meshBasicMaterial color="#f1ece1" transparent opacity={0.16} />
      </RoundedBox>
      <RoundedBox
        args={[0.48, 0.012, 0.012]}
        position={[0.82, 0.68, 0.12]}
        radius={0.006}
        rotation={[0, 0, 0.025]}
      >
        <meshBasicMaterial color="#8d9aaa" transparent opacity={0.17} />
      </RoundedBox>
      <RoundedBox args={[0.08, 0.08, 0.018]} position={[0.92, -0.5, 0.1]} radius={0.014}>
        <meshStandardMaterial color="#cfd5df" metalness={0.06} roughness={0.38} />
      </RoundedBox>
    </group>
  );
}

export function Lab04Mark(props: Lab04MarkProps) {
  const groupRef = useRef<Group>(null);
  const leftRef = useRef<Group>(null);
  const rightRef = useRef<Group>(null);
  const plateRef = useRef<Group>(null);
  const elapsedRef = useRef(0);
  const initial = getMarkTransform(props);

  useFrame((_, delta) => {
    const group = groupRef.current;
    const left = leftRef.current;
    const right = rightRef.current;
    const plate = plateRef.current;

    if (!group || !left || !right || !plate || props.reducedMotion) {
      return;
    }

    elapsedRef.current += delta;

    const target = getMarkTransform(props);
    const idleY = Math.sin(elapsedRef.current * 0.32) * 0.012;
    const idleRot = Math.sin(elapsedRef.current * 0.24) * 0.014;
    const damp = props.compact ? 5.2 : 3.8;

    group.position.x = MathUtils.damp(group.position.x, target.groupPosition[0], damp, delta);
    group.position.y = MathUtils.damp(
      group.position.y,
      target.groupPosition[1] + idleY,
      damp,
      delta,
    );
    group.position.z = MathUtils.damp(group.position.z, target.groupPosition[2], damp, delta);
    group.rotation.x = MathUtils.damp(group.rotation.x, target.groupRotation[0], damp, delta);
    group.rotation.y = MathUtils.damp(
      group.rotation.y,
      target.groupRotation[1] + idleRot,
      damp,
      delta,
    );
    group.rotation.z = MathUtils.damp(group.rotation.z, target.groupRotation[2], damp, delta);
    group.scale.setScalar(MathUtils.damp(group.scale.x, target.scale, damp, delta));

    left.position.set(
      MathUtils.damp(left.position.x, target.leftPosition[0], damp, delta),
      MathUtils.damp(left.position.y, target.leftPosition[1], damp, delta),
      MathUtils.damp(left.position.z, target.leftPosition[2], damp, delta),
    );
    right.position.set(
      MathUtils.damp(right.position.x, target.rightPosition[0], damp, delta),
      MathUtils.damp(right.position.y, target.rightPosition[1], damp, delta),
      MathUtils.damp(right.position.z, target.rightPosition[2], damp, delta),
    );
    plate.position.set(
      MathUtils.damp(plate.position.x, target.platePosition[0], damp, delta),
      MathUtils.damp(plate.position.y, target.platePosition[1], damp, delta),
      MathUtils.damp(plate.position.z, target.platePosition[2], damp, delta),
    );
  });

  return (
    <group
      ref={groupRef}
      position={initial.groupPosition}
      rotation={initial.groupRotation}
      scale={initial.scale}
    >
      <group ref={plateRef} position={initial.platePosition}>
        <BackPlate />
      </group>
      <group ref={leftRef} position={initial.leftPosition}>
        <CMark />
      </group>
      <group ref={rightRef} position={initial.rightPosition}>
        <FourMark />
      </group>
      <LightCatchers />
    </group>
  );
}
