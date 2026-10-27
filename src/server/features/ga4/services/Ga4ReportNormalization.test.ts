import { expect, it } from "vitest";
import { normalizeGa4Response } from "./Ga4ReportNormalization";
import { buildGa4OverviewRequest } from "./Ga4ReportDefinitions";
it("keeps omitted or empty metric values unknown while preserving measured zero", () => {
  const request = buildGa4OverviewRequest({
    startDate: "2026-10-01",
    endDate: "2026-10-01",
  });
  const result = normalizeGa4Response(
    {
      dimensionHeaders: [],
      metricHeaders: request.metrics,
      rows: [
        {
          dimensionValues: [],
          metricValues: [
            { value: "" },
            { value: " " },
            { value: "0" },
            { value: "0" },
            { value: "0" },
            { value: "0" },
            { value: "0" },
          ],
        },
      ],
    },
    request,
  );
  expect(result.rows[0]).toMatchObject({
    sessions: null,
    activeUsers: null,
    engagedSessions: 0,
    keyEvents: 0,
  });
});
