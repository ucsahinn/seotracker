/** A configuration mismatch is not a verdict about Google permissions. */
export function gscPropertyMismatch(
  domain: string | null,
  property: string | null,
): boolean {
  if (!domain || !property) return false;
  try {
    const host = new URL(
      domain.includes("://") ? domain : "https://" + domain,
    ).hostname
      .toLowerCase()
      .replace(/^www\./, "");
    const isDomain = property.startsWith("sc-domain:");
    const raw = isDomain ? property.slice(10) : property;
    const target = new URL(
      raw.includes("://") ? raw : "https://" + raw,
    ).hostname
      .toLowerCase()
      .replace(/^www\./, "");
    return host !== target && !(isDomain && host.endsWith("." + target));
  } catch {
    return false;
  }
}
