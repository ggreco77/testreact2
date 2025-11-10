// src/components/TipsPanel.jsx
import React from "react";
import { useLocation } from "react-router-dom";
import { useLanguage } from "../components/LanguageContext";            // ✅ path giusto
import { useTips, useTipsTitle } from "../content/tips.jsx";       // usa i dizionari multilingua

const STR = {
  it: { close: "Chiudi suggerimenti" },
  en: { close: "Close tips" },
  sc: { close: "Serra is cussìgios" },
};

// mappa pathname → mode
function modeFromPathname(pathname) {
  if (pathname.startsWith("/OndeGravitazionali")) return "tr";
  if (pathname.startsWith("/BuchiNeri"))          return "bl";
  if (pathname.startsWith("/EinsteinTelescope"))  return "br";
  return "tl";
}

export default function TipsPanel({
  title,         // opzionale: se non passato, uso titolo localizzato
  tips = [],     // opzionale: se passato, ha priorità
  onClose = null,
}) {
  const { lang } = useLanguage();
  const s = STR[lang] || STR.it;

  const tipsByLang = useTips();           // { tl: [...], tr: [...], ... } nella lingua corrente
  const localizedTitle = useTipsTitle();  // titolo localizzato

  const { pathname } = useLocation();
  const mode = modeFromPathname(pathname);

  // Se il padre NON passa tips, uso quelli localizzati
  const finalTips =
    tips && tips.length ? tips : (tipsByLang[mode] || []);

  // Se il padre non passa un titolo, o passa uno dei “classici” IT, uso quello localizzato
  const shouldOverrideTitle =
    !title ||
    title === "Suggerimenti" ||
    title === "Suggerimenti e Modalità d'uso";

  const finalTitle = shouldOverrideTitle ? localizedTitle : title;

  return (
    <aside className="tips" role="note" aria-live="polite">
      <div className="tips-head">
        <span>💡 {finalTitle}</span>
        {onClose && (
          <button
            className="tips-close"
            onClick={onClose}
            aria-label={s.close}
            title={s.close}
          >
            ×
          </button>
        )}
      </div>
      <ul className="tips-list">
        {finalTips.map((t, i) => (
          <li key={i}>{t}</li>
        ))}
      </ul>
    </aside>
  );
}

