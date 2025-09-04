import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar({ onToggleHC, highContrast }) {
  const linkClass = ({ isActive }) => `nav-btn ${isActive ? "active" : ""}`;
  return (
<nav className="site-nav">
  <NavLink to="/TappetoElastico" className={linkClass}>
    <span aria-hidden>🌐</span>Tappeto elastico
  </NavLink>
  <NavLink to="/OndeGravitazionali" className={linkClass}>
    <span aria-hidden>🌀</span>Onde gravitazionali
  </NavLink>
  <NavLink to="/BuchiNeri" className={linkClass}>
    <span aria-hidden>🕳️🕳️</span>Buchi neri in coppia
  </NavLink>
  
<NavLink
  to="/EinsteinTelescope"
  className={linkClass}
  style={{
    display: 'inline-flex',
    alignItems: 'center',
    whiteSpace: 'nowrap',   // tutto su una riga
    gap: '0.35rem',         // distanza icona-testo (riduci se vuoi più vicino)
    lineHeight: 1.1
  }}
>
  <svg
    aria-hidden="true"
    viewBox="0 0 26 26"
    style={{ width: 23, height: 23, flex: '0 0 auto' }} // triangolo più piccolo
  >
    <path
      d="M12 3L22 21H2L12 3z"
      fill="none"
      stroke="#0F172A"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="3"  r="3" fill="#0F172A" />
    <circle cx="22" cy="21" r="3" fill="#0F172A" />
    <circle cx="2"  cy="21" r="3" fill="#0F172A" />
  </svg>

  <span
    style={{
      margin: 0,
      whiteSpace: 'nowrap',  // non andare a capo
      letterSpacing: '0.01em'
    }}
  >
    Einstein Telescope
  </span>
</NavLink>




  <div className="nav-spacer"></div>

  {/* 👇 qui aggiungo .is-on se highContrast è true */}
  <button
    className={`toggle-btn ${highContrast ? "is-on" : ""}`}
    onClick={onToggleHC}
  >
    <span className="label">Contrasto</span>
  </button>
</nav>

  );
}
