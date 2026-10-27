import * as React from "react";

function storageKey(projectId: string) {
  return `seowatcher:search-todo-done:${projectId}`;
}

/**
 * A done mark lasts one 28-day window. The to-do ids are stable ("striking:
 * <query>"), so a mark kept forever would hide the same query when it slips
 * back a quarter later, after the work stopped paying.
 */
const DONE_TTL_MS = 28 * 86_400_000;

/**
 * The marks still in force: `{ id: markedAt }`. Anything else -- the old
 * array of ids or `true` values, which carry no date -- counts as expired,
 * so an old mark resurfaces its to-do rather than hiding it for good.
 */
function readMarks(raw: string | null, now: number): Map<string, number> {
  const parsed: unknown = raw ? JSON.parse(raw) : null;
  const marks = new Map<string, number>();
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    return marks;
  }
  for (const [id, markedAt] of Object.entries(parsed)) {
    if (typeof markedAt === "number" && now - markedAt < DONE_TTL_MS) {
      marks.set(id, markedAt);
    }
  }
  return marks;
}

/**
 * Done marks live in this browser only: a per-viewer convenience, not a
 * record. Storage can be missing (private window), so every access is
 * guarded and the list still works without it. Held by the page, so the
 * to-do tab and the "first three" strip above the tabs agree.
 */
export function useDoneTodos(projectId: string) {
  const [marks, setMarks] = React.useState<ReadonlyMap<string, number>>(
    new Map(),
  );
  React.useEffect(() => {
    try {
      setMarks(
        readMarks(
          window.localStorage.getItem(storageKey(projectId)),
          Date.now(),
        ),
      );
    } catch {
      setMarks(new Map());
    }
  }, [projectId]);
  const toggle = React.useCallback(
    (id: string) =>
      setMarks((current) => {
        const next = new Map(current);
        if (next.has(id)) next.delete(id);
        else next.set(id, Date.now());
        try {
          window.localStorage.setItem(
            storageKey(projectId),
            JSON.stringify(Object.fromEntries(next)),
          );
        } catch {
          // Not stored; the mark still holds for this visit.
        }
        return next;
      }),
    [projectId],
  );
  const done = React.useMemo<ReadonlySet<string>>(
    () => new Set(marks.keys()),
    [marks],
  );
  return { done, toggle };
}

export type DoneTodos = ReturnType<typeof useDoneTodos>;
