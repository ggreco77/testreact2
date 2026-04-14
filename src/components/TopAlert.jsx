// src/components/TopAlert.jsx
import React from 'react'
import { useLanguage } from '../components/LanguageContext' // ← aggiorna il path se diverso

const STR = {
  it: {
    title: '⚠️ Doctor Tensor è diventato un buco nero!',
    text: "Dal buco nero non esce più nulla, nemmeno la luce!",
    restart: 'Ricomincia',
  },
  en: {
    title: '⚠️ Doctor Tensor turned into a black hole!',
    text: 'Nothing can escape from a black hole — not even light!',
    restart: 'Restart',
  },
  sc: {
    title: '⚠️ Tensor su Dotori est mudau in d-unu istampu nieddu!',
    text: 'De su istampu nieddu no ndi bessit prus nudda, nimancu sa luxi!',
    restart: 'Torra a incumentzai',
  },
  de: {
  title: '⚠️ Doktor Tensor hat sich in ein Schwarzes Loch verwandelt!',
  text: 'Nichts kann einem Schwarzen Loch entkommen – nicht einmal Licht.',
  restart: 'Neustart',
},
es: {
  title: '⚠️ ¡Doctor Tensor se ha convertido en un agujero negro!',
  text: 'Nada puede escapar de un agujero negro — ni siquiera la luz.',
  restart: 'Reiniciar',
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

