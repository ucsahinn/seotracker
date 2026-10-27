import { useEffect } from "react";
import { RefreshCw } from "lucide-react";
import { formatDateTime } from "@/shared/format";
import { t } from "@/shared/i18n";
import { useDashboardRefresh } from "./useDashboardRefresh";
function sourceLabel(source: string) {
  if (source === "searchPerformanceView") return "Search Console";
  if (source === "ga4Overview") return "Google Analytics";
  if (source === "projectSetup") return t("Proje bilgisi");
  if (source.startsWith("google")) return "Google";
  if (source === "dashboardActivation") return t("Ayarlar");
  return t("Site denetimi");
}
export function PanelRefreshButton({ projectId }: { projectId: string }) {
  const refresh = useDashboardRefresh(projectId);
  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      const el = e.target instanceof HTMLElement ? e.target : null;
      if (
        e.key.toLowerCase() !== "r" ||
        e.ctrlKey ||
        e.altKey ||
        e.metaKey ||
        e.defaultPrevented ||
        el?.isContentEditable ||
        ["INPUT", "TEXTAREA", "SELECT"].includes(el?.tagName ?? "") ||
        refresh.isFetching
      )
        return;
      void refresh.onRefresh();
    };
    document.addEventListener("keydown", handle);
    return () => document.removeEventListener("keydown", handle);
  }, [refresh]);
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span role="status" className="text-xs text-muted">
        {refresh.isFetching
          ? t("Güncelleniyor")
          : refresh.outcome === "partial"
            ? t(
                "Bazı veriler yenilenemedi; önbellekteki tarihleri kontrol edin.",
              )
            : refresh.outcome === "success"
              ? t("Yenilendi")
              : refresh.dataUpdatedAt
                ? t("Veri alındı: {time}", {
                    time: formatDateTime(
                      new Date(refresh.dataUpdatedAt).toISOString(),
                    ),
                  })
                : null}
      </span>
      <details className="text-xs text-muted">
        <summary className="flex min-h-11 cursor-pointer items-center px-1">
          {t("Veri hakkında")}
        </summary>
        <ul className="space-y-2">
          {refresh.sources.map((source) => (
            <li key={source.key}>
              {sourceLabel(source.source)} ·{" "}
              {source.updatedAt
                ? formatDateTime(new Date(source.updatedAt).toISOString())
                : "–"}
              {source.failed ? (
                <p className="text-[var(--ink-warning)]">
                  {t(
                    "Son yenileme başarısız; önbellekteki veriler gösteriliyor.",
                  )}
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      </details>
      <button
        type="button"
        className="btn btn-sm min-h-11"
        disabled={refresh.isFetching}
        aria-busy={refresh.isFetching}
        aria-keyshortcuts="r"
        onClick={() => void refresh.onRefresh()}
      >
        <RefreshCw className="size-4" aria-hidden />
        {t("Yenile")}
      </button>
    </div>
  );
}
