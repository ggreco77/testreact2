import { useEffect, useState } from "react";
export default function useStageSize(ref) {
  const [size, setSize] = useState({ w: 800, h: 600 });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const r0 = el.getBoundingClientRect?.();
    if (r0) setSize({ w: r0.width, h: r0.height });
    const ro = new ResizeObserver(() => {
      const r = el.getBoundingClientRect?.();
      if (r) setSize({ w: r.width, h: r.height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);
  return size;
}
