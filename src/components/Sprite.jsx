import React from "react";

function clamp(v, min, max) {
  return Math.min(max, Math.max(min, v));
}

/**
 * Sprite.jsx — Doctor Chirp a "quadro arrotondato" quasi 3D
 * - Corpo: box arrotondato con gradienti + ombre per effetto 3D morbido.
 * - Occhi grandi e simpatici che seguono il cursore.
 * - In "Elastico" (mode==='tr') niente elasticità locale: segue SOLO la GW globale.
 * - Squash/Stretch globale coerente con la griglia: gwAmp/gwPhase.
 */
export default function Sprite({
  x,
  y,
  mode,
  onPointerDown,
  stretch = 0,
  surfYOffset = 0,
  cursor,
  size = 100,
  collapse = 0,
  gwAmp = 0,
  gwPhase = 0,
}) {
  // ---- Occhi che seguono il cursore ----
  const dx = (cursor?.x ?? x) - x;
  const dy = (cursor?.y ?? y) - (y + surfYOffset);
  const dist = Math.hypot(dx, dy);
  const dirX = dist ? dx / dist : 0;
  const dirY = dist ? dy / dist : 0;

  // dimensioni occhi
  const eyeW = Math.max(16, size * 0.3);
  const eyeH = Math.max(14, size * 0.26);
  const pupilMax = Math.min(eyeW, eyeH) * 0.28;
  const pupilX = dirX * pupilMax;
  const pupilY = dirY * pupilMax;

  // ---- Trasformazioni locali per modalità ----
  let sX = 1,
    sY = 1,
    rot = 0,
    idleY = 0;

  if (mode === "tl") {
    const a = Math.sin(stretch * 2) * 0.02;
    sX = 1 + a;
    sY = 1 - a;
    idleY = Math.sin(stretch * 2) * 3;
  } else if (mode === "tr") {
    // ⛔ niente elasticità locale: solo GW globale (sotto)
  } else if (mode === "bl") {
    const a = Math.sin(stretch * 6) * 0.04;
    sX = 1 + a;
    sY = 1 - a;
  } else if (mode === "br") {
    rot = Math.sin(stretch * 2) * 8;
  }

  // ---- Deformazione globale (GW) coerente con il tappeto ----
  const rawGw = gwAmp * Math.sin(gwPhase);
  const VISUAL_GAIN = 1.35;
  const g = clamp(rawGw * VISUAL_GAIN, -0.5, 0.5);
  sX *= 1 + g;
  sY *= 1 - g;

  // ---- Collasso (singolarità) ----
  const collapseScale = 1 - 0.85 * Math.min(1, collapse);

  // ---- Transform finale ----
  const transform =
    `translate(-50%,-50%) translate(${x}px, ${y + surfYOffset + idleY}px)` +
    ` rotate(${rot}deg) scale(${sX * collapseScale},${sY * collapseScale})`;

  // ---- Stili 3D del corpo ----
  const bodyStyle = {
    position: "relative",
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: `${Math.max(20, size * 0.28)}px`,
    // doppio gradiente per “bombatura”
    background: `radial-gradient(120% 100% at 25% 20%, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.2) 30%, rgba(255,255,255,0) 45%)`,
    // colore base con leggera variazione
    backgroundColor: "#8fd1ff",
    // layer di sfumature con box-shadow per effetto quasi 3D
    boxShadow: `inset 8px 10px 18px rgba(255,255,255,0.65),
       inset -10px -14px 22px rgba(0,0,40,0.25),
       0 10px 24px rgba(0,0,0,0.25)`,
    border: "2px solid rgba(255,255,255,0.85)",
    overflow: "visible",
  };

  // Highlight superiore separato (gloss)
  const topGlossStyle = {
    position: "absolute",
    left: "10%",
    top: "8%",
    width: "55%",
    height: "35%",
    borderRadius: "40%",
    background:
      "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.9), rgba(255,255,255,0.15) 60%, rgba(255,255,255,0) 70%)",
    filter: "blur(1px)",
    pointerEvents: "none",
  };

  // Ombra sotto (nel mondo)
  const shadowStyle = {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: `translate(-50%, calc(-50% + ${Math.max(14, size * 0.18)}px))`,
    width: `${size * 0.95}px`,
    height: `${size * 0.28}px`,
    background:
      "radial-gradient(ellipse at center, rgba(0,0,0,0.35), rgba(0,0,0,0) 70%)",
    borderRadius: "50%",
    filter: "blur(2px)",
  };

  // Occhi posizionati nel box
  const eyeBase = {
    position: "absolute",
    width: `${eyeW}px`,
    height: `${eyeH}px`,
    background: "#fff",
    borderRadius: `${Math.min(eyeW, eyeH) / 2}px`,
    border: "2px solid rgba(0,0,0,0.18)",
    display: "grid",
    placeItems: "center",
    boxShadow:
      "0 1px 3px rgba(0,0,0,0.22), inset 0 0 0 2px rgba(255,255,255,0.85)",
  };
  const eyeLStyle = { left: `${size * 0.26}px`, top: `${size * 0.32}px` };
  const eyeRStyle = { left: `${size * 0.58}px`, top: `${size * 0.26}px` };

  const pupilStyle = {
    position: "absolute",
    left: "50%",
    top: "50%",
    width: `${Math.max(8, eyeW * 0.42)}px`,
    height: `${Math.max(8, eyeW * 0.42)}px`,
    borderRadius: "50%",
    background:
      "radial-gradient(circle at 40% 40%, #222 0%, #000 60%, #000 100%)",
    transform: `translate(calc(-50% + ${pupilX}px), calc(-50% + ${pupilY}px))`,
    boxShadow: "inset 0 0 6px rgba(255,255,255,0.08)",
  };
  const glintStyle = {
    position: "absolute",
    left: "35%",
    top: "35%",
    width: `${Math.max(3, eyeW * 0.12)}px`,
    height: `${Math.max(3, eyeW * 0.12)}px`,
    borderRadius: "50%",
    background: "rgba(255,255,255,0.9)",
    boxShadow: "0 0 6px rgba(255,255,255,0.6)",
    pointerEvents: "none",
  };

  // Piccolo sorriso
  const mouthStyle = {
    position: "absolute",
    left: "50%",
    top: `${size * 0.64}px`,
    width: `${size * 0.46}px`,
    height: `${size * 0.26}px`,
    transform: "translate(-50%, -50%)",
    borderBottom: "5px solid rgba(40,40,40,0.9)",
    borderRadius: "0 0 60% 60% / 0 0 70% 70%",
  };

  const opacity = 1 - 0.85 * Math.min(1, collapse);

  return (
    <div
      className="sprite"
      style={{
        transform,
        "--size": `${size}px`,
        opacity,
        position: "absolute",
        zIndex: 999999,
      }}
      onPointerDown={onPointerDown}
      role="img"
      aria-label="Doctor Chirp — quadrato arrotondato"
    >
      {/* ombra mondo */}
      <div className="shadow" aria-hidden style={shadowStyle} />

      {/* corpo 3D */}
      <div className="body" style={bodyStyle}>
        {/* highlight superiore */}
        <div style={topGlossStyle} aria-hidden />

        {/* occhi */}
        <div className="eye left" style={{ ...eyeBase, ...eyeLStyle }}>
          <div style={pupilStyle} />
          <div style={glintStyle} />
        </div>
        <div className="eye right" style={{ ...eyeBase, ...eyeRStyle }}>
          <div style={pupilStyle} />
          <div style={glintStyle} />
        </div>

        {/* sorriso */}
        <div className="mouth" style={mouthStyle} />
      </div>
    </div>
  );
}
