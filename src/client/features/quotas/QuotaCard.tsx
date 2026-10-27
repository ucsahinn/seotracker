import { Gauge } from "lucide-react";
import { EmptyState } from "@/client/components/EmptyState";
import { QueryErrorState } from "@/client/components/QueryErrorState";
import { RefreshButton } from "@/client/components/RefreshButton";
import type { QuotaKind } from "@/server/features/quotas/quotaTypes";
import { t } from "@/shared/i18n";
import { QuotaMeter } from "./QuotaMeter";
import { useQuotaStatus } from "./useQuotaStatus";

/**
 * Intended placements (the screen owners wire these; nothing renders it yet):
 *   Site denetimi    <QuotaCard projectId kinds={["pagespeed", "url_inspection"]} />
 *   Dizin durumu     <QuotaCard projectId kinds={["url_inspection"]} />
 *   Analytics        <QuotaCard projectId kinds={["ga4"]} />
 *   Ayarlar / Yardım <QuotaCard projectId kinds="all" />
 *   Raporlar         <QuotaCard projectId kinds={["reports"]} />
 *
 * Every figure shows its source and last update. Nothing here calls Google:
 * the server reads its own ledger and the last quota Google reported.
 */
export function QuotaCard({
  projectId,
  kinds = "all",
  title,
  refreshable = true,
  hideWhenUnknown = false,
}: {
  projectId: string;
  kinds?: readonly QuotaKind[] | "all";
  /** Already translated by the caller; defaults to "Kota ve sınırlar". */
  title?: string;
  /**
   * False inside a screen that already has a Yenile in its header: two
   * refresh buttons on one screen leave the reader asking which one counts.
   */
  refreshable?: boolean;
  /**
   * Render nothing while no meter has a figure. Under a report that just
   * ran, "Bilinmiyor / Veri yok" contradicted the screen above it.
   */
  hideWhenUnknown?: boolean;
}) {
  const query = useQuotaStatus(projectId, kinds);
  if (
    hideWhenUnknown &&
    query.data &&
    query.data.items.every(
      (item) =>
        item.state === "unknown" &&
        item.used === null &&
        item.remaining === undefined,
    )
  ) {
    return null;
  }

  return (
    <section className="rounded-box border border-[var(--hairline)] bg-base-100 p-4 shadow-[var(--shadow-raise)]">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-sm font-semibold">
          {title ?? t("Kota ve sınırlar")}
        </h2>
        {refreshable ? (
          <RefreshButton
            onRefresh={() => void query.refetch()}
            isFetching={query.isFetching}
            dataUpdatedAt={query.dataUpdatedAt}
          />
        ) : null}
      </div>
      <div className="mt-3">
        <QuotaBody query={query} />
      </div>
    </section>
  );
}

function QuotaBody({ query }: { query: ReturnType<typeof useQuotaStatus> }) {
  if (query.isPending) {
    return (
      <div className="space-y-4" aria-busy>
        <div className="skeleton h-12" />
        <div className="skeleton h-12" />
      </div>
    );
  }
  if (query.isError) {
    return (
      <QueryErrorState
        error={query.error}
        onRetry={() => void query.refetch()}
        title={t("Kota bilgisi yüklenemedi")}
        compact
      />
    );
  }
  if (query.data.items.length === 0) {
    return (
      <EmptyState
        icon={Gauge}
        title={t("Gösterilecek sınır yok")}
        description={t("Bu bölümde izlenen bir kota yok.")}
        compact
      />
    );
  }
  return (
    <ul className="divide-y divide-[var(--hairline)]">
      {query.data.items.map((item) => (
        <li key={item.id} className="py-3 first:pt-0 last:pb-0">
          <QuotaMeter item={item} showDetail />
        </li>
      ))}
    </ul>
  );
}
