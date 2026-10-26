/**
 * The site's TLS certificate as public Certificate Transparency logs record
 * it (crt.sh). This is the newest unexpired certificate logged for the host,
 * which is almost always the one being served but is not read off the
 * connection itself, so the screen labels it "from public CT logs".
 *
 * crt.sh matches an identity exactly: `www.example.com` does not find a
 * `*.example.com` certificate, so a host on a subdomain is looked up under
 * both names. When either lookup fails the answer is unknown, because the
 * certificate that lookup would have found may be the newer one, and an
 * expiry warning read off the older one would be false.
 */
import { getDomain } from "tldts";
import { z } from "zod";
import { fetchPublicJson } from "./third-party-fetch";
import type { CertificateFacts } from "./types";

const CT_ENDPOINT = "https://crt.sh/";
const CT_TIMEOUT_MS = 8_000;
/** Busy hosts have thousands of entries; a truncated list is "unknown". */
const MAX_CT_BYTES = 3 * 1024 * 1024;

const ctEntrySchema = z
  .object({
    issuer_name: z.string(),
    name_value: z.string(),
    not_before: z.string(),
    not_after: z.string(),
  })
  .loose();

const NO_CERTIFICATE: CertificateFacts = {
  issuer: null,
  notBefore: null,
  notAfter: null,
};

/** crt.sh prints UTC timestamps without a zone. */
function utc(value: string): number {
  return Date.parse(/[zZ]|[+-]\d\d:?\d\d$/.test(value) ? value : `${value}Z`);
}

/** Exact name, or a wildcard one label up (`*.example.com` covers `www.example.com`). */
function certificateCoversHost(nameValue: string, host: string): boolean {
  const parent = host.split(".").slice(1).join(".");
  return nameValue
    .split(/\s+/)
    .map((name) => name.trim().toLowerCase())
    .some((name) => name === host || (parent && name === `*.${parent}`));
}

/** `C=US, O=Let's Encrypt, CN=R11` -> `Let's Encrypt`, falling back to CN. */
function issuerLabel(issuerName: string): string {
  const field = (key: string) =>
    new RegExp(`(?:^|,\\s*)${key}=("([^"]*)"|[^,]*)`).exec(issuerName);
  const organization = field("O");
  const common = field("CN");
  const value = organization ?? common;
  if (!value) return issuerName.slice(0, 200);
  return (value[2] ?? value[1]).trim().slice(0, 200);
}

/** The latest-expiring certificate for the host valid at `now`. */
export function newestCertificate(
  body: unknown,
  host: string,
  now: Date,
): CertificateFacts {
  const parsed = z.array(z.unknown()).safeParse(body);
  if (!parsed.success) return NO_CERTIFICATE;
  let best: z.infer<typeof ctEntrySchema> | null = null;
  for (const raw of parsed.data) {
    const entry = ctEntrySchema.safeParse(raw);
    if (!entry.success) continue;
    const notBefore = utc(entry.data.not_before);
    const notAfter = utc(entry.data.not_after);
    if (Number.isNaN(notBefore) || Number.isNaN(notAfter)) continue;
    // Not yet valid, or already expired: neither is the one being served.
    if (notBefore > now.getTime() || notAfter <= now.getTime()) continue;
    if (!certificateCoversHost(entry.data.name_value, host)) continue;
    if (!best || notAfter > utc(best.not_after)) best = entry.data;
  }
  if (!best) return NO_CERTIFICATE;
  return {
    issuer: issuerLabel(best.issuer_name),
    notBefore: new Date(utc(best.not_before)).toISOString(),
    notAfter: new Date(utc(best.not_after)).toISOString(),
  };
}

/** Identities to ask crt.sh for: the host, and the wildcard one label up. */
function ctIdentities(host: string): string[] {
  const parent = host.split(".").slice(1).join(".");
  // The apex is not covered by its own wildcard, and `*.com` is no identity.
  const onSubdomain = getDomain(host) !== host && parent.includes(".");
  return onSubdomain ? [host, `*.${parent}`] : [host];
}

export async function lookupCertificate(
  host: string,
  now: Date,
): Promise<CertificateFacts> {
  const bodies = await Promise.all(
    ctIdentities(host).map((identity) =>
      fetchPublicJson(
        `${CT_ENDPOINT}?q=${encodeURIComponent(identity)}&output=json&exclude=expired`,
        {
          accept: "application/json",
          maxBytes: MAX_CT_BYTES,
          timeoutMs: CT_TIMEOUT_MS,
        },
      ),
    ),
  );
  const entries: unknown[] = [];
  for (const body of bodies) {
    if (!Array.isArray(body)) return NO_CERTIFICATE;
    entries.push(...(body as unknown[]));
  }
  return newestCertificate(entries, host, now);
}
