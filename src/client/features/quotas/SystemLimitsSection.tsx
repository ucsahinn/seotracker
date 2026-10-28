import { useState } from "react";
import { Gauge } from "lucide-react";
import { HelpTip } from "@/client/components/HelpTip";
import { EmptyState } from "@/client/components/EmptyState";
import { StatusPill } from "@/client/components/StatusPill";
import { t } from "@/shared/i18n";
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
  const {
    projectId: fallbackId,
    projects,
    isPending,
    isError,
  } = useActiveProjectId();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const projectId = projects.some((project) => project.id === selectedId)
    ? selectedId
    : fallbackId;

  return (
    <section id={id} className="scroll-mt-16 space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <h2 className="flex items-center gap-1.5 text-base font-semibold">
          {t("Google ve sistem sınırları")}
          <HelpTip label={t("Google ve sistem sınırları")}>
            {t(
              "Search Console, GA4 ve PageSpeed'in günlük sınırları, bir de denetim ve rapor üst sınırları. Rakamlar uygulamanın kendi kaydından gelir, Google'a ek istek gitmez. Sınırlar proje başına gösterilir.",
            )}
          </HelpTip>
        </h2>
        {projectId ? <WorstStateBadge projectId={projectId} /> : null}
      </div>
      {projectId ? (
        <label className="flex flex-wrap items-center gap-3 text-sm">
          {t("Sınırları gösterilen proje")}
          <select
            className="select min-h-11 w-full sm:w-auto"
            value={projectId}
            onChange={(event) => setSelectedId(event.target.value)}
          >
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
        </label>
      ) : null}
      {isPending ? <div className="skeleton h-10 w-full" /> : null}
      {!isPending && !projectId ? (
        <EmptyState
          icon={Gauge}
          title={isError ? t("Projeler okunamadı") : t("Henüz bir proje yok")}
          description={
            isError
              ? t(
                  "Sınırlar proje başına gösterilir. Proje listesi yüklenince burada görünür.",
                )
              : t(
                  "Sınırlar proje başına gösterilir. Bir proje oluşturunca burada görünür.",
                )
          }
          compact
        />
      ) : null}
      {projectId ? (
        <details>
          <summary className="link cursor-pointer text-sm">
            {t("Sınırları göster")}
          </summary>
          <div className="mt-3">
            <QuotaCard
              projectId={projectId}
              kinds="all"
              title={t("Güncel durum")}
            />
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
  const unknownCount = query.data.items.filter(
    (item) => item.state === "unknown",
  ).length;
  return (
    <StatusPill
      tone={
        state === "ok" && !unknownCount && !query.isError
          ? "success"
          : state === "unknown"
            ? "neutral"
            : "warning"
      }
      label={
        query.isError
          ? t("Sınırlar yenilenemedi; son kayıt gösteriliyor")
          : unknownCount
            ? t("{state} · {count} sınırın kullanımı bilinmiyor", {
                state:
                  state === "ok"
                    ? t("Bilinen sınırlarda sorun yok")
                    : t(STATE_META[state].label),
                count: unknownCount,
              })
            : t(STATE_META[state].label)
      }
    />
  );
}
