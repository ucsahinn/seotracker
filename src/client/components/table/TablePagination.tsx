import { formatNumber } from "@/client/lib/format";
import { ChevronLeft, ChevronRight } from "lucide-react";

/*
 * Generic over the page-size union so a caller that offers `[50, 100, 250]`
 * gets `50 | 100 | 250` back from `onPageSizeChange` rather than a bare
 * `number` it then has to assert its way out of.
 */
type Props<Size extends number> = {
  page: number;
  pageSize: Size;
  pageSizes: readonly Size[];
  totalCount: number | null;
  hasNextPage: boolean;
  isLoading: boolean;
  onPageChange: (nextPage: number) => void;
  onPageSizeChange: (nextPageSize: Size) => void;
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

export function TablePagination<Size extends number>({
  page,
  pageSize,
  pageSizes,
  totalCount,
  hasNextPage,
  isLoading,
  onPageChange,
  onPageSizeChange,
}: Props<Size>) {
  const totalPages =
    totalCount != null ? Math.max(1, Math.ceil(totalCount / pageSize)) : null;
  const canGoPrev = page > 1;
  const canGoNext = totalPages != null ? page < totalPages : hasNextPage;

  return (
    <div className="flex flex-col gap-3 border-t border-base-300 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2 text-sm text-muted tabular-nums">
        {/* `1–50 / 120` is one value. Left to wrap it broke onto four lines
            in the narrow column it gets at tablet width. */}
        <span className="whitespace-nowrap">
          {formatRange(page, pageSize, totalCount)}
        </span>
        {isLoading ? (
          <span className="loading loading-spinner loading-xs" />
        ) : null}
      </div>

      {/*
       * Wraps. The page-size selector and the page controls together are
       * wider than a phone, and the card around this has `overflow-hidden`
       * -- so instead of scrolling to the next-page button, there was no
       * way to reach it at all. A pager you cannot press is not a pager.
       */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <label className="flex items-center gap-2 text-sm text-muted">
          <span className="whitespace-nowrap">Sayfa başına satır</span>
          <select
            className="select select-bordered select-sm w-20"
            value={pageSize}
            /*
             * Looked up in `pageSizes` rather than cast: the select's value
             * is a string, and `Number(...) as Size` would be a promise the
             * type checker cannot keep. A value that is not in the list is
             * ignored, which cannot happen through the UI and is the right
             * answer if it ever did.
             */
            onChange={(event) => {
              const next = pageSizes.find(
                (size) => String(size) === event.target.value,
              );
              if (next !== undefined) onPageSizeChange(next);
            }}
          >
            {pageSizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </label>

        <div className="flex items-center gap-2">
          <span className="whitespace-nowrap text-sm tabular-nums text-muted">
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
