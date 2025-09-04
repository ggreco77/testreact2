import { useEffect, useRef, useState } from "react";
export default function useDragSprite(stageRef, stageSize, spriteSize = 84) {
  const [pos, setPos] = useState({ x: 50, y: 60 });
  const [dragging, setDragging] = useState(false);
  const off = useRef({ x: 0, y: 0 });
  const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
  const clampPos = (x, y) => {
    const half = spriteSize / 2,
      pad = 4;
    return {
      x: clamp(x, half + pad, stageSize.w - half - pad),
      y: clamp(y, half + pad, stageSize.h - half - pad),
    };
  };
  const onPointerDown = (e) => {
    e.preventDefault();
    const s = stageRef.current;
    if (!s) return;
    const r = s.getBoundingClientRect();
    off.current = {
      x: e.clientX - (r.left + pos.x),
      y: e.clientY - (r.top + pos.y),
    };
    setDragging(true);
  };
  useEffect(() => {
    const s = stageRef.current;
    if (!s) return;
    const move = (e) => {
      if (!dragging) return;
      const r = s.getBoundingClientRect();
      const x = e.clientX - r.left - off.current.x;
      const y = e.clientY - r.top - off.current.y;
      setPos(clampPos(x, y));
    };
    const stop = () => setDragging(false);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerup", stop, { passive: true });
    window.addEventListener("pointercancel", stop, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", stop);
      window.removeEventListener("pointercancel", stop);
    };
  }, [dragging, stageRef, stageSize.w, stageSize.h]);
  return { pos, onPointerDown, dragging, setPos };
}
