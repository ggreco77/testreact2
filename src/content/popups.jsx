import React from "react"
import { useLanguage } from "../components/LanguageContext" 

// Stili riusabili
const common = {
  block: {
    fontFamily: '"Fredoka","Baloo 2","Comic Sans MS", system-ui, sans-serif',
    fontSize: "clamp(1rem, 1.5vw, 1.2rem)",
    lineHeight: 1.05,
    fontWeight: 800,
    letterSpacing: "0.5px",
  },
  blue:  { color: "#38bdf8", display: "inline-block", transform: "rotate(-1deg)",  textShadow: "0 2px 0 rgba(0,0,0,0.12)" },
  orange:{ color: "#f97316", display: "inline-block", transform: "rotate(-1deg)",  textShadow: "0 2px 0 rgba(0,0,0,0.12)" },
  red:   { color: "#f91630", display: "inline-block", transform: "rotate(0.5deg)", textShadow: "0 2px 0 rgba(0,0,0,0.12)" },
}

/* =========================
   ITALIANO
   ========================= */
export const POPUPS_IT = {
  tl: {
    text: (
      <div>
        <strong>Lo spazio-tempo</strong> è come un <strong>tappeto elastico</strong>: la mia <strong>massa</strong> lo piega.{" "}
        <div style={common.block}>
          <strong style={common.blue}>Accompagnami</strong>{" "}
          e <strong style={common.blue}>guarda come si piega!!!</strong>
        </div>
        <br />
        <div style={common.block}>
          Poi,{" "}
          <strong style={common.orange}>muovi la barra</strong>{" "}
          per <strong style={{ color: "#f97316" }}>stringermi</strong> sempre di più{" "}
          <strong style={common.red}>e osserva cosa succede!</strong>
        </div>
      </div>
    ),
  },
  tr: {
    text: (
      <div>
        <div>
          <strong>Cosa succede</strong> quando passa un’<strong>onda gravitazionale</strong>, magari generata da
          <strong> due buchi neri</strong> che danzano?
        </div>
        <div style={common.block}>
          <strong style={common.orange}>Attiva il pulsante</strong>{" "}
          e <strong style={common.red}>osserva cosa accade!</strong>
        </div>
      </div>
    ),
  },
  bl: {
    text: (
      <div>
        <div>
          Il <strong>14 settembre 2015</strong> abbiamo “ascoltato” la prima{" "}
          <strong>onda gravitazionale</strong>: due <strong>buchi neri</strong> si sono
          fusi in solo buco nero da <strong>62 masse solari</strong>.
        </div>
        <div style={common.block}>
          <strong style={common.orange}>Scopri</strong>{" "}
          la <strong>massa</strong> dei due buchi neri iniziali <strong>...</strong>{" "}
          <strong style={common.red}>usando le forbici qui in basso ...</strong>
        </div>
      </div>
    ),
  },
  br: {
    text: (
      <div>
        <div>
          <strong>Einstein Telescope</strong> sarà un telescopio speciale che
          “ascolta” le <strong>increspature dello spazio-tempo</strong> ai
          confini dell’<strong>Universo</strong>.
        </div>
        <div style={common.block}>
          <strong style={common.orange}>Scopri</strong>{" "}
          i suoi <strong>trucchi super tecnologici</strong>!{" "}
          <strong style={common.red}>Premi il pulsante!</strong>
        </div>
      </div>
    ),
  },
}

/* =========================
   ENGLISH
   ========================= */
export const POPUPS_EN = {
  tl: {
    text: (
      <div>
        <strong>Spacetime</strong> is like a <strong>trampoline</strong>: my <strong>mass</strong> bends it.{" "}
        <div style={common.block}>
          <strong style={common.blue}>Follow me</strong>{" "}
          and <strong style={common.blue}>see how it curves!!!</strong>
        </div>
        <br />
        <div style={common.block}>
          Then,{" "}
          <strong style={common.orange}>move the slider</strong>{" "}
          to <strong style={{ color: "#f97316" }}>squeeze me</strong> more and more{" "}
          <strong style={common.red}>and watch what happens!</strong>
        </div>
      </div>
    ),
  },
  tr: {
    text: (
      <div>
        <div>
          <strong>What happens</strong> when a <strong>gravitational wave</strong> passes by, maybe from
          <strong> two black holes</strong> dancing?
        </div>
        <div style={common.block}>
          <strong style={common.orange}>Press the button</strong>{" "}
          and <strong style={common.red}>watch it unfold!</strong>
        </div>
      </div>
    ),
  },
  bl: {
    text: (
      <div>
        <div>
          On <strong>September 14, 2015</strong> we “heard” the first{" "}
          <strong>gravitational wave</strong>: two <strong>black holes</strong>
          merged into one of <strong>62 solar masses</strong>.
        </div>
        <div style={common.block}>
          <strong style={common.orange}>Reveal</strong>{" "}
          the <strong>initial masses</strong> of the two black holes <strong>...</strong>{" "}
          <strong style={common.red}>using the scissors below ...</strong>
        </div>
      </div>
    ),
  },
  br: {
    text: (
      <div>
        <div>
          <strong>Einstein Telescope</strong> will be a special observatory that
          “listens” to <strong>ripples in spacetime</strong> at the edge of the <strong>Universe</strong>.
        </div>
        <div style={common.block}>
          <strong style={common.orange}>Discover</strong>{" "}
          its <strong>hi-tech tricks</strong>!{" "}
          <strong style={common.red}>Hit the button!</strong>
        </div>
      </div>
    ),
  },
}

/* =========================
   SARDO (bozza)
   ========================= */
export const POPUPS_SC = {
  tl: {
    text: (
      <div>
        <strong>S’ispàtziu-tempus</strong> est cumenti a unu <strong>tapetu, unu tessìngiu elàsticu</strong>:
        sa <strong>massa</strong> cosa mia ddu incurbat.{" "}
        <div style={common.block}>
          <strong style={common.blue}>Beni cun mei</strong>{" "}
          e <strong style={common.blue}>po castiai cumenti s’incurbat!!!</strong>
        </div>
        <br />
        <div style={common.block}>
          Apustis,{" "}
          <strong style={common.orange}>movi sa barra</strong>{" "}
          <strong style={{ color: "#f97316" }}>strintzier-mi</strong> a pagu a pagu{" "}
          <strong style={common.red}>e castia ita acadessit!</strong>
        </div>
      </div>
    ),
  },
  tr: {
    text: (
      <div>
        <div>
          <strong>Ita capitat</strong> candu passat un’<strong>unda gravitatzionali</strong>,
          criada, fortzis, de <strong>duus istampus nieddus</strong> totus badda-badda?
        </div>
        <div style={common.block}>
          <strong style={common.orange}>Attiva su buttone</strong>{" "}
          e <strong style={common.red}>bidea su chi capit!</strong>
        </div>
      </div>
    ),
  },
  bl: {
    text: (
      <div>
        <div>
          Su <strong>14 de Cabudanni de su 2015</strong> eus aciapau sa primu{" "}
          <strong>unda gravitatzionali</strong>: <strong>duus istampus nieddus</strong>
          si fundint in d-unu feti, cun d-una <strong>massa paris a 62 de su Sole</strong>.
        </div>
        <div style={common.block}>
          <strong style={common.orange}>Ammosta</strong>{" "}
          is <strong>massas initzialis</strong> de is duus istampus nieddus <strong>...</strong>{" "}
          <strong style={common.red}> imperendi is ferrus abàsciu ...</strong>
        </div>
      </div>
    ),
  },
  br: {
    text: (
      <div>
        <div>
          <strong>Einstein Telescope</strong> at a essi unu telescòpiu ispetziali
          chi “ascurtat”
 <strong>is istrobus de s’ispàtziu-tempus</strong>
          de is làcanas de s’<strong>Universu</strong>.
        </div>
        <div style={common.block}>
          <strong style={common.orange}>Iscoberri</strong>{" "}
          is  <strong>fainas tecnològicas</strong>!{" "}
          <strong style={common.red}>Craca su butoni!</strong>
        </div>
      </div>
    ),
  },
}

// Dizionario per lingua
export const POPUPS_BY_LANG = { it: POPUPS_IT, en: POPUPS_EN, sc: POPUPS_SC }

/** Hook: restituisce i popups nella lingua corrente (dal LanguageContext) */
export function usePopups() {
  const { lang } = useLanguage()
  return POPUPS_BY_LANG[lang] || POPUPS_IT
}

/** Utility: ottieni i popups per una lingua specifica (fuori da React) */
export function getPopups(lang = "it") {
  return POPUPS_BY_LANG[lang] || POPUPS_IT
}

/** Retro-compatibilità: vecchi import che usavano { POPUPS } leggeranno l'italiano */
export const POPUPS = POPUPS_IT
