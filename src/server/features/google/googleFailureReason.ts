import {
  Ga4AdminApiError,
  Ga4DataApiError,
  Ga4TokenError,
} from "@/server/lib/ga4Errors";
import { GscApiError, GscTokenError } from "@/server/lib/gscErrors";
import { UpstreamNetworkError } from "@/server/lib/fetchRetry";
import { z } from "zod";

export type GoogleFailureReason =
  | "invalid_grant"
  | "permission_denied"
  | "api_disabled"
  | "quota_exceeded"
  | "timeout"
  | "unknown";
const errorBody = z.object({
  error: z.object({
    details: z.array(z.object({ reason: z.string().optional() })).optional(),
  }),
});

/** Only allowlisted codes cross the browser boundary, never upstream text. */
export function googleFailureReason(error: unknown): GoogleFailureReason {
  if (error instanceof Ga4TokenError || error instanceof GscTokenError)
    return "invalid_grant";
  if (
    error instanceof Error &&
    (error.name === "TimeoutError" || error.name === "AbortError")
  )
    return "timeout";
  if (error instanceof UpstreamNetworkError)
    return error.reason === "timeout" ? "timeout" : "unknown";
  if (
    !(
      error instanceof GscApiError ||
      error instanceof Ga4AdminApiError ||
      error instanceof Ga4DataApiError
    )
  )
    return "unknown";
  let upstream =
    error instanceof Ga4DataApiError || error instanceof Ga4AdminApiError
      ? error.upstreamReason
      : null;
  if (error instanceof GscApiError && error.body) {
    try {
      const parsed = errorBody.safeParse(JSON.parse(error.body));
      if (
        parsed.success &&
        parsed.data.error.details?.some(
          (detail) => detail.reason === "SERVICE_DISABLED",
        )
      )
        upstream = "SERVICE_DISABLED";
    } catch {
      /* Non-JSON errors carry only an HTTP status. */
    }
  }
  if (upstream === "SERVICE_DISABLED" || upstream === "API_DISABLED")
    return "api_disabled";
  if (upstream === "TIMEOUT") return "timeout";
  if (error.status === 401) return "invalid_grant";
  if (error.status === 403) return "permission_denied";
  if (error.status === 429) return "quota_exceeded";
  if (error.status === 504 || error.status === 408) return "timeout";
  return "unknown";
}
