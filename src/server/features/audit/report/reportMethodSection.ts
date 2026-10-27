import {
  formatCount,
  formatDate,
  formatDateTime,
  formatDuration,
  parseTimestamp,
} from "@/shared/format";
import { t } from "@/shared/i18n";
import { escapeHtml } from "./reportFormat";
import type { AuditReportInput, ReportCaps } from "./reportTypes";

function crawlLine(input: AuditReportInput): string {
  const base = t("{count} sayfa tarandı, başlangıç adresi {url}.", {
    count: input.pagesCrawled,
    url: input.siteUrl,
  });
  if (typeof input.maxPages !== "number") return base;
  const hit = input.pagesCrawled >= input.maxPages;
  const limit = hit
    ? t(
        "Tarama üst sınırı {count} sayfaydı; sınıra ulaşıldı, yani site bundan büyük olabilir ve görülmeyen sayfalardaki sorunlar rapora girmedi.",
        { count: input.maxPages },
      )
    : t("Tarama üst sınırı {count} sayfaydı.", { count: input.maxPages });
  return `${base} ${limit}`;
}

function speedLine(input: AuditReportInput): string {
  if (input.lighthouseMode === "none") {
    return t("Hız ölçümü bu denetimde kapalıydı.");
  }
  const mobile = input.lighthouse.filter(
    (r) => r.strategy === "mobile" && r.performanceScore !== null,
  ).length;
  if (mobile === 0) return t("Hiçbir sayfa için hız puanı kaydedilmedi.");
  return t(
    "{count} sayfa Lighthouse ile ölçüldü (laboratuvar verisi, tek sanal cihaz). Ölçülmeyen sayfalar hakkında hız bilgisi yoktur.",
    { count: mobile },
  );
}

function durationLine(input: AuditReportInput): string {
  // parseTimestamp, not Date.parse: started_at on older audits is SQLite's
  // zone-less "YYYY-MM-DD HH:MM:SS", which Date.parse reads as local time
  // while completed_at is ISO (UTC).
  const start = parseTimestamp(input.startedAt);
  const end = input.completedAt ? parseTimestamp(input.completedAt) : NaN;
  const hasSpan =
    Number.isFinite(start) && Number.isFinite(end) && end >= start;
  const started = formatDateTime(input.startedAt);
  const when = !input.completedAt
    ? t("Başlangıç {start}.", { start: started })
    : hasSpan
      ? t("Başlangıç {start}, bitiş {end}, süre {duration}.", {
          start: started,
          end: formatDateTime(input.completedAt),
          duration: formatDuration(end - start),
        })
      : t("Başlangıç {start}, bitiş {end}.", {
          start: started,
          end: formatDateTime(input.completedAt),
        });
  return `${when} ${t("Rapor o andaki durumu gösterir; site sonradan değişmiş olabilir.")}`;
}

/* Turkish source text, shown through t(). */
const NOT_MEASURED = [
  "Bu rapor GA4 oturum veya gelir raporu değildir.",
  "Geri bağlantılar ve rakip siteler.",
  "İçeriğin kalitesi, arama niyetine uygunluğu ve özgünlüğü; yalnızca kelime sayısı gibi yapısal sinyallere bakılır.",
  "Giriş gerektiren sayfalar ve taramanın ulaşamadığı adresler.",
];

export function methodSection(
  input: AuditReportInput,
  caps: ReportCaps,
): string {
  const traffic = input.insights?.traffic;
  const source = traffic?.source;
  const speed = input.insights?.speed;
  const hasField = [speed?.page, speed?.origin].some(
    (field) =>
      field &&
      (field.largestContentfulPaint ||
        field.cumulativeLayoutShift ||
        field.interactionToNextPaint ||
        field.firstContentfulPaint ||
        field.timeToFirstByte),
  );
  const rows: Array<[string, string]> = [
    [
      t("Search Console sayfa trafiği"),
      traffic
        ? t("Dönem: {start} – {end} (Pasifik). Okunan sayfa satırı: {rows}.", {
            start: formatDate(traffic.startDate),
            end: formatDate(traffic.endDate),
            rows: formatCount(source?.fetchedRows ?? traffic.rows.length),
          }) +
          " " +
          (source
            ? t(
                "Mülk: {property}. Alınma zamanı: {time}. Satır sınırı: {limit}.",
                {
                  property: source.property,
                  time: formatDateTime(source.retrievedAt),
                  limit: formatCount(source.rowLimit),
                },
              ) +
              " " +
              (source.capped
                ? t(
                    "Kaynak satır sınırına ulaştı; sonuçlar yalnızca okunan kayıtları kapsar.",
                  )
                : "")
            : t("Kaynak ayrıntıları bu kayıtta mevcut değil."))
        : t(
            "Search Console sayfa trafiği alınamadı; trafik yokluğu sonucu çıkarılamaz.",
          ),
    ],
    [
      t("Gerçek kullanıcı hızı"),
      speed && hasField
        ? t(
            "Mobil CrUX: {url}. Kaydedilen PageSpeed ölçümü: {time}. Sayfa ve origin kapsamları ayrı gösterilir; kayan 28 günlük veri denetim süresi değildir.",
            { url: speed.url, time: formatDateTime(speed.fetchedAt) },
          )
        : t(
            "Bu kayıtta kullanılabilir CrUX verisi yok; laboratuvar ölçümü gerçek kullanıcı ölçümü değildir.",
          ),
    ],
    [
      t("Site haritası"),
      input.siteFacts?.sitemap.urlCount !== null &&
      input.siteFacts?.sitemap.urlCount !== undefined
        ? t(
            "Harita keşif toplamları Anlık veri bölümündedir. Harita kapsamı oranı yalnızca taranan sayfaları kullanır; tüm harita adreslerinin tarandığını göstermez.",
          )
        : t(
            "Kaydedilmiş harita keşif toplamı mevcut değil; kapsam oranı yalnızca taranan sayfaları kullanır.",
          ),
    ],
    [t("Tarama"), crawlLine(input)],
    [t("Tarih aralığı"), durationLine(input)],
    [t("Hız ölçümü"), speedLine(input)],
    [
      t("Google dizin durumu"),
      input.indexCoverage && input.indexCoverage.asked > 0
        ? t(
            "Search Console URL Denetleme Aracı'nın kayıtlı yanıtları; {count} sayfa için Google yanıt verdi. Rapor Google'a yeni istek atmaz.",
            { count: input.indexCoverage.checked },
          )
        : t("Bu denetim için kayıtlı Google yanıtı yok, bölüm boş."),
    ],
    [
      t("Listelerdeki kesintiler"),
      t(
        "Dosya boyutunu makul tutmak için her sorunun altında en fazla {issuePages} adres, sayfa tablosunda {pages} sayfa, hız tablosunda {speed} sayfa yazılır; kesilen her listenin altında kaç kaydın dışarıda kaldığı belirtilir. Tam kayıtlar denetim ekranındadır.",
        {
          issuePages: formatCount(caps.issuePages),
          pages: formatCount(caps.pages),
          speed: formatCount(caps.speed),
        },
      ),
    ],
  ];
  return `<section id="yontem">
    <h2>${t("8. Yöntem ve sınırlar")}</h2>
    <dl class="method">${rows
      .map(
        ([k, v]) =>
          `<div><dt>${escapeHtml(k)}</dt><dd>${escapeHtml(v)}</dd></div>`,
      )
      .join("")}</dl>
    <h3>${t("Bu raporda ölçülmeyenler")}</h3>
    <ul class="plain">${NOT_MEASURED.map((line) => `<li>${escapeHtml(t(line))}</li>`).join("")}</ul>
  </section>`;
}
