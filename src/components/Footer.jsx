import React from "react";
import "./Footer.css";

/**
 * Doctor Tensor STATICO identico a src/components/Sprite.jsx
 * (solo: pupille ferme al centro + niente transform/posizionamento assoluto)
 */
function DoctorTensorStaticOriginal({ size = 64 }) {
  // ---- Dimensioni occhi (identiche) ----
  const eyeW = Math.max(16, size * 0.3);
  const eyeH = Math.max(14, size * 0.26);

  // ---- Stili 3D del corpo (identici) ----
  const bodyStyle = {
    position: "relative",
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: `${Math.max(20, size * 0.28)}px`,
    background: `radial-gradient(120% 100% at 25% 20%, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.2) 30%, rgba(255,255,255,0) 45%)`,
    backgroundColor: "#8fd1ff",
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
    pointerEvents: "none",
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

  // Pupille: fisse al centro (niente cursor tracking)
  const pupilStyle = {
    position: "absolute",
    left: "50%",
    top: "50%",
    width: `${Math.max(8, eyeW * 0.42)}px`,
    height: `${Math.max(8, eyeW * 0.42)}px`,
    borderRadius: "50%",
    background:
      "radial-gradient(circle at 40% 40%, #222 0%, #000 60%, #000 100%)",
    transform: "translate(-50%, -50%)",
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

  // Piccolo sorriso (identico)
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

  return (
    <div style={{ position: "relative", width: size, height: size, flex: "0 0 auto" }}>
      <div aria-hidden style={shadowStyle} />

      <div style={bodyStyle}>
        <div aria-hidden style={topGlossStyle} />

        <div style={{ ...eyeBase, ...eyeLStyle }}>
          <div style={pupilStyle} />
          <div style={glintStyle} />
        </div>

        <div style={{ ...eyeBase, ...eyeRStyle }}>
          <div style={pupilStyle} />
          <div style={glintStyle} />
        </div>

        <div style={mouthStyle} />
      </div>
    </div>
  );
}

function ThanksBubble() {
  return (
    <div
      style={{
        background: "#ffffff",
        color: "#0b1220",
        borderRadius: 16,
        padding: "12px 14px",
        position: "relative",
        fontSize: 13,
        maxWidth: 520,
        boxShadow: "0 10px 26px rgba(0,0,0,0.18)",
      }}
    >
      <div style={{ fontWeight: 800, marginBottom: 6 }}>
        🙏 Ringraziamentos / Danksagung / Agradecimientos
      </div>

      <div style={{ marginBottom: 4 }}>
        <b>SC:</b> Gràtzias meda <b>Matteo Tuveri</b> (Sardu)
      </div>
      <div style={{ marginBottom: 4 }}>
        <b>DE:</b> Danke schön <b>Katharina von Sturm</b> (Deutsch)
      </div>
      <div style={{ marginBottom: 4 }}>
  <b>ES:</b> Gracias <b>Guillem Fernández Rodríguez</b> e <b>Isabel Cordero</b> (Español)
</div>

      {/* FRECCIA: rivolta verso Doctor Tensor */}
      <div
        style={{
          position: "absolute",
          left: -10,
          top: "50%",
          width: 18,
          height: 18,
          background: "#ffffff",
          transform: "translateY(-50%) rotate(45deg)",
          boxShadow: "-2px 2px 6px rgba(0,0,0,0.06)",
        }}
      />
    </div>
  );
}

export default function Footer({
  version = "v0.2.0",
  repoUrl = "https://github.com/your-org/your-repo",
  email = "giuseppe.greco@uniurb.it",
}) {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="ft-inner">
        {/* Versione */}
        <div className="ft-block" style={{ alignItems: "center", gap: 10 }}>
          <span className="ft-label">Version</span>
          <strong className="ft-value">{version}</strong>
        </div>

        {/* Doctor Tensor */}
        <div className="ft-block">
          <span className="ft-label">Doctor Tensor: developed and maintained by Giuseppe Greco (LVK collaboration)</span>
          <span className="ft-value">Versione sperimentale in fase di test</span>
        </div>

{/* Contatti */}
<div className="ft-block">
  <span className="ft-label">Contact</span>

  <a
    href={`mailto:${email}`}
    className="ft-icon-link"
    aria-label="Invia una email"
    title="Invia una email"
  >
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 6h16v12H4V6Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M4 7l8 6 8-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  </a>
</div>


      </div>

      {/* Riga ringraziamenti: 1 solo sprite + nuvoletta */}
      <div
        style={{
          maxWidth: "var(--ft-maxw)",
          margin: "14px auto 0",
          paddingTop: 12,
          borderTop: "1px solid var(--ft-border)",
          display: "flex",
          alignItems: "center",
          gap: 14,
          flexWrap: "wrap",
        }}
      >
        <DoctorTensorStaticOriginal size={64} />
        <ThanksBubble />
      </div>

      <div className="ft-bottom">
        <span>© {year} Doctor Tensor</span>
      </div>
    </footer>
  );
}
