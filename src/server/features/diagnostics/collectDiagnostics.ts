import { count, desc, inArray } from "drizzle-orm";
import { version } from "../../../../package.json";
import { db } from "@/db";
import {
  auditIssues,
  auditLighthouseResults,
  auditPages,
  audits,
  ga4Connections,
  gscConnections,
  gscQueryDaily,
  gscUrlInspections,
  projects,
  reports,
  savedKeywords,
} from "@/db/schema";
import { getAuthMode } from "@/lib/auth-mode";
import { getSelfHostSetupStatus } from "@/server/lib/setup-status";
import { gscPropertyHost } from "@/shared/gscProperty";

/**
 * Everything needed to diagnose someone else's install, and nothing that
 * would be a mistake to send.
 *
 * The audience is a person who did not write the code, running it on their
 * own machine, pasting the result into an issue. That makes the redaction
 * boundary the whole design: this file names every field it collects, and
 * anything it does not name is not in the bundle. Tokens, refresh tokens,
 * client secrets, the PageSpeed key and the MCP token are never read here —
 * only whether each is configured, which `getSelfHostSetupStatus` already
 * reports without their values.
 *
 * Domains and property names ARE included. They identify the site, but a
 * report about "a site" that cannot name the site is not diagnosable, and
 * the operator chooses when to send it. `README.txt` in the archive says
 * exactly this so nobody sends it without knowing.
 */
/** Recent audits are the most useful signal and the biggest table; cap them. */
const AUDIT_SAMPLE = 25;

export async function collectDiagnostics(now = new Date()) {
  const [setup, tables, projectRows, auditRows, connections] =
    await Promise.all([
      getSelfHostSetupStatus(),
      countTables(),
      listProjects(),
      listRecentAudits(),
      listConnections(),
    ]);

  return {
    generatedAt: now.toISOString(),
    version,
    authMode: getAuthMode(process.env.AUTH_MODE),
    setup,
    tables,
    projects: projectRows,
    connections,
    audits: auditRows,
  };
}

/*
 * Row counts, not rows. "The audit table has 41,000 pages" explains a slow
 * screen; the pages themselves would be the operator's site contents.
 */
async function countTables() {
  const entries = [
    ["projects", projects],
    ["audits", audits],
    ["audit_pages", auditPages],
    ["audit_issues", auditIssues],
    ["audit_lighthouse_results", auditLighthouseResults],
    ["gsc_query_daily", gscQueryDaily],
    ["gsc_url_inspections", gscUrlInspections],
    ["saved_keywords", savedKeywords],
    ["reports", reports],
  ] as const;

  const counted = await Promise.all(
    entries.map(async ([name, table]) => {
      const [row] = await db.select({ value: count() }).from(table);
      return [name, row?.value ?? 0] as const;
    }),
  );
  return Object.fromEntries(counted);
}

async function listProjects() {
  const rows = await db
    .select({
      id: projects.id,
      name: projects.name,
      domain: projects.domain,
      createdAt: projects.createdAt,
      archivedAt: projects.archivedAt,
    })
    .from(projects);
  return rows;
}

/*
 * Which integrations are bound, and to what — never the credential. A
 * connection row holds refresh tokens; only the property identifier and the
 * connecting account's email are read, and the email is reduced to its
 * domain: knowing the account is a Workspace account explains a permission
 * failure, knowing which person it is does not.
 */
async function listConnections() {
  const [gsc, ga4] = await Promise.all([
    db
      .select({
        projectId: gscConnections.projectId,
        siteUrl: gscConnections.siteUrl,
        connectedAccountEmail: gscConnections.connectedAccountEmail,
        createdAt: gscConnections.createdAt,
      })
      .from(gscConnections),
    db
      .select({
        projectId: ga4Connections.projectId,
        propertyId: ga4Connections.propertyId,
        propertyTimeZone: ga4Connections.propertyTimeZone,
        createdAt: ga4Connections.createdAt,
      })
      .from(ga4Connections),
  ]);

  return {
    searchConsole: gsc.map((row) => ({
      projectId: row.projectId,
      propertyHost: gscPropertyHost(row.siteUrl),
      propertyKind: row.siteUrl.startsWith("sc-domain:")
        ? ("domain" as const)
        : ("url-prefix" as const),
      accountEmailDomain: emailDomain(row.connectedAccountEmail),
      connectedAt: row.createdAt,
    })),
    analytics: ga4.map((row) => ({
      projectId: row.projectId,
      propertyId: row.propertyId,
      propertyTimeZone: row.propertyTimeZone,
      connectedAt: row.createdAt,
    })),
  };
}

/*
 * The failure history. `errorCode` and `currentPhase` together say where a
 * crawl died, which is the question almost every report about this tool
 * turns out to be.
 */
export async function listRecentAudits() {
  const rows = await db
    .select({
      id: audits.id,
      projectId: audits.projectId,
      status: audits.status,
      currentPhase: audits.currentPhase,
      errorCode: audits.errorCode,
      pagesCrawled: audits.pagesCrawled,
      pagesTotal: audits.pagesTotal,
      lighthouseTotal: audits.lighthouseTotal,
      lighthouseCompleted: audits.lighthouseCompleted,
      lighthouseFailed: audits.lighthouseFailed,
      startedAt: audits.startedAt,
      completedAt: audits.completedAt,
    })
    .from(audits)
    .orderBy(desc(audits.startedAt))
    .limit(AUDIT_SAMPLE);

  /*
   * Counted in a second query, not a correlated subquery in the select list.
   * Drizzle writes a column inside `sql` without its table name when the
   * select has one table, so `audit_id = id` resolved `id` to the inner
   * table and matched nothing: every audit reported 0 findings.
   */
  const counts =
    rows.length === 0
      ? []
      : await db
          .select({ auditId: auditIssues.auditId, total: count() })
          .from(auditIssues)
          .where(
            inArray(
              auditIssues.auditId,
              rows.map((row) => row.id),
            ),
          )
          .groupBy(auditIssues.auditId);
  const issueCounts = new Map(counts.map((row) => [row.auditId, row.total]));

  // The start URL is the site, and the site is already named by the project
  // row; repeating it per audit adds nothing and widens the surface.
  return rows.map((row) => ({
    ...row,
    issueCount: issueCounts.get(row.id) ?? 0,
  }));
}

function emailDomain(email: string | null): string | null {
  if (!email) return null;
  const at = email.lastIndexOf("@");
  return at === -1 ? null : email.slice(at + 1);
}
