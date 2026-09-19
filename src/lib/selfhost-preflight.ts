import { AUTH_MODES } from "@/lib/auth-mode";
import {
  MIN_BETTER_AUTH_SECRET_LENGTH,
  validateTeamDomain,
} from "@/shared/selfhost-checks";

// Startup preflight for self-host containers: validate the environment BEFORE
// the multi-minute build/boot so misconfiguration fails in seconds with the
// exact fix, instead of surfacing minutes later as a generic in-app error.
// "fail" aborts startup; "warn" degrades a feature; "info" is orientation.

type PreflightLevel = "ok" | "info" | "warn" | "fail";

type PreflightItem = {
  // Stable identifier shared with /api/health's check map.
  key: "auth" | "gsc" | "pagespeed" | "runtime";
  name: string;
  level: PreflightLevel;
  message: string;
};

type PreflightResult = {
  items: PreflightItem[];
  failed: boolean;
};

type EnvRecord = Record<string, string | undefined>;

function get(env: EnvRecord, name: string): string | undefined {
  const value = env[name]?.trim();
  return value ? value : undefined;
}

function checkAuthMode(env: EnvRecord, items: PreflightItem[]): void {
  const rawMode = get(env, "AUTH_MODE");

  if (rawMode && !(AUTH_MODES as readonly string[]).includes(rawMode)) {
    items.push({
      key: "auth",
      name: "AUTH_MODE",
      level: "fail",
      message: `"${rawMode}" is not a valid AUTH_MODE. Valid values: ${AUTH_MODES.join(", ")}.`,
    });
    return;
  }

  const mode = rawMode ?? "cloudflare_access";

  if (mode === "local_noauth") {
    items.push({
      key: "auth",
      name: "AUTH_MODE",
      level: "ok",
      message:
        "local_noauth — no auth, single admin user. Do not expose publicly without your own auth in front.",
    });
    return;
  }

  // cloudflare_access (explicit or defaulted)
  const teamDomain = get(env, "TEAM_DOMAIN");
  const policyAud = get(env, "POLICY_AUD");
  const modeLabel = rawMode
    ? "cloudflare_access"
    : "cloudflare_access (default — AUTH_MODE is unset)";

  if (!teamDomain || !policyAud) {
    const missing = [
      teamDomain ? null : "TEAM_DOMAIN",
      policyAud ? null : "POLICY_AUD",
    ]
      .filter(Boolean)
      .join(" and ");
    items.push({
      key: "auth",
      name: "AUTH_MODE",
      level: "fail",
      message: `${modeLabel} requires ${missing} — or set AUTH_MODE=local_noauth for a private, no-auth deployment.`,
    });
    return;
  }

  const teamDomainResult = validateTeamDomain(teamDomain);
  if (!teamDomainResult.ok) {
    items.push({
      key: "auth",
      name: "TEAM_DOMAIN",
      level: "fail",
      message: teamDomainResult.message,
    });
    return;
  }

  items.push({
    key: "auth",
    name: "AUTH_MODE",
    level: "ok",
    message: modeLabel,
  });
}

function checkPageSpeed(env: EnvRecord, items: PreflightItem[]): void {
  // A PageSpeed key is an opaque string with no cheap shape to validate, so
  // this only reports presence — a false "looks wrong" would be worse than
  // saying nothing.
  items.push(
    get(env, "PAGESPEED_API_KEY")
      ? {
          key: "pagespeed",
          name: "PAGESPEED_API_KEY",
          level: "ok",
          message: "Set",
        }
      : {
          key: "pagespeed",
          name: "PAGESPEED_API_KEY",
          level: "warn",
          message:
            "Not set — the Lighthouse phase of a site audit falls back to Google's keyless quota and usually fails with 429. Crawling and every SEO check work without it. Free key: docs/PAGESPEED_API_KEY.md.",
        },
  );
}

function checkOptionalFeatures(env: EnvRecord, items: PreflightItem[]): void {
  const clientId = get(env, "GOOGLE_CLIENT_ID");
  const clientSecret = get(env, "GOOGLE_CLIENT_SECRET");
  const betterAuthSecret = get(env, "BETTER_AUTH_SECRET");

  if (clientId || clientSecret) {
    if (!clientId || !clientSecret) {
      items.push({
        key: "gsc",
        name: "Search Console",
        level: "warn",
        message:
          "Only one of GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET is set — both are required.",
      });
    } else if (
      !betterAuthSecret ||
      betterAuthSecret.length < MIN_BETTER_AUTH_SECRET_LENGTH
    ) {
      items.push({
        key: "gsc",
        name: "Search Console",
        level: "warn",
        message: `Google credentials are set, but Search Console stays DISABLED until BETTER_AUTH_SECRET is at least ${MIN_BETTER_AUTH_SECRET_LENGTH} characters (it encrypts stored OAuth tokens).`,
      });
    } else {
      items.push({
        key: "gsc",
        name: "Search Console",
        level: "ok",
        message: "Configured",
      });
    }
  } else {
    items.push({
      key: "gsc",
      name: "Search Console",
      level: "info",
      message:
        "Not configured (optional). See docs/SELF_HOSTING_GOOGLE_SEARCH_CONSOLE.md.",
    });
  }
}

// Shared per-feature checks: the Docker preflight prints these at boot and
// /api/health (setup-status.ts) serves the same results at runtime, so the
// two can never drift.
export function runSelfhostChecks(env: EnvRecord): PreflightItem[] {
  const items: PreflightItem[] = [];
  checkAuthMode(env, items);
  checkPageSpeed(env, items);
  checkOptionalFeatures(env, items);
  return items;
}

export function runSelfhostPreflight(env: EnvRecord): PreflightResult {
  const items = runSelfhostChecks(env);

  items.push(
    get(env, "ALLOWED_HOST")
      ? {
          key: "runtime",
          name: "ALLOWED_HOST",
          level: "ok",
          message: `Requests allowed for host ${get(env, "ALLOWED_HOST")}`,
        }
      : {
          key: "runtime",
          name: "ALLOWED_HOST",
          level: "info",
          message:
            'Not set — only localhost access will work. Behind a reverse proxy or tunnel, set ALLOWED_HOST=yourdomain.com or requests are blocked with Vite\'s "Blocked request" page.',
        },
  );

  return { items, failed: items.some((item) => item.level === "fail") };
}

const LEVEL_BADGES: Record<PreflightLevel, string> = {
  ok: "[ ok ]",
  info: "[info]",
  warn: "[warn]",
  fail: "[FAIL]",
};

export function formatPreflightReport(result: PreflightResult): string {
  const lines = result.items.map(
    (item) => `${LEVEL_BADGES[item.level]} ${item.name}: ${item.message}`,
  );

  lines.push(
    result.failed
      ? "\nPreflight failed — fix the [FAIL] items above and restart. Nothing was started."
      : "\nPreflight passed. The app now builds inside the container (~1-2 minutes on first start before it serves).",
  );

  return lines.join("\n");
}
