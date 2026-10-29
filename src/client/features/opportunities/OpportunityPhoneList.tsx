import { t } from "@/shared/i18n";
import { useState } from "react";
import { ChevronRight, Target } from "lucide-react";
import { EmptyState } from "@/client/components/EmptyState";
import { OpportunityAnalyticsLink } from "./OpportunityAnalyticsLink";
import { UrlText } from "./OpportunityColumns";
import {
  pathOf,
  rowAction,
  workColor,
  type OpportunityRow,
} from "./opportunityLogic";
import {
  formatNumber,
  formatCount,
  formatDecimal,
  formatPercent,
} from "@/client/lib/format";

/** A phone shows the first rows of the worklist; the rest are one tap away. */
const PHONE_ROWS = 10;

function PhoneStat({ label, value }: { label: string; value: string }) {
  return (
    <span className="min-w-0">
      <span className="block truncate text-xs text-muted">{label}</span>
      <span className="block text-sm tabular-nums">{value}</span>
    </span>
  );
}

/**
 * Phones get stacked records: the path (host dimmed), the work, then the
 * numbers under labels, and the whole record opens the detail. The first
 * rows only; the rest are one tap away.
 */
export function PhoneList({
  rows,
  gainUnknown,
  projectId,
  dateRange,
  onOpen,
  onReset,
}: {
  rows: OpportunityRow[];
  gainUnknown: boolean;
  projectId: string;
  dateRange?: { startDate: string; endDate: string };
  onOpen: (page: string) => void;
  onReset?: () => void;
}) {
  const [showAll, setShowAll] = useState(false);
  const shown = showAll ? rows : rows.slice(0, PHONE_ROWS);
  // "Sayfayı inceleyin" on every record is one fact: say it once above the
  // list and let the records carry only what differs.
  const sharedAction =
    rows.length > 1 &&
    rows.every((row) => rowAction(row) === rowAction(rows[0]))
      ? rows[0]
      : null;
  const allBrandOnly =
    rows.length > 1 && rows.every((row) => row.brandOnly === true);
  return (
    <>
      {sharedAction ? (
        <p className="flex items-center gap-1.5 px-3 text-xs text-muted sm:hidden">
          <span
            aria-hidden
            className="inline-block size-2 shrink-0 rounded-full"
            style={{ backgroundColor: workColor(sharedAction.work) }}
          />
          {t("Tüm sayfalar: {action}", { action: t(rowAction(sharedAction)) })}
          {allBrandOnly ? ` · ${t("Yalnızca marka aramaları")}` : null}
        </p>
      ) : null}
      <ul className="divide-y divide-[var(--hairline)] sm:hidden">
        {shown.map((row) => (
          <li key={row.page}>
            <button
              type="button"
              aria-haspopup="dialog"
              aria-label={`${t("Ayrıntı")}: ${pathOf(row.page)}`}
              className="flex w-full items-start gap-2 px-3 py-3 text-left active:bg-base-200"
              onClick={() => onOpen(row.page)}
            >
              <span className="min-w-0 flex-1 space-y-2">
                <span className="block text-sm font-medium break-words">
                  <UrlText url={row.page} />
                </span>
                {sharedAction && (allBrandOnly || !row.brandOnly) ? null : (
                  <span className="flex items-center gap-1.5 text-xs text-muted">
                    {sharedAction ? null : (
                      <span
                        aria-hidden
                        className="inline-block size-2 shrink-0 rounded-full"
                        style={{ backgroundColor: workColor(row.work) }}
                      />
                    )}
                    {sharedAction
                      ? t("Yalnızca marka aramaları")
                      : t(rowAction(row))}
                    {!sharedAction && row.brandOnly
                      ? ` · ${t("Yalnızca marka aramaları")}`
                      : null}
                  </span>
                )}
                {row.gainPerMonth !== null ? (
                  <span className="block text-sm font-semibold">
                    {t("En fazla +{gain} tıklama / 30 gün (üst sınır)", {
                      gain: formatCount(row.gainPerMonth),
                    })}
                  </span>
                ) : gainUnknown ? null : (
                  <span className="block text-xs text-muted">
                    {t("Kazanç bilinmiyor")}
                  </span>
                )}
                <span className="grid grid-cols-4 gap-2">
                  <PhoneStat
                    label={t("Sıra")}
                    value={formatDecimal(row.position)}
                  />
                  <PhoneStat
                    label={t("Gösterim")}
                    value={formatCount(row.impressions)}
                  />
                  <PhoneStat
                    label={t("Tıklama")}
                    value={formatCount(row.clicks)}
                  />
                  <PhoneStat
                    label={t("Tıklama oranı")}
                    value={formatPercent(row.ctr)}
                  />
                </span>
              </span>
              <ChevronRight
                aria-hidden
                className="mt-0.5 size-4 shrink-0 text-subtle"
              />
            </button>
            <span className="block px-3 pb-2 empty:hidden">
              <OpportunityAnalyticsLink
                row={row}
                projectId={projectId}
                dateRange={dateRange}
                compact
              />
            </span>
          </li>
        ))}
        {rows.length > shown.length ? (
          <li className="p-3">
            <button
              type="button"
              className="btn btn-sm w-full"
              onClick={() => setShowAll(true)}
            >
              {t("Tümünü göster ({count})", {
                count: formatNumber(rows.length),
              })}
            </button>
          </li>
        ) : null}
        {rows.length === 0 ? (
          <li>
            <EmptyState
              compact
              icon={Target}
              title={t("Bu filtreye uyan sayfa yok")}
              action={
                onReset ? (
                  <button
                    type="button"
                    className="btn min-h-11"
                    onClick={onReset}
                  >
                    {t("Filtreleri kaldır")}
                  </button>
                ) : undefined
              }
            />
          </li>
        ) : null}
      </ul>
    </>
  );
}
