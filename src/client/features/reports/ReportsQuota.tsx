import { QuotaCard } from "@/client/features/quotas/QuotaCard";
import { useQuotaStatus } from "@/client/features/quotas/useQuotaStatus";
import { usedFraction } from "@/server/features/quotas/quotaTypes";

/** Quiet by default: the report limits only show once one is 70% used. */
const REPORT_QUOTA_VISIBLE_FRACTION = 0.7;

export function ReportsQuota({ projectId }: { projectId: string }) {
  const query = useQuotaStatus(projectId, ["reports"]);
  const nearLimit = (query.data?.items ?? []).some((item) => {
    const fraction = usedFraction(item.used, item.limit);
    return fraction !== null && fraction >= REPORT_QUOTA_VISIBLE_FRACTION;
  });
  if (!nearLimit) return null;
  return <QuotaCard projectId={projectId} kinds={["reports"]} />;
}
