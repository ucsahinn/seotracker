import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { AlertCircle, FileText } from "lucide-react";
import { EmptyState } from "@/client/components/EmptyState";
import { QueryErrorState } from "@/client/components/QueryErrorState";
import { StatusPill } from "@/client/components/StatusPill";
import { formatCount, formatDate } from "@/client/lib/format";
import { getSitemapReport } from "@/serverFunctions/sitemaps";
import { t } from "@/shared/i18n";

/* Turkish source strings, translated by t() where they are used. */
const CONTENT_LABELS: Record<string, string> = {
  web: "web",
  image: "görsel",
  video: "video",
  news: "haber",
};

/**
 * "120 web, 30 görsel gönderilmiş". Google no longer returns indexed counts,
 * so this is only what the file declared. Types with nothing submitted are
 * left out; with no per-type data it falls back to the plain total.
 */
function describeSubmitted(sitemap: {
  submitted: number;
  contents: { type: string | null; submitted: number }[];
}): string {
  const parts = sitemap.contents
    .filter((entry) => entry.submitted > 0)
    .map((entry) => {
      const known = entry.type ? CONTENT_LABELS[entry.type] : undefined;
      const label = known ? t(known) : (entry.type ?? "");
      return `${formatCount(entry.submitted)} ${label}`.trim();
    });
  if (parts.length === 0)
    return t("{count} adres", { count: sitemap.submitted });
  return t("{list} gönderilmiş", { list: parts.join(", ") });
}

/**
 * Google's side of the sitemap conversation.
 *
 * The crawler already reads sitemaps to find pages. This reads what Google
 * did with the one it was given: whether it ever downloaded the file, when,
 * and how many errors it found. When pages are missing from the index those
 * are different problems with different fixes, and the tool could not tell
 * them apart.
 */
export function SitemapStatusPanel({ projectId }: { projectId: string }) {
  const query = useQuery({
    queryKey: ["sitemapReport", projectId],
    queryFn: () => getSitemapReport({ data: { projectId } }),
  });

  if (query.isPending) {
    return <div className="skeleton h-32" aria-busy />;
  }

  if (query.isError) {
    return (
      <div className="rounded-box border border-base-300 bg-base-100">
        <QueryErrorState
          compact
          error={query.error}
          onRetry={() => void query.refetch()}
          title={t("Site haritaları okunamadı")}
        />
      </div>
    );
  }

  if (query.data.status === "not_connected") {
    return (
      <div className="rounded-box border border-base-300 bg-base-100">
        <EmptyState
          compact
          icon={FileText}
          title={t("Search Console bağlı değil")}
          description={t(
            "Site haritalarınızı Google'ın gözünden görmek için Search Console bağlantısı gerekir.",
          )}
          action={
            <Link
              to="/p/$projectId/settings/integrations"
              params={{ projectId }}
              className="btn btn-sm"
            >
              {t("Bağlantılar")}
            </Link>
          }
        />
      </div>
    );
  }

  if (query.data.status === "forbidden") {
    return (
      <div className="rounded-box border border-base-300 bg-base-100 p-4 text-sm text-muted">
        {t(
          "Google bu mülkün site haritalarını vermedi. Hesabınızın Search Console'da site haritası gönderme yetkisi yoksa, mülke erişseniz bile bu listeyi göremezsiniz.",
        )}
      </div>
    );
  }

  const { sitemaps } = query.data;

  if (sitemaps.length === 0) {
    return (
      <div className="rounded-box border border-base-300 bg-base-100">
        {/* Not an error. Google finds pages without one; a sitemap is how a
            site states which pages it considers worth crawling. */}
        <EmptyState
          compact
          icon={FileText}
          title={t("Gönderilmiş site haritası yok")}
          description={t(
            "Google site haritası olmadan da sayfa bulur. Ama site haritası, hangi sayfaları önemsediğinizi ona doğrudan söylemenin yoludur.",
          )}
        />
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-box border border-base-300 bg-base-100">
      <div className="border-b border-base-300 px-4 py-3">
        <h3 className="text-sm font-medium">{t("Site haritaları")}</h3>
        <p className="mt-0.5 text-xs text-muted">
          {t("Google'a gönderdikleriniz ve Google'ın onlarla ne yaptığı.")}
        </p>
      </div>
      <ul>
        {sitemaps.map((sitemap) => (
          <li
            key={sitemap.path}
            className="flex flex-col gap-2 border-b border-base-300 px-4 py-3 last:border-b-0 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="min-w-0">
              <p className="truncate font-mono text-xs" title={sitemap.path}>
                {sitemap.path}
              </p>
              <p className="mt-0.5 text-xs text-muted">
                {describeSubmitted(sitemap)}
                {sitemap.isSitemapsIndex ? ` · ${t("dizin dosyası")}` : ""}
                {" · "}
                {sitemap.lastDownloaded
                  ? t("son indirme {date}", {
                      date: formatDate(sitemap.lastDownloaded),
                    })
                  : t("Google hiç indirmedi")}
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap items-center gap-2">
              {sitemap.errors > 0 ? (
                <span className="inline-flex items-center gap-1 text-xs text-[var(--ink-error)]">
                  <AlertCircle className="size-3.5" />
                  {t("{count} hata", { count: sitemap.errors })}
                </span>
              ) : null}
              {sitemap.warnings > 0 ? (
                <span className="text-xs text-[var(--ink-warning)]">
                  {t("{count} uyarı", { count: sitemap.warnings })}
                </span>
              ) : null}
              {/* Never downloaded is the finding that matters most here and
                  is the easiest to miss: a sitemap can sit submitted and
                  unread for months while the operator assumes it is working. */}
              <StatusPill
                tone={
                  sitemap.errors > 0
                    ? "warning"
                    : sitemap.isPending || !sitemap.lastDownloaded
                      ? "neutral"
                      : "success"
                }
                label={
                  sitemap.errors > 0
                    ? t("Hatalı")
                    : sitemap.isPending
                      ? t("İşlenmedi")
                      : sitemap.lastDownloaded
                        ? t("Okundu")
                        : t("İndirilmedi")
                }
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
