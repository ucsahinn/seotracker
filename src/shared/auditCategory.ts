/**
 * The seven categories the audit's checks are grouped into, and how much
 * each one weighs in the site score. A leaf module so the score
 * (`auditScore`) and the check breakdown (`auditBreakdown`) can both file a
 * finding without importing each other.
 */
import { CONTENT_ISSUES } from "./audit-issues/content";
import { INDEXING_ISSUES } from "./audit-issues/indexing";
import { SECURITY_ISSUES } from "./audit-issues/security";
import { SPEED_ISSUES } from "./audit-issues/speed";

export const AUDIT_CATEGORIES = [
  "crawl",
  "content",
  "indexing",
  "speed",
  "security",
  "accessibility",
  "social",
] as const;

export type AuditCategory = (typeof AUDIT_CATEGORIES)[number];

/** Turkish source text; shown through t(). */
export const AUDIT_CATEGORY_LABEL: Record<AuditCategory, string> = {
  crawl: "Tarama",
  content: "İçerik",
  indexing: "Dizine alma",
  speed: "Hız",
  security: "Güvenlik",
  accessibility: "Erişilebilirlik",
  social: "Sosyal ve yapılandırılmış veri",
};

/*
 * How much a category counts in the site score, which is the weighted
 * average of the category scores. A page Google cannot crawl or will not
 * index is lost whatever else is right, so those two weigh most; social
 * cards and structured data only change how a result looks, so they weigh
 * least.
 */
export const AUDIT_CATEGORY_WEIGHT: Record<AuditCategory, number> = {
  crawl: 3,
  indexing: 3,
  content: 2,
  speed: 2,
  security: 1.5,
  accessibility: 1.5,
  social: 1,
};

/*
 * The registry is split by subject, which is the category for most types.
 * These are the ones whose subject file is not where a reader would look.
 */
const CATEGORY_OVERRIDE: Record<string, AuditCategory> = {
  "images-missing-alt": "accessibility",
  "alt-is-filename": "accessibility",
  "alt-too-long": "accessibility",
  "viewport-zoom-disabled": "accessibility",
  "form-input-without-label": "accessibility",
  "missing-lang": "accessibility",
  "missing-viewport": "accessibility",
  "duplicate-ids": "accessibility",
  "empty-anchor-text": "accessibility",
  "og-incomplete": "social",
  "twitter-card-missing": "social",
  "open-graph-missing-site": "social",
  "structured-data-missing-site": "social",
  "structured-data-required-props-missing": "social",
  "structured-data-recommended-props-missing": "social",
  "structured-data-invalid-json": "social",
  "google-rich-results-invalid": "social",
  "not-https": "security",
  "mixed-content-resource": "security",
  "blank-target-without-noopener": "security",
  "slow-response": "speed",
  "slow-ttfb": "speed",
  "html-too-large": "speed",
  "no-compression": "speed",
  "images-not-lazy": "speed",
  "images-legacy-format": "speed",
  "images-missing-dimensions": "speed",
  "dom-too-large": "speed",
  "dom-too-deep": "speed",
  // Lighthouse report findings (audit-issues/lighthouse-audits.ts).
  "lh-render-blocking": "speed",
  "lh-unused-javascript": "speed",
  "lh-unused-css": "speed",
  "lh-unminified-javascript": "speed",
  "lh-unminified-css": "speed",
  "lh-image-delivery": "speed",
  "lh-cache-policy": "speed",
  "lh-total-byte-weight": "speed",
  "lh-dom-size": "speed",
  "lh-document-redirects": "speed",
  "lh-slow-server-response": "speed",
  "lh-text-compression": "speed",
  "lh-font-display": "speed",
  "lh-lcp-lazy-loaded": "speed",
  "lh-lcp-not-prioritized": "speed",
  "lh-modern-http": "speed",
  "lh-legacy-javascript": "speed",
  "lh-third-parties": "speed",
  "cwv-lcp-needs-improvement": "speed",
  "cwv-cls-needs-improvement": "speed",
  "cwv-inp-needs-improvement": "speed",
  "lh-a11y-color-contrast": "accessibility",
  "lh-a11y-image-alt": "accessibility",
  "lh-a11y-label": "accessibility",
  "lh-a11y-link-name": "accessibility",
  "lh-a11y-button-name": "accessibility",
  "lh-a11y-document-title": "accessibility",
  "lh-a11y-html-has-lang": "accessibility",
  "lh-a11y-meta-viewport": "accessibility",
  "lh-a11y-target-size": "accessibility",
  "lh-a11y-heading-order": "accessibility",
  "lh-is-on-https": "security",
  "lh-errors-in-console": "crawl",
  "lh-deprecations": "crawl",
  "lh-inspector-issues": "crawl",
  "lh-image-aspect-ratio": "content",
  "lh-image-size-responsive": "content",
  "lh-crawlable-anchors": "crawl",
  "lh-link-text": "content",
  "lh-is-crawlable": "indexing",
  "lh-robots-txt": "crawl",
  "lh-hreflang": "indexing",
  "lh-canonical": "indexing",
  // HTML checks (audit-issues/html-checks.ts).
  "mixed-content-media": "security",
  "form-action-http": "security",
  "meta-refresh-redirect": "indexing",
  "canonical-relative": "indexing",
  "canonical-with-fragment": "indexing",
  "canonical-outside-head": "indexing",
  "robots-meta-conflict": "indexing",
  "snippet-blocked": "indexing",
  "page-says-not-found": "indexing",
  "lorem-ipsum-text": "content",
  "exposed-email-address": "security",
  "title-content-mismatch": "content",
  "organization-missing-sameas": "social",
  "missing-breadcrumbs": "crawl",
  "paginated-page-noindex": "indexing",
  "internal-http-links": "crawl",
  "large-inline-code": "speed",
  "missing-feed": "content",
  // Opt-in external requests (audit-issues/external-checks.ts).
  "broken-external-link": "crawl",
  "image-file-too-large": "speed",
};

export function auditCategoryOf(issueType: string): AuditCategory {
  const override = CATEGORY_OVERRIDE[issueType];
  if (override) return override;
  if (issueType in SECURITY_ISSUES) return "security";
  if (issueType in SPEED_ISSUES) return "speed";
  if (issueType in CONTENT_ISSUES) return "content";
  if (issueType in INDEXING_ISSUES) return "indexing";
  return "crawl";
}
