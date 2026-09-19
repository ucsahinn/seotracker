import { formatNumber } from "@/client/lib/format";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  page: number;
  pageSize: number;
  pageSizes: readonly number[];
  totalCount: number | null;
  hasNextPage: boolean;
  isLoading: boolean;
  onPageChange: (nextPage: number) => void;
  onPageSizeChange: (nextPageSize: number) => void;
};

function formatRange(
  page: number,
  pageSize: number,
  totalCount: number | null,
) {
  const start = (page - 1) * pageSize + 1;
  if (totalCount == null) {
    return `${formatNumber(start)}–${formatNumber(start + pageSize - 1)}`;
  }
  if (totalCount === 0) return "0";
  const end = Math.min(totalCount, start + pageSize - 1);
  return `${formatNumber(start)}–${formatNumber(end)} / ${formatNumber(totalCount)}`;
}

export function TablePagination({
  page,
  pageSize,
  pageSizes,
  totalCount,
  hasNextPage,
  isLoading,
  onPageChange,
  onPageSizeChange,
}: Props) {
  const totalPages =
    totalCount != null ? Math.max(1, Math.ceil(totalCount / pageSize)) : null;
  const canGoPrev = page > 1;
  const canGoNext = totalPages != null ? page < totalPages : hasNextPage;

  return (
    <div className="flex flex-col gap-3 border-t border-base-300 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2 text-sm text-base-content/70 tabular-nums">
        <span>{formatRange(page, pageSize, totalCount)}</span>
        {isLoading ? (
          <span className="loading loading-spinner loading-xs" />
        ) : null}
      </div>

      <div className="flex items-center gap-6">
        <label className="flex items-center gap-2 text-sm text-base-content/70">
          <span className="whitespace-nowrap">Sayfa başına satır</span>
          <select
            className="select select-bordered select-sm w-20"
            value={pageSize}
            onChange={(event) => onPageSizeChange(Number(event.target.value))}
          >
            {pageSizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </label>

        <div className="flex items-center gap-2">
          <span className="whitespace-nowrap text-sm tabular-nums text-base-content/70">
            Sayfa {formatNumber(page)}
            {totalPages != null ? ` / ${formatNumber(totalPages)}` : ""}
          </span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              aria-label="Önceki sayfa"
              className="btn btn-ghost btn-sm btn-square"
              disabled={!canGoPrev || isLoading}
              onClick={() => onPageChange(page - 1)}
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Sonraki sayfa"
              className="btn btn-ghost btn-sm btn-square"
              disabled={!canGoNext || isLoading}
              onClick={() => onPageChange(page + 1)}
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
