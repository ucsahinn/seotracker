/**
 * The signed, short-lived `state` that carries an OAuth round trip.
 *
 * Lives apart from the flow itself because it is a self-contained piece of
 * crypto with its own rules: HMAC keyed by the client secret and namespaced
 * per integration, a ten-minute life, and a callback path that can only ever
 * point back at this origin. The flow is then just the flow.
 *
 * Takes a `stateNamespace` string rather than the integration object, so
 * nothing here has to know what a Search Console is.
 */
import { z } from "zod";
import { AppError } from "@/server/lib/errors";

/** Long enough to create a Google Cloud project in the other tab. */
const STATE_LIFETIME_MS = 10 * 60 * 1_000;

const oauthStateSchema = z.object({
  userId: z.string().min(1),
  callbackPath: z.string().min(1),
  exp: z.number().int(),
});

export type OAuthState = z.infer<typeof oauthStateSchema>;

function bytesToBase64Url(bytes: Uint8Array) {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary)
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replaceAll("=", "");
}

function base64UrlToBytes(value: string) {
  const padded = `${value}${"=".repeat((4 - (value.length % 4)) % 4)}`;
  const binary = atob(padded.replaceAll("-", "+").replaceAll("_", "/"));
  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
}

async function getStateKey(clientSecret: string, stateNamespace: string) {
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(`seotracker:${stateNamespace}:${clientSecret}`),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

/**
 * Where to return to afterwards, collapsed to a same-origin path.
 *
 * Anything pointing elsewhere becomes `/`: the value arrives as a query
 * parameter, and an OAuth callback that forwards wherever it is told is an
 * open redirect.
 */
function getSafeCallbackPath(callbackURL: string, publicOrigin: string) {
  try {
    const url = new URL(callbackURL, publicOrigin);
    if (url.origin !== publicOrigin) return "/";
    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return "/";
  }
}

export async function createOAuthState(input: {
  stateNamespace: string;
  clientSecret: string;
  userId: string;
  callbackURL: string;
  publicOrigin: string;
}): Promise<string> {
  const payload = bytesToBase64Url(
    new TextEncoder().encode(
      JSON.stringify({
        userId: input.userId,
        callbackPath: getSafeCallbackPath(
          input.callbackURL,
          input.publicOrigin,
        ),
        exp: Date.now() + STATE_LIFETIME_MS,
      } satisfies OAuthState),
    ),
  );
  const signature = bytesToBase64Url(
    new Uint8Array(
      await crypto.subtle.sign(
        "HMAC",
        await getStateKey(input.clientSecret, input.stateNamespace),
        new TextEncoder().encode(payload),
      ),
    ),
  );
  return `${payload}.${signature}`;
}

/** Throws `VALIDATION_ERROR` for a malformed, forged or expired state. */
export async function verifyOAuthState(input: {
  state: string;
  clientSecret: string;
  stateNamespace: string;
  displayName: string;
}): Promise<OAuthState> {
  const invalid = () =>
    new AppError("VALIDATION_ERROR", `Invalid ${input.displayName} state`);

  const [payload, signature] = input.state.split(".");
  if (!payload || !signature) throw invalid();

  const ok = await crypto.subtle.verify(
    "HMAC",
    await getStateKey(input.clientSecret, input.stateNamespace),
    base64UrlToBytes(signature),
    new TextEncoder().encode(payload),
  );
  if (!ok) throw invalid();

  const parsed = oauthStateSchema.parse(
    JSON.parse(new TextDecoder().decode(base64UrlToBytes(payload))),
  );
  if (parsed.exp < Date.now()) {
    throw new AppError(
      "VALIDATION_ERROR",
      `Expired ${input.displayName} state`,
    );
  }
  return parsed;
}
