import React from 'react'

export default function TopAlert({ onRestart }) {
  return (
    <div className="end-alert" role="alertdialog" aria-live="assertive">
      <div className="alert-box">
        <h2>⚠️ Doctor Tensor è diventato un buco nero!</h2>
        <p>Dal buco nero non esce più nulla, nemmeno la luce…</p>
        <p className="alert-sub">Il gioco è bloccato.</p>
        <button className="alert-btn" onClick={onRestart}>
          🔄 Ricomincia
        </button>
      </div>
    </div>
  )
}

