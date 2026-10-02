import { Link, useNavigate } from "@tanstack/react-router";
import {
  Clock,
  FileText,
  LayoutTemplate,
  List,
  Search,
  Sparkles,
  Trash2,
  type LucideIcon,
} from "lucide-react";
import { useRef, useState } from "react";
import { CopyButton } from "@/client/components/CopyButton";
import { EmptyState } from "@/client/components/EmptyState";
import { RowActions } from "@/client/components/table/RowActions";
import { SortableHeader } from "@/client/components/table/SortableHeader";
import { TablePagination } from "@/client/components/table/TablePagination";
import {
  compareText,
  useLocalSort,
} from "@/client/components/table/useLocalSort";
import { ReportDownloadButton } from "@/client/features/reports/ReportDownloadButton";
import { ReportKindChip } from "@/client/features/reports/ReportKindChip";
import { reportRequestPrompt } from "@/client/features/reports/reportRequestPrompt";
import { ReportsSummary } from "@/client/features/reports/ReportsSummary";
import {
  filterCounts,
  hasTemplate,
  isInteractiveTarget,
  matchesFilter,
  kindLabel,
  reportKind,
  type ReportFilter,
} from "@/client/features/reports/reportStats";
import { formatCreatedBy } from "@/client/features/reports/shared";
import { formatBytes, formatDateTime } from "@/client/lib/format";
import type { ReportListItem } from "@/serverFunctions/reports";
import { REPORT_APP_LIST_LIMIT } from "@/types/schemas/reports";

const PAGE_SIZES = [25, 50, 100] as const;

type SortKey = "title" | "kind" | "createdAt" | "sizeBytes";

const FILTERS: { key: ReportFilter; label: string; icon: LucideIcon }[] = [
  { key: "all", label: "Tümü", icon: List },
  { key: "recent", label: "Son 7 gün", icon: Clock },
  { key: "template", label: "Şablonla yazılan", icon: LayoutTemplate },
  { key: "skill", label: "Beceriyle yazılan", icon: Sparkles },
];

function compareReports(
  a: ReportListItem,
  b: ReportListItem,
  key: SortKey,
): number {
  switch (key) {
    case "title":
      return compareText(a.title, b.title);
    case "kind":
      return compareText(kindLabel(reportKind(a)), kindLabel(reportKind(b)));
    case "createdAt":
      return Date.parse(a.createdAt) - Date.parse(b.createdAt);
    case "sizeBytes":
      return a.sizeBytes - b.sizeBytes;
  }
}

export function ReportsList({
  projectId,
  reports,
  onDelete,
}: {
  projectId: string;
  reports: ReportListItem[];
  onDelete: (report: ReportListItem) => void;
}) {
  const [filter, setFilter] = useState<ReportFilter>("all");
  const [kind, setKind] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const filtersRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<(typeof PAGE_SIZES)[number]>(25);
  const sorting = useLocalSort<SortKey>({ key: "createdAt", desc: true });
  const navigate = useNavigate();

  if (reports.length === 0) {
    return (
      <EmptyState
        icon={FileText}
        title="Henüz rapor yok"
        description="İlk raporu iki yoldan alabilirsiniz: ajanınıza yazdırın ya da Site denetimi ekranından indirin. Aşağıdaki iki kutu anlatıyor."
        action={
          <div className="flex flex-wrap items-center justify-center gap-2">
            <CopyButton
              primary
              value={reportRequestPrompt(projectId)}
              label="Yeni rapor iste"
              successMessage="İstem kopyalandı, ajanınıza yapıştırın"
            />
            <Link to="/ai" className="btn btn-ghost btn-sm">
              Ajan kurulumunu aç
            </Link>
          </div>
        }
      />
    );
  }

  const now = Date.now();
  const counts = filterCounts(reports, now);
  // The summary reads this set, so its tiles and ring agree with the table;
  // only the kind ring is left out, because it is the control that narrows
  // by kind and must keep showing every kind in the set.
  const chipFiltered = reports.filter((report) =>
    matchesFilter(report, filter, now),
  );
  // A kind whose last report was deleted would otherwise keep filtering to an
  // empty table with no ring segment left to deselect.
  const activeKind =
    kind !== null && chipFiltered.some((report) => reportKind(report) === kind)
      ? kind
      : null;
  const needle = query.trim().toLocaleLowerCase("tr");
  const visible = sorting.apply(
    chipFiltered.filter(
      (report) =>
        (activeKind === null || reportKind(report) === activeKind) &&
        (needle === "" ||
          `${report.title} ${formatCreatedBy(report)} ${kindLabel(reportKind(report))}`
            .toLocaleLowerCase("tr")
            .includes(needle)),
    ),
    compareReports,
  );
  const pageCount = Math.max(1, Math.ceil(visible.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const rows = visible.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );
  const header = (key: SortKey, label: string, hide = "") => (
    <th aria-sort={sorting.ariaSort(key)} className={hide}>
      <SortableHeader
        column={sorting.column(key, key === "createdAt" || key === "sizeBytes")}
        label={label}
      />
    </th>
  );
  const clearAll = () => {
    // The button unmounts once the list is back; keep focus in the filters.
    filtersRef.current?.focus();
    setFilter("all");
    setKind(null);
    setQuery("");
  };

  return (
    <div className="enter space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div
          ref={filtersRef}
          tabIndex={-1}
          className="flex flex-wrap gap-2"
          role="group"
          aria-label="Filtre"
        >
          {FILTERS.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              type="button"
              aria-pressed={filter === key}
              className={`inline-flex min-h-10 items-center gap-1.5 rounded-full border px-3 py-1 text-sm transition-all duration-150 sm:min-h-8 ${
                filter === key
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-[var(--control-border)] hover:border-primary/50 hover:bg-primary/5"
              }`}
              onClick={() => {
                setFilter(key);
                setKind(null);
                setPage(1);
              }}
            >
              <Icon aria-hidden className="size-4" />
              {label}
              <span className="tabular-nums opacity-70">{counts[key]}</span>
            </button>
          ))}
        </div>
        <label className="relative block w-full sm:w-64">
          <Search
            aria-hidden
            className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted"
          />
          <input
            type="search"
            className="input input-bordered input-sm w-full pl-8"
            placeholder="Raporlarda ara"
            aria-label="Raporlarda ara"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setPage(1);
            }}
          />
        </label>
      </div>

      <div className="overflow-hidden rounded-box border border-base-300">
        {rows.length === 0 ? (
          <EmptyState
            compact
            icon={FileText}
            title="Aramanıza uyan rapor yok"
            description="Aramayı, filtreyi ya da seçili türü kaldırarak tüm raporları görün."
            action={
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={clearAll}
              >
                Filtreleri temizle
              </button>
            }
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  {header("title", "Rapor")}
                  {header("kind", "Tür", "hidden md:table-cell")}
                  {header("createdAt", "Oluşturulma", "hidden md:table-cell")}
                  {header("sizeBytes", "Boyut", "hidden lg:table-cell")}
                  <th>
                    <span className="sr-only">İşlemler</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((report) => {
                  const chip = (
                    <ReportKindChip
                      kind={reportKind(report)}
                      isTemplate={hasTemplate(report)}
                    />
                  );
                  return (
                    <tr
                      key={report.id}
                      className="cursor-pointer hover:bg-base-200"
                      onClick={(event) => {
                        if (isInteractiveTarget(event.target)) return;
                        void navigate({
                          to: "/p/$projectId/reports/$reportId",
                          params: { projectId, reportId: report.id },
                        });
                      }}
                    >
                      <td className="max-w-[420px]">
                        <Link
                          to="/p/$projectId/reports/$reportId"
                          params={{ projectId, reportId: report.id }}
                          className="link link-hover font-medium"
                        >
                          {report.title}
                        </Link>
                        <div className="mt-1 text-xs text-muted">
                          {formatCreatedBy(report)}
                        </div>
                        <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted md:hidden">
                          {chip}
                          <span>{formatDateTime(report.createdAt)}</span>
                        </div>
                      </td>
                      <td className="hidden md:table-cell">{chip}</td>
                      <td className="hidden whitespace-nowrap text-muted md:table-cell">
                        {formatDateTime(report.createdAt)}
                      </td>
                      <td className="hidden whitespace-nowrap text-muted lg:table-cell">
                        {formatBytes(report.sizeBytes)}
                      </td>
                      <td className="w-px whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1">
                          <ReportDownloadButton
                            reportId={report.id}
                            title={report.title}
                          />
                          <RowActions
                            triggerClassName="btn btn-ghost btn-sm btn-square"
                            label={`${report.title} için işlemler`}
                            actions={[
                              {
                                label: "Sil",
                                icon: Trash2,
                                destructive: true,
                                onSelect: () => onDelete(report),
                              },
                            ]}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        {visible.length > PAGE_SIZES[0] ? (
          <TablePagination
            page={currentPage}
            pageSize={pageSize}
            pageSizes={PAGE_SIZES}
            totalCount={visible.length}
            hasNextPage={currentPage < pageCount}
            isLoading={false}
            onPageChange={setPage}
            onPageSizeChange={(size) => {
              setPageSize(size);
              setPage(1);
            }}
          />
        ) : null}
      </div>
      {reports.length === REPORT_APP_LIST_LIMIT ? (
        <p className="text-xs text-muted">
          En son {REPORT_APP_LIST_LIMIT} rapor gösteriliyor.
        </p>
      ) : null}

      <ReportsSummary
        projectId={projectId}
        reports={chipFiltered}
        visibleReports={visible}
        now={now}
        selectedKind={activeKind}
        onSelectKind={(next) => {
          setKind(next);
          setPage(1);
        }}
      />
    </div>
  );
}
