import type {
  CrawledPageResult,
  MarkupSignals,
  PageSignals,
} from "@/server/lib/audit/types";

/** A crawled page that is fine in every respect; override what a test varies. */
export function makeCrawledPage(
  overrides: Partial<CrawledPageResult> = {},
): CrawledPageResult {
  return {
    id: "page-1",
    url: "https://example.com/",
    statusCode: 200,
    fetchClass: "ok",
    redirectUrl: null,
    title: "",
    metaDescription: "",
    canonicalCount: 0,
    titleCount: 0,
    metaDescriptionCount: 0,
    emptyAnchorCount: 0,
    linkTargetCount: 0,
    charsetDeclared: true,
    canonicalUrl: null,
    robotsMeta: null,
    googlebotMeta: null,
    htmlLang: "en",
    xRobotsTag: null,
    headerCanonicalUrl: null,
    ogTitle: null,
    ogDescription: null,
    ogImage: null,
    h1Count: 0,
    firstH1: null,
    h2Count: 0,
    h3Count: 0,
    h4Count: 0,
    h5Count: 0,
    h6Count: 0,
    headingOrder: [],
    wordCount: 0,
    contentHash: null,
    isHtml: true,
    htmlBytes: 10_000,
    rateLimited: false,
    imagesTotal: 0,
    imagesMissingAlt: 0,
    images: [],
    links: [],
    hasStructuredData: false,
    invalidStructuredDataCount: 0,
    viewport: "width=device-width, initial-scale=1",
    resources: [],
    insecureResources: [],
    hreflangAlternates: [],
    signals: null,
    isIndexable: true,
    responseTimeMs: 300,
    crawlDepth: 0,
    inSitemap: false,
    ...overrides,
  };
}

/** Signals of a clean page; override what a test varies. */
export function makePageSignals(
  overrides: Partial<PageSignals> = {},
): PageSignals {
  return {
    textRatio: 0.3,
    domNodeCount: 400,
    domMaxDepth: 12,
    twitterCard: null,
    metaKeywordsPresent: false,
    viewportZoomDisabled: false,
    externalBlankWithoutNoopener: 0,
    javascriptLinks: 0,
    hashOnlyLinks: 0,
    imagesLazyCount: 0,
    imagesModernFormatCount: 0,
    imagesBelowFoldNotLazy: 0,
    imagesLegacyFormatCount: 0,
    formInputsWithoutLabel: 0,
    duplicateIds: 0,
    contentSimhash: null,
    jsonLdTypes: [],
    structuredDataGaps: [],
    organizationWithoutSameAs: false,
    analyticsIds: [],
    markup: makeMarkupSignals(),
    ...overrides,
  };
}

/** Markup facts of a clean page; override what a test varies. */
function makeMarkupSignals(
  overrides: Partial<MarkupSignals> = {},
): MarkupSignals {
  return {
    insecureMedia: { count: 0, examples: [] },
    insecureFormActions: { count: 0, examples: [] },
    metaRefreshUrl: null,
    metaRefreshDelay: null,
    canonicalHref: null,
    canonicalOnlyInBody: false,
    robotsMeta: [],
    googlebotMeta: [],
    loremIpsum: false,
    emailAddresses: [],
    titleWords: null,
    hasBreadcrumbs: false,
    hasFeedLink: false,
    inlineCodeChars: 0,
    ...overrides,
  };
}
