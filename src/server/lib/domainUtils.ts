import { getDomain, parse as parseTld } from "tldts";
import { AppError } from "@/server/lib/errors";

/**
 * True when `host` resolves to a real registrable domain per the public-suffix
 * list, rejecting IP literals, bare labels like "localhost" and invented TLDs
 * like "example.por" before they are ever saved.
 */
export function isValidDomainHost(host: string): boolean {
  const parsed = parseTld(host, { allowPrivateDomains: true });
  return (
    !parsed.isIp &&
    !!parsed.publicSuffix &&
    (parsed.isIcann === true || parsed.isPrivate === true)
  );
}

/**
 * Validates and canonicalizes a domain the user typed: lowercase bare host with
 * the protocol, any path and a leading `www.` stripped. With
 * `includeSubdomains` the full host is kept; otherwise it collapses to the
 * registrable domain, so `blog.acme.com` and `acme.com` are one project.
 */
export function normalizeDomainInput(
  input: string,
  includeSubdomains = false,
): string {
  const trimmed = input.trim().toLowerCase();
  if (!trimmed) {
    throw new AppError("VALIDATION_ERROR", "Domain is required");
  }

  const withProtocol = /^[a-zA-Z][a-zA-Z\d+.-]*:\/\//.test(trimmed)
    ? trimmed
    : `https://${trimmed}`;

  let host: string;
  try {
    host = new URL(withProtocol).hostname.toLowerCase().replace(/^www\./, "");
  } catch {
    throw new AppError("VALIDATION_ERROR", "Domain is invalid");
  }

  if (!host || !isValidDomainHost(host)) {
    throw new AppError(
      "VALIDATION_ERROR",
      "Enter a valid domain like example.com",
    );
  }

  if (includeSubdomains) {
    return host;
  }

  return getDomain(host) ?? host;
}
