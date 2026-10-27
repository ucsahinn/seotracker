import { attachChange } from "./rankingChange";
import { bandOf, countBands, BAND_IDS, type BandId } from "./positionBands";
import { sort } from "remeda";

type ArchiveQuery = {
  query: string;
  position: number;
  impressions: number;
  clicks: number;
  days: number;
  firstDate: string;
  lastDate: string;
};
export type ArchiveMove = "risers" | "fallers" | "top10" | "lost";
export type ArchiveChip = "firstPage" | "highImpressions" | "noClicks";
export type ArchiveSort =
  | "query"
  | "position"
  | "delta"
  | "impressions"
  | "clicks"
  | "days";
export type ArchiveFilters = {
  search?: string;
  band?: BandId;
  move?: ArchiveMove;
  chip?: ArchiveChip;
  sort?: ArchiveSort;
  desc?: boolean;
  offset: number;
  limit: number;
};
type Compared = ArchiveQuery & {
  previousPosition: number | null;
  delta: number | null;
};

function matchesMove(row: Compared, move?: ArchiveMove) {
  if (!move) return true;
  if (move === "top10") return Math.round(row.position) <= 10;
  if (row.delta === null || row.previousPosition === null) return false;
  if (move === "risers") return row.delta >= 0.5;
  if (move === "fallers") return row.delta <= -0.5;
  return (
    Math.round(row.previousPosition) <= 10 && Math.round(row.position) > 10
  );
}

/** Full archived population in, bounded transport out. No top-N cohort approximations. */
export function rankingArchiveView(
  current: ArchiveQuery[],
  previous: ArchiveQuery[],
  filters: ArchiveFilters,
) {
  const rows = attachChange(current, previous);
  const needle = filters.search?.trim().toLocaleLowerCase("tr") ?? "";
  const searched = rows.filter((row) =>
    row.query.toLocaleLowerCase("tr").includes(needle),
  );
  const inBand = searched.filter(
    (row) => !filters.band || bandOf(row.position) === filters.band,
  );
  const sortedImpressions = sort(
    inBand.map((row) => row.impressions),
    (a, b) => b - a,
  );
  const highImpressions = Math.max(
    1,
    sortedImpressions[
      Math.max(0, Math.ceil(sortedImpressions.length / 4) - 1)
    ] ?? 1,
  );
  const matchesChip = (row: Compared, chip?: ArchiveChip) =>
    !chip ||
    (chip === "firstPage"
      ? Math.round(row.position) <= 10
      : chip === "noClicks"
        ? row.clicks === 0
        : row.impressions >= highImpressions);
  const matched = inBand.filter(
    (row) => matchesMove(row, filters.move) && matchesChip(row, filters.chip),
  );
  const key = filters.sort ?? "impressions";
  const direction = (filters.desc ?? true) ? -1 : 1;
  const sortedRows = sort(matched, (a, b) => {
    if (a[key] === null)
      return b[key] === null ? a.query.localeCompare(b.query) : 1;
    if (b[key] === null) return -1;
    const result =
      key === "query"
        ? a.query.localeCompare(b.query, "tr")
        : Number(a[key]) - Number(b[key]);
    return direction * result || a.query.localeCompare(b.query, "tr");
  });
  const comparable = rows.filter(
    (row): row is Compared & { delta: number; previousPosition: number } =>
      row.delta !== null && row.previousPosition !== null,
  );
  const bands = countBands(rows);
  const pairedNow = countBands(comparable);
  const pairedBefore = countBands(
    comparable.map((row) => ({ position: row.previousPosition })),
  );
  const bandDeltas: Record<BandId, number | null> = { ...bands };
  for (const band of BAND_IDS)
    bandDeltas[band] = comparable.length
      ? pairedNow[band] - pairedBefore[band]
      : null;
  const movers = (sign: number) =>
    sort(
      comparable.filter((row) => sign * row.delta >= 0.5),
      (a, b) =>
        Math.abs(b.delta) * b.impressions - Math.abs(a.delta) * a.impressions ||
        a.query.localeCompare(b.query),
    ).slice(0, 5);
  const currentQueries = new Set(current.map((row) => row.query));
  const unobserved = sort(
    previous.filter(
      (row) =>
        !currentQueries.has(row.query) &&
        row.query.toLocaleLowerCase("tr").includes(needle),
    ),
    (a, b) => b.impressions - a.impressions || a.query.localeCompare(b.query),
  );
  const countMove = (move: ArchiveMove) =>
    inBand.filter(
      (row) => matchesChip(row, filters.chip) && matchesMove(row, move),
    ).length;
  const countChip = (chip: ArchiveChip) =>
    inBand.filter(
      (row) => matchesMove(row, filters.move) && matchesChip(row, chip),
    ).length;
  return {
    rows: sortedRows.slice(filters.offset, filters.offset + filters.limit),
    totalMatching: matched.length,
    totalObserved: rows.length,
    comparableCount: comparable.length,
    unknownCount: rows.length - comparable.length,
    bands,
    bandDeltas,
    highImpressions,
    risers: movers(1),
    fallers: movers(-1),
    significantUp: comparable.filter((row) => row.delta >= 0.5).length,
    significantDown: comparable.filter((row) => row.delta <= -0.5).length,
    unobserved: unobserved.slice(0, 25).map((row) => row.query),
    unobservedCount: unobserved.length,
    moveCounts: {
      risers: countMove("risers"),
      fallers: countMove("fallers"),
      top10: countMove("top10"),
      lost: countMove("lost"),
    },
    chipCounts: {
      firstPage: countChip("firstPage"),
      highImpressions: countChip("highImpressions"),
      noClicks: countChip("noClicks"),
    },
  };
}
