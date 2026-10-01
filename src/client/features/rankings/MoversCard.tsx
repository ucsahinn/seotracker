import { ArrowDown, ArrowUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { formatDecimal } from "@/client/lib/format";
import {
  topMovers,
  type MoveRow,
} from "@/client/features/rankings/rankingMoves";

function MoverList({
  title,
  icon: Icon,
  ink,
  rows,
  empty,
  onPick,
}: {
  title: string;
  icon: LucideIcon;
  /** Text colour for the position pair; the arrow beside the title carries direction too. */
  ink: string;
  rows: MoveRow[];
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
                <span className="truncate">{row.query}</span>
                <span className={`shrink-0 tabular-nums ${ink}`}>
                  {formatDecimal(row.previousPosition ?? 0)} →{" "}
                  {formatDecimal(row.position)}
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
  rows: MoveRow[];
  onPick: (query: string) => void;
}) {
  const { risers, fallers } = topMovers(rows);
  return (
    <section
      aria-label="Yükselenler ve düşenler"
      className="rounded-box border border-base-300 bg-base-100 px-4 py-4"
    >
      <h2 className="text-sm font-semibold">Yükselenler ve düşenler</h2>
      <div className="mt-3 flex flex-col gap-6 md:flex-row">
        <MoverList
          title="En çok yükselenler"
          icon={ArrowUp}
          ink="text-[var(--ink-success)]"
          rows={risers}
          empty="Bu dönemde belirgin yükselen sorgu yok."
          onPick={onPick}
        />
        <MoverList
          title="En çok düşenler"
          icon={ArrowDown}
          ink="text-[var(--ink-error)]"
          rows={fallers}
          empty="Bu dönemde belirgin düşen sorgu yok."
          onPick={onPick}
        />
      </div>
    </section>
  );
}
