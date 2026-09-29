import { useQuery } from "@tanstack/react-query";
import { CheckCircle2, ChevronRight, SearchX } from "lucide-react";
import * as React from "react";
import { EmptyState } from "@/client/components/EmptyState";
import {
  formatDate,
  formatDecimal,
  formatNumber,
  formatPercent,
} from "@/client/lib/format";
import type {
  SearchPerformanceDateRange,
  SearchPerformanceDevice,
} from "@/types/schemas/search-performance";
import { getCannibalizationReport } from "@/serverFunctions/cannibalization";
import { UrlCell } from "@/client/components/table/UrlCell";
import { QueryErrorState } from "@/client/components/QueryErrorState";

/**
 * Queries your own pages are competing for.
 *
 * Search Console will not show this: it reports queries and pages as two
 * separate lists, so a query answered by four of your pages looks exactly
 * like one answered by a single page. Asking for both dimensions at once and
 * grouping is the whole trick, and it is free.
 */
export function CannibalizationTable({
  projectId,
  dateRange,
  device,
  country,
}: {
  projectId: string;
  dateRange: SearchPerformanceDateRange;
  device?: SearchPerformanceDevice;
  country?: string;
}) {
  const report = useQuery({
    // The filters belong in the key as well as the payload: without them the
    // panel kept serving its first answer while the dropdowns above changed.
    queryKey: ["cannibalization", projectId, dateRange, device, country],
    queryFn: () =>
      getCannibalizationReport({
        data: { projectId, dateRange, device, country },
      }),
  });

  if (report.isPending) {
    return (
      <div className="space-y-2 p-4" aria-busy>
        {Array.from({ length: 5 }, (_, index) => (
          <div key={index} className="skeleton h-12" />
        ))}
      </div>
    );
  }

  if (report.isError) {
    /*
     * With a retry, like every other error path on these screens. A dead-end
     * alert meant a transient Google failure took the tab out until the
     * whole page was reloaded -- switching tabs away and back does not
     * necessarily refetch.
     */
    return (
      <QueryErrorState
        compact
        error={report.error}
        onRetry={() => void report.refetch()}
        title="Çakışma raporu yüklenemedi"
      />
    );
  }

  const data = report.data;
  if (!data || data.rows.length === 0) {
    return (
      /*
       * A pass verdict needs something to have been examined.
       *
       * At zero analysed queries this rendered a green check and "none of
       * the 0 queries examined have pages competing" -- a clean bill of
       * health for an analysis that looked at nothing, which is exactly
       * what a property Search Console returns no rows for produces.
       */
      <EmptyState
        icon={(data?.queriesAnalyzed ?? 0) === 0 ? SearchX : CheckCircle2}
        title={
          (data?.queriesAnalyzed ?? 0) === 0
            ? "Çakışma araması yapılamadı"
            : "Çakışma bulunamadı"
        }
        description={
          (data?.queriesAnalyzed ?? 0) === 0
            ? "Search Console bu dönem için sorgu döndürmedi, bu yüzden karşılaştırılacak bir şey yoktu. Daha geniş bir tarih aralığı deneyin."
            : data?.truncated
              ? `İncelenen ${formatNumber(data.queriesAnalyzed)} sorguda çakışma yok. Ancak Search Console satır sınırına takıldık, yani bakamadığımız sorgular kaldı.`
              : `İncelenen ${formatNumber(data.queriesAnalyzed)} sorgunun hiçbirinde iki sayfanız birbiriyle yarışmıyor.`
        }
      />
    );
  }

  return (
    <div className="space-y-3 p-4">
      <p className="text-sm text-muted">
        {formatNumber(data.rows.length)} sorguda birden fazla sayfanız yarışıyor
        ve bu yüzden{" "}
        <span className="font-medium text-base-content">
          {formatNumber(data.splitImpressions)} gösterim
        </span>{" "}
        Google&apos;ın tercih ettiği sayfa dışında kalıyor. Önce hangi sayfayı
        hedeflediğinize karar verin ve iç bağlantıları ona yöneltin; sayfalar
        gerçekten aynı soruyu yanıtlıyorsa birleştirin.
      </p>

      {/* The window is printed because it is not always the one the dropdown
          says: a 7-day selection is widened to 28, since the impression floor
          this analysis needs almost never clears in a week. */}
      <p className="text-xs text-muted">
        {formatDate(data.startDate)} – {formatDate(data.endDate)} ·{" "}
        {formatNumber(data.queriesAnalyzed)} sorgu incelendi
      </p>

      {data.truncated ? (
        <p className="text-xs text-muted">
          Search Console tek seferde sınırlı satır döndürür ve bu sınıra
          takıldık. Listede olmayan çakışmalar olabilir.
        </p>
      ) : null}

      <div className="overflow-hidden rounded-box border border-base-300">
        {data.rows.map((row) => (
          <QueryRow key={row.query} row={row} />
        ))}
      </div>
    </div>
  );
}

function QueryRow({
  row,
}: {
  row: Awaited<ReturnType<typeof getCannibalizationReport>>["rows"][number];
}) {
  const [open, setOpen] = React.useState(false);
  const competing = row.competitors.length + 1;

  return (
    <div className="border-b border-base-300 last:border-b-0">
      <button
        type="button"
        className="flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-base-200/40"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
      >
        <ChevronRight
          className={`size-4 shrink-0 text-muted transition-transform ${
            open ? "rotate-90" : ""
          }`}
          aria-hidden
        />
        <span className="min-w-0 flex-1 truncate text-sm font-medium">
          {row.query}
        </span>
        <span className="shrink-0 text-xs text-muted">{competing} sayfa</span>
        <span
          className="shrink-0 text-xs text-muted"
          title="Google'ın tercih ettiği sayfa dışında kalan gösterim payı"
        >
          {formatPercent(row.splitShare, 0)} bölünme
        </span>
        <span className="w-20 shrink-0 text-right text-xs text-muted">
          {formatNumber(row.impressions)} gösterim
        </span>
      </button>

      {open ? (
        <div className="border-t border-base-300 bg-base-200/25 px-4 py-3">
          <table className="table table-sm">
            <thead>
              <tr>
                <th>Sayfa</th>
                <th className="text-right">Tıklama</th>
                <th className="text-right">Gösterim</th>
                <th className="text-right">Sıra</th>
              </tr>
            </thead>
            <tbody>
              <PageRow page={row.primary} primary />
              {row.competitors.map((page) => (
                <PageRow key={page.page} page={page} />
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
}

function PageRow({
  page,
  primary = false,
}: {
  page: { page: string; clicks: number; impressions: number; position: number };
  primary?: boolean;
}) {
  return (
    /* `group/row`: UrlCell reveals its copy button on row hover, and this
       table builds its own <tr> rather than going through AppDataTable --
       so without the class the button stayed invisible to a mouse. */
    <tr className="group/row">
      <td className="max-w-md">
        <span className="flex min-w-0 items-center gap-2">
          {/* The panel exists to compare two pages; until this, neither
              could be opened and neither address could be copied. */}
          <UrlCell url={page.page} label={pathOf(page.page)} />
          {primary ? (
            <span
              className="badge badge-sm shrink-0 border-success/30 bg-success/10 text-[var(--ink-success)]"
              title="Google bu sorguda en çok bu sayfayı gösteriyor"
            >
              Tercih edilen
            </span>
          ) : null}
        </span>
      </td>
      <td className="text-right">{formatNumber(page.clicks)}</td>
      <td className="text-right">{formatNumber(page.impressions)}</td>
      <td className="text-right">{formatDecimal(page.position)}</td>
    </tr>
  );
}

function pathOf(url: string): string {
  try {
    return new URL(url).pathname || "/";
  } catch {
    return url;
  }
}
