import { z } from "zod";
import { UpstreamNetworkError } from "@/server/lib/fetchRetry";
import { googleFailureReason } from "@/server/features/google/googleFailureReason";
import {
  Ga4AdminApiError,
  Ga4DataApiError,
  Ga4MalformedResponseError,
  Ga4ReportError,
  Ga4TokenError,
} from "@/server/lib/ga4Errors";

const RECONNECT = "The Google Analytics connection has expired or was revoked.";
const MALFORMED = "Google Analytics returned an invalid report.";

/**
 * Any GA4 failure as a Ga4ReportError, keeping what Google said.
 *
 * The HTTP status (0 = no answer, after the transport retries) and Google's
 * reason travel on `upstream`. They used to be dropped here, so a DNS failure,
 * a Google 500 and a disabled API all read "temporarily unavailable" with
 * nothing in the log to tell them apart.
 */
export function mapGa4ReportError(error: unknown): never {
  if (error instanceof Ga4ReportError) throw error;
  if (error instanceof UpstreamNetworkError) {
    throw new Ga4ReportError("ga4_upstream_unreachable", error.message, null, {
      status: 0,
      reason: error.reason === "timeout" ? "TIMEOUT" : null,
    });
  }
  if (error instanceof Ga4TokenError) {
    if (googleFailureReason(error) !== "invalid_grant") {
      throw new Ga4ReportError(
        "ga4_upstream_unreachable",
        "Google token acquisition is temporarily unavailable. Retry shortly.",
      );
    }
    throw new Ga4ReportError("ga4_reconnect_required", RECONNECT);
  }
  if (
    error instanceof Ga4MalformedResponseError ||
    error instanceof z.ZodError
  ) {
    throw new Ga4ReportError("ga4_malformed_response", MALFORMED);
  }
  if (
    !(error instanceof Ga4DataApiError || error instanceof Ga4AdminApiError)
  ) {
    throw error;
  }

  const upstream = {
    status: error.status,
    reason: error.upstreamReason,
    api:
      error instanceof Ga4AdminApiError
        ? ("Admin" as const)
        : ("Data" as const),
  };
  const fail = (
    code: ConstructorParameters<typeof Ga4ReportError>[0],
    message: string,
    retryAfterSeconds: number | null = null,
  ): never => {
    throw new Ga4ReportError(code, message, retryAfterSeconds, upstream);
  };

  switch (error.status) {
    case 400:
      if (error instanceof Ga4DataApiError) {
        return fail(
          "ga4_report_incompatible",
          "This report is not compatible with the selected Analytics property.",
        );
      }
      break;
    case 401:
      return fail("ga4_reconnect_required", RECONNECT);
    case 403:
      return upstream.reason === "SERVICE_DISABLED" ||
        upstream.reason === "API_DISABLED"
        ? fail(
            "ga4_upstream_unavailable",
            `The Google Analytics ${upstream.api} API is not enabled. Enable it in Google Cloud Console and retry.`,
          )
        : fail(
            "ga4_property_inaccessible",
            "The connected Google account can no longer access this property.",
          );
    case 404:
      return fail(
        "ga4_property_inaccessible",
        "The selected Google Analytics property is no longer available.",
      );
    case 429:
      return fail(
        "ga4_quota_exhausted",
        "Google Analytics reporting quota is exhausted. Try again later.",
        error instanceof Ga4DataApiError ? error.retryAfterSeconds : null,
      );
  }

  console.warn(
    `Google Analytics request failed: status=${error.status} reason=${upstream.reason ?? "none"} message=${error.message}`,
  );
  if (error.status === 0)
    return fail("ga4_upstream_unreachable", error.message);
  return fail(
    "ga4_upstream_unavailable",
    `Google Analytics reporting is temporarily unavailable (HTTP ${error.status}${upstream.reason ? `, ${upstream.reason}` : ""}).`,
  );
}
