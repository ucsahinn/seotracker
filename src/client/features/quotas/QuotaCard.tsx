import { Gauge } from "lucide-react";
import { EmptyState } from "@/client/components/EmptyState";
import { QueryErrorState } from "@/client/components/QueryErrorState";
import { RefreshButton } from "@/client/components/RefreshButton";
import type { QuotaKind } from "@/server/features/quotas/quotaTypes";
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
  title = "Kota ve sınırlar",
}: {
  projectId: string;
  kinds?: readonly QuotaKind[] | "all";
  title?: string;
}) {
  const query = useQuotaStatus(projectId, kinds);

  return (
    <section className="rounded-box border border-[var(--hairline)] bg-base-100 p-4 shadow-[var(--shadow-raise)]">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-sm font-semibold">{title}</h2>
        <RefreshButton
          onRefresh={() => void query.refetch()}
          isFetching={query.isFetching}
          dataUpdatedAt={query.dataUpdatedAt}
        />
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
        title="Kota bilgisi yüklenemedi"
        compact
      />
    );
  }
  if (query.data.items.length === 0) {
    return (
      <EmptyState
        icon={Gauge}
        title="Gösterilecek sınır yok"
        description="Bu bölüm için izlenen bir kota bulunmuyor."
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
