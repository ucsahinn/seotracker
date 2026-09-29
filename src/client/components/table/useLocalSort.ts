import * as React from "react";
import { sort as sortWith } from "remeda";

/**
 * Sorting for the hand-rolled tables, which are hand-rolled for good reasons.
 *
 * Three screens needed this within a week — rankings, the GA4 reports, the
 * Lighthouse issue list — and each has a cell that `AppDataTable` cannot
 * express without a fight: a disclosure button in the first column, a column
 * set that changes per report, an expandable detail row. Moving them onto
 * `useAppTable` is a bigger change than the sort is worth, and writing the
 * same twenty lines a third time is how three tables end up disagreeing
 * about what a second click on a header does.
 *
 * What this is *not* is a second table engine. It holds one piece of state
 * and hands `SortableHeader` the two methods it actually calls, so those
 * tables keep the shared header — and with it `aria-sort`, the arrow, and
 * the 24px target — rather than growing their own.
 */
export function useLocalSort<Key extends string>(initial: {
  key: Key;
  desc: boolean;
}) {
  const [sort, setSort] = React.useState(initial);

  /**
   * The shape `SortableHeader` reads. `descendingFirst` decides which way a
   * *new* column opens: biggest-first for a count, smallest-first for a rank
   * or a name, because that is the useful end in each case.
   */
  const column = React.useCallback(
    (key: Key, descendingFirst = true) => ({
      getIsSorted: (): false | "asc" | "desc" =>
        sort.key === key ? (sort.desc ? "desc" : "asc") : false,
      getToggleSortingHandler: () => () => {
        setSort((current) =>
          current.key === key
            ? { key, desc: !current.desc }
            : { key, desc: descendingFirst },
        );
      },
    }),
    [sort],
  );

  /** Goes on the `<th>`, not the button: direction describes the column. */
  const ariaSort = React.useCallback(
    (key: Key): "ascending" | "descending" | undefined => {
      if (sort.key !== key) return undefined;
      return sort.desc ? "descending" : "ascending";
    },
    [sort],
  );

  /**
   * `compare` returns the ascending order; the hook applies the direction.
   * Writing it that way means a caller cannot get the two out of step, which
   * is the bug this kind of code usually has.
   */
  const apply = React.useCallback(
    <Row>(rows: Row[], compare: (a: Row, b: Row, key: Key) => number) => {
      const direction = sort.desc ? -1 : 1;
      return sortWith(rows, (a, b) => direction * compare(a, b, sort.key));
    },
    [sort],
  );

  return { sort, setSort, column, ariaSort, apply };
}

/** Turkish collation: "ı" and "i" are different letters here. */
export function compareText(a: string, b: string): number {
  return a.localeCompare(b, "tr");
}

/** Absent sinks to the bottom whichever way the column is sorted: a null is
 * not "smaller", it is "not measured". */
export function compareNullable(
  a: number | null | undefined,
  b: number | null | undefined,
  direction: number,
): number | null {
  const left = a ?? null;
  const right = b ?? null;
  if (left === null && right === null) return 0;
  if (left === null) return direction;
  if (right === null) return -direction;
  return null;
}
