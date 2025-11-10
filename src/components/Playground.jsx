import React, { useMemo, useRef } from "react";
import DistortionField from "./DistortionField.jsx";
import Sprite from "./Sprite.jsx";
import TipsPanel from "./TipsPanel.jsx";
import CurvatureExp from "./experiences/CurvatureExp.jsx";
import ElasticExp from "./experiences/ElasticExp.jsx";
import LabExp from "./experiences/LabExp.jsx";
import SurfExp from "./experiences/SurfExp.jsx";
import useStageSize from "../hooks/useStageSize";
import useDragSprite from "../hooks/useDragSprite";
import useTicker from "../hooks/useTicker";
import usePointerPosition from "../hooks/usePointerPosition";
import useResponsiveSpriteSize from "../hooks/useResponsiveSpriteSize";
import { usePopups } from "../content/popups.jsx";
//import { TIPS } from "../content/tips.jsx";
import TopAlert from "./TopAlert.jsx";
import { useLanguage } from "./LanguageContext";

const BASE_MASS = 0.68;
const SINGULARITY_MASS = 0.98;

const LANE_H = 110;
// Meta di posizionamento della nuvoletta per tutte le esperienze
const POPUP_META = {
  tl: { side: "right", offsetX: 56, offsetY: 50, width: 300 },
  tr: { side: "right", offsetX: 56, offsetY: 50, width: 300 },
  bl: { side: "right", offsetX: 56, offsetY: 50, width: 300 }, 
  br: { side: "right", offsetX: 56, offsetY: 50, width: 300 },
  _default: { side: "right", offsetX: 96, offsetY: 110, width: 340 },
};

export default function Playground({ mode, highContrast }) {

  const { lang } = useLanguage();
  const STR = {
    it: {
      badge: "Start",
      hello: "Ciao! Sono il Dottor Tensor.",
      choose: "Scegliete un’avventura",
      tail: "e accompagnatemi nell’Area Giochi!",
    },
    en: {
      badge: "Start",
      hello: "Hi! I'm Doctor Tensor.",
      choose: "Choose an adventure",
      tail: "and join me in the Playground!",
    },
    sc: {
      badge: "Start",
      hello: "Saludi! Mi nant Tensor, su Dotori",
      choose: "Scioberai-ddoi un’aventura",
      tail: "e benei cun mei in s’area de is giogus.",
    },
  };
  const s = STR[lang] || STR.it;

  const POPUPS = usePopups();
  const [extraTL, setExtraTL] = React.useState(0);
  const [gameOver, setGameOver] = React.useState(false);
  const [showTips, setShowTips] = React.useState(true);

  // ⬇️ Onda gravitazionale globale (usata da griglia + sprite)
  const [gw, setGw] = React.useState({ amp: 0, phase: 0 });

  const stageRef = useRef(null);
  const size = useStageSize(stageRef);
  const spriteBase = useResponsiveSpriteSize(size);
  const { pos, onPointerDown, dragging, setPos } = useDragSprite(
    stageRef,
    size,
    spriteBase
  );
  const cursor = usePointerPosition(stageRef);
  const t = useTicker(0.02);

  const surfYOffset = useMemo(() => {
    const amp = mode === "br" ? 10 : 0;
    return amp ? Math.sin(performance.now() / 220) * amp : 0;
  }, [mode, t]);

  // Curvatura (TL) → singolarità
  const effMassTL = useMemo(
    () => BASE_MASS + extraTL * (1 - BASE_MASS),
    [extraTL]
  );
  React.useEffect(() => {
    if (mode === "tl" && effMassTL >= SINGULARITY_MASS) setGameOver(true);
  }, [mode, effMassTL]);

  // Se cambi esperienza e non sei in Elastico, spegni gradualmente la GW
  React.useEffect(() => {
    if (mode !== "tr") setGw((g) => ({ ...g, amp: 0 }));
  }, [mode]);

  const handleRestart = () => {
    setGameOver(false);
    setExtraTL(0);
    setPos({ x: Math.max(80, size.w * 0.2), y: 70 });
  };

  const popup = POPUPS[mode];
  const spriteSize = Math.round(
    spriteBase * (1 - 0.4 * (mode === "tl" ? extraTL : 0))
  );
  const inCanvas =
    pos.x >= 0 && pos.y >= LANE_H && pos.x <= size.w && pos.y <= size.h;

  const showPopup = Boolean(
    !dragging && !gameOver && inCanvas && mode && popup
  );

  // Posizionamento nuvoletta coerente per TUTTE le esperienze
  const meta = POPUP_META[mode] ?? POPUP_META._default;
  const rawX =
    meta.side === "left" ? pos.x - meta.offsetX : pos.x + meta.offsetX;
  const rawY = pos.y - meta.offsetY;
  const bubbleLeft = Math.min(size.w - meta.width, Math.max(0, rawX));
  const bubbleTop = Math.max(0, rawY); // opzionale: clamp verticale

  return (
    <div className={`stage`} ref={stageRef}>
      <div className="stage-inner">
        <div className="intro-lane">
          <span className="badge">{s.badge}</span>
          <div className="intro-card">
            <div>
              <b>{s.hello}</b> <i>{s.choose}</i>{" "}
              {s.tail}
            </div>
          </div>
        </div>

        <DistortionField
          width={size.w}
          height={size.h}
          x={pos.x}
          y={pos.y}
          laneH={LANE_H}
          dragging={dragging}
          spacing={Math.round(28 - 10 * (mode === "tl" ? extraTL : 0))}
          mass={mode === "tl" ? effMassTL : BASE_MASS}
          singularity={gameOver}
          /* ⬇️ Onda globale applicata alla griglia */
          gwAmp={gw.amp}
          gwPhase={gw.phase}
        />

        {mode === "tl" && (
          <CurvatureExp
            w={size.w}
            h={size.h}
            value={extraTL}
            onChange={setExtraTL}
          />
        )}

        {mode === "tr" && (
          <ElasticExp
            w={size.w}
            h={size.h}
            laneH={LANE_H}
            /* ⬇️ L’esperienza Elastico emette l’onda globale (amp, phase) */
            onWave={(vals) => setGw(vals)}
          />
        )}

        {mode === "bl" && <LabExp w={size.w} h={size.h} />}
        {mode === "br" && <SurfExp w={size.w} h={size.h} />}

        <Sprite
          x={pos.x}
          y={pos.y}
          mode={mode}
          onPointerDown={gameOver ? undefined : onPointerDown}
          stretch={t}
          surfYOffset={surfYOffset}
          cursor={cursor}
          size={spriteSize}
          collapse={
            gameOver
              ? 1
              : mode === "tl"
              ? Math.max(0, (effMassTL - 0.93) / 0.07)
              : 0
          }
          /* ⬇️ Onda globale applicata anche allo sprite */
          gwAmp={gw.amp}
          gwPhase={gw.phase}
        />

        <div className="footer-hint">
          
        </div>

        {showPopup && (
          <div
            className="speech"
  style={{
      left: bubbleLeft,
      top: bubbleTop,
      width: (POPUP_META[mode]?.width ?? POPUP_META._default.width),
      transform: (POPUP_META[mode]?.side ?? 'right') === 'left'
        ? 'translate(-100%, 0)'
        : 'translate(0, 0)'
    }}



            role="dialog"
            aria-live="polite"
          >
             {popup?.title && <h4>{popup.title}</h4>}
              <div>{popup?.text}</div>
          </div>
        )}
      </div>

      {gameOver && <TopAlert onRestart={handleRestart} />}

      {showTips && (
   <TipsPanel onClose={() => setShowTips(false)} />
 )}
    </div>
  );
}
