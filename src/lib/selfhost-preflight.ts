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

// The OAuth client normally lives in the database, entered on the settings
// page, and this check cannot see the database — it runs before the app does.
// So it reports only on the environment path and on the instance key, and its
// quietest answer ("enter it in Settings") is also the expected one.
function checkOptionalFeatures(env: EnvRecord, items: PreflightItem[]): void {
  const clientId = get(env, "GOOGLE_CLIENT_ID");
  const clientSecret = get(env, "GOOGLE_CLIENT_SECRET");
  const betterAuthSecret = get(env, "BETTER_AUTH_SECRET");

  if (
    !betterAuthSecret ||
    betterAuthSecret.length < MIN_BETTER_AUTH_SECRET_LENGTH
  ) {
    items.push({
      key: "gsc",
      name: "Search Console",
      level: "warn",
      message: `Search Console and Analytics stay DISABLED: the instance key that encrypts their tokens is missing or shorter than ${MIN_BETTER_AUTH_SECRET_LENGTH} characters. In Docker the container generates one at startup, so seeing this means BETTER_AUTH_SECRET was set by hand to something too short.`,
    });
    return;
  }

  if (clientId && clientSecret) {
    items.push({
      key: "gsc",
      name: "Search Console",
      level: "ok",
      message:
        "OAuth client supplied by the environment. A client saved in Settings would take precedence.",
    });
    return;
  }

  if (clientId || clientSecret) {
    items.push({
      key: "gsc",
      name: "Search Console",
      level: "warn",
      message:
        "Only one of GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET is set — both are required, or leave both unset and enter the client in Settings.",
    });
    return;
  }

  items.push({
    key: "gsc",
    name: "Search Console",
    level: "info",
    message:
      "Enter your Google OAuth client in Settings to connect Search Console and Analytics. Setup: docs/SELF_HOSTING_GOOGLE_SEARCH_CONSOLE.md.",
  });
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

  /*
   * The dangerous deployment is a combination, and each half reported `ok` on
   * its own: `AUTH_MODE=local_noauth` is fine on loopback, and `ALLOWED_HOST`
   * is what the Docker guide tells you to set behind a reverse proxy. Set
   * together with no `MCP_TOKEN`, they publish every server function as the
   * admin user and all of `/mcp` unauthenticated, and the operator reads two
   * green lines and a start-up banner.
   *
   * A warning rather than a failure: putting your own auth in front of the
   * container is a legitimate way to run this, and the preflight cannot see
   * the proxy. It can see that nothing here is checking.
   */
  if (
    get(env, "AUTH_MODE") === "local_noauth" &&
    get(env, "ALLOWED_HOST") &&
    !get(env, "MCP_TOKEN")
  ) {
    items.push({
      key: "auth",
      name: "AUTH_MODE + ALLOWED_HOST",
      level: "warn",
      message:
        "Reachable off localhost with no authentication: every page, every server function and all MCP tools answer as the admin user. Put your own auth in front of the container, or set MCP_TOKEN and keep the port bound to 127.0.0.1.",
    });
  }

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
