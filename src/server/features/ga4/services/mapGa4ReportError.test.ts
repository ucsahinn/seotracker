import { expect, it } from "vitest";
import { Ga4DataApiError, Ga4ReportError } from "@/server/lib/ga4Errors";
import { mapGa4ReportError } from "./mapGa4ReportError";

function mapped(error: unknown): Ga4ReportError {
  try {
    mapGa4ReportError(error);
  } catch (caught) {
    if (caught instanceof Ga4ReportError) return caught;
    throw caught;
  }
  throw new Error("mapGa4ReportError returned");
}

/*
 * server.log (installed 0.8.0): "ga4_upstream_unavailable" with nothing
 * else, so a DNS failure and a Google 500 could not be told apart.
 */
it("keeps Google's status and reason, and tells no answer from a 5xx", () => {
  expect(
    mapped(new Ga4DataApiError(0, "Google Analytics could not be reached: x")),
  ).toMatchObject({
    code: "ga4_upstream_unreachable",
    upstream: { status: 0, reason: null },
  });

  const outage = mapped(
    new Ga4DataApiError(503, "unavailable", null, "BACKEND_ERROR"),
  );
  expect(outage).toMatchObject({
    code: "ga4_upstream_unavailable",
    upstream: { status: 503, reason: "BACKEND_ERROR" },
  });
  expect(outage.message).toContain("HTTP 503, BACKEND_ERROR");
});

it("still sends a disabled Data API and a lost property to different fixes", () => {
  expect(
    mapped(new Ga4DataApiError(403, "denied", null, "SERVICE_DISABLED")).code,
  ).toBe("ga4_upstream_unavailable");
  expect(mapped(new Ga4DataApiError(404, "gone")).code).toBe(
    "ga4_property_inaccessible",
  );
});
