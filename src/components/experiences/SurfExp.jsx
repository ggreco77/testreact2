import React, { useEffect, useRef, useState } from "react";

import { useLanguage } from "../LanguageContext";

// Testi per lingua
const STR = {
  it: {
    on: "↩︎",
    off: "✨ Perché ET è speciale?",
    line1: "Un laboratorio sotterraneo ⛏️🚜 con strumentazione criogenica ❄️🧊",
    line2: "Il posto perfetto per costruirlo? La Sardegna, un’isola davvero silenziosa! 🤫🔇",
  },
  en: {
    on: "↩︎",
    off: "✨ Why is ET special?",
    line1: "An underground laboratory ⛏️🚜 with cryogenic instrumentation ❄️🧊",
    line2: "The perfect place to build it? Sardinia, an island truly quiet! 🤫🔇",
  },
  sc: {
    on: "↩︎",
    off: "✨ Poita ET est ispetziali?",
    line1: "Unu laboratòriu asuta de terra ⛏️🚜 cun ainas criogènicas ❄️🧊",
    line2: "Su logu prus ispantosu po ndi ddu pesai? Sa Sardigna, un’isula assèbia chieta a beru! 🤫🔇",
  },
};




export default function SurfExp({ w = 900, h = 520, onWave = () => {} }) {
    const { lang } = useLanguage();
  const s = STR[lang] || STR.it;
  
  const cx = Math.round(w * 0.5);
  const cy = Math.round(h * 0.56);

  const side = Math.min(w, h);
  const triR = Math.round(side * 0.28);
  const thick = Math.round(Math.min(Math.max(side * 0.02, 14), 28));

  const [etOn, setEtOn] = useState(false);
  const [t, setT] = useState(0);              // clock per animazioni lente
  const [lift, setLift] = useState(0);        // progress 0..1 del terreno
  const [isLifting, setIsLifting] = useState(false); // stato animazione

  // --- Tween del terreno: durata fissa + easing pulito ---
  const animRef = useRef({ start: 0, from: 0, to: 0, dur: 1400, playing: false });
  const easeInOutCubic = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
  const startTween = (to) => {
    animRef.current = {
      start: performance.now(),
      from: lift,
      to,
      dur: 1400, // ms → regola qui la velocità
      playing: true,
    };
    setIsLifting(true);
  };

  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    const tick = (now) => {
      const dt = (now - last) / 1000;
      last = now;
      setT((p) => p + dt);

      const a = animRef.current;
      if (a.playing) {
        const p = Math.min(1, (now - a.start) / a.dur);
        const eased = easeInOutCubic(p);
        setLift(a.from + (a.to - a.from) * eased);
        if (p >= 1) {
          a.playing = false;
          setIsLifting(false);
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleET = () => {
    startTween(etOn ? 0 : 1);
    setEtOn((v) => !v);
  };

  // --- Geometria triangolo statico ---
  const toXY = (r, deg) => {
    const a = ((deg - 90) * Math.PI) / 180;
    return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
  };
  const V1 = toXY(triR, 0);
  const V2 = toXY(triR, 120);
  const V3 = toXY(triR, 240);
  const triPath = `M ${V1.x} ${V1.y} L ${V2.x} ${V2.y} L ${V3.x} ${V3.y} Z`;

  // --- Terreno: da nascosto (off-screen) a livello target ---
  // ↑ Alzato di PIÙ: target più alto (più vicino al bordo superiore).
  const GROUND_TARGET_Y = Math.round(cy + triR * 0.10); // prima era ~0.25
  const GROUND_HIDDEN_Y = h + 60;                        // completamente fuori scena
  const groundY = Math.round(GROUND_HIDDEN_Y + (GROUND_TARGET_Y - GROUND_HIDDEN_Y) * lift);
  const tunnelY = groundY - Math.round(triR * 0.12);

  // --- Animazioni lente (icone) ---
  const bob = Math.sin(t * 0.6) * 4;
  const sway = Math.sin(t * 0.4) * 6;

  // Criogenia: cluster intorno agli specchi
  const CryoCluster = ({ x, y, radius = 32, seed = 0 }) => {
    const flakes = [
      { e: "❄️", s: 30 },
      { e: "🧊", s: 32 },
      { e: "✨", s: 26 },
    ];
    return flakes.map((f, i) => {
      const ang = t * 0.28 + seed * 1.1 + i * 2.3;
      const rr = radius + 6 * Math.sin(t * 0.5 + i);
      return (
        <text
          key={i}
          x={x + rr * Math.cos(ang)}
          y={y + rr * Math.sin(ang)}
          fontSize={f.s}
          opacity="0.95"
          style={{ pointerEvents: "none" }}
        >
          {f.e}
        </text>
      );
    });
  };

  const ColdPuffs = ({ x, y }) => {
    const puff = (k) => {
      const life = (t * 0.4 + k) % 1;
      const yy = y - life * 26;
      const xx = x + Math.sin((t + k) * 1.2) * 6;
      const scale = 0.8 + life * 0.6;
      const op = 0.55 * (1 - life);
      return { xx, yy, r: 6 * scale, op };
    };
    return [0, 0.33, 0.66].map((k, i) => {
      const p = puff(k);
      return <circle key={i} cx={p.xx} cy={p.yy} r={p.r} fill="url(#coldGrad)" opacity={p.op} filter="url(#softGlow)" />;
    });
  };

  // Frecce di sollevamento (mostrate SOLO mentre si solleva)
  const LiftArrows = ({ x, phase = 0 }) => {
    const frac = (t * 0.7 + phase) % 1; // 0..1 ciclico
    const ay = groundY - 14 - frac * 30;
    const op = 0.3 + 0.7 * (1 - frac);
    return (
      <>
        <text x={x} y={ay} fontSize="22" textAnchor="middle" opacity={op}>⬆️</text>
        <text x={x} y={ay + 18} fontSize="18" textAnchor="middle" opacity={op * 0.7}>⬆️</text>
      </>
    );
  };

  // Sagoma Sardegna (vettoriale chiara)
  const sardX = Math.round(w * 0.78);
  const sardY = Math.round(h * 0.22);
  const sardScale = Math.max(0.6, Math.min(1.2, w / 900));
  const SARD_COAST =
    "M 20,-140 C 42,-128 58,-104 56,-85 C 54,-69 65,-51 72,-30 C 78,-12 70,8 54,28 C 38,47 28,64 16,82 C 6,96 -6,108 -24,114 C -46,121 -72,116 -88,104 C -100,96 -104,80 -112,66 C -122,48 -132,36 -132,18 C -132,2 -120,-8 -108,-18 C -96,-28 -90,-46 -84,-62 C -74,-84 -58,-104 -40,-126 C -26,-142 -2,-148 20,-140 Z";

  return (
    <>
      {/* Bottone */}
      <div style={{ position: "absolute", left: "50%", bottom: 12, transform: "translateX(-50%)", zIndex: 5 }}>
        <button
          type="button"
          onClick={toggleET}
          style={{
            padding: "12px 18px",
            borderRadius: 14,
            border: "2px solid #0b53ff",
            background: etOn ? "#15a34a" : "#2b6bff",
            color: "#fff",
            fontWeight: 900,
            cursor: "pointer",
            boxShadow: "0 10px 24px rgba(0,0,0,.25)",
          }}
        >
          {etOn ? s.on : s.off}
        </button>
      </div>

      {/* Scena */}
      <svg
        width={w}
        height={h}
        viewBox={`0 0 ${w} ${h}`}
        style={{ position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none" }}
        aria-hidden
      >
        <defs>
          <filter id="armShadow" x="-40%" y="-40%" width="180%" height="180%">
            <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="rgba(0,0,0,0.32)" />
          </filter>
          <filter id="cryoGlow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <radialGradient id="coldGrad" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#e6fbff" />
            <stop offset="100%" stopColor="rgba(180,235,255,0)" />
          </radialGradient>
          <filter id="softGlow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="2" />
          </filter>

          {/* terreno */}
          <linearGradient id="soil" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6b4428" />
            <stop offset="100%" stopColor="#3a2618" />
          </linearGradient>
          <pattern id="soilDots" width="8" height="8" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="rgba(0,0,0,0.12)" />
            <circle cx="6" cy="6" r="1" fill="rgba(255,255,255,0.08)" />
          </pattern>
          <linearGradient id="soilLip" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.55)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.0)" />
          </linearGradient>
          {/* Ombra che SCORRE sopra il bordo mentre si solleva */}
          <linearGradient id="liftShadowGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(0,0,0,0.45)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </linearGradient>

          <linearGradient id="triStroke" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#bfe3ff" />
            <stop offset="100%" stopColor="#eef8ff" />
          </linearGradient>

          <filter id="sardGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#57e6ff" floodOpacity="0.9" />
          </filter>
        </defs>

        {/* Cielo leggero */}
        <rect x="0" y="0" width={w} height={h} fill="rgba(33,71,173,0.10)" />

        {/* Sardegna (solo ET ON) */}
        

        {/* --- TERRENO: sollevamento con effetto 3D --- */}
        {/* massa terreno */}
        <path
          d={`M 0 ${groundY} Q ${w / 2} ${groundY - 36} ${w} ${groundY} L ${w} ${h} L 0 ${h} Z`}
          fill="url(#soil)" opacity={lift > 0 ? 0.95 : 0} filter="url(#armShadow)"
        />
        {/* grana */}
        <path
          d={`M 0 ${groundY} Q ${w / 2} ${groundY - 36} ${w} ${groundY} L ${w} ${h} L 0 ${h} Z`}
          fill="url(#soilDots)" opacity={lift > 0 ? 0.35 : 0}
        />
        {/* bordo in rilievo */}
        {lift > 0 && (
          <>
            <rect x="0" y={groundY - 12} width={w} height="12" fill="url(#soilLip)" opacity="0.8" />
            {/* Ombra che scorre verso l'alto mentre si alza */}
            <rect
              x="0"
              y={groundY - 42}
              width={w}
              height="42"
              fill="url(#liftShadowGrad)"
              opacity={0.55 * (isLifting ? 1 : 0.6)}
            />
          </>
        )}

        {/* Galleria tratteggiata */}
        <path
          d={`M ${V2.x} ${tunnelY} Q ${cx} ${tunnelY + 28} ${V3.x} ${tunnelY}`}
          stroke={`rgba(255,255,255,${0.15 + 0.85 * lift})`}
          strokeWidth="4"
          strokeDasharray="10 8"
          fill="none"
        />

        {/* Interferometro triangolare (statico) */}
        <path
          d={triPath}
          fill="rgba(255,255,255,0.05)"
          stroke="url(#triStroke)"
          strokeWidth={thick}
          strokeLinejoin="round"
          filter="url(#armShadow)"
          opacity="0.98"
        />

        {/* Specchi + criogenia */}
        {[V1, V2, V3].map((P, i) => (
          <g key={i}>
            <circle cx={P.x} cy={P.y} r={Math.max(12, thick * 0.7)} fill="#fff" stroke="#3a6bb4" strokeWidth="2" filter="url(#armShadow)" />
            {etOn && (
              <>
                <circle
                  cx={P.x}
                  cy={P.y}
                  r={Math.max(22, thick)}
                  fill="none"
                  stroke="#b9f1ff"
                  strokeWidth="3"
                  strokeDasharray="8 8"
                  strokeDashoffset={(t * 6 + i * 12) % 16}
                  opacity="0.95"
                  filter="url(#cryoGlow)"
                />
                <CryoCluster x={P.x} y={P.y} radius={34} seed={i} />
                <ColdPuffs x={P.x} y={P.y - 8} />
              </>
            )}
          </g>
        ))}

        {/* Icone sottoterra (appaiono col terreno) */}
        {lift > 0 && (
          <>
            <g transform={`translate(${cx - triR - 80 + sway * 0.2}, ${groundY - 10 + bob})`}>
              <text x="0" y="0" fontSize="48" textAnchor="end" opacity={lift}>👷‍♀️</text>
              <text x="-6" y="30" fontSize="52" textAnchor="end" opacity={lift}>⛏️</text>
            </g>
            <g transform={`translate(${cx + triR + 80 - sway * 0.2}, ${groundY - 12 - bob})`}>
              <text x="0" y="0" fontSize="62" textAnchor="start" opacity={lift}>🚜</text>
            </g>
          </>
        )}

        {/* Frecce di sollevamento durante l’animazione */}
        {isLifting && (
          <>
            <LiftArrows x={w * 0.3} phase={0} />
            <LiftArrows x={cx} phase={0.33} />
            <LiftArrows x={w * 0.7} phase={0.66} />
          </>
        )}

        {/* Etichetta (localizzata) */}
        <text
  x={cx}
  y={Math.min(h - 50, groundY + (h < 520 ? 90 : 130))}
  textAnchor="middle"
  fill="#eaf3ff"
  opacity="0.98"
  fontSize={Math.round(Math.max(12, Math.min(28, w * 0.03)))} // responsive
>
  {etOn && (
    <>
     
     <tspan x={cx}>{s.line1}</tspan>
      <tspan x={cx} dy="1.2em">{s.line2}</tspan>
    </>
  )}
</text>

      </svg>
    </>
  );
}
