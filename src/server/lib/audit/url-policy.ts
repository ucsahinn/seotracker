import { AppError } from "@/server/lib/errors";

const BLOCKED_HOSTS = new Set([
  "localhost",
  "metadata.google.internal",
  "metadata",
  "169.254.169.254",
  "100.100.100.200",
]);

const BLOCKED_HOST_SUFFIXES = [
  ".localhost",
  ".local",
  ".localdomain",
  ".internal",
  ".home.arpa",
  // Conventional private-network suffixes. None is a public TLD, so a site
  // named this way can only resolve through the container's own resolver.
  ".lan",
  ".corp",
  ".intranet",
  ".private",
  ".home",
];

const DOH_ENDPOINT = "https://cloudflare-dns.com/dns-query";

function normalizeHost(hostname: string): string {
  let host = hostname.toLowerCase().trim();
  if (host.startsWith("[") && host.endsWith("]")) {
    host = host.slice(1, -1);
  }
  if (host.includes("%")) {
    host = host.split("%", 1)[0];
  }
  if (host.endsWith(".")) {
    host = host.slice(0, -1);
  }
  return host;
}

function isPrivateIpv4(host: string): boolean {
  const parts = normalizeHost(host)
    .split(".")
    .map((x) => Number(x));
  if (
    parts.length !== 4 ||
    parts.some((x) => !Number.isInteger(x) || x < 0 || x > 255)
  ) {
    return false;
  }

  const [a, b, c] = parts;
  if (a === 10) return true;
  if (a === 127) return true;
  if (a === 0) return true;
  if (a === 169 && b === 254) return true;
  if (a === 172 && b >= 16 && b <= 31) return true;
  if (a === 192 && b === 168) return true;
  // IETF protocol assignments, 192.0.0.0/24.
  if (a === 192 && b === 0 && c === 0) return true;
  if (a === 100 && b >= 64 && b <= 127) return true;
  if (a === 198 && (b === 18 || b === 19)) return true;
  if (a >= 224) return true;
  return false;
}

const toGroups = (part: string) => (part === "" ? [] : part.split(":"));

/** The 16 bytes of an IPv6 literal, or null when it does not parse. */
function parseIpv6Bytes(host: string): number[] | null {
  let value = normalizeHost(host);

  // A dotted IPv4 tail (`::ffff:127.0.0.1`) stands for the last two groups.
  const tail = /(\d+)\.(\d+)\.(\d+)\.(\d+)$/.exec(value);
  if (tail) {
    const octets = tail.slice(1).map(Number);
    if (octets.some((octet) => octet > 255)) return null;
    const high = ((octets[0] << 8) | octets[1]).toString(16);
    const low = ((octets[2] << 8) | octets[3]).toString(16);
    value = `${value.slice(0, tail.index)}${high}:${low}`;
  }

  const halves = value.split("::");
  if (halves.length > 2) return null;
  const head = toGroups(halves[0]);
  const rest = halves.length === 2 ? toGroups(halves[1]) : [];
  if (halves.length === 1 && head.length !== 8) return null;
  if (halves.length === 2 && head.length + rest.length > 7) return null;

  const groups = [
    ...head,
    ...Array<string>(8 - head.length - rest.length).fill("0"),
    ...rest,
  ];
  const bytes: number[] = [];
  for (const group of groups) {
    if (!/^[0-9a-f]{1,4}$/.test(group)) return null;
    const word = Number.parseInt(group, 16);
    bytes.push(word >> 8, word & 0xff);
  }
  return bytes;
}

function isPrivateIpv6(host: string): boolean {
  const bytes = parseIpv6Bytes(host);
  // Not parseable means not provably public.
  if (!bytes) return true;

  const embeddedIpv4 = (at: number) => bytes.slice(at, at + 4).join(".");
  const zeros = (from: number, to: number) =>
    bytes.slice(from, to).every((byte) => byte === 0);

  // fc00::/7 unique local, ff00::/8 multicast.
  if ((bytes[0] & 0xfe) === 0xfc || bytes[0] === 0xff) return true;
  // fe80::/10 link-local and the deprecated fec0::/10 site-local.
  if (bytes[0] === 0xfe && (bytes[1] & 0x80) === 0x80) return true;

  // ::/96 IPv4-compatible (covers ::, ::1 and ::7f00:1 alike).
  if (zeros(0, 12)) return true;
  // ::ffff:0:0/96 IPv4-mapped.
  if (zeros(0, 10) && bytes[10] === 0xff && bytes[11] === 0xff) {
    return isPrivateIpv4(embeddedIpv4(12));
  }
  // 64:ff9b::/96 NAT64, plus 64:ff9b:1::/48 which is local-use only.
  if (
    bytes[0] === 0x00 &&
    bytes[1] === 0x64 &&
    bytes[2] === 0xff &&
    bytes[3] === 0x9b
  ) {
    if (zeros(4, 12)) return isPrivateIpv4(embeddedIpv4(12));
    if (bytes[4] === 0x00 && bytes[5] === 0x01) return true;
  }
  // 2002::/16 6to4 carries the IPv4 address in bytes 2-5.
  if (bytes[0] === 0x20 && bytes[1] === 0x02) {
    return isPrivateIpv4(embeddedIpv4(2));
  }

  return false;
}

function isIpLiteral(host: string): boolean {
  const normalized = normalizeHost(host);
  return /^\d+\.\d+\.\d+\.\d+$/.test(normalized) || normalized.includes(":");
}

function isBlockedHost(hostname: string): boolean {
  const host = normalizeHost(hostname);
  if (!host) return true;
  if (BLOCKED_HOSTS.has(host)) return true;
  if (BLOCKED_HOST_SUFFIXES.some((suffix) => host.endsWith(suffix))) {
    return true;
  }

  if (isIpLiteral(host)) {
    return host.includes(":") ? isPrivateIpv6(host) : isPrivateIpv4(host);
  }

  /*
   * A single-label host - `nas`, `printer`, `router` - matches no blocked
   * suffix and is not an IP literal, so it used to reach the DNS check and,
   * whenever that check could not run, the crawler. It can only resolve
   * through the container's own resolver or its hosts file; no site on the
   * public internet is named this way. Rejecting it here costs nothing and
   * holds even when the resolver is unreachable.
   */
  if (!host.includes(".")) return true;

  return false;
}

type DnsJsonAnswer = {
  type?: number;
  data?: string;
};

type DnsJsonResponse = {
  Status?: number;
  Answer?: DnsJsonAnswer[];
};

async function resolveAddressRecords(
  hostname: string,
  type: "A" | "AAAA",
): Promise<string[]> {
  const response = await fetch(
    `${DOH_ENDPOINT}?name=${encodeURIComponent(hostname)}&type=${type}`,
    {
      headers: { Accept: "application/dns-json" },
      signal: AbortSignal.timeout(2_500),
    },
  );

  // Not "no records" - the resolver did not answer. Distinguished so the
  // caller can fail closed rather than read a 503 as an all-clear.
  if (!response.ok) {
    throw new Error(`DoH lookup failed with ${response.status}`);
  }

  const body: DnsJsonResponse = await response.json();
  if (body.Status !== 0 || !Array.isArray(body.Answer)) return [];

  const expectedType = type === "A" ? 1 : 28;
  return body.Answer.filter(
    (answer): answer is Required<Pick<DnsJsonAnswer, "data" | "type">> =>
      answer.type === expectedType && typeof answer.data === "string",
  ).map((answer) => normalizeHost(answer.data));
}

/**
 * Whether the name points somewhere private.
 *
 * Throws rather than returning `false` when the lookup itself fails. The
 * check exists to stop the crawler reaching the operator's own network, and
 * a control that silently switches itself off the moment it cannot run is
 * worse than one that says so: an install that cannot reach
 * `cloudflare-dns.com` - egress-filtered, air-gapped, a corporate proxy -
 * used to let every hostname through. Refusing is also honest about what it
 * knows, and the message says which part failed.
 *
 * An answered lookup with no records is blocked too (see below): a name the
 * public resolver cannot place might still resolve inside the container.
 */
async function hostnameResolvesToBlockedAddress(
  hostname: string,
): Promise<boolean> {
  const host = normalizeHost(hostname);
  if (!host || isIpLiteral(host)) return false;

  let addresses: string[];
  try {
    const [v4, v6] = await Promise.all([
      resolveAddressRecords(host, "A"),
      resolveAddressRecords(host, "AAAA"),
    ]);
    addresses = [...v4, ...v6];
  } catch (error) {
    throw new AppError(
      "CRAWL_TARGET_BLOCKED",
      "Adresin nereye çözümlendiği doğrulanamadı, bu yüzden tarama başlatılmadı. Konteynerin cloudflare-dns.com adresine erişebildiğinden emin olun.",
      { reason: error instanceof Error ? error.message : "dns_lookup_failed" },
    );
  }

  /*
   * No A or AAAA answer (NXDOMAIN, or a name with no address records) is
   * treated as blocked. Cloudflare's resolver cannot see the container's own
   * DNS, so a name it does not know may still resolve internally - a
   * `router.example` served by split-horizon DNS or the hosts file - and an
   * audited site could redirect the crawler there. A name no public resolver
   * can place is not a site this tool can audit anyway.
   */
  if (addresses.length === 0) {
    throw new AppError(
      "CRAWL_TARGET_BLOCKED",
      "Adres herkese açık DNS'te çözümlenmiyor, bu yüzden tarama başlatılmadı.",
      { reason: "dns_no_public_records" },
    );
  }

  return addresses.some((address) =>
    address.includes(":") ? isPrivateIpv6(address) : isPrivateIpv4(address),
  );
}

/**
 * Synchronous SSRF check for URLs discovered mid-crawl (links, redirect
 * targets, sitemap entries). Blocks non-http(s) schemes, private/loopback IP
 * literals, and internal hostnames. DNS resolution is only performed for the
 * start URL (see normalizeAndValidateStartUrl); per-link DoH lookups would be
 * prohibitively slow.
 */
export function isCrawlableUrl(url: string): boolean {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return false;
  }
  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    return false;
  }
  // A link or redirect carrying `user:pass@` must not become a crawl target:
  // the credentials would be sent upstream and stored with the page.
  if (parsed.username || parsed.password) return false;
  return !isBlockedHost(parsed.hostname);
}

/**
 * The same hostname gate the start URL passes, for any further hostname the
 * crawl is about to contact (a www/apex sibling counts as its own host):
 * lexical blocklist first, then the public-DNS check. Throws
 * CRAWL_TARGET_BLOCKED when the host is blocked or cannot be verified.
 *
 * This is a pre-flight check, not connection-time enforcement: Workers
 * cannot pin the address a `fetch` connects to, so a resolver that answers
 * differently the second time (DNS rebinding) is not covered.
 */
export async function assertPublicHostname(hostname: string): Promise<void> {
  if (isBlockedHost(hostname)) {
    throw new AppError("CRAWL_TARGET_BLOCKED");
  }
  if (await hostnameResolvesToBlockedAddress(hostname)) {
    throw new AppError("CRAWL_TARGET_BLOCKED");
  }
}

/** Drops `user:pass@` from a stored URL before it is shown or exported. */
export function redactUrlUserinfo(url: string): string {
  try {
    const parsed = new URL(url);
    if (!parsed.username && !parsed.password) return url;
    parsed.username = "";
    parsed.password = "";
    return parsed.toString();
  } catch {
    return url;
  }
}

export async function normalizeAndValidateStartUrl(
  input: string,
): Promise<string> {
  let raw = input.trim();
  if (!raw) throw new AppError("VALIDATION_ERROR");

  if (!/^https?:\/\//i.test(raw)) {
    raw = `https://${raw}`;
  }

  let parsed: URL;
  try {
    parsed = new URL(raw);
  } catch {
    throw new AppError("VALIDATION_ERROR");
  }

  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    throw new AppError("VALIDATION_ERROR");
  }

  if (parsed.username || parsed.password) {
    throw new AppError(
      "VALIDATION_ERROR",
      "Kullanıcı adı veya parola içeren adresler taranamaz.",
    );
  }

  await assertPublicHostname(parsed.hostname);

  parsed.hash = "";
  return parsed.toString();
}

const START_URL_REDIRECT_HOPS = 5;
const START_URL_PROBE_TIMEOUT_MS = 10_000;

/**
 * Follow redirects on the audit's start URL so the audit anchors to the
 * site's real origin. Without this, auditing a domain that 301s elsewhere
 * (…net -> …com, apex -> www) dead-ends after one page: the redirect target
 * is a different origin, so the same-origin crawl policy can't follow it.
 *
 * Every hop re-runs the full start-URL validation (SSRF, blocked hosts), so
 * a redirect can't smuggle the audit somewhere the user couldn't have
 * pointed it directly. Probe failures (timeouts, HEAD rejected) fall back
 * to the last validated URL — the crawl records the real fetch result.
 */
export async function resolveStartUrlRedirects(
  startUrl: string,
): Promise<string> {
  let current = startUrl;
  for (let hop = 0; hop < START_URL_REDIRECT_HOPS; hop++) {
    let response: Response;
    try {
      response = await fetch(current, {
        method: "HEAD",
        redirect: "manual",
        headers: { "User-Agent": "seotracker-audit/1.0" },
        signal: AbortSignal.timeout(START_URL_PROBE_TIMEOUT_MS),
      });
    } catch {
      return current;
    }
    if (response.status < 300 || response.status >= 400) return current;
    const location = response.headers.get("location");
    if (!location) return current;

    let next: URL;
    try {
      next = new URL(location, current);
    } catch {
      return current;
    }
    current = await normalizeAndValidateStartUrl(next.toString());
  }
  return current;
}
