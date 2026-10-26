/**
 * Per-page checks over the signals the analyzer collects beyond the head
 * metadata: social cards, structured data properties, page weight, markup
 * hygiene and the accessibility basics a crawler can see without a browser.
 *
 * Each threshold is either a published one (Lighthouse's DOM size, WCAG's
 * 200% zoom) or set where the advice starts being true, and the registry
 * copy says which. Pure functions over one crawled page; the caller has
 * already returned for anything that is not an analyzed 2xx HTML page.
 */
import type { AuditIssueType } from "@/shared/audit-issues";
import { SERP_TITLE_MAX_PX, textPixelWidth } from "@/shared/serp-pixel-width";
import type { CrawledPageResult, PageSignals } from "@/server/lib/audit/types";

type Report = (
  issueType: AuditIssueType,
  details?: Record<string, unknown>,
) => void;

/** Lighthouse's "avoid an excessive DOM size" warns from here. */
const DOM_TOO_LARGE_NODES = 1_500;
const DOM_TOO_DEEP = 32;
/** Visible text under a tenth of the HTML: markup and scripts dominate. */
const LOW_TEXT_RATIO = 0.1;
/** A handful of eager images below the fold is ordinary; more is a pattern. */
const MAX_EAGER_IMAGES = 6;
const MIN_LEGACY_IMAGES = 3;
/** `title-too-long` already covers titles past this many characters. */
const TITLE_MAX_CHARS = 60;

function fold(text: string): string {
  return text.replace(/\s+/g, " ").trim().toLocaleLowerCase("tr-TR");
}

function reportSocial(page: CrawledPageResult, report: Report): void {
  const og = {
    "og:title": page.ogTitle,
    "og:description": page.ogDescription,
    "og:image": page.ogImage,
  };
  const present = Object.values(og).some((value) => value?.trim());
  if (!present) return;
  const missing = Object.entries(og)
    .filter(([, value]) => !value?.trim())
    .map(([name]) => name);
  if (missing.length > 0) report("og-incomplete", { missing });
  /* X reads og:title, og:description and og:image as fallbacks, but draws
     no card at all without twitter:card. Only said where somebody has set
     up Open Graph: a site without either is one site-level finding. */
  if (page.signals && !page.signals.twitterCard) report("twitter-card-missing");
}

function reportTitle(page: CrawledPageResult, report: Report): void {
  if (!page.title) return;
  if (page.firstH1 && fold(page.title) === fold(page.firstH1)) {
    report("title-equals-h1", { title: page.title });
  }
  const widthPx = textPixelWidth(page.title);
  if (page.title.length <= TITLE_MAX_CHARS && widthPx > SERP_TITLE_MAX_PX) {
    report("title-pixel-too-wide", { widthPx, limitPx: SERP_TITLE_MAX_PX });
  }
}

function reportMarkup(
  page: CrawledPageResult,
  signals: PageSignals,
  report: Report,
): void {
  if (signals.domNodeCount > DOM_TOO_LARGE_NODES) {
    report("dom-too-large", {
      nodes: signals.domNodeCount,
      limit: DOM_TOO_LARGE_NODES,
    });
  }
  if (signals.domMaxDepth > DOM_TOO_DEEP) {
    report("dom-too-deep", { depth: signals.domMaxDepth, limit: DOM_TOO_DEEP });
  }
  if (signals.duplicateIds > 0) {
    report("duplicate-ids", { count: signals.duplicateIds });
  }
  if (page.isIndexable && signals.textRatio < LOW_TEXT_RATIO) {
    report("low-text-ratio", {
      textRatio: signals.textRatio,
      htmlBytes: page.htmlBytes,
    });
  }
  if (signals.metaKeywordsPresent) report("meta-keywords-present");
}

function reportLinksAndForms(signals: PageSignals, report: Report): void {
  if (signals.javascriptLinks > 0) {
    report("javascript-href-links", { count: signals.javascriptLinks });
  }
  if (signals.externalBlankWithoutNoopener > 0) {
    report("blank-target-without-noopener", {
      count: signals.externalBlankWithoutNoopener,
    });
  }
  if (signals.formInputsWithoutLabel > 0) {
    report("form-input-without-label", {
      count: signals.formInputsWithoutLabel,
    });
  }
  if (signals.viewportZoomDisabled) report("viewport-zoom-disabled");
}

function reportImages(signals: PageSignals, report: Report): void {
  if (signals.imagesBelowFoldNotLazy > MAX_EAGER_IMAGES) {
    report("images-not-lazy", { count: signals.imagesBelowFoldNotLazy });
  }
  if (signals.imagesLegacyFormatCount >= MIN_LEGACY_IMAGES) {
    report("images-legacy-format", {
      count: signals.imagesLegacyFormatCount,
    });
  }
}

export function reportSignals(page: CrawledPageResult, report: Report): void {
  reportTitle(page, report);
  const { signals } = page;
  if (!signals) return;
  reportSocial(page, report);
  /* Google's required properties lose the rich result; the recommended
     ones (Article, Organization) only make it less complete, so they are
     a separate, lighter finding rather than a "required" claim. */
  const required = signals.structuredDataGaps.filter(
    (gap) => gap.level === "required",
  );
  const recommended = signals.structuredDataGaps.filter(
    (gap) => gap.level === "recommended",
  );
  if (required.length > 0) {
    report("structured-data-required-props-missing", { problems: required });
  }
  if (recommended.length > 0) {
    report("structured-data-recommended-props-missing", {
      problems: recommended,
    });
  }
  reportMarkup(page, signals, report);
  reportLinksAndForms(signals, report);
  reportImages(signals, report);
}
