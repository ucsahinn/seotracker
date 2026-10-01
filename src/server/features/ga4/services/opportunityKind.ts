import { sort as sortNumbers } from "remeda";

/**
 * What kind of work a page needs, and how far its click-through sits from
 * what that position normally earns on this site.
 *
 * The screen used to keep only positions 4 through 20 and call the rest
 * "not an opportunity". That threw away two real ones: a page ranking second
 * whose snippet nobody clicks is a title-and-description afternoon, and a
 * page at 34 with four thousand impressions is a content decision. An
 * opportunity is an opportunity; the band only ever said which *kind*.
 *
 * The expected click-through comes from the site's own rows, not a published
 * curve. Industry CTR tables are averages over everybody's queries, and a
 * brand term at position 3 behaves nothing like a comparison term at
 * position 3 — so the honest comparison is "your other pages at this
 * position earn X". It also needs no data we do not already have.
 */

export type OpportunityKind = "ctr_gap" | "top" | "near_miss" | "deep";

/** Buckets wide enough that each holds several pages on a small site. */
const BUCKETS = [3, 5, 10, 20, 50] as const;

function positionBucket(position: number): number {
  return BUCKETS.find((edge) => position <= edge) ?? 100;
}

type Row = { position: number; ctr: number; impressions: number };

/**
 * Median click-through per position bucket, weighted by nothing: the median
 * is used rather than the mean because one brand page with a 60% CTR would
 * drag a mean high enough to make every other page look like a gap.
 */
export function expectedCtrByBucket(rows: Row[]): Map<number, number> {
  const byBucket = new Map<number, number[]>();
  for (const row of rows) {
    // A page with a handful of impressions has a CTR that is noise: one
    // click out of three is 33%, and it would set the bar for its bucket.
    if (row.impressions < 10) continue;
    const bucket = positionBucket(row.position);
    const list = byBucket.get(bucket);
    if (list) list.push(row.ctr);
    else byBucket.set(bucket, [row.ctr]);
  }

  const expected = new Map<number, number>();
  for (const [bucket, values] of byBucket) {
    // Under three pages there is no "normal" to compare against.
    if (values.length < 3) continue;
    const sorted = sortNumbers(values, (a, b) => a - b);
    const middle = Math.floor(sorted.length / 2);
    expected.set(
      bucket,
      sorted.length % 2 === 0
        ? ((sorted[middle - 1] ?? 0) + (sorted[middle] ?? 0)) / 2
        : (sorted[middle] ?? 0),
    );
  }
  return expected;
}

/** How far below its bucket's median this row sits, or null when unknown. */
export function ctrGap(row: Row, expected: Map<number, number>): number | null {
  if (row.impressions < 10) return null;
  const bar = expected.get(positionBucket(row.position));
  if (bar == null || bar <= 0) return null;
  return row.ctr - bar;
}

/**
 * The kind of work, in the order an operator would try it.
 *
 * A meaningful CTR gap wins over the position band, because it is the
 * cheaper fix: rewriting a title is an afternoon, moving from 12 to 5 is a
 * quarter. `deep` is last because it is the most expensive.
 */
export function classify(
  row: Row,
  expected: Map<number, number>,
): OpportunityKind {
  const gap = ctrGap(row, expected);
  // Half the bucket's median, so "slightly below average" is not a finding.
  const bar = expected.get(positionBucket(row.position));
  if (gap !== null && bar != null && gap < -bar / 2) return "ctr_gap";
  // Already on top with a normal click-through: nothing to climb to.
  if (row.position < 4) return "top";
  if (row.position <= 20) return "near_miss";
  return "deep";
}
