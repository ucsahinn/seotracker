/**
 * Where a page stands with Google, in the three groups the donut shows.
 *
 * Mirrors `summarizeCoverage` on the server on purpose -- a row is answered
 * only if it was checked, did not error, and carries a real verdict -- so
 * the donut, the counts and the table can never split the same row two ways.
 * Anything unanswered is "pending", because calling a missing verdict "not
 * indexed" would invent a negative Google never gave.
 */
export type CoverageBucket = "indexed" | "notIndexed" | "pending";

export const COVERAGE_BUCKETS: CoverageBucket[] = [
  "indexed",
  "notIndexed",
  "pending",
];

type CoverageInput = {
  verdict: string | null;
  checkedAt: string | null;
  error: string | null;
};

export function coverageBucket(row: CoverageInput): CoverageBucket {
  const answered =
    row.checkedAt &&
    !row.error &&
    row.verdict &&
    row.verdict !== "VERDICT_UNSPECIFIED";
  if (!answered) return "pending";
  return row.verdict === "PASS" ? "indexed" : "notIndexed";
}

export function countCoverage(
  rows: CoverageInput[],
): Record<CoverageBucket, number> {
  const counts = { indexed: 0, notIndexed: 0, pending: 0 };
  for (const row of rows) counts[coverageBucket(row)] += 1;
  return counts;
}
