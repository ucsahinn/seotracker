/**
 * The per-page signals collector, driven by the analyzer's tokenizer
 * callbacks (see `page-analyzer.ts`).
 *
 * Kept apart from the analyzer so neither grows past what one reader can
 * hold, and so the memory rule stays visible: everything here is a counter,
 * a small capped set, or one script body at a time -- never the document.
 */
import { createMarkupCollector } from "./page-markup-signals";
import { computeSimhash, MIN_CONTENT_WORDS } from "./simhash";
import { summarizeJsonLd, type StructuredDataSummary } from "./structured-data";
import type { PageSignals } from "./types";
import { isSameOrigin, normalizeUrl } from "./url-utils";

/** Distinct ids remembered for the duplicate-id count. */
const MAX_TRACKED_IDS = 10_000;
/** Form controls remembered until the label set is complete. */
const MAX_TRACKED_CONTROLS = 500;
/** One inline script's text, buffered only to look for an analytics id. */
const MAX_SCRIPT_CHARS = 100_000;
const MAX_ANALYTICS_IDS = 10;
/** Images assumed to sit in the first screen, so eager loading is right. */
const ABOVE_FOLD_IMAGES = 3;
/** An image this small (either side, in its attributes) is an icon or a logo. */
const ICON_MAX_PX = 64;
/** An image this large (either side) is content, wherever it sits. */
const LARGE_IMAGE_PX = 200;
const ICON_HINT = /logo|icon|favicon|sprite|avatar|badge/i;
/*
 * Site chrome: the same on every page, so it says nothing about whether two
 * pages say the same thing. A header or footer inside <main>/<article> is
 * the article's own and stays.
 */
const ALWAYS_CHROME = new Set(["nav", "aside"]);
const OUTER_CHROME = new Set(["header", "footer"]);
const MAIN_CONTENT = new Set(["main", "article"]);

/*
 * Ids with a digit in them: a GA4 measurement id, a Tag Manager container or
 * a Universal Analytics property. The digit keeps `G-RECAPTCHA` and similar
 * constants out, and only scripts that mention Google's tag are scanned.
 */
const ANALYTICS_ID =
  /\b(G-(?=[A-Z0-9]*\d)[A-Z0-9]{6,12}|GTM-(?=[A-Z0-9]*\d)[A-Z0-9]{4,10}|UA-\d{4,10}-\d{1,4})\b/g;
const GOOGLE_TAG_HINT = /googletagmanager|google-analytics|gtag\(|dataLayer/;

const MODERN_IMAGE = /\.(webp|avif)(?:[?#\s,]|$)/i;
const LEGACY_IMAGE = /\.(jpe?g|png|gif|bmp)(?:[?#]|$)/i;
const UNLABELLED_INPUT_TYPES = new Set([
  "hidden",
  "submit",
  "button",
  "reset",
  "image",
]);

function attr(attribs: Record<string, string>, name: string): string {
  return attribs[name]?.trim() ?? "";
}

/**
 * `user-scalable=no` or a maximum scale that stops 200% zoom. Pairs are
 * split on commas, semicolons or plain spaces: browsers accept
 * `width=device-width initial-scale=1 maximum-scale=1` too.
 */
function isZoomDisabled(viewport: string | null): boolean {
  if (!viewport) return false;
  const settings = new Map(
    viewport
      .toLowerCase()
      .replace(/\s*=\s*/g, "=")
      .split(/[,;\s]+/)
      .map((part) => part.split("="))
      .filter((pair) => pair.length === 2)
      .map(([key, value]) => [key, value] as const),
  );
  const scalable = settings.get("user-scalable");
  if (scalable === "no" || scalable === "0") return true;
  const maximum = Number.parseFloat(settings.get("maximum-scale") ?? "");
  return Number.isFinite(maximum) && maximum < 2;
}

function pixels(value: string | undefined): number | null {
  const n = Number.parseInt(value ?? "", 10);
  return Number.isFinite(n) && n > 0 ? n : null;
}

/** A logo, an icon or a badge: small in its attributes, or named as one. */
function isIconLike(attribs: Record<string, string>, src: string): boolean {
  const sides = [pixels(attribs["width"]), pixels(attribs["height"])];
  if (sides.some((side) => side !== null && side <= ICON_MAX_PX)) return true;
  return ICON_HINT.test(
    `${src} ${attribs["alt"] ?? ""} ${attribs["class"] ?? ""}`,
  );
}

function isLargeImage(attribs: Record<string, string>): boolean {
  return [pixels(attribs["width"]), pixels(attribs["height"])].some(
    (side) => side !== null && side >= LARGE_IMAGE_PX,
  );
}

function isExternalHttp(href: string, pageUrl: string): boolean {
  const resolved = normalizeUrl(href, pageUrl);
  return (
    resolved !== null &&
    /^https?:/i.test(resolved) &&
    !isSameOrigin(resolved, pageUrl)
  );
}

export function createSignalCollector(pageUrl: string) {
  let domNodeCount = 0;
  let depth = 0;
  let domMaxDepth = 0;
  let twitterCard: string | null = null;
  let metaKeywordsPresent = false;
  let externalBlankWithoutNoopener = 0;
  let javascriptLinks = 0;
  let hashOnlyLinks = 0;
  let imagesLazyCount = 0;
  let imagesModernFormatCount = 0;
  let imagesBelowFoldNotLazy = 0;
  let imagesLegacyFormatCount = 0;
  let rasterImages = 0;
  let pictureDepth = 0;
  let pictureHasModern = false;
  // Main-content tracking, for the near-duplicate fingerprint and images.
  let mainDepth = 0;
  let sawMain = false;
  let chromeDepth = 0;
  const outerChrome: boolean[] = [];
  const mainParts: string[] = [];
  const otherParts: string[] = [];
  let labelDepth = 0;
  const labelFor = new Set<string>();
  const unlabelledControls: Array<string | null> = [];
  const ids = new Set<string>();
  const duplicateIds = new Set<string>();
  const analyticsIds = new Set<string>();
  let scriptParts: string[] | null = null;
  let scriptChars = 0;
  const structuredData: StructuredDataSummary = {
    types: [],
    gaps: [],
    organizationWithoutSameAs: false,
  };
  const markup = createMarkupCollector(pageUrl);

  const collectAnalytics = (text: string) => {
    if (!GOOGLE_TAG_HINT.test(text)) return;
    for (const match of text.matchAll(ANALYTICS_ID)) {
      if (analyticsIds.size >= MAX_ANALYTICS_IDS) return;
      analyticsIds.add(match[1]);
    }
  };

  const onMeta = (attribs: Record<string, string>) => {
    const name = (attribs["name"] ?? attribs["property"])?.trim().toLowerCase();
    if (name === "twitter:card")
      twitterCard ??= attr(attribs, "content") || null;
    if (name === "keywords" && attr(attribs, "content")) {
      metaKeywordsPresent = true;
    }
  };

  const onAnchor = (attribs: Record<string, string>) => {
    const href = attr(attribs, "href");
    if (/^javascript:/i.test(href)) javascriptLinks += 1;
    if (href === "#") hashOnlyLinks += 1;
    if (attr(attribs, "target").toLowerCase() !== "_blank") return;
    const rel = attr(attribs, "rel").toLowerCase().split(/\s+/);
    if (rel.includes("noopener") || rel.includes("noreferrer")) return;
    if (isExternalHttp(href, pageUrl)) externalBlankWithoutNoopener += 1;
  };

  const onImage = (attribs: Record<string, string>) => {
    const src = attr(attribs, "src") || attr(attribs, "data-src");
    if (!src || /^data:/i.test(src) || /\.svg(?:[?#]|$)/i.test(src)) return;
    const lazy =
      attr(attribs, "loading").toLowerCase() === "lazy" ||
      Boolean(attribs["data-src"] ?? attribs["data-srcset"]) ||
      /\blazy/i.test(attribs["class"] ?? "");
    if (lazy) imagesLazyCount += 1;
    // Logos and icons are small whatever their format and loading.
    if (isIconLike(attribs, src)) return;
    rasterImages += 1;
    /* Below the first few content images, and either sized as content or
       inside the main content: a guess at "below the fold" that a gallery
       of thumbnails in a header does not trip. */
    if (
      rasterImages > ABOVE_FOLD_IMAGES &&
      !lazy &&
      (sawMain || isLargeImage(attribs))
    ) {
      imagesBelowFoldNotLazy += 1;
    }
    const srcset = attribs["srcset"] ?? attribs["data-srcset"] ?? "";
    if (
      (pictureDepth > 0 && pictureHasModern) ||
      MODERN_IMAGE.test(src) ||
      MODERN_IMAGE.test(srcset)
    ) {
      imagesModernFormatCount += 1;
    } else if (LEGACY_IMAGE.test(src)) {
      imagesLegacyFormatCount += 1;
    }
  };

  const onFormControl = (name: string, attribs: Record<string, string>) => {
    const type = attr(attribs, "type").toLowerCase();
    if (name === "input" && UNLABELLED_INPUT_TYPES.has(type)) return;
    const named =
      labelDepth > 0 ||
      attr(attribs, "aria-label") ||
      attr(attribs, "aria-labelledby") ||
      attr(attribs, "title") ||
      (name !== "select" && attr(attribs, "placeholder"));
    if (named || unlabelledControls.length >= MAX_TRACKED_CONTROLS) return;
    unlabelledControls.push(attr(attribs, "id") || null);
  };

  const openContainer = (name: string) => {
    if (MAIN_CONTENT.has(name)) {
      mainDepth += 1;
      sawMain = true;
    } else if (ALWAYS_CHROME.has(name)) {
      chromeDepth += 1;
    } else if (OUTER_CHROME.has(name)) {
      const chrome = mainDepth === 0;
      outerChrome.push(chrome);
      if (chrome) chromeDepth += 1;
    }
  };

  const closeContainer = (name: string) => {
    if (MAIN_CONTENT.has(name) && mainDepth > 0) mainDepth -= 1;
    else if (ALWAYS_CHROME.has(name) && chromeDepth > 0) chromeDepth -= 1;
    else if (OUTER_CHROME.has(name) && outerChrome.pop() && chromeDepth > 0) {
      chromeDepth -= 1;
    }
  };

  /*
   * <main> or <article> when the page has enough words in one; otherwise
   * the body without its navigation, header, footer and sidebars.
   */
  const contentText = () => {
    // Joined as the analyzer joins body text: a word can span two nodes.
    const main = mainParts.join("");
    return main.split(/\s+/).filter(Boolean).length >= MIN_CONTENT_WORDS
      ? main
      : `${otherParts.join("")} ${main}`;
  };

  const onId = (id: string) => {
    if (!id) return;
    if (ids.has(id)) duplicateIds.add(id);
    else if (ids.size < MAX_TRACKED_IDS) ids.add(id);
  };

  return {
    openTag(name: string, attribs: Record<string, string>): void {
      domNodeCount += 1;
      depth += 1;
      if (depth > domMaxDepth) domMaxDepth = depth;
      onId(attr(attribs, "id"));
      openContainer(name);
      markup.openTag(name, attribs);
      switch (name) {
        case "meta":
          onMeta(attribs);
          break;
        case "a":
          onAnchor(attribs);
          break;
        case "img":
          onImage(attribs);
          break;
        case "picture":
          if (pictureDepth === 0) pictureHasModern = false;
          pictureDepth += 1;
          break;
        case "source":
          if (
            pictureDepth > 0 &&
            (/image\/(webp|avif)/i.test(attribs["type"] ?? "") ||
              MODERN_IMAGE.test(attribs["srcset"] ?? ""))
          ) {
            pictureHasModern = true;
          }
          break;
        case "label":
          labelDepth += 1;
          if (attr(attribs, "for")) labelFor.add(attr(attribs, "for"));
          break;
        case "input":
        case "select":
        case "textarea":
          onFormControl(name, attribs);
          break;
        case "script":
          collectAnalytics(attribs["src"] ?? "");
          if (attr(attribs, "type").toLowerCase() !== "application/ld+json") {
            scriptParts = [];
            scriptChars = 0;
          }
          break;
      }
    },

    /** Visible body text, as the analyzer collects it (no script or style). */
    bodyText(text: string): void {
      if (chromeDepth > 0) return;
      (mainDepth > 0 ? mainParts : otherParts).push(text);
    },

    text(text: string): void {
      markup.text(text);
      if (!scriptParts) return;
      scriptChars += text.length;
      if (scriptChars <= MAX_SCRIPT_CHARS) scriptParts.push(text);
    },

    closeTag(name: string): void {
      if (depth > 0) depth -= 1;
      closeContainer(name);
      markup.closeTag(name);
      if (name === "picture" && pictureDepth > 0) pictureDepth -= 1;
      if (name === "label" && labelDepth > 0) labelDepth -= 1;
      if (name === "script" && scriptParts) {
        collectAnalytics(scriptParts.join(""));
        scriptParts = null;
      }
    },

    jsonLd(data: unknown): void {
      summarizeJsonLd(data, structuredData);
    },

    finish(input: {
      bodyText: string;
      htmlLength: number;
      viewport: string | null;
      title: string;
      h1s: string[];
    }): PageSignals {
      return {
        textRatio:
          input.htmlLength > 0
            ? Math.round((input.bodyText.length / input.htmlLength) * 1e4) / 1e4
            : 0,
        domNodeCount,
        domMaxDepth,
        twitterCard,
        metaKeywordsPresent,
        viewportZoomDisabled: isZoomDisabled(input.viewport),
        externalBlankWithoutNoopener,
        javascriptLinks,
        hashOnlyLinks,
        imagesLazyCount,
        imagesModernFormatCount,
        imagesBelowFoldNotLazy,
        imagesLegacyFormatCount,
        formInputsWithoutLabel: unlabelledControls.filter(
          (id) => id === null || !labelFor.has(id),
        ).length,
        duplicateIds: duplicateIds.size,
        contentSimhash: computeSimhash(contentText()),
        jsonLdTypes: structuredData.types,
        structuredDataGaps: structuredData.gaps,
        organizationWithoutSameAs: structuredData.organizationWithoutSameAs,
        analyticsIds: [...analyticsIds],
        markup: markup.finish({
          bodyText: input.bodyText,
          title: input.title,
          h1s: input.h1s,
          jsonLdTypes: structuredData.types,
        }),
      };
    },
  };
}
