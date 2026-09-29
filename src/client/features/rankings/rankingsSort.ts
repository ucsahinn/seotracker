/**
 * Sorting for the rankings table, which is a hand-rolled `<table>` rather
 * than an `AppDataTable`.
 *
 * The query cell is a disclosure button and the pagination below it is
 * already wired, so moving the whole thing onto `useAppTable` would be a
 * larger change than the sort is worth. These synthesise the two methods
 * `SortableHeader` actually calls, which means the header keeps its
 * `aria-sort` contract and its 24px target without a second engine.
 *
 * Split out of `RankingsPage` when that file crossed its line ceiling.
 */
import { sort as sort_ } from "remeda";

export type SortKey = "query" | "position" | "impressions" | "clicks" | "days";
type SortState = { key: SortKey; desc: boolean };
type TrackedRow = {
  query: string;
  position: number;
  impressions: number;
  clicks: number;
  days: number;
};

/**
 * The shape `SortableHeader` reads, synthesised from local state.
 *
 * It takes a TanStack column, and the two methods it calls are the whole
 * contract -- so a hand-rolled table can wear the same header without being
 * moved onto `useAppTable`.
 */
export function sortColumn(
  sort: SortState,
  setSort: (next: SortState) => void,
  key: SortKey,
) {
  return {
    getIsSorted: (): false | "asc" | "desc" =>
      sort.key === key ? (sort.desc ? "desc" : "asc") : false,
    getToggleSortingHandler: () => () => {
      /*
       * A first click on a new column sorts it the useful way round: worst
       * rank first for position (ascending is *better* there), biggest first
       * for the counts, alphabetical for the query.
       */
      setSort(
        sort.key === key
          ? { key, desc: !sort.desc }
          : { key, desc: key !== "query" && key !== "position" },
      );
    },
  };
}

export function ariaSort(sort: SortState, key: SortKey) {
  if (sort.key !== key) return undefined;
  return sort.desc ? ("descending" as const) : ("ascending" as const);
}

export function sortRows(rows: TrackedRow[], sort: SortState): TrackedRow[] {
  const direction = sort.desc ? -1 : 1;
  return sort_(rows, (left, right) => {
    if (sort.key === "query") {
      // Turkish collation: "ı" and "i" are different letters, and the
      // default comparison puts them in an order a Turkish reader reads as
      // wrong.
      return direction * left.query.localeCompare(right.query, "tr");
    }
    return direction * (left[sort.key] - right[sort.key]);
  });
}
