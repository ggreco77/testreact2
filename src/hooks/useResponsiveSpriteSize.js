import { useMemo } from "react";
export default function useResponsiveSpriteSize(stageSize) {
  return useMemo(() => {
    const side = Math.min(stageSize.w || 800, stageSize.h || 600);
    const px = Math.round(side * 0.12);
    return Math.max(56, Math.min(140, px));
  }, [stageSize.w, stageSize.h]);
}
