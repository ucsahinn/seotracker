/**
 * Client-side sanity check for a website field, so the form can complain before
 * a round trip. The server re-validates with a real public-suffix list
 * (`normalizeDomainInput`); this only catches obvious typos.
 */
export function normalizeDomainCandidate(
  value: string,
): { ok: true; domain: string } | { ok: false; message: string } {
  const trimmed = value.trim().toLowerCase();
  if (!trimmed) {
    return { ok: false, message: "Enter a website, like example.com." };
  }

  const withProtocol = /^[a-z][a-z\d+.-]*:\/\//.test(trimmed)
    ? trimmed
    : `https://${trimmed}`;

  let host: string;
  try {
    host = new URL(withProtocol).hostname.replace(/^www\./, "");
  } catch {
    return { ok: false, message: "That doesn't look like a website address." };
  }

  // At least one dot, labels of letters/digits/hyphens, and a 2+ letter TLD.
  if (!/^[a-z\d-]+(\.[a-z\d-]+)*\.[a-z]{2,}$/.test(host)) {
    return { ok: false, message: "Enter a valid domain like example.com." };
  }

  return { ok: true, domain: host };
}
