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
  projectDomain,
}: {
  projectId: string;
  projectDomain?: string | null;
  latest:
    | (ReportListItem & {
        sourceUrl?: string | null;
        projectDomain?: string | null;
      })
    | null;
}) {
  if (!latest) return null;
  const source = latest.sourceUrl ? siteHost(latest.sourceUrl) : null;
  const activeSite = projectDomain ?? latest.projectDomain;
  const projectSite = activeSite ? siteHost(activeSite) : null;
  const mismatch = source && projectSite && source !== projectSite;
  const legacy = reportKind(latest) === UNKNOWN_APP_KIND;
  return (
    <section
      className="space-y-4 rounded-box border border-[var(--hairline)] bg-base-100 p-5"
      aria-label={t("Kaydedilmiş rapor")}
    >
      <div className="flex flex-wrap items-center gap-2">
        <h2 className="text-sm text-muted">{t("Kaydedilmiş rapor")}</h2>
        {legacy ? (
          <span
            className="text-sm text-muted"
            title={t("Eski rapor · kaynak ve tarih doğrulanmamış")}
          >
            {t("Eski rapor")}
          </span>
        ) : (
          <ReportKindChip
            kind={reportKind(latest)}
            isTemplate={hasTemplate(latest)}
          />
        )}
      </div>
      {!source ? (
        <p className="text-sm text-[var(--ink-warning)]">
          {t("Kaynak site doğrulanmadı; kullanmadan önce kontrol edin.")}
        </p>
      ) : null}
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
      {/* Facts sit on the card itself; a bordered strip inside the bordered
          card was a box in a box. */}
      <dl className="grid gap-x-8 gap-y-3 text-sm sm:grid-cols-3">
        <div className="min-w-0">
          <dt className="text-xs text-muted">{t("Etkin proje")}</dt>
          <dd className="truncate font-medium">{projectSite ?? projectId}</dd>
        </div>
        <div className="min-w-0">
          <dt className="text-xs text-muted">{t("Kaynak")}</dt>
          <dd
            className={`truncate font-medium ${
              !source || mismatch ? "text-[var(--ink-warning)]" : ""
            }`}
          >
            {source ?? t("Doğrulanmadı")}
          </dd>
        </div>
        <div className="min-w-0">
          <dt className="text-xs text-muted">{t("Güncellendi")}</dt>
          <dd className="font-medium">
            {formatDateTime(latest.updatedAt)}{" "}
            <span className="text-xs font-normal text-muted">
              {t("Dosya kaydı")}
            </span>
          </dd>
        </div>
      </dl>
      <details className="max-w-prose text-sm text-muted">
        <summary className="cursor-pointer py-2">{t("Ayrıntılar")}</summary>
        <div className="space-y-1.5 pb-2">
          <p>
            {source
              ? t("Kaynak site: {domain}", { domain: source })
              : t(
                  "Kaynak site doğrulanamadı. Bu rapor başka bir siteye ait olabilir.",
                )}
          </p>
          {legacy ? (
            <p>{t("Eski rapor · kaynak ve tarih doğrulanmamış")}</p>
          ) : null}
          <p>
            {t(
              "Bugün karar vermeden önce raporun içindeki siteyi, ölçüm tarihini ve veri sınırlarını kontrol edin.",
            )}
          </p>
        </div>
      </details>
      <details className="max-w-prose text-sm text-muted">
        <summary className="cursor-pointer py-2">{t("Özet")}</summary>
        <p className="mt-1.5 whitespace-pre-line leading-relaxed">
          {latest.summary ||
            t(
              "Bu rapora özet kaydedilmemiş. Bulguları ve ilk adımı raporun içinde kontrol edin.",
            )}
        </p>
      </details>
      {/* The screen's one primary action is the header's report command;
          here the two report actions are secondary and the cross-link is
          tertiary. */}
      <div className="flex flex-wrap items-start gap-2">
        <Link
          to="/p/$projectId/reports/$reportId"
          params={{ projectId, reportId: latest.id }}
          className="btn btn-sm min-h-11"
        >
          {t("Raporu aç")}
        </Link>
        <ReportDownloadButton
          reportId={latest.id}
          title={latest.title}
          label={t("HTML olarak indir")}
        />
        <Link
          to="/p/$projectId/audit"
          params={{ projectId }}
          className="btn btn-ghost btn-sm min-h-11"
        >
          {t("Site denetimlerini aç")}
        </Link>
      </div>
    </section>
  );
}
