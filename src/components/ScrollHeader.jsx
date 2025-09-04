import React, { useEffect, useRef, useState } from "react";
import "./ScrollHeader.css";

export default function ScrollHeader() {
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

    // Aggiorna su resize / font load / layout changes
    const ro = new ResizeObserver(setOffset);
    if (wrapRef.current) ro.observe(wrapRef.current);

    window.addEventListener("resize", setOffset);
    window.addEventListener("orientationchange", setOffset);

    // Font caricate in ritardo
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

    const DOWN_HIDE_AFTER = 32; // px di scroll accumulati verso il basso
    const UP_SHOW_AFTER = 24;   // px di scroll accumulati verso l'alto
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
          // in cima: mostra e resetta accumulatori
          accDown.current = 0;
          accUp.current = 0;
          setHidden(false);
        } else if (dy > 0) {
          // scendo
          accDown.current += dy;
          accUp.current = 0;
          if (accDown.current > DOWN_HIDE_AFTER) {
            setHidden(true);
          }
        } else {
          // salgo
          accUp.current += -dy;
          accDown.current = 0;
          if (accUp.current > UP_SHOW_AFTER) {
            setHidden(false);
          }
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
        {/* tuo markup invariato */}
        <header className="header">
          <div className="header">
            <h1>Doctor Tensor — Il Parco Giochi dello Spazio-Tempo</h1>
            <p>
              Accompagna il Doctor Tensor nelle quattro avventure per scoprire i
              misteri dello spazio-tempo, dei buchi neri e delle onde
              gravitazionali!
            </p>
          </div>
        </header>
      </div>

      {/* Offset dinamico: usa l'altezza misurata dell'header */}
      <div className="dt-scroll-header-offset" aria-hidden />
    </>
  );
}

