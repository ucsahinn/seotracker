/**
 * Domain registration and expiry through RDAP, the registries' JSON
 * successor to WHOIS. rdap.org redirects to the registry that holds the
 * domain. Many country-code registries (.tr among them) publish no RDAP;
 * that is "unknown", never a finding.
 */
import { parse } from "tldts";
import { z } from "zod";
import { fetchPublicJson } from "./third-party-fetch";
import type { DomainFacts } from "./types";

const RDAP_ENDPOINT = "https://rdap.org/domain/";
const RDAP_TIMEOUT_MS = 8_000;
/** An RDAP domain record is a few kilobytes; anything near this is not one. */
const MAX_RDAP_BYTES = 1024 * 1024;

const rdapSchema = z
  .object({
    ldhName: z.string().optional(),
    events: z
      .array(
        z.object({ eventAction: z.string(), eventDate: z.string() }).loose(),
      )
      .optional(),
    entities: z
      .array(
        z
          .object({
            roles: z.array(z.string()).optional(),
            vcardArray: z.tuple([z.string(), z.array(z.unknown())]).optional(),
          })
          .loose(),
      )
      .optional(),
  })
  .loose();

/**
 * The domain whose registration matters: `www.shop.example.co.uk` ->
 * `example.co.uk`. Private suffixes count as suffixes, so a site on
 * `mysite.pages.dev` is `mysite.pages.dev`, never Cloudflare's `pages.dev`.
 */
export function registrableDomain(host: string): string | null {
  return parse(host, { allowPrivateDomains: true }).domain ?? null;
}

/**
 * A host under a platform's shared suffix (`*.pages.dev`, `*.vercel.app`,
 * `*.github.io`, `*.netlify.app`). Its owner registers nothing and controls
 * no mail records, so registration and SPF/DMARC are not questions about it.
 */
export function isPlatformHost(host: string): boolean {
  return parse(host, { allowPrivateDomains: true }).isPrivate === true;
}

function validIso(value: string | undefined): string | null {
  if (!value) return null;
  const time = Date.parse(value);
  return Number.isNaN(time) ? null : new Date(time).toISOString();
}

/** The registrar's display name from its jCard (`["fn", {}, "text", name]`). */
function registrarName(
  entities: z.infer<typeof rdapSchema>["entities"],
): string | null {
  const registrar = entities?.find((entity) =>
    entity.roles?.includes("registrar"),
  );
  const properties = registrar?.vcardArray?.[1] ?? [];
  for (const property of properties) {
    if (
      Array.isArray(property) &&
      property[0] === "fn" &&
      typeof property[3] === "string" &&
      property[3].trim()
    ) {
      return property[3].trim().slice(0, 200);
    }
  }
  return null;
}

export function parseRdap(body: unknown, domain: string): DomainFacts {
  const parsed = rdapSchema.safeParse(body);
  if (!parsed.success) return unknownDomain(domain);
  const eventDate = (action: string) =>
    validIso(
      parsed.data.events?.find((event) => event.eventAction === action)
        ?.eventDate,
    );
  return {
    domain,
    registeredAt: eventDate("registration"),
    expiresAt: eventDate("expiration"),
    registrar: registrarName(parsed.data.entities),
  };
}

export function unknownDomain(domain: string | null): DomainFacts {
  return { domain, registeredAt: null, expiresAt: null, registrar: null };
}

export async function lookupDomain(domain: string): Promise<DomainFacts> {
  const body = await fetchPublicJson(
    `${RDAP_ENDPOINT}${encodeURIComponent(domain)}`,
    {
      accept: "application/rdap+json, application/json",
      maxBytes: MAX_RDAP_BYTES,
      timeoutMs: RDAP_TIMEOUT_MS,
    },
  );
  return body === null ? unknownDomain(domain) : parseRdap(body, domain);
}
