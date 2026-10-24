import { useState } from "react";

/**
 * Tells an element to play `.flash` when `value` changes after it mounted.
 *
 * Put `key` on the element: the new key remounts it, which restarts the
 * animation. The first render, and any render where the value is the same,
 * add nothing, so this never plays on paint or on an unrelated re-render.
 * Nor does a value arriving where there was none (`null` to something): that
 * is the first load landing, not a refetch moving a number.
 */
export function useFlashOnChange(value: string | number | null) {
  const [seen, setSeen] = useState(value);
  const [changes, setChanges] = useState(0);
  if (seen !== value) {
    setSeen(value);
    if (seen !== null && value !== null) setChanges(changes + 1);
  }
  return { key: changes, className: changes > 0 ? "flash" : "" };
}
