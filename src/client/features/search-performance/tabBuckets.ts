import { sort, sumBy } from "remeda";
import {
  matchesQuickFilter,
  type QuickFilterId,
} from "@/client/features/search-performance/quickFilters";

/**
 * The groups behind each tab's own summary widget.
 *
 * A bucket is a quick filter with a label: the bar and the table both go
 * through `matchesQuickFilter`, so what a bar counts and what a click leaves
 * in the table cannot disagree. Counts always cover every fetched row, never
 * the text-searched or chip-filtered view -- a bar that counted only what is
 * already shown would read zero the moment it was used.
 */

type Row = { clicks: number; impressions: number; position: number };

export type TabBucket = {
  id: QuickFilterId;
  label: string;
  hint: string;
  /** Rows in the group. */
  count: number;
  /** What the bar measures: row count, or impressions for the 5-20 tab. */
  size: number;
};

type BucketDef = { id: QuickFilterId; label: string; hint: string };

function build<R extends Row>(
  rows: R[],
  defs: BucketDef[],
  weight: (row: R) => number,
): TabBucket[] {
  return defs.map((def) => {
    const inside = rows.filter((row) => matchesQuickFilter(def.id, row));
    return { ...def, count: inside.length, size: sumBy(inside, weight) };
  });
}

const POSITION_BANDS: BucketDef[] = [
  { id: "pos1to3", label: "1-3", hint: "Sayfanın en üstü" },
  { id: "pos4to10", label: "4-10", hint: "İlk sayfanın geri kalanı" },
  { id: "pos11to20", label: "11-20", hint: "İkinci sayfa" },
  { id: "pos21plus", label: "21 ve sonrası", hint: "Pek görülmeyen yerler" },
];

/** Queries by rounded average position, the same bands the rankings screen uses. */
export function positionBuckets(rows: Row[]): TabBucket[] {
  return build(rows, POSITION_BANDS, () => 1);
}

const CLICK_TIERS: BucketDef[] = [
  { id: "noClicks", label: "Hiç tıklanmayan", hint: "Görünüyor ama açılmıyor" },
  { id: "clicks1to9", label: "1-9 tıklama", hint: "" },
  { id: "clicks10to99", label: "10-99 tıklama", hint: "" },
  { id: "clicks100plus", label: "100+ tıklama", hint: "Trafiği taşıyanlar" },
];

/** Pages by how many clicks they earned in the window. */
export function clickTierBuckets(rows: Row[]): TabBucket[] {
  return build(rows, CLICK_TIERS, () => 1);
}

const STRIKING_HALVES: BucketDef[] = [
  { id: "pos5to10", label: "Sıra 5-10", hint: "İlk sayfanın alt yarısı" },
  { id: "pos11to20", label: "Sıra 11-20", hint: "İkinci sayfa" },
];

/** Striking-distance rows split in two, each weighed by its impressions. */
export function strikingBuckets(rows: Row[]): TabBucket[] {
  return build(rows, STRIKING_HALVES, (row) => row.impressions);
}

/**
 * A ring or a bar list of one group is a rectangle that looks like a finding,
 * so the chart needs at least two non-empty groups to be worth drawing.
 */
export function hasEnoughGroups(buckets: TabBucket[]): boolean {
  return buckets.filter((bucket) => bucket.size > 0).length >= 2;
}

/**
 * Share of all clicks that the `n` most-clicked rows earned. Null when it
 * says nothing: no clicks at all, or `n` or fewer rows with a click (then
 * the answer is trivially 100%).
 */
export function topShareOfClicks(
  rows: { clicks: number }[],
  n: number,
): number | null {
  const clicked = rows.filter((row) => row.clicks > 0);
  const total = sumBy(clicked, (row) => row.clicks);
  if (total === 0 || clicked.length <= n) return null;
  const top = sort(clicked, (a, b) => b.clicks - a.clicks).slice(0, n);
  return sumBy(top, (row) => row.clicks) / total;
}

type Cannibalized = {
  query: string;
  impressions: number;
  splitShare: number;
  competitors: unknown[];
};

/** Impressions that went to a page other than Google's favourite. */
export function splitImpressionsOf(row: {
  impressions: number;
  splitShare: number;
}): number {
  return Math.round(row.impressions * row.splitShare);
}

/** The query losing the most impressions to a page that is not the primary one. */
export function worstCannibalized<R extends Cannibalized>(
  rows: R[],
): R | undefined {
  return sort(rows, (a, b) => splitImpressionsOf(b) - splitImpressionsOf(a))[0];
}
