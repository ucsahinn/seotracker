import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { AlertCircle, FileText } from "lucide-react";
import { EmptyState } from "@/client/components/EmptyState";
import { QueryErrorState } from "@/client/components/QueryErrorState";
import { StatusPill } from "@/client/components/StatusPill";
import { formatCount, formatDate } from "@/client/lib/format";
import { getSitemapReport } from "@/serverFunctions/sitemaps";

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
          title="Site haritaları okunamadı"
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
          title="Search Console bağlı değil"
          description="Site haritalarınızı Google'ın gözünden görmek için Search Console bağlantısı gerekir."
          action={
            <Link
              to="/p/$projectId/settings/integrations"
              params={{ projectId }}
              className="btn btn-sm"
            >
              Entegrasyonlar
            </Link>
          }
        />
      </div>
    );
  }

  if (query.data.status === "forbidden") {
    return (
      <div className="rounded-box border border-base-300 bg-base-100 p-4 text-sm text-muted">
        Google bu mülkün site haritalarını listelemeyi reddetti. Search
        Console&apos;da site haritası gönderme yetkisi olmayan bir hesap, mülke
        erişebiliyor olsa da bu listeyi göremeyebilir.
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
          title="Gönderilmiş site haritası yok"
          description="Google site haritası olmadan da sayfa bulur, ancak site haritası hangi sayfaları önemsediğinizi Google'a doğrudan söylemenin yoludur."
        />
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-box border border-base-300 bg-base-100">
      <div className="border-b border-base-300 px-4 py-3">
        <h3 className="text-sm font-medium">Site haritaları</h3>
        <p className="mt-0.5 text-xs text-muted">
          Google&apos;a gönderdikleriniz ve Google&apos;ın onlarla ne yaptığı.
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
                {formatCount(sitemap.submitted)} adres
                {sitemap.isSitemapsIndex ? " · dizin dosyası" : ""}
                {" · "}
                {sitemap.lastDownloaded
                  ? `son indirme ${formatDate(sitemap.lastDownloaded)}`
                  : "Google hiç indirmedi"}
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap items-center gap-2">
              {sitemap.errors > 0 ? (
                <span className="inline-flex items-center gap-1 text-xs text-[var(--ink-error)]">
                  <AlertCircle className="size-3.5" />
                  {formatCount(sitemap.errors)} hata
                </span>
              ) : null}
              {sitemap.warnings > 0 ? (
                <span className="text-xs text-[var(--ink-warning)]">
                  {formatCount(sitemap.warnings)} uyarı
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
                    ? "Hatalı"
                    : sitemap.isPending
                      ? "İşlenmedi"
                      : sitemap.lastDownloaded
                        ? "Okundu"
                        : "İndirilmedi"
                }
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
