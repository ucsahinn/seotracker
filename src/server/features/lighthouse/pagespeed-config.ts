import { PageSpeedKeyRepository } from "@/server/features/lighthouse/PageSpeedKeyRepository";
import { getOptionalEnvValue } from "@/server/lib/runtime-env";

/** Where the key in use came from, so the settings page can say so. */
type PageSpeedKeySource = "settings" | "environment" | null;

/**
 * The PageSpeed Insights key for the Lighthouse phase.
 *
 * Settings first, environment second — the same order as the Google OAuth
 * client, and for the same reason: a value entered in the app is the more
 * deliberate act and the only one that can be changed without recreating the
 * container. `PAGESPEED_API_KEY` stays honoured for installs that inject it
 * from outside and for anyone who set it up before this page existed.
 */
export async function getPageSpeedApiKey(): Promise<string | undefined> {
  const stored = await PageSpeedKeyRepository.get();
  if (stored) return stored.key;
  return (await getOptionalEnvValue("PAGESPEED_API_KEY"))?.trim() || undefined;
}

export async function getPageSpeedKeySource(): Promise<PageSpeedKeySource> {
  if (await PageSpeedKeyRepository.get()) return "settings";
  const fromEnv = (await getOptionalEnvValue("PAGESPEED_API_KEY"))?.trim();
  return fromEnv ? "environment" : null;
}
