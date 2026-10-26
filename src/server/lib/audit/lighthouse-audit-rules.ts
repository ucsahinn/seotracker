/**
 * Which Lighthouse audit each Lighthouse finding reads, and what makes it a
 * finding.
 *
 * A leaf module: the stored-payload builder needs the audit ids (to keep
 * only those, compactly) and the checks need the rules, and neither should
 * import the other.
 *
 * The ids are the ones PageSpeed Insights reports since Lighthouse 13, where
 * the "insight" audits replaced the older opportunity audits:
 * render-blocking-resources -> render-blocking-insight; modern-image-formats,
 * uses-optimized-images, uses-responsive-images, efficient-animated-content
 * -> image-delivery-insight; uses-long-cache-ttl -> cache-insight;
 * redirects, server-response-time, uses-text-compression ->
 * document-latency-insight; prioritize-lcp-image, lcp-lazy-loaded ->
 * lcp-discovery-insight; uses-http2 -> modern-http-insight; dom-size ->
 * dom-size-insight; third-party-summary -> third-parties-insight;
 * font-display -> font-display-insight. offscreen-images, font-size and
 * tap-targets no longer exist (target-size covers tap targets).
 * Source: developer.chrome.com/blog/moving-lighthouse-to-insights and the
 * Lighthouse 13 default config.
 */

export type LighthouseAuditRule =
  /** Lighthouse failed it and the savings it estimated reach a floor. */
  | { kind: "savings"; minMs?: number; minBytes?: number }
  /** Lighthouse failed it (binary audits: accessibility, SEO, best practices). */
  | { kind: "failed" }
  /** One of the named checklist entries is false. */
  | { kind: "checklist"; keys: string[] }
  /** Third-party main-thread time summed over the audit's rows. */
  | { kind: "mainThread"; minMs: number }
  /** The audit's own numeric value (bytes) is above a limit. */
  | { kind: "numericAbove"; limit: number };

export type LighthouseAuditSpec = {
  /** The Lighthouse audit id, as PageSpeed Insights returns it. */
  audit: string;
  rule: LighthouseAuditRule;
};

const KIB = 1024;

export const LIGHTHOUSE_AUDIT_SPECS = {
  "lh-render-blocking": {
    audit: "render-blocking-insight",
    rule: { kind: "savings", minMs: 150 },
  },
  "lh-unused-javascript": {
    audit: "unused-javascript",
    rule: { kind: "savings", minMs: 150, minBytes: 50 * KIB },
  },
  "lh-unused-css": {
    audit: "unused-css-rules",
    rule: { kind: "savings", minMs: 150, minBytes: 20 * KIB },
  },
  "lh-unminified-javascript": {
    audit: "unminified-javascript",
    rule: { kind: "savings", minMs: 100, minBytes: 10 * KIB },
  },
  "lh-unminified-css": {
    audit: "unminified-css",
    rule: { kind: "savings", minMs: 100, minBytes: 10 * KIB },
  },
  "lh-image-delivery": {
    audit: "image-delivery-insight",
    rule: { kind: "savings", minMs: 150, minBytes: 50 * KIB },
  },
  "lh-cache-policy": {
    audit: "cache-insight",
    rule: { kind: "savings", minBytes: 100 * KIB },
  },
  "lh-total-byte-weight": {
    audit: "total-byte-weight",
    rule: { kind: "numericAbove", limit: 2.5 * KIB * KIB },
  },
  "lh-dom-size": { audit: "dom-size-insight", rule: { kind: "failed" } },
  "lh-document-redirects": {
    audit: "document-latency-insight",
    rule: { kind: "checklist", keys: ["noRedirects"] },
  },
  "lh-slow-server-response": {
    audit: "document-latency-insight",
    rule: { kind: "checklist", keys: ["serverResponseIsFast"] },
  },
  "lh-text-compression": {
    audit: "document-latency-insight",
    rule: { kind: "checklist", keys: ["usesCompression"] },
  },
  "lh-font-display": {
    audit: "font-display-insight",
    rule: { kind: "savings", minMs: 100 },
  },
  "lh-lcp-lazy-loaded": {
    audit: "lcp-discovery-insight",
    rule: { kind: "checklist", keys: ["eagerlyLoaded"] },
  },
  "lh-lcp-not-prioritized": {
    audit: "lcp-discovery-insight",
    rule: {
      kind: "checklist",
      keys: ["requestDiscoverable", "priorityHinted"],
    },
  },
  "lh-modern-http": {
    audit: "modern-http-insight",
    rule: { kind: "savings", minMs: 100 },
  },
  "lh-legacy-javascript": {
    audit: "legacy-javascript-insight",
    rule: { kind: "savings", minMs: 150, minBytes: 20 * KIB },
  },
  /*
   * Lighthouse marks this insight "informative" whenever any third party is
   * present, which is nearly every site, so its state is no verdict. The
   * finding is the time those scripts held the main thread on a throttled
   * phone: half a second is well past the point where taps feel late.
   */
  "lh-third-parties": {
    audit: "third-parties-insight",
    rule: { kind: "mainThread", minMs: 500 },
  },
  "lh-a11y-color-contrast": {
    audit: "color-contrast",
    rule: { kind: "failed" },
  },
  "lh-a11y-image-alt": { audit: "image-alt", rule: { kind: "failed" } },
  "lh-a11y-label": { audit: "label", rule: { kind: "failed" } },
  "lh-a11y-link-name": { audit: "link-name", rule: { kind: "failed" } },
  "lh-a11y-button-name": { audit: "button-name", rule: { kind: "failed" } },
  "lh-a11y-document-title": {
    audit: "document-title",
    rule: { kind: "failed" },
  },
  "lh-a11y-html-has-lang": {
    audit: "html-has-lang",
    rule: { kind: "failed" },
  },
  "lh-a11y-meta-viewport": {
    audit: "meta-viewport",
    rule: { kind: "failed" },
  },
  "lh-a11y-target-size": { audit: "target-size", rule: { kind: "failed" } },
  "lh-a11y-heading-order": {
    audit: "heading-order",
    rule: { kind: "failed" },
  },
  "lh-is-on-https": { audit: "is-on-https", rule: { kind: "failed" } },
  "lh-errors-in-console": {
    audit: "errors-in-console",
    rule: { kind: "failed" },
  },
  "lh-deprecations": { audit: "deprecations", rule: { kind: "failed" } },
  "lh-inspector-issues": {
    audit: "inspector-issues",
    rule: { kind: "failed" },
  },
  "lh-image-aspect-ratio": {
    audit: "image-aspect-ratio",
    rule: { kind: "failed" },
  },
  "lh-image-size-responsive": {
    audit: "image-size-responsive",
    rule: { kind: "failed" },
  },
  "lh-crawlable-anchors": {
    audit: "crawlable-anchors",
    rule: { kind: "failed" },
  },
  "lh-link-text": { audit: "link-text", rule: { kind: "failed" } },
  "lh-is-crawlable": { audit: "is-crawlable", rule: { kind: "failed" } },
  "lh-robots-txt": { audit: "robots-txt", rule: { kind: "failed" } },
  "lh-hreflang": { audit: "hreflang", rule: { kind: "failed" } },
  "lh-canonical": { audit: "canonical", rule: { kind: "failed" } },
} as const satisfies Record<string, LighthouseAuditSpec>;

export type LighthouseAuditIssueType = keyof typeof LIGHTHOUSE_AUDIT_SPECS;

/** The Lighthouse audits whose results the stored payload keeps. */
export const TRACKED_LIGHTHOUSE_AUDITS: ReadonlySet<string> = new Set(
  Object.values(LIGHTHOUSE_AUDIT_SPECS).map((spec) => spec.audit),
);
