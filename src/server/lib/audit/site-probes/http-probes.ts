/**
 * Probes against the audited site itself: the start page's response and
 * headers, how http:// and the www/apex sibling answer, what a missing page
 * returns, the favicon, and a few well-known text files.
 *
 * Every probe resolves; a failed request leaves its facts null.
 */
import { Parser } from "htmlparser2";
import { decodeUtf8, readBodyPrefix } from "../discovery-body";
import { normalizeUrl } from "../url-utils";
import { probeFetch, type ProbeContext } from "./site-fetch";
import type {
  FaviconFacts,
  HostVariantFacts,
  HttpsRedirectFacts,
  NotFoundFacts,
  StartPageFacts,
  WellKnownFile,
} from "./types";

/** Enough to tell a 2 MB page from a normal one without holding a huge one. */
const MAX_START_HTML_BYTES = 5 * 1024 * 1024;
const MAX_HEADERS = 40;
const MAX_HEADER_VALUE = 200;
/** `<link rel="icon" href="data:...">`: the icon is inline, nothing to fetch. */
const DATA_ICON = /^data:/i;

const header = (response: Response, name: string) =>
  response.headers.get(name)?.slice(0, MAX_HEADER_VALUE) ?? null;

/*
 * Directives are split on ";", and on "," too: a site that sends two CSP
 * headers reaches us as one value joined with ", " (Headers.get), and a
 * frame-ancestors in the second policy would otherwise go unseen.
 */
function hasFrameAncestors(csp: string): boolean {
  return csp
    .split(/[;,]/)
    .some((directive) => /^frame-ancestors(\s|$)/i.test(directive.trim()));
}

function readHeaderFacts(
  response: Response,
): Omit<
  StartPageFacts,
  "finalUrl" | "status" | "redirectHops" | "ttfbMs" | "totalMs" | "htmlBytes"
> {
  const csp = response.headers.get("content-security-policy");
  const headers: { name: string; value: string }[] = [];
  response.headers.forEach((value, name) => {
    // Cookies identify sessions and say nothing about the site's setup.
    if (name === "set-cookie" || headers.length >= MAX_HEADERS) return;
    headers.push({ name, value: value.slice(0, MAX_HEADER_VALUE) });
  });
  return {
    contentType: header(response, "content-type"),
    contentEncoding: header(response, "content-encoding"),
    cacheControl: header(response, "cache-control"),
    server: header(response, "server"),
    xPoweredBy: header(response, "x-powered-by"),
    hsts: header(response, "strict-transport-security"),
    cspPresent: csp !== null,
    cspFrameAncestors: csp !== null && hasFrameAncestors(csp),
    xContentTypeOptions: header(response, "x-content-type-options"),
    xFrameOptions: header(response, "x-frame-options"),
    referrerPolicy: header(response, "referrer-policy"),
    permissionsPolicy: header(response, "permissions-policy"),
    headers,
  };
}

const EMPTY_HEADER_FACTS: ReturnType<typeof readHeaderFacts> = {
  contentType: null,
  contentEncoding: null,
  cacheControl: null,
  server: null,
  xPoweredBy: null,
  hsts: null,
  cspPresent: null,
  cspFrameAncestors: null,
  xContentTypeOptions: null,
  xFrameOptions: null,
  referrerPolicy: null,
  permissionsPolicy: null,
  headers: [],
};

/** `<link rel="icon" href>` (or `shortcut icon` / `apple-touch-icon`). */
export function findDeclaredIcon(html: string, baseUrl: string): string | null {
  let found: string | null = null;
  const parser = new Parser({
    onopentag(name, attributes) {
      if (found || name !== "link") return;
      const rel = (attributes.rel ?? "").toLowerCase().split(/\s+/);
      if (!rel.includes("icon") && !rel.includes("apple-touch-icon")) return;
      const href = attributes.href?.trim();
      if (!href) return;
      found = DATA_ICON.test(href) ? href : normalizeUrl(href, baseUrl);
    },
  });
  parser.write(html);
  parser.end();
  return found;
}

/** The start page: timing, size, headers, and its HTML for the icon check. */
export async function probeStartPage(
  startUrl: string,
  context: ProbeContext,
): Promise<{ facts: StartPageFacts; html: string | null }> {
  const started = Date.now();
  const result = await probeFetch(startUrl, context);
  if (!result) {
    return {
      facts: {
        finalUrl: null,
        status: null,
        redirectHops: null,
        ttfbMs: null,
        totalMs: null,
        htmlBytes: null,
        ...EMPTY_HEADER_FACTS,
      },
      html: null,
    };
  }
  let html: string | null = null;
  let htmlBytes: number | null = null;
  try {
    const body = await readBodyPrefix(result.response, MAX_START_HTML_BYTES);
    htmlBytes = body.bytes.byteLength;
    html = decodeUtf8(body.bytes);
  } catch {
    // Headers arrived and the body did not; size stays unknown.
  }
  return {
    facts: {
      finalUrl: result.finalUrl,
      status: result.response.status,
      redirectHops: result.hops,
      ttfbMs: result.ttfbMs,
      totalMs: htmlBytes === null ? null : Date.now() - started,
      htmlBytes,
      ...readHeaderFacts(result.response),
    },
    html,
  };
}

/**
 * Where http://host/ ends up. "Does not redirect" is only said when http://
 * gave a real answer of its own (a 2xx page or a 404); a 403, 429 or 5xx is
 * a server or firewall refusing the probe, which says nothing about whether
 * a browser would be sent to https.
 */
export async function probeHttpsRedirect(
  host: string,
  context: ProbeContext,
): Promise<HttpsRedirectFacts> {
  const result = await probeFetch(`http://${host}/`, context);
  if (!result) {
    return { status: null, finalUrl: null, hops: null, redirectsToHttps: null };
  }
  await result.response.body?.cancel();
  const end = result.unfollowedLocation ?? result.finalUrl;
  const finalStatus = result.response.status;
  const answeredInPlace =
    result.unfollowedLocation === null &&
    ((finalStatus >= 200 && finalStatus < 300) || finalStatus === 404);
  return {
    status: result.firstStatus,
    finalUrl: end,
    hops: result.hops + (result.unfollowedLocation ? 1 : 0),
    redirectsToHttps: end.startsWith("https://")
      ? true
      : answeredInPlace
        ? false
        : null,
  };
}

/** Whether the www/apex sibling of the audited host redirects onto it. */
export async function probeHostVariant(
  origin: string,
  context: ProbeContext,
): Promise<HostVariantFacts> {
  const url = new URL(origin);
  const canonicalHost = url.hostname.toLowerCase();
  const alternateHost = canonicalHost.startsWith("www.")
    ? canonicalHost.slice(4)
    : `www.${canonicalHost}`;
  const result = await probeFetch(
    `${url.protocol}//${alternateHost}/`,
    context,
    { followRedirects: false },
  );
  if (!result) {
    return {
      canonicalHost,
      alternateHost,
      alternateStatus: null,
      alternateRedirectsToCanonical: null,
    };
  }
  await result.response.body?.cancel();
  const target = result.firstLocation
    ? normalizeUrl(result.firstLocation, `${url.protocol}//${alternateHost}/`)
    : null;
  return {
    canonicalHost,
    alternateHost,
    alternateStatus: result.firstStatus,
    alternateRedirectsToCanonical:
      result.firstStatus >= 300 &&
      result.firstStatus < 400 &&
      target !== null &&
      new URL(target).hostname === canonicalHost,
  };
}

/** A path no site has, to see what a missing page really answers. */
function notFoundProbeUrl(origin: string, token: string): string {
  return `${origin}/seotracker-404-check-${token}`;
}

/** A missing URL that lands on "/" was sent home rather than told "not found". */
export function classifyNotFound(input: {
  probeUrl: string;
  finalUrl: string;
  hops: number;
}): { redirectedHome: boolean } {
  return {
    redirectedHome: input.hops > 0 && new URL(input.finalUrl).pathname === "/",
  };
}

export async function probeNotFound(
  origin: string,
  token: string,
  context: ProbeContext,
): Promise<NotFoundFacts> {
  const probeUrl = notFoundProbeUrl(origin, token);
  const result = await probeFetch(probeUrl, context);
  if (!result) {
    return { probeUrl, status: null, redirectedHome: null, bodyBytes: null };
  }
  let bodyBytes: number | null = null;
  try {
    bodyBytes = (await readBodyPrefix(result.response, MAX_START_HTML_BYTES))
      .bytes.byteLength;
  } catch {
    // Size is decoration; the status is the fact.
  }
  return {
    probeUrl,
    status: result.response.status,
    redirectedHome: classifyNotFound({ probeUrl, ...result }).redirectedHome,
    bodyBytes,
  };
}

const isHtml = (response: Response) =>
  (response.headers.get("content-type") ?? "").toLowerCase().includes("html");

/**
 * What one answer says about a file: there (a 200 that is not an HTML page),
 * not there (404/410, or a 200 HTML catch-all page), or unknown. A 401, 403,
 * 429, 5xx or a redirect off the site is the server declining to say, and is
 * never read as "missing".
 */
function fileFound(response: Response, followedOff: boolean): boolean | null {
  if (followedOff) return null;
  if (response.ok) return !isHtml(response);
  if (response.status === 404 || response.status === 410) return false;
  return null;
}

/**
 * Status of the declared icon, or of /favicon.ico when none is declared. An
 * icon on another host (a CDN) is not fetched and stays unknown; an inline
 * `data:` icon is found as declared.
 */
export async function probeFavicon(
  origin: string,
  html: string | null,
  baseUrl: string,
  context: ProbeContext,
): Promise<FaviconFacts> {
  const declared = html === null ? null : findDeclaredIcon(html, baseUrl);
  if (declared && DATA_ICON.test(declared)) {
    return {
      declared: true,
      // The media type, not the payload.
      url: declared.slice(0, Math.min(80, declared.indexOf(",") + 1 || 40)),
      status: null,
      found: true,
    };
  }
  const url = declared ?? `${origin}/favicon.ico`;
  const result = await probeFetch(url, context);
  await result?.response.body?.cancel();
  return {
    declared: html === null ? null : declared !== null,
    url,
    status: result?.response.status ?? null,
    // A 200 HTML page at /favicon.ico is the site's catch-all, not an icon.
    found: result
      ? fileFound(result.response, result.unfollowedLocation !== null)
      : null,
  };
}

/**
 * Found at any of `urls`, missing only when every one of them answered
 * "not here"; one that could not be read leaves the answer unknown.
 */
export async function probeWellKnownFile(
  urls: string[],
  context: ProbeContext,
): Promise<WellKnownFile> {
  let lastStatus: number | null = null;
  let allMissing = true;
  for (const url of urls) {
    const result = await probeFetch(url, context);
    if (!result) {
      allMissing = false;
      continue;
    }
    lastStatus = result.response.status;
    const found = fileFound(
      result.response,
      result.unfollowedLocation !== null,
    );
    await result.response.body?.cancel();
    if (found) return { status: lastStatus, found: true };
    if (found === null) allMissing = false;
  }
  return { status: lastStatus, found: allMissing ? false : null };
}
