"use client";

import { RefObject, useEffect, useState } from "react";

function clamp(value: number) {
  return Math.min(1, Math.max(0, value));
}

export function useScrollProgress(targetRef: RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const target = targetRef.current;

    if (!target) {
      return;
    }

    let frame = 0;

    const measure = () => {
      const rect = target.getBoundingClientRect();
      const scrollableDistance = Math.max(
        1,
        target.offsetHeight - window.innerHeight,
      );
      const nextProgress = clamp(-rect.top / scrollableDistance);

      setProgress((currentProgress) => {
        if (Math.abs(currentProgress - nextProgress) < 0.001) {
          return currentProgress;
        }

        return nextProgress;
      });
    };

    const requestMeasure = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };

    measure();

    window.addEventListener("scroll", requestMeasure, { passive: true });
    window.addEventListener("resize", requestMeasure);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestMeasure);
      window.removeEventListener("resize", requestMeasure);
    };
  }, [targetRef]);

  return progress;
}
