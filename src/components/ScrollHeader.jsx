// src/components/ScrollHeader.jsx
import React, { useEffect, useRef, useState } from "react";
import "./ScrollHeader.css";
import { useLanguage } from "./LanguageContext"; // ← aggiorna il percorso se serve

// Dizionario titoli/sottotitoli per lingua (nessuna libreria esterna)
const HDR = {
  it: {
    title: "Doctor Tensor — Il Parco Giochi dello Spazio-Tempo",
    subtitle:
      "Accompagna il Doctor Tensor nelle quattro avventure per scoprire i misteri dello spazio-tempo, dei buchi neri e delle onde gravitazionali!",
  },
  en: {
    title: "Doctor Tensor — The Spacetime Playground",
    subtitle:
      "Join Doctor Tensor in four adventures to explore the mysteries of spacetime, black holes, and gravitational waves!",
  },
  sc: {
    title: "Tensor su Dotori - Su parcu po si spassiai cun su ispàtziu-tempus",
    subtitle:
      "Bai paris cun Tensor su Dotori po provai cuatru isperièntzias istraordinàrias po iscoberri is àrcanas de su ispàtziu-tempus, de is istampus nieddus e de is undas gravitatzionalis",
  },
  de: {
  title: "Doktor Tensor – Der Spielplatz der Raumzeit",
  subtitle:
    "Begleite Doktor Tensor auf vier Abenteuern und erforsche die Geheimnisse der Raumzeit, der Schwarzen Löcher und der Gravitationswellen!",
},
es: {
  title: "Doctor Tensor — Zona de juegos del espacio-tiempo",
  subtitle:
    "¡Únete a Doctor Tensor en cuatro aventuras para explorar los misterios del espacio-tiempo, los agujeros negros y las ondas gravitacionales!",
},

};

export default function ScrollHeader() {
  const { lang } = useLanguage();
  const s = HDR[lang] || HDR.it;

  const [hidden, setHidden] = useState(false);
  const [atTop, setAtTop] = useState(true);

  const wrapRef = useRef(null);
  const lastY = useRef(0);
  const accDown = useRef(0);
  const accUp = useRef(0);
  const ticking = useRef(false);
  const reduceMotion = useRef(
    typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  // Misura l'altezza reale dell'header e aggiorna la CSS var --dt-offset-actual
  useEffect(() => {
    const setOffset = () => {
      if (!wrapRef.current) return;
      const h = wrapRef.current.getBoundingClientRect().height;
      document.documentElement.style.setProperty("--dt-offset-actual", `${h}px`);
    };

    setOffset();

    const ro = new ResizeObserver(setOffset);
    if (wrapRef.current) ro.observe(wrapRef.current);

    window.addEventListener("resize", setOffset);
    window.addEventListener("orientationchange", setOffset);

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(setOffset).catch(() => {});
    }

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", setOffset);
      window.removeEventListener("orientationchange", setOffset);
    };
  }, []);

  // Scroll handler fluido (rAF + soglie di accumulo)
  useEffect(() => {
    if (reduceMotion.current) return; // niente hide-on-scroll se RM

    const DOWN_HIDE_AFTER = 32; // px accumulati verso il basso
    const UP_SHOW_AFTER = 24;   // px accumulati verso l'alto
    const TOP_STICKY = 64;      // sempre visibile vicino alla cima

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      requestAnimationFrame(() => {
        const y = window.scrollY || document.documentElement.scrollTop || 0;
        setAtTop(y < 8);

        const dy = y - lastY.current;
        if (Math.abs(dy) < 1) {
          ticking.current = false;
          return;
        }

        if (y < TOP_STICKY) {
          accDown.current = 0;
          accUp.current = 0;
          setHidden(false);
        } else if (dy > 0) {
          accDown.current += dy;
          accUp.current = 0;
          if (accDown.current > DOWN_HIDE_AFTER) setHidden(true);
        } else {
          accUp.current += -dy;
          accDown.current = 0;
          if (accUp.current > UP_SHOW_AFTER) setHidden(false);
        }

        lastY.current = y;
        ticking.current = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div
        ref={wrapRef}
        className={[
          "dt-scroll-header",
          hidden ? "is-hidden" : "",
          !atTop ? "is-elevated" : "",
          reduceMotion.current ? "no-motion" : "",
        ].join(" ")}
      >
        <header className="header">
          <div className="header">
            <h1>{s.title}</h1>
            <p>{s.subtitle}</p>
          </div>
        </header>
      </div>

      {/* Offset dinamico: usa l'altezza misurata dell'header */}
      <div className="dt-scroll-header-offset" aria-hidden />
    </>
  );
}
