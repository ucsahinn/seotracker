/**
 * Fetches to the audited site itself, for the site-level probes.
 *
 * The same policy discovery follows: every hop passes `isCrawlableUrl`, stays
 * on the audited host or its www/apex sibling, and a host other than the
 * already-validated origin host passes `assertPublicHostname` before it is
 * contacted. Unlike discovery, both schemes are allowed, because the probes
 * ask exactly how http:// and the sibling host answer. Third-party lookups
 * (DNS, RDAP, CT) do not come through here.
 */
import { assertPublicHostname, isCrawlableUrl } from "../url-policy";
import { normalizeUrl } from "../url-utils";

const PROBE_TIMEOUT_MS = 8_000;
const PROBE_USER_AGENT = "seotracker-audit/1.0";
const MAX_PROBE_HOPS = 5;
/*
 * Asked for explicitly. workerd's fetch does not ask for compression itself,
 * so without this every server answered uncompressed and the no-compression
 * check fired on github.com and wikipedia.org alike (measured under wrangler
 * dev, 2026-10-26). With it, Content-Encoding survives on the response and
 * the body still arrives decoded.
 */
const PROBE_ACCEPT_ENCODING = "gzip, br";

export type ProbeContext = {
  /** The audited origin's own hostname, already validated at audit start. */
  originHost: string;
  /** Other hostnames that already passed the public-address check. */
  checkedHosts: Set<string>;
};

type ProbeResponse = {
  /** The first answer in the chain. */
  firstStatus: number;
  firstLocation: string | null;
  /** The answer the chain ended on (a non-redirect, or the last hop). */
  response: Response;
  finalUrl: string;
  /** Set when the chain ended on a redirect this probe would not follow. */
  unfollowedLocation: string | null;
  hops: number;
  /** ms until the final response's headers arrived, from its own request. */
  ttfbMs: number;
};

function siblingHosts(host: string): string[] {
  return host.startsWith("www.")
    ? [host, host.slice(4)]
    : [host, `www.${host}`];
}

async function hostAllowed(url: string, context: ProbeContext) {
  if (!isCrawlableUrl(url)) return false;
  const host = new URL(url).hostname.toLowerCase();
  if (!siblingHosts(context.originHost).includes(host)) return false;
  if (host === context.originHost || context.checkedHosts.has(host)) {
    return true;
  }
  try {
    await assertPublicHostname(host);
  } catch {
    return false;
  }
  context.checkedHosts.add(host);
  return true;
}

/**
 * GET with redirects followed by hand. Null when the first URL is outside
 * the policy or the request never completed; a chain that later leaves the
 * policy ends on the redirect that pointed outside it.
 */
export async function probeFetch(
  url: string,
  context: ProbeContext,
  options: { followRedirects?: boolean } = {},
): Promise<ProbeResponse | null> {
  const follow = options.followRedirects ?? true;
  let current = url;
  let first: { status: number; location: string | null } | null = null;
  try {
    for (let hop = 0; ; hop++) {
      if (!(await hostAllowed(current, context))) {
        return null;
      }
      const started = Date.now();
      const response = await fetch(current, {
        headers: {
          "User-Agent": PROBE_USER_AGENT,
          Accept: "text/html,*/*",
          "Accept-Encoding": PROBE_ACCEPT_ENCODING,
        },
        redirect: "manual",
        signal: AbortSignal.timeout(PROBE_TIMEOUT_MS),
      });
      const ttfbMs = Date.now() - started;
      const location = response.headers.get("location");
      first ??= { status: response.status, location };
      const isRedirect = response.status >= 300 && response.status < 400;
      const next =
        isRedirect && location ? normalizeUrl(location, current) : null;
      const canFollow =
        follow &&
        next !== null &&
        hop < MAX_PROBE_HOPS &&
        (await hostAllowed(next, context));
      if (!canFollow) {
        return {
          firstStatus: first.status,
          firstLocation: first.location,
          response,
          finalUrl: current,
          unfollowedLocation: isRedirect ? next : null,
          hops: hop,
          ttfbMs,
        };
      }
      await response.body?.cancel();
      current = next;
    }
  } catch {
    return null;
  }
}
