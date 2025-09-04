import React, { useEffect, useRef } from "react";

export default function DistortionField({
  width,
  height,
  x,
  y,
  laneH = 110,
  dragging = false,
  spacing = 22,
  mass = 0.68,
  singularity = false,
  // ⬇️ NUOVO: onda gravitazionale globale
  gwAmp = 0,
  gwPhase = 0,
}) {
  const ref = useRef(null);
  const anim = useRef(0);
  const last = useRef({ x, y });
  const target = useRef({ x, y });

  useEffect(() => {
    target.current.x = x;
    target.current.y = y;
  }, [x, y]);

  // parametri (come prima)
  const R = Math.min(width, height) * (0.35 + 0.2 * mass);
  const base = dragging ? 0.28 : 0.2;
  const strength = base * (0.6 + 1.6 * mass);
  const ease = dragging ? 0.28 : 0.18;

  const draw = () => {
    const canvas = ref.current;
    if (!canvas) return;
    const dpr = Math.max(1, window.devicePixelRatio || 1);
    const w = Math.floor(width),
      h = Math.floor(height);

    if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
    }
    const ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    // insegui Chirp morbido
    last.current.x += (target.current.x - last.current.x) * ease;
    last.current.y += (target.current.y - last.current.y) * ease;
    const cx = last.current.x,
      cy = last.current.y;

    // gradiente linee
    const lineGradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, R);
    lineGradient.addColorStop(0, "rgba(255,255,255,0.95)");
    lineGradient.addColorStop(0.6, "rgba(255,255,255,0.75)");
    lineGradient.addColorStop(1, "rgba(255,255,255,0.35)");
    ctx.lineWidth = 2.4;
    ctx.strokeStyle = lineGradient;

    // forza locale (curvatura vicino a Chirp)
    const pull = (dx, dy) => {
      const r = Math.hypot(dx, dy);
      const t = Math.min(1, r / R);
      const k = strength * (1 - t) * (1 - t);
      return { ox: -dx * k, oy: -dy * k };
    };

    // ⬇️ ANISOTROPIA GLOBALE: squeeze X / stretch Y (onda “+”)
    const gw = gwAmp * Math.sin(gwPhase); // valore istantaneo
    const sX = 1 + gw; // scala lungo X
    const sY = 1 - gw; // scala lungo Y (controfase)
    const startY = Math.max(laneH, Math.ceil(laneH / spacing) * spacing);
    const mx = w / 2; // centro scala orizzontale
    const my = (startY + h) / 2; // centro scala verticale (solo sulla stage, non nella lane)

    // orizzontali
    for (let gy = startY; gy <= h; gy += spacing) {
      ctx.beginPath();
      for (let gx = 0; gx <= w; gx += spacing) {
        const { ox, oy } = pull(gx - cx, gy - cy);
        const px0 = gx + ox,
          py0 = gy + oy;
        const px = mx + (px0 - mx) * sX;
        const py = my + (py0 - my) * sY;
        gx === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.stroke();
    }

    // verticali
    for (let gx = 0; gx <= w; gx += spacing) {
      ctx.beginPath();
      for (let gy = startY; gy <= h; gy += spacing) {
        const { ox, oy } = pull(gx - cx, gy - cy);
        const px0 = gx + ox,
          py0 = gy + oy;
        const px = mx + (px0 - mx) * sX;
        const py = my + (py0 - my) * sY;
        gy === startY ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.stroke();
    }

    // singolarità (come prima)
    if (singularity) {
      const EH = Math.max(12, R * 0.14);
      ctx.save();
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(cx, cy, EH, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      ctx.save();
      ctx.strokeStyle = "rgba(255,255,255,0.9)";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(cx, cy, EH + 1.5, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }
  };

  useEffect(() => {
    const loop = () => {
      draw();
      anim.current = requestAnimationFrame(loop);
    };
    anim.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(anim.current);
  }, [
    width,
    height,
    spacing,
    strength,
    ease,
    laneH,
    mass,
    singularity,
    gwAmp,
    gwPhase,
  ]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}
