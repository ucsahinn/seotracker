import { useQuery } from "@tanstack/react-query";
import { CheckCircle2, ChevronRight } from "lucide-react";
import * as React from "react";
import { EmptyState } from "@/client/components/EmptyState";
import { getStandardErrorMessage } from "@/client/lib/error-messages";
import { formatNumber, formatPercent } from "@/client/lib/format";
import { getCannibalizationReport } from "@/serverFunctions/cannibalization";

/**
 * Queries your own pages are competing for.
 *
 * Search Console will not show this: it reports queries and pages as two
 * separate lists, so a query answered by four of your pages looks exactly
 * like one answered by a single page. Asking for both dimensions at once and
 * grouping is the whole trick, and it is free.
 */
export function CannibalizationTable({ projectId }: { projectId: string }) {
  const report = useQuery({
    queryKey: ["cannibalization", projectId],
    queryFn: () => getCannibalizationReport({ data: { projectId } }),
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
    return (
      <div className="p-4">
        <div className="alert alert-error">
          <span className="text-sm">
            {getStandardErrorMessage(report.error)}
          </span>
        </div>
      </div>
    );
  }

  const data = report.data;
  if (!data || data.rows.length === 0) {
    return (
      <EmptyState
        icon={CheckCircle2}
        title="Çakışma bulunamadı"
        description={
          data?.truncated
            ? `İncelenen ${formatNumber(data.queriesAnalyzed)} sorguda çakışma yok. Ancak Search Console satır sınırına takıldık, yani bakamadığımız sorgular kaldı.`
            : `İncelenen ${formatNumber(data?.queriesAnalyzed ?? 0)} sorgunun hiçbirinde iki sayfanız birbiriyle yarışmıyor.`
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
    <tr>
      <td className="max-w-md">
        <span className="flex min-w-0 items-center gap-2">
          <span className="truncate" title={page.page}>
            {pathOf(page.page)}
          </span>
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
      <td className="text-right">{page.position.toFixed(1)}</td>
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
