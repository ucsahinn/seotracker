import { Gauge } from "lucide-react";
import { HelpTip } from "@/client/components/HelpTip";
import { EmptyState } from "@/client/components/EmptyState";
import { StatusPill } from "@/client/components/StatusPill";
import { QuotaCard } from "./QuotaCard";
import { STATE_META, worstQuotaState } from "./quotaPresentation";
import { useActiveProjectId } from "./useActiveProjectId";
import { useQuotaStatus } from "./useQuotaStatus";

/**
 * "Google ve sistem sınırları" for the app-level screens. One collapsed
 * block: the heading carries the worst state, so a calm install costs a line
 * and a tight one is visible without opening anything.
 */
export function SystemLimitsSection({ id }: { id?: string }) {
  const { projectId, isPending, isError } = useActiveProjectId();

  return (
    <section id={id} className="scroll-mt-16 space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <h2 className="flex items-center gap-1.5 text-base font-semibold">
          Google ve sistem sınırları
          <HelpTip label="Google ve sistem sınırları">
            Search Console, GA4 ve PageSpeed&apos;in günlük sınırları ile
            denetim ve rapor üst sınırları. Rakamlar uygulamanın kendi kaydından
            gelir; Google&apos;a ek istek gitmez. Sınırlar proje bazında okunur.
          </HelpTip>
        </h2>
        {projectId ? <WorstStateBadge projectId={projectId} /> : null}
      </div>
      {isPending ? <div className="skeleton h-10 w-full" /> : null}
      {!isPending && !projectId ? (
        <EmptyState
          icon={Gauge}
          title={isError ? "Projeler okunamadı" : "Henüz bir proje yok"}
          description={
            isError
              ? "Sınırlar proje bazında gösterilir; proje listesi yüklenince burada görünür."
              : "Sınırlar proje bazında gösterilir. Bir proje oluşturunca burada görünür."
          }
          compact
        />
      ) : null}
      {projectId ? (
        <details>
          <summary className="link cursor-pointer text-sm">
            Sınırları göster
          </summary>
          <div className="mt-3">
            <QuotaCard projectId={projectId} kinds="all" title="Güncel durum" />
          </div>
        </details>
      ) : null}
    </section>
  );
}

function WorstStateBadge({ projectId }: { projectId: string }) {
  const query = useQuotaStatus(projectId, "all");
  if (!query.data) return null;
  const state = worstQuotaState(query.data.items);
  return (
    <StatusPill
      tone={
        state === "ok" ? "success" : state === "unknown" ? "neutral" : "warning"
      }
      label={STATE_META[state].label}
    />
  );
}
