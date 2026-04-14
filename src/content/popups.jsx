import React from "react"
import { useLanguage } from "../components/LanguageContext" 

// Stili riusabili
const common = {
    block: {
    fontFamily: '"Fredoka","Baloo 2","Comic Sans MS", system-ui, sans-serif',
    fontSize: "clamp(0.9rem, 1.8vw, 1.15rem)",
    lineHeight: 1.3,
    fontWeight: 800,
    letterSpacing: "0.5px",

    /* centra + occupa tutta la riga in ogni layout */
    display: "block",
    textAlign: "center",
    width: "100%",
    maxWidth: "92vw",
    minWidth: 0,
    margin: "0 auto",
    padding: "0.5rem 0.75rem",
    boxSizing: "border-box",

    /* override se il parent è flex/grid/float */
    float: "none",
    clear: "both",
    flex: "1 1 100%",
    flexBasis: "100%",
    alignSelf: "center",
    gridColumn: "1 / -1",
    justifySelf: "center",

    /* wrapping robusto */
    overflowWrap: "break-word",
    wordBreak: "break-word",
    hyphens: "auto",
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
      <div style={common.block}>
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
      <div style={common.block}>
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
      <div style={common.block}>
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
      <div style={common.block}>
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
          po <strong style={common.blue}> castiai cumenti s’incurbat!!!</strong>
        </div>
        <br />
        <div style={common.block}>
          Apustis,{" "}
          <strong style={common.orange}>movi sa barra</strong>{" "}
          po <strong style={{ color: "#f97316" }}> mi stringi</strong> a pagu a pagu{" "}
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
          <strong style={common.orange}>Craca su butoni</strong>{" "}
          e <strong style={common.red}>castia ita acadessit!</strong>
        </div>
      </div>
    ),
  },
  bl: {
    text: (
      <div style={common.block}>
        <div>
          Su <strong>14 de Cabudanni de su 2015</strong> eus aciapau sa primu{" "}
          <strong>unda gravitatzionali</strong>: <strong> duus istampus nieddus </strong>
          si funt fùndius in d-unu feti, cun d-una <strong> paris a 62 bortas sa de su Soli</strong>.
        </div>
        <div style={common.block}>
          <strong style={common.orange}>Iscoberri</strong>{" "}
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
          chi at a “ascurtai” 
 <strong> is istrobus de s’ispàtziu-tempus </strong>
          de is làcanas de s’<strong>Universu</strong>.
        </div>
        <div style={common.block}>
          <strong style={common.orange}>Iscoberri</strong>{" "}
          is  <strong> fainas tecnològicas cosa sua!</strong>{" "}
          <strong style={common.red}>Craca su butoni!</strong>
        </div>
      </div>
    ),
  },
}

/* =========================
   Spagnolo
   ========================= */

export const POPUPS_ES = {
  tl: {
    text: (
      <div style={common.block}>
        <strong>El espacio-tiempo</strong> es como una <strong>cama elástica</strong>: la <strong>masa</strong> lo dobla.{" "}
        <div style={common.block}>
          <strong style={common.blue}>Acompáñame</strong>{" "}
          y <strong style={common.blue}>mira cómo se curva!!!</strong>
        </div>
        <br />
        <div style={common.block}>
          Luego,{" "}
          <strong style={common.orange}>desliza el selector</strong>{" "}
          para <strong style={{ color: "#f97316" }}>comprimirme</strong> cada vez más{" "}
          <strong style={common.red}>¡y observa qué ocurre!</strong>
        </div>
      </div>
    ),
  },
  tr: {
    text: (
      <div style={common.block}>
        <div>
          ¿Qué ocurre cuando pasa una <strong>onda gravitacional</strong>, quizá generada por
          <strong> dos agujeros negros</strong> danzando?
        </div>
        <div style={common.block}>
          <strong style={common.orange}>Pulsa el botón</strong>{" "}
          y <strong style={common.red}>observa lo que sucede!</strong>
        </div>
      </div>
    ),
  },
  bl: {
    text: (
      <div style={common.block}>
        <div>
          El <strong>14 de septiembre de 2015</strong> “escuchamos” la primera{" "}
          <strong>onda gravitacional</strong>: dos <strong>agujeros negros</strong>
          se fusionaron en uno de <strong>62 masas solares</strong>.
        </div>
        <div style={common.block}>
          <strong style={common.orange}>Descubre</strong>{" "}
          las <strong>masas iniciales</strong> de los dos agujeros negros{" "}
          <strong>...</strong>{" "}
          <strong style={common.red}>usando las tijeras abajo ...</strong>
        </div>
      </div>
    ),
  },
  br: {
    text: (
      <div>
        <div>
          <strong>El Telescopio Einstein</strong> será un observatorio especial que
          “escucha” las <strong>ondas del espacio-tiempo</strong> en el borde del <strong>Universo</strong>.
        </div>
        <div style={common.block}>
          <strong style={common.orange}>Descubre</strong>{" "}
          sus <strong>trucos tecnológicos</strong>!{" "}
          <strong style={common.red}>¡Pulsa el botón!</strong>
        </div>
      </div>
    ),
  },
}

export const POPUPS_DE = {
  tl: {
    text: (
      <div style={common.block}>
        <strong>Die Raumzeit</strong> ist wie ein <strong>Trampolin</strong>:{" "}
        <strong>Meine Masse</strong> verformt es.
        <div style={common.block}>
          <strong style={common.blue}>Folge mir</strong>{" "}
          und <strong style={common.blue}>sieh, wie sie sich krümmt!!!</strong>
        </div>
        <br />
        <div style={common.block}>
          Dann, <strong style={common.orange}>bewege den Schieber</strong>,{" "}
          <strong style={{ color: "#f97316" }}>drücke mich</strong> damit mehr und mehr zusammen{" "}
          <strong style={common.red}>und beobachte, was passiert!</strong>
        </div>
      </div>
    ),
  },
  tr: {
    text: (
      <div style={common.block}>
        <div>
          <strong>Was passiert</strong>, wenn eine <strong>Gravitationswelle</strong> vorbeizieht, vielleicht von{" "}
          <strong> zwei tanzenden Schwarzen Löchern</strong>?
        </div>
        <div style={common.block}>
          <strong style={common.orange}>Drücke den Knopf</strong>{" "}
          und <strong style={common.red}>schau zu, wie sich alles entfaltet!</strong>
        </div>
      </div>
    ),
  },
  bl: {
    text: (
      <div style={common.block}>
        <div>
          Am <strong>14. September 2015</strong> haben wir die erste <strong>Gravitationswelle</strong> „gehört“:{" "}
          Zwei <strong>Schwarze Löcher</strong> verschmolzen zu einem einzigen mit <strong>62 Sonnenmassen</strong>.
        </div>
        <div style={common.block}>
          <strong style={common.orange}>Finde</strong>{" "}
          die <strong>Anfangsmassen</strong> der beiden Schwarzen Löcher heraus <strong>...</strong>{" "}
          <strong style={common.red}>benutze dazu die Schere unten ...</strong>
        </div>
      </div>
    ),
  },
  br: {
    text: (
      <div>
        <div>
          <strong>Einstein-Teleskop</strong> wird ein besonderes Observatorium sein, das am Rand des{" "}
          <strong>Universums</strong> den Wellen in der <strong>Raumzeit</strong> „lauscht“.
        </div>
        <div style={common.block}>
          <strong style={common.orange}>Entdecke</strong>{" "}
          seine <strong>Super-Technik-Tricks</strong>!{" "}
          <strong style={common.red}>Drück den Knopf!</strong>
        </div>
      </div>
    ),
  },
};

// Dizionario per lingua
export const POPUPS_BY_LANG = { it: POPUPS_IT, en: POPUPS_EN, de: POPUPS_DE, sc: POPUPS_SC, es: POPUPS_ES  };

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
