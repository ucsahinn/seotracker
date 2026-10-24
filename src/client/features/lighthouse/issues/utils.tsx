import { buildCsv, type CsvValue } from "@/client/lib/csv";
import { t } from "@/shared/i18n";
import type { CategoryTab, LighthouseIssue } from "./types";

// Turkish source headers; translated per export, in the UI language.
const ISSUE_HEADERS = [
  "Kategori",
  "Önem",
  "Puan",
  "Başlık",
  "Görünen değer",
  "Açıklama",
  "Etki (ms)",
  "Etki (bayt)",
  "Etkilenen öğeler",
];

function issuesToRows(issues: LighthouseIssue[]): CsvValue[][] {
  return issues.map((issue) => [
    issue.category,
    issue.severity,
    issue.score ?? "",
    issue.title,
    issue.displayValue ?? "",
    issue.description ?? "",
    issue.impactMs ?? "",
    issue.impactBytes ?? "",
    issue.items.length,
  ]);
}

const issueHeaders = () => ISSUE_HEADERS.map((header) => t(header));

export function issuesToTable(issues: LighthouseIssue[]) {
  return { headers: issueHeaders(), rows: issuesToRows(issues) };
}

const CATEGORY_LABELS: Record<CategoryTab, string> = {
  all: "Tümü",
  performance: "Performans",
  accessibility: "Erişilebilirlik",
  "best-practices": "En iyi uygulamalar",
  seo: "SEO",
};

export function categoryLabel(category: CategoryTab) {
  return t(CATEGORY_LABELS[category]);
}

/**
 * Export wording needs the category as a noun phrase in two cases: the subject
 * form for the confirmation toasts ("Performans sorunları kopyalandı") and the
 * object form for the menu items ("Performans sorunlarını indir"). English got
 * away with one lowercased label; Turkish does not.
 */
const CATEGORY_ISSUE_PHRASES: Record<
  CategoryTab,
  { subject: string; object: string }
> = {
  all: { subject: "Tüm sorunlar", object: "Tüm sorunları" },
  performance: {
    subject: "Performans sorunları",
    object: "Performans sorunlarını",
  },
  accessibility: {
    subject: "Erişilebilirlik sorunları",
    object: "Erişilebilirlik sorunlarını",
  },
  "best-practices": {
    subject: "En iyi uygulama sorunları",
    object: "En iyi uygulama sorunlarını",
  },
  seo: { subject: "SEO sorunları", object: "SEO sorunlarını" },
};

export function categoryIssuePhrase(category: CategoryTab) {
  const phrase = CATEGORY_ISSUE_PHRASES[category];
  return { subject: t(phrase.subject), object: t(phrase.object) };
}

export function issuesToCsv(issues: LighthouseIssue[]) {
  return buildCsv(issueHeaders(), issuesToRows(issues));
}
