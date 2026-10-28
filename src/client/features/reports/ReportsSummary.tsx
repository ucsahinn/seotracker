import { Link } from "@tanstack/react-router";
import { ReportDownloadButton } from "./ReportDownloadButton";
import { ReportKindChip } from "./ReportKindChip";
import {
  displayReportTitle,
  hasTemplate,
  reportKind,
  UNKNOWN_APP_KIND,
} from "./reportStats";
import { formatDateTime } from "@/client/lib/format";
import type { ReportListItem } from "@/serverFunctions/reports";
import { t } from "@/shared/i18n";
import { siteHost } from "@/client/features/audit/launch/auditDelta";

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
  latest:
    | (ReportListItem & {
        sourceUrl?: string | null;
        projectDomain?: string | null;
      })
    | null;
}) {
  if (!latest) return null;
  const source = latest.sourceUrl ? siteHost(latest.sourceUrl) : null;
  const projectSite = latest.projectDomain
    ? siteHost(latest.projectDomain)
    : null;
  const mismatch = source && projectSite && source !== projectSite;
  const legacy = reportKind(latest) === UNKNOWN_APP_KIND;
  return (
    <section
      className="space-y-3 rounded-box border border-[var(--hairline)] bg-base-100 p-5"
      aria-label={t("Kaydedilmiş rapor")}
    >
      <div className="flex flex-wrap items-center gap-2">
        <h2 className="text-sm text-muted">{t("Kaydedilmiş rapor")}</h2>
        {legacy ? (
          <span className="text-sm text-muted">
            {t("Eski rapor · kaynak ve tarih doğrulanmamış")}
          </span>
        ) : (
          <ReportKindChip
            kind={reportKind(latest)}
            isTemplate={hasTemplate(latest)}
          />
        )}
      </div>
      <p className="text-sm font-medium">
        {source
          ? t("Kaynak site: {domain}", { domain: source })
          : t(
              "Kaynak site doğrulanamadı. Bu rapor başka bir siteye ait olabilir.",
            )}
      </p>
      {mismatch ? (
        <p className="text-sm text-[var(--ink-warning)]">
          {t("Bu rapor projenin sitesine ait değil: {domain}.", {
            domain: projectSite,
          })}
        </p>
      ) : null}
      <Link
        to="/p/$projectId/reports/$reportId"
        params={{ projectId, reportId: latest.id }}
        className="link link-hover block break-words text-xl font-semibold"
      >
        {displayReportTitle(latest)}
      </Link>
      <p className="max-w-prose whitespace-pre-line text-sm">
        {latest.summary ||
          t(
            "Bu rapora özet kaydedilmemiş. Bulguları ve ilk adımı raporun içinde kontrol edin.",
          )}
      </p>
      <p className="text-sm text-muted">
        {t("Dosya kaydı: {date}", { date: formatDateTime(latest.updatedAt) })}
      </p>
      <p className="text-sm text-subtle">
        {t(
          "Bugün karar vermeden önce raporun içindeki siteyi, ölçüm tarihini ve veri sınırlarını kontrol edin.",
        )}
      </p>
      <div className="flex flex-wrap gap-2">
        <Link
          to="/p/$projectId/audit"
          params={{ projectId }}
          className="btn min-h-11"
        >
          {t("Güncel bir denetim raporu oluştur")}
        </Link>
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
