import { expect, it } from "vitest";
import { googleFailureReason } from "./googleFailureReason";
import { GscApiError } from "@/server/lib/gscErrors";
import { Ga4AdminApiError, Ga4TokenError } from "@/server/lib/ga4Errors";
// Previously a disabled API was indistinguishable from property permission denial.
it("returns only safe cause codes without forwarding upstream messages", () => {
  expect(
    googleFailureReason(
      new GscApiError(
        403,
        "secret",
        JSON.stringify({
          error: { details: [{ reason: "SERVICE_DISABLED" }] },
        }),
      ),
    ),
  ).toBe("api_disabled");
  expect(googleFailureReason(new Ga4AdminApiError(403, "secret"))).toBe(
    "permission_denied",
  );
  expect(googleFailureReason(new Ga4TokenError("secret"))).toBe(
    "invalid_grant",
  );
  expect(googleFailureReason(new Ga4AdminApiError(429, "secret"))).toBe(
    "quota_exceeded",
  );
  expect(googleFailureReason(new Error("secret"))).toBe("unknown");
  expect(
    googleFailureReason(new Ga4AdminApiError(0, "secret", "TIMEOUT")),
  ).toBe("timeout");
});
