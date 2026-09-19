import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import {
  getIndexCoverage,
  refreshIndexCoverage,
} from "@/server/features/gsc/services/GscIndexCoverageService";
import { GscNotConnectedError } from "@/server/lib/gscErrors";
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

/**
 * Spends quota. Only ever called from an explicit button.
 *
 * "Not connected" comes back as a value, not an exception. `GscNotConnectedError`
 * is not an `AppError`, so throwing it reaches the client as the generic
 * internal-error code and the operator is told something went wrong when the
 * truth is that they have not finished setup.
 */
export const refreshAuditIndexCoverage = createServerFn({ method: "POST" })
  .middleware(requireProjectContext)
  .validator(auditSchema)
  .handler(async ({ context, data }) => {
    try {
      const result = await refreshIndexCoverage({
        projectId: context.projectId,
        auditId: data.auditId,
      });
      return { status: "ok" as const, ...result };
    } catch (error) {
      if (error instanceof GscNotConnectedError) {
        return { status: "needs_gsc" as const };
      }
      throw error;
    }
  });
