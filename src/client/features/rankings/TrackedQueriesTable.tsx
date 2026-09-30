import { useNavigate } from "@tanstack/react-router";
import type { UseQueryResult } from "@tanstack/react-query";
import { Copy, Search, TrendingUp } from "lucide-react";
import { EmptyState } from "@/client/components/EmptyState";
import { QueryErrorState } from "@/client/components/QueryErrorState";
import { RowActions } from "@/client/components/table/RowActions";
import { SortableHeader } from "@/client/components/table/SortableHeader";
import type { useLocalSort } from "@/client/components/table/useLocalSort";
import type { SortKey } from "@/client/features/rankings/rankingsSort";
import { PositionChange } from "@/client/features/rankings/PositionChange";
import { formatDecimal, formatNumber } from "@/client/lib/format";

type Row = {
  query: string;
  position: number;
  impressions: number;
  clicks: number;
  days: number;
  previousPosition: number | null;
  delta: number | null;
};

/** The tracked-queries table: sortable header, states, and per-row actions. */
export function TrackedQueriesTable({
  projectId,
  rows,
  sorting,
  tracked,
  selected,
  onSelect,
  emptyTitle,
  emptyDescription,
}: {
  projectId: string;
  rows: Row[];
  sorting: ReturnType<typeof useLocalSort<SortKey>>;
  tracked: Pick<
    UseQueryResult,
    "isLoading" | "isPending" | "isError" | "error" | "refetch"
  >;
  selected: string | null;
  onSelect: (query: string | null) => void;
  emptyTitle: string;
  emptyDescription: string;
}) {
  const navigate = useNavigate();
  return (
    <table className="table table-sm">
      <thead>
        <tr>
          <th aria-sort={sorting.ariaSort("query")}>
            <SortableHeader
              column={sorting.column("query", false)}
              label="Sorgu"
            />
          </th>
          <th className="text-right" aria-sort={sorting.ariaSort("position")}>
            <SortableHeader
              column={sorting.column("position", false)}
              label="Ort. sıra"
              align="right"
            />
          </th>
          <th className="text-right" aria-sort={sorting.ariaSort("delta")}>
            <SortableHeader
              column={sorting.column("delta")}
              label="Değişim"
              align="right"
            />
          </th>
          <th
            className="text-right"
            aria-sort={sorting.ariaSort("impressions")}
          >
            <SortableHeader
              column={sorting.column("impressions")}
              label="Gösterim"
              align="right"
            />
          </th>
          <th className="text-right" aria-sort={sorting.ariaSort("clicks")}>
            <SortableHeader
              column={sorting.column("clicks")}
              label="Tıklama"
              align="right"
            />
          </th>
          <th className="text-right" aria-sort={sorting.ariaSort("days")}>
            <SortableHeader
              column={sorting.column("days")}
              label="Gün"
              align="right"
            />
          </th>
          <th />
        </tr>
      </thead>
      <tbody>
        {/* `tracked` is disabled until the sync settles, and a disabled
                query reports `isLoading: false` - so while the first archive
                sync ran (up to half a minute of paginated Search Console
                requests) this table stated there were no queries, directly
                under a header saying the archive was still updating. */}
        {rows.length === 0 && !tracked.isLoading && !tracked.isPending ? (
          <tr>
            <td colSpan={7} className="p-0">
              <EmptyState
                compact
                icon={TrendingUp}
                title={emptyTitle}
                description={emptyDescription}
              />
            </td>
          </tr>
        ) : null}
        {/* Shaped like the rows that are coming, not a sentence in a
                merged cell: the house rule asks for a skeleton so the table
                does not change height when the archive lands. */}
        {tracked.isPending
          ? Array.from({ length: 6 }, (_, index) => (
              <tr key={`skeleton-${index}`} aria-hidden>
                <td>
                  <div className="skeleton h-4 w-40" />
                </td>
                {Array.from({ length: 5 }, (__, cell) => (
                  <td key={cell}>
                    <div className="skeleton ml-auto h-4 w-12" />
                  </td>
                ))}
              </tr>
            ))
          : null}
        {tracked.isError ? (
          <tr>
            <td colSpan={7}>
              <QueryErrorState
                compact
                error={tracked.error}
                onRetry={() => void tracked.refetch()}
                title="Sorgular yüklenemedi"
              />
            </td>
          </tr>
        ) : null}
        {rows.map((row) => (
          <tr
            key={row.query}
            className={selected === row.query ? "bg-base-200/60" : undefined}
          >
            {/* A real button, not a click handler on the row. Opening a
                      query's history is the whole point of this screen, and
                      on a bare <tr> it was reachable with a mouse and nothing
                      else. A button also picks up the app's focus ring. */}
            <td className="max-w-md p-0">
              <button
                type="button"
                className="w-full truncate px-4 py-2 text-left transition-colors hover:bg-base-200/50"
                aria-expanded={selected === row.query}
                onClick={() =>
                  onSelect(selected === row.query ? null : row.query)
                }
              >
                {row.query}
              </button>
            </td>
            <td className="text-right tabular-nums">
              {formatDecimal(row.position)}
            </td>
            <td className="text-right tabular-nums">
              <PositionChange delta={row.delta} />
            </td>
            <td className="text-right tabular-nums">
              {formatNumber(row.impressions)}
            </td>
            <td className="text-right tabular-nums">
              {formatNumber(row.clicks)}
            </td>
            <td className="text-right tabular-nums text-muted">
              {formatNumber(row.days)}
            </td>
            {/*
             * Row actions. An operator looking at a query that dropped
             * nine positions could not copy it, save it, or jump to its
             * Search Console rows -- the four cells beside the
             * disclosure button were inert.
             */}
            <td className="w-10 text-right">
              <RowActions
                label={`${row.query} için işlemler`}
                actions={[
                  {
                    label: "Kelimeyi kopyala",
                    icon: Copy,
                    onSelect: () =>
                      void navigator.clipboard.writeText(row.query),
                  },
                  {
                    label: "Arama performansında ara",
                    icon: Search,
                    onSelect: () =>
                      void navigate({
                        to: "/p/$projectId/search-performance",
                        params: { projectId },
                        search: { tab: "queries" as const, q: row.query },
                      }),
                  },
                ]}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
