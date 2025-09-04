import { useEffect, useRef, useState } from "react";
export default function useTicker(step = 0.02) {
  const [t, setT] = useState(0);
  const raf = useRef(0);
  useEffect(() => {
    const loop = () => {
      setT((p) => p + step);
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf.current);
  }, [step]);
  return t;
}
