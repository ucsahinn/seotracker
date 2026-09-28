import { useMemo } from "react";
import { createColumnHelper, type ColumnDef } from "@tanstack/react-table";
import { ExternalLink } from "lucide-react";
import {
  AppDataTable,
  useAppTable,
} from "@/client/components/table/AppDataTable";
import { SortableHeader } from "@/client/components/table/SortableHeader";
import { TableExportMenu } from "@/client/components/table/TableBulkActionBar";
import { nullableNumberSort } from "@/client/features/audit/results/AuditResultsTableFilterLogic";
import { buildCsv, downloadCsv, type CsvValue } from "@/client/lib/csv";
import { exportTableToSheets } from "@/client/lib/exportToSheets";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Target } from "lucide-react";
import { EmptyState } from "@/client/components/EmptyState";
import { MetricRow, MetricTile } from "@/client/components/MetricTile";
import { PageHeader, PageShell } from "@/client/components/PageShell";
import { getStandardErrorMessage } from "@/client/lib/error-messages";
import {
  formatDecimal,
  formatNumber,
  formatPercent,
} from "@/client/lib/format";
import { getSearchOpportunities } from "@/serverFunctions/opportunities";

/**
 * Pages sitting between positions 4 and 20, ranked by what moving them up
 * would be worth.
 *
 * Position 4 to 20 is the band where effort pays: the page already ranks, so
 * Google has accepted it, and the clicks above it are real. Which of them to
 * spend a week on is the actual question, and Search Console alone cannot
 * answer it because it does not know which pages earn anything. Joining the
 * band with GA4 outcomes does, and the scoring weighs demand at 50%,
 * business value at 30% and how close the page already is at 20%.
 */
/*
 * 100 is the ceiling `SearchOpportunityService` enforces, and it threw a
 * validation error rather than clamping -- so the 250 this list used to
 * offer broke the screen every time it was picked. Kept in step with
 * `opportunitiesSchema`, which now caps at the same number.
 */
const LIMITS = [25, 50, 100] as const;

export function OpportunitiesPage({ projectId }: { projectId: string }) {
  const [limit, setLimit] = useState<(typeof LIMITS)[number]>(50);
  const query = useQuery({
    queryKey: ["searchOpportunities", projectId, limit],
    queryFn: () => getSearchOpportunities({ data: { projectId, limit } }),
    retry: false,
  });

  return (
    <PageShell>
      <PageHeader
        title="Fırsatlar"
        description="4. ile 20. sıra arasındaki sayfalarınız, yukarı taşımanın değerine göre sıralanmış."
      />

      {query.isPending ? (
        <div className="space-y-4" aria-busy>
          <div className="skeleton h-[104px]" />
          <div className="skeleton h-96" />
        </div>
      ) : query.isError ? (
        <div className="alert alert-error">
          <span className="text-sm">
            {getStandardErrorMessage(query.error)}
          </span>
        </div>
      ) : query.data.status === "ok" ? (
        <Report
          data={query.data.report}
          limit={limit}
          onLimitChange={setLimit}
          projectId={projectId}
        />
      ) : (
        <NotReady projectId={projectId} missing={query.data.status} />
      )}
    </PageShell>
  );
}

/**
 * This screen needs both Search Console and Analytics, so "not connected" is
 * the expected first state rather than a failure. The server says which one is
 * missing; this used to guess by matching the error text, which never worked
 * because the message reaching the client is a generic one.
 */
function NotReady({
  projectId,
  missing,
}: {
  projectId: string;
  missing: "needs_ga4" | "needs_gsc";
}) {
  const needsGa4 = missing === "needs_ga4";

  return (
    <div className="rounded-box border border-base-300 bg-base-100">
      <EmptyState
        icon={Target}
        title={
          needsGa4
            ? "Google Analytics bağlı değil"
            : "Search Console bağlı değil"
        }
        description="Bu sayfa iki kaynağı birleştirir: sıralarınız Search Console'dan, o sayfaların ne kazandırdığı Analytics'ten gelir. İkisi de bağlı olmadan bir fırsat puanlanamaz."
        action={
          <Link
            to="/p/$projectId/settings/integrations"
            params={{ projectId }}
            className="btn btn-primary btn-sm"
          >
            Bağlantıları aç
          </Link>
        }
      />
    </div>
  );
}

type OpportunityReport = Extract<
  Awaited<ReturnType<typeof getSearchOpportunities>>,
  { status: "ok" }
>["report"];

function Report({
  data,
  limit,
  onLimitChange,
  projectId,
}: {
  data: OpportunityReport;
  limit: number;
  onLimitChange: (limit: (typeof LIMITS)[number]) => void;
  projectId: string;
}) {
  if (data.rows.length === 0) {
    return (
      <div className="rounded-box border border-base-300 bg-base-100">
        <EmptyState
          icon={Target}
          title="Bu aralıkta sayfa yok"
          description="Hiçbir sayfanız 4. ile 20. sıra arasında değil. Bu iyi ya da kötü olabilir: ya hepsi ilk üçte, ya da henüz kimse görmüyor."
        />
      </div>
    );
  }

  return (
    <>
      {data.truncated.gsc ? (
        <p className="text-xs text-muted">
          Search Console tek seferde sınırlı satır döndürür ve bu sınıra
          takıldık, yani aday sayfa sayısı da gerçekte daha yüksek olabilir.
        </p>
      ) : null}

      {data.warnings.includes("source_time_zones_differ") ? (
        <p className="text-xs text-muted">
          Search Console ve Analytics farklı saat dilimlerinde raporluyor;
          günlük eşleşmeler bir gün kayabilir.
        </p>
      ) : null}

      <MetricRow>
        {/* `rowCount` is the slice, not a verdict: every candidate is
            scored, so "Fırsat 50" beside "300 aday sayfadan" used to read as
            "50 of your 300 qualified" when it meant "you are looking at the
            top 50 of 300". The hint says which, and the selector below lets
            the operator actually reach the rest. */}
        <MetricTile
          label="Gösterilen"
          value={formatNumber(data.rowCount)}
          hint={
            data.truncated.candidates
              ? `${formatNumber(data.totalCandidateRows)} aday sayfanın en iyileri`
              : `Tüm aday sayfalar (${formatNumber(data.totalCandidateRows)})`
          }
        />
        {/* Was "Puanlanan", counted over the returned page, and every row
            carries a score since unmatched pages started being scored too -
            so it always equalled the row count while its hint described the
            Analytics match. This is the number the hint meant. */}
        <MetricTile
          label="Analytics eşleşmesi"
          value={formatNumber(data.coverage.matchedRows)}
          hint={`${formatNumber(data.totalCandidateRows)} aday içinde`}
        />
        <MetricTile
          label="Eşleşmeyen"
          value={formatNumber(data.coverage.unmatchedGscRows)}
          hint="Analytics'te karşılığı bulunamadı"
        />
        <MetricTile
          label="İş değeri ölçütü"
          value={
            data.scoring.businessValueMetric === "engagementRate"
              ? "Etkileşim"
              : "Dönüşüm"
          }
          hint={
            data.scoring.engagementFallback
              ? "Dönüşüm tanımlı değil, etkileşime düşüldü"
              : undefined
          }
        />
      </MetricRow>

      {/* Without this the cut list had no control at all: no pagination, no
          limit, nothing saying more existed. */}
      <div className="flex items-center justify-end gap-2 text-xs text-muted">
        <label htmlFor="opportunity-limit">Gösterilecek satır</label>
        <select
          id="opportunity-limit"
          className="select select-bordered select-sm w-24"
          value={limit}
          onChange={(event) => {
            const next = LIMITS.find(
              (option) => String(option) === event.target.value,
            );
            if (next) onLimitChange(next);
          }}
        >
          {LIMITS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <OpportunitiesTable projectId={projectId} rows={data.rows} />

      <p className="text-xs text-muted">
        Puan = talep (%50) + iş değeri (%30) + erişilebilirlik (%20).
        Analytics&apos;te eşleşmeyen sayfalar da puanlanır; iş değeri için hak
        etmedikleri bir sıfır yerine nötr orta değeri alırlar.
      </p>
    </>
  );
}

function ScoreBadge({ score }: { score: number | null | undefined }) {
  if (score == null) {
    return <span className="text-subtle">-</span>;
  }
  // One threshold, not a rainbow: above 60 is worth planning work around.
  const strong = score >= 60;
  return (
    <span
      className={`badge badge-sm tabular-nums ${
        strong
          ? "border-success/30 bg-success/10 text-[var(--ink-success)]"
          : "border-base-300 bg-base-200 text-muted"
      }`}
    >
      {score}
    </span>
  );
}

function pathOf(url: string): string {
  try {
    return new URL(url).pathname || "/";
  } catch {
    return url;
  }
}

type OpportunityRow = OpportunityReport["rows"][number];
const opportunityHelper = createColumnHelper<OpportunityRow>();

const OPPORTUNITY_HEADERS = [
  "Puan",
  "Sayfa",
  "Sıra",
  "Gösterim",
  "Tıklama",
  "TO",
  "Oturum",
] as const;

/**
 * The ranked worklist, as a real table.
 *
 * It used to be a raw `<table>`: no sortable headers, no way into a row, no
 * export. Its nearest neighbour -- the striking-distance table, same Search
 * Console shape -- sorts, paginates, selects and saves, so an operator who
 * wanted "the ones with the most impressions" or "the closest to page one"
 * had to re-read fifty rows by eye on the one screen whose whole job is to
 * rank them.
 */
export function OpportunitiesTable({
  projectId,
  rows,
}: {
  projectId: string;
  rows: OpportunityRow[];
}) {
  const columns = useMemo(
    () => buildOpportunityColumns(projectId),
    [projectId],
  );
  const table = useAppTable({
    data: rows,
    columns,
    withSorting: true,
    // Score is the point of the screen, so it stays the default order.
    initialState: { sorting: [{ id: "score", desc: true }] },
  });

  const csvRows = rows.map((row): CsvValue[] => [
    row.score,
    row.page,
    row.position,
    row.impressions,
    row.clicks,
    row.ctr,
    row.ga4?.sessions ?? null,
  ]);

  return (
    <div className="overflow-hidden rounded-box border border-base-300 bg-base-100">
      <div className="flex items-center justify-end border-b border-base-300 px-3 py-2">
        <TableExportMenu
          buttonClassName="btn btn-ghost btn-sm gap-1"
          actions={[
            {
              label: `Sheets'e aktar (${formatNumber(rows.length)} satır)`,
              onClick: () =>
                void exportTableToSheets({
                  headers: [...OPPORTUNITY_HEADERS],
                  rows: csvRows,
                  feature: "search_opportunities",
                }),
            },
            {
              label: `CSV (${formatNumber(rows.length)} satır)`,
              onClick: () =>
                downloadCsv(
                  "firsatlar.csv",
                  buildCsv([...OPPORTUNITY_HEADERS], csvRows),
                ),
            },
          ]}
        />
      </div>
      <AppDataTable
        table={table}
        className="table table-sm"
        wrapperClassName="overflow-x-auto"
        empty={
          <p className="p-6 text-sm text-muted">Gösterilecek satır yok.</p>
        }
      />
    </div>
  );
}

function buildOpportunityColumns(
  projectId: string,
): ColumnDef<OpportunityRow>[] {
  const right = {
    headerClassName: "text-right",
    cellClassName: "text-right tabular-nums",
  } as const;
  return [
    opportunityHelper.accessor("score", {
      header: ({ column }) => (
        <SortableHeader column={column} label="Puan" align="right" />
      ),
      cell: ({ getValue }) => <ScoreBadge score={getValue()} />,
      meta: right,
    }),
    opportunityHelper.accessor("page", {
      header: ({ column }) => <SortableHeader column={column} label="Sayfa" />,
      cell: ({ getValue }) => {
        const url = getValue();
        return (
          <span className="flex min-w-0 items-center gap-2">
            {/* Two exits, because the question splits: what does this page
                look like, and what is it ranking for. Neither existed. */}
            <Link
              to="/p/$projectId/search-performance"
              params={{ projectId }}
              search={{ tab: "pages" as const }}
              className="link link-hover min-w-0 truncate"
              title={url}
            >
              {pathOf(url)}
            </Link>
            <a
              href={url}
              target="_blank"
              rel="noreferrer noopener"
              className="shrink-0 text-muted hover:text-base-content"
              aria-label="Sayfayı yeni sekmede aç"
            >
              <ExternalLink className="size-3.5" />
            </a>
          </span>
        );
      },
      meta: { cellClassName: "max-w-md" },
    }),
    opportunityHelper.accessor("position", {
      header: ({ column }) => (
        <SortableHeader column={column} label="Sıra" align="right" />
      ),
      cell: ({ getValue }) => formatDecimal(getValue()),
      meta: right,
    }),
    opportunityHelper.accessor("impressions", {
      header: ({ column }) => (
        <SortableHeader column={column} label="Gösterim" align="right" />
      ),
      cell: ({ getValue }) => formatNumber(getValue()),
      meta: right,
    }),
    opportunityHelper.accessor("clicks", {
      header: ({ column }) => (
        <SortableHeader column={column} label="Tıklama" align="right" />
      ),
      cell: ({ getValue }) => formatNumber(getValue()),
      meta: right,
    }),
    opportunityHelper.accessor("ctr", {
      header: ({ column }) => (
        <SortableHeader column={column} label="TO" align="right" />
      ),
      cell: ({ getValue }) => formatPercent(getValue()),
      meta: right,
    }),
    opportunityHelper.accessor((row) => row.ga4?.sessions ?? null, {
      id: "sessions",
      header: ({ column }) => (
        <SortableHeader column={column} label="Oturum" align="right" />
      ),
      cell: ({ getValue }) => {
        const value = getValue();
        return value === null ? (
          <span className="text-subtle">-</span>
        ) : (
          formatNumber(value)
        );
      },
      sortingFn: nullableNumberSort,
      meta: right,
    }),
  ];
}
