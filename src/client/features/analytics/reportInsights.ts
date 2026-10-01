import { median, sortBy } from "remeda";
import {
  formatCount,
  formatDuration,
  formatPercent,
} from "@/client/lib/format";

export type ReportRow = Record<string, string | number | null>;

/*
 * Chips are derived from the columns a report actually has, not from the
 * report's name: a chip whose field is missing would count zero rows and
 * read as "no such rows exist", which is a claim about the site, not about
 * the report's shape.
 */
export type ChipId =
  | "lowEngagement"
  | "converting"
  | "earning"
  | "lowDwell"
  | "weakConversion";

type ChipRule = { hint: string; test: (row: ReportRow) => boolean };

type ChipDef = {
  id: ChipId;
  label: string;
  /** Null when the report lacks the columns, or has too few rows to judge. */
  build: (metrics: readonly string[], rows: ReportRow[]) => ChipRule | null;
};

/** Below this share of engaged sessions a page is bouncing more than holding. */
const LOW_ENGAGEMENT_RATE = 0.5;

/** A median over fewer rows than this is noise, so a median-based chip hides. */
const MIN_ROWS_FOR_MEDIAN = 4;

export function numeric(row: ReportRow, field: string): number | null {
  const value = row[field];
  return typeof value === "number" ? value : null;
}

/** A chip decided by one column against a fixed bar. */
function fieldChip(
  id: ChipId,
  label: string,
  field: string,
  hint: string,
  test: (value: number) => boolean,
): ChipDef {
  return {
    id,
    label,
    build: (metrics) =>
      metrics.includes(field)
        ? {
            hint,
            test: (row) => {
              const value = numeric(row, field);
              return value !== null && test(value);
            },
          }
        : null,
  };
}

/** Seconds of engagement per active user; null when nobody was active. */
function dwellPerUser(row: ReportRow): number | null {
  const seconds = numeric(row, "userEngagementDuration");
  const users = numeric(row, "activeUsers");
  return seconds === null || users === null || users <= 0
    ? null
    : seconds / users;
}

/** The median of a column over the rows that have it, or null if too few. */
function medianOf(values: Array<number | null>): number | null {
  const present = values.filter((value): value is number => value !== null);
  return present.length < MIN_ROWS_FOR_MEDIAN
    ? null
    : (median(present) ?? null);
}

const CHIP_DEFS: ChipDef[] = [
  fieldChip(
    "lowEngagement",
    "Etkileşimi düşük",
    "engagementRate",
    "Etkileşim oranı yüzde 50'nin altında olan satırlar.",
    (value) => value < LOW_ENGAGEMENT_RATE,
  ),
  fieldChip(
    "converting",
    "Dönüşümü olan",
    "keyEvents",
    "En az bir anahtar olay getirmiş satırlar.",
    (value) => value > 0,
  ),
  fieldChip(
    "earning",
    "Geliri olan",
    "itemRevenue",
    "Gelir getirmiş ürünler.",
    (value) => value > 0,
  ),
  {
    id: "lowDwell",
    label: "Etkileşim süresi düşük",
    // This report has no engagement rate, so the measure is time held per
    // active user. The bar is half of the report's own median, not a number
    // borrowed from elsewhere: a news site and a docs site differ widely.
    build: (metrics, rows) => {
      if (
        !metrics.includes("userEngagementDuration") ||
        !metrics.includes("activeUsers")
      ) {
        return null;
      }
      const mid = medianOf(rows.map(dwellPerUser));
      if (mid === null) return null;
      const bar = mid / 2;
      return {
        hint: `Kullanıcı başına etkileşim süresi, bu listenin ortancasının (${formatDuration(mid * 1000)}) yarısından, yani ${formatDuration(bar * 1000)} değerinden kısa olan sayfalar.`,
        test: (row) => {
          const dwell = dwellPerUser(row);
          return dwell !== null && dwell < bar;
        },
      };
    },
  },
  {
    id: "weakConversion",
    label: "Trafiği yüksek, dönüşümü düşük",
    // High traffic: sessions at or above the report's median. Low conversion:
    // key-event rate below the report's median rate, or exactly zero (which
    // matters when most pages convert nothing and the median is itself zero).
    build: (metrics, rows) => {
      if (
        !metrics.includes("sessions") ||
        !metrics.includes("sessionKeyEventRate")
      ) {
        return null;
      }
      const midSessions = medianOf(rows.map((row) => numeric(row, "sessions")));
      const midRate = medianOf(
        rows.map((row) => numeric(row, "sessionKeyEventRate")),
      );
      if (midSessions === null || midRate === null) return null;
      return {
        hint: `Oturumu listenin ortancasına (${formatCount(midSessions)}) eşit ya da üstünde olup oturum başına anahtar olay oranı ortancanın (${formatPercent(midRate)}) altında kalan, ya da hiç olay getirmeyen sayfalar.`,
        test: (row) => {
          const sessions = numeric(row, "sessions");
          const rate = numeric(row, "sessionKeyEventRate");
          return (
            sessions !== null &&
            rate !== null &&
            sessions >= midSessions &&
            (rate === 0 || rate < midRate)
          );
        },
      };
    },
  },
];

type ChipState = {
  id: ChipId;
  label: string;
  hint: string;
  /** Rows that match, counted over the whole result and not the filtered view. */
  count: number;
  test: (row: ReportRow) => boolean;
};

/** Chips this report's columns can support, with counts over every row. */
export function availableChips(
  metrics: readonly string[],
  rows: ReportRow[],
): ChipState[] {
  return CHIP_DEFS.flatMap((def) => {
    const rule = def.build(metrics, rows);
    return rule
      ? [
          {
            id: def.id,
            label: def.label,
            hint: rule.hint,
            test: rule.test,
            count: rows.filter(rule.test).length,
          },
        ]
      : [];
  });
}

export function applyChips(
  rows: ReportRow[],
  chips: readonly ChipState[],
  active: readonly ChipId[],
): ReportRow[] {
  const on = chips.filter((chip) => active.includes(chip.id));
  if (on.length === 0) return rows;
  return rows.filter((row) => on.every((chip) => chip.test(row)));
}

/* --- summaries: one per tab ---------------------------------------- */

export type ShareSegment = {
  key: string;
  label: string;
  value: number;
  /** The dimension values this segment stands for; more than one for "Diğer". */
  members: string[];
};

/** A ring holds this many arcs at most; past it, bars read better. */
export const MAX_RING_SEGMENTS = 6;
/** Bars: seven named rows and one pooled "Diğer". */
export const MAX_BAR_ROWS = 8;

export const OTHER_KEY = "__other__";

/**
 * Biggest first; the tail past `max` folds into one "Diğer" segment. Rows
 * sharing a label (the same path on two hosts) add up instead of colliding.
 */
export function buildShareSegments(
  rows: ReportRow[],
  dimension: string,
  metric: string,
  max = MAX_RING_SEGMENTS,
): ShareSegment[] {
  const totals = new Map<string, number>();
  for (const row of rows) {
    const label = row[dimension];
    const value = numeric(row, metric);
    if (typeof label !== "string" || value === null || value <= 0) continue;
    totals.set(label, (totals.get(label) ?? 0) + value);
  }
  const all = sortBy(
    [...totals].map(([label, value]) => ({
      key: label,
      label,
      value,
      members: [label],
    })),
    [(segment) => segment.value, "desc"],
  );
  if (all.length <= max) return all;
  const head = all.slice(0, max - 1);
  const tail = all.slice(max - 1);
  return [
    ...head,
    {
      key: OTHER_KEY,
      label: "Diğer",
      value: tail.reduce((sum, segment) => sum + segment.value, 0),
      members: tail.map((segment) => segment.key),
    },
  ];
}

export function applySegment(
  rows: ReportRow[],
  dimension: string,
  segment: ShareSegment | null,
): ReportRow[] {
  if (!segment) return rows;
  return rows.filter((row) => {
    const value = row[dimension];
    return typeof value === "string" && segment.members.includes(value);
  });
}
