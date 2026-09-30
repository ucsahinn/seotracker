import {
  LIGHTHOUSE_CHECKS_PER_PAGE,
  LIGHTHOUSE_QUOTA_MARKER,
} from "@/shared/audit-limits";
import {
  isLighthouseFailure,
  type PerformanceFilters,
  type PerformanceRowData,
} from "@/client/features/audit/results/AuditResultsTableFilterLogic";

/*
 * Lighthouse's own bands. Not thresholds this app invented: the report
 * colours scores by these, so an operator who opens PageSpeed Insights sees
 * the same three groups. Scores are whole numbers, which is why the filter
 * for "orta" can say 89 rather than "below 90".
 */
const GOOD_FROM = 90;
const FAIR_FROM = 50;

type SpeedBand = {
  key: "good" | "fair" | "poor";
  label: string;
  hint: string;
  color: string;
  count: number;
  apply: (filters: PerformanceFilters) => PerformanceFilters;
  matches: (filters: PerformanceFilters) => boolean;
  clear: (filters: PerformanceFilters) => PerformanceFilters;
};

type ScoreRow = Pick<PerformanceRowData, "performanceScore" | "strategy">;

function defineBand({
  minPerf,
  maxPerf,
  ...rest
}: Pick<SpeedBand, "key" | "label" | "hint" | "color" | "count"> & {
  minPerf: string;
  maxPerf: string;
}): SpeedBand {
  return {
    ...rest,
    apply: (filters) => ({ ...filters, device: "mobile", minPerf, maxPerf }),
    matches: (filters) =>
      filters.device === "mobile" &&
      filters.minPerf === minPerf &&
      filters.maxPerf === maxPerf,
    clear: (filters) => ({
      ...filters,
      device: "all",
      minPerf: "",
      maxPerf: "",
    }),
  };
}

/**
 * Mobile only. Every page is measured twice, so counting both reported a
 * ten-page audit as twenty and blended two distributions -- and desktop
 * scores run systematically higher, so the blend reads optimistic. Google
 * indexes mobile-first and its thresholds are written for mobile. Clicking a
 * band therefore also sets the device filter, so the table shows the rows the
 * bar counted.
 */
export function speedBands(rows: ScoreRow[]): SpeedBand[] {
  const measured = rows
    .filter((row) => row.strategy === "mobile")
    .map((row) => row.performanceScore)
    .filter((score): score is number => score !== null);
  const good = measured.filter((score) => score >= GOOD_FROM).length;
  const fair = measured.filter(
    (score) => score >= FAIR_FROM && score < GOOD_FROM,
  ).length;

  return [
    defineBand({
      key: "good",
      label: "Hızlı",
      hint: "90 ve üzeri",
      color: "var(--color-success)",
      count: good,
      minPerf: "90",
      maxPerf: "",
    }),
    defineBand({
      key: "fair",
      label: "Orta",
      hint: "50 – 89",
      color: "var(--color-warning)",
      count: fair,
      minPerf: "50",
      maxPerf: "89",
    }),
    defineBand({
      key: "poor",
      label: "Yavaş",
      hint: "0 – 49",
      color: "var(--color-error)",
      count: measured.length - good - fair,
      minPerf: "",
      maxPerf: "49",
    }),
  ];
}

/** Category averages over the measurements that actually produced scores. */
export function summarizeLighthouse(
  rows: Array<
    ScoreRow & {
      errorMessage: string | null;
      accessibilityScore: number | null;
      bestPracticesScore: number | null;
      seoScore: number | null;
    }
  >,
) {
  const succeeded = rows.filter((row) => !isLighthouseFailure(row));
  const average = (
    key: "performanceScore" | "seoScore" | "accessibilityScore",
  ) => {
    const values = succeeded
      .map((row) => row[key])
      .filter((value): value is number => value !== null);
    if (values.length === 0) return null;
    return Math.round(
      values.reduce((sum, value) => sum + value, 0) / values.length,
    );
  };
  return {
    failed: rows.length - succeeded.length,
    avgPerformance: average("performanceScore"),
    avgSeo: average("seoScore"),
    avgAccessibility: average("accessibilityScore"),
  };
}

/**
 * The plain-language note for a speed run that stopped because Google's daily
 * quota ran out, or null when it did not.
 *
 * `plannedChecks` is the audit's own total (pages x 2); an older audit that
 * never recorded it falls back to the pages that have any row.
 */
export function describeQuotaStop(
  rows: Array<
    Pick<PerformanceRowData, "pageId" | "errorMessage"> & {
      performanceScore: number | null;
      accessibilityScore: number | null;
      bestPracticesScore: number | null;
      seoScore: number | null;
    }
  >,
  plannedChecks: number,
): string | null {
  const stopped = rows.some((row) =>
    row.errorMessage?.startsWith(LIGHTHOUSE_QUOTA_MARKER),
  );
  if (!stopped) return null;

  const measured = new Set(
    rows.filter((row) => !isLighthouseFailure(row)).map((row) => row.pageId),
  ).size;
  const planned =
    plannedChecks > 0
      ? Math.ceil(plannedChecks / LIGHTHOUSE_CHECKS_PER_PAGE)
      : new Set(rows.map((row) => row.pageId)).size;
  const left = Math.max(0, planned - measured);

  return `${LIGHTHOUSE_QUOTA_MARKER}; ${measured} sayfa ölçüldü, ${left} sayfa ölçülemedi. Google'ın ücretsiz günlük ölçüm sınırı bitti, sayfalarınızda bir sorun yok. Ayarlar'dan bir PageSpeed anahtarı ekleyin ya da kota yenilenince denetimi yeniden başlatın.`;
}
