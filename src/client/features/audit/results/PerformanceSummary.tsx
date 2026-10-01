import { useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { AlertTriangle } from "lucide-react";
import { lighthouseBand } from "@/shared/lighthouse";
import { formatCount } from "@/client/lib/format";
import { ScoreHistogram } from "@/client/features/audit/results/ScoreHistogram";
import {
  describeQuotaStop,
  summarizeLighthouse,
} from "@/client/features/audit/results/performanceBands";
import type { PerformanceFilters } from "@/client/features/audit/results/AuditResultsTableFilterLogic";
import type { AuditResultsData } from "@/client/features/audit/results/types";

function scoreClass(score: number | null) {
  if (score === null) return "text-subtle";
  const band = lighthouseBand(score);
  if (band === "good") return "text-[var(--ink-success)]";
  if (band === "fair") return "text-[var(--ink-warning)]";
  return "text-[var(--ink-error)]";
}

/**
 * Why the measurements failed, in words, when the stored error says.
 *
 * Every row failing with the same 429 is a quota, not twenty broken pages, and
 * a reader who sees only dashes will assume the pages are at fault. A run that
 * stopped on the daily quota says how far it got.
 */
function failureReason(
  rows: AuditResultsData["lighthouse"],
  plannedChecks: number,
): string | null {
  const marked = describeQuotaStop(rows, plannedChecks);
  if (marked) return marked;
  const quota = rows.some((row) => /429|quota/i.test(row.errorMessage ?? ""));
  if (!quota) return null;
  return "Google'ın ücretsiz ölçüm kotası dolmuş; sayfalarınızda bir sorun yok. Ayarlar'dan PageSpeed anahtarı ekleyin ya da kota yenilenince denetimi yeniden başlatın.";
}

/**
 * The Performance tab's own numbers: the three category averages, the band
 * split as a filter, and the measurements that failed as one click.
 *
 * These used to sit in a strip above every tab, so the Sorunlar and Sayfalar
 * tabs carried a speed report nobody on them had asked for.
 */
export function PerformanceSummary({
  lighthouse,
  plannedChecks,
  filters,
  onChange,
}: {
  lighthouse: AuditResultsData["lighthouse"];
  /** Checks the audit set out to run (pages x 2); 0 when it never recorded it. */
  plannedChecks: number;
  filters: PerformanceFilters;
  onChange: (filters: PerformanceFilters) => void;
}) {
  const stats = useMemo(() => summarizeLighthouse(lighthouse), [lighthouse]);
  const failedActive = filters.status === "failed";
  const reason = failureReason(lighthouse, plannedChecks);
  const averages: Array<[string, number | null]> = [
    ["Hız", stats.avgPerformance],
    ["SEO", stats.avgSeo],
    ["Erişilebilirlik", stats.avgAccessibility],
  ];

  return (
    <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
      <section className="rounded-box border border-base-300 bg-base-100 px-4 py-3">
        <h3 className="text-sm font-medium">Ortalama puanlar</h3>
        <dl className="mt-2 grid grid-cols-3 gap-3">
          {averages.map(([label, score]) => (
            <div key={label}>
              <dt className="truncate text-xs text-muted">{label}</dt>
              <dd
                className={`text-2xl font-semibold tabular-nums ${scoreClass(score)}`}
              >
                {score === null ? "-" : formatCount(score)}
              </dd>
            </div>
          ))}
        </dl>
        {stats.failed > 0 || failedActive ? (
          <button
            type="button"
            aria-pressed={failedActive}
            onClick={() =>
              onChange({ ...filters, status: failedActive ? "all" : "failed" })
            }
            className={`mt-3 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs transition-colors ${
              failedActive
                ? "border-primary bg-primary/10 text-primary"
                : "border-[var(--control-border)] hover:border-primary/50"
            }`}
          >
            <AlertTriangle aria-hidden className="size-3.5" />
            Ölçülemeyen {formatCount(stats.failed)} sayfa
          </button>
        ) : null}
        {reason ? (
          <p className="mt-2 text-xs text-muted">
            {reason}{" "}
            <Link to="/settings" className="link">
              Ayarlar&apos;ı aç
            </Link>
          </p>
        ) : null}
      </section>
      <section className="rounded-box border border-base-300 bg-base-100 px-3 py-3">
        <h3 className="px-2 text-sm font-medium">Mobilde hız dağılımı</h3>
        <p className="mb-2 px-2 text-xs text-muted">
          Ortalama tek başına yanıltır. Bir gruba tıklayıp o sayfaları
          listeleyin.
        </p>
        <ScoreHistogram
          rows={lighthouse}
          filters={filters}
          onChange={onChange}
        />
      </section>
    </div>
  );
}
