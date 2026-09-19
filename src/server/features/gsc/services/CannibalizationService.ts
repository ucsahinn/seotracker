import {
  findCannibalizedQueries,
  type CannibalizationReport,
} from "@/server/features/gsc/cannibalization";
import { GscService } from "@/server/features/gsc/services/GscService";

/** Search Console caps a response at 25k rows; this stays well inside it. */
const ROW_LIMIT = 5000;

export async function getCannibalization(input: {
  projectId: string;
  /** Matches the Search Performance page's own windows. */
  dateRange?: "last_28_days" | "last_3_months" | "last_6_months";
}): Promise<CannibalizationReport> {
  const performance = await GscService.getPerformance({
    projectId: input.projectId,
    dimensions: ["query", "page"],
    dateRange: input.dateRange ?? "last_28_days",
    rowLimit: ROW_LIMIT,
  });

  return {
    ...findCannibalizedQueries(performance.rows),
    startDate: performance.request.startDate,
    endDate: performance.request.endDate,
  };
}
