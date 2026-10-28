import type {
  Ga4RunReportRequest,
  Ga4RunReportResponse,
} from "@/server/lib/ga4Client";
import {
  Ga4DataApiError,
  Ga4MalformedResponseError,
} from "@/server/lib/ga4Errors";
import { normalizeGa4Response } from "./Ga4ReportNormalization";

/** Sequential pages preserve a bounded request size without capping the report. */
export async function runCompleteGa4Report(
  client: {
    runReport(request: Ga4RunReportRequest): Promise<Ga4RunReportResponse>;
  },
  request: Ga4RunReportRequest,
): Promise<Ga4RunReportResponse> {
  let result: Ga4RunReportResponse | undefined;
  const rows: NonNullable<Ga4RunReportResponse["rows"]> = [];
  while (true) {
    const pageRequest = { ...request, offset: String(rows.length) };
    const page = await client.runReport(pageRequest);
    // Validate every page, including its headers, before combining responses.
    const normalized = normalizeGa4Response(page, pageRequest);
    if (result && normalized.totalRowCount !== result.rowCount) {
      throw new Ga4MalformedResponseError();
    }
    const previous = result?.metadata;
    const current = page.metadata;
    rows.push(...(page.rows ?? []));
    result = {
      ...page,
      rows,
      rowCount: normalized.totalRowCount,
      metadata: {
        ...previous,
        ...current,
        dataLossFromOtherRow: Boolean(
          previous?.dataLossFromOtherRow || current?.dataLossFromOtherRow,
        ),
        subjectToThresholding: Boolean(
          previous?.subjectToThresholding || current?.subjectToThresholding,
        ),
        samplingMetadatas: [
          ...(previous?.samplingMetadatas ?? []),
          ...(current?.samplingMetadatas ?? []),
        ],
        dataTruncationReasons: [
          ...(previous?.dataTruncationReasons ?? []),
          ...(current?.dataTruncationReasons ?? []),
        ],
        schemaRestrictionResponse: {
          activeMetricRestrictions: [
            ...(previous?.schemaRestrictionResponse?.activeMetricRestrictions ??
              []),
            ...(current?.schemaRestrictionResponse?.activeMetricRestrictions ??
              []),
          ],
        },
      },
    };
    if (rows.length === normalized.totalRowCount) return result;
    if (!normalized.rows.length || rows.length > normalized.totalRowCount) {
      throw new Ga4MalformedResponseError();
    }
    const quota = page.propertyQuota;
    if (
      [
        quota?.tokensPerDay,
        quota?.tokensPerHour,
        quota?.tokensPerProjectPerHour,
      ].some((balance) => balance && balance.remaining <= 0)
    ) {
      throw new Ga4DataApiError(
        429,
        "Google Analytics reporting quota was exhausted.",
        3600,
      );
    }
  }
}
