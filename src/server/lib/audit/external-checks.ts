/**
 * The opt-in requests after the crawl: does an outgoing link still lead
 * somewhere, and how many bytes is one of the site's own images.
 *
 * Accuracy over coverage. A link is "broken" only on an answer that means
 * it: 404 or 410 (confirmed with a GET when HEAD said so), a 500/502/504
 * confirmed the same way, or a host name public DNS says does not exist.
 * Everything else -- a refusal (401, 403, 429, 999), a bot wall, a
 * timeout, a host this tool will not contact -- is "unknown" and never a
 * finding. Social networks and other hosts that turn bots away are not
 * asked at all.
 *
 * SSRF: every hop must be http(s), carry no credentials, and resolve to a
 * public address (`assertPublicHostname`) before it is contacted.
 */
import { readBodyPrefix } from "./discovery-body";
import { hostNameExists } from "./site-probes/dns";
import { assertPublicHostname, isCrawlableUrl } from "./url-policy";
import { normalizeUrl } from "./url-utils";

const REQUEST_TIMEOUT_MS = 8_000;
const MAX_HOPS = 5;
const USER_AGENT = "seotracker-audit/1.0";
/** Read this much of an image without a Content-Length before giving up. */
const IMAGE_READ_CAP_BYTES = 600 * 1024;

/*
 * Hosts that answer bots with a login wall, a 999, a 403 or a 429 whatever
 * the link: asking them proves nothing either way.
 */
const SKIPPED_HOSTS = [
  "facebook.com",
  "fb.com",
  "fb.me",
  "instagram.com",
  "linkedin.com",
  "lnkd.in",
  "twitter.com",
  "x.com",
  "t.co",
  "tiktok.com",
  "pinterest.com",
  "reddit.com",
  "threads.net",
  "wa.me",
  "whatsapp.com",
  "t.me",
  "telegram.me",
  "discord.gg",
  "discord.com",
  "snapchat.com",
  "quora.com",
  "medium.com",
  "amazon.com",
  "web.archive.org",
];

const BROKEN_STATUSES = new Set([404, 410]);
const BROKEN_SERVER_STATUSES = new Set([500, 502, 504]);

export type LinkVerdict = {
  url: string;
  state: "ok" | "broken" | "unknown";
  /** The final HTTP status, when one came back. */
  status: number | null;
  /** Why it is broken: an HTTP answer, or a name DNS does not know. */
  reason: "http" | "dns" | null;
};

export type ImageMeasure = {
  url: string;
  /** Bytes of the file; null when it could not be measured. */
  bytes: number | null;
  /** True when the body passed the read cap, so `bytes` is a floor. */
  atLeast: boolean;
};

function isSkippedHost(hostname: string): boolean {
  const host = hostname.toLowerCase().replace(/^www\./, "");
  return SKIPPED_HOSTS.some(
    (skipped) =>
      host === skipped ||
      host.endsWith(`.${skipped}`) ||
      // amazon.de, amazon.com.tr and the like.
      (skipped === "amazon.com" && /^amazon\.[a-z.]+$/.test(host)),
  );
}

/** Hosts that passed the public-address check in this run. */
export type HostCache = Map<string, Promise<boolean>>;

function publicHost(host: string, cache: HostCache): Promise<boolean> {
  let entry = cache.get(host);
  if (!entry) {
    entry = assertPublicHostname(host).then(
      () => true,
      () => false,
    );
    cache.set(host, entry);
  }
  return entry;
}

/**
 * One request with redirects followed by hand, each hop checked. Null when
 * the chain could not be completed (refused hop, network failure, timeout).
 */
async function request(
  url: string,
  method: "HEAD" | "GET",
  cache: HostCache,
): Promise<Response | null> {
  let current = url;
  try {
    for (let hop = 0; hop <= MAX_HOPS; hop++) {
      if (!isCrawlableUrl(current)) return null;
      if (!(await publicHost(new URL(current).hostname, cache))) return null;
      const response = await fetch(current, {
        method,
        headers: { "User-Agent": USER_AGENT, Accept: "*/*" },
        redirect: "manual",
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      });
      const location = response.headers.get("location");
      const next =
        response.status >= 300 && response.status < 400 && location
          ? normalizeUrl(location, current)
          : null;
      if (!next) return response;
      await response.body?.cancel();
      current = next;
    }
    return null;
  } catch {
    return null;
  }
}

function verdictOf(response: Response): LinkVerdict["state"] {
  if (response.headers.get("cf-mitigated")) return "unknown";
  if (response.status >= 200 && response.status < 400) return "ok";
  if (
    BROKEN_STATUSES.has(response.status) ||
    BROKEN_SERVER_STATUSES.has(response.status)
  ) {
    return "broken";
  }
  return "unknown";
}

export async function checkExternalLink(
  url: string,
  cache: HostCache,
): Promise<LinkVerdict> {
  const unknown: LinkVerdict = {
    url,
    state: "unknown",
    status: null,
    reason: null,
  };
  if (!isCrawlableUrl(url)) return unknown;
  const host = new URL(url).hostname;
  if (isSkippedHost(host)) return unknown;
  if ((await hostNameExists(host)) === false) {
    return { url, state: "broken", status: null, reason: "dns" };
  }

  const head = await request(url, "HEAD", cache);
  await head?.body?.cancel();
  if (head && verdictOf(head) === "ok") {
    return { url, state: "ok", status: head.status, reason: null };
  }
  // HEAD is often refused or answered wrongly: GET decides.
  const get = await request(url, "GET", cache);
  await get?.body?.cancel();
  if (!get) return unknown;
  const state = verdictOf(get);
  return {
    url,
    state,
    status: get.status,
    reason: state === "broken" ? "http" : null,
  };
}

function contentLength(response: Response): number | null {
  const raw = response.headers.get("content-length");
  if (!raw || !/^\d+$/.test(raw.trim())) return null;
  return Number(raw);
}

export async function measureImage(
  url: string,
  cache: HostCache,
): Promise<ImageMeasure> {
  const unknown: ImageMeasure = { url, bytes: null, atLeast: false };
  const head = await request(url, "HEAD", cache);
  await head?.body?.cancel();
  if (head?.ok) {
    const length = contentLength(head);
    if (length !== null && length > 0) {
      return { url, bytes: length, atLeast: false };
    }
  }
  // No usable length on HEAD: read the body, up to a cap.
  const get = await request(url, "GET", cache);
  if (!get?.ok) {
    await get?.body?.cancel();
    return unknown;
  }
  const length = contentLength(get);
  if (length !== null && length > 0) {
    await get.body?.cancel();
    return { url, bytes: length, atLeast: false };
  }
  const body = await readBodyPrefix(get, IMAGE_READ_CAP_BYTES);
  return {
    url,
    bytes: body.bytes.byteLength,
    atLeast: body.truncated,
  };
}

/** Run `task` over `items`, `limit` at a time, keeping the input order. */
export async function mapWithConcurrency<T, R>(
  items: T[],
  limit: number,
  task: (item: T) => Promise<R>,
): Promise<R[]> {
  const results: R[] = [];
  for (let i = 0; i < items.length; i += limit) {
    results.push(...(await Promise.all(items.slice(i, i + limit).map(task))));
  }
  return results;
}
