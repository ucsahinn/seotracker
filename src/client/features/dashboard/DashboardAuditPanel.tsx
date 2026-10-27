import { Link } from "@tanstack/react-router";
import { EmptyState } from "@/client/components/EmptyState";
import { QueryErrorState } from "@/client/components/QueryErrorState";
import { AuditHealthCard } from "./DashboardCards";
import { AuditFreshnessCard } from "./AuditFreshnessCard";
import type { DashboardAuditSummary } from "@/types/schemas/dashboard";
import { formatCount } from "@/shared/format";
import { t } from "@/shared/i18n";
type Overview = {
  domain: string | null;
  audit: DashboardAuditSummary | null;
  latestAttempt: {
    auditId: string;
    status: string;
    startUrl: string;
    pagesCrawled: number;
  } | null;
};
export function DashboardAuditPanel({
  projectId,
  overview,
  isError,
  error,
  onRetry,
  progressPages,
}: {
  projectId: string;
  overview?: Overview;
  isError: boolean;
  error: unknown;
  onRetry: () => void;
  progressPages?: number;
}) {
  const audit = overview?.audit;
  return (
    <section className="min-w-0 space-y-3">
      {isError ? (
        <QueryErrorState
          error={error}
          onRetry={onRetry}
          title={t("Denetim özeti yüklenemedi")}
        />
      ) : null}
      {!isError && !overview?.domain ? (
        <EmptyState
          compact
          title={t("Site seçilmedi")}
          description={t(
            "Kendi sitenizin denetimini göstermek için proje ayarlarına alan adını girin.",
          )}
          action={
            <Link
              to="/p/$projectId/settings"
              params={{ projectId }}
              className="btn btn-sm"
            >
              {t("Ayarlar")}
            </Link>
          }
        />
      ) : null}
      {overview?.latestAttempt &&
      (overview.latestAttempt.status === "running" ||
        overview.latestAttempt.auditId !== audit?.auditId) ? (
        <p className="break-words text-sm text-muted">
          <Link
            to="/p/$projectId/audit"
            params={{ projectId }}
            search={{ auditId: overview.latestAttempt.auditId }}
            className="link"
          >
            {overview.latestAttempt.status === "running"
              ? t("Denetim sürüyor")
              : t("Son denetim başarısız")}
          </Link>{" "}
          · {overview.latestAttempt.startUrl} ·{" "}
          {t("{count} sayfa", {
            count: formatCount(
              progressPages ?? overview.latestAttempt.pagesCrawled,
            ),
          })}
        </p>
      ) : null}
      {audit ? <AuditHealthCard projectId={projectId} audit={audit} /> : null}
      <AuditFreshnessCard projectId={projectId} />
    </section>
  );
}
