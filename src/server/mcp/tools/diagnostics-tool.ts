import { z } from "zod";
import { collectDiagnostics } from "@/server/features/diagnostics/collectDiagnostics";
import { mcpResponse } from "@/server/mcp/formatters";
import { optionalMetaOutputSchema } from "@/server/mcp/output-schemas";

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
      "Reads this install's diagnostic snapshot: version, auth mode, setup checks, table row counts, projects, connected Google properties, and the last 25 audits with their status, phase and error code. Start here when the user reports that something is broken, misconfigured, slow, or empty — it answers most of what you would otherwise ask them one question at a time. Contains no secret values: tokens, client secrets and API keys are reported only as configured or not.",
    inputSchema: {} as Record<string, never>,
    outputSchema: {
      version: z.string(),
      authMode: z.string(),
      generatedAt: z.string(),
      diagnostics: z.unknown(),
      ...optionalMetaOutputSchema,
    },
    annotations: {
      readOnlyHint: true,
      openWorldHint: false,
      destructiveHint: false,
    },
  },
  handler: async () => {
    const diagnostics = await collectDiagnostics();
    const failing = Object.entries(diagnostics.setup.checks).filter(
      ([, check]) => check.status !== "ok",
    );

    return mcpResponse({
      text: [
        `seotracker ${diagnostics.version} · auth mode ${diagnostics.authMode}`,
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
        diagnostics,
      },
    });
  },
};
