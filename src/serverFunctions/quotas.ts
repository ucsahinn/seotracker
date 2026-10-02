import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getQuotaStatus as readQuotaStatus } from "@/server/features/quotas/QuotaService";
import { QUOTA_KINDS } from "@/server/features/quotas/quotaTypes";
import { requireProjectContext } from "@/serverFunctions/middleware";

// The `projectId` field is what triggers project authorization (ADR 0001).
const quotaStatusSchema = z.object({
  projectId: z.string().min(1),
  kinds: z.array(z.enum(QUOTA_KINDS)).optional(),
});

/** Limits and what is used of them. Reads stored figures; never calls Google. */
export const getQuotaStatus = createServerFn({ method: "POST" })
  .middleware(requireProjectContext)
  .validator(quotaStatusSchema)
  .handler(({ data, context }) =>
    readQuotaStatus({ projectId: context.projectId, kinds: data.kinds }),
  );
