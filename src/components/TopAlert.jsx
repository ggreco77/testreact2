import React from 'react'

export default function TopAlert({ onRestart }) {
  return (
    <div className="top-alert" role="alert" aria-live="assertive">
      <div className="top-alert-inner">
        <strong>⚠️ Doctor Tensor è diventato un buco nero!</strong>
        <span className="top-alert-text">
           Dal buco nero non esce più nulla, nemmeno la luce.
        </span>
        <button className="restart-btn sm" onClick={onRestart}>Ricomincia</button>
      </div>
    </div>
  )
}
