import React from 'react'
import { useLanguage } from './LanguageContext'

export default function LanguageMenu() {
  const { lang, setLang } = useLanguage()

  const flags = [
    { code: 'it', label: 'Italiano', icon: '🇮🇹' },
    { 
      code: 'sc', 
      label: 'Sardu', 
      iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/65/Flag_of_Sardinia.svg' 
    },
    { code: 'en', label: 'English', icon: '🇬🇧' },
    { code: 'de', label: 'Deutsch', icon: '🇩🇪' },
    { code: 'es', label: 'Español', icon: '🇪🇸' },

  ]

  return (
    <nav
      aria-label="Seleziona lingua"
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        marginTop: 12,
      }}
    >
      {flags.map((f) => {
        const active = lang === f.code
        return (
          <button
            key={f.code}
            type="button"
            onClick={() => setLang(f.code)}
            aria-pressed={active}
            title={f.label}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              padding: '12px 16px',
              margin: '6px 8px',
              borderRadius: 14,
              cursor: 'pointer',
              fontWeight: 800,
              border: `2px solid ${active ? '#1e90ff' : 'rgba(0,0,0,.12)'}`,
              background: active ? 'rgba(30,144,255,.08)' : 'white',
              boxShadow: active
                ? '0 6px 18px rgba(30,144,255,.25)'
                : '0 2px 8px rgba(0,0,0,.08)',
              transition: 'all .15s ease',
            }}
          >
            {/* Emoji flag */}
            {f.icon && (
              <span style={{ fontSize: 26, lineHeight: 1 }}>{f.icon}</span>
            )}

            {/* Image flag */}
            {f.iconUrl && (
              <img
                src={f.iconUrl}
                alt=""
                width={30}
                height={22}
                style={{
                  display: 'block',
                  borderRadius: 4,
                  boxShadow: 'inset 0 0 0 1px rgba(0,0,0,.2)',
                }}
              />
            )}

            <span style={{ fontSize: 16 }}>{f.label}</span>
          </button>
        )
      })}
    </nav>
  )
}
