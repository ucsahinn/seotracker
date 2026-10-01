import * as React from "react";
import { ConfirmDeleteModal } from "@/client/components/ConfirmDeleteModal";
import { PageHeader, PageShell } from "@/client/components/PageShell";
import { AuditHistorySection } from "@/client/features/audit/launch/AuditHistorySection";
import { LaunchFormCard } from "@/client/features/audit/launch/LaunchFormCard";
import { useLaunchController } from "@/client/features/audit/launch/useLaunchController";
import { formatCount, formatDateTime } from "@/client/lib/format";

type LaunchViewProps = {
  projectId: string;
  onAuditStarted: (auditId: string) => void;
};

export function LaunchView({ projectId, onAuditStarted }: LaunchViewProps) {
  const urlInputRef = React.useRef<HTMLInputElement>(null);
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
        title="Site denetimi"
        description="Sitenizi kendi tarayıcımızla tarar; bulduğu sorunları önem sırasına göre listeler."
      />

      <LaunchFormCard
        launchForm={controller.launchForm}
        commitMaxPagesInput={controller.commitMaxPagesInput}
        maxPagesLimit={controller.maxPagesLimit}
        urlInputRef={urlInputRef}
      />

      <AuditHistorySection
        projectId={projectId}
        history={history}
        isLoading={controller.historyQuery.isLoading}
        error={controller.historyQuery.error}
        onRetry={() => void controller.historyQuery.refetch()}
        onDelete={(auditId) =>
          setPendingDelete(history.find((row) => row.id === auditId) ?? null)
        }
        onRerun={controller.rerunAudit}
        onStartFirst={() => urlInputRef.current?.focus()}
      />

      {pendingDelete ? (
        <ConfirmDeleteModal
          title={`"${pendingDelete.startUrl}" denetimi silinsin mi?`}
          detail={`${formatDateTime(pendingDelete.startedAt)} · ${formatCount(pendingDelete.pagesCrawled)} sayfa. Denetimin sayfaları, sorunları ve hız ölçümleri de silinir. Bu geri alınamaz.`}
          confirmLabel="Denetimi sil"
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
