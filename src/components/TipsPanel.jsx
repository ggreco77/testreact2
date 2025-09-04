import React from "react";
export default function TipsPanel({
  title = "Suggerimenti",
  tips = [],
  onClose = null,
}) {
  return (
    <aside className="tips" role="note" aria-live="polite">
      <div className="tips-head">
        <span>💡 {title}</span>
        {onClose && (
          <button
            className="tips-close"
            onClick={onClose}
            aria-label="Chiudi suggerimenti"
          >
            ×
          </button>
        )}
      </div>
      <ul className="tips-list">
        {tips.map((t, i) => (
          <li key={i}>{t}</li>
        ))}
      </ul>
    </aside>
  );
}
