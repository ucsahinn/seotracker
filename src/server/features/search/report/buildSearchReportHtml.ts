/* eslint-disable max-lines -- one self-contained document, section by section, like the audit report */
import {
  formatCount,
  formatCountry,
  formatDate,
  formatDateTime,
  formatDecimal,
  formatPercent,
} from "@/shared/format";
import { boundedReportTitle } from "@/shared/reportTitle";
import { getLocale, t } from "@/shared/i18n";
import { appearanceLabel } from "@/shared/searchAppearance";
import { INSIGHT_RULES } from "@/shared/searchInsights";
import type {
  Breakdown,
  MetricChanges,
  SearchPerformanceView,
} from "@/shared/searchPerformanceView";
import {
  CONFIDENCE_LABEL,
  combinedGain,
  countDelta,
  describeTodo,
  gainText,
  positionMove,
  shortPage,
  type WordedDelta,
} from "@/shared/searchTodoCopy";
import { placesDelta, pointsDelta } from "@/shared/delta";
import { BAND_IDS, BAND_LABELS, type BandId } from "@/shared/positionBands";
import type { CannibalizationReport } from "@/server/features/gsc/cannibalization";
import {
  escapeHtml,
  hostOf,
  truncate,
  truncateUrl,
} from "@/server/features/audit/report/reportFormat";
import { STYLES } from "@/server/features/audit/report/reportStyles";
import { trendSvg } from "./reportTrendSvg";

/*
 * The Search performance report: the screen's view, printed.
 *
 * Built from the same `SearchPerformanceView` the screen draws, so every
 * number here is the number on screen for the same filters. One
 * self-contained file (inline styles, inline SVG, no script), stored in the
 * reports table and printable to A4 from the browser. It borrows the audit
 * report's stylesheet and helpers so the two read as one product.
 */

type SearchReportInput = {
  view: SearchPerformanceView;
  /** Null when the overlap analysis failed; the section says so. */
  overlaps: CannibalizationReport | null;
  /** Fixed in tests; the build time otherwise. */
  now?: Date;
  /** Server-derived collision guard for the property, period and filters. */
  titleDiscriminator?: string;
};

/*
 * The seowatcher mark (public/icon.svg), inline so the file stays
 * self-contained; the same mark the audit report carries.
 */
const LOGO = `<svg viewBox="0 0 256 256" aria-hidden="true" focusable="false"><defs><radialGradient id="sr-iris" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#ffd27a"/><stop offset="0.45" stop-color="#ff8a1f"/><stop offset="1" stop-color="#d9480f"/></radialGradient><clipPath id="sr-eye"><path d="M26 128 Q128 34 230 128 Q128 222 26 128 Z"/></clipPath></defs><rect width="256" height="256" rx="48" fill="#141210"/><path d="M26 128 Q128 34 230 128 Q128 222 26 128 Z" fill="#241d19"/><g clip-path="url(#sr-eye)"><circle cx="128" cy="128" r="54" fill="url(#sr-iris)"/></g><path d="M26 128 Q128 34 230 128 Q128 222 26 128 Z" fill="none" stroke="#ff8a1f" stroke-width="12" stroke-linejoin="round"/><path d="M128 84 Q141 128 128 172 Q115 128 128 84 Z" fill="#0c0b0a"/><circle cx="148" cy="108" r="9" fill="#fff4e0"/></svg>`;

const EXTRA_STYLES = `
.delta{font-size:12px;font-weight:600;margin-left:6px}
.delta--up{color:#1c7a4a}.delta--down{color:#b4232a}.delta--flat{color:#4b5563}
.gain{color:#1c7a4a;font-weight:700;white-space:nowrap}
.legend-line{display:inline-block;width:22px;vertical-align:middle;margin-right:6px;border-top:2px solid #b4440c}
.legend-line--dash{border-top:2px dashed #64748b}
.legend-hatch{display:inline-block;width:12px;height:12px;vertical-align:middle;margin-right:6px;background:repeating-linear-gradient(45deg,#c9ced6 0 2px,transparent 2px 5px);border:1px solid #e3e6ea}
.legends{display:flex;flex-wrap:wrap;gap:4px 18px;font-size:12px;color:var(--muted);margin-top:6px}
.bar{display:block;height:5px;border-radius:999px;background:#eceef1;margin-top:3px;overflow:hidden}
.bar>span{display:block;height:100%;background:#b4440c;border-radius:999px}
.notes{margin:10px 0 0;padding-left:18px;font-size:12.5px;color:var(--muted)}
`;

type Cell = string;

const BUCKET_BAND: Record<string, BandId> = {
  "1-3": "top3",
  "4-10": "top10",
  "11-20": "top20",
};

function pct(value: number | null): string {
  return value === null ? "–" : formatPercent(value);
}

function pos(value: number | null): string {
  return value === null ? "–" : formatDecimal(value);
}

function deltaHtml(delta: WordedDelta): string {
  if (!delta) return "";
  if (delta.neutral)
    return `<span class="delta delta--flat">${escapeHtml(delta.text)}</span>`;
  return `<span class="delta delta--${delta.improved ? "up" : "down"}">${delta.improved ? "↑" : "↓"} ${escapeHtml(delta.text)}</span>`;
}

function table(
  caption: string,
  headers: Array<{ label: string; num?: boolean }>,
  rows: Cell[][],
): string {
  return `<table class="rows"><caption class="note" style="caption-side:bottom;text-align:left">${escapeHtml(caption)}</caption><thead><tr>${headers
    .map((h) => `<th${h.num ? ' class="num"' : ""}>${escapeHtml(h.label)}</th>`)
    .join("")}</tr></thead><tbody>${rows
    .map(
      (row) =>
        `<tr>${row
          .map(
            (cell, i) =>
              `<td${headers[i]?.num ? ' class="num"' : ' class="url"'}>${cell}</td>`,
          )
          .join("")}</tr>`,
    )
    .join("")}</tbody></table>`;
}

function card(label: string, value: string, delta: WordedDelta): string {
  return `<div class="card"><p class="card-label">${escapeHtml(label)}</p><p class="card-value">${escapeHtml(value)}${deltaHtml(delta)}</p></div>`;
}

const DEVICE_NAME: Record<string, string> = {
  MOBILE: "Mobil",
  DESKTOP: "Bilgisayar",
  TABLET: "Tablet",
};
const TYPE_NAME: Record<string, string> = {
  web: "Web",
  image: "Görsel",
  video: "Video",
  news: "Haber",
};

function deviceName(key: string): string {
  const name = DEVICE_NAME[key.toUpperCase()];
  return name ? t(name) : key;
}

function filtersText(view: SearchPerformanceView): string {
  const parts = [
    t(TYPE_NAME[view.filters.searchType] ?? view.filters.searchType),
    view.filters.device ? deviceName(view.filters.device) : t("Tüm cihazlar"),
    view.filters.country
      ? formatCountry(view.filters.country)
      : t("Tüm ülkeler"),
  ];
  return parts.join(", ");
}

function coverSection(view: SearchPerformanceView, now: Date): string {
  const { window, totals } = view;
  const changes: MetricChanges | null = totals.vsPrevious;
  const meta: Array<[string, string]> = [
    [
      t("Rapor dönemi"),
      t("{start} – {end} ({days} gün)", {
        start: formatDate(window.startDate),
        end: formatDate(window.endDate),
        days: window.days,
      }),
    ],
    [
      t("Karşılaştırma"),
      totals.previous
        ? t("{start} – {end}", {
            start: formatDate(window.previous.startDate),
            end: formatDate(window.previous.endDate),
          })
        : t("Yok"),
    ],
    [t("Filtreler"), filtersText(view)],
    [
      t("Son veri"),
      window.lastDataDate ? formatDate(window.lastDataDate) : t("Yok"),
    ],
    [t("Oluşturulma"), formatDateTime(now.toISOString())],
  ];
  const c = totals.current;
  return `<section class="cover" id="ozet">
    <header class="masthead">
      <span class="brand">${LOGO}<span>seowatcher</span></span>
      <p class="masthead-kind">${escapeHtml(t("Arama performansı raporu"))}</p>
    </header>
    <h1>${escapeHtml(hostOf(view.siteUrl.replace(/^sc-domain:/, "https://")))}</h1>
    <p class="sub sub--url">${escapeHtml(view.siteUrl)}</p>
    <dl class="meta">${meta
      .map(
        ([label, value]) =>
          `<div><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value)}</dd></div>`,
      )
      .join("")}</dl>
    <div class="cards cards--4" style="margin-top:22px">
      ${card(t("Tıklama"), formatCount(c.clicks), countDelta(changes?.clicks))}
      ${card(t("Gösterim"), formatCount(c.impressions), countDelta(changes?.impressions))}
      ${card(t("Tıklama oranı"), pct(c.ctr), c.impressions > 0 ? pointsDelta(c.ctr, totals.previous?.ctr) : null)}
      ${card(t("Ortalama sıra"), pos(c.position), c.impressions > 0 ? placesDelta(c.position, totals.previous?.position) : null)}
    </div>
    <p class="note">${escapeHtml(
      totals.previous
        ? t(
            "Değişimler önceki {days} güne göre. Sıra değişimi yer olarak verilir (↑ yükseldi); tıklama oranı değişimi puan olarak.",
            { days: window.days },
          )
        : t("Önceki dönem Google'da olmadığı için değişim gösterilmez."),
    )}</p>
    ${trustCallout(view)}
    ${todoSection(view)}
  </section>`;
}

function finalityText(view: SearchPerformanceView): string {
  return view.window.incompleteSource === "google"
    ? t(
        "Google'ın tamamlandığını bildirdiği günler kullanıldı. Dönem sonu: {date}. Günler Pasifik saatine göredir.",
        { date: formatDate(view.window.endDate) },
      )
    : t(
        "Son günler gecikme varsayımıyla dışarıda bırakıldı; Google kesinleşme sınırı bildirmedi. Günler Pasifik saatine göredir.",
      );
}

function shownCaption(total: number, limit = 10): string {
  return t(
    "Gösterilen: {shown} / {observed} gözlenen kayıt. Kaynak satır sınırları nedeniyle tüm siteyi temsil etmeyebilir.",
    {
      shown: formatCount(Math.min(total, limit)),
      observed: formatCount(total),
    },
  );
}

function trustCallout(view: SearchPerformanceView): string {
  const { coverage, totals } = view;
  const lines: string[] = [
    t(
      "Okunan satırlar: {queries} sorgu, {pages} sayfa, {pairs} sorgu×sayfa. Listelerden türetilen fırsatlar bu kapsamla sınırlıdır.",
      {
        queries: formatCount(coverage.queries.rows),
        pages: formatCount(coverage.pages.rows),
        pairs: formatCount(coverage.queryPages.rows),
      },
    ),
  ];
  if (totals.provisional) {
    lines.push(
      t(
        "Son günler hâlâ sayılıyor ({clicks} tıklama); toplamlara ve karşılaştırmalara katılmadı.",
        { clicks: formatCount(totals.provisional.clicks) },
      ),
    );
  }
  if (coverage.hiddenQueries.clickShare !== null) {
    lines.push(
      coverage.hiddenQueries.exact
        ? t(
            "Google'ın gizlediği sorgulardan gelen tıklama: {share}. Bu yüzden sorgu tablolarının toplamı site toplamından küçüktür.",
            { share: formatPercent(coverage.hiddenQueries.clickShare) },
          )
        : t(
            "Listelenmeyen sorguların tıklama payı: {share}. Gizlenen ve satır sınırı dışında kalan sorgular birlikte hesaplanır.",
            { share: formatPercent(coverage.hiddenQueries.clickShare) },
          ),
    );
  }
  if (
    coverage.queries.truncated ||
    coverage.pages.truncated ||
    coverage.queryPages.truncated
  ) {
    lines.push(
      t(
        "Google'ın satır sınırına ulaşıldı; sorgu, sayfa veya sorgu×sayfa listeleri eksik olabilir. Bu listelerden üretilen fırsatlar tam site envanteri değildir.",
      ),
    );
  }
  lines.push(finalityText(view));
  return `<div class="callout"><p><strong>${escapeHtml(t("Verinin durumu"))}</strong></p>${lines
    .map((line) => `<p>${escapeHtml(line)}</p>`)
    .join("")}</div>`;
}

function todoSection(view: SearchPerformanceView): string {
  const items = view.todo.slice(0, 10);
  if (items.length === 0) {
    return `<h2>${escapeHtml(t("Yapılacaklar"))}</h2><p class="empty">${escapeHtml(t("Search Console verisinde eşiği aşan bir fırsat ya da düşüş bulunmadı."))}</p>`;
  }
  const first = items.slice(0, 3);
  const gain = combinedGain(first);
  const known = first.filter((item) => item.estimatedClicks !== null).length;
  const unknown = first.length - known;
  return `<h2>${escapeHtml(t("Önce bunlar"))}</h2>
    <p class="note">${escapeHtml(
      known === 0
        ? t("İlk {count} iş, kazancı tahmin edilemeyen işler.", {
            count: first.length,
          })
        : t(
            "İlk {count} işin {known} tanesinde kazanç hesaplanabildi; {unknown} tanesinde bilinmiyor. Hesaplanabilen işler için {days} günde en fazla {clicks} ek tıklama (üst sınır).",
            {
              count: first.length,
              known,
              unknown,
              days: view.window.days,
              clicks: formatCount(Math.round(gain ?? 0)),
            },
          ),
    )}</p>
    <p class="note">${escapeHtml(shownCaption(view.todo.length, 10))}</p>
    <ol class="todos">${items
      .map((item) => {
        const copy = describeTodo(item);
        const gainCell =
          item.estimatedClicks !== null && item.estimatedClicks > 0
            ? ` <span class="gain">${escapeHtml(gainText(item.estimatedClicks))}</span>`
            : "";
        return `<li class="todo"><div class="todo-head"><span class="todo-title">${escapeHtml(copy.title)}</span>${gainCell}<span class="fix-meta">${escapeHtml(t(CONFIDENCE_LABEL[item.confidence]))}</span></div>
          <p class="why">${escapeHtml(copy.evidence)}</p>
          <p><strong>${escapeHtml(t("Ne yapılmalı:"))}</strong> ${escapeHtml(copy.action)}</p>
          ${copy.page ? `<p class="todo-pages">${escapeHtml(truncateUrl(copy.page, 100))}</p>` : ""}</li>`;
      })
      .join("")}</ol>
    <p class="note">${escapeHtml(
      t(
        "Tıklama kazançları, sitenizin kendi sıra ve tıklama oranlarından hesaplanan yaklaşık değerlerdir. Aynı sorgu ya da sayfa için birden çok iş varsa özet onu bir kez sayar.",
      ),
    )}</p>`;
}

function trendSection(view: SearchPerformanceView): string {
  const svg = trendSvg(view, "previous");
  if (!svg) return "";
  const best = view.series.daily
    .filter((d) => d.state === "complete")
    .reduce<{
      date: string;
      clicks: number;
    } | null>(
      (top, d) => (top === null || d.clicks > top.clicks ? d : top),
      null,
    );
  const marks = view.annotations.filter(
    (a) =>
      a.startDate >= (view.series.daily[0]?.date ?? "") &&
      a.startDate <= view.window.freshEndDate,
  );
  return `<section id="egilim">
    <h2>${escapeHtml(t("Zaman içinde"))}</h2>
    <figure class="chart" role="group" aria-label="${escapeHtml(t("Günlük tıklama"))}">
      <p class="chart-title">${escapeHtml(t("Günlük tıklama"))}</p>
      ${svg}
      <div class="legends"><span><span class="legend-line"></span>${escapeHtml(t("Bu dönem"))}</span>${view.series.previousDaily ? `<span><span class="legend-line legend-line--dash"></span>${escapeHtml(t("Önceki dönem"))}</span>` : ""}${view.totals.provisional ? `<span><span class="legend-hatch"></span>${escapeHtml(t("Hâlâ sayılan günler"))}</span>` : ""}</div>
      <figcaption>${escapeHtml(
        best
          ? t(
              "{days} günde {clicks} tıklama; en iyi gün {day}, {best} tıklama.",
              {
                days: view.window.days,
                clicks: formatCount(view.totals.current.clicks),
                day: formatDate(best.date),
                best: formatCount(best.clicks),
              },
            )
          : t("Bu dönemde tıklama yok."),
      )}</figcaption>
    </figure>
    ${
      marks.length > 0
        ? `<h3>${escapeHtml(t("İşaretler"))}</h3><ul class="plain">${marks
            .map(
              (a) =>
                `<li>${escapeHtml(formatDate(a.startDate))} · ${escapeHtml(
                  a.kind === "audit" ? t("Site denetimi tamamlandı") : a.label,
                )}${a.kind === "googleUpdate" ? ` <span class="muted">(${escapeHtml(t("Google güncellemesi"))})</span>` : a.kind === "note" ? ` <span class="muted">(${escapeHtml(t("Not"))})</span>` : ""}</li>`,
            )
            .join("")}</ul>`
        : ""
    }
  </section>`;
}

function opportunitiesSection(view: SearchPerformanceView): string {
  const { striking, snippets, zeroClickPages, thresholds, ctrCurve, brand } =
    view.insights;
  const curve = ctrCurve.nonBrand ?? ctrCurve.all;
  // Striking distance leaves brand queries out whenever brand terms are in use.
  const brandNote =
    brand.status === "unset" ? "" : ` ${t("Marka aramaları dahil değildir.")}`;
  return `<section id="firsatlar">
    <h2>${escapeHtml(t("Fırsatlar"))}</h2>
    <h3>${escapeHtml(t("İlk üçe yakın sorgular"))}</h3>
    <p class="note">${escapeHtml(
      t(
        "Ortalama sırası 4 ile 20 arasında, en az {impressions} gösterim alan {count} sorgu. Olası kazanç, sorgu bir basamak yükselirse (6-10'dan 4-5'e, 4-5'ten 2-3'e, 11-20'den ilk sayfaya) beklenen en fazla ek tıklamadır.",
        {
          impressions: formatCount(thresholds.strikingMinImpressions),
          count: formatCount(striking.total),
        },
      ) + brandNote,
    )}</p>
    ${
      striking.rows.length === 0
        ? `<p class="empty">${escapeHtml(t("Bu aralıkta sorgu yok."))}</p>`
        : table(
            shownCaption(striking.total, Math.min(20, striking.rows.length)),
            [
              { label: t("Sorgu") },
              { label: t("Hedef sayfa") },
              { label: t("Sıra"), num: true },
              { label: t("Gösterim"), num: true },
              { label: t("Olası kazanç"), num: true },
            ],
            striking.rows
              .slice(0, 20)
              .map((r) => [
                escapeHtml(truncate(r.query, 80)),
                r.page ? escapeHtml(truncateUrl(shortPage(r.page), 60)) : "–",
                pos(r.position),
                formatCount(r.impressions),
                r.potentialClicks === null
                  ? "–"
                  : escapeHtml(gainText(r.potentialClicks)),
              ]),
          )
    }
    <h3>${escapeHtml(t("Sırasına göre az tıklanan sonuçlar"))}</h3>
    ${
      snippets.length === 0
        ? `<p class="empty">${escapeHtml(t("Belirgin biçimde az tıklanan sonuç yok."))}</p>`
        : table(
            shownCaption(snippets.length) +
              " " +
              t(
                "Beklenen oran: sitenizde aynı sıradaki sonuçların tıklama oranı.",
              ),
            [
              { label: t("Sorgu") },
              { label: t("Sıra"), num: true },
              { label: t("Tıklama oranı"), num: true },
              { label: t("Bu sırada beklenen"), num: true },
              { label: t("Olası kazanç"), num: true },
            ],
            snippets
              .slice(0, 10)
              .map((r) => [
                escapeHtml(truncate(r.query, 80)),
                pos(r.position),
                pct(r.ctr),
                pct(r.expectedCtr),
                escapeHtml(gainText(r.gainClicks)),
              ]),
          )
    }
    <h3>${escapeHtml(t("Görünen ama hiç tıklanmayan sayfalar"))}</h3>
    ${
      zeroClickPages.rows.length === 0
        ? `<p class="empty">${escapeHtml(t("Okunan sayfalarda eşiği aşan, gösterim alıp hiç tıklanmayan sayfa bulunmadı."))}</p>`
        : table(
            shownCaption(
              zeroClickPages.total,
              Math.min(10, zeroClickPages.rows.length),
            ),
            [
              { label: t("Sayfa") },
              { label: t("Gösterim"), num: true },
              { label: t("Sıra"), num: true },
            ],
            zeroClickPages.rows
              .slice(0, 10)
              .map((r) => [
                escapeHtml(truncateUrl(r.page, 90)),
                formatCount(r.impressions),
                pos(r.position),
              ]),
          )
    }
    <h3>${escapeHtml(t("Sitenizin sıraya göre tıklama oranı"))}</h3>
    ${table(
      t(
        "En az {queries} sorgu ve {impressions} gösterim olmayan sıralar için oran hesaplanmaz.",
        {
          queries: INSIGHT_RULES.curveMinQueries,
          impressions: formatCount(thresholds.curveBucketMinImpressions),
        },
      ),
      [
        { label: t("Sıra") },
        { label: t("Sorgu"), num: true },
        { label: t("Gösterim"), num: true },
        { label: t("Tıklama oranı"), num: true },
      ],
      curve.map((p) => [
        escapeHtml(p.band.replace("-", "–")),
        formatCount(p.queries),
        formatCount(p.impressions),
        p.sufficient ? pct(p.ctr) : escapeHtml(t("Yetersiz veri")),
      ]),
    )}
  </section>`;
}

function changesSection(view: SearchPerformanceView): string {
  const { movers, newQueries, lostQueries, decay } = view.insights;
  const moverTable = (
    title: string,
    rows: typeof movers.queries.declining,
    page: boolean,
  ) =>
    `<h3>${escapeHtml(title)}</h3>${
      rows.length === 0
        ? `<p class="empty">${escapeHtml(t("Eşiği aşan değişim yok."))}</p>`
        : table(
            shownCaption(rows.length),
            [
              { label: page ? t("Sayfa") : t("Sorgu") },
              { label: t("Önceki tıklama"), num: true },
              { label: t("Şimdiki tıklama"), num: true },
              { label: t("Sıra"), num: true },
            ],
            rows
              .slice(0, 10)
              .map((r) => [
                escapeHtml(page ? truncateUrl(r.key, 80) : truncate(r.key, 80)),
                formatCount(r.previousClicks),
                formatCount(r.clicks),
                escapeHtml(positionMove(r.previousPosition, r.position) ?? "–"),
              ]),
          )
    }`;
  const queryList = (title: string, rows: typeof newQueries, unknown: string) =>
    `<h3>${escapeHtml(title)}</h3>${
      rows === null
        ? `<p class="empty">${escapeHtml(unknown)}</p>`
        : rows.length === 0
          ? `<p class="empty">${escapeHtml(t("Okunan sorgularda bu koşulu sağlayan kayıt bulunmadı."))}</p>`
          : table(
              shownCaption(rows.length),
              [
                { label: t("Sorgu") },
                { label: t("Tıklama"), num: true },
                { label: t("Gösterim"), num: true },
              ],
              rows
                .slice(0, 10)
                .map((r) => [
                  escapeHtml(truncate(r.query, 80)),
                  formatCount(r.clicks),
                  formatCount(r.impressions),
                ]),
            )
    }`;
  return `<section id="degisimler">
    <h2>${escapeHtml(t("Değişimler"))}</h2>
    <p class="note">${escapeHtml(
      t("Önceki dönem: {start} – {end}. Tıklama sayıları.", {
        start: formatDate(view.window.previous.startDate),
        end: formatDate(view.window.previous.endDate),
      }),
    )}</p>
    ${moverTable(t("Tıklaması düşen sorgular"), movers.queries.declining, false)}
    ${moverTable(t("Tıklaması düşen sayfalar"), movers.pages.declining, true)}
    ${moverTable(t("Tıklaması artan sorgular"), movers.queries.growing, false)}
    ${moverTable(t("Tıklaması artan sayfalar"), movers.pages.growing, true)}
    ${queryList(t("Yeni görünen sorgular"), newQueries, t("Önceki dönem karşılaştırması mevcut değil veya satır kapsamı eksik. Yeni sorgu sayısı bu veriden belirlenemez."))}
    ${queryList(t("Kaybolan sorgular (önceki dönemdeki değerleriyle)"), lostQueries, t("Dönem karşılaştırması mevcut değil veya satır kapsamı eksik. Kaybolan sorgu sayısı bu veriden belirlenemez."))}
    <h3>${escapeHtml(t("Gücünü kaybeden sayfalar"))}</h3>
    ${
      decay === null
        ? `<p class="empty">${escapeHtml(t("Uzun dönem karşılaştırması alınamadı. Yeterli geçmiş olmayabilir veya kaynak isteği başarısız olmuş olabilir; geçmiş veriyi kontrol edip raporu yeniden hazırlayın."))}</p>`
        : decay.length === 0
          ? `<p class="empty">${escapeHtml(t("Belirgin biçimde gücünü kaybeden sayfa yok."))}</p>`
          : table(
              shownCaption(decay.length) + " " + t("Çeyrek: 91 gün."),
              [
                { label: t("Sayfa") },
                { label: t("Son çeyrek"), num: true },
                { label: t("En iyi çeyrek"), num: true },
              ],
              decay
                .slice(0, 10)
                .map((r) => [
                  escapeHtml(truncateUrl(r.page, 90)),
                  formatCount(r.clicks),
                  `${formatCount(r.peakClicks)} <span class="muted">(${escapeHtml(formatDate(r.peakStartDate))})</span>`,
                ]),
            )
    }
  </section>`;
}

function overlapsSection(overlaps: CannibalizationReport | null): string {
  if (!overlaps)
    return (
      '<section id="cakismalar"><h2>' +
      escapeHtml(t("Çakışmalar")) +
      '</h2><p class="empty">' +
      escapeHtml(
        t(
          "Çakışma analizi alınamadı. Diğer bölümler kullanılabilir; Arama performansında çakışmaları kontrol edip raporu yeniden hazırlayın.",
        ),
      ) +
      "</p></section>"
    );
  const context = t(
    "Çakışma dönemi: {start} – {end}. İncelenen: {count} sorgu. Eşik: sorguda 100 gösterim; sayfada 10 gösterim ve yüzde 20 pay. Bu dönem ana rapordan farklı olabilir.",
    {
      start: formatDate(overlaps.startDate),
      end: formatDate(overlaps.endDate),
      count: formatCount(overlaps.queriesAnalyzed),
    },
  );
  const coverage = overlaps.truncated
    ? t(
        "Kaynak satır sınırına ulaştı. Okunmayan sorgularda başka çok sayfalı sonuçlar olabilir.",
      )
    : t("Sonuçlar yalnızca okunan ve eşikleri geçen sorguları kapsar.");
  const body =
    overlaps.rows.length === 0
      ? '<p class="empty">' +
        escapeHtml(
          t("Okunan sorgularda eşiği aşan çok sayfalı sonuç bulunmadı."),
        ) +
        "</p>"
      : table(
          shownCaption(overlaps.rows.length),
          [
            { label: t("Sorgu") },
            { label: t("Google'ın tercih ettiği sayfa") },
            { label: t("Diğer sayfa sayısı"), num: true },
            { label: t("Bölünen gösterim payı"), num: true },
          ],
          overlaps.rows
            .slice(0, 10)
            .map((row) => [
              escapeHtml(truncate(row.query, 70)),
              escapeHtml(truncateUrl(shortPage(row.primary.page), 60)),
              formatCount(row.competitors.length),
              formatPercent(row.splitShare),
            ]),
        );
  return (
    '<section id="cakismalar"><h2>' +
    escapeHtml(t("Çakışmalar")) +
    '</h2><p class="note">' +
    escapeHtml(context) +
    '</p><p class="note">' +
    escapeHtml(coverage) +
    '</p><p class="note">' +
    escapeHtml(
      t(
        "Bir sorguda birden çok sayfanın görünmesi kayıp tıklama veya SEO zararı kanıtı değildir. Sayfaların aynı ihtiyacı karşılayıp karşılamadığını inceleyin.",
      ),
    ) +
    "</p>" +
    body +
    "</section>"
  );
}

function breakdownTable(
  caption: string,
  breakdown: Breakdown,
  label: (key: string) => string,
  limit: number,
): string {
  const base =
    (breakdown.truncated
      ? t("Kaynak satır sınırına ulaştı; dağılım eksik olabilir.") + " "
      : "") +
    (breakdown.baseKind === "siteTotal"
      ? t("Paylar sitenin toplamına göre.")
      : t("Paylar satırların toplamına göre."));
  return table(
    breakdown.rows.length > limit
      ? `${base} ${t("İlk {limit} / {total}.", { limit, total: breakdown.rows.length })}`
      : base,
    [
      { label: caption },
      { label: t("Tıklama"), num: true },
      { label: t("Pay"), num: true },
      { label: t("Gösterim"), num: true },
      { label: t("Tıklama oranı"), num: true },
      { label: t("Sıra"), num: true },
    ],
    breakdown.rows
      .slice(0, limit)
      .map((r) => [
        `${escapeHtml(label(r.key))}<span class="bar"><span style="width:${Math.round((r.clickShare ?? 0) * 100)}%"></span></span>`,
        formatCount(r.clicks),
        pct(r.clickShare),
        formatCount(r.impressions),
        pct(r.ctr),
        pos(r.position),
      ]),
  );
}

function distributionSection(view: SearchPerformanceView): string {
  const { positionDistribution, brand, brandState, questions, longTail } =
    view.insights;
  const { devices, countries, searchAppearance } = view.breakdowns;
  const brandHtml =
    brand.status === "unset"
      ? `<p class="empty">${escapeHtml(t("Bilinmiyor: marka adları tanımlanmadı."))}</p>`
      : table(
          // Suggested terms are applied until confirmed; the printout says so.
          brandState.source === "suggested"
            ? t("Marka adları: {terms} (önerilen, onaylanmadı).", {
                terms: brand.terms.join(", "),
              })
            : t("Marka adları: {terms}.", { terms: brand.terms.join(", ") }),
          [
            { label: "" },
            { label: t("Sorgu"), num: true },
            { label: t("Tıklama"), num: true },
            { label: t("Tıklama oranı"), num: true },
            { label: t("Sıra"), num: true },
          ],
          [
            { name: t("Marka aramaları"), seg: brand.brand },
            { name: t("Marka dışı aramalar"), seg: brand.nonBrand },
          ].map(({ name, seg }) => [
            escapeHtml(name),
            formatCount(seg.queries),
            formatCount(seg.clicks),
            pct(seg.ctr),
            pos(seg.position),
          ]),
        );
  return `<section id="dagilim">
    <h2>${escapeHtml(t("Dağılım"))}</h2>
    <h3>${escapeHtml(t("Sıra dağılımı"))}</h3>
    ${table(
      t("Okunan sorguların ortalama sırasına göre."),
      [
        { label: t("Sıra") },
        { label: t("Sorgu"), num: true },
        { label: t("Tıklama"), num: true },
      ],
      BAND_IDS.map((band) => {
        // The view's finer 21-50 / 51+ buckets fold into the app's bands.
        const members = positionDistribution.filter(
          (b) => (BUCKET_BAND[b.bucket] ?? "beyond") === band,
        );
        return [
          escapeHtml(BAND_LABELS[band]),
          formatCount(members.reduce((sum, b) => sum + b.queries, 0)),
          formatCount(members.reduce((sum, b) => sum + b.clicks, 0)),
        ];
      }),
    )}
    <h3>${escapeHtml(t("Marka ve marka dışı aramalar"))}</h3>
    ${brandHtml}
    <h3>${escapeHtml(t("Cihazlar"))}</h3>
    ${breakdownTable(t("Cihaz"), devices, deviceName, 5)}
    <h3>${escapeHtml(t("Ülkeler"))}</h3>
    ${breakdownTable(t("Ülke"), countries, formatCountry, 10)}
    <h3>${escapeHtml(t("Arama görünümü"))}</h3>
    ${
      searchAppearance && searchAppearance.rows.length > 0
        ? breakdownTable(t("Görünüm"), searchAppearance, appearanceLabel, 10)
        : `<p class="empty">${escapeHtml(searchAppearance === null ? t("Özel sonuç görünümü verisi alınamadı veya kayıt dönmedi. Kaynak bu iki durumu ayırmadığı için yokluk sonucu çıkarılamaz; Arama performansını kontrol edin.") : t("Okunan görünüm tablosunda bu döneme ait kayıt bulunmadı."))}</p>`
    }
    <h3>${escapeHtml(t("Soru ve uzun aramalar"))}</h3>
    ${table(
      t("Paylar okunan sorguların tıklamasına göre."),
      [
        { label: "" },
        { label: t("Sorgu"), num: true },
        { label: t("Tıklama"), num: true },
        { label: t("Pay"), num: true },
      ],
      [
        [t("Soru aramaları"), questions] as const,
        [
          t("{words}+ kelimeli aramalar", {
            words: INSIGHT_RULES.longTailMinWords,
          }),
          longTail,
        ] as const,
      ].map(([name, lens]) => [
        escapeHtml(name),
        formatCount(lens.queries),
        formatCount(lens.clicks),
        pct(lens.clickShare),
      ]),
    )}
  </section>`;
}

function methodSection(view: SearchPerformanceView): string {
  const items: Array<[string, string]> = [
    [
      t("Kaydedilmiş belge"),
      t(
        "Rapor hazırlanırken veriler sunucudan yeniden okundu; Google geçmiş değerleri düzeltebilir. Aynı dönem etiketi önceki ekran görüntüsüyle birebir ölçüm eşitliğini garanti etmez. Başlık dili değiştiğinde ayrı bir belge oluşabilir.",
      ),
    ],
    [
      t("Kaynak"),
      t(
        "Google Search Console API, bu mülk için. Başka bir veri kaynağı, tahmini hacim ya da rakip verisi kullanılmadı.",
      ),
    ],
    [t("Rapor dönemi"), finalityText(view)],
    [
      t("Site toplamları"),
      t(
        "Site toplamı tarihe göre istenen toplamdan gelir, sorgu ya da sayfa satırlarının toplamından değil. Ortalama sıra gösterime göre ağırlıklıdır; tıklama oranı tıklama bölü gösterimdir.",
      ),
    ],
    [
      t("Gizli sorgular"),
      t(
        "Sorgu tabloları gizlilik nedeniyle gizlenen satırları içermez. Satır sınırı varsa listelenmeyen pay, sınır dışında kalan sorguları da içerir.",
      ),
    ],
    [
      t("Kazanç tahminleri"),
      t(
        "Sitenizin kendi sıra-tıklama oranı eğrisinden hesaplanır; yeterli veri olmayan sıralar için tahmin yapılmaz.",
      ),
    ],
    [
      t("Google istekleri"),
      t(
        "Arama görünümünün istek bütçesi: {count}. Ek çakışma analizi dahil değildir; önbellek kullanımı gerçek ağ isteği sayısını değiştirir.",
        {
          count: view.quota.requests,
        },
      ),
    ],
  ];
  return `<section id="yontem"><h2>${escapeHtml(t("Yöntem ve sınırlar"))}</h2><dl class="method">${items
    .map(
      ([dt, dd]) =>
        `<div><dt>${escapeHtml(dt)}</dt><dd>${escapeHtml(dd)}</dd></div>`,
    )
    .join("")}</dl></section>`;
}

export function buildSearchReportHtml(input: SearchReportInput): {
  title: string;
  summary: string;
  html: string;
} {
  const { view, overlaps } = input;
  const now = input.now ?? new Date();
  const host = hostOf(view.siteUrl.replace(/^sc-domain:/, "https://"));
  /*
   * Site, window and filters in the title, so building the same view again
   * refreshes its report instead of piling up copies.
   */
  const filterNote =
    view.filters.device ||
    view.filters.country ||
    view.filters.searchType !== "web"
      ? ` (${filtersText(view)})`
      : "";
  const titleBase = boundedReportTitle(
    t("{host} arama performansı, {start} – {end}{filters}", {
      host,
      start: formatDate(view.window.startDate),
      end: formatDate(view.window.endDate),
      filters: filterNote,
    }),
    input.titleDiscriminator ? 84 : 120,
  );
  const title = input.titleDiscriminator
    ? `${titleBase} [${input.titleDiscriminator}]`
    : titleBase;
  const c = view.totals.current;
  const summary = [
    t("{days} günde {clicks} tıklama, {impressions} gösterim.", {
      days: view.window.days,
      clicks: formatCount(c.clicks),
      impressions: formatCount(c.impressions),
    }),
    c.ctr !== null && c.position !== null
      ? t("Tıklama oranı {ctr}, ortalama sıra {position}.", {
          ctr: formatPercent(c.ctr),
          position: formatDecimal(c.position),
        })
      : "",
    view.todo[0]
      ? t("İlk iş: {title}.", { title: describeTodo(view.todo[0]).title })
      : "",
  ]
    .filter(Boolean)
    .join(" ");

  const sections = [
    trendSection(view),
    opportunitiesSection(view),
    changesSection(view),
    overlapsSection(overlaps),
    distributionSection(view),
    methodSection(view),
  ].join("\n  ");
  const html = `<!doctype html>
<html lang="${getLocale()}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(title)}</title>
<style>${STYLES.replace('content:"Sayfa "', 'content:"' + t("Sayfa").replace(/["\\]/g, "") + ' "')}${EXTRA_STYLES}
@media screen and (min-width:360px) and (max-width:700px){.cards.cards--4{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media screen and (max-width:359px){.cards.cards--4{grid-template-columns:minmax(0,1fr)}}
</style>
</head>
<body>
<div class="running">${escapeHtml(host)} · ${escapeHtml(t("Arama performansı raporu"))} · ${escapeHtml(formatDateTime(now.toISOString()))}</div>
<main>
  ${coverSection(view, now)}
  <nav aria-label="${escapeHtml(t("İçindekiler"))}">${[
    ["ozet", t("Özet")],
    ["egilim", t("Zaman içinde")],
    ["firsatlar", t("Fırsatlar")],
    ["degisimler", t("Değişimler")],
    ["cakismalar", t("Çakışmalar")],
    ["dagilim", t("Dağılım")],
    ["yontem", t("Yöntem ve sınırlar")],
  ]
    // A section that had nothing to draw is left out of the page, so its
    // link would point nowhere.
    .filter(([id]) => id === "ozet" || sections.includes('id="' + id + '"'))
    .map(([id, label]) => '<a href="#' + id + '">' + escapeHtml(label) + "</a>")
    .join(" · ")}</nav>
  ${sections}
  <footer>
    <p>${escapeHtml(
      t(
        "seowatcher ile üretildi. Bu dosya kendi kendine yeter: açmak için internet bağlantısı gerekmez. PDF için tarayıcıdan Yazdır seçeneğini kullanın.",
      ),
    )}</p>
  </footer>
</main>
</body>
</html>`;
  return { title, summary: summary.slice(0, 2500), html };
}
