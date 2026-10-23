import { isErrorCode, type ErrorCode } from "@/shared/error-codes";
import {
  Ga4AdminApiError,
  Ga4DataApiError,
  Ga4MalformedResponseError,
  Ga4ReportError,
  Ga4TokenError,
} from "@/server/lib/ga4Errors";
import { GscApiError, GscTokenError } from "@/server/lib/gscErrors";

export class AppError extends Error {
  constructor(
    public readonly code: ErrorCode,
    message?: string,
    public readonly details?: Record<string, string>,
  ) {
    super(message ?? code);
    this.name = "AppError";
  }
}

export function asAppError(error: unknown): AppError | null {
  if (error instanceof AppError) return error;
  if (error instanceof Error && isErrorCode(error.message)) {
    return new AppError(error.message, error.message);
  }
  return null;
}

/**
 * A failure that came from Google, not from this app.
 *
 * These used to reach the client as a bare INTERNAL_ERROR, so a Google-side
 * failure told the operator the app itself was unreachable. They now cross as
 * UPSTREAM_UNAVAILABLE (or RATE_LIMITED for an exhausted quota), whose copy
 * points at Google and the connection instead.
 */
export function googleAppError(error: unknown): AppError | null {
  if (error instanceof Ga4ReportError) {
    if (error.code === "validation_error") return null;
    return new AppError(
      error.code === "ga4_quota_exhausted"
        ? "RATE_LIMITED"
        : "UPSTREAM_UNAVAILABLE",
    );
  }
  if (
    (error instanceof Ga4DataApiError ||
      error instanceof Ga4AdminApiError ||
      error instanceof GscApiError) &&
    error.status === 429
  ) {
    return new AppError("RATE_LIMITED");
  }
  if (
    error instanceof Ga4DataApiError ||
    error instanceof Ga4AdminApiError ||
    error instanceof Ga4MalformedResponseError ||
    error instanceof Ga4TokenError ||
    error instanceof GscApiError ||
    error instanceof GscTokenError
  ) {
    return new AppError("UPSTREAM_UNAVAILABLE");
  }
  return null;
}

// Drizzle wraps every driver failure in a DrizzleQueryError whose message is
// "Failed query: <sql>" and keeps the driver's own message on `cause`, so the
// UNIQUE text has to be looked for on both.
export function isUniqueConstraintError(error: unknown): boolean {
  return [error, error instanceof Error ? error.cause : null].some(
    (candidate) =>
      candidate instanceof Error &&
      candidate.message.includes("UNIQUE constraint failed"),
  );
}

// Codes whose server-side message is safe and useful to show the user.
// Setup errors carry static guidance ("TEAM_DOMAIN must be a full https URL…")
// that self-hosters need to fix their deployment. CONFLICT and VALIDATION_ERROR
// are only ever thrown with hand-written sentences that tell the user what to
// change (invalid domain, reserved project name, report limits); never pass a
// caught SQL/driver error message into either code. Everything else stays
// stripped to its bare code.
const CLIENT_DETAIL_ERROR_CODES = new Set<ErrorCode>([
  "AUTH_CONFIG_MISSING",
  "CONFLICT",
  "VALIDATION_ERROR",
]);

export function toClientError(error: unknown): Error {
  const appError = asAppError(error);
  if (
    appError &&
    CLIENT_DETAIL_ERROR_CODES.has(appError.code) &&
    appError.message !== appError.code
  ) {
    return new Error(`${appError.code}: ${appError.message}`);
  }
  return new Error(appError?.code ?? "INTERNAL_ERROR");
}
