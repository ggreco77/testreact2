import React, { useEffect, useRef, useState } from "react";

/** LabExp — Doctor Chirp ha le forbici sul componente Sprite; qui gestiamo il “taglio”.
 *  Aggiunte:
 *  - onTool(toolName|null): callback verso il parent/Sprite per mostrare l’utensile (es. "scissors")
 *  - icona ✂️ grande vicino al buco nero durante la fase "cutting"
 */
export default function LabExp({ w, h, onTool = () => {} }) {
  const [phase, setPhase] = useState("idle"); // 'idle' | 'cutting' | 'split'
  const [t, setT] = useState(0);
  const canvasRef = useRef(null);
  const cx = Math.round(w * 0.5);
  const cy = Math.round(h * 0.58);

  const start = () => {
    if (phase === "idle") {
      setPhase("cutting");
      setT(0);
    } else {
      setPhase("idle");
      setT(0);
      const c = canvasRef.current;
      if (c) {
        const k = c.getContext("2d");
        k && k.clearRect(0, 0, c.width, c.height);
      }
    }
  };

  // Loop di animazione (avanza "cutting" e lancia gli anelli)
  useEffect(() => {
    let last = performance.now();
    let raf;
    const loop = (now) => {
      const dt = (now - last) / 1000;
      last = now;
      if (phase === "cutting") {
        const nt = Math.min(1, t + dt * 0.6);
        setT(nt);
        if (nt >= 1) {
          setPhase("split");
          pulseRings();
        }
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [phase, t]);

  // ✂️ Comunica allo Sprite (parent) lo stato dello strumento
  useEffect(() => {
    onTool(phase === "cutting" ? "scissors" : null);
    return () => onTool(null); // cleanup su unmount
  }, [phase, onTool]);

  const pulseRings = () => {
    const c = canvasRef.current;
    if (!c) return;
    const dpr = Math.max(1, devicePixelRatio || 1);
    const W = w, H = h;
    if (c.width !== W * dpr || c.height !== H * dpr) {
      c.width = W * dpr;
      c.height = H * dpr;
      c.style.width = W + "px";
      c.style.height = H + "px";
    }
    const ctx = c.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const origin = { x: cx, y: cy };
    const born = performance.now();
    const DUR = 1800;
    const MAXR = Math.hypot(W, H) * 0.5;
    let raf;
    const draw = () => {
      const tms = performance.now() - born;
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < 5; i++) {
        const local = tms / DUR - i * 0.12;
        if (local < 0 || local > 1.2) continue;
        const r = MAXR * local;
        const a = Math.max(0, 0.55 * (1 - local));
        ctx.beginPath();
        ctx.arc(origin.x, origin.y, r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255,255,255,${a})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }
      if (tms < DUR * 1.2) raf = requestAnimationFrame(draw);
    };
    draw();
  };

  const BIG = 140, small = 92;
  const sep = phase === "split" ? 180 : 0;

  const bhStyle = (size) => ({
    position: "absolute",
    width: size + "px",
    height: size + "px",
    borderRadius: "50%",
    background: "radial-gradient(circle at 50% 50%, #000 70%, #111 100%)",
          boxShadow:
            "0 0 30px 12px rgba(40,80,255,0.35), 0 0 60px 24px rgba(0,0,0,0.9)",
    pointerEvents: "none",
    zIndex: 2,
  });

  const massTagStyle = {
    position: "absolute",
    left: "50%",
    top: "100%",
    transform: "translate(-50%, 10px)",
    padding: "4px 8px",
    borderRadius: 10,
    background: "rgba(255,255,255,0.95)",
    color: "#0b1d3a",
    fontWeight: 900,
    fontSize: 14,
    border: "1px solid rgba(0,0,0,0.08)",
    boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
    whiteSpace: "nowrap",
  };

  // ✂️ icona grande vicino al buco nero (scala con BIG)
  const SC_SIZE = Math.max(56, BIG * 0.6);
  const scissorsBadgeStyle = {
    position: "absolute",
    right: -SC_SIZE * 0.30,   // sporge leggermente oltre il bordo
    top: -SC_SIZE * 0.30,
    width: SC_SIZE,
    height: SC_SIZE,
    borderRadius: "50%",
    display: "grid",
    placeItems: "center",
    background: "rgba(255,255,255,0.95)",
    boxShadow: "0 8px 18px rgba(0,0,0,0.28)",
    pointerEvents: "none",
    zIndex: 4,
  };
  const scissorsIconStyle = {
    fontSize: Math.round(SC_SIZE * 0.8),
    lineHeight: 1,
    transform: "rotate(90deg)", // punta allineata alla linea di taglio verticale
  };

  return (
    <>
      {/* anelli onda */}
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1 }}
        aria-hidden
      />

      {/* buco nero grande → due più piccoli */}
      {phase !== "split" ? (
        <div style={{ ...bhStyle(BIG), left: cx - BIG / 2, top: cy - BIG / 2 }}>
          {/* ✂️ icona grande vicino al bordo del buco nero DURANTE il taglio */}
          {phase === "cutting" && (
            <div style={scissorsBadgeStyle} aria-hidden title="Taglio in corso">
              <span style={scissorsIconStyle}>✂️</span>
            </div>
          )}

          <div style={massTagStyle}>Mₜₒₜₐₗₑ = 62 Masse Solari</div>

          {/* linea di taglio che appare con l’avanzamento */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: 8,
              bottom: 8,
              transform: "translateX(-50%)",
              width: 4,
              background: "linear-gradient(#fff, rgba(255,255,255,0))",
              opacity: t * 0.9,
            }}
          />
        </div>
      ) : (
        <>
          <div
            style={{ ...bhStyle(small), left: cx - sep - small / 2, top: cy - small / 2 }}
          >
            <div style={massTagStyle}>M₁ = 36 Masse Solari</div>
          </div>
          <div
            style={{ ...bhStyle(small), left: cx + sep - small / 2, top: cy - small / 2 }}
          >
            <div style={massTagStyle}>M₂ = 29 Masse Solari</div>
          </div>
        </>
      )}

      {/* bottone azione */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          bottom: 12,
          transform: "translateX(-50%)",
          zIndex: 4,
        }}
      >
        <button
          type="button"
          onClick={start}
          style={{
            padding: "10px 16px",
            borderRadius: 14,
            border: "2px solid #0b53ff",
            background: phase === "idle" ? "#2b6bff" : "#ff5c5c",
            color: "#fff",
            fontWeight: 800,
            cursor: "pointer",
            boxShadow: "0 10px 24px rgba(0,0,0,0.25)",
          }}
        >
          {phase === "idle" ? "✂️ Scopri le masse iniziali dei 2 buchi neri" : "↩︎"}
        </button>
      </div>
    </>
  );
}
