import React, { useEffect, useState } from "react";

/**
 * ElasticExp (Semplice & fisicamente coerente)
 * - Due buchi neri vicini; un bottone in basso li fa ruotare (ON) o fermare (OFF).
 * - Quando ON: generano un’onda gravitazionale globale (GW) inviata a Playground
 *   via onWave({ amp, phase }) → DistortionField + Sprite si deformano insieme.
 * - L’interferometro a L al centro visualizza la stessa deformazione.
 */
export default function ElasticExp({ w, h, laneH = 110, onWave = () => {} }) {
  // Centro della L
  const cx = Math.round(w * 0.5);
  const cy = Math.max(Math.round(h * 0.8), laneH + 160);

  // Dimensioni della L
  const side = Math.min(w, h);
  const L0 = Math.round(side * 0.38);
  const thick = Math.round(Math.min(Math.max(side * 0.02, 16), 28));

  // Stato GW
  const [running, setRunning] = useState(false); // ON/OFF
  const [amp, setAmp] = useState(0); // easing verso target
  const [phase, setPhase] = useState(0); // fase (usata anche per la rotazione BH)

  // Parametri onda
  const FREQ = 0.3; // Hz Velocità
  const AMP_TARGET = 0.12; // ampiezza “giocattolo” (squeeze/stretch visibile)

  // Testo etichetta (per il typewriter)
  const testo = `Lo spazio-tempo si allunga e si accorcia e strumenti estremamente sensibili, come gli interferometri Virgo, LIGO e KAGRA, registrano il passaggio di un'onda gravitazionale.`;
  const [typed, setTyped] = useState("");

  // Typewriter soft: lettera per lettera con pause sulla punteggiatura
  useEffect(() => {
    if (!running) {
      setTyped("");
      return;
    }
    let i = 0;
    const BASE_MS = 60;   // prima 26 → più lento
const JITTER_MS = 70; // prima 40 → più variabile (sempre lento)
const PAUSE = {       // pause più lunghe su punteggiatura
  ",": 240,           // prima 160
  ".": 380,           // prima 260
  ":": 260,
  ";": 260,
  "—": 300,
  "–": 300
};
    let timer;
    const step = () => {
      setTyped(testo.slice(0, i));
      i += 1;
      if (i <= testo.length) {
        const ch = testo[i - 1];
        const delay = BASE_MS + Math.random() * JITTER_MS + (PAUSE[ch] || 0);
        timer = setTimeout(step, delay);
      }
    };
    timer = setTimeout(step, 200); // piccolo delay iniziale
    return () => clearTimeout(timer);
  }, [running, testo]);

  // Loop: quando running è true, avanza la fase (rotazione BH + GW);
  // l’ampiezza sale/scende con easing; inviamo i valori aggiornati al parent.
  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    const tick = (now) => {
      const dt = (now - last) / 1000;
      last = now;

      const nextPhase = running ? phase + 2 * Math.PI * FREQ * dt : phase;
      const targetAmp = running ? AMP_TARGET : 0;
      const nextAmp = amp + (targetAmp - amp) * 0.08;

      onWave({ amp: nextAmp, phase: nextPhase }); // → Playground

      setPhase(nextPhase);
      setAmp(nextAmp);

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // dipendenze minime: running cambia il comportamento; onWave viene dal parent
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, onWave, FREQ]);

  // Deformazione L dalla GW globale
  const gw = amp * Math.sin(phase);
  const Lx = Math.max(12, L0 * (1 + gw));
  const Ly = Math.max(12, L0 * (1 - gw));

  // Due buchi neri vicini che ruotano quando ON (theta = phase)
  const midX = Math.round(w * 0.8);
  const midY = laneH + 180;
  const ORBIT_R = Math.max(24, side * 0.05);
  const theta = phase;

  const bh1 = {
    x: midX + ORBIT_R * Math.cos(theta),
    y: midY + ORBIT_R * Math.sin(theta),
  };
  const bh2 = {
    x: midX - ORBIT_R * Math.cos(theta),
    y: midY - ORBIT_R * Math.sin(theta),
  };
  const BH_SIZE = 80;

  return (
    <>
      {/* Buchi neri (solo visual, click gestito dal bottone) */}
      <div
        style={{
          position: "absolute",
          left: (running ? bh1.x : midX - ORBIT_R) - BH_SIZE / 2,
          top: (running ? bh1.y : midY) - BH_SIZE / 2,
          width: BH_SIZE,
          height: BH_SIZE,
          borderRadius: "50%",
          zIndex: 3,
          background: "radial-gradient(circle at 50% 50%, #000 70%, #111 100%)",
          boxShadow:
            "0 0 30px 12px rgba(40,80,255,0.35), 0 0 60px 24px rgba(0,0,0,0.9)",
          pointerEvents: "none",
        }}
        aria-hidden
      />
      <div
        style={{
          position: "absolute",
          left: (running ? bh2.x : midX + ORBIT_R) - BH_SIZE / 2,
          top: (running ? bh2.y : midY) - BH_SIZE / 2,
          width: BH_SIZE,
          height: BH_SIZE,
          borderRadius: "50%",
          zIndex: 3,
          background: "radial-gradient(circle at 50% 50%, #000 70%, #111 100%)",
          boxShadow:
            "0 0 30px 12px rgba(40,80,255,0.35), 0 0 60px 24px rgba(0,0,0,0.9)",
          pointerEvents: "none",
        }}
        aria-hidden
      />

      {/* Bottone: avvia/ferma ONDA + ROTAZIONE BH */}
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
          onClick={() => setRunning((v) => !v)}
          style={{
            padding: "10px 16px",
            borderRadius: 14,
            border: "2px solid #0b53ff",
            background: running ? "#ff5c5c" : "#2b6bff",
            color: "#fff",
            fontWeight: 800,
            cursor: "pointer",
            boxShadow: "0 10px 24px rgba(0,0,0,.25)",
          }}
        >
          {running
            ? "⏸️ Stop"
            : "▶️ Onde Gravitazionali da un sistema binario di buchi neri"}
        </button>
      </div>

      {/* Interferometro a L al centro: segue la GW globale */}
      <svg
        width={w}
        height={h}
        viewBox={`0 0 ${w} ${h}`}
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 2,
        }}
        aria-hidden
      >
        <defs>
          <linearGradient id="armX" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8ecaff" />
            <stop offset="100%" stopColor="#e3f2ff" />
          </linearGradient>
          <linearGradient id="armY" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#8ecaff" />
            <stop offset="100%" stopColor="#e3f2ff" />
          </linearGradient>
          <filter id="armGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Beam splitter */}
        <rect
          x={cx - 14}
          y={cy - 14}
          width="28"
          height="28"
          rx="7"
          fill="#fff"
          stroke="#3a6bb4"
          strokeWidth="2"
        />

        {/* Braccio X */}
        <rect
          x={cx}
          y={cy - thick / 2}
          width={Lx}
          height={thick}
          rx={thick / 2}
          fill="url(#armX)"
          stroke="#3a6bb4"
          strokeWidth="2"
          filter="url(#armGlow)"
        />
        <circle
          cx={cx + Lx}
          cy={cy}
          r={Math.max(12, thick * 0.7)}
          fill="#fff"
          stroke="#3a6bb4"
          strokeWidth="2"
        />

        {/* Braccio Y */}
        <rect
          x={cx - thick / 2}
          y={cy - Ly}
          width={thick}
          height={Ly}
          rx={thick / 2}
          fill="url(#armY)"
          stroke="#3a6bb4"
          strokeWidth="2"
          filter="url(#armGlow)"
        />
        <circle
          cx={cx}
          cy={cy - Ly}
          r={Math.max(12, thick * 0.7)}
          fill="#fff"
          stroke="#3a6bb4"
          strokeWidth="2"
        />

        {/* Etichetta con typewriter */}
        <foreignObject
          x={cx - 300}
          y={cy - 370}
          width="min(40vw, 880px)"
          height="min(45vh, 420px)"
        >
          {running && (
            <div
              xmlns="http://www.w3.org/1999/xhtml"
              style={{
                fontSize: "clamp(22px, 3vmin, 38px)", // ≥22px, scala, cap a 38px
                lineHeight: 1.35,
                fontWeight: 700,
                color: "#d2f525",
                opacity: 0.95,
                whiteSpace: "pre-wrap",
                overflowWrap: "anywhere",
                hyphens: "auto",
                textRendering: "optimizeLegibility",
                WebkitFontSmoothing: "antialiased",
              }}
              aria-live="polite"
            >
              <style>{`
                .caret {
                  display: inline-block;
                  width: 0.6ch;
                  height: 1em;
                  margin-left: 0.1ch;
                  background: currentColor;
                  vertical-align: -0.05em;
                  animation: blink 1.1s steps(1, end) infinite;
                }
                @keyframes blink { 50% { opacity: 0; } }
              `}</style>
              {typed}
              <span className="caret" aria-hidden="true" />
            </div>
          )}
        </foreignObject>
      </svg>
    </>
  );
}
