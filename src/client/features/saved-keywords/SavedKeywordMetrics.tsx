import type { SavedEvidence } from "@/shared/savedWatchlist";
import { placesDelta } from "@/shared/delta";
import { formatCount } from "@/shared/format";
import { formatDecimal } from "@/client/lib/format";
import { t } from "@/shared/i18n";

export function SavedChange({ row }: { row?: SavedEvidence }) {
  const change = placesDelta(row?.position, row?.previousPosition);
  return (
    <span
      className={
        change && !change.neutral
          ? change.improved
            ? "text-[var(--ink-success)]"
            : "text-[var(--ink-error)]"
          : "text-muted"
      }
    >
      {change
        ? (!change.neutral ? (change.improved ? "↑ " : "↓ ") : "") + change.text
        : t("Karşılaştırma yok")}
    </span>
  );
}
/** A phone's record: the numbers under their labels, not run-on lines. */
export function SavedMetrics({
  row,
  comparable,
}: {
  row?: SavedEvidence;
  comparable: boolean;
}) {
  return (
    <dl className="flex flex-wrap gap-x-5 gap-y-2">
      <div>
        <dt className="text-xs whitespace-nowrap text-muted">
          {t("Ortalama sıra")}
        </dt>
        <dd className="text-sm tabular-nums">
          {row?.position == null ? (
            <span className="text-subtle">{t("Sıra bilinmiyor")}</span>
          ) : (
            formatDecimal(row.position)
          )}
        </dd>
      </div>
      <div>
        <dt className="text-xs whitespace-nowrap text-muted">
          {t("Gösterimler")}
        </dt>
        <dd className="text-sm tabular-nums">
          {row?.impressions == null ? "—" : formatCount(row.impressions)}
        </dd>
      </div>
      {comparable ? (
        <div>
          <dt className="text-xs whitespace-nowrap text-muted">
            {t("Değişim")}
          </dt>
          <dd className="text-sm tabular-nums">
            <SavedChange row={row} />
          </dd>
        </div>
      ) : null}
    </dl>
  );
}
