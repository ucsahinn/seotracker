import { Link } from "@tanstack/react-router";
import { ReportDownloadButton } from "./ReportDownloadButton";
import { ReportKindChip } from "./ReportKindChip";
import { hasTemplate, reportKind } from "./reportStats";
import { formatDateTime } from "@/client/lib/format";
import type { ReportListItem } from "@/serverFunctions/reports";
import { t } from "@/shared/i18n";

export function ReportsSummarySkeleton() {
  return (
    <div className="space-y-3" aria-busy>
      <div className="skeleton h-40" />
      <div className="skeleton h-64" />
    </div>
  );
}

/** Inventory metadata is never presented as SEO growth or source freshness. */
export function ReportsSummary({
  projectId,
  latest,
}: {
  projectId: string;
  latest: ReportListItem | null;
}) {
  if (!latest) return null;
  return (
    <section
      className="space-y-3 rounded-box border border-[var(--hairline)] bg-base-100 p-5"
      aria-label={t("Son güncellenen rapor")}
    >
      <div className="flex flex-wrap items-center gap-2">
        <h2 className="text-sm text-muted">{t("Son güncellenen rapor")}</h2>
        <ReportKindChip
          kind={reportKind(latest)}
          isTemplate={hasTemplate(latest)}
        />
      </div>
      <Link
        to="/p/$projectId/reports/$reportId"
        params={{ projectId, reportId: latest.id }}
        className="link link-hover block break-words text-xl font-semibold"
      >
        {latest.title}
      </Link>
      <p className="max-w-prose whitespace-pre-line text-sm">
        {latest.summary ||
          t(
            "Bu rapora özet kaydedilmemiş. Bulguları ve ilk adımı raporun içinde kontrol edin.",
          )}
      </p>
      <p className="text-sm text-muted">
        {t(
          "Kaydedildi: {date}. Bu zaman, kaynak verinin ölçüm tarihi değildir.",
          { date: formatDateTime(latest.updatedAt) },
        )}
      </p>
      <p className="text-sm text-subtle">
        {t(
          "Bu raporun veri dönemi yapılandırılmış olarak kaydedilmemiş. Dönemi ve veri sınırlarını raporun içinde kontrol edin.",
        )}
      </p>
      <div className="flex flex-wrap gap-2">
        <Link
          to="/p/$projectId/reports/$reportId"
          params={{ projectId, reportId: latest.id }}
          className="btn btn-primary min-h-11"
        >
          {t("Raporu aç")}
        </Link>
        <ReportDownloadButton
          reportId={latest.id}
          title={latest.title}
          label={t("HTML olarak indir")}
        />
      </div>
    </section>
  );
}
