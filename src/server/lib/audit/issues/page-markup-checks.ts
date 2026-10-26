/**
 * The HTML checks over one analyzed page (`shared/audit-issues/html-checks.ts`).
 *
 * Pure functions over a crawled page whose `signals` were collected; the
 * caller has already returned for anything that is not a 2xx HTML page.
 * Each check fires only on what the markup states, and the heuristic ones
 * (title against content, "not found" titles) are written to stay silent
 * when in doubt.
 */
import type { AuditIssueType } from "@/shared/audit-issues";
import type { CrawledPageResult, PageSignals } from "@/server/lib/audit/types";

type Report = (
  issueType: AuditIssueType,
  details?: Record<string, unknown>,
) => void;

/** Inline script and style past this are worth moving into files. */
const LARGE_INLINE_CODE_CHARS = 100_000;
/** A page this short is `thin-content`'s business, not a title mismatch. */
const MIN_WORDS_FOR_TITLE_MATCH = 50;
const MAX_EXAMPLES = 3;

/*
 * Whole title or H1 segments that say the page does not exist. Matched as a
 * complete segment ("Sayfa bulunamadı | Acme"), never as a substring, so an
 * article titled "How to fix 404 errors" is not one.
 */
const NOT_FOUND_SEGMENTS = new Set([
  "404",
  "error 404",
  "404 error",
  "404 not found",
  "not found",
  "page not found",
  "404 page not found",
  "oops page not found",
  "sayfa bulunamadı", // i18n-ignore: Turkish words the check looks for
  "aradığınız sayfa bulunamadı", // i18n-ignore: Turkish words the check looks for
  "bulunamadı", // i18n-ignore: Turkish words the check looks for
  "hata 404",
  "404 hatası", // i18n-ignore: Turkish words the check looks for
  "404 sayfa bulunamadı", // i18n-ignore: Turkish words the check looks for
  "seite nicht gefunden",
  "page introuvable",
  "página no encontrada", // i18n-ignore: Spanish words the check looks for
]);

function notFoundSegment(text: string | null): string | null {
  if (!text) return null;
  for (const segment of text.split(/\s[|–—\-:·•]\s|\s*[|–—]\s*/)) {
    const folded = segment
      .toLocaleLowerCase("tr-TR")
      .replace(/[!.…,]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    if (NOT_FOUND_SEGMENTS.has(folded)) return segment.trim();
  }
  return null;
}

/** Robots tokens with `all` and `none` spelled out. */
function robotsTokens(values: string[]): Set<string> {
  const tokens = new Set<string>();
  for (const token of values
    .join(",")
    .toLowerCase()
    .split(/[,\s]+/)
    .filter(Boolean)) {
    if (token === "all") {
      tokens.add("index");
      tokens.add("follow");
    } else if (token === "none") {
      tokens.add("noindex");
      tokens.add("nofollow");
    } else {
      tokens.add(token);
    }
  }
  return tokens;
}

function contradicts(values: string[]): boolean {
  const tokens = robotsTokens(values);
  return (
    (tokens.has("index") && tokens.has("noindex")) ||
    (tokens.has("follow") && tokens.has("nofollow"))
  );
}

/*
 * nosnippet or max-snippet:0 for Google. An X-Robots-Tag scoped to another
 * crawler ("bingbot: nosnippet") is not Google's rule, so a scoped header is
 * only read when the scope is Googlebot.
 */
const DIRECTIVES_WITH_VALUE =
  /^(max-snippet|max-image-preview|max-video-preview|unavailable_after)$/i;

function headerAppliesToGoogle(header: string): boolean {
  const scope = /^\s*([a-z0-9_-]+)\s*:/i.exec(header)?.[1];
  if (!scope || DIRECTIVES_WITH_VALUE.test(scope)) return true;
  return scope.toLowerCase() === "googlebot";
}

function blocksSnippet(page: CrawledPageResult, signals: PageSignals): boolean {
  const header = page.xRobotsTag ?? "";
  const headerApplies = headerAppliesToGoogle(header);
  const text = [
    ...signals.markup.robotsMeta,
    ...signals.markup.googlebotMeta,
    headerApplies ? header : "",
  ]
    .join(",")
    .toLowerCase();
  return /\bnosnippet\b/.test(text) || /max-snippet\s*:\s*0(?!\d)/.test(text);
}

function isHttpsPage(url: string): boolean {
  return url.startsWith("https://");
}

/** The same site over http: the host itself or its www/apex sibling. */
function sameSiteHttp(target: string, pageUrl: string): boolean {
  try {
    const from = new URL(pageUrl).hostname.replace(/^www\./, "");
    const to = new URL(target);
    return (
      to.protocol === "http:" && to.hostname.replace(/^www\./, "") === from
    );
  } catch {
    return false;
  }
}

function reportCanonicalMarkup(signals: PageSignals, report: Report) {
  const href = signals.markup.canonicalHref;
  if (href) {
    // A scheme, or protocol-relative: both name a full address.
    if (!/^[a-z][a-z0-9+.-]*:/i.test(href) && !href.startsWith("//")) {
      report("canonical-relative", { canonical: href });
    }
    if (href.includes("#")) {
      report("canonical-with-fragment", { canonical: href });
    }
  }
  if (signals.markup.canonicalOnlyInBody) report("canonical-outside-head");
}

function reportRobotsMarkup(
  page: CrawledPageResult,
  signals: PageSignals,
  report: Report,
) {
  const { robotsMeta, googlebotMeta } = signals.markup;
  if (contradicts(robotsMeta) || contradicts(googlebotMeta)) {
    report("robots-meta-conflict", {
      robots: robotsMeta,
      googlebot: googlebotMeta,
    });
  }
  if (page.isIndexable && blocksSnippet(page, signals)) {
    report("snippet-blocked", {
      robotsMeta: robotsMeta.join(", ") || null,
      xRobotsTag: page.xRobotsTag,
    });
  }
}

function reportContentMarkup(
  page: CrawledPageResult,
  signals: PageSignals,
  report: Report,
) {
  const markup = signals.markup;
  const notFound = notFoundSegment(page.title) ?? notFoundSegment(page.firstH1);
  if (notFound) {
    report("page-says-not-found", {
      statusCode: page.statusCode,
      text: notFound,
    });
  }
  if (markup.loremIpsum) report("lorem-ipsum-text");
  if (markup.emailAddresses.length > 0) {
    report("exposed-email-address", {
      count: markup.emailAddresses.length,
      examples: markup.emailAddresses.slice(0, MAX_EXAMPLES),
    });
  }
  const words = markup.titleWords;
  if (
    words &&
    words.found === 0 &&
    page.isIndexable &&
    page.wordCount >= MIN_WORDS_FOR_TITLE_MATCH &&
    !notFound
  ) {
    report("title-content-mismatch", {
      title: page.title,
      topicWords: words.total,
    });
  }
  if (signals.organizationWithoutSameAs) {
    report("organization-missing-sameas");
  }
}

export function reportMarkupChecks(
  page: CrawledPageResult,
  report: Report,
): void {
  const signals = page.signals;
  if (!signals) return;
  const markup = signals.markup;

  if (markup.insecureMedia.count > 0) {
    report("mixed-content-media", {
      count: markup.insecureMedia.count,
      examples: markup.insecureMedia.examples.slice(0, MAX_EXAMPLES),
    });
  }
  if (markup.insecureFormActions.count > 0) {
    report("form-action-http", {
      count: markup.insecureFormActions.count,
      examples: markup.insecureFormActions.examples.slice(0, MAX_EXAMPLES),
    });
  }
  if (markup.metaRefreshUrl && markup.metaRefreshUrl !== page.url) {
    report("meta-refresh-redirect", { targetUrl: markup.metaRefreshUrl });
  }
  reportCanonicalMarkup(signals, report);
  reportRobotsMarkup(page, signals, report);
  reportContentMarkup(page, signals, report);

  if (isHttpsPage(page.url)) {
    const httpLinks = page.links.filter(
      (link) => !link.isInternal && sameSiteHttp(link.targetUrl, page.url),
    );
    if (httpLinks.length > 0) {
      report("internal-http-links", {
        count: httpLinks.length,
        examples: httpLinks
          .slice(0, MAX_EXAMPLES)
          .map((link) => link.targetUrl),
      });
    }
  }
  if (markup.inlineCodeChars > LARGE_INLINE_CODE_CHARS) {
    report("large-inline-code", {
      kilobytes: Math.round(markup.inlineCodeChars / 1024),
      limitKilobytes: Math.round(LARGE_INLINE_CODE_CHARS / 1024),
    });
  }
}
