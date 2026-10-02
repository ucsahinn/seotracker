import { formatCount, formatDateTime, formatDuration } from "@/shared/format";
import { escapeHtml } from "./reportFormat";
import type { AuditReportInput, ReportCaps } from "./reportTypes";

function crawlLine(input: AuditReportInput): string {
  const base = `${formatCount(input.pagesCrawled)} sayfa tarandı, başlangıç adresi ${input.siteUrl}.`;
  if (typeof input.maxPages !== "number") return base;
  const hit = input.pagesCrawled >= input.maxPages;
  return `${base} Tarama üst sınırı ${formatCount(input.maxPages)} sayfaydı${hit ? "; sınıra ulaşıldı, yani site bundan büyük olabilir ve görülmeyen sayfalardaki sorunlar rapora girmedi" : ""}.`;
}

function speedLine(input: AuditReportInput): string {
  if (input.lighthouseMode === "none") {
    return "Hız ölçümü bu denetimde kapalıydı.";
  }
  const mobile = input.lighthouse.filter(
    (r) => r.strategy === "mobile" && r.performanceScore !== null,
  ).length;
  if (mobile === 0) return "Hiçbir sayfa için hız puanı kaydedilmedi.";
  return `${formatCount(mobile)} sayfa Lighthouse ile ölçüldü (laboratuvar verisi, tek sanal cihaz). Ölçülmeyen sayfalar hakkında hız bilgisi yoktur.`;
}

function durationLine(input: AuditReportInput): string {
  const start = Date.parse(input.startedAt);
  const end = input.completedAt ? Date.parse(input.completedAt) : NaN;
  const span =
    Number.isFinite(start) && Number.isFinite(end) && end >= start
      ? `, süre ${formatDuration(end - start)}`
      : "";
  return `Başlangıç ${formatDateTime(input.startedAt)}${input.completedAt ? `, bitiş ${formatDateTime(input.completedAt)}` : ""}${span}. Rapor o andaki durumu gösterir; site sonradan değişmiş olabilir.`;
}

const NOT_MEASURED = [
  "Arama sıralaması, tıklama ve trafik: bu rapor Search Console ya da Analytics trafiğini içermez.",
  "Geri bağlantılar ve rakip siteler.",
  "İçeriğin kalitesi, arama niyetine uygunluğu ve özgünlüğü; yalnızca kelime sayısı gibi yapısal sinyallere bakılır.",
  "Gerçek kullanıcı hız verisi (CrUX); yalnızca laboratuvar ölçümü vardır.",
  "Giriş gerektiren sayfalar ve taramanın ulaşamadığı adresler.",
];

export function methodSection(
  input: AuditReportInput,
  caps: ReportCaps,
): string {
  const rows: Array<[string, string]> = [
    ["Tarama", crawlLine(input)],
    ["Tarih aralığı", durationLine(input)],
    ["Hız ölçümü", speedLine(input)],
    [
      "Google dizin durumu",
      input.indexCoverage && input.indexCoverage.asked > 0
        ? `Search Console URL Denetleme Aracı'nın kayıtlı yanıtları; ${formatCount(input.indexCoverage.checked)} sayfa için Google yanıt verdi. Rapor Google'a yeni istek atmaz.`
        : "Bu denetim için kayıtlı Google yanıtı yok, bölüm boş.",
    ],
    [
      "Listelerdeki kesintiler",
      `Dosya boyutunu makul tutmak için her sorunun altında en fazla ${formatCount(caps.issuePages)} adres, sayfa tablosunda ${formatCount(caps.pages)} sayfa, hız tablosunda ${formatCount(caps.speed)} sayfa yazılır; kesilen her listenin altında kaç kaydın dışarıda kaldığı belirtilir. Tam kayıtlar denetim ekranındadır.`,
    ],
  ];
  return `<section id="yontem">
    <h2>6. Yöntem ve sınırlar</h2>
    <dl class="method">${rows
      .map(
        ([k, v]) =>
          `<div><dt>${escapeHtml(k)}</dt><dd>${escapeHtml(v)}</dd></div>`,
      )
      .join("")}</dl>
    <h3>Bu raporda ölçülmeyenler</h3>
    <ul class="plain">${NOT_MEASURED.map((t) => `<li>${escapeHtml(t)}</li>`).join("")}</ul>
  </section>`;
}
