import { expect, it } from "vitest";
import { normalizeGa4Response } from "./Ga4ReportNormalization";
import { buildGa4OverviewRequest } from "./Ga4ReportDefinitions";
// Before the fix, truncation metadata disappeared and this report was usable.
it("preserves truncation reasons and prevents a truncated empty report claiming complete data", () => {
  const reason = {
    dataTruncationType: "DATA_TRUNCATION_TYPE_PROPERTY",
    dataTruncationDate: "2026-01-01",
    dataTruncationMessage: "Retention boundary",
    dataTruncationDateRanges: [
      { startDate: "2025-01-01", endDate: "2025-12-31" },
    ],
  };
  const report = normalizeGa4Response(
    { metadata: { dataTruncationReasons: [reason] } },
    buildGa4OverviewRequest({ startDate: "2025-01-01", endDate: "2025-12-31" }),
  );
  expect(report.reportMetadata).toMatchObject({
    dataTruncationReasons: [reason],
    hasLimitedData: true,
  });
});
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
