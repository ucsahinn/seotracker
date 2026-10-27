import { mcpResponse } from "@/server/mcp/formatters";
import { type ToolContext } from "@/server/mcp/context";
import { optionalMetaOutputSchema } from "@/server/mcp/output-schemas";
import { getInstanceFacts } from "@/server/lib/instance-facts";
import { z } from "zod";

/** Shared with get_diagnostics: which instance the agent is talking to. */
export const instanceOutputSchema = z.object({
  version: z.string(),
  installKind: z.enum(["windows", "docker", "dev"]),
  port: z.object({
    configured: z.number().nullable(),
    actual: z.number().nullable(),
    fallback: z
      .object({ configured: z.number(), actual: z.number() })
      .nullable(),
  }),
  latestVersion: z.string().nullable(),
  stale: z.boolean(),
  agentNote: z.string(),
});

export const whoamiTool = {
  name: "whoami",
  config: {
    title: "Who am I",
    description:
      "Confirms which account and which seotracker instance this connection serves: running version, install kind (windows, docker, dev), the port fallback when the configured port was taken, and the latest released version when known. Call it first; if `instance.stale` is true or the port/install kind is not what the user expects, tell the user before using any data.",
    inputSchema: {} as Record<string, never>,
    outputSchema: {
      userEmail: z.string(),
      scopes: z.array(z.string()),
      instance: instanceOutputSchema,
      ...optionalMetaOutputSchema,
    },
    annotations: {
      readOnlyHint: true,
      openWorldHint: false,
      destructiveHint: false,
    },
  },
  handler: async (_args: Record<string, never>, context: ToolContext) => {
    const auth = context.auth;
    const instance = await getInstanceFacts(auth.baseUrl);
    return mcpResponse({
      text: [
        `Account: ${auth.userEmail}`,
        `Scopes: ${auth.scopes.length > 0 ? auth.scopes.join(", ") : "none"}`,
        `Instance: seotracker ${instance.version} (${instance.installKind})${instance.latestVersion ? `, latest release ${instance.latestVersion}` : ""}${instance.port.actual ? `, port ${instance.port.actual}` : ""}${instance.port.fallback ? ` instead of ${instance.port.fallback.configured}` : ""}`,
        instance.agentNote,
      ].join("\n"),
      structuredContent: {
        userEmail: auth.userEmail,
        scopes: auth.scopes,
        instance,
      },
    });
  },
};
