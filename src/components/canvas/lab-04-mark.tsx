"use client";

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
  const push = smoothstep(sceneProgress, 0.12, 0.72);
  const separate = smoothstep(sceneProgress, 0.28, 0.82);
  const settle = smoothstep(sceneProgress, 0.82, 1);
  const compactScale = compact ? 0.76 : 1;
  const horizontalShift = compact ? 0 : MathUtils.lerp(0, 0.56, push);

  return {
    groupPosition: [
      horizontalShift,
      compact ? -0.58 : MathUtils.lerp(0.04, 0.02, push),
      MathUtils.lerp(0, 0.34, push),
    ],
    groupRotation: [
      MathUtils.lerp(-0.045, 0.025, push),
      MathUtils.lerp(-0.22, 0.18, push),
      MathUtils.lerp(0.018, -0.012, push),
    ],
    leftPosition: [
      (-0.46 - separate * 0.18) * compactScale,
      0,
      separate * 0.08,
    ],
    rightPosition: [
      (0.5 + separate * 0.2) * compactScale,
      0,
      separate * 0.18,
    ],
    platePosition: [0, 0, -0.16 - separate * 0.08],
    scale: (compact ? 0.82 : 1) * MathUtils.lerp(0.92, 1.08, push) * (1 - settle * 0.04),
  };
}

function CMark() {
  return (
    <group>
      <mesh rotation={[0, 0, Math.PI * 0.2]}>
        <torusGeometry args={[0.58, 0.075, 28, 120, Math.PI * 1.58]} />
        <meshPhysicalMaterial
          clearcoat={0.64}
          clearcoatRoughness={0.38}
          color="#f2f0e8"
          metalness={0.18}
          roughness={0.24}
        />
      </mesh>

      <mesh position={[-0.03, 0, -0.065]} rotation={[0, 0, Math.PI * 0.2]}>
        <torusGeometry args={[0.58, 0.078, 24, 96, Math.PI * 1.58]} />
        <meshBasicMaterial color="#4b5665" transparent opacity={0.28} />
      </mesh>

      <mesh position={[0.22, 0.41, 0.08]}>
        <sphereGeometry args={[0.052, 18, 18]} />
        <meshStandardMaterial color="#c8d2df" metalness={0.18} roughness={0.28} />
      </mesh>
    </group>
  );
}

function FourMark() {
  return (
    <group>
      <mesh position={[0.24, 0, 0]}>
        <boxGeometry args={[0.14, 1.15, 0.18]} />
        <meshPhysicalMaterial
          clearcoat={0.58}
          clearcoatRoughness={0.42}
          color="#dfe5ee"
          metalness={0.16}
          roughness={0.28}
        />
      </mesh>

      <mesh position={[-0.08, 0.1, 0.02]}>
        <boxGeometry args={[0.86, 0.13, 0.17]} />
        <meshPhysicalMaterial
          clearcoat={0.46}
          clearcoatRoughness={0.44}
          color="#b9c5d4"
          metalness={0.14}
          roughness={0.32}
        />
      </mesh>

      <mesh position={[-0.25, 0.26, -0.005]} rotation={[0, 0, -0.56]}>
        <boxGeometry args={[0.13, 0.92, 0.17]} />
        <meshPhysicalMaterial
          clearcoat={0.52}
          clearcoatRoughness={0.46}
          color="#eef1f5"
          metalness={0.12}
          roughness={0.3}
        />
      </mesh>

      <mesh position={[0.32, -0.56, -0.05]}>
        <boxGeometry args={[0.18, 0.14, 0.12]} />
        <meshStandardMaterial color="#5b687a" metalness={0.18} roughness={0.38} />
      </mesh>
    </group>
  );
}

function BackPlate() {
  return (
    <group>
      <mesh>
        <boxGeometry args={[2.35, 1.46, 0.055]} />
        <meshPhysicalMaterial
          clearcoat={0.38}
          clearcoatRoughness={0.62}
          color="#121821"
          metalness={0.08}
          opacity={0.36}
          roughness={0.5}
          transparent
        />
      </mesh>

      <mesh position={[0, 0.72, 0.04]}>
        <boxGeometry args={[2.2, 0.016, 0.012]} />
        <meshBasicMaterial color="#e8edf5" transparent opacity={0.28} />
      </mesh>

      <mesh position={[-1.12, 0, 0.04]}>
        <boxGeometry args={[0.016, 1.28, 0.012]} />
        <meshBasicMaterial color="#9aa8ba" transparent opacity={0.22} />
      </mesh>
    </group>
  );
}

function LightCatchers() {
  return (
    <group>
      <mesh position={[-0.82, -0.76, 0.12]} rotation={[0, 0, -0.04]}>
        <boxGeometry args={[0.72, 0.018, 0.014]} />
        <meshBasicMaterial color="#f2f0e8" transparent opacity={0.22} />
      </mesh>
      <mesh position={[0.88, 0.72, 0.13]} rotation={[0, 0, 0.03]}>
        <boxGeometry args={[0.56, 0.014, 0.012]} />
        <meshBasicMaterial color="#94a4ba" transparent opacity={0.2} />
      </mesh>
      <mesh position={[1.22, -0.55, 0.1]}>
        <sphereGeometry args={[0.034, 18, 18]} />
        <meshStandardMaterial color="#dfe5ee" metalness={0.16} roughness={0.3} />
      </mesh>
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
    const idleY = Math.sin(elapsedRef.current * 0.48) * 0.025;
    const idleRot = Math.sin(elapsedRef.current * 0.34) * 0.035;
    const damp = props.compact ? 5.6 : 4.1;

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
