/**
 * Public DNS records of the audited domain through DNS-over-HTTPS JSON.
 *
 * A fixed third-party host, a short timeout, and no effect on the audit when
 * it fails: a failed lookup marks the result unresolved, and the absence
 * checks (no SPF, no DMARC) only run on a fully resolved result.
 */
import { z } from "zod";
import type { DnsFacts, DnsRecord, DnsRecordType } from "./types";

const DOH_ENDPOINT = "https://cloudflare-dns.com/dns-query";
const DOH_TIMEOUT_MS = 5_000;
const MAX_RECORDS_PER_TYPE = 10;
const MAX_VALUE_LENGTH = 300;

const RR_TYPE = { A: 1, AAAA: 28, NS: 2, MX: 15, TXT: 16, CAA: 257 } as const;
type QueryType = keyof typeof RR_TYPE;

const dohResponseSchema = z.object({
  Status: z.number(),
  Answer: z
    .array(z.object({ type: z.number(), data: z.string() }).loose())
    .optional(),
});

/**
 * The answers of one type, or null when the resolver did not give a usable
 * answer. NXDOMAIN (3) is a known "no records", not a failure.
 */
export function parseDohAnswer(
  body: unknown,
  type: QueryType,
): string[] | null {
  const parsed = dohResponseSchema.safeParse(body);
  if (!parsed.success) return null;
  if (parsed.data.Status === 3) return [];
  if (parsed.data.Status !== 0) return null;
  return (parsed.data.Answer ?? [])
    .filter((answer) => answer.type === RR_TYPE[type])
    .map((answer) => cleanRecordData(answer.data, type));
}

/** TXT arrives quoted and may be split into several quoted strings. */
function cleanRecordData(data: string, type: QueryType): string {
  if (type === "TXT") {
    const parts = data.match(/"((?:[^"\\]|\\.)*)"/g);
    if (parts) return parts.map((part) => part.slice(1, -1)).join("");
    return data;
  }
  if (type === "CAA") return decodeCaa(data);
  return data.replace(/\.$/, "");
}

/** Unknown RR types come back in RFC 3597 form: `\# <len> <hex bytes>`. */
function decodeCaa(data: string): string {
  const match = /^\\#\s+\d+\s+([0-9a-f\s]+)$/i.exec(data.trim());
  if (!match) return data;
  const bytes = (match[1].replace(/\s+/g, "").match(/../g) ?? []).map((hex) =>
    Number.parseInt(hex, 16),
  );
  if (bytes.length < 2) return data;
  const flags = bytes[0];
  const tagLength = bytes[1];
  const text = (from: number, to?: number) =>
    String.fromCharCode(...bytes.slice(from, to));
  const tag = text(2, 2 + tagLength);
  return `${flags} ${tag} "${text(2 + tagLength)}"`;
}

/*
 * A cut record says so. npr.org's SPF is 1,300 characters; shown cut at 300
 * with no mark, it read as the whole record and as one missing its `-all`.
 */
function capValue(value: string): string {
  return value.length > MAX_VALUE_LENGTH
    ? `${value.slice(0, MAX_VALUE_LENGTH - 1)}…`
    : value;
}

/** SPF and DMARC are TXT records recognised by their version tag. */
export function pickTaggedTxt(records: string[], tag: string): string[] {
  return records.filter((record) =>
    record.trim().toLowerCase().startsWith(tag),
  );
}

async function query(name: string, type: QueryType): Promise<string[] | null> {
  try {
    const response = await fetch(
      `${DOH_ENDPOINT}?name=${encodeURIComponent(name)}&type=${type}`,
      {
        headers: { Accept: "application/dns-json" },
        signal: AbortSignal.timeout(DOH_TIMEOUT_MS),
      },
    );
    if (!response.ok) return null;
    return parseDohAnswer(await response.json(), type);
  } catch {
    return null;
  }
}

/**
 * Address records for the audited host; name server, mail and policy records
 * for the registrable domain, which is where mail and CAA live.
 */
export async function lookupDns(
  host: string,
  domain: string,
): Promise<DnsFacts> {
  const [a, aaaa, ns, mx, caa, txt, dmarc] = await Promise.all([
    query(host, "A"),
    query(host, "AAAA"),
    query(domain, "NS"),
    query(domain, "MX"),
    query(domain, "CAA"),
    query(domain, "TXT"),
    query(`_dmarc.${domain}`, "TXT"),
  ]);
  const groups: [DnsRecordType, string[] | null][] = [
    ["A", a],
    ["AAAA", aaaa],
    ["NS", ns],
    ["MX", mx],
    ["CAA", caa],
    ["SPF", txt && pickTaggedTxt(txt, "v=spf1")],
    ["DMARC", dmarc && pickTaggedTxt(dmarc, "v=dmarc1")],
  ];
  const records: DnsRecord[] = groups.flatMap(([type, values]) =>
    (values ?? [])
      .slice(0, MAX_RECORDS_PER_TYPE)
      .map((value) => ({ type, value: capValue(value) })),
  );
  return {
    resolved: groups.every(([, values]) => values !== null),
    records,
  };
}

/**
 * Whether a host name exists in public DNS: false only on NXDOMAIN, the
 * resolver's definite "no such name". Null when it did not answer clearly
 * (timeout, SERVFAIL), which a caller must treat as unknown.
 */
export async function hostNameExists(host: string): Promise<boolean | null> {
  try {
    const response = await fetch(
      `${DOH_ENDPOINT}?name=${encodeURIComponent(host)}&type=A`,
      {
        headers: { Accept: "application/dns-json" },
        signal: AbortSignal.timeout(DOH_TIMEOUT_MS),
      },
    );
    if (!response.ok) return null;
    const parsed = dohResponseSchema.safeParse(await response.json());
    if (!parsed.success) return null;
    if (parsed.data.Status === 3) return false;
    return parsed.data.Status === 0 ? true : null;
  } catch {
    return null;
  }
}
