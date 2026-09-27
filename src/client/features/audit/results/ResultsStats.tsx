import { useMemo, type ReactNode } from "react";
import { resolveIssueSeverity } from "@/shared/audit-issues";
import { formatCount, formatDuration } from "@/client/lib/format";
import type { AuditResultsData } from "@/client/features/audit/results/types";

/**
 * The numbers across the top of an audit result.
 *
 * Split out of `ResultsView` when that file crossed its line ceiling. This
 * is the read-only summary half; the file it came from owns the tabs, the
 * warnings and the data fetching.
 */
interface StatItem {
  label: string;
  value: string;
  valueClass?: string;
  sub?: ReactNode;
}

export function StatsStrip({
  pagesCrawled,
  issuePageCount,
  issues,
  totalLighthouse,
  averageResponseMs,
  lighthouseSummary,
}: {
  pagesCrawled: number;
  /** Distinct pages with at least one finding, not rows. */
  issuePageCount: number;
  issues: AuditResultsData["issues"];
  totalLighthouse: number;
  averageResponseMs: number;
  lighthouseSummary: {
    failed: number;
    avgPerformance: number | null;
    avgSeo: number | null;
    avgAccessibility: number | null;
  };
}) {
  const severityCounts = useMemo(() => {
    const counts = { critical: 0, warning: 0, info: 0 };
    for (const issue of issues) {
      counts[resolveIssueSeverity(issue)] += 1;
    }
    return counts;
  }, [issues]);

  const items: StatItem[] = [
    { label: "Taranan sayfa", value: formatCount(pagesCrawled) },
    {
      label: "Sorunlu sayfa",
      value: formatCount(issuePageCount),
      valueClass: issuePageCount === 0 ? "text-success" : "",
      sub: issues.length > 0 && (
        <span className="flex items-center gap-2.5">
          <SeverityCount
            count={severityCounts.critical}
            dotClass="bg-error"
            label="kritik"
          />
          <SeverityCount
            count={severityCounts.warning}
            dotClass="bg-warning"
            label="uyarı"
          />
          <SeverityCount
            count={severityCounts.info}
            dotClass="bg-base-content/30"
            label="bilgi"
          />
        </span>
      ),
    },
    { label: "Ort. yanıt", value: formatDuration(averageResponseMs) },
  ];

  if (totalLighthouse > 0) {
    items.push(
      { label: "Lighthouse testi", value: formatCount(totalLighthouse) },
      {
        label: "Ort. Lighthouse perf.",
        value:
          lighthouseSummary.avgPerformance == null
            ? "-"
            : formatCount(lighthouseSummary.avgPerformance),
        valueClass: scoreClass(lighthouseSummary.avgPerformance),
      },
      {
        label: "Ort. Lighthouse SEO",
        value:
          lighthouseSummary.avgSeo == null
            ? "-"
            : formatCount(lighthouseSummary.avgSeo),
        valueClass: scoreClass(lighthouseSummary.avgSeo),
      },
      {
        label: "Ort. Lighthouse erişim",
        value:
          lighthouseSummary.avgAccessibility == null
            ? "-"
            : formatCount(lighthouseSummary.avgAccessibility),
        valueClass: scoreClass(lighthouseSummary.avgAccessibility),
      },
      {
        label: "Lighthouse hatası",
        value: formatCount(lighthouseSummary.failed),
        valueClass:
          lighthouseSummary.failed > 0 ? "text-error" : "text-success",
      },
    );
  }

  const columnsClass =
    items.length === 3
      ? "grid-cols-1 sm:grid-cols-3"
      : "grid-cols-2 md:grid-cols-4";

  return (
    <div
      className={`grid ${columnsClass} gap-px rounded-box border border-base-300 bg-base-300/70 overflow-hidden`}
    >
      {items.map((item) => (
        <div key={item.label} className="bg-base-100 px-4 py-3">
          <p className="text-[11px] font-medium uppercase tracking-wider text-muted">
            {item.label}
          </p>
          <p
            className={`text-xl font-semibold mt-0.5 tabular-nums ${item.valueClass ?? ""}`}
          >
            {item.value}
          </p>
          {item.sub && (
            <div className="text-xs text-muted mt-1">{item.sub}</div>
          )}
        </div>
      ))}
    </div>
  );
}

/**
 * A count with its severity said, not only coloured.
 *
 * Three dots and three numbers - "3 5 2" - carried the whole distinction in
 * hue, so anyone who cannot separate red from amber read a row of unlabelled
 * figures. The dot stays; the word is what makes it readable.
 */
function SeverityCount({
  count,
  dotClass,
  label,
}: {
  count: number;
  dotClass: string;
  label: string;
}) {
  if (count === 0) return null;
  return (
    <span className="flex items-center gap-1 tabular-nums">
      <span className={`size-1.5 rounded-full ${dotClass}`} aria-hidden />
      {formatCount(count)} {label}
    </span>
  );
}

function scoreClass(score: number | null) {
  if (score == null) return "";
  if (score >= 90) return "text-success";
  if (score >= 50) return "text-warning";
  return "text-error";
}
