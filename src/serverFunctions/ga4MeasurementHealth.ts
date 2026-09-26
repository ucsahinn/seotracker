import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { Ga4MeasurementHealthService } from "@/server/features/ga4/services/Ga4MeasurementHealthService";
import { Ga4ReportError } from "@/server/lib/ga4Errors";
import { requireProjectContext } from "@/serverFunctions/middleware";

/**
 * Whether Analytics is actually measuring anything.
 *
 * The service has existed since the fork began and only an agent could reach
 * it -- one MCP tool, no server function, no screen. It answers the question
 * behind almost every "my traffic dropped": whether the fall is in the site
 * or in the tag. A broken measurement setup and a deindexed section look
 * identical from a dashboard, and the fix for one makes the other worse.
 *
 * Reads the Analytics Admin API, which is free and unmetered here. It does
 * not touch reporting quota.
 *
 * "Not connected" comes back as a value rather than an exception, matching
 * `getGa4Report`: it is the expected first state, and a thrown error reaches
 * the client as a generic code that cannot say which integration is missing.
 */
export const getGa4MeasurementHealth = createServerFn({ method: "POST" })
  .middleware(requireProjectContext)
  .validator(z.object({ projectId: z.string().min(1) }))
  .handler(async ({ context }) => {
    try {
      const health = await Ga4MeasurementHealthService.getMeasurementHealth(
        context.projectId,
      );
      return {
        status: "ok" as const,
        propertyDisplayName: health.source.propertyDisplayName ?? null,
        propertyId: health.source.propertyId,
        summary: health.summary,
        issues: health.issues,
        webStreams: health.webStreams,
        otherStreams: health.otherStreams,
        keyEvents: health.keyEvents,
      };
    } catch (error) {
      if (
        error instanceof Ga4ReportError &&
        error.code === "ga4_not_connected"
      ) {
        return { status: "needs_ga4" as const };
      }
      throw error;
    }
  });
