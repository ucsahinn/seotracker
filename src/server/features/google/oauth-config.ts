import { GoogleOAuthClientRepository } from "@/server/features/google/GoogleOAuthClientRepository";
import { getOptionalEnvValue } from "@/server/lib/runtime-env";
import { MIN_BETTER_AUTH_SECRET_LENGTH } from "@/shared/selfhost-checks";

type GoogleOAuthClientConfig = {
  clientId: string;
  clientSecret: string;
};

/** Where the credentials in use came from, so the settings page can say so. */
type GoogleOAuthClientSource = "settings" | "environment" | null;

/**
 * The OAuth client for Search Console and Analytics.
 *
 * Settings first, environment second. A value entered in the app is the more
 * recent, more deliberate act — and it is the only one that can be changed
 * without recreating the container — so it wins. The environment path stays
 * for installs that inject credentials from outside, and for anyone who set it
 * up before the settings page existed.
 */
export async function getGoogleOAuthClientConfig(): Promise<GoogleOAuthClientConfig | null> {
  const stored = await GoogleOAuthClientRepository.get();
  if (stored) {
    return { clientId: stored.clientId, clientSecret: stored.clientSecret };
  }

  const clientId = (await getOptionalEnvValue("GOOGLE_CLIENT_ID"))?.trim();
  const clientSecret = (
    await getOptionalEnvValue("GOOGLE_CLIENT_SECRET")
  )?.trim();
  return clientId && clientSecret ? { clientId, clientSecret } : null;
}

export async function getGoogleOAuthClientSource(): Promise<GoogleOAuthClientSource> {
  if (await GoogleOAuthClientRepository.get()) return "settings";
  const clientId = (await getOptionalEnvValue("GOOGLE_CLIENT_ID"))?.trim();
  const clientSecret = (
    await getOptionalEnvValue("GOOGLE_CLIENT_SECRET")
  )?.trim();
  return clientId && clientSecret ? "environment" : null;
}

export async function hasSelfHostedGoogleOAuthConfig(
  config?: GoogleOAuthClientConfig | null,
): Promise<boolean> {
  const oauthConfig =
    config === undefined ? await getGoogleOAuthClientConfig() : config;
  if (!oauthConfig) return false;
  const secret = (await getOptionalEnvValue("BETTER_AUTH_SECRET"))?.trim();
  return Boolean(secret && secret.length >= MIN_BETTER_AUTH_SECRET_LENGTH);
}
