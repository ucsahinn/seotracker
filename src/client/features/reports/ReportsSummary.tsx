import { Link } from "@tanstack/react-router";
import { DonutCard, donutSummary } from "@/client/components/DonutChart";
import { Reveal } from "@/client/components/Reveal";
import { MetricRow, MetricTile } from "@/client/components/MetricTile";
import {
  filterCounts,
  kindLabel,
  kindSegments,
  latestUpdate,
  reportKind,
} from "@/client/features/reports/reportStats";
import { formatCount, formatRelativeTime } from "@/client/lib/format";
import type { ReportListItem } from "@/serverFunctions/reports";
import { t } from "@/shared/i18n";

/** Placeholder shaped like the summary while the list loads. */
export function ReportsSummarySkeleton() {
  return (
    <div className="space-y-4" aria-busy>
      <div className="skeleton h-24" />
      <div className="skeleton h-56" />
    </div>
  );
}

/**
 * Numbers and a ring computed from the reports already on screen, so they
 * match the table. The ring filters the list by report type.
 */
export function ReportsSummary({
  projectId,
  reports,
  visibleReports,
  now,
  selectedKind,
  onSelectKind,
}: {
  projectId: string;
  /** The reports the quick filter keeps; the kind ring splits these. */
  reports: ReportListItem[];
  /** What the table shows (quick filter and kind): the tiles count these. */
  visibleReports: ReportListItem[];
  now: number;
  selectedKind: string | null;
  onSelectKind: (kind: string | null) => void;
}) {
  const counts = filterCounts(visibleReports, now);
  const latest = latestUpdate(visibleReports);
  const segments = kindSegments(reports);

  return (
    <Reveal className="space-y-4">
      {/*
       * What was written last and how much lately, not a count of files:
       * "Rapor 3" said nothing an operator could act on.
       */}
      <MetricRow>
        <MetricTile
          label={t("Son rapor")}
          value={latest ? formatRelativeTime(latest.updatedAt) : null}
          flashKey={latest?.updatedAt ?? null}
          hint={
            latest ? (
              <Link
                to="/p/$projectId/reports/$reportId"
                params={{ projectId, reportId: latest.id }}
                className="link link-hover"
              >
                {t("{title} · {kind} · aç", {
                  title: latest.title,
                  kind: kindLabel(reportKind(latest)),
                })}
              </Link>
            ) : undefined
          }
        />
        <MetricTile
          label={t("Son 7 günde")}
          value={formatCount(counts.recent)}
          animateTo={{ value: counts.recent, format: formatCount }}
          hint={t("yazılan ya da güncellenen rapor")}
        />
        <MetricTile
          label={t("Toplam")}
          value={formatCount(counts.all)}
          animateTo={{ value: counts.all, format: formatCount }}
          hint={t(
            "{audit} denetim raporu · {skill} beceriyle · {template} şablonla",
            {
              audit: formatCount(counts.audit),
              skill: formatCount(counts.skill),
              template: formatCount(counts.template),
            },
          )}
        />
      </MetricRow>
      <DonutCard
        title={t("Türe göre raporlar")}
        description={t(
          "Bir türe tıklayarak listeyi o türdeki raporlarla sınırlayın.",
        )}
        segments={segments}
        totalLabel={t("rapor")}
        summary={donutSummary(segments, t("rapor"))}
        selectedKey={selectedKind}
        onSelect={onSelectKind}
      />
    </Reveal>
  );
}
