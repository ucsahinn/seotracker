import { GscHistoryRepository } from "../repositories/GscHistoryRepository";
import {
  rankingArchiveView,
  type ArchiveFilters,
} from "@/shared/rankingArchive";
import {
  gscHistoryWindow,
  isoDaysInclusive,
  GSC_TIME_ZONE,
} from "@/shared/dataFreshness";
import { previousWindow, attachChange } from "@/shared/rankingChange";
import { weeklyTrends } from "@/shared/weeklyTrends";

/** Local-only reads share one resolved span; no quota-bearing request on filters. */
export async function readRankingArchive(
  input: ArchiveFilters & {
    projectId: string;
    days: number;
    startDate?: string;
    endDate?: string;
  },
) {
  const range =
    input.startDate && input.endDate
      ? { startDate: input.startDate, endDate: input.endDate }
      : gscHistoryWindow(input.days);
  const days = isoDaysInclusive(range.startDate, range.endDate);
  const previous = previousWindow(range.startDate, days);
  const [currentRows, previousRows, coverage, previousCoverage, siteUrl] =
    await Promise.all([
      GscHistoryRepository.getTrackedQueries({
        projectId: input.projectId,
        since: range.startDate,
        until: range.endDate,
      }),
      GscHistoryRepository.getTrackedQueries({
        projectId: input.projectId,
        ...previous,
      }),
      GscHistoryRepository.getCoverage({
        projectId: input.projectId,
        since: range.startDate,
        until: range.endDate,
      }),
      GscHistoryRepository.getCoverage({
        projectId: input.projectId,
        ...previous,
      }),
      GscHistoryRepository.getProperty(input.projectId),
    ]);
  const view = rankingArchiveView(currentRows, previousRows, input);
  const weekly = await GscHistoryRepository.getWeeklyPositions({
    projectId: input.projectId,
    since: range.startDate,
    until: range.endDate,
    queries: view.rows.map((row) => row.query),
  });
  const trends = weeklyTrends(weekly, range);
  const counts = (entries: typeof coverage) => ({
    complete: entries.filter((day) => day.status === "complete-response")
      .length,
    limited: entries.filter((day) => day.status === "own-cap-limited").length,
    failed: entries.filter((day) => day.status === "failed").length,
    unknown: days - entries.length,
  });
  return {
    ...view,
    rows: view.rows.map((row) => ({
      ...row,
      trend: trends.get(row.query) ?? [],
    })),
    siteUrl,
    coverageIssues: coverage.filter(
      (day) => day.status !== "complete-response",
    ),
    range,
    previousRange: { startDate: previous.since, endDate: previous.until },
    days,
    timeZone: GSC_TIME_ZONE,
    freshness: "assumed-lag" as const,
    coverage: counts(coverage),
    previousCoverage: counts(previousCoverage),
    truncated: false,
  };
}

/** Daily detail and table use the same bounded weighted-mean contract. */
export async function readRankingQueryArchive(input: {
  projectId: string;
  days: number;
  query: string;
  startDate?: string;
  endDate?: string;
}) {
  const range =
    input.startDate && input.endDate
      ? { startDate: input.startDate, endDate: input.endDate }
      : gscHistoryWindow(input.days);
  const before = previousWindow(
    range.startDate,
    isoDaysInclusive(range.startDate, range.endDate),
  );
  const [rows, previousRows, coverage] = await Promise.all([
    GscHistoryRepository.getQueryHistory({
      projectId: input.projectId,
      query: input.query,
      since: range.startDate,
      until: range.endDate,
    }),
    GscHistoryRepository.getQueryHistory({
      projectId: input.projectId,
      query: input.query,
      ...before,
    }),
    GscHistoryRepository.getCoverage({
      projectId: input.projectId,
      since: range.startDate,
      until: range.endDate,
    }),
  ]);
  const aggregate = (daily: typeof rows) => {
    const impressions = daily.reduce((sum, row) => sum + row.impressions, 0);
    return {
      query: input.query,
      position:
        impressions > 0
          ? daily.reduce(
              (sum, row) => sum + row.position * row.impressions,
              0,
            ) / impressions
          : null,
    };
  };
  return {
    query: input.query,
    rows,
    range,
    coverage,
    comparison: attachChange([aggregate(rows)], [aggregate(previousRows)])[0],
  };
}
