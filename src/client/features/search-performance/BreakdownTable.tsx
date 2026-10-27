import { t } from "@/shared/i18n";
import * as React from "react";
import { formatCount, formatDecimal, formatPercent } from "@/client/lib/format";
import type { Breakdown } from "@/shared/searchPerformanceView";

export function ShareBar({ share }: { share: number | null }) {
  return (
    <span className="mt-1 block h-1 overflow-hidden rounded-full bg-[var(--mark-track)]">
      <span
        className="block h-full rounded-full bg-primary/80"
        style={{ width: `${Math.max(0, Math.min(1, share ?? 0)) * 100}%` }}
      />
    </span>
  );
}

function baseNote(breakdown: Breakdown): string {
  return breakdown.baseKind === "siteTotal"
    ? t(
        "Paylar sitenin toplamına göre: {clicks} tıklama, {impressions} gösterim.",
        {
          clicks: formatCount(breakdown.base.clicks),
          impressions: formatCount(breakdown.base.impressions),
        },
      )
    : t(
        "Bu kırılımda filtre olduğu için paylar satırların toplamına göre: {clicks} tıklama.",
        { clicks: formatCount(breakdown.base.clicks) },
      );
}

/** A breakdown as a table: share bars under the name, every number in text. */
export function BreakdownTable({
  caption,
  breakdown,
  label,
  limit,
  selected,
  onSelect,
}: {
  caption: string;
  breakdown: Breakdown;
  label: (key: string) => string;
  limit?: number;
  selected?: string;
  onSelect?: (key: string | undefined) => void;
}) {
  const [all, setAll] = React.useState(false);
  const rows = limit && !all ? breakdown.rows.slice(0, limit) : breakdown.rows;
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto">
        <table className="table table-sm">
          <caption className="sr-only">{caption}</caption>
          <thead>
            <tr className="text-muted">
              <th scope="col" className="w-full">
                {caption}
              </th>
              <th scope="col" className="text-right">
                {t("Tıklama")}
              </th>
              <th scope="col" className="text-right">
                {t("Pay")}
              </th>
              <th scope="col" className="hidden text-right sm:table-cell">
                {t("Gösterim")}
              </th>
              <th scope="col" className="hidden text-right md:table-cell">
                {t("Tıklama oranı")}
              </th>
              <th scope="col" className="text-right">
                {t("Sıra")}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const name = label(row.key);
              const isSelected = selected === row.key;
              return (
                <tr key={row.key} className={isSelected ? "bg-primary/5" : ""}>
                  <td className="max-w-0">
                    {onSelect ? (
                      <button
                        type="button"
                        aria-pressed={isSelected}
                        className="block max-w-full truncate text-left hover:underline focus-visible:outline-2 focus-visible:outline-primary"
                        title={
                          isSelected
                            ? t("{name} filtresini kaldır", { name })
                            : t("Tüm ekranı {name} ile daralt", { name })
                        }
                        onClick={() =>
                          onSelect(isSelected ? undefined : row.key)
                        }
                      >
                        {name}
                        {isSelected ? ` · ${t("seçili")}` : ""}
                      </button>
                    ) : (
                      <span className="block truncate" title={name}>
                        {name}
                      </span>
                    )}
                    <ShareBar share={row.clickShare} />
                  </td>
                  <td className="text-right tabular-nums">
                    {formatCount(row.clicks)}
                  </td>
                  <td className="text-right tabular-nums">
                    {row.clickShare === null
                      ? "–"
                      : formatPercent(row.clickShare)}
                  </td>
                  <td className="hidden text-right tabular-nums sm:table-cell">
                    {formatCount(row.impressions)}
                  </td>
                  <td className="hidden text-right tabular-nums md:table-cell">
                    {row.ctr === null ? "–" : formatPercent(row.ctr)}
                  </td>
                  <td className="text-right tabular-nums">
                    {row.position === null ? "–" : formatDecimal(row.position)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 pt-2 text-xs text-muted">
        <span>{baseNote(breakdown)}</span>
        {limit && breakdown.rows.length > limit ? (
          <button
            type="button"
            className="btn btn-ghost btn-xs"
            aria-expanded={all}
            onClick={() => setAll((v) => !v)}
          >
            {all
              ? t("Daha az göster")
              : t("Tümünü göster ({count})", { count: breakdown.rows.length })}
          </button>
        ) : null}
      </div>
      {breakdown.truncated ? (
        <p className="px-4 pt-1 text-xs text-muted">
          {t("Google'ın satır sınırına ulaşıldı; liste tam değil.")}
        </p>
      ) : null}
    </div>
  );
}
