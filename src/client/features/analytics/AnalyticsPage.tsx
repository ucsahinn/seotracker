import { useQuery } from "@tanstack/react-query";
import { BarChart3 } from "lucide-react";
import * as React from "react";
import { EmptyState } from "@/client/components/EmptyState";
import { PageHeader, PageShell } from "@/client/components/PageShell";
import { QueryErrorState } from "@/client/components/QueryErrorState";
import { formatCount, formatDate, formatPercent } from "@/client/lib/format";
import { getGa4Report } from "@/serverFunctions/ga4Reports";
import {
  GA4_FIELD_LABELS,
  GA4_RATE_FIELDS,
  GA4_REPORT_KINDS,
  GA4_REPORT_LABELS,
  type Ga4ReportKindName,
} from "@/shared/ga4-reports";

type Channel = "organic_search" | "all";

const CHANNELS: { value: Channel; label: string }[] = [
  { value: "organic_search", label: "Organik arama" },
  { value: "all", label: "Tüm trafik" },
];

function columnLabel(field: string): string {
  return GA4_FIELD_LABELS[field] ?? field;
}

/** Rates as percentages, everything else as a count. Strings pass through. */
function cellValue(field: string, value: string | number | null): string {
  if (value === null || value === "") return "—";
  if (typeof value === "string") return value;
  if (GA4_RATE_FIELDS.has(field)) return formatPercent(value);
  return formatCount(value);
}

/**
 * The seven Google Analytics reports.
 *
 * The engine behind these has existed since the fork began and only an agent
 * could reach it — seven MCP tools, no screen. The columns come from the
 * report definition rather than being hard-coded per report, which is why one
 * table serves all seven.
 */
export function AnalyticsPage({ projectId }: { projectId: string }) {
  const [kind, setKind] = React.useState<Ga4ReportKindName>("landing_pages");
  const [channel, setChannel] = React.useState<Channel>("organic_search");

  const reportQuery = useQuery({
    queryKey: ["ga4Report", projectId, kind, channel],
    queryFn: () =>
      getGa4Report({ data: { projectId, kind, channel, limit: 50 } }),
  });
  const result = reportQuery.data;

  return (
    <PageShell>
      <PageHeader
        title="Analytics raporları"
        description={GA4_REPORT_LABELS[kind].description}
      />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div role="tablist" className="tabs tabs-border">
          {GA4_REPORT_KINDS.map((value) => (
            <button
              key={value}
              type="button"
              role="tab"
              aria-selected={value === kind}
              className={`tab ${value === kind ? "tab-active" : ""}`}
              onClick={() => setKind(value)}
            >
              {GA4_REPORT_LABELS[value].label}
            </button>
          ))}
        </div>

        <div className="join">
          {CHANNELS.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`btn join-item btn-sm ${
                option.value === channel ? "btn-active" : ""
              }`}
              onClick={() => setChannel(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {reportQuery.isPending ? (
        <div className="space-y-2" aria-busy>
          <div className="skeleton h-10" />
          <div className="skeleton h-64" />
        </div>
      ) : null}

      {reportQuery.isError ? (
        <QueryErrorState
          error={reportQuery.error}
          onRetry={() => void reportQuery.refetch()}
          title="Rapor alınamadı"
        />
      ) : null}

      {result?.status === "needs_ga4" ? (
        <div className="rounded-box border border-base-300 bg-base-100">
          <EmptyState
            icon={BarChart3}
            title="Google Analytics bağlı değil"
            description="Bu raporlar GA4 mülkünüzden gelir. Proje ayarlarındaki Entegrasyonlar sekmesinden bağlayın."
          />
        </div>
      ) : null}

      {result?.status === "ok" ? <ReportTable result={result} /> : null}
    </PageShell>
  );
}

function ReportTable({
  result,
}: {
  result: Extract<Awaited<ReturnType<typeof getGa4Report>>, { status: "ok" }>;
}) {
  const columns = [...result.dimensions, ...result.metrics];

  return (
    <div className="space-y-3">
      <p className="text-xs text-muted">
        {result.propertyDisplayName ?? "GA4 mülkü"} ·{" "}
        {formatDate(result.dateRange.startDate)} –{" "}
        {formatDate(result.dateRange.endDate)} ·{" "}
        {formatCount(result.totalRowCount)} satır
        {result.sampled ? " · örneklenmiş" : ""}
        {/* Google withholds rows below its own privacy threshold; a total
            that looks short is often this rather than missing traffic. */}
        {result.thresholded ? " · eşik altı satırlar gizlendi" : ""}
      </p>

      {result.rows.length === 0 ? (
        <div className="rounded-box border border-base-300 bg-base-100">
          <EmptyState
            icon={BarChart3}
            title="Bu dönemde veri yok"
            description={
              result.emptyReason
                ? `Google bir satır döndürmedi (${result.emptyReason}).`
                : "Google bu aralık için satır döndürmedi. Mülk yeni bağlandıysa veriler birkaç gün sonra görünür."
            }
          />
        </div>
      ) : (
        <div className="overflow-x-auto rounded-box border border-base-300 bg-base-100">
          <table className="table table-sm">
            <thead>
              <tr>
                {columns.map((field, index) => (
                  <th
                    key={field}
                    className={
                      index < result.dimensions.length ? "" : "text-right"
                    }
                  >
                    {columnLabel(field)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {result.rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {columns.map((field, index) => {
                    const isDimension = index < result.dimensions.length;
                    return (
                      <td
                        key={field}
                        className={
                          isDimension
                            ? "max-w-md truncate"
                            : "text-right tabular-nums"
                        }
                        title={
                          isDimension ? String(row[field] ?? "") : undefined
                        }
                      >
                        {cellValue(field, row[field] ?? null)}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
