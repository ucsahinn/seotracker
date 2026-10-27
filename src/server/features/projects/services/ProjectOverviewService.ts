import { AuditRepository } from "@/server/features/audit/repositories/AuditRepository";
import { Ga4ConnectionRepository } from "@/server/features/ga4/repositories/Ga4ConnectionRepository";
import { GscConnectionRepository } from "@/server/features/gsc/repositories/GscConnectionRepository";
import { GscSiteDailyRepository } from "@/server/features/gsc/repositories/GscSiteDailyRepository";
import { listProjects } from "@/server/features/projects/services/projects";
import { addIsoDays, gscToday } from "@/shared/dataFreshness";
import { archiveTrend } from "@/shared/archiveTrend";
import { auditIsStale, selectPanelAudits } from "@/shared/panelAudit";
import { siteKey } from "@/shared/auditTodo";
import { parseTimestamp } from "@/shared/format";

/** A failed local read is unknown, never disconnected or an empty measured total. */
function settle<T>(promise: Promise<T>) {
  return promise.then(
    (value) => ({ ok: true as const, value }),
    () => ({ ok: false as const }),
  );
}

/** D1-only portfolio facts. No Google request or automatic audit is started here. */
async function getOverview(organizationId: string) {
  const projects = await listProjects(organizationId);
  const since = addIsoDays(gscToday(), -120);
  const now = Date.now();
  return Promise.all(
    projects.map(async (project) => {
      const [gsc, ga4, days, audits] = await Promise.all([
        settle(GscConnectionRepository.getByProjectId(project.id)),
        settle(Ga4ConnectionRepository.getByProjectId(project.id)),
        settle(
          GscSiteDailyRepository.getDays({
            projectId: project.id,
            searchType: "web",
            device: "all",
            since,
          }),
        ),
        settle(AuditRepository.getAuditsByProject(project.id)),
      ]);
      const selected = audits.ok
        ? selectPanelAudits(audits.value, project.domain)
        : null;
      const auditFact = (audit: NonNullable<typeof selected>["snapshot"]) =>
        audit
          ? {
              id: audit.id,
              startUrl: audit.startUrl,
              siteKey: siteKey(audit.startUrl),
              status: audit.status,
              startedAt: audit.startedAt,
              completedAt: audit.completedAt,
              stale: auditIsStale(parseTimestamp(audit.startedAt), now),
            }
          : null;
      return {
        projectId: project.id,
        searchConsole: gsc.ok ? gsc.value !== null : null,
        analytics: ga4.ok ? ga4.value !== null : null,
        property: gsc.ok ? (gsc.value?.siteUrl ?? null) : null,
        archiveStatus: days.ok
          ? ("available" as const)
          : ("unavailable" as const),
        auditStatus: audits.ok
          ? ("available" as const)
          : ("unavailable" as const),
        clicks: days.ok ? archiveTrend(days.value) : null,
        snapshot: auditFact(selected?.snapshot ?? null),
        latestAttempt: auditFact(selected?.latestAttempt ?? null),
      };
    }),
  );
}
export const ProjectOverviewService = { getOverview };
