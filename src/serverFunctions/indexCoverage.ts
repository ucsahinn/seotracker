import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import {
  getIndexCoverage,
  refreshIndexCoverage,
} from "@/server/features/gsc/services/GscIndexCoverageService";
import { requireProjectContext } from "@/serverFunctions/middleware";

const auditSchema = z.object({
  projectId: z.string().min(1),
  auditId: z.string().min(1),
});

/** Reads stored inspections only, so opening the tab costs no quota. */
export const getAuditIndexCoverage = createServerFn({ method: "POST" })
  .middleware(requireProjectContext)
  .validator(auditSchema)
  .handler(({ context, data }) =>
    getIndexCoverage({ projectId: context.projectId, auditId: data.auditId }),
  );

/** Spends quota. Only ever called from an explicit button. */
export const refreshAuditIndexCoverage = createServerFn({ method: "POST" })
  .middleware(requireProjectContext)
  .validator(auditSchema)
  .handler(({ context, data }) =>
    refreshIndexCoverage({
      projectId: context.projectId,
      auditId: data.auditId,
    }),
  );
