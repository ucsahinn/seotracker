import * as React from "react";
import { formatDateTime } from "@/client/lib/format";
import type { QuotaItem } from "@/server/features/quotas/quotaTypes";
import {
  meterValueText,
  percentUsed,
  remainingText,
  STATE_META,
  usageText,
} from "./quotaPresentation";

function freshnessText(item: QuotaItem): string {
  if (item.updatedAt)
    return `Son güncelleme: ${formatDateTime(item.updatedAt)}`;
  return item.used === null && item.limit === null
    ? "Henüz veri yok"
    : "Sabit sınır";
}

/**
 * One limit as a compact bar: label, state, used / limit, what is left, where
 * the number comes from and when it was last seen. With no ceiling there is no
 * bar, only status text: a bar needs a real denominator.
 */
export function QuotaMeter({
  item,
  showDetail = false,
}: {
  item: QuotaItem;
  showDetail?: boolean;
}) {
  const meta = STATE_META[item.state];
  const StateIcon = meta.icon;
  const percent = percentUsed(item);
  const labelId = React.useId();

  // Mount at zero and grow to the value; reduced motion skips the transition.
  const [shown, setShown] = React.useState(0);
  React.useEffect(() => {
    setShown(percent ?? 0);
  }, [percent]);

  const remaining = remainingText(item);

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between gap-3">
        <span id={labelId} className="text-sm font-medium">
          {item.label}
        </span>
        <span
          className={`inline-flex shrink-0 items-center gap-1 text-xs font-medium ${meta.inkClass}`}
        >
          <StateIcon className="size-3.5" aria-hidden />
          {meta.label}
        </span>
      </div>
      {percent !== null && item.used !== null && item.limit !== null ? (
        <div
          role="meter"
          aria-labelledby={labelId}
          aria-valuemin={0}
          aria-valuemax={item.limit}
          aria-valuenow={Math.min(item.used, item.limit)}
          aria-valuetext={meterValueText(item)}
          className="h-1.5 overflow-hidden rounded-full bg-base-200"
        >
          <div
            className={`h-full rounded-full transition-[width] duration-700 ease-out motion-reduce:transition-none ${meta.fillClass}`}
            style={{ width: `${shown}%` }}
          />
        </div>
      ) : null}
      <p className="flex flex-wrap justify-between gap-x-3 text-xs text-muted tabular-nums">
        <span>{usageText(item)}</span>
        {remaining ? <span>{remaining}</span> : null}
      </p>
      {showDetail ? <p className="text-xs text-muted">{item.detail}</p> : null}
      <p className="text-xs text-subtle">
        Kaynak: {item.source}. {freshnessText(item)}
      </p>
    </div>
  );
}
