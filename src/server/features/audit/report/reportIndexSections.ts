import { sort } from "remeda";
import { formatCount, formatDate } from "@/shared/format";
import { coverageStateLabel } from "@/shared/gsc-coverage-states";
import {
  barChart,
  chartSummary,
  COLORS,
  donutChart,
  figure,
} from "./reportCharts";
import {
  capList,
  escapeHtml,
  moreLine,
  percent,
  truncate,
} from "./reportFormat";
import { SEVERITY_LABEL, type IssueGroup } from "./reportModel";
import { issueAnchor } from "./reportSections";
import type { AuditReportInput } from "./reportTypes";

const INDEX_TABLE_CAP = 50;
const SITEMAP_LIST_CAP = 25;

function verdictText(verdict: string | null): string {
  if (verdict === "PASS") return "Dizinde";
  if (verdict === "FAIL") return "Dizinde değil";
  if (verdict === "PARTIAL") return "Kısmen";
  if (verdict === "NEUTRAL") return "Nötr";
  return "Yanıt yok";
}

export function indexSection(input: AuditReportInput): string {
  const cov = input.indexCoverage;
  if (!cov || cov.asked === 0) {
    return `<section id="dizin">
      <h2>4. Google dizin durumu</h2>
      <p class="empty">Bu denetimin sayfaları için Search Console URL İnceleme sonucu kayıtlı değil, bu yüzden Google'ın hangi sayfaları dizine aldığı rapora girmiyor. Dizin Kapsamı ekranından inceleme çalıştırıldıktan sonra rapor yeniden oluşturulursa bu bölüm dolar.</p>
    </section>`;
  }

  const data = [
    { label: "Dizinde", value: cov.indexed, color: COLORS.good },
    { label: "Dizinde değil", value: cov.notIndexed, color: COLORS.critical },
    { label: "Henüz sorulmadı", value: cov.pending, color: COLORS.muted },
  ];

  const states = new Map<string, number>();
  for (const row of cov.rows) {
    if (!row.coverageState) continue;
    const label = coverageStateLabel(row.coverageState) ?? row.coverageState;
    states.set(label, (states.get(label) ?? 0) + 1);
  }
  const stateData = sort([...states], (a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([label, value]) => ({ label, value, color: COLORS.accent }));

  const problems = cov.rows.filter(
    (row) => row.canonicalMismatch || row.verdict === "FAIL" || row.error,
  );
  const { shown, hidden } = capList(problems, INDEX_TABLE_CAP);

  return `<section id="dizin">
    <h2>4. Google dizin durumu</h2>
    <p class="note">Kaynak: Search Console URL İnceleme. Sonuçlar kayıtlıdır, bu rapor Google'a yeni istek atmaz${cov.lastCheckedAt ? `; son inceleme ${escapeHtml(formatDate(cov.lastCheckedAt))}` : ""}. Dizine girebilen ${formatCount(cov.rows.length)} sayfadan ${formatCount(cov.checked)} tanesi için Google yanıt verdi (%${formatCount(percent(cov.checked, cov.rows.length))}).</p>
    <div class="grid2">
      ${figure("Dizin durumu", donutChart(data, formatCount(cov.rows.length), "sayfa"), chartSummary(data), "Google dizin durumu dağılımı")}
      ${stateData.length > 0 ? figure("Google'ın verdiği durumlar", barChart(stateData, 34), chartSummary(stateData, " sayfa"), "Kapsam durumu dağılımı") : ""}
    </div>
    ${
      problems.length > 0
        ? `<h3>Dikkat isteyen sayfalar</h3>
    <table class="rows">
      <thead><tr><th>Adres</th><th>Sonuç</th><th>Durum</th><th>Google'ın seçtiği asıl adres</th></tr></thead>
      <tbody>${shown
        .map(
          (row) => `<tr>
        <td class="url">${escapeHtml(row.url)}</td>
        <td>${escapeHtml(verdictText(row.verdict))}</td>
        <td>${escapeHtml(row.error ? `Hata: ${truncate(row.error, 80)}` : (coverageStateLabel(row.coverageState) ?? "--"))}</td>
        <td class="url">${escapeHtml(row.canonicalMismatch ? (row.googleCanonical ?? "--") : "Aynı")}</td>
      </tr>`,
        )
        .join("")}</tbody>
    </table>
    ${moreLine(hidden, "sayfa")}`
        : `<p class="note">Dizinde değil olarak işaretlenen ya da asıl adresi farklı seçilen sayfa yok.</p>`
    }
  </section>`;
}

/** Sitemap: what the crawl stored about it, and an honest line about what it did not. */
export function sitemapSection(
  input: AuditReportInput,
  groups: IssueGroup[],
): string {
  const crawled = input.pages.length;
  const inMap = input.pages.filter((p) => p.inSitemap).length;
  const missing = input.pages.filter((p) => p.isIndexable && !p.inSitemap);
  const mapIssues = groups.filter((g) => g.issueType.startsWith("sitemap-"));
  const { shown, hidden } = capList(missing, SITEMAP_LIST_CAP);

  return `<section id="sitemap">
    <h2>5. Site haritası</h2>
    <p class="note">Taranan ${formatCount(crawled)} sayfanın ${formatCount(inMap)} tanesi (%${formatCount(percent(inMap, crawled))}) site haritasında. Haritanın kendisi (toplam adres sayısı, dosya boyutu) rapora girmez; yalnızca taranan sayfaların harita durumu ve haritayla ilgili bulunan sorunlar gösterilir.</p>
    ${
      mapIssues.length > 0
        ? `<table class="rows"><thead><tr><th>Haritayla ilgili sorun</th><th>Önem</th><th class="num">Sayfa</th></tr></thead><tbody>${mapIssues
            .map(
              (g) =>
                `<tr><td><a href="#${issueAnchor(g.issueType)}">${escapeHtml(g.title)}</a></td><td>${SEVERITY_LABEL[g.severity]}</td><td class="num">${formatCount(g.pageCount)}</td></tr>`,
            )
            .join("")}</tbody></table>`
        : `<p class="note">Haritayla ilgili kayıtlı sorun yok.</p>`
    }
    ${
      missing.length > 0
        ? `<h3>Dizine girebilen ama haritada olmayan sayfalar (${formatCount(missing.length)})</h3>
    <ul class="ap-list">${shown.map((p) => `<li>${escapeHtml(p.url)}</li>`).join("")}</ul>
    ${moreLine(hidden, "sayfa")}`
        : ""
    }
  </section>`;
}
