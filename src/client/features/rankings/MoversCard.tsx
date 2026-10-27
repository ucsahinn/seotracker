import { t } from "@/shared/i18n";
import { ArrowDown, ArrowUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { formatCount, formatDecimal } from "@/client/lib/format";
import {
  topMovers,
  type MoveRow,
} from "@/client/features/rankings/rankingMoves";

type Row = MoveRow & { impressions: number };

function MoverList({
  title,
  icon: Icon,
  ink,
  up,
  rows,
  empty,
  onPick,
}: {
  title: string;
  icon: LucideIcon;
  /** Text colour for the position pair; the arrow beside the title carries direction too. */
  ink: string;
  /** Climbers or fallers: the arrow on every row says which. */
  up: boolean;
  rows: Row[];
  empty: string;
  onPick: (query: string) => void;
}) {
  return (
    <div className="min-w-0 flex-1">
      <h3 className="flex items-center gap-1.5 text-sm font-medium">
        <Icon className="size-4" aria-hidden />
        {title}
      </h3>
      {rows.length === 0 ? (
        <p className="mt-2 text-sm text-muted">{empty}</p>
      ) : (
        <ul className="stagger mt-2 divide-y divide-[var(--hairline)]">
          {rows.map((row) => (
            <li key={row.query}>
              <button
                type="button"
                className="flex w-full items-center justify-between gap-3 py-1.5 text-left text-sm hover:bg-base-200/50"
                onClick={() => onPick(row.query)}
              >
                <span className="min-w-0">
                  <span className="block truncate">{row.query}</span>
                  <span className="block text-xs text-muted tabular-nums">
                    {t("{from} → {to}. sıra · {impressions} gösterim", {
                      from: formatDecimal(row.previousPosition ?? 0),
                      to: formatDecimal(row.position),
                      impressions: formatCount(row.impressions),
                    })}
                  </span>
                </span>
                {/* Direction in the arrow and the word, not the tint alone. */}
                <span
                  className={`inline-flex shrink-0 items-center gap-0.5 text-sm font-medium tabular-nums ${ink}`}
                >
                  <Icon className="size-3.5" aria-hidden />
                  {t(up ? "{value} sıra yükseldi" : "{value} sıra geriledi", {
                    value: formatDecimal(Math.abs(row.delta ?? 0)),
                  })}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/**
 * The few queries that moved most since the previous window. A row opens that
 * query's history below the table, the same as clicking it in the table.
 */
export function MoversCard({
  rows,
  onPick,
}: {
  rows: Row[];
  onPick: (query: string) => void;
}) {
  const { risers, fallers } = topMovers(rows);
  return (
    <section
      aria-label={t("Yükselenler ve düşenler")}
      className="rounded-box border border-base-300 bg-base-100 px-4 py-4"
    >
      <h2 className="text-sm font-semibold">{t("Yükselenler ve düşenler")}</h2>
      <p className="mt-0.5 text-xs text-muted">
        {t(
          "Önceki aynı uzunluktaki döneme göre, gösterimle tartılarak: çok aranan bir sorgunun küçük hareketi az arananın büyük hareketinden önce gelir.",
        )}
      </p>
      <div className="mt-3 flex flex-col gap-6 md:flex-row">
        <MoverList
          title={t("En çok yükselenler")}
          icon={ArrowUp}
          ink="text-[var(--ink-success)]"
          up
          rows={risers}
          empty={t("Bu dönemde belirgin yükselen sorgu yok.")}
          onPick={onPick}
        />
        <MoverList
          title={t("En çok düşenler")}
          icon={ArrowDown}
          ink="text-[var(--ink-error)]"
          up={false}
          rows={fallers}
          empty={t("Bu dönemde belirgin düşen sorgu yok.")}
          onPick={onPick}
        />
      </div>
    </section>
  );
}
