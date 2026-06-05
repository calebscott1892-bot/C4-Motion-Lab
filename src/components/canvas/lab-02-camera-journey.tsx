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

    const fromCamera = lab02Stages[fromIndex].camera;
    const toCamera = lab02Stages[toIndex].camera;

    cameraTarget.set(
      MathUtils.lerp(fromCamera.position[0], toCamera.position[0], localProgress) +
        Math.sin(progress * Math.PI * 2) * 0.08,
      MathUtils.lerp(fromCamera.position[1], toCamera.position[1], localProgress),
      MathUtils.lerp(fromCamera.position[2], toCamera.position[2], localProgress),
    );

    lookTarget.set(
      MathUtils.lerp(fromCamera.lookAt[0], toCamera.lookAt[0], localProgress),
      MathUtils.lerp(fromCamera.lookAt[1], toCamera.lookAt[1], localProgress),
      MathUtils.lerp(fromCamera.lookAt[2], toCamera.lookAt[2], localProgress),
    );

    camera.position.lerp(cameraTarget, 1 - Math.exp(-delta * 2.65));
    camera.lookAt(lookTarget);
  });

  return null;
}
