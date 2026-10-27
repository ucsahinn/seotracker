import { z } from "zod";
import { getSavedKeywordsSchema } from "../types/schemas/keywords";
import { bandOf, type BandId } from "./positionBands";
import { sort } from "remeda";

export const SAVED_TERM_LIMIT = 20;
export const SAVED_TAG_LIMIT = 50;
export const savedWatchlistSearchSchema = z.object({
  days: z.union([z.literal(30), z.literal(90), z.literal(180)]).catch(90),
  include: z.string().max(5000).catch(""),
  exclude: z.string().max(5000).catch(""),
  tags: z.array(z.string().min(1)).max(SAVED_TAG_LIMIT).catch([]),
  band: z
    .enum(["top3", "top10", "top20", "beyond", "none", "firstPage", "observed"])
    .optional()
    .catch(undefined),
  fallers: z.boolean().catch(false),
  sort: z
    .enum(["createdAt", "keyword", "position", "delta", "impressions"])
    .catch("createdAt"),
  order: z.enum(["asc", "desc"]).catch("desc"),
  page: z.number().int().min(1).max(1000000).catch(1),
  pageSize: z.union([z.literal(50), z.literal(100), z.literal(250)]).catch(50),
});
export const savedWatchlistSchema = getSavedKeywordsSchema.extend({
  days: z.union([z.literal(30), z.literal(90), z.literal(180)]).default(90),
  band: savedWatchlistSearchSchema.shape.band,
  fallers: z.boolean().default(false),
  sort: savedWatchlistSearchSchema.shape.sort
    .removeCatch()
    .default("createdAt"),
  startDate: z.iso.date().optional(),
  endDate: z.iso.date().optional(),
  expectedSnapshot: z.string().max(100).optional(),
});
export type SavedWatchlistSearch = z.infer<typeof savedWatchlistSearchSchema>;
export type SavedWatchlistInput = z.infer<typeof savedWatchlistSchema>;
export type SavedBand = BandId | "none" | "firstPage" | "observed";
export function savedMatchKey(value: string) {
  return value.trim().replace(/\s+/g, " ").toLocaleLowerCase("tr");
}
type SavedObservationInput = {
  query: string;
  position: number | null;
  impressions: number;
  clicks: number;
  dates: string[];
};
export type SavedObservation = {
  position: number;
  impressions: number;
  clicks: number;
  observedDays: number;
  firstDate: string;
  lastDate: string;
  variants: string[];
};
export function groupSavedObservations(rows: SavedObservationInput[]) {
  const groups = new Map<string, SavedObservationInput[]>();
  for (const row of rows) {
    if (
      row.position === null ||
      !Number.isFinite(row.position) ||
      row.position <= 0 ||
      row.impressions <= 0
    )
      continue;
    const key = savedMatchKey(row.query);
    const entries = groups.get(key) ?? [];
    entries.push(row);
    groups.set(key, entries);
  }
  const result = new Map<string, SavedObservation>();
  for (const [key, unsorted] of groups) {
    const entries = sort(unsorted, (a, b) => a.query.localeCompare(b.query));
    const impressions = entries.reduce((n, r) => n + r.impressions, 0);
    const dates = sort([...new Set(entries.flatMap((r) => r.dates))], (a, b) =>
      a.localeCompare(b),
    );
    result.set(key, {
      position:
        entries.reduce((n, r) => n + r.position! * r.impressions, 0) /
        impressions,
      impressions,
      clicks: entries.reduce((n, r) => n + r.clicks, 0),
      observedDays: dates.length,
      firstDate: dates[0] ?? "",
      lastDate: dates.at(-1) ?? "",
      variants: entries.map((r) => r.query),
    });
  }
  return result;
}
export type SavedEvidence = {
  position: number | null;
  previousPosition: number | null;
  delta: number | null;
  impressions: number | null;
  clicks: number | null;
  observation: SavedObservation | null;
  previousObservation: SavedObservation | null;
  positionStatus:
    | "observed"
    | "notObserved"
    | "unknownDueToCoverage"
    | "unavailable";
};
export function savedWatchlistView<
  Row extends { id: string; keyword: string; createdAt: string },
>(
  saved: Row[],
  current: Map<string, SavedObservation>,
  previous: Map<string, SavedObservation>,
  input: {
    page: number;
    pageSize: number;
    sort: SavedWatchlistSearch["sort"];
    order: "asc" | "desc";
    band?: SavedBand;
    fallers?: boolean;
  },
  availability: {
    archiveAvailable: boolean;
    coverageComplete?: boolean;
    comparisonAvailable?: boolean;
  },
) {
  const {
    archiveAvailable,
    coverageComplete = false,
    comparisonAvailable = true,
  } = availability;
  const base = saved.map((row) => {
    const observation = current.get(savedMatchKey(row.keyword)) ?? null;
    const previousObservation =
      previous.get(savedMatchKey(row.keyword)) ?? null;
    const position = observation?.position ?? null;
    const previousPosition = previousObservation?.position ?? null;
    const evidence: SavedEvidence = {
      position,
      previousPosition,
      delta:
        position !== null && previousPosition !== null
          ? previousPosition - position
          : null,
      impressions: observation?.impressions ?? null,
      clicks: observation?.clicks ?? null,
      observation,
      previousObservation,
      positionStatus: !archiveAvailable
        ? "unavailable"
        : observation
          ? "observed"
          : coverageComplete
            ? "notObserved"
            : "unknownDueToCoverage",
    };
    return { ...row, ...evidence };
  });
  const bands: Record<BandId | "none" | "firstPage", number> = {
    top3: 0,
    top10: 0,
    top20: 0,
    beyond: 0,
    none: 0,
    firstPage: 0,
  };
  for (const r of base) {
    if (r.position === null) bands.none++;
    else {
      bands[bandOf(r.position)]++;
      if (Math.round(r.position) <= 10) bands.firstPage++;
    }
  }
  const comparable = base.filter((r) => r.delta !== null);
  const upSignificant = comparable.filter((r) => r.delta! >= 0.5).length;
  const downSignificant = comparable.filter((r) => r.delta! <= -0.5).length;
  const bandUnavailable =
    (!!input.band && !archiveAvailable) ||
    (!!input.fallers && (!archiveAvailable || !comparisonAvailable));
  const matched = bandUnavailable
    ? []
    : base.filter(
        (r) =>
          (!input.band ||
            (input.band === "none"
              ? r.position === null
              : input.band === "observed"
                ? r.position !== null
                : input.band === "firstPage"
                  ? r.position !== null && Math.round(r.position) <= 10
                  : r.position !== null &&
                    bandOf(r.position) === input.band)) &&
          (!input.fallers || (r.delta !== null && r.delta <= -0.5)),
      );
  const direction = input.order === "asc" ? 1 : -1;
  const sorted = sort(matched, (a, b) => {
    if (input.fallers)
      return (
        a.delta! - b.delta! ||
        (b.impressions ?? 0) - (a.impressions ?? 0) ||
        a.id.localeCompare(b.id)
      );
    const av = a[input.sort],
      bv = b[input.sort];
    if (av === null) return bv === null ? a.id.localeCompare(b.id) : 1;
    if (bv === null) return -1;
    return (
      direction *
        (typeof av === "string" && typeof bv === "string"
          ? av.localeCompare(bv, "tr")
          : Number(av) - Number(bv)) || a.id.localeCompare(b.id)
    );
  });
  return {
    rows: sorted.slice(
      (input.page - 1) * input.pageSize,
      input.page * input.pageSize,
    ),
    totalSavedMatching: base.length,
    totalObservedMatching: base.filter((r) => r.position !== null).length,
    totalMatching: matched.length,
    bands,
    upSignificant,
    downSignificant,
    comparableCount: comparable.length,
    stableComparable: comparable.length - upSignificant - downSignificant,
    noPrevious: base.filter(
      (r) => r.position !== null && r.previousPosition === null,
    ).length,
    noCurrent: base.filter((r) => r.position === null).length,
    bandUnavailable,
  };
}
