import { t } from "@/shared/i18n";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { formatCount, formatPercent } from "@/client/lib/format";
import type { TableSort } from "@/client/features/search-performance/searchPerformanceQueries";
import {
  LOW_CTR_MIN_IMPRESSIONS,
  LOW_CTR_THRESHOLD,
  type QuickFilterId,
} from "@/client/features/search-performance/quickFilters";
import type {
  SearchPerformanceTableDimension,
  SearchTableSortColumn,
} from "@/types/schemas/search-performance";

/** Turkish source labels and hints; translated where they render. */
export const CHIPS: Record<
  SearchPerformanceTableDimension,
  Array<{ id: QuickFilterId; label: string; hint: string }>
> = {
  query: [
    {
      id: "top10",
      label: "İlk 10'da",
      hint: "Ortalama sırası 10 veya daha iyi olanlar; yani Google'ın ilk sayfası.",
    },
    {
      id: "pos4to10",
      label: "Sıra 4-10",
      hint: "İlk sayfada ama ilk üçte değil: en çok tıklama kazandıran adım ilk üçe çıkmaktır.",
    },
    {
      id: "pos11to20",
      label: "Sıra 11-20",
      hint: "İkinci sayfa. İlk sayfaya girmek tıklamayı en çok artıran adımdır.",
    },
    {
      id: "lowCtr",
      label: "Tıklama oranı düşük",
      hint: "İlk sayfada olup {impressions} veya daha fazla gösterim alan ve tıklama oranı {ctr} altında kalan satırlar. Başlığı ve açıklamayı iyileştirmeye değer.",
    },
    {
      id: "noClicks",
      label: "Hiç tıklanmayan",
      hint: "Gösterilmiş ama bir kez bile tıklanmamış satırlar.",
    },
  ],
  page: [
    {
      id: "top10",
      label: "İlk 10'da",
      hint: "Ortalama sırası 10 veya daha iyi olanlar; yani Google'ın ilk sayfası.",
    },
    {
      id: "hasClicks",
      label: "Tıklanan",
      hint: "En az bir tıklama almış satırlar.",
    },
    {
      id: "lowCtr",
      label: "Tıklama oranı düşük",
      hint: "İlk sayfada olup {impressions} veya daha fazla gösterim alan ve tıklama oranı {ctr} altında kalan satırlar. Başlığı ve açıklamayı iyileştirmeye değer.",
    },
    {
      id: "noClicks",
      label: "Hiç tıklanmayan",
      hint: "Gösterilmiş ama bir kez bile tıklanmamış satırlar.",
    },
  ],
};

export const COLUMNS: Array<{
  id: SearchTableSortColumn;
  label: string;
  className?: string;
}> = [
  { id: "clicks", label: "Tıklama" },
  { id: "clickChange", label: "Tıklama farkı", className: "max-sm:hidden" },
  { id: "impressions", label: "Gösterim", className: "hidden md:table-cell" },
  { id: "ctr", label: "Tıklama oranı", className: "hidden lg:table-cell" },
  { id: "position", label: "Sıra" },
];

export function SortButton({
  column,
  label,
  sort,
  onSort,
}: {
  column: SearchTableSortColumn;
  label: string;
  sort: TableSort | undefined;
  onSort: (next: TableSort | undefined) => void;
}) {
  // No explicit sort means Google's order: clicks, high to low.
  const active =
    sort?.column === column || (!sort && column === "clicks")
      ? (sort?.direction ?? "desc")
      : null;
  const Icon =
    active === "asc" ? ArrowUp : active === "desc" ? ArrowDown : ArrowUpDown;
  return (
    <button
      type="button"
      className="inline-flex items-center gap-1 rounded-field font-medium hover:text-base-content focus-visible:outline-2 focus-visible:outline-primary"
      onClick={() =>
        onSort({
          column,
          // Position reads best ascending; everything else best descending.
          direction:
            active === null
              ? column === "position"
                ? "asc"
                : "desc"
              : active === "desc"
                ? "asc"
                : "desc",
        })
      }
    >
      {label}
      <Icon className="size-3 opacity-70" aria-hidden />
    </button>
  );
}

export function ariaSort(
  column: SearchTableSortColumn,
  sort: TableSort | undefined,
): "ascending" | "descending" | "none" {
  if (!sort) return column === "clicks" ? "descending" : "none";
  if (sort.column !== column) return "none";
  return sort.direction === "asc" ? "ascending" : "descending";
}

/** One-click row filters, applied on the server over every fetched row. */
export function QuickChips({
  dimension,
  active,
  onChange,
}: {
  dimension: SearchPerformanceTableDimension;
  active: QuickFilterId | undefined;
  onChange: (next: QuickFilterId | undefined) => void;
}) {
  return (
    <div
      role="group"
      aria-label={t("Hızlı filtreler")}
      className="flex flex-wrap gap-1.5"
    >
      {CHIPS[dimension].map((chip) => {
        const pressed = active === chip.id;
        return (
          <button
            key={chip.id}
            type="button"
            aria-pressed={pressed}
            title={t(chip.hint, {
              impressions: formatCount(LOW_CTR_MIN_IMPRESSIONS),
              ctr: formatPercent(LOW_CTR_THRESHOLD, 0),
            })}
            onClick={() => onChange(pressed ? undefined : chip.id)}
            className={`shrink-0 whitespace-nowrap rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
              pressed
                ? "border-primary bg-primary/10 text-[var(--ink-primary)]"
                : "border-[var(--control-border)] bg-base-100 hover:bg-base-200/60"
            }`}
          >
            {t(chip.label)}
          </button>
        );
      })}
    </div>
  );
}

export function ClickChange({ value }: { value: number | null }) {
  if (value === null) {
    return (
      <span className="text-subtle" title={t("Önceki dönemde bilinmiyor")}>
        –
      </span>
    );
  }
  if (value === 0) return <span className="text-subtle">0</span>;
  const up = value > 0;
  return (
    <span
      className={up ? "text-[var(--ink-success)]" : "text-[var(--ink-error)]"}
    >
      <span aria-hidden>{up ? "↑" : "↓"}</span>
      <span className="sr-only">{up ? t("arttı") : t("azaldı")} </span>
      {formatCount(Math.abs(value))}
    </span>
  );
}
