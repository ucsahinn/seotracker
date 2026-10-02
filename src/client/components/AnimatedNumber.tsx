import * as React from "react";
import { useReducedMotion } from "@/client/lib/useReducedMotion";
import { formatCount } from "@/shared/format";

/**
 * A number that counts up on first appearance and tweens on change.
 *
 * Props
 *   value       the number to show (the truth; also what screen readers read)
 *   format      tr-TR formatter, default `formatCount`; pass `formatDecimal`
 *               wrappers, `formatPercent`, etc. from "@/shared/format"
 *   durationMs  default 700
 * Reduced motion: renders the final value at once. Tabular figures, so the
 * width does not jitter. Combine with `useFlashOnChange` by keying the wrapper
 * on `flash.key` as MetricTile does.
 *
 * Example
 *   <AnimatedNumber value={clicks} format={formatCount} />
 */
export function AnimatedNumber({
  value,
  format = formatCount,
  durationMs = 700,
}: {
  value: number;
  format?: (n: number) => string;
  durationMs?: number;
}) {
  const reduced = useReducedMotion();
  const [shown, setShown] = React.useState(0);
  const shownRef = React.useRef(0);

  React.useEffect(() => {
    if (reduced || !Number.isFinite(value)) {
      shownRef.current = value;
      setShown(value);
      return;
    }
    const from = shownRef.current;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - t, 3);
      const next = t >= 1 ? value : from + (value - from) * eased;
      shownRef.current = next;
      setShown(next);
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value, reduced, durationMs]);

  return (
    <>
      <span className="sr-only">{format(value)}</span>
      <span aria-hidden className="tabular-nums">
        {format(reduced ? value : shown)}
      </span>
    </>
  );
}
