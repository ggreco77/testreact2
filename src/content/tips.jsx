// src/content/tips.jsx
import React from "react";
import { useLanguage } from "../components/LanguageContext"; // ← aggiorna il path se serve

// -------- Italiano --------
export const TIPS_IT = {
  tl: [
    "Un’attività da svolgere in classe per approfondire, attraverso semplici animazioni grafiche, la relatività generale, le onde gravitazionali e gli strumenti di ultima generazione.",
    "Trascina con il mouse il Doctor Tensor nel reticolo spaziotemporale. Una vignetta illustrerà il contenuto della sezione e l’azione da intraprendere."
  ],
  tr: [
    "Un’attività da svolgere in classe per approfondire, attraverso semplici animazioni grafiche, la relatività generale, le onde gravitazionali e gli strumenti di ultima generazione.",
    "Trascina con il mouse il Doctor Tensor nel reticolo spaziotemporale. Una vignetta illustrerà il contenuto della sezione e l’azione da intraprendere."
  ],
  bl: [
    "Un’attività da svolgere in classe per approfondire, attraverso semplici animazioni grafiche, la relatività generale, le onde gravitazionali e gli strumenti di ultima generazione.",
    "Trascina con il mouse il Doctor Tensor nel reticolo spaziotemporale. Una vignetta illustrerà il contenuto della sezione e l’azione da intraprendere."
  ],
  br: [
    "Un’attività da svolgere in classe per approfondire, attraverso semplici animazioni grafiche, la relatività generale, le onde gravitazionali e gli strumenti di ultima generazione.",
    "Trascina con il mouse il Doctor Tensor nel reticolo spaziotemporale. Una vignetta illustrerà il contenuto della sezione e l’azione da intraprendere."
  ]
};

// -------- English --------
export const TIPS_EN = {
  tl: [
    "A classroom activity: use simple graphic animations to explore general relativity, gravitational waves, and state-of-the-art instruments.",
    "Drag Doctor Tensor across the spacetime grid. A speech bubble will explain the section and what to do."
  ],
  tr: [
    "A classroom activity: use simple graphic animations to explore general relativity, gravitational waves, and state-of-the-art instruments.",
    "Drag Doctor Tensor across the spacetime grid. A speech bubble will explain the section and what to do."
  ],
  bl: [
    "A classroom activity: use simple graphic animations to explore general relativity, gravitational waves, and state-of-the-art instruments.",
    "Drag Doctor Tensor across the spacetime grid. A speech bubble will explain the section and what to do."
  ],
  br: [
    "A classroom activity: use simple graphic animations to explore general relativity, gravitational waves, and state-of-the-art instruments.",
    "Drag Doctor Tensor across the spacetime grid. A speech bubble will explain the section and what to do."
  ]
};

// -------- Sardo (bozza) --------
export const TIPS_SC = {
  tl: [
    "Un’atividadi de fai in classi po imparai, cun animatzionis graficas simplis, sa relatividadi generali, is undas gravitatzionalis e is ainas de urtima generatzioni.",
    "Trìsia Tensor su Dotori cun su mouse aintru de su tessìngiu de s’ispàtziu-tempus. Una pintadura t’at a ammostai su chi est cuntènniu is sa setzioni e su chi depis fai."
  ],
  tr: [
      "Un’atividadi de fai in classi po imparai, cun animatzionis graficas simplis, sa relatividadi generali, is undas gravitatzionalis e is ainas de urtima generatzioni.",
    "Trìsia Tensor su Dotori cun su mouse aintru de su tessìngiu de s’ispàtziu-tempus. Una pintadura t’at a ammostai su chi est cuntènniu is sa setzioni e su chi depis fai."
  ],
  bl: [
      "Un’atividadi de fai in classi po imparai, cun animatzionis graficas simplis, sa relatividadi generali, is undas gravitatzionalis e is ainas de urtima generatzioni.",
    "Trìsia Tensor su Dotori cun su mouse aintru de su tessìngiu de s’ispàtziu-tempus. Una pintadura t’at a ammostai su chi est cuntènniu is sa setzioni e su chi depis fai."
  ],
  br: [
       "Un’atividadi de fai in classi po imparai, cun animatzionis graficas simplis, sa relatividadi generali, is undas gravitatzionalis e is ainas de urtima generatzioni.",
    "Trìsia Tensor su Dotori cun su mouse aintru de su tessìngiu de s’ispàtziu-tempus. Una pintadura t’at a ammostai su chi est cuntènniu is sa setzioni e su chi depis fai."
  ]
};

// Dizionario per lingua
export const TIPS_BY_LANG = { it: TIPS_IT, en: TIPS_EN, sc: TIPS_SC };

// Titolo del pannello suggerimenti per lingua
export const TIPS_TITLE = {
  it: "Suggerimenti e Modalità d'uso",
  en: "Tips & How it works",
  sc: "Consillus e Modalidadis de impreu"
};

/** Hook: restituisce i tips nella lingua corrente */
export function useTips() {
  const { lang } = useLanguage();
  return TIPS_BY_LANG[lang] || TIPS_IT;
}

/** Hook: titolo localizzato del pannello */
export function useTipsTitle() {
  const { lang } = useLanguage();
  return TIPS_TITLE[lang] || TIPS_TITLE.it;
}

/** Retro-compatibilità: vecchio export (italiano di default) */
export const TIPS = TIPS_IT;
