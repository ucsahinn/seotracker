/**
 * An issue row's stored evidence (`audit_issues.details_json`) in words a
 * person reads.
 *
 * One module for every place a finding's details are shown -- the issue
 * card's affected pages, the CSV export and the downloadable report -- so a
 * finding reads the same on screen and on paper. Most details are a few
 * labelled scalars; the checks whose details carry a measurement (savings
 * Lighthouse estimated, a Core Web Vitals value against its bands, a broken
 * link's status, image sizes) are put into a sentence instead.
 *
 * Every string here is crawled or measured data: the caller escapes it.
 * Labels are Turkish source keys translated at call time, because the locale
 * is not known when a module loads.
 */
import {
  formatBytes,
  formatCount,
  formatDate,
  formatDecimal,
  formatDuration,
  formatNumber,
} from "../format";
import { z } from "zod";
import { t } from "../i18n";
import { sitemapUnreadableLines } from "./sitemapUnreadableDetails";

export interface DetailLine {
  /** Null when the line is a whole sentence. */
  label: string | null;
  /** The line as text (also what the CSV and the search read). */
  value: string;
  /** Addresses, files or markup the finding names, shown as a code list. */
  items?: string[];
  /** How many items were left out of `items`. */
  more?: number;
}

type Details = Record<string, unknown>;

/** Items of a list printed before "ve N tane daha". */
const MAX_LIST_ITEMS = 5;

// Turkish source labels; t() runs when the lines are built.
const LABELS: Record<string, string> = {
  statusCode: "Durum kodu",
  length: "Uzunluk (karakter)",
  wordCount: "Kelime sayısı",
  h1Count: "H1 sayısı",
  crawlDepth: "Ana sayfadan uzaklık (tık)",
  responseTimeMs: "Yanıt süresi",
  canonicalUrl: "Asıl adres",
  htmlCanonical: "Sayfadaki asıl adres",
  headerCanonical: "Başlıktaki asıl adres",
  canonical: "Sayfadaki canonical adresi",
  redirectUrl: "Yönlendirdiği adres",
  redirectsTo: "Yönlendirdiği adres",
  targetUrl: "Yönlendirdiği adres",
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
  robots: "robots etiketleri",
  googlebot: "googlebot etiketleri",
  xRobotsTag: "X-Robots-Tag başlığı",
  count: "Adet",
  example: "Örnek",
  examples: "Örnekler",
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
  title: "Sayfa başlığı",
  topicWords: "Başlıktaki anlamlı kelime",
  lighthouseAudit: "Lighthouse denetimi",
  items: "Etkilenen öğe",
};

/** Keys whose values are addresses or markup, listed as code. */
const CODE_LISTS = new Set(["examples", "sample", "otherUrls", "blocked"]);

/*
 * Lighthouse's checklist keys (the "insight" audits), as the condition that
 * failed. Turkish source text; t() at build time.
 */
const CHECKLIST_LABEL: Record<string, string> = {
  noRedirects: "Sayfaya yönlendirme olmadan ulaşılmıyor",
  serverResponseIsFast: "Sunucu ilk yanıtı hızlı vermiyor",
  usesCompression: "Belge sıkıştırılmadan gönderiliyor",
  eagerlyLoaded: 'Ana görselde loading="lazy" var',
  requestDiscoverable: "Ana görsel sayfanın ilk HTML'inde yok",
  priorityHinted: 'Ana görselde fetchpriority="high" yok',
};

/* The sentence for a page-level `{ count, examples }` HTML check. */
const COUNT_SENTENCE: Record<string, string> = {
  "mixed-content-media": "{count} güvensiz (http) görsel, video ya da çerçeve",
  "form-action-http": "{count} form bilgileri http adresine gönderiyor",
  "exposed-email-address": "{count} e-posta adresi açıkta",
  "internal-http-links": "{count} iç bağlantı http:// ile veriliyor",
};

function num(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function text(value: unknown): string | null {
  return typeof value === "string" && value !== "" ? value : null;
}

function strings(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter((item) => item !== null && item !== undefined).map(String)
    : [];
}

const detailsSchema = z.record(z.string(), z.unknown());

/** An object's fields, or null for anything else (arrays included). */
function asRecord(value: unknown): Details | null {
  const parsed = detailsSchema.safeParse(value);
  return parsed.success ? parsed.data : null;
}

function parse(detailsJson: string | null | undefined): Details | null {
  if (!detailsJson) return null;
  try {
    return asRecord(JSON.parse(detailsJson));
  } catch {
    return null;
  }
}

function pair(label: string, value: string): DetailLine {
  return { label: t(label), value };
}

function sentence(value: string): DetailLine {
  return { label: null, value };
}

/** A list of addresses or markup, cut at MAX_LIST_ITEMS. */
function listLine(label: string, all: string[]): DetailLine | null {
  if (all.length === 0) return null;
  const items = all.slice(0, MAX_LIST_ITEMS);
  const more = all.length - items.length;
  const shown = items.join(", ");
  return {
    label: t(label),
    value:
      more > 0
        ? t("{shown} ve {rest} tane daha", { shown, rest: formatCount(more) })
        : shown,
    items,
    ...(more > 0 ? { more } : {}),
  };
}

/** "~420 ms, 180 KB": what Lighthouse estimated fixing it would save. */
export function savingsText(
  ms: number | null | undefined,
  bytes: number | null | undefined,
): string | null {
  const parts: string[] = [];
  if (ms && ms > 0) parts.push(`~${formatDuration(ms)}`);
  if (bytes && bytes > 0) parts.push(formatBytes(bytes));
  return parts.length > 0 ? parts.join(", ") : null;
}

function lighthouseLines(details: Details): DetailLine[] {
  const lines: DetailLine[] = [];
  const failed = strings(details.failed);
  if (failed.length > 0) {
    lines.push(
      pair(
        "Karşılanmayan koşul",
        failed
          .map((key) => {
            const label = CHECKLIST_LABEL[key];
            return label ? t(label) : key;
          })
          .join("; "),
      ),
    );
  }
  const savings = savingsText(
    num(details.savingsMs),
    num(details.savingsBytes),
  );
  if (savings) lines.push(pair("Tahmini kazanç", savings));
  const mainThreadMs = num(details.mainThreadMs);
  if (mainThreadMs !== null) {
    lines.push(
      pair(
        "Üçüncü taraf kodların ana iş parçacığı süresi",
        formatDuration(mainThreadMs),
      ),
    );
  }
  const totalBytes = num(details.totalBytes);
  if (totalBytes !== null) {
    lines.push(pair("Toplam indirme boyutu", formatBytes(totalBytes)));
  }
  const items = num(details.items);
  if (items !== null) lines.push(pair("Etkilenen öğe", formatCount(items)));
  const examples = listLine("Örnekler", strings(details.examples));
  if (examples) lines.push(examples);
  const audit = text(details.lighthouseAudit);
  if (audit) lines.push(pair("Lighthouse denetimi", audit));
  return lines;
}

/*
 * A Core Web Vitals value against its bands. "Needs improvement" carries
 * both bands and the source; "poor" carries the one line it crossed.
 */
const METRICS = [
  { key: "lcpMs", label: "LCP", ms: true, good: "goodMs", poor: "poorMs" },
  { key: "cls", label: "CLS", ms: false, good: "good", poor: "poor" },
  { key: "inpMs", label: "INP", ms: true, good: "goodMs", poor: "poorMs" },
] as const;

function cwvLines(details: Details): DetailLine[] | null {
  const metric = METRICS.find((entry) => num(details[entry.key]) !== null);
  if (!metric) return null;
  const show = (value: number) =>
    metric.ms ? formatDuration(value) : formatDecimal(value, 2);
  const value = show(num(details[metric.key]) ?? 0);
  const good = num(details[metric.good]);
  const poor = num(details[metric.poor]);
  const threshold = num(details.thresholdMs) ?? num(details.threshold);
  const lines: DetailLine[] = [];
  if (good !== null && poor !== null) {
    lines.push({
      label: metric.label,
      value: t("{value} (iyi: en çok {good}, kötü: {poor} üstü)", {
        value,
        good: show(good),
        poor: show(poor),
      }),
    });
  } else if (threshold !== null) {
    lines.push({
      label: metric.label,
      value: t("{value} (kötü sınırı: {limit})", {
        value,
        limit: show(threshold),
      }),
    });
  } else {
    lines.push({ label: metric.label, value });
  }
  const source = details.source;
  if (source === "field") {
    lines.push(pair("Kaynak", t("saha verisi (gerçek Chrome kullanıcıları)")));
  } else if (source === "lab") {
    lines.push(pair("Kaynak", t("laboratuvar ölçümü (PageSpeed Insights)")));
  }
  return lines;
}

function brokenLinkLines(details: Details): DetailLine[] {
  const url = text(details.targetUrl) ?? "";
  const status = num(details.status);
  const why =
    details.reason === "dns"
      ? t("alan adı bulunamadı")
      : status !== null
        ? String(status)
        : t("hata");
  return [pair("Kırık dış bağlantı", `${url} (${why})`)];
}

function largeImageLines(details: Details): DetailLine[] {
  const lines: DetailLine[] = [];
  const count = num(details.count);
  const limit = num(details.limitBytes);
  if (count !== null && limit !== null) {
    lines.push(
      sentence(
        t("{count} görsel {limit}'tan büyük", {
          count,
          limit: formatBytes(limit),
        }),
      ),
    );
  }
  const over = num(details.over500Kb);
  if (over !== null && over > 0) {
    lines.push(
      sentence(
        t("{count} görsel {limit}'tan büyük", {
          count: over,
          limit: formatBytes(500_000),
        }),
      ),
    );
  }
  const images = Array.isArray(details.images) ? details.images : [];
  const described = images.flatMap((image: unknown) => {
    const entry = asRecord(image);
    if (!entry) return [];
    const url = text(entry.url);
    if (!url) return [];
    const bytes = num(entry.bytes);
    if (bytes === null) return [url];
    const size = formatBytes(bytes);
    return [
      `${url} · ${entry.atLeast === true ? t("en az {size}", { size }) : size}`,
    ];
  });
  const list = listLine("Görseller", described);
  if (list) lines.push(list);
  return lines;
}

/** The lines a type-specific reading produced, or null to read generically. */
function specialLines(
  issueType: string,
  details: Details,
): DetailLine[] | null {
  if (issueType === "broken-external-link") return brokenLinkLines(details);
  if (issueType === "image-file-too-large") return largeImageLines(details);
  if (text(details.lighthouseAudit)) return lighthouseLines(details);
  if (issueType.startsWith("cwv-")) return cwvLines(details);
  const sentenceKey = COUNT_SENTENCE[issueType];
  const count = num(details.count);
  if (sentenceKey && count !== null) {
    const lines = [sentence(t(sentenceKey, { count }))];
    const examples = listLine("Örnekler", strings(details.examples));
    if (examples) lines.push(examples);
    return lines;
  }
  if (issueType === "page-says-not-found") {
    const said = text(details.text);
    const status = num(details.statusCode);
    if (said && status !== null) {
      return [
        sentence(
          t('Sayfa "{text}" diyor, ama sunucu {status} döndürüyor', {
            text: said,
            status: String(status),
          }),
        ),
      ];
    }
  }
  if (issueType === "large-inline-code") {
    const size = num(details.kilobytes);
    const limit = num(details.limitKilobytes);
    if (size !== null && limit !== null) {
      return [
        pair(
          "Gömülü betik ve stil",
          t("{size} (sınır {limit})", {
            size: formatBytes(size * 1024),
            limit: formatBytes(limit * 1024),
          }),
        ),
      ];
    }
  }
  // Null for an unknown reason, which then reads generically.
  if (issueType === "sitemap-unreadable")
    return sitemapUnreadableLines(details);
  if (issueType === "missing-feed") {
    const articles = num(details.articlePages);
    if (articles !== null) {
      return [
        sentence(
          t("Yazı olarak işaretlenmiş {count} sayfa", { count: articles }),
        ),
      ];
    }
  }
  return null;
}

function formatScalar(key: string, value: unknown): string | null {
  if (typeof value === "number") {
    return key.endsWith("Ms") ? formatDuration(value) : formatNumber(value);
  }
  if (typeof value === "boolean") return value ? t("Evet") : t("Hayır");
  if (typeof value === "string") {
    if (value === "") return null;
    return key === "lastCrawlTime" || key === "checkedAt"
      ? formatDate(value)
      : value;
  }
  return null;
}

function genericLine(key: string, raw: unknown): DetailLine | null {
  const label = LABELS[key];
  const shownLabel = label ? t(label) : key;
  if (Array.isArray(raw)) {
    const items = strings(raw);
    if (items.length === 0) return null;
    if (key === "hops") return { label: shownLabel, value: items.join(" → ") };
    if (CODE_LISTS.has(key)) return listLine(label ?? key, items);
    const shown = items.slice(0, MAX_LIST_ITEMS).join(", ");
    const rest = items.length - MAX_LIST_ITEMS;
    return {
      label: shownLabel,
      value:
        rest > 0
          ? t("{shown} ve {rest} tane daha", { shown, rest: formatCount(rest) })
          : shown,
    };
  }
  const scalar = formatScalar(key, raw);
  if (scalar !== null) return { label: shownLabel, value: scalar };
  if (typeof raw === "object" && raw !== null) {
    return { label: shownLabel, value: JSON.stringify(raw) };
  }
  return null;
}

/**
 * The per-page evidence of one issue row, in plain words. Empty when it has
 * none or the stored JSON is not an object.
 */
export function describeIssueDetails(
  issueType: string,
  detailsJson: string | null | undefined,
): DetailLine[] {
  const details = parse(detailsJson);
  if (!details) return [];
  const special = specialLines(issueType, details);
  if (special) return special;
  return Object.entries(details).flatMap(([key, raw]) => {
    const line = genericLine(key, raw);
    return line ? [line] : [];
  });
}

/** One line of text per detail line: "Etiket: değer", or the sentence. */
export function detailLineText(line: DetailLine): string {
  return line.label === null ? line.value : `${line.label}: ${line.value}`;
}

/** What Lighthouse estimated fixing one row would save; zeros when none. */
export function issueSavings(detailsJson: string | null | undefined): {
  ms: number;
  bytes: number;
} {
  const details = parse(detailsJson);
  return {
    ms: num(details?.savingsMs) ?? 0,
    bytes: num(details?.savingsBytes) ?? 0,
  };
}
