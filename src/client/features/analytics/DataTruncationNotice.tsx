import type { Ga4ReportMetadata } from "@/server/features/ga4/services/Ga4ReportNormalization";
import { formatDate } from "@/shared/format";
import { t } from "@/shared/i18n";

export function DataTruncationNotice({
  reasons,
}: {
  reasons: Ga4ReportMetadata["dataTruncationReasons"];
}) {
  if (!reasons?.length) return null;
  const date = (value: string | undefined) =>
    value && /^\d{4}-\d{2}-\d{2}$/.test(value) ? formatDate(value) : null;
  return (
    <div role="status" className="space-y-1 text-xs text-[var(--ink-warning)]">
      <p>
        {t(
          "Google bu raporun tarih kapsamındaki bazı verileri kesti; toplamlar ve karşılaştırmalar eksik olabilir.",
        )}
      </p>
      {reasons.map((reason, index) => (
        <div key={index}>
          {reason.dataTruncationType ? (
            <p>{reason.dataTruncationType}</p>
          ) : null}
          {reason.dataTruncationMessage ? (
            <p>{reason.dataTruncationMessage}</p>
          ) : null}
          {date(reason.dataTruncationDate) ? (
            <p>{date(reason.dataTruncationDate)}</p>
          ) : null}
          {reason.dataTruncationDateRanges?.map((range, i) => (
            <p key={i}>
              {date(range.startDate)} – {date(range.endDate)}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}
