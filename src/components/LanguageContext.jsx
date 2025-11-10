/**
 * LanguageContext: tiny, dependency-free language switcher.
 * Keeps the current language in state, persists to localStorage (default "it"),
 * and syncs <html lang> for a11y/SEO. Wrap your app with <LanguageProvider>.
 */

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

export const LanguageContext = createContext({ lang: 'it', setLang: () => {} })
export const useLanguage = () => useContext(LanguageContext)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try { return localStorage.getItem('lang') || 'it' } catch { return 'it' }
  })

  useEffect(() => {
    try { localStorage.setItem('lang', lang) } catch {}
    if (typeof document !== 'undefined') document.documentElement.lang = lang
  }, [lang])

  const value = useMemo(() => ({ lang, setLang }), [lang])
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
