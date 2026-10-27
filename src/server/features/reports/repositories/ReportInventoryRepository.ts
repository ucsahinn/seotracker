import { and, asc, count, desc, eq, gte, notInArray, sql } from "drizzle-orm";
import { db } from "@/db";
import { reports, reportTemplates } from "@/db/schema";
import { reportSearchPattern } from "@/shared/reportSearch";
import { metadataColumns } from "./ReportRepository";
import {
  APP_REPORT_CREATOR,
  LEGACY_APP_REPORT_CREATOR,
} from "@/shared/report-creator";
import {
  REPORT_INVENTORY_PAGE_SIZE,
  type ReportInventoryInput,
} from "@/shared/reportInventory";

// Template identity is independent of the agent's skill. Native reports with
// no persisted kind remain unknown; titles and HTML are never classification inputs.
const kindExpression = sql<string>`case
  when ${reports.nativeKind} is not null then ${reports.nativeKind}
  when ${reportTemplates.id} is not null then 'template:' || ${reportTemplates.id}
  when coalesce(${reports.skill}, '') <> '' then ${reports.skill}
  when ${reports.createdBy} in (${APP_REPORT_CREATOR}, ${LEGACY_APP_REPORT_CREATOR}) then 'app-kind-unknown'
  else 'Belirtilmemiş' end`;

export async function listReportInventory(input: ReportInventoryInput) {
  const projectScope = eq(reports.projectId, input.projectId);
  // Parameterized GLOB escapes its metacharacters and supports Latin case pairs.
  const searchScope = input.query.trim()
    ? sql`(${reports.title} || ' ' || ${reports.summary}) glob ${reportSearchPattern(input.query.trim())}`
    : undefined;
  const recentScope = input.recent
    ? gte(reports.updatedAt, new Date(Date.now() - 7 * 86400000).toISOString())
    : undefined;
  const baseScope = and(projectScope, searchScope, recentScope);
  const joinScope = and(
    eq(reportTemplates.id, reports.templateId),
    eq(reportTemplates.projectId, reports.projectId),
  );
  const [projectCount, baseCount, leadingFacets] = await Promise.all([
    db.select({ value: count() }).from(reports).where(projectScope),
    db
      .select({ value: count() })
      .from(reports)
      .leftJoin(reportTemplates, joinScope)
      .where(baseScope),
    db
      .select({
        key: kindExpression,
        name: reportTemplates.name,
        value: count(),
      })
      .from(reports)
      .leftJoin(reportTemplates, joinScope)
      .where(baseScope)
      .groupBy(kindExpression, reportTemplates.name)
      .orderBy(desc(count()), asc(kindExpression))
      .limit(5),
  ]);
  const otherCount =
    (baseCount[0]?.value ?? 0) -
    leadingFacets.reduce((sum, facet) => sum + facet.value, 0);
  const facets =
    otherCount > 0
      ? [...leadingFacets, { key: "__other", name: null, value: otherCount }]
      : leadingFacets;
  const kindScope =
    input.kind === "__other"
      ? leadingFacets.length
        ? notInArray(
            kindExpression,
            leadingFacets.map((facet) => facet.key),
          )
        : undefined
      : input.kind
        ? eq(kindExpression, input.kind)
        : undefined;
  const matchingScope = and(baseScope, kindScope);
  const [matchingCount] = await db
    .select({ value: count() })
    .from(reports)
    .leftJoin(reportTemplates, joinScope)
    .where(matchingScope);
  const totalProject = projectCount[0]?.value ?? 0;
  const totalMatching = matchingCount?.value ?? 0;
  const pageCount = Math.max(
    1,
    Math.ceil(totalMatching / REPORT_INVENTORY_PAGE_SIZE),
  );
  const page = Math.min(input.page, pageCount);
  const order =
    input.sort === "title" ? asc(reports.title) : desc(reports[input.sort]);
  const rows = await db
    .select(metadataColumns)
    .from(reports)
    .leftJoin(reportTemplates, joinScope)
    .where(matchingScope)
    .orderBy(order, desc(reports.id))
    .limit(REPORT_INVENTORY_PAGE_SIZE)
    .offset((page - 1) * REPORT_INVENTORY_PAGE_SIZE);
  const [latest] = await db
    .select(metadataColumns)
    .from(reports)
    .where(projectScope)
    .orderBy(desc(reports.updatedAt), desc(reports.id))
    .limit(1);
  return {
    reports: rows,
    latest: latest ?? null,
    totalProject,
    totalMatching,
    page,
    pageCount,
    facets,
  };
}
