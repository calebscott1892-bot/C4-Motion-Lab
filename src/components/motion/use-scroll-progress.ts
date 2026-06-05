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
    const metrics = {
      scrollableDistance: 1,
      startY: 0,
    };

    const updateProgress = () => {
      const nextProgress = clamp(
        (window.scrollY - metrics.startY) / metrics.scrollableDistance,
      );

      setProgress((currentProgress) => {
        if (Math.abs(currentProgress - nextProgress) < 0.001) {
          return currentProgress;
        }

        return nextProgress;
      });
    };

    const measure = () => {
      const rect = target.getBoundingClientRect();
      metrics.startY = window.scrollY + rect.top;
      metrics.scrollableDistance = Math.max(
        1,
        target.offsetHeight - window.innerHeight,
      );

      updateProgress();
    };

    const requestProgress = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateProgress);
    };

    const requestMeasure = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };

    measure();

    window.addEventListener("scroll", requestProgress, { passive: true });
    window.addEventListener("resize", requestMeasure);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestProgress);
      window.removeEventListener("resize", requestMeasure);
    };
  }, [targetRef]);

  return progress;
}
