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
  // The trend card above already carries the heading, the reason and the
  // retry for an unreadable period; saying it again here stacked three
  // error blocks on one screen.
  if (measurementUnknown && !ownReason)
    return (
      <div className="space-y-3" id="analytics-report">
        {children}
      </div>
    );
  return (
    <div className="space-y-3" id="analytics-report">
      {children}
      {unknown ? (
        <section className="space-y-2 rounded-box border border-[var(--hairline)] bg-base-100 p-4">
          <h3 className="text-base font-semibold">
            {t("Bu dönemin trafiği belirlenemedi")}
          </h3>
          <MeasurementWarning
            reports={meta ? [meta] : []}
            unknown
            onRetry={onRetry}
            onOpenHealth={onOpenHealth}
          />
        </section>
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
      {/* Provenance after the content it describes. */}
      <AnalyticsEvidence result={result} onOpenHealth={onOpenHealth} />
    </div>
  );
}
