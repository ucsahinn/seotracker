import { AuditRepository } from "@/server/features/audit/repositories/AuditRepository";
import { Ga4ConnectionRepository } from "@/server/features/ga4/repositories/Ga4ConnectionRepository";
import { GscConnectionRepository } from "@/server/features/gsc/repositories/GscConnectionRepository";
import { GscSiteDailyRepository } from "@/server/features/gsc/repositories/GscSiteDailyRepository";
import { listProjects } from "@/server/features/projects/services/projects";
import { addIsoDays, gscToday } from "@/shared/dataFreshness";
import { archiveTrend } from "@/shared/archiveTrend";

/**
 * One line of facts per project for the Projects list: clicks over the last
 * 28 archived days against the 28 before, the last finished audit, and which
 * Google sources are connected. Everything is read from this install's own
 * database; nothing calls Google.
 */
async function getOverview(organizationId: string) {
  const projects = await listProjects(organizationId);
  const since = addIsoDays(gscToday(), -120);
  return Promise.all(
    projects.map(async (project) => {
      const [gsc, ga4, days, audits] = await Promise.all([
        GscConnectionRepository.getByProjectId(project.id),
        Ga4ConnectionRepository.getByProjectId(project.id),
        GscSiteDailyRepository.getDays({
          projectId: project.id,
          searchType: "web",
          device: "all",
          since,
        }),
        AuditRepository.getAuditsByProject(project.id),
      ]);
      const lastAudit = audits.find((audit) => audit.status === "completed");
      return {
        projectId: project.id,
        searchConsole: gsc !== null,
        analytics: ga4 !== null,
        clicks: archiveTrend(days),
        lastAuditAt: lastAudit?.startedAt ?? null,
      };
    }),
  );
}

export const ProjectOverviewService = { getOverview };
