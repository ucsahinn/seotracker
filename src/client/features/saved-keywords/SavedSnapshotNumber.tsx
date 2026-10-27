import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/client/lib/useReducedMotion";
import { formatCount } from "@/shared/format";
/** Start at the verified value. Only a changed number animates, never a page remount or unchanged refresh. */
export function SavedSnapshotNumber({ value }: { value: number }) {
  const reduced = useReducedMotion();
  const [shown, setShown] = useState(value);
  const last = useRef(value);
  useEffect(() => {
    const from = last.current;
    if (from === value) return;
    if (reduced) {
      last.current = value;
      setShown(value);
      return;
    }
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / 250);
      const next = progress === 1 ? value : from + (value - from) * progress;
      last.current = next;
      setShown(next);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value, reduced]);
  return (
    <>
      <span className="sr-only">{formatCount(value)}</span>
      <span aria-hidden>{formatCount(reduced ? value : shown)}</span>
    </>
  );
}
