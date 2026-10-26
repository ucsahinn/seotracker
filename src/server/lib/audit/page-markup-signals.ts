/**
 * Markup facts for the HTML checks (`shared/audit-issues/html-checks.ts`),
 * collected in the same tokenizer pass as the other page signals.
 *
 * Same memory rule as `page-signals.ts`: counters and small capped lists,
 * never the document. Everything here is transient except the two booleans
 * the site-wide checks read back (breadcrumbs, feed link).
 */
import type { MarkupSignals } from "./types";
import { normalizeUrl } from "./url-utils";

const MAX_EXAMPLES = 5;
const MAX_EMAILS = 5;
/** A title word shorter than this is a particle, not a topic. */
const MIN_TITLE_WORD = 4;
/** Long words match on their first letters, so a suffix still matches. */
const STEM_LENGTH = 5;

/*
 * Words that carry no topic in a title: separators' neighbours, brand
 * filler, and the commonest function words in Turkish and English.
 */
const TITLE_STOPWORDS = new Set([
  "with",
  "from",
  "your",
  "that",
  "this",
  "home",
  "page",
  "about",
  "official",
  "site",
  "website",
  "için", // i18n-ignore: Turkish words the check looks for
  "gibi",
  "olan",
  "daha",
  "veya",
  "ana",
  "sayfa",
  "resmi",
  "sitesi",
]);

/* `lorem ipsum dolor`, or the stock second sentence on its own. */
const LOREM = /\blorem ipsum dolor\b|\bconsectetur adipiscing elit\b/i;
/*
 * Case-sensitive on purpose. Text nodes run together on many pages ("Email
 * us at lifekit@npr.org" right before a "Support" link), and a
 * case-insensitive TLD swallowed the next word: the audit reported
 * `lifekit@npr.orgsupport` and `shortwave@npr.org.listen` (www.npr.org,
 * 2026-10-26). A TLD is all lower or all upper case and may not run on into
 * more letters of its own case, so a capitalised next word stays outside.
 */
const EMAIL =
  /[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*\.(?:[a-z]{2,24}(?![a-z0-9])|[A-Z]{2,24}(?![A-Za-z0-9]))/g;
/* "logo@2x.png" is a file name, not an address. */
const FILE_TLD = /\.(png|jpe?g|gif|webp|avif|svg|css|js|ico)$/i;
const PLACEHOLDER_EMAIL = /@(example|domain|email|yourdomain|sentry)\./i;
const BREADCRUMB_HINT = /breadcrumb/i;
const FEED_TYPE = /^application\/(rss|atom)\+xml$/i;
const EXECUTABLE_SCRIPT = new Set([
  "",
  "text/javascript",
  "application/javascript",
  "module",
]);
/** Elements whose src (or poster, data) loads passive or framed content. */
const MEDIA_SOURCES: Record<string, string[]> = {
  img: ["src"],
  iframe: ["src"],
  video: ["src", "poster"],
  audio: ["src"],
  source: ["src"],
  track: ["src"],
  embed: ["src"],
  object: ["data"],
};

function attr(attribs: Record<string, string>, name: string): string {
  return attribs[name]?.trim() ?? "";
}

function fold(text: string): string {
  return text.toLocaleLowerCase("tr-TR");
}

/** Topic words of a title: not the brand after a separator, not particles. */
function titleTopicWords(title: string): string[] {
  // "Topic words – Brand": the segment after the last separator is the site.
  const segments = title.split(/\s[|–—\-:·•]\s/);
  const topic =
    segments.length > 1 ? segments.slice(0, -1).join(" ") : segments[0];
  return [
    ...new Set(
      fold(topic ?? "")
        .split(/[^\p{L}\p{N}]+/u)
        .filter(
          (word) =>
            word.length >= MIN_TITLE_WORD &&
            !TITLE_STOPWORDS.has(word) &&
            !/^\d+$/.test(word),
        ),
    ),
  ];
}

function titleOverlap(
  title: string,
  content: string,
): MarkupSignals["titleWords"] {
  const words = titleTopicWords(title);
  if (words.length < 2) return null;
  const contentWords = fold(content).split(/[^\p{L}\p{N}]+/u);
  const stems = new Set(contentWords.map((word) => word.slice(0, STEM_LENGTH)));
  const found = words.filter((word) =>
    stems.has(word.slice(0, STEM_LENGTH)),
  ).length;
  return { total: words.length, found };
}

function isInsecureOn(url: string, pageIsHttps: boolean): boolean {
  return pageIsHttps && /^http:\/\//i.test(url);
}

export function createMarkupCollector(pageUrl: string) {
  const pageIsHttps = pageUrl.startsWith("https://");
  let inBody = false;
  const insecureMedia = { count: 0, examples: [] as string[] };
  const insecureFormActions = { count: 0, examples: [] as string[] };
  let metaRefreshUrl: string | null = null;
  let metaRefreshDelay: number | null = null;
  let headCanonical: string | null = null;
  let bodyCanonical = false;
  const robotsMeta: string[] = [];
  const googlebotMeta: string[] = [];
  const emails = new Set<string>();
  let hasBreadcrumbs = false;
  let hasFeedLink = false;
  let inlineCodeChars = 0;
  let inlineCodeDepth = 0;

  const noteInsecure = (
    bucket: { count: number; examples: string[] },
    raw: string,
  ) => {
    const resolved = normalizeUrl(raw, pageUrl);
    if (!resolved || !isInsecureOn(resolved, pageIsHttps)) return;
    bucket.count += 1;
    if (bucket.examples.length < MAX_EXAMPLES) bucket.examples.push(resolved);
  };

  const addEmail = (raw: string) => {
    const email = raw.trim().toLowerCase();
    if (
      emails.size >= MAX_EMAILS ||
      FILE_TLD.test(email) ||
      PLACEHOLDER_EMAIL.test(email)
    ) {
      return;
    }
    emails.add(email);
  };

  const onMeta = (attribs: Record<string, string>) => {
    const name = attr(attribs, "name").toLowerCase();
    const content = attr(attribs, "content");
    if (name === "robots" && content) robotsMeta.push(content);
    if (name === "googlebot" && content) googlebotMeta.push(content);
    if (attr(attribs, "http-equiv").toLowerCase() === "refresh") {
      // `5; url=/next` -- only a refresh that goes somewhere is a redirect.
      const target = /url\s*=\s*['"]?([^'"\s]+)/i.exec(content)?.[1];
      if (target && metaRefreshUrl === null) {
        metaRefreshUrl = normalizeUrl(target, pageUrl) ?? target;
        const seconds = Number.parseFloat(content);
        metaRefreshDelay = Number.isNaN(seconds) ? 0 : seconds;
      }
    }
  };

  const onLink = (attribs: Record<string, string>) => {
    const rel = attr(attribs, "rel").toLowerCase().split(/\s+/);
    if (rel.includes("canonical")) {
      if (inBody) bodyCanonical = true;
      else headCanonical ??= attr(attribs, "href") || null;
    }
    if (rel.includes("alternate") && FEED_TYPE.test(attr(attribs, "type"))) {
      hasFeedLink = true;
    }
  };

  return {
    openTag(name: string, attribs: Record<string, string>): void {
      if (name === "body") inBody = true;
      if (
        !hasBreadcrumbs &&
        (BREADCRUMB_HINT.test(attribs["aria-label"] ?? "") ||
          BREADCRUMB_HINT.test(attribs["class"] ?? "") ||
          BREADCRUMB_HINT.test(attribs["id"] ?? "") ||
          /BreadcrumbList/.test(attribs["itemtype"] ?? "") ||
          /BreadcrumbList/.test(attribs["typeof"] ?? ""))
      ) {
        hasBreadcrumbs = true;
      }
      for (const key of MEDIA_SOURCES[name] ?? []) {
        const value = attr(attribs, key);
        if (value) noteInsecure(insecureMedia, value);
      }
      switch (name) {
        case "meta":
          onMeta(attribs);
          break;
        case "link":
          onLink(attribs);
          break;
        case "form":
          noteInsecure(insecureFormActions, attr(attribs, "action"));
          break;
        case "a": {
          const href = attr(attribs, "href");
          if (/^mailto:/i.test(href)) {
            const address = href.slice(7).split("?")[0] ?? "";
            for (const match of decodeURIComponentSafe(address).matchAll(
              EMAIL,
            )) {
              addEmail(match[0]);
            }
          }
          break;
        }
        case "script":
          if (
            !attribs["src"] &&
            EXECUTABLE_SCRIPT.has(attr(attribs, "type").toLowerCase())
          ) {
            inlineCodeDepth += 1;
          }
          break;
        case "style":
          inlineCodeDepth += 1;
          break;
      }
    },

    text(text: string): void {
      if (inlineCodeDepth > 0) inlineCodeChars += text.length;
    },

    closeTag(name: string): void {
      if ((name === "script" || name === "style") && inlineCodeDepth > 0) {
        inlineCodeDepth -= 1;
      }
    },

    finish(input: {
      bodyText: string;
      title: string;
      h1s: string[];
      jsonLdTypes: string[];
    }): MarkupSignals {
      for (const match of input.bodyText.matchAll(EMAIL)) addEmail(match[0]);
      return {
        insecureMedia,
        insecureFormActions,
        metaRefreshUrl,
        metaRefreshDelay,
        canonicalHref: headCanonical,
        canonicalOnlyInBody: bodyCanonical && headCanonical === null,
        robotsMeta,
        googlebotMeta,
        loremIpsum: LOREM.test(input.bodyText),
        emailAddresses: [...emails],
        titleWords: input.title
          ? titleOverlap(
              input.title,
              `${input.h1s.join(" ")} ${input.bodyText}`,
            )
          : null,
        hasBreadcrumbs:
          hasBreadcrumbs || input.jsonLdTypes.includes("BreadcrumbList"),
        hasFeedLink,
        inlineCodeChars,
      };
    },
  };
}

function decodeURIComponentSafe(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}
