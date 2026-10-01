import { count } from "drizzle-orm";
import { version } from "../../../package.json";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { getAuthMode } from "@/lib/auth-mode";
import { runSelfhostChecks } from "@/lib/selfhost-preflight";
import { getGoogleOAuthClientSource } from "@/server/features/google/oauth-config";
import { getPageSpeedKeySource } from "@/server/features/lighthouse/pagespeed-config";
import { getOptionalEnvValue } from "@/server/lib/runtime-env";

// "error" blocks core functionality; "warn" degrades a feature.
type SetupCheck = {
  status: "ok" | "warn" | "error";
  detail?: string;
};

type SelfHostSetupStatus = {
  version: string;
  authMode: string;
  checks: Record<string, SetupCheck>;
};

// The same env vars the Docker preflight validates; /api/health re-runs the
// shared checks against runtime env so the two reports can never drift.
const CHECK_ENV_VARS = [
  "AUTH_MODE",
  "TEAM_DOMAIN",
  "POLICY_AUD",
  "GOOGLE_CLIENT_ID",
  "GOOGLE_CLIENT_SECRET",
  "BETTER_AUTH_SECRET",
  "PAGESPEED_API_KEY",
] as const;

const LEVEL_TO_STATUS = {
  ok: "ok",
  info: "ok",
  warn: "warn",
  fail: "error",
} as const;

async function checkDatabase(): Promise<SetupCheck> {
  try {
    await db.select({ value: count() }).from(projects);
    return { status: "ok" };
  } catch (error) {
    // This endpoint is unauthenticated: never surface raw driver messages
    // (they can name hosts and DB users). The real error goes to the logs.
    console.error("health check: database query failed", error);
    return {
      status: "error",
      detail: "Database query failed — check server logs.",
    };
  }
}

export async function getSelfHostSetupStatus(options?: {
  skipDatabaseCheck?: boolean;
}): Promise<SelfHostSetupStatus> {
  const env = Object.fromEntries(
    await Promise.all(
      CHECK_ENV_VARS.map(
        async (name) => [name, await getOptionalEnvValue(name)] as const,
      ),
    ),
  );

  const checks: Record<string, SetupCheck> = {};
  for (const item of runSelfhostChecks(env)) {
    checks[item.key] = {
      status: LEVEL_TO_STATUS[item.level],
      detail: item.message,
    };
  }
  checks.database = options?.skipDatabaseCheck
    ? { status: "ok" }
    : await checkDatabase();

  // Unlike the boot preflight, this runs with a database, so it can see a
  // client entered on the settings page and correct the env-only verdict.
  if (!options?.skipDatabaseCheck) {
    if ((await getGoogleOAuthClientSource()) === "settings") {
      checks.gsc = {
        status: "ok",
        detail: "Google OAuth istemcisi Ayarlar'da tanımlı.",
      };
    }

    /*
     * Same correction for the PageSpeed key, decided by source rather than by
     * the preflight's verdict. The preflight has to answer "info" because it
     * cannot see the database, and "info" maps to "ok" -- so reusing it here
     * reported a healthy PageSpeed check on an install with no key anywhere,
     * next to a detail line asking for one.
     */
    const pageSpeedSource = await getPageSpeedKeySource();
    checks.pagespeed =
      pageSpeedSource === "settings"
        ? { status: "ok", detail: "PageSpeed anahtarı Ayarlar'da kayıtlı." }
        : pageSpeedSource === "environment"
          ? {
              status: "ok",
              detail: "PageSpeed key supplied by PAGESPEED_API_KEY.",
            }
          : {
              status: "warn",
              detail:
                "No PageSpeed key. The Lighthouse phase falls back to Google's keyless quota and usually fails with 429; enter a free key under Settings. Crawling and every SEO check work without it.",
            };
  }

  return { version, authMode: getAuthMode(env.AUTH_MODE), checks };
}
