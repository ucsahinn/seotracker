/**
 * Turning a Google service-account key file into a signed assertion.
 *
 * The parts that need no network and no clock live here so they can be
 * tested directly: validating the JSON Google hands you, unwrapping the PEM,
 * and assembling the JWT that the token endpoint trades for an access token.
 *
 * Why this exists at all: the OAuth path asks the operator to configure a
 * consent screen, add themselves as a test user, and register a redirect URI
 * that must match byte for byte. Those three steps are where setup actually
 * fails. A service account has none of them -- you create it, download the
 * key, and add its email to the Search Console property like any other user.
 */
import { z } from "zod";

/** Google's token endpoint, as named in the key file's own `token_uri`. */
export const GOOGLE_TOKEN_URI = "https://oauth2.googleapis.com/token";

/**
 * The fields this app needs from the downloaded key. Google's file carries
 * more (project_id, key ids, cert URLs); they are ignored rather than
 * rejected, so a newer file shape keeps working.
 */
const serviceAccountKeySchema = z.object({
  type: z.literal("service_account", {
    message:
      'Bu bir servis hesabı anahtarı değil. Dosyada "type": "service_account" yazmalı.',
  }),
  client_email: z.string().email("client_email bir e-posta adresi olmalı."),
  private_key: z.string().includes("BEGIN PRIVATE KEY", {
    message: "private_key alanı eksik ya da bozuk.",
  }),
  project_id: z.string().optional(),
  token_uri: z.string().url().optional(),
});

type ServiceAccountKey = z.infer<typeof serviceAccountKeySchema>;

/**
 * Parse the pasted file.
 *
 * Returns the reason rather than throwing, because every caller shows it to
 * the operator: a key file is pasted by hand and the useful answer is which
 * part of it is wrong, not that something failed.
 */
export function parseServiceAccountKey(
  raw: string,
): { ok: true; key: ServiceAccountKey } | { ok: false; reason: string } {
  let json: unknown;
  try {
    json = JSON.parse(raw);
  } catch {
    return {
      ok: false,
      reason:
        "Geçerli bir JSON değil. Google'dan indirdiğiniz dosyanın tamamını yapıştırın.",
    };
  }

  const parsed = serviceAccountKeySchema.safeParse(json);
  if (!parsed.success) {
    return {
      ok: false,
      reason: parsed.error.issues[0]?.message ?? "Anahtar dosyası okunamadı.",
    };
  }
  return { ok: true, key: parsed.data };
}

/** Base64url without padding, which is what JWT wants. */
function base64Url(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function base64UrlJson(value: unknown): string {
  return base64Url(new TextEncoder().encode(JSON.stringify(value)));
}

/**
 * The DER bytes inside a PEM block.
 *
 * Google writes the key with literal `\n` escapes when the file is embedded
 * in an environment variable, and with real newlines when it is downloaded.
 * Both shapes arrive here, so both are accepted.
 */
export function pemToPkcs8(privateKey: string): Uint8Array<ArrayBuffer> {
  const body = privateKey
    .replace(/\\n/g, "\n")
    .replace(/-----BEGIN [^-]+-----/, "")
    .replace(/-----END [^-]+-----/, "")
    .replace(/\s+/g, "");
  const binary = atob(body);
  // Backed by its own ArrayBuffer so it satisfies BufferSource.
  const bytes = new Uint8Array(new ArrayBuffer(binary.length));
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return bytes;
}

/** The part of the assertion that gets signed, and the claims inside it. */
export function buildAssertionPayload(input: {
  clientEmail: string;
  scope: string;
  tokenUri: string;
  issuedAt: number;
  lifetimeSeconds?: number;
}): string {
  const lifetime = input.lifetimeSeconds ?? 3600;
  const header = { alg: "RS256", typ: "JWT" };
  const claims = {
    iss: input.clientEmail,
    scope: input.scope,
    aud: input.tokenUri,
    iat: input.issuedAt,
    exp: input.issuedAt + lifetime,
  };
  return `${base64UrlJson(header)}.${base64UrlJson(claims)}`;
}

/** Sign the assertion with the account's private key. */
export async function signAssertion(
  payload: string,
  privateKey: string,
): Promise<string> {
  const key = await crypto.subtle.importKey(
    "pkcs8",
    pemToPkcs8(privateKey),
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    key,
    new TextEncoder().encode(payload),
  );
  return `${payload}.${base64Url(new Uint8Array(signature))}`;
}
