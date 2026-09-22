/**
 * Access tokens minted from the stored service account.
 *
 * Google trades a self-signed assertion for an access token that lasts an
 * hour. Minting costs a network round trip, and every Search Console call
 * would otherwise pay it, so tokens are cached per scope until shortly before
 * they expire.
 *
 * The cache is module-level, which is correct here and would not be in a
 * multi-tenant build: one install, one service account, one operator. It also
 * dies with the isolate, so the worst case is minting again.
 */
import { z } from "zod";
import { GoogleServiceAccountRepository } from "@/server/features/google/GoogleServiceAccountRepository";
import {
  buildAssertionPayload,
  GOOGLE_TOKEN_URI,
  signAssertion,
} from "@/server/lib/googleServiceAccountKey";

/** Re-mint this long before expiry, so a call never races the deadline. */
const EXPIRY_MARGIN_MS = 60_000;

const tokenResponseSchema = z.object({
  access_token: z.string().min(1),
  /** Google always sends it; the default keeps a short-lived token usable. */
  expires_in: z.number().default(3600),
});

type CachedToken = { token: string; expiresAt: number };
const cache = new Map<string, CachedToken>();

class GoogleServiceAccountError extends Error {
  constructor(message: string, options?: { cause?: unknown }) {
    super(message, options);
    this.name = "GoogleServiceAccountError";
  }
}

/** Whether this install is configured to use a service account at all. */
export async function hasServiceAccount(): Promise<boolean> {
  return (await GoogleServiceAccountRepository.getStatus()) !== null;
}

/**
 * A token for one scope, cached until it is nearly expired.
 *
 * Throws rather than returning null: every caller needs a token to do
 * anything, and the reason is worth surfacing — a service account that cannot
 * mint is almost always one that was deleted or had its key revoked in Google
 * Cloud, which the operator has to fix there.
 */
export async function getServiceAccountToken(scope: string): Promise<string> {
  const cached = cache.get(scope);
  if (cached && cached.expiresAt - EXPIRY_MARGIN_MS > Date.now()) {
    return cached.token;
  }

  const account = await GoogleServiceAccountRepository.get();
  if (!account) {
    throw new GoogleServiceAccountError(
      "Servis hesabı tanımlı değil ya da saklanan anahtar okunamıyor.",
    );
  }

  const assertion = await signAssertion(
    buildAssertionPayload({
      clientEmail: account.clientEmail,
      scope,
      tokenUri: GOOGLE_TOKEN_URI,
      issuedAt: Math.floor(Date.now() / 1000),
    }),
    account.privateKey,
  ).catch((error: unknown) => {
    throw new GoogleServiceAccountError(
      "Servis hesabı anahtarı imzalanamadı; dosya bozuk olabilir.",
      { cause: error },
    );
  });

  const response = await fetch(GOOGLE_TOKEN_URI, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
  });

  if (!response.ok) {
    /*
     * Google's body here names the cause precisely ("invalid_grant" for a
     * deleted account, "unauthorized_client" for a disabled key) and carries
     * no credential of ours, so a short excerpt is worth more to the operator
     * than a generic failure.
     */
    const detail = (await response.text().catch(() => "")).slice(0, 200);
    throw new GoogleServiceAccountError(
      `Google servis hesabı için token vermedi (${response.status}). ${detail}`,
    );
  }

  // Narrowed rather than asserted: this is a response from outside, and the
  // two fields we act on are the ones worth checking exist.
  const body = tokenResponseSchema.safeParse(await response.json());
  if (!body.success) {
    throw new GoogleServiceAccountError(
      "Google beklenmeyen bir token yanıtı döndürdü.",
    );
  }

  cache.set(scope, {
    token: body.data.access_token,
    expiresAt: Date.now() + body.data.expires_in * 1000,
  });
  return body.data.access_token;
}

/**
 * Drop cached tokens.
 *
 * Called when the stored account changes: a token minted from the old key
 * stays valid for up to an hour, so without this the app would keep using the
 * credential the operator just replaced.
 */
export function clearServiceAccountTokenCache(): void {
  cache.clear();
}
