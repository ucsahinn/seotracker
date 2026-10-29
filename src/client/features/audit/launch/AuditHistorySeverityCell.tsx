import { ArrowDown, ArrowUp } from "lucide-react";
import { formatCount, formatSignedPercent } from "@/client/lib/format";
import type { getAuditHistory } from "@/serverFunctions/audit";
import { issueDelta, type IssueDelta } from "./auditDelta";
import { t } from "@/shared/i18n";
type HistoryRow = Awaited<ReturnType<typeof getAuditHistory>>[number];
const CHIP = {
  info: "border-info/30 bg-info/10 text-[var(--ink-info)]",
  critical: "border-error/30 bg-error/10 text-[var(--ink-error)]",
  warning: "border-warning/30 bg-warning/10 text-[var(--ink-warning)]",
};

export function AuditHistorySeverityCell({
  row,
  previous,
  severity,
}: {
  row: HistoryRow;
  previous: HistoryRow | undefined;
  severity: "critical" | "warning" | "info";
}) {
  // Counts of a crawl that is still running or failed are partial.
  if (row.status !== "completed") return <span className="text-subtle">–</span>;
  const count = row.issues[severity];
  const compatible =
    previous &&
    row.comparison?.compatible &&
    row.comparison.previousAuditId === previous.id;
  const delta = compatible
    ? issueDelta(count, previous.issues[severity])
    : null;

  return (
    <div className="flex flex-col items-end gap-0.5">
      {count > 0 ? (
        <span
          className={`inline-flex rounded-full border px-2 text-xs font-medium ${CHIP[severity]}`}
        >
          {formatCount(count)}
        </span>
      ) : (
        <span className="text-xs text-muted">0</span>
      )}
      {delta && delta.diff !== 0 ? (
        <DeltaText delta={delta} current={count} />
      ) : null}
    </div>
  );
}

/** Fewer issues is the good direction; the arrow carries it, not the tint. */
function DeltaText({ delta, current }: { delta: IssueDelta; current: number }) {
  const fewer = delta.diff < 0;
  const Icon = fewer ? ArrowDown : ArrowUp;
  const before = current - delta.diff;
  /*
   * Counts, not a percentage, on a small base: 1 -> 0 printed "-%100,0",
   * which reads as a site transformed. The percentage only once the earlier
   * count is large enough for it to mean something.
   */
  const percent =
    delta.fraction === null || before < 20
      ? null
      : formatSignedPercent(delta.fraction);

  return (
    <span
      className={`inline-flex items-center gap-0.5 text-xs ${
        fewer ? "text-[var(--ink-success)]" : "text-[var(--ink-error)]"
      }`}
      title={t("Aynı siteye ait bir önceki denetime göre")}
    >
      <Icon className="size-3" aria-hidden />
      <span className="sr-only">{fewer ? t("azaldı") : t("arttı")} </span>
      {percent ?? `${formatCount(before)} → ${formatCount(current)}`}
    </span>
  );
}
