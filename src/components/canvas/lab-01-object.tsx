"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { Color, MathUtils } from "three";
import type { Group, MeshStandardMaterial } from "three";
import { lab01States } from "@/lib/animation/lab-01-states";

type Lab01ObjectProps = {
  progress: number;
  reducedMotion: boolean;
};

const lastStateIndex = lab01States.length - 1;

export function Lab01Object({ progress, reducedMotion }: Lab01ObjectProps) {
  const groupRef = useRef<Group>(null);
  const coreMaterialRef = useRef<MeshStandardMaterial>(null);
  const accentMaterialRef = useRef<MeshStandardMaterial>(null);
  const nodeMaterialRef = useRef<MeshStandardMaterial>(null);
  const elapsedRef = useRef(0);

  const stateColors = useMemo(
    () => lab01States.map((state) => new Color(state.color)),
    [],
  );
  const colorTarget = useMemo(() => new Color(lab01States[0].color), []);

  useFrame((_, delta) => {
    const group = groupRef.current;

    if (!group) {
      return;
    }

    elapsedRef.current += delta;

    // One normalized scroll value drives interpolation across the authored states.
    const sceneProgress = reducedMotion ? 0.08 : progress;
    const segmentProgress = Math.min(
      lastStateIndex,
      Math.max(0, sceneProgress * lastStateIndex),
    );
    const fromIndex = Math.floor(segmentProgress);
    const toIndex = Math.min(lastStateIndex, fromIndex + 1);
    const localProgress = MathUtils.smoothstep(
      segmentProgress - fromIndex,
      0,
      1,
    );

    const from = lab01States[fromIndex].transform;
    const to = lab01States[toIndex].transform;
    const idle = reducedMotion ? 0 : Math.sin(elapsedRef.current * 0.42) * 0.035;
    const damp = reducedMotion ? 8 : 2.85;

    group.position.x = MathUtils.damp(
      group.position.x,
      MathUtils.lerp(from.position[0], to.position[0], localProgress),
      damp,
      delta,
    );
    group.position.y = MathUtils.damp(
      group.position.y,
      MathUtils.lerp(from.position[1], to.position[1], localProgress) + idle,
      damp,
      delta,
    );
    group.position.z = MathUtils.damp(
      group.position.z,
      MathUtils.lerp(from.position[2], to.position[2], localProgress),
      damp,
      delta,
    );

    group.rotation.x = MathUtils.damp(
      group.rotation.x,
      MathUtils.lerp(from.rotation[0], to.rotation[0], localProgress) +
        idle * 0.28,
      damp,
      delta,
    );
    group.rotation.y = MathUtils.damp(
      group.rotation.y,
      MathUtils.lerp(from.rotation[1], to.rotation[1], localProgress) +
        (reducedMotion ? 0 : elapsedRef.current * 0.026),
      damp,
      delta,
    );
    group.rotation.z = MathUtils.damp(
      group.rotation.z,
      MathUtils.lerp(from.rotation[2], to.rotation[2], localProgress),
      damp,
      delta,
    );

    const targetScale = MathUtils.lerp(
      from.scale,
      to.scale,
      localProgress,
    );
    group.scale.setScalar(
      MathUtils.damp(group.scale.x, targetScale, damp, delta),
    );

    colorTarget.copy(stateColors[fromIndex]).lerp(
      stateColors[toIndex],
      localProgress,
    );
    coreMaterialRef.current?.color.lerp(colorTarget, 0.08);
    coreMaterialRef.current?.emissive.lerp(colorTarget, 0.025);
    accentMaterialRef.current?.color.lerp(colorTarget, 0.045);
    nodeMaterialRef.current?.color.lerp(colorTarget, 0.055);
  });

  return (
    <group ref={groupRef}>
      <mesh position={[-0.12, 0.08, -0.22]} rotation={[0, 0, 0.02]}>
        <boxGeometry args={[1.34, 1.88, 0.08]} />
        <meshStandardMaterial
          color="#35404e"
          metalness={0.24}
          roughness={0.52}
          transparent
          opacity={0.72}
        />
      </mesh>

      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.18, 1.72, 0.44]} />
        <meshStandardMaterial
          ref={coreMaterialRef}
          color={lab01States[0].color}
          emissive={lab01States[0].color}
          emissiveIntensity={0.035}
          metalness={0.28}
          roughness={0.34}
        />
      </mesh>

      <mesh position={[0.42, -0.06, 0.28]}>
        <boxGeometry args={[0.15, 1.54, 0.08]} />
        <meshStandardMaterial
          color="#e7ebf1"
          metalness={0.18}
          roughness={0.38}
          transparent
          opacity={0.72}
        />
      </mesh>

      <mesh position={[-0.46, 0.04, 0.3]}>
        <boxGeometry args={[0.05, 1.18, 0.07]} />
        <meshStandardMaterial
          color="#10151d"
          metalness={0.34}
          roughness={0.42}
          transparent
          opacity={0.86}
        />
      </mesh>

      <mesh position={[0, -0.04, 0.38]}>
        <boxGeometry args={[1.78, 0.035, 0.07]} />
        <meshStandardMaterial
          ref={accentMaterialRef}
          color={lab01States[0].color}
          emissive="#9eb3d6"
          emissiveIntensity={0.08}
          metalness={0.16}
          roughness={0.36}
        />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.78, 0.011, 16, 112]} />
        <meshStandardMaterial
          color="#c6ceda"
          emissive="#9eb3d6"
          emissiveIntensity={0.045}
          metalness={0.18}
          roughness={0.48}
          transparent
          opacity={0.26}
        />
      </mesh>

      <mesh rotation={[0.2, Math.PI / 2, 0]}>
        <torusGeometry args={[1.35, 0.008, 16, 96]} />
        <meshStandardMaterial
          color="#eef1f5"
          metalness={0.22}
          roughness={0.54}
          transparent
          opacity={0.16}
        />
      </mesh>

      <mesh position={[1.76, -0.04, 0.38]}>
        <sphereGeometry args={[0.075, 24, 24]} />
        <meshStandardMaterial
          ref={nodeMaterialRef}
          color="#f4f1e8"
          emissive="#9eb3d6"
          emissiveIntensity={0.14}
          roughness={0.22}
        />
      </mesh>

      <mesh position={[-1.08, 1.08, 0.12]}>
        <sphereGeometry args={[0.045, 20, 20]} />
        <meshStandardMaterial color="#8f9caf" roughness={0.34} />
      </mesh>

      <mesh position={[0.84, -1.03, 0.2]}>
        <sphereGeometry args={[0.035, 20, 20]} />
        <meshStandardMaterial color="#cfd7e3" roughness={0.34} />
      </mesh>
    </group>
  );
}
