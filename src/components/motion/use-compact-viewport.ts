"use client";

import { useEffect, useState } from "react";

const compactViewportQuery = "(max-width: 767px)";

export function useCompactViewport() {
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(compactViewportQuery);
    const update = () => setIsCompact(query.matches);

    update();
    query.addEventListener("change", update);

    return () => {
      query.removeEventListener("change", update);
    };
  }, []);

  return isCompact;
}
