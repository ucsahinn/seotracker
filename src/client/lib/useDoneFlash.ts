import { useEffect, useState } from "react";

type DoneFlash = "idle" | "pending" | "done";

/** How long a finished download says so before the button returns to rest. */
export const DONE_FLASH_MS = 2000;

/**
 * The state of a one-shot button: at rest, working, or just finished.
 *
 * A download button that goes straight from a spinner back to its resting
 * label leaves the reader wondering whether anything happened, and one that
 * stays on "done" forever is wrong the second time it is pressed. "done"
 * lasts two seconds after `isPending` falls, and only when `succeeded` says
 * the work actually landed; a failure goes straight back to rest and lets its
 * toast speak.
 */
export function useDoneFlash(isPending: boolean, succeeded = true): DoneFlash {
  const [wasPending, setWasPending] = useState(isPending);
  const [done, setDone] = useState(false);

  // Derived from the previous render rather than an effect, so the frame in
  // which the work ends already shows the check instead of the resting label.
  if (wasPending !== isPending) {
    setWasPending(isPending);
    setDone(!isPending && succeeded);
  }

  useEffect(() => {
    if (!done) return;
    const timer = setTimeout(() => setDone(false), DONE_FLASH_MS);
    return () => clearTimeout(timer);
  }, [done]);

  return isPending ? "pending" : done ? "done" : "idle";
}
