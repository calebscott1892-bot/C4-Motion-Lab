"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { MathUtils } from "three";
import type { Group } from "three";
import type { Lab03Layer } from "@/lib/animation/lab-03-layers";

type Lab03LayerProps = {
  layer: Lab03Layer;
  layerIndex: number;
  progress: number;
  compact?: boolean;
  reducedMotion?: boolean;
};

type LayerTransform = {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
};

const layerDepthStep = 0.13;

function clamp(value: number) {
  return Math.min(1, Math.max(0, value));
}

function smoothstep(value: number, min: number, max: number) {
  const normalized = clamp((value - min) / Math.max(0.001, max - min));

  return normalized * normalized * (3 - 2 * normalized);
}

function getLayerTransform({
  compact = false,
  layer,
  layerIndex,
  progress,
  reducedMotion = false,
}: Lab03LayerProps): LayerTransform {
  const sceneProgress = reducedMotion ? 0.78 : progress;
  const stackReveal = smoothstep(sceneProgress, 0.04, 0.26);
  const explode = smoothstep(sceneProgress, 0.2, 0.78);
  const finalSettle = smoothstep(sceneProgress, 0.82, 1);
  const centerIndex = 2.5;
  const compactMultiplier = compact ? 0.58 : 1;
  const settleX = MathUtils.lerp(1, 0.88, finalSettle);
  const stackDepth = MathUtils.lerp(
    (layerIndex - centerIndex) * 0.014,
    (layerIndex - centerIndex) * layerDepthStep,
    stackReveal,
  );
  const settleY = MathUtils.lerp(1, 0.92, finalSettle);
  const settleZ = MathUtils.lerp(1, 0.84, finalSettle);

  return {
    position: [
      layer.explodedPosition[0] * explode * compactMultiplier * settleX,
      layer.explodedPosition[1] * explode * compactMultiplier * settleY,
      stackDepth + layer.explodedPosition[2] * explode * compactMultiplier * settleZ,
    ],
    rotation: [
      MathUtils.lerp(0, layer.explodedRotation[0], explode),
      MathUtils.lerp(0, layer.explodedRotation[1], explode),
      MathUtils.lerp(0, layer.explodedRotation[2], explode),
    ],
    scale: compact ? 0.82 : MathUtils.lerp(0.95, 1, stackReveal),
  };
}

function LayerIcon({ layer }: { layer: Lab03Layer }) {
  if (layer.icon === "brand") {
    return (
      <group position={[0, 0.02, 0.095]}>
        <mesh>
          <sphereGeometry args={[0.18, 32, 32]} />
          <meshStandardMaterial color={layer.accent} metalness={0.18} roughness={0.3} />
        </mesh>
        <mesh position={[0.34, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <boxGeometry args={[0.02, 0.52, 0.018]} />
          <meshBasicMaterial color={layer.secondary} transparent opacity={0.62} />
        </mesh>
        <mesh position={[-0.34, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <boxGeometry args={[0.02, 0.52, 0.018]} />
          <meshBasicMaterial color={layer.secondary} transparent opacity={0.48} />
        </mesh>
      </group>
    );
  }

  if (layer.icon === "website") {
    return (
      <group position={[0, 0, 0.095]}>
        <mesh position={[0, 0.28, 0]}>
          <boxGeometry args={[1.15, 0.035, 0.018]} />
          <meshBasicMaterial color={layer.accent} transparent opacity={0.72} />
        </mesh>
        <mesh position={[-0.34, -0.04, 0]}>
          <boxGeometry args={[0.28, 0.46, 0.018]} />
          <meshBasicMaterial color={layer.secondary} transparent opacity={0.45} />
        </mesh>
        <mesh position={[0.2, 0.04, 0]}>
          <boxGeometry args={[0.52, 0.08, 0.018]} />
          <meshBasicMaterial color={layer.accent} transparent opacity={0.58} />
        </mesh>
        <mesh position={[0.24, -0.16, 0]}>
          <boxGeometry args={[0.62, 0.06, 0.018]} />
          <meshBasicMaterial color={layer.secondary} transparent opacity={0.36} />
        </mesh>
      </group>
    );
  }

  if (layer.icon === "seo") {
    return (
      <group position={[0, 0.02, 0.095]} rotation={[0, 0, -0.18]}>
        <mesh>
          <torusGeometry args={[0.25, 0.018, 16, 72]} />
          <meshStandardMaterial color={layer.accent} metalness={0.18} roughness={0.34} />
        </mesh>
        <mesh position={[0.29, -0.29, 0]} rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[0.018, 0.42, 0.018]} />
          <meshBasicMaterial color={layer.secondary} transparent opacity={0.64} />
        </mesh>
        <mesh position={[-0.42, -0.18, 0]}>
          <boxGeometry args={[0.32, 0.025, 0.018]} />
          <meshBasicMaterial color={layer.secondary} transparent opacity={0.42} />
        </mesh>
      </group>
    );
  }

  if (layer.icon === "automation") {
    return (
      <group position={[0, 0.02, 0.095]}>
        {[
          [-0.42, 0.18, 0],
          [0.02, 0.02, 0],
          [0.46, -0.18, 0],
        ].map((position, index) => (
          <mesh key={index} position={position as [number, number, number]}>
            <sphereGeometry args={[0.08, 24, 24]} />
            <meshStandardMaterial color={index === 1 ? layer.accent : layer.secondary} />
          </mesh>
        ))}
        <mesh position={[-0.2, 0.1, 0]} rotation={[0, 0, -0.34]}>
          <boxGeometry args={[0.44, 0.012, 0.012]} />
          <meshBasicMaterial color={layer.secondary} transparent opacity={0.58} />
        </mesh>
        <mesh position={[0.24, -0.08, 0]} rotation={[0, 0, -0.42]}>
          <boxGeometry args={[0.48, 0.012, 0.012]} />
          <meshBasicMaterial color={layer.secondary} transparent opacity={0.58} />
        </mesh>
      </group>
    );
  }

  if (layer.icon === "analytics") {
    return (
      <group position={[0, -0.02, 0.095]}>
        {[
          [-0.36, -0.12, 0, 0.2],
          [-0.12, -0.02, 0, 0.4],
          [0.12, 0.08, 0, 0.6],
          [0.36, 0.0, 0, 0.44],
        ].map(([x, y, z, height], index) => (
          <mesh key={index} position={[x, y, z]}>
            <boxGeometry args={[0.12, height, 0.024]} />
            <meshStandardMaterial
              color={index === 2 ? layer.accent : layer.secondary}
              metalness={0.14}
              roughness={0.42}
            />
          </mesh>
        ))}
        <mesh position={[0, -0.34, 0]}>
          <boxGeometry args={[0.95, 0.018, 0.016]} />
          <meshBasicMaterial color={layer.secondary} transparent opacity={0.46} />
        </mesh>
      </group>
    );
  }

  return (
    <group position={[0, 0.02, 0.095]}>
      <mesh position={[-0.28, 0.13, 0]}>
        <boxGeometry args={[0.5, 0.28, 0.024]} />
        <meshStandardMaterial color={layer.secondary} metalness={0.12} roughness={0.44} />
      </mesh>
      <mesh position={[0.26, -0.12, 0.018]}>
        <boxGeometry args={[0.5, 0.28, 0.024]} />
        <meshStandardMaterial color={layer.accent} metalness={0.14} roughness={0.36} />
      </mesh>
      <mesh position={[-0.45, 0.16, 0.032]}>
        <sphereGeometry args={[0.045, 18, 18]} />
        <meshStandardMaterial color={layer.accent} roughness={0.34} />
      </mesh>
      <mesh position={[0.08, -0.1, 0.05]}>
        <sphereGeometry args={[0.045, 18, 18]} />
        <meshStandardMaterial color="#050609" roughness={0.34} />
      </mesh>
    </group>
  );
}

function LayerSurface({ layer }: { layer: Lab03Layer }) {
  return (
    <>
      <mesh position={[0.08, -0.08, -0.08]}>
        <boxGeometry args={[2.38, 1.2, 0.035]} />
        <meshBasicMaterial color="#020306" transparent opacity={0.46} />
      </mesh>

      <mesh>
        <boxGeometry args={[2.36, 1.22, 0.07]} />
        <meshPhysicalMaterial
          clearcoat={0.52}
          clearcoatRoughness={0.48}
          color="#111820"
          metalness={0.1}
          opacity={0.64}
          roughness={0.28}
          transparent
        />
      </mesh>

      <mesh position={[0, 0, 0.045]}>
        <boxGeometry args={[2.18, 1.04, 0.018]} />
        <meshPhysicalMaterial
          clearcoat={0.34}
          clearcoatRoughness={0.62}
          color={layer.secondary}
          metalness={0.08}
          opacity={0.17}
          roughness={0.44}
          transparent
        />
      </mesh>

      <mesh position={[-0.84, 0.16, 0.075]}>
        <boxGeometry args={[0.46, 0.52, 0.014]} />
        <meshBasicMaterial color={layer.secondary} transparent opacity={0.16} />
      </mesh>

      <mesh position={[0.44, 0.18, 0.076]}>
        <boxGeometry args={[0.76, 0.06, 0.014]} />
        <meshBasicMaterial color="#f2f0e8" transparent opacity={0.18} />
      </mesh>

      <mesh position={[0.32, -0.03, 0.077]}>
        <boxGeometry args={[0.92, 0.045, 0.014]} />
        <meshBasicMaterial color={layer.secondary} transparent opacity={0.13} />
      </mesh>

      <mesh position={[0, 0.55, 0.075]}>
        <boxGeometry args={[2.32, 0.018, 0.018]} />
        <meshBasicMaterial color={layer.accent} transparent opacity={0.48} />
      </mesh>

      <mesh position={[0, -0.55, 0.075]}>
        <boxGeometry args={[1.72, 0.014, 0.014]} />
        <meshBasicMaterial color={layer.secondary} transparent opacity={0.26} />
      </mesh>

      <mesh position={[-1.14, 0, 0.075]}>
        <boxGeometry args={[0.018, 1.14, 0.018]} />
        <meshBasicMaterial color={layer.accent} transparent opacity={0.36} />
      </mesh>

      <mesh position={[1.14, 0, 0.075]}>
        <boxGeometry args={[0.014, 0.86, 0.014]} />
        <meshBasicMaterial color={layer.secondary} transparent opacity={0.18} />
      </mesh>

      <mesh position={[0.66, -0.4, 0.084]}>
        <boxGeometry args={[0.72, 0.016, 0.014]} />
        <meshBasicMaterial color="#f2f0e8" transparent opacity={0.34} />
      </mesh>

      <mesh position={[-1.12, 0.54, 0.092]}>
        <sphereGeometry args={[0.032, 18, 18]} />
        <meshStandardMaterial color={layer.accent} metalness={0.18} roughness={0.28} />
      </mesh>

      <mesh position={[1.12, -0.52, 0.092]}>
        <sphereGeometry args={[0.027, 18, 18]} />
        <meshStandardMaterial color={layer.secondary} metalness={0.14} roughness={0.34} />
      </mesh>

      <LayerIcon layer={layer} />
    </>
  );
}

export function Lab03Layer(props: Lab03LayerProps) {
  const groupRef = useRef<Group>(null);
  const initialTransform = getLayerTransform(props);

  useFrame((_, delta) => {
    const group = groupRef.current;

    if (!group || props.reducedMotion) {
      return;
    }

    const transform = getLayerTransform(props);
    const damp = props.compact ? 5.8 : 4.2;

    group.position.x = MathUtils.damp(
      group.position.x,
      transform.position[0],
      damp,
      delta,
    );
    group.position.y = MathUtils.damp(
      group.position.y,
      transform.position[1],
      damp,
      delta,
    );
    group.position.z = MathUtils.damp(
      group.position.z,
      transform.position[2],
      damp,
      delta,
    );
    group.rotation.x = MathUtils.damp(
      group.rotation.x,
      transform.rotation[0],
      damp,
      delta,
    );
    group.rotation.y = MathUtils.damp(
      group.rotation.y,
      transform.rotation[1],
      damp,
      delta,
    );
    group.rotation.z = MathUtils.damp(
      group.rotation.z,
      transform.rotation[2],
      damp,
      delta,
    );

    const nextScale = MathUtils.damp(group.scale.x, transform.scale, damp, delta);
    group.scale.setScalar(nextScale);
  });

  return (
    <group
      ref={groupRef}
      position={initialTransform.position}
      rotation={initialTransform.rotation}
      scale={[
        initialTransform.scale,
        initialTransform.scale,
        initialTransform.scale,
      ]}
    >
      <LayerSurface layer={props.layer} />
    </group>
  );
}
