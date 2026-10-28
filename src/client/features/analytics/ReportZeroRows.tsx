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
  const meta = result.reportMetadata;
  // The trend card already explains an unknown measurement; repeat it here
  // only when this table has a reason of its own.
  const ownReason = Boolean(
    meta?.restrictedMetrics?.length ||
    meta?.subjectToThresholding ||
    meta?.sampling?.length ||
    meta?.dataLossFromOtherRow,
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
          {measurementUnknown && !ownReason ? (
            onRetry ? (
              <button
                type="button"
                className="btn btn-sm min-h-11"
                onClick={onRetry}
              >
                {t("Yeniden dene")}
              </button>
            ) : null
          ) : (
            <MeasurementWarning
              reports={meta ? [meta] : []}
              unknown
              onRetry={onRetry}
              onOpenHealth={onOpenHealth}
            />
          )}
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
