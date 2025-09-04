import React from 'react'

export default function CurvatureExp({ w, h, value, onChange }) {
  // facoltativo: mostra la massa “effettiva” (0% = 68%)
  const effective = 0.68 + value * (1 - 0.68)
  const labelVal = Math.round(effective * 100)

  return (
    <div
      className="mass-dock"
      style={{ left: w / 2, bottom: 12, transform: 'translateX(-50%)' }}
      role="group"
      aria-label="Controllo massa e curvatura"
    >
      <div className="mass-dock-inner">
        <span className="mass-label"></span>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          aria-valuemin={0}
          aria-valuemax={1}
          aria-valuenow={value}
          aria-label="Regola la massa"
        />
        {/* <span className="mass-value">{labelVal}%</span> */}
      </div>
    </div>
  )
}

