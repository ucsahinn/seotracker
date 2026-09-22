import { version as appVersion } from "../../../package.json";
import {
  type CallToolResult,
  McpServer,
  type ToolAnnotations,
} from "@modelcontextprotocol/server";
import type { z } from "zod";
import {
  createMcpToolContext,
  type McpProps,
  type ToolContext,
} from "@/server/mcp/context";
import { objectSchema } from "@/server/mcp/output-schemas";
import { instrumentMcpToolHandler } from "@/server/mcp/instrumentation";
import {
  getGoogleAnalyticsAudienceBreakdownTool,
  getGoogleAnalyticsEcommercePerformanceTool,
  getGoogleAnalyticsKeyEventsTool,
  getGoogleAnalyticsMeasurementHealthTool,
  getGoogleAnalyticsOrganicLandingPagesTool,
  getGoogleAnalyticsOrganicOverviewTool,
  getGoogleAnalyticsPagePerformanceTool,
  getGoogleAnalyticsSiteSearchTool,
  getGoogleAnalyticsTrafficAcquisitionTool,
  getSearchOpportunitiesTool,
} from "@/server/mcp/tools/google-analytics-tools";
import { createProjectTool } from "@/server/mcp/tools/create-project";
import { listProjectsTool } from "@/server/mcp/tools/list-projects";
import {
  getProjectContextTool,
  updateProjectContextTool,
} from "@/server/mcp/tools/project-context";
import { listSavedKeywordsTool } from "@/server/mcp/tools/list-saved-keywords";
import {
  getReportTool,
  listReportsTool,
  saveReportTool,
} from "@/server/mcp/tools/report-tools";
import {
  listReportTemplatesTool,
  saveReportTemplateTool,
} from "@/server/mcp/tools/report-template-tools";
import { saveKeywordsTool } from "@/server/mcp/tools/save-keywords";
import {
  getSearchConsolePerformanceTool,
  inspectUrlsTool,
} from "@/server/mcp/tools/search-console-tools";
import {
  getCannibalizationTool,
  getRankingHistoryTool,
} from "@/server/mcp/tools/ranking-tools";
import {
  getAuditIssuesTool,
  getAuditPagesTool,
  getAuditStatusTool,
  runSiteAuditTool,
} from "@/server/mcp/tools/site-audit-tools";
import { whoamiTool } from "@/server/mcp/tools/whoami";

type ToolSchema = z.ZodType | z.ZodRawShape;

// Tools declare inputSchema as either a raw Zod shape (most tools) or a full
// z.object (the GA4 tools); both normalize to one object schema at
// registration.
type ToolArgs<Input extends ToolSchema> = Input extends z.ZodType
  ? z.infer<Input>
  : Input extends z.ZodRawShape
    ? z.infer<z.ZodObject<Input>>
    : never;

type McpToolDefinition<Input extends ToolSchema> = {
  name: string;
  config: {
    title?: string;
    description?: string;
    inputSchema: Input;
    outputSchema?: ToolSchema;
    annotations?: ToolAnnotations;
  };
  handler: (
    args: ToolArgs<Input>,
    context: ToolContext,
  ) => CallToolResult | Promise<CallToolResult>;
};

function registerMcpTool<Input extends ToolSchema>(
  server: McpServer,
  tool: McpToolDefinition<Input>,
  authProps: McpProps,
) {
  const outputSchema = objectSchema(tool.config.outputSchema);
  const handler = instrumentMcpToolHandler(
    tool.name,
    outputSchema,
    tool.handler,
  );

  server.registerTool(
    tool.name,
    {
      ...tool.config,
      inputSchema: objectSchema(tool.config.inputSchema),
      outputSchema,
    },
    (args, context) => {
      return handler(
        // oxlint-disable-next-line typescript/no-unsafe-type-assertion -- args were validated against the tool's own inputSchema just above
        args as ToolArgs<Input>,
        createMcpToolContext(context, authProps),
      );
    },
  );
}

export function createMcpServer(authProps: McpProps) {
  const server = new McpServer(
    {
      name: "seotracker MCP",
      title: "seotracker",
      // The install's own version, not a number of its own. It was pinned at
      // "1.0.0" and told every connecting client that, which was wrong from
      // the first release.
      version: appVersion,
      description:
        "SEO tools for AI agents, all free-data: Google Search Console performance and URL inspection, Google Analytics reporting, site audits from a built-in crawler, saved keywords, project memory and reports.",
    },
    {
      // The tool list is fixed per request and no list_changed notification
      // is ever published, so don't advertise the capability — modern clients
      // use it to decide whether to open a subscriptions/listen stream.
      // Without the pre-declaration, registerTool defaults it to true.
      capabilities: { tools: { listChanged: false } },
      instructions:
        "Every tool here reads free data the user already owns: their own Search Console and Analytics properties, and a crawler that runs locally. Nothing bills per call, so research as thoroughly as the question deserves. One exception worth knowing: inspect_urls spends Google's URL Inspection quota, which is 2000 addresses per property per day and shared with the app's own screens, so ask it about the URLs you actually need rather than sweeping a whole site.",
    },
  );

  const register = <Input extends ToolSchema>(tool: McpToolDefinition<Input>) =>
    registerMcpTool(server, tool, authProps);

  register(whoamiTool);
  register(listProjectsTool);
  register(createProjectTool);
  register(getProjectContextTool);
  register(updateProjectContextTool);
  register(listSavedKeywordsTool);
  register(saveKeywordsTool);
  register(getSearchConsolePerformanceTool);
  register(inspectUrlsTool);
  register(getRankingHistoryTool);
  register(getCannibalizationTool);
  register(getGoogleAnalyticsOrganicLandingPagesTool);
  register(getGoogleAnalyticsPagePerformanceTool);
  register(getGoogleAnalyticsKeyEventsTool);
  register(getSearchOpportunitiesTool);
  register(getGoogleAnalyticsOrganicOverviewTool);
  register(getGoogleAnalyticsTrafficAcquisitionTool);
  register(getGoogleAnalyticsMeasurementHealthTool);
  register(getGoogleAnalyticsEcommercePerformanceTool);
  register(getGoogleAnalyticsSiteSearchTool);
  register(getGoogleAnalyticsAudienceBreakdownTool);
  register(runSiteAuditTool);
  register(getAuditStatusTool);
  register(getAuditIssuesTool);
  register(getAuditPagesTool);
  register(saveReportTool);
  register(listReportsTool);
  register(getReportTool);
  register(listReportTemplatesTool);
  register(saveReportTemplateTool);

  return server;
}
