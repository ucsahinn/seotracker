import { t } from "@/shared/i18n";
import { useMemo, useState, type MouseEvent } from "react";
import { Target } from "lucide-react";
import { EmptyState } from "@/client/components/EmptyState";
import {
  AppDataTable,
  useAppTable,
} from "@/client/components/table/AppDataTable";
import { TableExportMenu } from "@/client/components/table/TableBulkActionBar";
import { buildOpportunityColumns } from "@/client/features/opportunities/OpportunityColumns";
import { OpportunityDetail } from "@/client/features/opportunities/OpportunityDetail";
import {
  WORK_COPY,
  type OpportunityRow,
} from "@/client/features/opportunities/opportunityLogic";
import { buildCsv, downloadCsv, type CsvValue } from "@/client/lib/csv";
import { exportTableToSheets } from "@/client/lib/exportToSheets";
import {
  formatNumber,
  formatCount,
  formatDecimal,
  formatPercent,
} from "@/client/lib/format";
import type { OpportunityReport } from "./report";

// Turkish, translated with t() when an export is built.
const OPPORTUNITY_HEADERS = [
  "Tahmini kazanç (tıklama/ay)",
  "Sayfa",
  "Yapılacak iş",
  "Sıra",
  "Gösterim",
  "Tıklama",
  "Tıklama oranı",
  "Oturum",
] as const;

/**
 * The ranked worklist. A row opens the detail panel with the queries behind
 * its estimate; the button in the page cell is the keyboard route, a click
 * anywhere else on the row the same for a mouse.
 */
export function OpportunitiesTable({
  projectId,
  days,
  rows,
  report,
  recommendation,
  onReset,
  openPage: controlledPage,
  onOpenPageChange,
}: {
  projectId: string;
  /** The window the rows cover, for the monthly figures in the panel. */
  days: number;
  rows: OpportunityRow[];
  report?: OpportunityReport;
  recommendation?: OpportunityRow | null;
  /** Clears the filters that emptied the table, when there are any. */
  onReset?: () => void;
  /** Lets the page open a row's dialog from outside (the first tile). Uncontrolled when omitted. */
  openPage?: string | null;
  onOpenPageChange?: (page: string | null) => void;
}) {
  const [ownPage, setOwnPage] = useState<string | null>(null);
  const openPage = controlledPage === undefined ? ownPage : controlledPage;
  const setOpenPage = onOpenPageChange ?? setOwnPage;
  const maxGain = rows.reduce((max, row) => Math.max(max, row.gainPerMonth), 0);
  const columns = useMemo(
    () => buildOpportunityColumns((row) => setOpenPage(row.page), maxGain),
    [setOpenPage, maxGain],
  );
  const table = useAppTable({
    data: rows,
    columns,
    withSorting: true,
    // The estimate is the point of the screen, so it is the default order.
    initialState: { sorting: [{ id: "gainPerMonth", desc: true }] },
  });

  const opened =
    rows.find((row) => row.page === openPage) ??
    (recommendation?.page === openPage ? recommendation : null);

  const headers = [
    ...OPPORTUNITY_HEADERS.map((header) => t(header)),
    "startDate",
    "endDate",
    "observedDays",
    "gainUnit",
    "model",
    "property",
    "searchType",
    "brandSource",
    "sourceLimits",
    "windowGain",
    "ga4Cohort",
    "ga4JoinPrecision",
  ];
  const csvRows = rows.map((row): CsvValue[] => [
    row.gainPerMonth,
    row.page,
    t(WORK_COPY[row.work].action),
    row.position,
    row.impressions,
    row.clicks,
    row.ctr,
    row.ga4?.sessions ?? null,
    report?.request.dateRange.startDate ?? null,
    report?.request.dateRange.endDate ?? null,
    days,
    "upper bound, scaled to 30 days; observed metrics cover startDate–endDate",
    "page-query-one-band-cap-v2",
    report?.source.searchConsoleSiteUrl ?? null,
    "web",
    report?.method.brandSource ?? null,
    report
      ? JSON.stringify({
          filters: report.request.filters,
          displayLimit: report.request.limit,
          totalCandidatePages: report.totalCandidateRows,
          matchingPages: report.filteredCount,
          truncated: report.truncated,
          unknownPages: report.totals.unknownPages,
          warnings: report.warnings,
          anonymousQueries: "unquantified",
          completeness: report.request.completeness,
          ga4TimeZone: report.request.googleAnalyticsTimeZone,
        })
      : null,
    row.gain,
    row.normalizedPage,
    row.joinPrecision ?? null,
  ]);

  return (
    <div className="overflow-hidden rounded-box border border-base-300 bg-base-100 shadow-[var(--shadow-raise)]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-base-300 px-3 py-2">
        <label className="text-xs text-muted sm:hidden">
          {t("Sırala")}
          <select
            className="select select-sm min-h-11"
            value={table.getState().sorting[0]?.id ?? "gainPerMonth"}
            onChange={(event) =>
              table.setSorting([
                {
                  id: event.target.value,
                  desc: event.target.value !== "position",
                },
              ])
            }
          >
            <option value="gainPerMonth">{t("Ek tıklama tahmini")}</option>
            <option value="position">{t("Sıra")}</option>
            <option value="impressions">{t("Gösterim")}</option>
            <option value="clicks">{t("Tıklama")}</option>
            <option value="ctr">{t("Tıklama oranı")}</option>
            <option value="sessions">{t("Oturum")}</option>
          </select>
        </label>
        <p className="text-xs text-muted">
          {t(
            "Hangi aramaların kazandıracağını görmek için bir satıra tıklayın.",
          )}
        </p>
        <TableExportMenu
          buttonClassName="btn btn-ghost btn-sm gap-1"
          actions={[
            {
              label: t("E-Tablolar'a aktar ({rows} satır)", {
                rows: formatNumber(rows.length),
              }),
              onClick: () =>
                void exportTableToSheets({
                  headers,
                  rows: csvRows,
                  feature: "search_opportunities",
                }),
            },
            {
              label: t("CSV ({rows} satır)", {
                rows: formatNumber(rows.length),
              }),
              onClick: () =>
                downloadCsv("firsatlar.csv", buildCsv(headers, csvRows)),
            },
          ]}
        />
      </div>
      <div className="divide-y divide-base-300 sm:hidden">
        {table.getRowModel().rows.map(({ original: row }) => (
          <article key={row.page} className="space-y-2 p-3">
            <p className="break-all text-sm font-medium">{row.page}</p>
            <p className="text-sm">
              {t("En fazla +{gain} tıklama / 30 gün (üst sınır)", {
                gain: formatCount(row.gainPerMonth),
              })}{" "}
              · {t(WORK_COPY[row.work].action)}
            </p>
            <p className="text-xs text-muted">
              {t("Sıra")}: {formatDecimal(row.position)} · {t("Tıklama oranı")}:{" "}
              {formatPercent(row.ctr)}
            </p>
            <button
              type="button"
              aria-haspopup="dialog"
              className="btn btn-sm min-h-11"
              onClick={() => setOpenPage(row.page)}
            >
              {t("Ayrıntı")}
            </button>
          </article>
        ))}
        {rows.length === 0 ? (
          <EmptyState
            compact
            icon={Target}
            title={t("Bu filtreye uyan sayfa yok")}
            action={
              onReset ? (
                <button
                  type="button"
                  className="btn min-h-11"
                  onClick={onReset}
                >
                  {t("Filtreleri kaldır")}
                </button>
              ) : undefined
            }
          />
        ) : null}
      </div>
      <div className="hidden sm:block">
        <AppDataTable
          table={table}
          caption={t("Fırsatlar")}
          className="table table-sm"
          wrapperClassName="overflow-x-auto"
          getRowProps={(row) => ({
            className: "cursor-pointer hover:bg-base-200/60",
            onClick: (event: MouseEvent<HTMLTableRowElement>) => {
              if (
                event.target instanceof Element &&
                event.target.closest("a, button, [role=menu]")
              ) {
                return;
              }
              setOpenPage(row.original.page);
            },
          })}
          empty={
            <EmptyState
              compact
              icon={Target}
              title={t("Bu filtreye uyan sayfa yok")}
              description={t(
                "Seçtiğiniz iş türü ya da hızlı filtre bu dönemde hiçbir sayfayla eşleşmedi. Filtreleri kaldırın ya da dönemi genişletin.",
              )}
              action={
                onReset ? (
                  <button
                    type="button"
                    className="btn btn-sm"
                    onClick={onReset}
                  >
                    {t("Filtreleri kaldır")}
                  </button>
                ) : undefined
              }
            />
          }
        />
      </div>
      {opened ? (
        <OpportunityDetail
          row={opened}
          days={days}
          dateRange={report?.request.dateRange}
          projectId={projectId}
          onClose={() => setOpenPage(null)}
        />
      ) : null}
    </div>
  );
}
