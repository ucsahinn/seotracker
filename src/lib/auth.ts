import { env } from "cloudflare:workers";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import * as d1Schema from "@/db/d1/schema";
import { d1Db } from "@/db/d1/client";
import {
  createBaseAuthConfig,
  type GoogleOAuthClient,
} from "@/lib/auth-config";
import { getGoogleOAuthClientConfig } from "@/server/features/google/oauth-config";

/**
 * This install never signs anyone in: the user is resolved per request from the
 * auth mode (a fixed local admin, or a Cloudflare Access assertion) and written
 * straight into the `user` table. The Better Auth instance exists for exactly
 * one job — minting, encrypting and refreshing the Google OAuth tokens behind
 * Search Console and Analytics — so it is built from BETTER_AUTH_SECRET alone
 * and never serves an /api/auth route.
 */

// Keys the OAuth-token encryption, so Search Console and Analytics stay off
// until it is set to something long enough to be a real key.
function getAuthSecret() {
  const secret = env.BETTER_AUTH_SECRET?.trim();

  if (!secret) {
    throw new Error("BETTER_AUTH_SECRET is required");
  }

  if (secret.length < 32) {
    throw new Error("BETTER_AUTH_SECRET must be at least 32 characters");
  }

  return secret;
}

function createAuth(client?: GoogleOAuthClient) {
  return betterAuth({
    ...createBaseAuthConfig(client),
    // Never read on the token path, but Better Auth requires a value.
    baseURL: "http://localhost",
    secret: getAuthSecret(),
    database: drizzleAdapter(d1Db, {
      provider: "sqlite",
      schema: d1Schema,
    }),
  });
}

let authInstance: ReturnType<typeof createAuth> | null = null;

export function getAuth() {
  if (authInstance) {
    return authInstance;
  }

  authInstance = createAuth();

  return authInstance;
}

let googleGrantAuth: {
  clientKey: string;
  instance: ReturnType<typeof createAuth>;
} | null = null;

/**
 * The instance to mint and refresh Google grant tokens with. Better Auth's
 * refresh signs in with the provider's own client id and secret, so those must
 * be the ones the operator stored in Settings, not only the environment's, or
 * every refresh an hour after connecting fails with invalid_client. Rebuilt
 * when the stored client changes; `getAuth` stays env-only for callers that
 * need nothing but the encryption context.
 */
export async function getGoogleGrantAuth() {
  const client = await getGoogleOAuthClientConfig();
  if (!client) return getAuth();

  const clientKey = `${client.clientId}
${client.clientSecret}`;
  if (googleGrantAuth?.clientKey !== clientKey) {
    googleGrantAuth = { clientKey, instance: createAuth(client) };
  }
  return googleGrantAuth.instance;
}
