import { useEffect, useState } from "react";
import { AnimatedNumber } from "@/client/components/AnimatedNumber";
import { useReducedMotion } from "@/client/lib/useReducedMotion";
import { t } from "@/shared/i18n";
import {
  standingFill,
  standingInk,
  standingWord,
  type ScoredStanding,
} from "./scoreWords";

/*
 * A 240-degree dial, open at the bottom. The arc is drawn with
 * pathLength=100 so the score is the dash length directly. The ticks mark
 * where the score changes meaning (50, 70, 90; see `auditScoreTier`), so the
 * needle's distance to the next word is visible, not only the number.
 */
const CX = 100;
const CY = 100;
const R = 80;
const START_DEG = 150;
const SWEEP_DEG = 240;
const TICKS = [50, 70, 90];

function point(deg: number, radius: number) {
  const rad = (deg * Math.PI) / 180;
  return {
    x: CX + radius * Math.cos(rad),
    y: CY + radius * Math.sin(rad),
  };
}

const ARC = (() => {
  const from = point(START_DEG, R);
  const to = point(START_DEG + SWEEP_DEG, R);
  return `M ${from.x} ${from.y} A ${R} ${R} 0 1 1 ${to.x} ${to.y}`;
})();

/**
 * `animate` is for the one moment worth moving: an audit the reader watched
 * finish. Opening a finished audit, or coming back to it, shows the number
 * where it is -- a dial that sweeps up on every visit is decoration.
 */
export function ScoreGauge({
  standing,
  animate = false,
}: {
  /** The word and colour follow the standing, not the raw number. */
  standing: ScoredStanding;
  animate?: boolean;
}) {
  const { score } = standing;
  const reduced = useReducedMotion();
  const still = reduced || !animate;
  const [arrived, setArrived] = useState(false);
  useEffect(() => {
    const frame = requestAnimationFrame(() => setArrived(true));
    return () => cancelAnimationFrame(frame);
  }, []);
  const shown = arrived || still ? score : 0;

  return (
    <div
      className="relative mx-auto aspect-[200/160] w-full max-w-[15rem]"
      role="img"
      aria-label={t("Site puanı {score}/100, {word}", {
        score,
        word: standingWord(standing),
      })}
    >
      <svg viewBox="0 0 200 160" className="size-full" aria-hidden>
        <path
          d={ARC}
          fill="none"
          strokeWidth="12"
          strokeLinecap="round"
          className="stroke-base-200"
          pathLength={100}
        />
        <path
          d={ARC}
          fill="none"
          strokeWidth="12"
          strokeLinecap="round"
          stroke={standingFill(standing)}
          pathLength={100}
          strokeDasharray="100 100"
          strokeDashoffset={100 - shown}
          /*
           * Draws itself once on arrival. A transition rather than a
           * keyframe, so a new score glides from the old one.
           */
          style={{
            transition: still
              ? "none"
              : "stroke-dashoffset 1100ms cubic-bezier(0.32, 0.72, 0, 1)",
          }}
        />
        {TICKS.map((tick) => {
          const deg = START_DEG + (SWEEP_DEG * tick) / 100;
          const inner = point(deg, R - 11);
          const outer = point(deg, R - 17);
          return (
            <line
              key={tick}
              x1={inner.x}
              y1={inner.y}
              x2={outer.x}
              y2={outer.y}
              strokeWidth="1.5"
              strokeLinecap="round"
              className="stroke-base-content/25"
            />
          );
        })}
      </svg>
      <div className="absolute inset-x-0 top-[31%] flex flex-col items-center">
        <span className="text-6xl font-semibold leading-none tracking-tight tabular-nums">
          {still ? score : <AnimatedNumber value={score} durationMs={1100} />}
        </span>
        <span className="mt-1 text-xs text-subtle">/ 100</span>
        <span
          className="mt-2 text-sm font-medium"
          style={{ color: standingInk(standing) }}
        >
          {standingWord(standing)}
        </span>
      </div>
    </div>
  );
}
