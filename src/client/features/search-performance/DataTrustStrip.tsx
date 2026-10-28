import { t } from "@/shared/i18n";
import { Link } from "@tanstack/react-router";
import {
  CalendarCheck,
  ChevronDown,
  EyeOff,
  Globe,
  Hourglass,
  Rows3,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { SearchPerformanceView } from "@/shared/searchPerformanceView";
import type { CompareMode } from "@/client/features/search-performance/searchTabs";
import {
  formatCount,
  formatDate,
  formatDateTime,
  formatPercent,
} from "@/client/lib/format";

function Item({
  icon: Icon,
  children,
}: {
  icon: LucideIcon;
  children: React.ReactNode;
}) {
  return (
    <li className="flex min-w-0 items-start gap-2">
      <Icon className="mt-0.5 size-3.5 shrink-0 text-subtle" aria-hidden />
      <span className="min-w-0 [overflow-wrap:anywhere]">{children}</span>
    </li>
  );
}

/**
 * A Search Console property as a person names it: "ornek-site.com", not
 * "sc-domain:ornek-site.com" or "https://ornek-site.com/". The raw form
 * stays in the tooltip, since that is what Search Console itself lists.
 */
function propertyLabel(siteUrl: string): string {
  return siteUrl
    .replace(/^sc-domain:/, "")
    .replace(/^https?:\/\//, "")
    .replace(/\/$/, "");
}

/**
 * What the numbers below are, in two tiers. Always visible: up to which day
 * they are final, how many days Google is still counting, and what they are
 * compared with. Behind "About the data": what Search Console withholds,
 * whether a table hit its row limit, and what the view cost. Every claim
 * comes from the view; nothing is guessed.
 */
export function DataTrustStrip({
  projectId,
  view,
  compare,
}: {
  projectId: string;
  view: SearchPerformanceView;
  compare: CompareMode;
}) {
  const { window, totals, coverage } = view;
  const provisionalDays = view.series.daily.filter(
    (p) => p.state === "provisional" || p.state === "pending",
  ).length;
  const hidden = coverage.hiddenQueries;
  const truncatedTables = [
    coverage.queries.truncated ? t("sorgular") : null,
    coverage.pages.truncated ? t("sayfalar") : null,
    coverage.queryPages.truncated ? t("sorgu-sayfa eşleşmeleri") : null,
  ].filter(Boolean);

  const settled =
    provisionalDays > 0
      ? t(
          "Veriler {date} tarihine kadar kesin; son {count} gün hâlâ sayılıyor (grafikte taralı).",
          { date: formatDate(window.endDate), count: provisionalDays },
        )
      : t("Veriler {date} tarihine kadar kesin.", {
          date: formatDate(window.endDate),
        });

  const comparison =
    compare === "none"
      ? null
      : compare === "yoy"
        ? window.yoy && totals.yoy
          ? t("Karşılaştırma: geçen yılın aynı günleri ({start} – {end}).", {
              start: formatDate(window.yoy.startDate),
              end: formatDate(window.yoy.endDate),
            })
          : t(
              "Geçen yıl karşılaştırılamıyor: Google bu günleri artık vermiyor (en fazla 16 ay).",
            )
        : totals.previous
          ? t("Karşılaştırma: önceki {days} gün ({start} – {end}).", {
              days: window.days,
              start: formatDate(window.previous.startDate),
              end: formatDate(window.previous.endDate),
            })
          : t("Önceki dönem karşılaştırılamıyor: Google bu günleri vermiyor.");

  return (
    <section
      aria-label={t("Verinin durumu")}
      className="rounded-box border border-[var(--hairline)] bg-base-100 text-xs text-muted"
    >
      <div className="flex flex-col gap-2 px-4 py-2.5 lg:flex-row lg:items-center lg:gap-4">
        <p className="flex min-w-0 flex-1 items-start gap-2">
          <CalendarCheck
            className="mt-0.5 size-3.5 shrink-0 text-subtle"
            aria-hidden
          />
          <span className="min-w-0">
            {settled}
            {comparison ? ` ${comparison}` : null}
          </span>
        </p>
        <Link
          to="/p/$projectId/settings/integrations"
          params={{ projectId }}
          className="link link-hover inline-flex min-w-0 shrink-0 items-center gap-1.5 self-start lg:self-auto"
          title={t("Search Console mülkü: {site}", { site: view.siteUrl })}
        >
          <Globe className="size-3.5 shrink-0 text-subtle" aria-hidden />
          <span className="truncate">{propertyLabel(view.siteUrl)}</span>
        </Link>
      </div>
      <details className="group border-t border-[var(--hairline)]">
        <summary className="flex min-h-9 cursor-pointer list-none items-center gap-1.5 px-4 py-1.5 font-medium text-muted hover:text-base-content focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary [&::-webkit-details-marker]:hidden">
          <ChevronDown
            className="size-3.5 transition-transform group-open:rotate-180"
            aria-hidden
          />
          {t("Veri hakkında")}
        </summary>
        <ul className="grid gap-x-6 gap-y-2 px-4 pb-3 pt-1 sm:grid-cols-2">
          <Item icon={CalendarCheck}>
            {t(
              "Kesin günler: {start} – {end} ({days} gün). Search Console bir günü birkaç gün boyunca saymaya devam eder; toplamlar ve karşılaştırmalar yalnızca sayımı bitmiş günleri kullanır. Günler Google'ın kullandığı Pasifik saatine göredir.",
              {
                start: formatDate(window.startDate),
                end: formatDate(window.endDate),
                days: window.days,
              },
            )}
          </Item>
          <Item icon={Hourglass}>
            {provisionalDays > 0
              ? window.incompleteSource === "assumed"
                ? t(
                    "Son {count} gün hâlâ sayılıyor olabilir (Google tarih bildirmedi); toplamlara katılmadı.",
                    { count: provisionalDays },
                  )
                : t("Son {count} gün hâlâ sayılıyor; toplamlara katılmadı.", {
                    count: provisionalDays,
                  })
              : t("Kesinleşmemiş gün yok.")}
            {window.lastDataDate
              ? ` ${t("Son veri: {date}.", { date: formatDate(window.lastDataDate) })}`
              : ` ${t("Bu dönem için Google'dan hiç satır gelmedi.")}`}
          </Item>
          <Item icon={EyeOff}>
            {hidden.clickShare === null
              ? t("Gizli sorgu payı hesaplanamadı (tıklama yok).")
              : hidden.exact
                ? t(
                    "Tıklamaların {share} kadarı ({clicks}) Google'ın gizlilik nedeniyle göstermediği aramalardan geliyor. Site toplamına dahil, sorgu tablosunda yok; bu yüzden sorgu tablosunun toplamı daha küçüktür.",
                    {
                      share: formatPercent(hidden.clickShare),
                      clicks: formatCount(hidden.clicks ?? 0),
                    },
                  )
                : t(
                    "Tıklamaların {share} kadarı, Google'ın gizlilik nedeniyle göstermediği ya da satır sınırının dışında kalan aramalardan geliyor. Site toplamına dahil, sorgu tablosunda yok.",
                    { share: formatPercent(hidden.clickShare) },
                  )}
          </Item>
          <Item icon={Rows3}>
            {truncatedTables.length > 0
              ? t(
                  "Satır sınırına ulaşıldı ({tables}); en az tıklanan uç eksik. Daraltmak için filtre kullanın.",
                  { tables: truncatedTables.join(", ") },
                )
              : t("Tablolar tam: {queries} sorgu, {pages} sayfa okundu.", {
                  queries: formatCount(coverage.queries.rows),
                  pages: formatCount(coverage.pages.rows),
                })}
          </Item>
          <Item icon={Globe}>
            {view.quota.fetchedAt && (
              <span>
                {t("Google verisi alındı: {date}", {
                  date: formatDateTime(view.quota.fetchedAt),
                })}{" "}
              </span>
            )}
            {view.quota.requests > 0
              ? t("Bu görünüm için Google'a {count} istek gönderildi.", {
                  count: view.quota.requests,
                })
              : t(
                  "Bu görünüm birkaç dakika içinde alınmış yanıtlardan geldi; Google'a yeni istek gönderilmedi.",
                )}{" "}
            <span className="text-subtle">
              {t("Mülk: {site}", { site: view.siteUrl })}
            </span>
          </Item>
          <Item icon={EyeOff}>
            {t(
              "Google anonim sorguları gizler. API, arama türü başına günde en fazla {limit} satır sunar; sorgu ve sayfa ayrıntılarında başka satırları da atlayabilir. Tam sayfalama, tüm aramaların listelendiği anlamına gelmez.",
              { limit: formatCount(50_000) },
            )}
          </Item>
        </ul>
      </details>
    </section>
  );
}
