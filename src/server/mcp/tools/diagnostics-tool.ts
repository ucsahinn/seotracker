import { z } from "zod";
import { type ToolContext } from "@/server/mcp/context";
import { collectDiagnostics } from "@/server/features/diagnostics/collectDiagnostics";
import { getQuotaStatus } from "@/server/features/quotas/QuotaService";
import { mcpResponse } from "@/server/mcp/formatters";
import { optionalMetaOutputSchema } from "@/server/mcp/output-schemas";
import { getInstanceFacts } from "@/server/lib/instance-facts";
import { instanceOutputSchema } from "@/server/mcp/tools/whoami";

/**
 * The same bundle the Support screen downloads, for an agent helping to
 * debug an install.
 *
 * Reading it is usually the first useful step in "it is not working": it
 * answers which version, what is configured, how big the tables are, and
 * where the last audits stopped — questions that otherwise take a dozen
 * round trips. Holds no secret values; see `collectDiagnostics`.
 */
export const diagnosticsTool = {
  name: "get_diagnostics",
  config: {
    title: "Get diagnostics",
    description:
      "Reads this install's diagnostic snapshot: version, auth mode, setup checks, table row counts, projects, connected Google properties, and the last 25 audits with their status, phase and error code. `instance` says which seotracker this is (version, install kind, port fallback, latest release, stale flag) — the same block as whoami. Start here when the user reports that something is broken, misconfigured, slow, or empty — it answers most of what you would otherwise ask them one question at a time. Also lists each active project's quota meters (URL Inspection, PageSpeed, Analytics, audit) as `diagnostics.quotas`. Contains no secret values: tokens, client secrets and API keys are reported only as configured or not.",
    inputSchema: {} as Record<string, never>,
    outputSchema: {
      version: z.string(),
      authMode: z.string(),
      generatedAt: z.string(),
      instance: instanceOutputSchema,
      diagnostics: z.looseObject({
        quotas: z
          .array(
            z.object({
              projectId: z.string(),
              id: z.string(),
              label: z.string(),
              used: z.number().nullable(),
              limit: z.number().nullable(),
              remaining: z.number().optional(),
              state: z.enum(["ok", "warn", "critical", "unknown"]),
              detail: z.string(),
            }),
          )
          .optional(),
      }),
      ...optionalMetaOutputSchema,
    },
    annotations: {
      readOnlyHint: true,
      openWorldHint: false,
      destructiveHint: false,
    },
  },
  handler: async (_args: Record<string, never>, context: ToolContext) => {
    const baseUrl = context.auth.baseUrl;
    const [diagnostics, instance] = await Promise.all([
      collectDiagnostics(new Date(), baseUrl),
      getInstanceFacts(baseUrl),
    ]);
    // Quota meters per active project: what is spent and what is left is
    // the usual answer to "inspections stopped working".
    const quotas = (
      await Promise.all(
        diagnostics.projects
          .filter((project) => !project.archivedAt)
          .map(async ({ id: projectId }) =>
            (await getQuotaStatus({ projectId })).items.map((item) => ({
              projectId,
              id: item.id,
              label: item.label,
              used: item.used,
              limit: item.limit,
              remaining: item.remaining,
              state: item.state,
              detail: item.detail,
            })),
          ),
      )
    ).flat();
    const failing = Object.entries(diagnostics.setup.checks).filter(
      ([, check]) => check.status !== "ok",
    );

    return mcpResponse({
      text: [
        `seotracker ${diagnostics.version} · auth mode ${diagnostics.authMode}`,
        instance.agentNote,
        failing.length === 0
          ? "Setup checks: all ok."
          : `Setup checks failing: ${failing
              .map(([key, check]) => `${key} (${check.status})`)
              .join(", ")}`,
        `Projects: ${diagnostics.projects.length}. Search Console connections: ${diagnostics.connections.searchConsole.length}. Analytics connections: ${diagnostics.connections.analytics.length}.`,
        `Recent audits: ${diagnostics.audits.length}. Full snapshot in structured content.`,
      ].join("\n"),
      structuredContent: {
        version: diagnostics.version,
        authMode: diagnostics.authMode,
        generatedAt: diagnostics.generatedAt,
        instance,
        diagnostics: { ...diagnostics, quotas },
      },
    });
  },
};
