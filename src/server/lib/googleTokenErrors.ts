import { z } from "zod";
import { UpstreamNetworkError } from "./fetchRetry";

/** Structured OAuth rejection, without persisting provider response text. */
export class GoogleTokenEndpointError extends Error {
  constructor(
    public readonly status: number,
    public readonly reason: string | null,
  ) {
    super("Google token endpoint rejected the request.");
    this.name = "GoogleTokenEndpointError";
  }
}

const oauthError = z.object({ error: z.string() });
const authError = z.object({
  body: z.object({ code: z.string().optional(), error: z.string().optional() }),
});
const credentialReasons = new Set([
  "invalid_grant",
  "invalid_client",
  "unauthorized_client",
]);

/** A transport failure or malformed key is not evidence of a revoked grant. */
export function isGoogleCredentialRejection(error: unknown): boolean {
  if (error instanceof GoogleTokenEndpointError) {
    return (
      error.status >= 400 &&
      error.status < 500 &&
      credentialReasons.has(error.reason ?? "")
    );
  }
  const oauth = oauthError.safeParse(error);
  if (oauth.success) return credentialReasons.has(oauth.data.error);
  const auth = authError.safeParse(error);
  return (
    auth.success &&
    credentialReasons.has(
      (auth.data.body.error ?? auth.data.body.code ?? "").toLowerCase(),
    )
  );
}

/** Keep credential wrappers only for confirmed rejection; all else is retryable. */
export function preserveGoogleTokenFailure(error: unknown): void {
  if (isGoogleCredentialRejection(error)) return;
  if (error instanceof UpstreamNetworkError) throw error;
  const timeout =
    error instanceof Error &&
    (error.name === "TimeoutError" || error.name === "AbortError");
  throw new UpstreamNetworkError(
    "Google token endpoint",
    timeout
      ? "timeout"
      : "Token acquisition unavailable; retry. If it persists, check the Google credential configuration.",
    1,
    { cause: error },
  );
}
