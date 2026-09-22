import { PageShell } from "@/client/components/PageShell";
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
      <h1 className="text-2xl font-semibold">Site Denetimi</h1>

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
      />
    </PageShell>
  );
}
