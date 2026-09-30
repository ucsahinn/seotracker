import type {
  PageRow,
  PagesFilters,
} from "@/client/features/audit/results/AuditResultsTableFilterLogic";

/**
 * The buckets behind the Sayfalar summary.
 *
 * Each bucket is defined by the `PagesFilters` it writes, and `matches`
 * reads the same fields back, so a bar and the filter panel cannot disagree
 * about what is selected. Counts come from the whole crawl, not the filtered
 * view: a bar that counted only what is already shown would read zero the
 * moment it was used.
 */

export type PagesBucket = {
  key: string;
  label: string;
  hint: string;
  count: number;
  apply: (filters: PagesFilters) => PagesFilters;
  matches: (filters: PagesFilters) => boolean;
  /** Undoes only what `apply` set. */
  clear: (filters: PagesFilters) => PagesFilters;
};

type StatusInput = Pick<PageRow, "statusCode">;
type DepthInput = Pick<PageRow, "crawlDepth">;

function statusBucket(
  key: PagesFilters["status"],
  label: string,
  hint: string,
  count: number,
): PagesBucket {
  return {
    key,
    label,
    hint,
    count,
    apply: (filters) => ({ ...filters, status: key }),
    matches: (filters) => filters.status === key,
    clear: (filters) => ({ ...filters, status: "all" }),
  };
}

export function statusBuckets(pages: StatusInput[]): PagesBucket[] {
  const count = (test: (code: number) => boolean) =>
    pages.filter((page) => page.statusCode !== null && test(page.statusCode))
      .length;
  return [
    statusBucket(
      "ok",
      "Sorunsuz",
      "2xx: sayfa açıldı",
      count((c) => c >= 200 && c < 300),
    ),
    statusBucket(
      "redirect",
      "Yönlendirme",
      "3xx: başka adrese gidiyor",
      count((c) => c >= 300 && c < 400),
    ),
    statusBucket(
      "error",
      "Hatalı",
      "4xx / 5xx: sayfa açılmadı",
      count((c) => c >= 400),
    ),
    statusBucket(
      "missing",
      "Ulaşılamadı",
      "Sunucudan yanıt gelmedi",
      pages.filter((page) => page.statusCode === null).length,
    ),
  ];
}

/** Clicks from the home page, grouped so a deep site does not draw twenty bars. */
const DEPTH_BANDS: Array<{ min: number; max: number | null; label: string }> = [
  { min: 0, max: 0, label: "Ana sayfa" },
  { min: 1, max: 1, label: "1 tık" },
  { min: 2, max: 2, label: "2 tık" },
  { min: 3, max: 3, label: "3 tık" },
  { min: 4, max: null, label: "4+ tık" },
];

/**
 * Pages by clicks from the start page.
 *
 * Depth is nullable and null means nothing linked to the page, which is a
 * different statement from depth zero and cannot be expressed as a range
 * filter, so those pages are left out of the bars (see `unlinkedCount`).
 */
export function depthBuckets(pages: DepthInput[]): PagesBucket[] {
  return DEPTH_BANDS.map((band) => {
    const n = pages.filter(
      (page) =>
        page.crawlDepth !== null &&
        page.crawlDepth >= band.min &&
        (band.max === null || page.crawlDepth <= band.max),
    ).length;
    const minDepth = String(band.min);
    const maxDepth = band.max === null ? "" : String(band.max);
    return {
      key: `depth-${band.min}`,
      label: band.label,
      hint: "",
      count: n,
      apply: (filters) => ({ ...filters, minDepth, maxDepth }),
      matches: (filters) =>
        filters.minDepth === minDepth && filters.maxDepth === maxDepth,
      clear: (filters) => ({ ...filters, minDepth: "", maxDepth: "" }),
    };
  });
}

export function unlinkedCount(pages: DepthInput[]): number {
  return pages.filter((page) => page.crawlDepth === null).length;
}

/** Toggles one bucket: a second click on the active bar releases it. */
export function toggleBucket(
  bucket: PagesBucket,
  filters: PagesFilters,
): PagesFilters {
  return bucket.matches(filters)
    ? bucket.clear(filters)
    : bucket.apply(filters);
}
