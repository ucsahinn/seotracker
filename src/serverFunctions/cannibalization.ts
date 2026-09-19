import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getCannibalization } from "@/server/features/gsc/services/CannibalizationService";
import { requireProjectContext } from "@/serverFunctions/middleware";

const schema = z.object({
  projectId: z.string().min(1),
  dateRange: z
    .enum(["last_28_days", "last_3_months", "last_6_months"])
    .default("last_28_days"),
});

export const getCannibalizationReport = createServerFn({ method: "POST" })
  .middleware(requireProjectContext)
  .validator(schema)
  .handler(({ context, data }) =>
    getCannibalization({
      projectId: context.projectId,
      dateRange: data.dateRange,
    }),
  );
