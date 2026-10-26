/**
 * JSON from a third-party lookup service (rdap.org, crt.sh), fetched under
 * the same rules as the crawler's own requests.
 *
 * rdap.org answers with a redirect to whichever registry holds the domain,
 * so the target is not ours to pick: every hop must be https, carry no
 * credentials and resolve to a public address, and the body is read only up
 * to a cap, because a registry or log server is free to send anything.
 * Null means "could not read", which every caller treats as unknown.
 */
import { decodeUtf8, readBodyPrefix } from "../discovery-body";
import { assertPublicHostname } from "../url-policy";

const MAX_HOPS = 3;
/*
 * Sent explicitly: workerd's fetch sends no User-Agent of its own, and
 * rdap.org answers a request without one with 403, so every audit's domain
 * registration and expiry read as "unknown" (measured 2026-10-26: no UA ->
 * 403, any UA -> 302 to the registry).
 */
const LOOKUP_USER_AGENT = "seotracker-audit/1.0";

export async function fetchPublicJson(
  url: string,
  options: { accept: string; maxBytes: number; timeoutMs: number },
): Promise<unknown> {
  // One deadline for the whole chain, not one per hop.
  const signal = AbortSignal.timeout(options.timeoutMs);
  let current = url;
  try {
    for (let hop = 0; hop <= MAX_HOPS; hop++) {
      const parsed = new URL(current);
      if (parsed.protocol !== "https:" || parsed.username || parsed.password) {
        return null;
      }
      await assertPublicHostname(parsed.hostname);
      const response = await fetch(current, {
        headers: { Accept: options.accept, "User-Agent": LOOKUP_USER_AGENT },
        redirect: "manual",
        signal,
      });
      const location = response.headers.get("location");
      if (response.status >= 300 && response.status < 400 && location) {
        await response.body?.cancel();
        current = new URL(location, current).toString();
        continue;
      }
      if (!response.ok) {
        await response.body?.cancel();
        return null;
      }
      const body = await readBodyPrefix(response, options.maxBytes);
      if (body.truncated) return null;
      return JSON.parse(decodeUtf8(body.bytes)) as unknown;
    }
    return null;
  } catch {
    return null;
  }
}
