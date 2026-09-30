import { Link } from "@tanstack/react-router";
import {
  Clock,
  Download,
  FileText,
  LayoutTemplate,
  List,
  Sparkles,
  Trash2,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { EmptyState } from "@/client/components/EmptyState";
import { RowActions } from "@/client/components/table/RowActions";
import { SortableHeader } from "@/client/components/table/SortableHeader";
import { TablePagination } from "@/client/components/table/TablePagination";
import {
  compareText,
  useLocalSort,
} from "@/client/components/table/useLocalSort";
import {
  downloadReport,
  reportFilename,
} from "@/client/features/reports/downloadReport";
import { ReportsSummary } from "@/client/features/reports/ReportsSummary";
import {
  filterCounts,
  matchesFilter,
  reportKind,
  type ReportFilter,
} from "@/client/features/reports/reportStats";
import { formatCreatedBy } from "@/client/features/reports/shared";
import { formatBytes, formatRelativeTime } from "@/client/lib/format";
import type { ReportListItem } from "@/serverFunctions/reports";
import { REPORT_APP_LIST_LIMIT } from "@/types/schemas/reports";

const PAGE_SIZES = [25, 50, 100] as const;

type SortKey = "title" | "createdBy" | "kind" | "updatedAt" | "sizeBytes";

const FILTERS: { key: ReportFilter; label: string; icon: LucideIcon }[] = [
  { key: "all", label: "Tümü", icon: List },
  { key: "recent", label: "Son 7 gün", icon: Clock },
  { key: "template", label: "Şablonlu", icon: LayoutTemplate },
  { key: "skill", label: "Yalnızca beceriyle", icon: Sparkles },
];

function compareReports(
  a: ReportListItem,
  b: ReportListItem,
  key: SortKey,
): number {
  switch (key) {
    case "title":
      return compareText(a.title, b.title);
    case "createdBy":
      return compareText(formatCreatedBy(a), formatCreatedBy(b));
    case "kind":
      return compareText(reportKind(a), reportKind(b));
    case "updatedAt":
      return Date.parse(a.updatedAt) - Date.parse(b.updatedAt);
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
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<(typeof PAGE_SIZES)[number]>(25);
  const sorting = useLocalSort<SortKey>({ key: "updatedAt", desc: true });

  if (reports.length === 0) {
    return (
      <EmptyState
        icon={FileText}
        title="Henüz rapor yok"
        description="Claude Code ya da Codex üzerinden seo-audit gibi bir seotracker becerisini başlatın; yazdığı rapor burada görünür."
      />
    );
  }

  const now = Date.now();
  const counts = filterCounts(reports, now);
  const visible = sorting.apply(
    reports.filter(
      (report) =>
        matchesFilter(report, filter, now) &&
        (kind === null || reportKind(report) === kind),
    ),
    compareReports,
  );
  const pageCount = Math.max(1, Math.ceil(visible.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const rows = visible.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );
  const header = (key: SortKey, label: string, descendingFirst = true) => (
    <th aria-sort={sorting.ariaSort(key)}>
      <SortableHeader
        column={sorting.column(key, descendingFirst)}
        label={label}
      />
    </th>
  );

  return (
    <div className="space-y-4">
      <ReportsSummary
        reports={reports}
        now={now}
        selectedKind={kind}
        onSelectKind={(next) => {
          setKind(next);
          setPage(1);
        }}
      />

      <div className="flex flex-wrap gap-2" role="group" aria-label="Süzgeç">
        {FILTERS.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            type="button"
            aria-pressed={filter === key}
            className={`btn btn-sm gap-1.5 ${filter === key ? "btn-primary" : "btn-ghost border-base-300"}`}
            onClick={() => {
              setFilter(key);
              setPage(1);
            }}
          >
            <Icon aria-hidden className="size-4" />
            {label}
            <span className="tabular-nums opacity-70">{counts[key]}</span>
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-box border border-base-300">
        {rows.length === 0 ? (
          <EmptyState
            compact
            icon={FileText}
            title="Bu süzgece uyan rapor yok"
            description="Süzgeci ya da seçili türü kaldırarak tüm raporları görün."
            action={
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={() => {
                  setFilter("all");
                  setKind(null);
                }}
              >
                Süzgeçleri temizle
              </button>
            }
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="table table-sm">
              <thead>
                <tr>
                  {header("title", "Başlık", false)}
                  {header("createdBy", "Oluşturan", false)}
                  {header("kind", "Tür", false)}
                  {header("sizeBytes", "Boyut")}
                  {header("updatedAt", "Güncellenme")}
                  <th>
                    <span className="sr-only">İşlemler</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((report) => (
                  <tr key={report.id} className="hover:bg-base-200">
                    <td className="max-w-[420px]">
                      <Link
                        to="/p/$projectId/reports/$reportId"
                        params={{ projectId, reportId: report.id }}
                        className="link link-hover font-medium"
                      >
                        {report.title}
                      </Link>
                    </td>
                    <td className="text-muted">{formatCreatedBy(report)}</td>
                    {/* The template the report was written from, else the
                        skill that produced it: what a reader needs to tell
                        two reports on the same site apart. */}
                    <td className="text-muted">{reportKind(report)}</td>
                    <td className="whitespace-nowrap text-muted">
                      {formatBytes(report.sizeBytes)}
                    </td>
                    <td className="whitespace-nowrap text-muted">
                      {formatRelativeTime(report.updatedAt)}
                    </td>
                    <td className="w-10 text-right">
                      <RowActions
                        label={`${report.title} için işlemler`}
                        actions={[
                          {
                            label: "İndir",
                            icon: Download,
                            onSelect: () => {
                              void downloadReport(
                                report.id,
                                reportFilename(report.title),
                              ).catch(() => toast.error("Rapor indirilemedi."));
                            },
                          },
                          {
                            label: "Sil",
                            icon: Trash2,
                            destructive: true,
                            onSelect: () => onDelete(report),
                          },
                        ]}
                      />
                    </td>
                  </tr>
                ))}
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
    </div>
  );
}
