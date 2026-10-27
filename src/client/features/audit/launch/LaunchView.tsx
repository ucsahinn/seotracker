import * as React from "react";
import { ConfirmDeleteModal } from "@/client/components/ConfirmDeleteModal";
import { PageHeader, PageShell } from "@/client/components/PageShell";
import { PageActions, RefreshButton } from "@/client/components/RefreshButton";
import { QuotaCard } from "@/client/features/quotas/QuotaCard";
import { AuditHistorySection } from "@/client/features/audit/launch/AuditHistorySection";
import { LaunchFormCard } from "@/client/features/audit/launch/LaunchFormCard";
import { useLaunchController } from "@/client/features/audit/launch/useLaunchController";
import { formatDateTime } from "@/client/lib/format";
import { t } from "@/shared/i18n";

type LaunchViewProps = {
  projectId: string;
  onAuditStarted: (auditId: string) => void;
};

export function LaunchView({ projectId, onAuditStarted }: LaunchViewProps) {
  const controller = useLaunchController({ projectId, onAuditStarted });
  const history = controller.historyQuery.data ?? [];
  /*
   * Deleting an audit drops its pages, its issues and its Lighthouse results,
   * and there is no undo -- yet it was the one destructive action in the app
   * that fired straight off the kebab menu. Reports, templates, project
   * context rows and project archive all confirm first; this screen even puts
   * a confirm in front of *starting* a large crawl, which is reversible.
   */
  const [pendingDelete, setPendingDelete] = React.useState<
    (typeof history)[number] | null
  >(null);

  return (
    <PageShell>
      <PageHeader
        title={t("Site denetimi")}
        description={t(
          "Sitenizi tarar, bulduğu sorunları önem sırasına göre sıralar.",
        )}
        actions={
          <PageActions>
            <RefreshButton
              onRefresh={() => void controller.historyQuery.refetch()}
              isFetching={controller.historyQuery.isFetching}
              dataUpdatedAt={controller.historyQuery.dataUpdatedAt}
              shortcut
            />
          </PageActions>
        }
      />

      <LaunchFormCard
        launchForm={controller.launchForm}
        commitMaxPagesInput={controller.commitMaxPagesInput}
        maxPagesLimit={controller.maxPagesLimit}
      />

      {/* Quotas are reference, not the task: closed, so the history starts
          right under the form. */}
      <details className="-mt-2">
        <summary className="link cursor-pointer text-sm">
          {t("Kotalar")}
        </summary>
        <div className="mt-3">
          <QuotaCard
            projectId={projectId}
            kinds={["pagespeed", "url_inspection"]}
            title={t("Güncel durum")}
          />
        </div>
      </details>

      <AuditHistorySection
        projectId={projectId}
        projectDomain={controller.projectDomain}
        history={history}
        isLoading={controller.historyQuery.isLoading}
        error={controller.historyQuery.error}
        onRetry={() => void controller.historyQuery.refetch()}
        onDelete={(auditId) =>
          setPendingDelete(history.find((row) => row.id === auditId) ?? null)
        }
        onRerun={controller.rerunAudit}
        isRerunPending={controller.isStarting}
      />

      {pendingDelete ? (
        <ConfirmDeleteModal
          title={t('"{url}" denetimi silinsin mi?', {
            url: pendingDelete.startUrl,
          })}
          detail={t(
            "{date} · {count} sayfa. Denetimin sayfaları, sorunları ve hız ölçümleri de silinir. Bu geri alınamaz.",
            {
              date: formatDateTime(pendingDelete.startedAt),
              count: pendingDelete.pagesCrawled,
            },
          )}
          confirmLabel={t("Denetimi sil")}
          isPending={controller.isDeleting}
          onClose={() => setPendingDelete(null)}
          onConfirm={() => {
            controller.deleteAudit(pendingDelete.id);
            setPendingDelete(null);
          }}
        />
      ) : null}
    </PageShell>
  );
}
