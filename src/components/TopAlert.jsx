// src/components/TopAlert.jsx
import React from 'react'
import { useLanguage } from '../components/LanguageContext' // ← aggiorna il path se diverso

const STR = {
  it: {
    title: '⚠️ Doctor Tensor è diventato un buco nero!',
    text: "Dal buco nero non esce più nulla, nemmeno la luce.",
    restart: 'Ricomincia',
  },
  en: {
    title: '⚠️ Doctor Tensor turned into a black hole!',
    text: 'Nothing can escape from a black hole — not even light.',
    restart: 'Restart',
  },
  sc: {
    title: '⚠️ ',
    text: '',
    restart: '',
  },
}

export default function TopAlert({ onRestart }) {
  const { lang } = useLanguage()
  const s = STR[lang] || STR.it

  return (
    <div className="top-alert" role="alert" aria-live="assertive">
      <div className="top-alert-inner">
        <strong>{s.title}</strong>
        <span className="top-alert-text">{s.text}</span>
        <button className="restart-btn sm" onClick={onRestart}>
          {s.restart}
        </button>
      </div>
    </div>
  )
}

