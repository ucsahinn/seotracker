import { useEffect, useState } from "react";

/** How long a finished run's card stays, full, before the results replace it. */
const COMPLETION_HOLD_MS = 1200;

/**
 * True for a beat after a watched audit flips from running to completed.
 *
 * Swapping the progress card for the results in the same frame threw away
 * the one thing the reader waited minutes for -- that it ended, and with
 * what -- so the card holds, full, before the results take its place. Only a
 * run seen running gets it: opening a finished audit goes straight to the
 * results. The hold is a pause, not motion, so it applies under reduced
 * motion too; it used to be skipped there, and a "Denetim bitti" banner
 * above the results stood in for it on every visit, long after the moment.
 */
export function useCompletionHold(status: string | undefined) {
  const [seen, setSeen] = useState(status);
  const [holding, setHolding] = useState(false);
  const [justCompleted, setJustCompleted] = useState(false);
  if (seen !== status) {
    setSeen(status);
    if (seen === "running" && status === "completed") {
      setHolding(true);
      setJustCompleted(true);
    }
  }
  useEffect(() => {
    if (!holding) return;
    const timer = setTimeout(() => setHolding(false), COMPLETION_HOLD_MS);
    return () => clearTimeout(timer);
  }, [holding]);
  const finished = status === "completed";
  return {
    /** Completed, whether or not the card is still holding. */
    finished,
    holding,
    /** This screen watched the run finish: the results may mark the moment. */
    justCompleted,
    // While the card holds, the screen still reads as running; the results
    // are fetched underneath it.
    isComplete: finished && !holding,
    isRunning: holding || status === "running",
    isFailed: status === "failed",
  };
}
