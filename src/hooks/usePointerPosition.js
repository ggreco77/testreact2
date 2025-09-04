import { useEffect, useState } from "react";
export default function usePointerPosition(stageRef) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const s = stageRef.current;
    if (!s) return;
    const upd = (e) => {
      const r = s.getBoundingClientRect();
      setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
    };
    s.addEventListener("pointermove", upd, { passive: true });
    s.addEventListener("pointerdown", upd, { passive: true });
    const r = s.getBoundingClientRect();
    setPos({ x: r.width / 2, y: r.height / 2 });
    return () => {
      s.removeEventListener("pointermove", upd);
      s.removeEventListener("pointerdown", upd);
    };
  }, [stageRef]);
  return pos;
}
