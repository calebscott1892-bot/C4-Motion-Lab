"use client";

import { Float } from "@react-three/drei";
import { useMemo } from "react";
import { Color } from "three";
import type { Lab02Stage } from "@/lib/animation/lab-02-stages";

type Lab02StageObjectProps = {
  stage: Lab02Stage;
  position?: [number, number, number];
  reducedMotion?: boolean;
};

function StageGeometry({ shape }: { shape: Lab02Stage["shape"] }) {
  if (shape === "sphere") {
    return <sphereGeometry args={[0.62, 36, 36]} />;
  }

  if (shape === "torus") {
    return <torusGeometry args={[0.7, 0.12, 24, 72]} />;
  }

  if (shape === "box") {
    return <boxGeometry args={[0.92, 0.92, 0.92]} />;
  }

  if (shape === "octahedron") {
    return <octahedronGeometry args={[0.78, 0]} />;
  }

  return <coneGeometry args={[0.62, 1.1, 48]} />;
}

export function Lab02StageObject({
  stage,
  position,
  reducedMotion = false,
}: Lab02StageObjectProps) {
  const materialColor = useMemo(() => new Color(stage.accent), [stage.accent]);
  const objectPosition = position ?? stage.position;

  const content = (
    <group position={objectPosition} scale={stage.scale}>
      <mesh rotation={[0.22, 0.38, -0.08]}>
        <StageGeometry shape={stage.shape} />
        <meshStandardMaterial
          color={materialColor}
          emissive={materialColor}
          emissiveIntensity={0.035}
          metalness={0.22}
          roughness={0.38}
        />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.22, 0.008, 12, 96]} />
        <meshStandardMaterial
          color={stage.accent}
          emissive={stage.accent}
          emissiveIntensity={0.04}
          metalness={0.2}
          roughness={0.52}
          transparent
          opacity={0.22}
        />
      </mesh>

      <mesh position={[0, -1.1, 0]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[0.012, 1.18, 0.012]} />
        <meshBasicMaterial color={stage.accent} transparent opacity={0.34} />
      </mesh>

      <mesh position={[0, -1.7, 0]}>
        <sphereGeometry args={[0.04, 18, 18]} />
        <meshStandardMaterial color={stage.accent} roughness={0.35} />
      </mesh>

      <mesh position={[0, -1.94, 0]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[0.008, 0.5, 0.008]} />
        <meshBasicMaterial color={stage.accent} transparent opacity={0.18} />
      </mesh>
    </group>
  );

  if (reducedMotion) {
    return content;
  }

  return (
    <Float
      floatIntensity={0.18}
      floatingRange={[-0.05, 0.05]}
      rotationIntensity={0.14}
      speed={0.55}
    >
      {content}
    </Float>
  );
}
