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

function CoreGeometry({ shape }: { shape: Lab02Stage["shape"] }) {
  if (shape === "sphere") {
    return <sphereGeometry args={[0.58, 48, 48]} />;
  }

  if (shape === "torus") {
    return <torusGeometry args={[0.68, 0.1, 28, 88]} />;
  }

  if (shape === "box") {
    return <boxGeometry args={[0.82, 0.82, 0.82]} />;
  }

  if (shape === "octahedron") {
    return <octahedronGeometry args={[0.78, 0]} />;
  }

  return <coneGeometry args={[0.62, 1.1, 48]} />;
}

function StageIdentity({
  stage,
}: {
  stage: Lab02Stage;
}) {
  if (stage.shape === "sphere") {
    return (
      <>
        <mesh position={[0.92, 0.06, -0.14]}>
          <sphereGeometry args={[0.12, 24, 24]} />
          <meshStandardMaterial color={stage.secondary} roughness={0.38} />
        </mesh>
        <mesh position={[-0.82, -0.26, 0.1]} rotation={[0, 0, Math.PI / 2]}>
          <boxGeometry args={[0.018, 0.72, 0.018]} />
          <meshBasicMaterial color={stage.accent} transparent opacity={0.36} />
        </mesh>
      </>
    );
  }

  if (stage.shape === "torus") {
    return (
      <>
        <mesh rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[1.12, 1.12, 0.04]} />
          <meshStandardMaterial
            color={stage.secondary}
            metalness={0.18}
            roughness={0.48}
            transparent
            opacity={0.28}
          />
        </mesh>
        <mesh position={[0, 0, 0.18]}>
          <torusGeometry args={[0.36, 0.012, 16, 72]} />
          <meshBasicMaterial color={stage.accent} transparent opacity={0.46} />
        </mesh>
      </>
    );
  }

  if (stage.shape === "box") {
    return (
      <>
        <mesh position={[-0.58, -0.05, -0.08]}>
          <boxGeometry args={[0.18, 1.08, 0.18]} />
          <meshStandardMaterial color={stage.secondary} roughness={0.44} />
        </mesh>
        <mesh position={[0.52, 0.02, 0.1]}>
          <boxGeometry args={[0.14, 0.9, 0.14]} />
          <meshStandardMaterial
            color={stage.accent}
            metalness={0.2}
            roughness={0.36}
            transparent
            opacity={0.72}
          />
        </mesh>
        <mesh position={[0, -0.58, 0.18]}>
          <boxGeometry args={[1.3, 0.05, 0.05]} />
          <meshBasicMaterial color={stage.accent} transparent opacity={0.42} />
        </mesh>
      </>
    );
  }

  if (stage.shape === "octahedron") {
    return (
      <>
        <mesh rotation={[Math.PI / 2, 0, Math.PI / 4]}>
          <torusGeometry args={[1.08, 0.01, 12, 88]} />
          <meshBasicMaterial color={stage.secondary} transparent opacity={0.32} />
        </mesh>
        <mesh position={[0.72, 0.46, 0.02]}>
          <sphereGeometry args={[0.07, 20, 20]} />
          <meshStandardMaterial color={stage.accent} roughness={0.35} />
        </mesh>
        <mesh position={[-0.62, -0.5, 0.1]}>
          <sphereGeometry args={[0.05, 18, 18]} />
          <meshStandardMaterial color={stage.secondary} roughness={0.4} />
        </mesh>
      </>
    );
  }

  return (
    <>
      <mesh position={[0, -0.62, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.72, 0.72, 0.035, 72]} />
        <meshStandardMaterial
          color={stage.secondary}
          metalness={0.16}
          roughness={0.52}
          transparent
          opacity={0.42}
        />
      </mesh>
      <mesh position={[0, 0.58, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.44, 0.01, 12, 72]} />
        <meshBasicMaterial color={stage.accent} transparent opacity={0.3} />
      </mesh>
    </>
  );
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
        <CoreGeometry shape={stage.shape} />
        <meshStandardMaterial
          color={materialColor}
          emissive={materialColor}
          emissiveIntensity={0.025}
          metalness={0.2}
          roughness={0.42}
        />
      </mesh>

      <StageIdentity stage={stage} />

      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.32, 0.007, 12, 112]} />
        <meshStandardMaterial
          color={stage.accent}
          emissive={stage.accent}
          emissiveIntensity={0.025}
          metalness={0.16}
          roughness={0.6}
          transparent
          opacity={0.16}
        />
      </mesh>

      <mesh position={[0, -1.1, 0]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[0.01, 1.08, 0.01]} />
        <meshBasicMaterial color={stage.accent} transparent opacity={0.22} />
      </mesh>

      <mesh position={[0, -1.7, 0]}>
        <sphereGeometry args={[0.034, 18, 18]} />
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
      floatingRange={[-0.04, 0.04]}
      rotationIntensity={0.1}
      speed={0.42}
    >
      {content}
    </Float>
  );
}
