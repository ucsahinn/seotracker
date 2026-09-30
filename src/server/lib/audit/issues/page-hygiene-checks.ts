/**
 * Eleven small per-page hygiene checks, all read straight off what the
 * crawler already holds for one page: markup that is malformed, link text
 * that says nothing, and URLs that are awkward to share or easy to duplicate.
 *
 * Every one is `info` or a clearly broken-markup `warning`. None of them is a
 * ranking factor and the registry copy says so; they are here because each
 * is cheap to fix once and cheap to get wrong in a template.
 *
 * Pure functions over one crawled page. The caller has already returned for
 * blocked, errored, non-200 and non-HTML fetches.
 */
import type { AuditIssueType } from "@/shared/audit-issues";
import type { CrawledPageResult } from "@/server/lib/audit/types";

type Report = (
  issueType: AuditIssueType,
  details?: Record<string, unknown>,
) => void;

const URL_MAX_CHARS = 115;
const H1_MAX_CHARS = 70;
const TOO_MANY_LINKS = 300;
/** One generic "read more" is ordinary; a page full of them is a template. */
const MIN_GENERIC_ANCHORS = 3;
/** One nofollowed login link is ordinary; a menu full of them is not. */
const MIN_INTERNAL_NOFOLLOW = 3;

/** Titles nobody wrote: what an editor or a new template leaves behind. */
const PLACEHOLDER_TITLES = new Set([
  "untitled",
  "untitled document",
  "untitled page",
  "new page",
  "new document",
  "document",
  "default title",
  "page title",
  "your title here",
  "title",
  "index",
  "başlıksız",
  "başlıksız belge",
  "başlıksız sayfa",
  "yeni sayfa",
  "sayfa başlığı",
]);

/** Link texts that describe nothing about where the link goes. */
const GENERIC_ANCHORS = new Set([
  "click here",
  "click",
  "here",
  "read more",
  "learn more",
  "more",
  "more info",
  "details",
  "link",
  "this link",
  "buraya tıklayın",
  "buraya tıklayınız",
  "buraya tıkla",
  "tıklayın",
  "tıkla",
  "burada",
  "devamı",
  "devamını oku",
  "devamını göster",
  "daha fazla",
  "daha fazla bilgi",
  "detaylar",
  "ayrıntılar",
  "incele",
]);

/** Trimmed and lowercased both ways: Turkish folds I to ı, English to i. */
function foldedForms(text: string): string[] {
  const trimmed = text
    .trim()
    .replace(/[\s.…»«>›→:!]+$/u, "")
    .replace(/^[\s«»<‹←]+/u, "");
  return [trimmed.toLowerCase(), trimmed.toLocaleLowerCase("tr-TR")];
}

function inSet(set: Set<string>, text: string): boolean {
  return foldedForms(text).some((form) => set.has(form));
}

export function isPlaceholderTitle(title: string): boolean {
  return inSet(PLACEHOLDER_TITLES, title);
}

export function genericAnchors(page: CrawledPageResult): string[] {
  return page.links
    .filter(
      (link) =>
        link.isInternal && link.anchor && inSet(GENERIC_ANCHORS, link.anchor),
    )
    .map((link) => link.anchor ?? "");
}

/** Uppercase letters or underscores in the path, ignoring %XX escapes. */
export function pathHasUppercaseOrUnderscore(url: string): boolean {
  try {
    const path = new URL(url).pathname.replace(/%[0-9a-f]{2}/gi, "");
    return /[A-Z_]/.test(path);
  } catch {
    return false;
  }
}

export function reportHygiene(page: CrawledPageResult, report: Report): void {
  if (!page.charsetDeclared) report("missing-charset");
  if (page.titleCount > 1)
    report("multiple-titles", { count: page.titleCount });
  if (page.metaDescriptionCount > 1) {
    report("multiple-meta-descriptions", { count: page.metaDescriptionCount });
  }
  if (page.title && isPlaceholderTitle(page.title)) {
    report("placeholder-title", { title: page.title });
  }
  if (page.firstH1 && page.firstH1.length > H1_MAX_CHARS) {
    report("h1-too-long", { length: page.firstH1.length, limit: H1_MAX_CHARS });
  }
  if (page.emptyAnchorCount > 0) {
    report("empty-anchor-text", { count: page.emptyAnchorCount });
  }
  const generic = genericAnchors(page);
  if (generic.length >= MIN_GENERIC_ANCHORS) {
    report("generic-anchor-text", {
      count: generic.length,
      examples: [...new Set(generic)].slice(0, 3),
    });
  }
  const nofollowed = page.links.filter((l) => l.isInternal && l.isNofollow);
  if (nofollowed.length >= MIN_INTERNAL_NOFOLLOW) {
    report("internal-nofollow-links", {
      count: nofollowed.length,
      example: nofollowed[0]?.targetUrl,
    });
  }
  if (!page.isIndexable) return;
  if (page.links.length > TOO_MANY_LINKS) {
    report("too-many-links", {
      count: page.links.length,
      limit: TOO_MANY_LINKS,
    });
  }
  if (page.url.length > URL_MAX_CHARS) {
    report("url-too-long", { length: page.url.length, limit: URL_MAX_CHARS });
  }
  if (pathHasUppercaseOrUnderscore(page.url))
    report("url-uppercase-or-underscore");
}
