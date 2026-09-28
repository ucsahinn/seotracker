import { PageHeader, PageShell } from "@/client/components/PageShell";
import { AuditHistorySection } from "@/client/features/audit/launch/AuditHistorySection";
import { LaunchFormCard } from "@/client/features/audit/launch/LaunchFormCard";
import { useLaunchController } from "@/client/features/audit/launch/useLaunchController";

type LaunchViewProps = {
  projectId: string;
  onAuditStarted: (auditId: string) => void;
};

export function LaunchView({ projectId, onAuditStarted }: LaunchViewProps) {
  const controller = useLaunchController({ projectId, onAuditStarted });

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
      />

      <AuditHistorySection
        projectId={projectId}
        history={controller.historyQuery.data ?? []}
        isLoading={controller.historyQuery.isLoading}
        error={controller.historyQuery.error}
        onRetry={() => void controller.historyQuery.refetch()}
        onDelete={controller.deleteAudit}
        onRerun={controller.rerunAudit}
      />
    </PageShell>
  );
}
