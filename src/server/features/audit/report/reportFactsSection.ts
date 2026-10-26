import type { SiteFacts } from "@/server/lib/audit/site-probes/types";
import {
  formatBytes,
  formatCount,
  formatDate,
  formatDecimal,
} from "@/shared/format";
import { t } from "@/shared/i18n";
import {
  SERP_DESCRIPTION_FONT_PX,
  SERP_DESCRIPTION_MAX_PX,
  SERP_TITLE_MAX_PX,
  truncateToPixels,
} from "@/shared/serp-pixel-width";
import { escapeHtml, hostOf, truncate } from "./reportFormat";
import type { ReportContext } from "./reportSections";
import type { AuditReportInput } from "./reportTypes";

/*
 * "Anlık veri": the site as the audit found it, beyond its pages. Every
 * value that was not measured prints "Ölçülmedi", never a failure; every
 * yes/no carries the word next to the mark.
 */

type Insights = NonNullable<AuditReportInput["insights"]>;

const notMeasured = () => `<span class="muted">${t("Ölçülmedi")}</span>`;

function value(text: string | number | null | undefined): string {
  return text === null || text === undefined || text === ""
    ? notMeasured()
    : escapeHtml(String(text));
}

function yesNo(state: boolean | null): string {
  if (state === null) return notMeasured();
  return state
    ? `<span class="ok">✓ ${t("Var")}</span>`
    : `<span class="bad">✕ ${t("Yok")}</span>`;
}

function table(title: string, rows: Array<[string, string]>, note?: string) {
  return `<div class="facts"><h4>${escapeHtml(title)}</h4>${note ? `<p class="note">${escapeHtml(note)}</p>` : ""}<table class="rows"><tbody>${rows
    .map(
      ([label, cell]) =>
        `<tr><td>${escapeHtml(label)}</td><td class="num">${cell}</td></tr>`,
    )
    .join("")}</tbody></table></div>`;
}

const ms = (n: number | null) => (n === null ? null : `${formatCount(n)} ms`);

function expiry(iso: string | null, from: string): string | null {
  if (!iso) return null;
  const days = Math.floor((Date.parse(iso) - Date.parse(from)) / 86_400_000);
  if (Number.isNaN(days)) return formatDate(iso);
  return days < 0
    ? t("{date} (süresi doldu)", { date: formatDate(iso) })
    : t("{date} ({count} gün kaldı)", { date: formatDate(iso), count: days });
}

function serverTables(f: SiteFacts): string {
  const s = f.start;
  const answered = s.status !== null;
  const has = (v: string | boolean | null) =>
    answered ? yesNo(v !== null && v !== false) : notMeasured();
  return `${table(t("Sunucu ve yanıt"), [
    [t("Son adres"), value(s.finalUrl ? truncate(s.finalUrl, 70) : null)],
    [t("Durum kodu"), value(s.status)],
    [t("İlk bayt (TTFB)"), value(ms(s.ttfbMs))],
    [t("Toplam yanıt"), value(ms(s.totalMs))],
    [
      t("HTML boyutu"),
      value(s.htmlBytes === null ? null : formatBytes(s.htmlBytes)),
    ],
    [t("Sıkıştırma"), value(answered ? (s.contentEncoding ?? t("Yok")) : null)],
    [t("Önbellek"), value(s.cacheControl)],
    [t("Sunucu"), value(s.server)],
    [t("Teknoloji ipucu"), value(s.xPoweredBy)],
  ])}
  ${table(t("Güvenlik başlıkları"), [
    [
      t("http'den https'e yönlendirme"),
      yesNo(f.httpsRedirect.redirectsToHttps),
    ],
    ["Strict-Transport-Security (HSTS)", has(s.hsts)],
    ["Content-Security-Policy", has(s.cspPresent)],
    [
      "X-Content-Type-Options",
      answered
        ? yesNo(s.xContentTypeOptions?.toLowerCase() === "nosniff")
        : notMeasured(),
    ],
    [
      t("Çerçeveye gömme koruması"),
      answered
        ? yesNo(s.xFrameOptions !== null || s.cspFrameAncestors === true)
        : notMeasured(),
    ],
    ["Referrer-Policy", has(s.referrerPolicy)],
    ["Permissions-Policy", has(s.permissionsPolicy)],
  ])}`;
}

function domainTables(f: SiteFacts, platform: boolean): string {
  const v = f.hostVariant;
  const soft404 =
    f.notFound.status === null
      ? null
      : f.notFound.redirectedHome
        ? t("Ana sayfaya yönleniyor")
        : f.notFound.status === 404 || f.notFound.status === 410
          ? t("Doğru: {status}", { status: f.notFound.status })
          : t("Hatalı: {status} dönüyor", { status: f.notFound.status });
  return `${table(
    t("Alan adı ve sertifika"),
    [
      [t("Sertifikayı veren"), value(f.certificate.issuer)],
      [
        t("Sertifika bitişi"),
        value(expiry(f.certificate.notAfter, f.checkedAt)),
      ],
      [t("Alan adı"), value(f.domain.domain)],
      [t("Kayıt firması"), value(f.domain.registrar)],
      [t("Alan adı bitişi"), value(expiry(f.domain.expiresAt, f.checkedAt))],
      [t("Asıl adres"), value(v?.canonicalHost)],
      [
        v ? v.alternateHost : t("Diğer adres"),
        value(
          v?.alternateRedirectsToCanonical === null || !v
            ? null
            : v.alternateRedirectsToCanonical
              ? t("Asıl adrese yönleniyor")
              : t("Ayrı açılıyor"),
        ),
      ],
    ],
    platform
      ? t(
          "Site bir barındırma platformunun alt alan adında; kaydı ve DNS'i platforma ait olduğu için alan adı ve DNS kontrolleri yapılmadı.",
        )
      : t(
          "Sertifika bilgisi herkese açık Certificate Transparency kayıtlarından; alan adı bilgisi RDAP'tan.",
        ),
  )}
  ${table(t("Dosyalar ve hata sayfası"), [
    [
      "robots.txt",
      f.robots.status === null ? notMeasured() : yesNo(f.robots.status === 200),
    ],
    [t("robots.txt içinde Sitemap satırı"), yesNo(f.robots.hasSitemapLine)],
    [
      t("Site haritası"),
      value(
        f.sitemap.url
          ? `${truncate(f.sitemap.url, 50)} (${f.sitemap.urlCount === null ? t("sayı alınamadı (tarama sınırı)") : f.sitemap.onHostUrlCount === null ? t("{count} adres", { count: f.sitemap.urlCount }) : t("{count} adres, bu sitede {onHost}", { count: f.sitemap.urlCount, onHost: formatCount(f.sitemap.onHostUrlCount) })})`
          : null,
      ),
    ],
    ["llms.txt", yesNo(f.llmsTxt.found)],
    ["security.txt", yesNo(f.securityTxt.found)],
    ["ads.txt", yesNo(f.adsTxt.found)],
    ["Favicon", yesNo(f.favicon.found)],
    [t("Olmayan bir sayfa"), value(soft404)],
  ])}`;
}

function accessTables(f: SiteFacts, platform: boolean): string {
  const bots =
    f.robots.access.length === 0
      ? [[t("Tarayıcılar"), notMeasured()] as [string, string]]
      : f.robots.access.map((entry): [string, string] => [
          entry.bot,
          entry.blocked ? t("Engelli") : t("İzinli"),
        ]);
  const dns = platform
    ? [["DNS", escapeHtml(t("Platform alan adı"))] as [string, string]]
    : f.dns.records.length === 0
      ? [["DNS", notMeasured()] as [string, string]]
      : f.dns.records
          .slice(0, 30)
          .map((record): [string, string] => [
            record.type,
            escapeHtml(truncate(record.value, 70)),
          ]);
  return `${table(t("Tarayıcı erişimi (robots.txt)"), bots)}${table(t("DNS kayıtları"), dns, f.dns.resolved || f.dns.records.length === 0 ? undefined : t("Bazı sorgular yanıt vermedi; liste eksik olabilir."))}`;
}

function phone(insights: Insights): string {
  // Another page's screenshot would pass for the start page's.
  const shot = insights.speed?.isStartPage ? insights.speed.screenshot : null;
  const page = insights.startPage;
  if (!shot || !page) return "";
  return `<figure class="phone"><p class="phone-bar">${escapeHtml(hostOf(page.url))}</p><img src="${escapeHtml(shot)}" alt="${escapeHtml(t("{url} adresinin telefondaki görünümü", { url: page.url }))}"><figcaption>${t("Mobil hız ölçümünün son ekran görüntüsü")}</figcaption></figure>`;
}

/**
 * `signalsMeasured`: the audit stored site facts, so it also read the
 * per-page signals (twitter:card, analytics ids, JSON-LD types). An older
 * audit never looked, and must not read as "none found".
 */
function previews(
  insights: Insights,
  showScreenshot: boolean,
  signalsMeasured: boolean,
): string {
  const page = insights.startPage;
  if (!page) return "";
  const title = truncateToPixels(page.title ?? "", SERP_TITLE_MAX_PX);
  const description = truncateToPixels(
    page.metaDescription ?? "",
    SERP_DESCRIPTION_MAX_PX,
    SERP_DESCRIPTION_FONT_PX,
  );
  const shot = showScreenshot ? phone(insights) : "";
  return `${shot ? `<div class="preview-row">${shot}` : ""}<div class="grid2">
    <div class="serp"><p class="chart-title">${t("Google arama sonucu önizlemesi")}</p>
      <p class="serp-url">${escapeHtml(truncate(page.url, 80))}</p>
      <p class="serp-title">${title.text ? escapeHtml(title.text) : t("(başlık yok)")}</p>
      <p class="serp-desc">${description.text ? escapeHtml(description.text) : t("(meta açıklama yok; Google sayfadan bir parça seçer)")}</p>
      ${title.truncated ? `<p class="note">${t("Başlık arama sonucunda kesiliyor.")}</p>` : ""}</div>
    <div class="serp"><p class="chart-title">${t("Paylaşım kartı önizlemesi (Open Graph)")}</p>
      <p class="serp-url">${escapeHtml(hostOf(page.url))}</p>
      <p class="serp-title">${escapeHtml(page.ogTitle ?? page.title ?? t("(başlık yok)"))}</p>
      <p class="serp-desc">${escapeHtml(truncate(page.ogDescription ?? page.metaDescription ?? "", 200))}</p>
      <p class="note">og:image: ${page.ogImage ? escapeHtml(truncate(page.ogImage, 80)) : t("og:image yok")}${page.twitterCard ? ` · ${escapeHtml(t("Twitter kartı: {card}", { card: page.twitterCard }))}` : signalsMeasured ? ` · ${t("Twitter kartı tanımlı değil.")}` : ""}</p></div>
  </div>${shot ? "</div>" : ""}`;
}

type Speed = NonNullable<Insights["speed"]>;
type Field = NonNullable<Speed["page"]>;

/** Turkish source text; shown through t(). */
const FIELD_WORD: Record<string, string> = {
  FAST: "İyi",
  AVERAGE: "İyileştirilmeli",
  SLOW: "Zayıf",
};

function fieldTable(speed: Speed | null, speedError: string | null): string {
  if (!speed) {
    return speedError
      ? `<p class="note">${escapeHtml(t("PageSpeed ölçümü bu denetimde sonuç vermedi: {error} Gerçek kullanıcı verisi (CrUX) ölçülmedi.", { error: speedError }))}</p>`
      : `<p class="note">${t("Bu denetimde başlangıç sayfası için PageSpeed ölçümü yok; gerçek kullanıcı verisi (CrUX) ölçülmedi.")}</p>`;
  }
  const stand = speed.isStartPage
    ? ""
    : `<p class="note url">${escapeHtml(t("Başlangıç sayfası ölçülemedi; gösterilen, ölçülen en üst sayfa: {url}", { url: speed.url }))}</p>`;
  const rows: Array<[string, keyof Field, keyof Speed["lab"], boolean]> = [
    ["LCP", "largestContentfulPaint", "lcpMs", false],
    ["INP", "interactionToNextPaint", "inpMs", false],
    ["CLS", "cumulativeLayoutShift", "cls", true],
    ["FCP", "firstContentfulPaint", "fcpMs", false],
    ["TTFB", "timeToFirstByte", "ttfbMs", false],
  ];
  const show = (n: number, cls: boolean) =>
    cls ? formatDecimal(n, 2) : `${formatCount(Math.round(n))} ms`;
  const field = (data: Field | null, key: keyof Field, cls: boolean) => {
    const metric = data?.[key];
    if (!metric || typeof metric === "string") return notMeasured();
    const n = cls ? metric.percentile / 100 : metric.percentile;
    const word = FIELD_WORD[metric.category];
    return `${show(n, cls)}${word ? ` (${t(word)})` : ""}`;
  };
  return `${stand}<table class="rows"><thead><tr><th>${t("Metrik")}</th><th class="num">${t("Bu sayfa, gerçek")}</th><th class="num">${t("Tüm site, gerçek")}</th><th class="num">${t("Laboratuvar")}</th></tr></thead><tbody>${rows
    .map(([name, key, lab, cls]) => {
      const labValue = speed.lab[lab];
      return `<tr><td>${name}</td><td class="num">${field(speed.page, key, cls)}</td><td class="num">${field(speed.origin, key, cls)}</td><td class="num">${labValue === null ? notMeasured() : show(labValue, cls)}</td></tr>`;
    })
    .join("")}</tbody></table>
    <p class="note">${t("Gerçek kullanıcı verisi Chrome Kullanıcı Deneyimi Raporu'ndan (CrUX, son 28 gün, mobil); laboratuvar sütunu PageSpeed Insights'ın tek ölçümü.")}</p>`;
}

function tagsTable(insights: Insights, signalsMeasured: boolean): string {
  if (!signalsMeasured) {
    return `${table(t("Ölçüm etiketleri"), [[t("Ölçüm etiketleri"), notMeasured()]])}${table(t("Yapılandırılmış veri türleri"), [[t("Yapılandırılmış veri türleri"), notMeasured()]])}`;
  }
  const tags: Array<[string, string]> =
    insights.analyticsTags.length === 0
      ? [[t("Ölçüm etiketleri"), t("Hiçbir sayfada etiket bulunamadı.")]]
      : insights.analyticsTags
          .slice(0, 10)
          .map((row) => [row.tagId, t("{count} sayfa", { count: row.pages })]);
  const types: Array<[string, string]> =
    insights.schemaTypes.length === 0
      ? [
          [
            t("Yapılandırılmış veri türleri"),
            t("Hiçbir sayfada yapılandırılmış veri bulunamadı."),
          ],
        ]
      : insights.schemaTypes
          .slice(0, 12)
          .map((row) => [
            row.schemaType,
            t("{count} sayfa", { count: row.pages }),
          ]);
  return `${table(t("Ölçüm etiketleri"), tags)}${table(t("Yapılandırılmış veri türleri"), types)}`;
}

export function factsSection(
  ctx: ReportContext,
  showScreenshot: boolean,
): string {
  const facts = ctx.input.siteFacts ?? null;
  const insights = ctx.input.insights ?? null;
  const platform = insights?.platformHost ?? false;
  return `<section id="anlik-veri">
    <h2>${t("2. Anlık veri")}</h2>
    <p class="note">${t("Siteniz hakkında denetim anında toplanan bilgiler: sunucu, güvenlik başlıkları, DNS, sertifika, robots.txt ve gerçek kullanıcı hızı.")}</p>
    ${insights ? previews(insights, showScreenshot, facts !== null) : ""}
    <h3>${t("Temel Web Verileri")}</h3>
    ${fieldTable(insights?.speed ?? null, insights?.speedError ?? null)}
    ${
      facts
        ? `<div class="grid2">${serverTables(facts)}${domainTables(facts, platform)}${accessTables(facts, platform)}</div>`
        : `<p class="note">${t("Bu denetim site bilgisi toplanmadan önce yapılmış. Sunucu, güvenlik başlıkları, DNS ve sertifika bilgisini görmek için denetimi yeniden çalıştırın.")}</p>`
    }
    ${insights ? `<div class="grid2">${tagsTable(insights, facts !== null)}</div>` : ""}
  </section>`;
}
