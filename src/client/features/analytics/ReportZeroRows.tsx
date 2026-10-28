import type { ComponentProps, ReactNode } from "react";
import type { ReportView } from "./ReportView";
import { AnalyticsEvidence } from "./AnalyticsEvidence";
import { MeasurementWarning } from "./MeasurementWarning";
import { ReportEmptyState } from "./ReportEmptyState";
import { t } from "@/shared/i18n";

export function ReportZeroRows({
  result,
  kind,
  organicOnly,
  onOrganicOnlyChange,
  onOpenHealth,
  onRetry,
  measurementUnknown,
  children,
}: ComponentProps<typeof ReportView> & { children: ReactNode }) {
  const unknown =
    measurementUnknown ||
    result.activityStatus === "unknown" ||
    Boolean(
      result.reportMetadata?.hasLimitedData ||
      result.sampled ||
      result.thresholded,
    );
  return (
    <div className="space-y-3" id="analytics-report">
      <AnalyticsEvidence result={result} onOpenHealth={onOpenHealth} />
      {children}
      {unknown ? (
        <>
          <p className="text-lg font-semibold">
            {t("Bu dönemin trafiği belirlenemedi")}
          </p>
          <MeasurementWarning
            reports={result.reportMetadata ? [result.reportMetadata] : []}
            unknown
            onRetry={onRetry}
            onOpenHealth={onOpenHealth}
          />
        </>
      ) : (
        <ReportEmptyState
          pageGroup={Boolean(result.pageGroup)}
          kind={kind}
          organicOnly={organicOnly}
          emptyReason={result.emptyReason}
          onShowAllTraffic={() => onOrganicOnlyChange(false)}
          onOpenHealth={onOpenHealth}
        />
      )}
    </div>
  );
}
