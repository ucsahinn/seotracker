import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void): () => void {
  if (typeof window.matchMedia !== "function") return () => {};
  const list = window.matchMedia(QUERY);
  list.addEventListener("change", onChange);
  return () => list.removeEventListener("change", onChange);
}

function getSnapshot(): boolean {
  return (
    typeof window.matchMedia === "function" && window.matchMedia(QUERY).matches
  );
}

/**
 * Whether the reader asked the system for less motion. The server render has
 * no preference to read, so it assumes motion is fine and the client corrects
 * it on hydration. Pass `isAnimationActive={!reduced}` to recharts marks.
 */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
