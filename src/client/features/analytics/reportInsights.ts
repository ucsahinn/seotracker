import { sortBy } from "remeda";
import type { Ga4ReportKindName } from "@/shared/ga4-reports";

export type ReportRow = Record<string, string | number | null>;

/*
 * Chips are derived from the columns a report actually has, not from the
 * report's name: a chip whose field is missing would count zero rows and
 * read as "no such rows exist", which is a claim about the site, not about
 * the report's shape.
 */
export type ChipId = "lowEngagement" | "converting" | "earning";

type ChipDef = {
  id: ChipId;
  label: string;
  hint: string;
  field: string;
  test: (value: number) => boolean;
};

/** Below this share of engaged sessions a page is bouncing more than holding. */
const LOW_ENGAGEMENT_RATE = 0.5;

const CHIP_DEFS: ChipDef[] = [
  {
    id: "lowEngagement",
    label: "Etkileşimi düşük",
    hint: "Etkileşim oranı yüzde 50'nin altında olan satırlar.",
    field: "engagementRate",
    test: (value) => value < LOW_ENGAGEMENT_RATE,
  },
  {
    id: "converting",
    label: "Dönüşümü olan",
    hint: "En az bir anahtar olay getirmiş satırlar.",
    field: "keyEvents",
    test: (value) => value > 0,
  },
  {
    id: "earning",
    label: "Geliri olan",
    hint: "Gelir getirmiş ürünler.",
    field: "itemRevenue",
    test: (value) => value > 0,
  },
];

type ChipState = {
  id: ChipId;
  label: string;
  hint: string;
  /** Rows that match, counted over the whole result and not the filtered view. */
  count: number;
};

function numeric(row: ReportRow, field: string): number | null {
  const value = row[field];
  return typeof value === "number" ? value : null;
}

/** Chips this report's columns can support, with counts over every row. */
export function availableChips(
  metrics: readonly string[],
  rows: ReportRow[],
): ChipState[] {
  return CHIP_DEFS.filter((def) => metrics.includes(def.field)).map((def) => ({
    id: def.id,
    label: def.label,
    hint: def.hint,
    count: rows.filter((row) => {
      const value = numeric(row, def.field);
      return value !== null && def.test(value);
    }).length,
  }));
}

export function applyChips(
  rows: ReportRow[],
  active: readonly ChipId[],
): ReportRow[] {
  const defs = CHIP_DEFS.filter((def) => active.includes(def.id));
  if (defs.length === 0) return rows;
  return rows.filter((row) =>
    defs.every((def) => {
      const value = numeric(row, def.field);
      return value !== null && def.test(value);
    }),
  );
}

/* --- share-of-total donut ------------------------------------------ */

/** Reports where "how is one total divided" is a natural question. */
const SHARE_REPORTS: Partial<
  Record<
    Ga4ReportKindName,
    { dimension: string; metric: string; totalLabel: string; title: string }
  >
> = {
  traffic_acquisition: {
    dimension: "sessionDefaultChannelGroup",
    metric: "sessions",
    totalLabel: "oturum",
    title: "Oturumların kanallara dağılımı",
  },
  audience_breakdown: {
    dimension: "deviceCategory",
    metric: "activeUsers",
    totalLabel: "kullanıcı",
    title: "Kullanıcıların cihazlara dağılımı",
  },
};

export function shareConfig(kind: Ga4ReportKindName) {
  return SHARE_REPORTS[kind] ?? null;
}

type ShareSegment = {
  key: string;
  label: string;
  value: number;
  /** The dimension values this segment stands for; more than one for "Diğer". */
  members: string[];
};

const MAX_SEGMENTS = 6;

export const OTHER_KEY = "__other__";

/** Biggest first; the tail past the sixth folds into one "Diğer" segment. */
export function buildShareSegments(
  rows: ReportRow[],
  dimension: string,
  metric: string,
): ShareSegment[] {
  const all = sortBy(
    rows.flatMap((row) => {
      const label = row[dimension];
      const value = numeric(row, metric);
      if (typeof label !== "string" || value === null || value <= 0) return [];
      return [{ key: label, label, value, members: [label] }];
    }),
    [(segment) => segment.value, "desc"],
  );
  if (all.length <= MAX_SEGMENTS) return all;
  const head = all.slice(0, MAX_SEGMENTS - 1);
  const tail = all.slice(MAX_SEGMENTS - 1);
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
