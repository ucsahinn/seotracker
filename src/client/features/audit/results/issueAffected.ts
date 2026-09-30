import { buildCsv } from "@/client/lib/csv";
import {
  formatCount,
  formatDate,
  formatDuration,
  formatNumber,
} from "@/client/lib/format";
import {
  SEVERITY_LABEL,
  type AuditIssueRow,
  type IssueGroup,
} from "@/client/features/audit/results/issueGroups";

export const PAGE_STEP = 10;
/** Past this many pages a search box earns its place. */
export const SEARCH_THRESHOLD = 20;

export interface DetailLine {
  label: string;
  value: string;
}

/** One page, with what was found on it (one entry per record). */
export interface AffectedPage {
  url: string;
  records: DetailLine[][];
}

const LABELS: Record<string, string> = {
  statusCode: "Durum kodu",
  length: "Uzunluk (karakter)",
  wordCount: "Kelime sayısı",
  h1Count: "H1 sayısı",
  crawlDepth: "Tıklama derinliği",
  responseTimeMs: "Yanıt süresi",
  canonicalUrl: "Kanonik adres",
  htmlCanonical: "Sayfadaki kanonik adres",
  headerCanonical: "Başlıktaki kanonik adres",
  redirectUrl: "Yönlendirdiği adres",
  redirectsTo: "Yönlendirdiği adres",
  finalUrl: "Son adres",
  hops: "Yönlendirme zinciri",
  groupSize: "Aynı içerikteki sayfa sayısı",
  otherUrls: "Aynı içerikteki diğer sayfalar",
  alternateUrl: "Karşılıklı bağlanmayan alternatif",
  hreflang: "Dil kodu",
  hreflangs: "Dil kodları",
  reason: "Neden",
  fetchClass: "Erişim sonucu",
  robotsMeta: "Robots meta etiketi",
  googlebotMeta: "Googlebot meta etiketi",
  xRobotsTag: "X-Robots-Tag başlığı",
  count: "Adet",
  example: "Örnek",
  limit: "Sınır",
  imagesMissingAlt: "Alt metni eksik görsel",
  imagesTotal: "Toplam görsel",
  blocked: "Engellenen kaynaklar",
  blockedCount: "Engellenen kaynak sayısı",
  sample: "Örnekler",
  declared: "Sizin belirttiğiniz adres",
  chosen: "Google'ın seçtiği adres",
  verdict: "Google'ın kararı",
  lastCrawlTime: "Google'ın son tarama tarihi",
  checkedAt: "Kontrol tarihi",
  thresholdDays: "Eşik (gün)",
  pagesChecked: "Kontrol edilen sayfa",
  urlCount: "Adres sayısı",
};

const MAX_LIST_ITEMS = 5;

function formatScalar(key: string, value: unknown): string | null {
  if (typeof value === "number") {
    return key === "responseTimeMs"
      ? formatDuration(value)
      : formatNumber(value);
  }
  if (typeof value === "boolean") return value ? "Evet" : "Hayır";
  if (typeof value === "string") {
    if (value === "") return null;
    return key === "lastCrawlTime" || key === "checkedAt"
      ? formatDate(value)
      : value;
  }
  return null;
}

function formatValue(key: string, value: unknown): string | null {
  if (Array.isArray(value)) {
    const items = value.filter((item) => item !== null && item !== undefined);
    if (items.length === 0) return null;
    if (key === "hops") return items.map(String).join(" → ");
    const shown = items.slice(0, MAX_LIST_ITEMS).map(String).join(", ");
    const rest = items.length - MAX_LIST_ITEMS;
    return rest > 0 ? `${shown} ve ${formatCount(rest)} tane daha` : shown;
  }
  const scalar = formatScalar(key, value);
  if (scalar !== null) return scalar;
  if (typeof value === "object" && value !== null) return JSON.stringify(value);
  return null;
}

/** The per-page evidence of one record, in plain Turkish. Empty when it has none. */
export function describeDetails(detailsJson: string | null): DetailLine[] {
  if (!detailsJson) return [];
  let parsed: unknown;
  try {
    parsed = JSON.parse(detailsJson);
  } catch {
    return [];
  }
  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    return [];
  }
  const lines: DetailLine[] = [];
  for (const [key, raw] of Object.entries(parsed)) {
    const value = formatValue(key, raw);
    if (value !== null) lines.push({ label: LABELS[key] ?? key, value });
  }
  return lines;
}

/**
 * A finding about the whole site (robots.txt, sitemap) rather than a page.
 * The crawler files those with no page id, pointing at the start address, so
 * printing "1 sayfa" for them named a page that has nothing wrong with it.
 */
export function isSiteWide(issues: AuditIssueRow[]): boolean {
  return issues.length > 0 && issues.every((issue) => issue.pageId === null);
}

/** Distinct pages in first-seen order, each with all of its records. */
export function buildAffectedPages(issues: AuditIssueRow[]): AffectedPage[] {
  const pages = new Map<string, AffectedPage>();
  for (const issue of issues) {
    let page = pages.get(issue.pageUrl);
    if (!page) {
      page = { url: issue.pageUrl, records: [] };
      pages.set(issue.pageUrl, page);
    }
    page.records.push(describeDetails(issue.detailsJson));
  }
  return Array.from(pages.values());
}

export function filterAffectedPages(
  pages: AffectedPage[],
  query: string,
): AffectedPage[] {
  const needle = query.trim().toLocaleLowerCase("tr-TR");
  if (!needle) return pages;
  return pages.filter(
    (page) =>
      page.url.toLocaleLowerCase("tr-TR").includes(needle) ||
      page.records.some((lines) =>
        lines.some((line) =>
          line.value.toLocaleLowerCase("tr-TR").includes(needle),
        ),
      ),
  );
}

/** How many rows to show after pressing "daha fazla göster". */
export function nextVisibleCount(current: number, total: number): number {
  return Math.min(current + PAGE_STEP, total);
}

/** What the copy button puts on the clipboard: every address, one per line. */
export function buildCopyText(urls: string[]): string {
  return urls.join("\n");
}

/**
 * What the count beside an issue says. Pages are what the operator fixes; the
 * ring above counts records, so when the two differ both are named.
 */
export function buildCountLabel(group: IssueGroup, siteWide: boolean): string {
  if (siteWide) return "Tüm site";
  const pages = `${formatCount(group.pageCount)} sayfa`;
  return group.issues.length === group.pageCount
    ? pages
    : `${pages} · ${formatCount(group.issues.length)} bulgu`;
}

export function buildIssueCsv(group: IssueGroup): string {
  const rows = group.issues.map((issue) => [
    SEVERITY_LABEL[group.severity],
    group.title,
    issue.pageUrl,
    describeDetails(issue.detailsJson)
      .map((line) => `${line.label}: ${line.value}`)
      .join(" | "),
    group.howToFix,
  ]);
  return buildCsv(
    ["Önem", "Sorun", "Adres", "Ayrıntı", "Nasıl düzeltilir"],
    rows,
  );
}

export function issueCsvFilename(group: IssueGroup): string {
  return `sorun-${group.issueType}.csv`;
}
