import { expect, it, vi } from "vitest";
import type {
  Ga4RunReportRequest,
  Ga4RunReportResponse,
} from "@/server/lib/ga4Client";
import { runCompleteGa4Report } from "./Ga4Pagination";

const request: Ga4RunReportRequest = {
  dateRanges: [{ startDate: "2026-01-01", endDate: "2026-01-31" }],
  dimensions: [{ name: "date" }],
  metrics: [{ name: "sessions" }],
  limit: "1000",
  offset: "0",
  orderBys: [],
  keepEmptyRows: false,
  returnPropertyQuota: true,
};
const page = (date: string, metadata = {}) => ({
  dimensionHeaders: [{ name: "date" }],
  metricHeaders: [{ name: "sessions" }],
  rows: [
    { dimensionValues: [{ value: date }], metricValues: [{ value: "1" }] },
  ],
  rowCount: 3,
  metadata,
});

it("consumes short pages until rowCount and retains limitations from intermediate pages", async () => {
  const runReport = vi
    .fn<(request: Ga4RunReportRequest) => Promise<Ga4RunReportResponse>>()
    .mockResolvedValueOnce(page("20260101"))
    .mockResolvedValueOnce(page("20260102", { subjectToThresholding: true }))
    .mockResolvedValueOnce(page("20260103"));
  const result = await runCompleteGa4Report({ runReport }, request);
  expect(result.rows?.map((row) => row.dimensionValues?.[0].value)).toEqual([
    "20260101",
    "20260102",
    "20260103",
  ]);
  expect(result.metadata?.subjectToThresholding).toBe(true);
  expect(runReport.mock.calls.map(([req]) => req.offset)).toEqual([
    "0",
    "1",
    "2",
  ]);
});

it("rejects a stalled page instead of returning incomplete data", async () => {
  const runReport = vi
    .fn<(request: Ga4RunReportRequest) => Promise<Ga4RunReportResponse>>()
    .mockResolvedValueOnce(page("20260101"))
    .mockResolvedValueOnce({ ...page(""), rows: [] });
  await expect(runCompleteGa4Report({ runReport }, request)).rejects.toThrow();
});

it("stops before the next page when Google's token budget is exhausted", async () => {
  const runReport = vi
    .fn<(request: Ga4RunReportRequest) => Promise<Ga4RunReportResponse>>()
    .mockResolvedValue({
      ...page("20260101"),
      propertyQuota: { tokensPerHour: { consumed: 40000, remaining: 0 } },
    });
  await expect(
    runCompleteGa4Report({ runReport }, request),
  ).rejects.toMatchObject({ status: 429 });
  expect(runReport).toHaveBeenCalledTimes(1);
});
