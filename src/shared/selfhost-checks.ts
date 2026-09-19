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
        "TEAM_DOMAIN must be a full https URL like https://your-team.cloudflareaccess.com" +
        (normalized && !normalized.includes("://")
          ? ` — add the https:// prefix to "${normalized}"`
          : ""),
    };
  }
}
