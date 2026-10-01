import { formatNumber } from "@/client/lib/format";
import { RotateCcw, SlidersHorizontal } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import type {
  PagesFilters,
  PerformanceFilters,
} from "@/client/features/audit/results/AuditResultsTableFilterLogic";

const SEARCH_DEBOUNCE_MS = 200;

export function PagesFilterBar({
  filters,
  onChange,
  activeFilterCount,
  onReset,
}: {
  filters: PagesFilters;
  onChange: (filters: PagesFilters) => void;
  activeFilterCount: number;
  onReset: () => void;
}) {
  return (
    <FilterPanel activeFilterCount={activeFilterCount} onReset={onReset}>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        <TextFilter
          label="Ara"
          value={filters.query}
          placeholder="Adres, başlık, açıklama"
          onChange={(query) => onChange({ ...filters, query })}
        />
        <SelectFilter
          label="Durum"
          value={filters.status}
          onChange={(status) => onChange({ ...filters, status })}
          options={[
            ["all", "Tümü"],
            ["ok", "2xx"],
            ["redirect", "3xx"],
            ["error", "4xx/5xx"],
            ["missing", "Ulaşılamadı"],
          ]}
        />
        <SelectFilter
          label="Alt metni"
          value={filters.missingAlt}
          onChange={(missingAlt) => onChange({ ...filters, missingAlt })}
          options={[
            ["all", "Tümü"],
            ["yes", "Alt metni yok"],
            ["no", "Alt metni tam"],
          ]}
        />
      </div>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <SelectFilter
          label="Dizinlenebilir"
          value={filters.indexable}
          onChange={(indexable) => onChange({ ...filters, indexable })}
          options={[
            ["all", "Tümü"],
            ["yes", "Evet"],
            ["no", "Hayır (noindex)"],
          ]}
        />
        <SelectFilter
          label="Site haritası"
          value={filters.inSitemap}
          onChange={(inSitemap) => onChange({ ...filters, inSitemap })}
          options={[
            ["all", "Tümü"],
            ["yes", "Haritada"],
            ["no", "Haritada yok"],
          ]}
        />
      </div>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
        <RangeFilter
          label="Ana sayfadan uzaklık (tık)"
          min={filters.minDepth}
          max={filters.maxDepth}
          onMinChange={(minDepth) => onChange({ ...filters, minDepth })}
          onMaxChange={(maxDepth) => onChange({ ...filters, maxDepth })}
        />
        <RangeFilter
          label="Kelime"
          min={filters.minWords}
          max={filters.maxWords}
          onMinChange={(minWords) => onChange({ ...filters, minWords })}
          onMaxChange={(maxWords) => onChange({ ...filters, maxWords })}
        />
        <RangeFilter
          label="Yanıt süresi (ms)"
          min={filters.minResponseMs}
          max={filters.maxResponseMs}
          onMinChange={(minResponseMs) =>
            onChange({ ...filters, minResponseMs })
          }
          onMaxChange={(maxResponseMs) =>
            onChange({ ...filters, maxResponseMs })
          }
        />
      </div>
    </FilterPanel>
  );
}

export function PerformanceFilterBar({
  filters,
  onChange,
  activeFilterCount,
  onReset,
}: {
  filters: PerformanceFilters;
  onChange: (filters: PerformanceFilters) => void;
  activeFilterCount: number;
  onReset: () => void;
}) {
  return (
    <FilterPanel activeFilterCount={activeFilterCount} onReset={onReset}>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
        <TextFilter
          label="Ara"
          value={filters.query}
          placeholder="Adres"
          onChange={(query) => onChange({ ...filters, query })}
        />
        <SelectFilter
          label="Cihaz"
          value={filters.device}
          onChange={(device) => onChange({ ...filters, device })}
          options={[
            ["all", "Tümü"],
            ["desktop", "Masaüstü"],
            ["mobile", "Mobil"],
          ]}
        />
        <SelectFilter
          label="Durum"
          value={filters.status}
          onChange={(status) => onChange({ ...filters, status })}
          options={[
            ["all", "Tümü"],
            ["ok", "Başarılı"],
            ["failed", "Başarısız"],
          ]}
        />
        <TextFilter
          label="En çok LCP (sn)"
          value={filters.maxLcpSeconds}
          placeholder="2.5"
          type="number"
          onChange={(maxLcpSeconds) => onChange({ ...filters, maxLcpSeconds })}
        />
      </div>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
        <RangeFilter
          label="Perf"
          min={filters.minPerf}
          max={filters.maxPerf}
          onMinChange={(minPerf) => onChange({ ...filters, minPerf })}
          onMaxChange={(maxPerf) => onChange({ ...filters, maxPerf })}
        />
        <RangeFilter
          label="SEO"
          min={filters.minSeo}
          max={filters.maxSeo}
          onMinChange={(minSeo) => onChange({ ...filters, minSeo })}
          onMaxChange={(maxSeo) => onChange({ ...filters, maxSeo })}
        />
      </div>
    </FilterPanel>
  );
}

/**
 * An empty table means two different things and the operator can act on
 * only one of them.
 *
 * This said "nothing matched your filters" unconditionally, so an audit
 * that crawled nothing, or one with no Lighthouse rows, blamed a filter
 * nobody had set. `DimensionTable` and the saved-keywords table already
 * branch on this.
 */
export function EmptyTableMessage({
  label,
  filteredLabel,
  hasActiveFilter = false,
}: {
  /** Shown when the table is genuinely empty. */
  label: string;
  /** Shown when a filter is what emptied it. */
  filteredLabel?: string;
  hasActiveFilter?: boolean;
}) {
  return (
    <div className="py-6 text-center text-muted">
      {hasActiveFilter && filteredLabel ? filteredLabel : label}
    </div>
  );
}

export function TableFilterToggle({
  showFilters,
  onToggle,
  activeFilterCount,
  resultCount,
  totalCount,
}: {
  showFilters: boolean;
  onToggle: () => void;
  activeFilterCount: number;
  resultCount: number;
  totalCount: number;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-base-300 px-4 py-2.5">
      <button
        className={`btn btn-ghost btn-sm gap-1.5 ${showFilters ? "btn-active" : ""}`}
        onClick={onToggle}
        title="Filtreleri aç/kapat"
        type="button"
      >
        <SlidersHorizontal className="size-3.5" />
        Filtreler
        {activeFilterCount > 0 ? (
          <span className="badge badge-xs badge-primary border-0 text-primary-content">
            {activeFilterCount}
          </span>
        ) : null}
      </button>
      <span className="text-sm tabular-nums text-muted">
        {formatNumber(resultCount)} / {formatNumber(totalCount)}
      </span>
    </div>
  );
}

export function countActiveFilters<TFilters extends Record<string, string>>(
  filters: TFilters,
  emptyFilters: TFilters,
) {
  return Object.keys(filters).reduce((count, key) => {
    const filterKey = key as keyof TFilters;
    return filters[filterKey] !== emptyFilters[filterKey] ? count + 1 : count;
  }, 0);
}

function FilterPanel({
  activeFilterCount,
  onReset,
  children,
}: {
  activeFilterCount: number;
  onReset: () => void;
  children: ReactNode;
}) {
  return (
    <div className="space-y-3 border-b border-base-300 bg-base-200/25 px-4 py-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold">Sonuçları filtrele</p>
          {activeFilterCount > 0 ? (
            <span className="badge badge-xs badge-primary border-0 text-primary-content">
              {activeFilterCount} etkin
            </span>
          ) : null}
        </div>
        <button
          type="button"
          className="btn btn-xs btn-ghost gap-1"
          onClick={onReset}
          disabled={activeFilterCount === 0}
        >
          <RotateCcw className="size-3" />
          Tümünü temizle
        </button>
      </div>
      {children}
    </div>
  );
}

function TextFilter({
  label,
  value,
  placeholder,
  type = "text",
  onChange,
}: {
  label: string;
  value: string;
  placeholder: string;
  type?: "text" | "number";
  onChange: (value: string) => void;
}) {
  /*
   * Text is held locally and committed after a short pause: every commit
   * re-filters every crawled page, so doing it per keystroke made typing
   * lag on a large audit. Number inputs commit immediately. An outside
   * change to `value` (the filter reset) replaces the draft.
   */
  const delay = type === "text" ? SEARCH_DEBOUNCE_MS : 0;
  const [draft, setDraft] = useState(value);
  const committed = useRef(value);
  const onChangeRef = useRef(onChange);
  useEffect(() => {
    onChangeRef.current = onChange;
  });
  useEffect(() => {
    if (value === committed.current) return;
    committed.current = value;
    setDraft(value);
  }, [value]);
  useEffect(() => {
    if (draft === committed.current) return;
    const timer = setTimeout(() => {
      committed.current = draft;
      onChangeRef.current(draft);
    }, delay);
    return () => clearTimeout(timer);
  }, [draft, delay]);

  return (
    <label className="form-control gap-1.5">
      <span className="text-[11px] font-semibold uppercase tracking-wide text-muted">
        {label}
      </span>
      <input
        className="input input-bordered input-sm w-full bg-base-100"
        type={type}
        value={draft}
        placeholder={placeholder}
        onChange={(event) => setDraft(event.target.value)}
      />
    </label>
  );
}

function RangeFilter({
  label,
  min,
  max,
  onMinChange,
  onMaxChange,
}: {
  label: string;
  min: string;
  max: string;
  onMinChange: (value: string) => void;
  onMaxChange: (value: string) => void;
}) {
  return (
    <div className="space-y-2 rounded-box border border-base-300 bg-base-100 p-2.5">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">
        {label}
      </p>
      {/*
       * Named individually. The heading above is a <p> that labels nothing,
       * and the placeholders are the only other text -- so with five of
       * these on one filter panel a screen reader heard "Min, Max, Min,
       * Max, Min, Max" with no way to tell crawl depth from word count.
       */}
      <div className="grid grid-cols-2 gap-2">
        <input
          className="input input-bordered input-xs bg-base-100"
          type="number"
          value={min}
          placeholder="En az"
          aria-label={`${label} en az`}
          onChange={(event) => onMinChange(event.target.value)}
        />
        <input
          className="input input-bordered input-xs bg-base-100"
          type="number"
          value={max}
          placeholder="En fazla"
          aria-label={`${label} en fazla`}
          onChange={(event) => onMaxChange(event.target.value)}
        />
      </div>
    </div>
  );
}

function SelectFilter<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: Array<[T, string]>;
  onChange: (value: T) => void;
}) {
  return (
    <label className="form-control gap-1.5">
      <span className="text-[11px] font-semibold uppercase tracking-wide text-muted">
        {label}
      </span>
      <select
        className="select select-bordered select-sm w-full bg-base-100"
        value={value}
        onChange={(event) => {
          const selected = options.find(
            ([optionValue]) => optionValue === event.target.value,
          )?.[0];
          if (selected != null) onChange(selected);
        }}
      >
        {options.map(([optionValue, optionLabel]) => (
          <option key={optionValue} value={optionValue}>
            {optionLabel}
          </option>
        ))}
      </select>
    </label>
  );
}
