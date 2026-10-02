import { useEffect, useRef, useState } from "react";

/**
 * A text box whose value lives in the URL.
 *
 * Driving the input from the URL and navigating on every keystroke drops
 * characters when typing fast (each keystroke races the router's re-render)
 * and fills the history with one entry per letter. So the box keeps its own
 * draft, the URL follows `delayMs` after typing stops, and an outside change
 * to the URL (a chip, a cleared filter, a link) replaces the draft.
 */
export function useDebouncedUrlSearch(
  urlValue: string,
  onCommit: (next: string) => void,
  delayMs = 300,
): [string, (next: string) => void] {
  const [draft, setDraft] = useState(urlValue);
  // The last value this hook wrote to, or read from, the URL.
  const committed = useRef(urlValue);
  const onCommitRef = useRef(onCommit);
  useEffect(() => {
    onCommitRef.current = onCommit;
  });

  useEffect(() => {
    if (urlValue === committed.current) return;
    committed.current = urlValue;
    setDraft(urlValue);
  }, [urlValue]);

  useEffect(() => {
    if (draft === committed.current) return;
    const timer = window.setTimeout(() => {
      committed.current = draft;
      onCommitRef.current(draft);
    }, delayMs);
    return () => window.clearTimeout(timer);
  }, [draft, delayMs]);

  return [draft, setDraft];
}
