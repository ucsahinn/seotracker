import { mcpResponse } from "@/server/mcp/formatters";
import { type ToolContext } from "@/server/mcp/context";
import { optionalMetaOutputSchema } from "@/server/mcp/output-schemas";
import { z } from "zod";

export const whoamiTool = {
  name: "whoami",
  config: {
    title: "Who am I",
    description:
      "Confirms which account this seotracker instance is serving, when the user asks to check their account or connection.",
    inputSchema: {} as Record<string, never>,
    outputSchema: {
      userEmail: z.string(),
      scopes: z.array(z.string()),
      ...optionalMetaOutputSchema,
    },
    annotations: {
      readOnlyHint: true,
      openWorldHint: false,
      destructiveHint: false,
    },
  },
  handler: (_args: Record<string, never>, context: ToolContext) => {
    const auth = context.auth;
    return mcpResponse({
      text: [
        `Account: ${auth.userEmail}`,
        `Scopes: ${auth.scopes.length > 0 ? auth.scopes.join(", ") : "none"}`,
      ].join("\n"),
      structuredContent: {
        userEmail: auth.userEmail,
        scopes: auth.scopes,
      },
    });
  },
};
