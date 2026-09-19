/**
 * Encrypt a short secret with the instance key, for storage in the database.
 *
 * The container generates that key on first boot and keeps it in the data
 * volume; Better Auth already uses it for the Google OAuth tokens. Anything
 * stored through here is protected by exactly as much as that file is, which
 * is the honest bound: it stops a copied database from being useful on its
 * own, and nothing more.
 */
import { getOptionalEnvValue } from "@/server/lib/runtime-env";

const IV_BYTES = 12; // AES-GCM's standard nonce length.

export class MissingInstanceKeyError extends Error {
  constructor() {
    super(
      "No instance encryption key. In Docker the container generates one at startup; outside it, set BETTER_AUTH_SECRET.",
    );
    this.name = "MissingInstanceKeyError";
  }
}

async function getKey(): Promise<CryptoKey> {
  const secret = (await getOptionalEnvValue("BETTER_AUTH_SECRET"))?.trim();
  if (!secret) throw new MissingInstanceKeyError();

  // AES-256 needs exactly 32 bytes and the key is a human-length string, so
  // hash it to the right size rather than truncating or padding.
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(secret),
  );
  return crypto.subtle.importKey("raw", digest, "AES-GCM", false, [
    "encrypt",
    "decrypt",
  ]);
}

function toBase64(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary);
}

// Backed by a plain ArrayBuffer, not the ArrayBufferLike that Uint8Array.from
// infers: WebCrypto's BufferSource rejects a possibly-shared buffer.
function fromBase64(value: string): Uint8Array<ArrayBuffer> {
  const binary = atob(value);
  const bytes = new Uint8Array(new ArrayBuffer(binary.length));
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return bytes;
}

/** Returns base64 of `iv || ciphertext`, so one column holds the whole thing. */
export async function sealSecret(plaintext: string): Promise<string> {
  const key = await getKey();
  const iv = crypto.getRandomValues(new Uint8Array(IV_BYTES));
  const ciphertext = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    new TextEncoder().encode(plaintext),
  );

  const packed = new Uint8Array(iv.length + ciphertext.byteLength);
  packed.set(iv);
  packed.set(new Uint8Array(ciphertext), iv.length);
  return toBase64(packed);
}

/**
 * Null when the value cannot be read back — which in practice means the
 * instance key changed. That is recoverable by re-entering the secret, so
 * callers treat it as "not configured" rather than as a crash.
 */
export async function openSecret(sealed: string): Promise<string | null> {
  try {
    const packed = fromBase64(sealed);
    const key = await getKey();
    const plaintext = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv: packed.subarray(0, IV_BYTES) },
      key,
      packed.subarray(IV_BYTES),
    );
    return new TextDecoder().decode(plaintext);
  } catch (error) {
    if (error instanceof MissingInstanceKeyError) throw error;
    return null;
  }
}
