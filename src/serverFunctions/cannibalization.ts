import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getCannibalization } from "@/server/features/gsc/services/CannibalizationService";
import { requireProjectContext } from "@/serverFunctions/middleware";
import {
  GSC_DEVICES,
  SEARCH_PERFORMANCE_TYPES,
} from "@/types/schemas/search-performance";

/*
 * Two vocabularies met here. The Search Performance page offers 7 days / 28
 * days / 3 months; this analysis offers 28 days / 3 months / 6 months. The
 * overlap is the middle two, and the panel used to accept neither -- it sent
 * no range at all and always got the 28-day default, under three filter
 * dropdowns that stayed enabled and did nothing.
 *
 * A 7-day window is accepted and widened, because the 100-impression floor
 * that makes this analysis meaningful almost never clears in seven days, and
 * "no conflicts" would be the wrong answer to give for "not enough data".
 * The report returns the window it actually used, and the panel prints it.
 */
const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);

const schema = z.object({
  projectId: z.string().min(1),
  dateRange: z
    .enum(["last_7_days", "last_28_days", "last_3_months", "last_6_months"])
    .default("last_28_days"),
  // An exact period pinned by a link. Every other tab honours it; this one
  // used to analyse the default 28 days beside them.
  startDate: isoDate.optional(),
  endDate: isoDate.optional(),
  device: z.enum(GSC_DEVICES).optional(),
  searchType: z.enum(SEARCH_PERFORMANCE_TYPES).default("web"),
  country: z
    .string()
    .length(3)
    .transform((value) => value.toLowerCase())
    .optional(),
});

export const getCannibalizationReport = createServerFn({ method: "POST" })
  .middleware(requireProjectContext)
  .validator(schema)
  .handler(({ context, data }) =>
    getCannibalization({
      projectId: context.projectId,
      dateRange:
        data.dateRange === "last_7_days" ? "last_28_days" : data.dateRange,
      window:
        data.startDate && data.endDate && data.startDate <= data.endDate
          ? { startDate: data.startDate, endDate: data.endDate }
          : undefined,
      device: data.device,
      country: data.country,
      searchType: data.searchType,
    }),
  );
