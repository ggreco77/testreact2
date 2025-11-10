import React, { useMemo } from 'react'
import { useLanguage } from './LanguageContext'

export default function LanguageMenu() {
  const { lang, setLang } = useLanguage()

  // bandiera SAR (croce rossa + 4 cerchi neri) inline, zero asset esterni
  const sardiniaDataUrl = useMemo(() => {
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 100">
        <rect width="160" height="100" fill="white"/>
        <rect x="78" width="4" height="100" fill="#c1121f"/>
        <rect y="48" width="160" height="4" fill="#c1121f"/>
        <circle cx="40" cy="25" r="12" fill="black"/>
        <circle cx="120" cy="25" r="12" fill="black"/>
        <circle cx="40" cy="75" r="12" fill="black"/>
        <circle cx="120" cy="75" r="12" fill="black"/>
      </svg>`
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg)
  }, [])

  const flags = [
    { code: 'it', label: 'Italiano', icon: '🇮🇹' },
    { code: 'sc', label: 'Sardu', iconUrl: sardiniaDataUrl },
    { code: 'en', label: 'English', icon: '🇬🇧' },
  ]

  return (
    <nav
      aria-label="Seleziona lingua"
      style={{ width:'100%', display:'flex', justifyContent:'center', flexWrap:'wrap', marginTop: 12 }}
    >
      {flags.map(f => {
        const active = lang === f.code
        return (
          <button
            key={f.code}
            type="button"
            onClick={() => setLang(f.code)}
            aria-pressed={active}
            title={f.label}
            style={{
              display:'inline-flex', alignItems:'center', gap:8,
              padding:'10px 12px', margin:'6px 8px',
              borderRadius:12, cursor:'pointer', fontWeight:800,
              border:`2px solid ${active ? '#1e90ff' : 'rgba(0,0,0,.12)'}`,
              background: active ? 'rgba(30,144,255,.08)' : 'white',
              boxShadow: active ? '0 6px 18px rgba(30,144,255,.25)' : '0 2px 8px rgba(0,0,0,.08)',
              transition:'all .15s ease'
            }}
          >
            {f.icon && <span style={{ fontSize: 20, lineHeight: 1 }}>{f.icon}</span>}
            {f.iconUrl && <img src={f.iconUrl} alt="" width={22} height={16}
              style={{ display:'block', borderRadius:3, boxShadow:'inset 0 0 0 1px rgba(0,0,0,.2)' }} />}
            <span>{f.label}</span>
          </button>
        )
      })}
    </nav>
  )
}