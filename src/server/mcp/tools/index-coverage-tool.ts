/**
 * Read what Google has already said, without asking it again.
 *
 * `getIndexCoverage` has existed since the Index Coverage screen was built
 * and was reachable only from that screen. An agent's only route to index
 * status was `inspect_urls`, which spends against a 2000-per-property-per-day
 * allowance that does not replenish early -- so "are these forty pages
 * indexed?" cost forty inspections, and asking again after a timeout cost
 * forty more, for answers already sitting in `gsc_url_inspections`.
 *
 * This is the free half of that pair, and the one an agent should reach for
 * first. `inspect_urls` is for the pages this tool reports as pending or
 * stale.
 */
import { z } from "zod";
import { getIndexCoverage } from "@/server/features/gsc/services/GscIndexCoverageService";
import { buildProjectMeta } from "@/server/mcp/context";
import { mcpResponse } from "@/server/mcp/formatters";
import { optionalMetaOutputSchema } from "@/server/mcp/output-schemas";
import { withMcpProjectAuth } from "@/server/mcp/project-auth";
import { projectIdSchema } from "@/server/mcp/schemas";
import {
  auditIdSchema,
  latestAudit,
  noAuditsYet,
} from "@/server/mcp/tools/audit-shared";

const inputSchema = {
  projectId: projectIdSchema,
  auditId: auditIdSchema,
  limit: z
    .number()
    .int()
    .min(1)
    .max(500)
    .optional()
    .describe("Maximum rows to return. Default 100."),
} as const;

type Args = z.infer<z.ZodObject<typeof inputSchema>>;

const EMPTY = {
  checked: 0,
  indexed: 0,
  notIndexed: 0,
  pending: 0,
  asked: 0,
  due: 0,
  rows: [],
};

export const getIndexCoverageTool = {
  name: "get_index_coverage",
  config: {
    title: "Get index coverage",
    description:
      "Google's own indexing verdict for an audit's pages, read from this install's cache of past URL Inspection calls. Free: it never calls Google, so it costs no quota. Use this BEFORE inspect_urls -- it answers 'is this page on Google' for everything already asked about, and tells you which pages are still unanswered or stale so inspect_urls can be pointed at only those. `pending` means Google has not answered; `due` means the stored answer has aged out.",
    inputSchema,
    outputSchema: {
      checked: z.number(),
      indexed: z.number(),
      notIndexed: z.number(),
      pending: z.number(),
      asked: z.number(),
      due: z.number(),
      rows: z.array(z.record(z.string(), z.unknown())),
      ...optionalMetaOutputSchema,
    },
    annotations: {
      readOnlyHint: true,
      // The whole point: this one does not reach Google.
      openWorldHint: false,
      destructiveHint: false,
    },
  },
  handler: withMcpProjectAuth(async (args: Args, context) => {
    const audit = await latestAudit(args.projectId, args.auditId);
    if (!audit) return noAuditsYet(context, args.projectId, EMPTY);

    const coverage = await getIndexCoverage({
      projectId: args.projectId,
      auditId: audit.id,
    });
    const meta = buildProjectMeta(
      context,
      args.projectId,
      `/p/${args.projectId}/audit?auditId=${audit.id}&tab=index`,
    );

    const rows = coverage.rows.slice(0, args.limit ?? 100);
    const lines = rows.map((row) => {
      const verdict = row.verdict ?? "not answered";
      const state = row.coverageState ? ` — ${row.coverageState}` : "";
      const when = row.checkedAt
        ? ` (asked ${row.checkedAt})`
        : " (never asked)";
      return `  ${row.url} — ${verdict}${state}${when}`;
    });

    /*
     * "Nobody has asked" and "Google said no" must not read the same, which
     * is the same rule `summarizeCoverage` applies to the tiles: a missing
     * verdict is pending, never a negative Google did not give.
     */
    const text =
      coverage.asked === 0
        ? `No page in this audit has been inspected yet. ${coverage.rows.length} indexable page${coverage.rows.length === 1 ? " is" : "s are"} waiting; inspect_urls will ask Google about them, at one quota unit each.`
        : `${coverage.indexed} on Google, ${coverage.notIndexed} not, ${coverage.pending} unanswered, out of ${coverage.rows.length} indexable pages. ${coverage.due} are due for a re-check.\n` +
          lines.join("\n");

    return mcpResponse({
      text,
      meta,
      structuredContent: {
        checked: coverage.checked,
        indexed: coverage.indexed,
        notIndexed: coverage.notIndexed,
        pending: coverage.pending,
        asked: coverage.asked,
        due: coverage.due,
        rows,
      },
    });
  }),
};
