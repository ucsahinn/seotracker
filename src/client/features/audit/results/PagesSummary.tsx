import { useMemo } from "react";
import { formatCount, formatDuration } from "@/client/lib/format";
import {
  DistributionBars,
  type DistributionRow,
} from "@/client/features/audit/results/DistributionBars";
import type {
  PageRow,
  PagesFilters,
} from "@/client/features/audit/results/AuditResultsTableFilterLogic";
import {
  depthBuckets,
  statusBuckets,
  toggleBucket,
  unlinkedCount,
  type PagesBucket,
} from "@/client/features/audit/results/pagesBuckets";

const STATUS_COLOR: Record<string, string> = {
  ok: "var(--color-success)",
  redirect: "var(--color-warning)",
  error: "var(--color-error)",
  missing: "var(--color-base-300)",
};

/**
 * What the crawl found, two ways, before the table of every page.
 *
 * Left: how the pages answered. Right: how far from the home page they sit.
 * Both write into the table's own filter state, so clicking "Hatalı" is the
 * same act as choosing 4xx/5xx in the filter panel, and shows as chosen there.
 */
export function PagesSummary({
  pages,
  filters,
  onChange,
}: {
  pages: Array<Pick<PageRow, "statusCode" | "crawlDepth" | "responseTimeMs">>;
  filters: PagesFilters;
  onChange: (filters: PagesFilters) => void;
}) {
  const status = useMemo(() => statusBuckets(pages), [pages]);
  const depth = useMemo(() => depthBuckets(pages), [pages]);
  const unlinked = useMemo(() => unlinkedCount(pages), [pages]);
  const averageMs = useMemo(() => {
    const timed = pages.filter((page) => page.responseTimeMs);
    if (timed.length === 0) return null;
    const total = timed.reduce(
      (sum, page) => sum + (page.responseTimeMs ?? 0),
      0,
    );
    return Math.round(total / timed.length);
  }, [pages]);

  if (pages.length === 0) return null;

  const toRows = (buckets: PagesBucket[], colorOf: (key: string) => string) =>
    buckets.map(
      (bucket): DistributionRow => ({
        key: bucket.key,
        label: bucket.label,
        hint: bucket.hint || undefined,
        count: bucket.count,
        color: colorOf(bucket.key),
        active: bucket.matches(filters),
      }),
    );
  const select = (buckets: PagesBucket[]) => (key: string) => {
    const bucket = buckets.find((entry) => entry.key === key);
    if (bucket) onChange(toggleBucket(bucket, filters));
  };
  const deepest = depth.filter((bucket) => bucket.count > 0).at(-1);

  return (
    <div className="grid gap-3 lg:grid-cols-2">
      <section className="rounded-box border border-base-300 bg-base-100 px-3 py-3">
        <h3 className="px-2 text-sm font-medium">
          Sayfalar nasıl yanıt verdi?
        </h3>
        <p className="mb-2 px-2 text-xs text-muted">
          {averageMs === null
            ? "Bir çubuğa tıklayarak tabloyu daraltın."
            : `Ortalama yanıt süresi ${formatDuration(averageMs)}. Bir çubuğa tıklayarak tabloyu daraltın.`}
        </p>
        <DistributionBars
          rows={toRows(
            status,
            (key) => STATUS_COLOR[key] ?? "var(--color-base-300)",
          )}
          onSelect={select(status)}
          summary={`${formatCount(pages.length)} sayfanın yanıt durumuna göre dağılımı.`}
        />
      </section>
      <section className="rounded-box border border-base-300 bg-base-100 px-3 py-3">
        <h3 className="px-2 text-sm font-medium">
          Ana sayfadan kaç tık uzakta?
        </h3>
        <p className="mb-2 px-2 text-xs text-muted">
          {unlinked > 0
            ? `${formatCount(unlinked)} sayfaya hiçbir bağlantı verilmemiş, bu yüzden çubuklarda yok.`
            : "Derindeki sayfaları Google geç bulur ve daha az değer verir."}
        </p>
        <DistributionBars
          rows={toRows(depth, () => "var(--color-primary)")}
          onSelect={select(depth)}
          summary={
            deepest
              ? `En derin sayfalar ${deepest.label} uzaklığında.`
              : "Derinlik bilgisi yok."
          }
        />
      </section>
    </div>
  );
}
