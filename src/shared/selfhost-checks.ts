// Pure validators for self-host configuration values. Shared by the runtime
// (auth middleware, /api/health) and the Docker preflight script, so every
// surface applies the exact same rules and wording.

export const MIN_BETTER_AUTH_SECRET_LENGTH = 32;

type TeamDomainResult =
  | { ok: true; origin: string }
  | { ok: false; message: string };

export function validateTeamDomain(value: string): TeamDomainResult {
  const normalized = value.trim().replace(/\/+$/, "");

  try {
    const parsed = new URL(normalized);

    if (parsed.protocol !== "https:") {
      throw new Error("TEAM_DOMAIN must use https");
    }

    return { ok: true, origin: parsed.origin };
  } catch {
    return {
      ok: false,
      message:
        // Reaches the operator through AUTH_CONFIG_MISSING, so it is UI copy.
        // The throw above it is caught internally and stays English.
        "TEAM_DOMAIN, https://ekibiniz.cloudflareaccess.com gibi tam bir https adresi olmalı" +
        (normalized && !normalized.includes("://")
          ? ` — "${normalized}" değerinin başına https:// ekleyin`
          : ""),
    };
  }
}
