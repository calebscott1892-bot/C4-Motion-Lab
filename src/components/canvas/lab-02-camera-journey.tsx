"use client";

import { useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo } from "react";
import { MathUtils, Vector3 } from "three";
import { lab02Stages } from "@/lib/animation/lab-02-stages";

const lastStageIndex = lab02Stages.length - 1;

export function Lab02CameraJourney() {
  const scroll = useScroll();
  const cameraTarget = useMemo(() => new Vector3(), []);
  const lookTarget = useMemo(() => new Vector3(), []);

  useFrame(({ camera }, delta) => {
    const progress = MathUtils.smoothstep(scroll.offset, 0, 1);
    const stageProgress = progress * lastStageIndex;
    const fromIndex = Math.min(lastStageIndex, Math.floor(stageProgress));
    const toIndex = Math.min(lastStageIndex, fromIndex + 1);
    const localProgress = MathUtils.smoothstep(stageProgress - fromIndex, 0, 1);

    const from = lab02Stages[fromIndex].position;
    const to = lab02Stages[toIndex].position;
    const focusX = MathUtils.lerp(from[0], to[0], localProgress);
    const focusY = MathUtils.lerp(from[1], to[1], localProgress);
    const focusZ = MathUtils.lerp(from[2], to[2], localProgress);

    cameraTarget.set(
      focusX * 0.28 + Math.sin(progress * Math.PI * 2) * 0.32,
      focusY * 0.34 + 0.12,
      MathUtils.lerp(6.2, lab02Stages[lastStageIndex].position[2] + 4.8, progress),
    );

    lookTarget.set(focusX * 0.7, focusY * 0.5, focusZ - 0.9);

    camera.position.lerp(cameraTarget, 1 - Math.exp(-delta * 2.9));
    camera.lookAt(lookTarget);
  });

  return null;
}
