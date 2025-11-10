import React from "react";
import { NavLink } from "react-router-dom";
import { useLanguage } from "./LanguageContext";
import { NAV } from "./navLabels";
import LanguageMenu from "./LanguageMenu";

export default function Navbar({ onToggleHC, highContrast }) {
  const { lang } = useLanguage();
  const s = NAV[lang] || NAV.it;

  const linkClass = ({ isActive }) => `nav-btn ${isActive ? "active" : ""}`;

  return (
    <nav className="site-nav">
      <NavLink to="/TappetoElastico" className={linkClass} aria-label={s.tl} title={s.tl}>
        <span aria-hidden>🌐</span>{s.tl}
      </NavLink>

      <NavLink to="/OndeGravitazionali" className={linkClass} aria-label={s.tr} title={s.tr}>
        <span aria-hidden>🌀</span>{s.tr}
      </NavLink>

      <NavLink to="/BuchiNeri" className={linkClass} aria-label={s.bl} title={s.bl}>
        <span aria-hidden>🕳️🕳️</span>{s.bl}
      </NavLink>

      <NavLink
        to="/EinsteinTelescope"
        className={linkClass}
        aria-label={s.br}
        title={s.br}
        style={{ display: 'inline-flex', alignItems: 'center', whiteSpace: 'nowrap', gap: '0.35rem', lineHeight: 1.1 }}
      >
        <svg aria-hidden="true" viewBox="0 0 26 26" style={{ width: 23, height: 23, flex: '0 0 auto' }}>
          <path d="M12 3L22 21H2L12 3z" fill="none" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="12" cy="3" r="3" fill="#0F172A" />
          <circle cx="22" cy="21" r="3" fill="#0F172A" />
          <circle cx="2"  cy="21" r="3" fill="#0F172A" />
        </svg>
        <span style={{ margin: 0, whiteSpace: 'nowrap', letterSpacing: '0.01em' }}>{s.br}</span>
      </NavLink>

      <div className="nav-spacer" />

      <button
        className={`toggle-btn ${highContrast ? "is-on" : ""}`}
        onClick={onToggleHC}
        aria-pressed={highContrast}
        aria-label={s.contrast}
        title={s.contrast}
      >
        <span className="label">{s.contrast}</span>
      </button>

      {/* Menu lingue sotto i bottoni delle avventure */}
      <div style={{ flexBasis: '100%', marginTop: 8 }}>
        <LanguageMenu />
      </div>
    </nav>
  );
}

