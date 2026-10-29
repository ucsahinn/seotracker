import { t } from "@/shared/i18n";
import { FactStrip } from "@/client/components/FactStrip";
import { Link } from "@tanstack/react-router";
import { CalendarCheck, EyeOff, Globe, Hourglass, Rows3 } from "lucide-react";
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

  const assumed = window.incompleteSource === "assumed";
  const settled = assumed
    ? t("Toplamların son günü: {date}.", { date: formatDate(window.endDate) })
    : provisionalDays > 0
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
    <FactStrip
      label={t("Verinin durumu")}
      facts={[
        { label: t("Kaynak"), value: "Search Console" },
        {
          label: t("Site"),
          value: (
            <Link
              to="/p/$projectId/settings/integrations"
              params={{ projectId }}
              className="btn btn-ghost btn-sm max-w-full"
              title={t("Search Console mülkü: {site}", { site: view.siteUrl })}
            >
              <Globe className="size-3.5 shrink-0 text-subtle" aria-hidden />
              <span className="truncate">{propertyLabel(view.siteUrl)}</span>
            </Link>
          ),
        },
        {
          label: t("Dönem"),
          value: `${formatDate(window.startDate)} – ${formatDate(window.endDate)}`,
        },
        {
          label: assumed
            ? t("Toplamların son günü")
            : t("Google'ın kesinleştirdiği veri"),
          value: formatDate(window.endDate),
          hint: assumed ? t("Gecikme varsayıldı") : undefined,
        },
        {
          label: t("Geçici veri"),
          value: t("{count} gün", { count: formatCount(provisionalDays) }),
          hint:
            provisionalDays > 0
              ? t("Google son günleri sonradan düzeltebilir.")
              : undefined,
        },
        {
          label: t("Karşılaştırma"),
          value:
            compare === "none"
              ? t("Yok")
              : compare === "yoy" && window.yoy && totals.yoy
                ? `${formatDate(window.yoy.startDate)} – ${formatDate(window.yoy.endDate)}`
                : compare === "previous" && totals.previous
                  ? `${formatDate(window.previous.startDate)} – ${formatDate(window.previous.endDate)}`
                  : t("Karşılaştırma yok"),
        },
      ]}
      detailsLabel={t("Veri hakkında")}
      details={
        <div className="space-y-4 text-sm text-muted">
          <p className="max-w-prose">
            {settled} {comparison}
            {assumed
              ? ` ${t("Google kesinleşme tarihi bildirmedi; son günler gecikme varsayımıyla toplamların dışında tutuldu.")}`
              : null}
          </p>
          <ul className="grid gap-x-6 gap-y-4 sm:grid-cols-2">
            <Item icon={CalendarCheck}>
              {t(
                assumed
                  ? "Toplamlara dahil günler: {start} – {end} ({days} gün). Günler Google'ın kullandığı Pasifik saatine göredir."
                  : "Kesin günler: {start} – {end} ({days} gün). Search Console bir günü birkaç gün boyunca saymaya devam eder; toplamlar ve karşılaştırmalar yalnızca sayımı bitmiş günleri kullanır. Günler Google'ın kullandığı Pasifik saatine göredir.",
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
                : assumed
                  ? t("Bu dönemden sonra geçici veri alınmadı.")
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
        </div>
      }
    />
  );
}
