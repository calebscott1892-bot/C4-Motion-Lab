"use client";

import { ScrollControls, useScroll } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Lab02CameraJourney } from "@/components/canvas/lab-02-camera-journey";
import { Lab02StageObject } from "@/components/canvas/lab-02-stage-object";
import { lab02Stages } from "@/lib/animation/lab-02-stages";

type Lab02SceneProps = {
  onStageChange?: (stageIndex: number) => void;
  reducedMotion?: boolean;
};

const cameraSettings = {
  position: [0, 0.1, 6.2] as [number, number, number],
  fov: 42,
};

const dprSettings = [1, 1.5] as [number, number];

const glSettings = {
  alpha: true,
  antialias: true,
  powerPreference: "high-performance" as const,
};

function Lab02World({ reducedMotion = false }: Lab02SceneProps) {
  return (
    <>
      <color attach="background" args={["#050609"]} />
      <fog attach="fog" args={["#050609", 8, 32]} />

      <ambientLight intensity={0.42} />
      <directionalLight position={[3, 4, 5]} intensity={1.8} />
      <pointLight color="#aebbd0" position={[-3, 2, 4]} intensity={3.2} />
      <pointLight color="#eef1f5" position={[2, -2, 1]} intensity={1.1} />

      <mesh position={[0, -1.28, -12.5]} rotation={[Math.PI / 2, 0, 0]}>
        <boxGeometry args={[0.018, 0.018, 29]} />
        <meshBasicMaterial color="#d8dee9" transparent opacity={0.16} />
      </mesh>

      <mesh position={[0, -1.32, -12.5]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[5.8, 96]} />
        <meshBasicMaterial color="#d8dee9" transparent opacity={0.018} />
      </mesh>

      {lab02Stages.map((stage) => (
        <Lab02StageObject
          key={stage.id}
          stage={stage}
          reducedMotion={reducedMotion}
        />
      ))}
    </>
  );
}

function Lab02ScrollStateBridge({
  onStageChange,
}: Pick<Lab02SceneProps, "onStageChange">) {
  const scroll = useScroll();
  const activeStageRef = useRef(0);

  useFrame(() => {
    const nextStageIndex = Math.min(
      lab02Stages.length - 1,
      Math.floor(scroll.offset * lab02Stages.length),
    );

    if (nextStageIndex !== activeStageRef.current) {
      activeStageRef.current = nextStageIndex;
      onStageChange?.(nextStageIndex);
    }
  });

  return null;
}

export function Lab02Scene({
  onStageChange,
  reducedMotion = false,
}: Lab02SceneProps) {
  return (
    <Canvas
      camera={cameraSettings}
      dpr={dprSettings}
      frameloop={reducedMotion ? "demand" : "always"}
      gl={glSettings}
    >
      <ScrollControls damping={0.22} distance={0.9} pages={lab02Stages.length}>
        <Lab02World reducedMotion={reducedMotion} />
        {!reducedMotion && <Lab02CameraJourney />}
        {!reducedMotion && (
          <Lab02ScrollStateBridge onStageChange={onStageChange} />
        )}
      </ScrollControls>
    </Canvas>
  );
}

export function Lab02StaticScene() {
  return (
    <Canvas
      camera={{ position: [0, 0.35, 9], fov: 38 }}
      dpr={dprSettings}
      frameloop="demand"
      gl={glSettings}
    >
      <color attach="background" args={["#050609"]} />
      <fog attach="fog" args={["#050609", 9, 24]} />
      <ambientLight intensity={0.52} />
      <directionalLight position={[3, 4, 5]} intensity={1.7} />
      <pointLight color="#aebbd0" position={[-3, 2, 4]} intensity={2.4} />

      {lab02Stages.map((stage, index) => (
        <Lab02StageObject
          key={stage.id}
          stage={stage}
          position={[
            stage.position[0] * 0.62,
            1.55 - index * 0.72,
            -index * 1.05,
          ]}
          reducedMotion
        />
      ))}
    </Canvas>
  );
}
