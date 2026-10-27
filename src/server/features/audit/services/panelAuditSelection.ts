import { AuditRepository } from "../repositories/AuditRepository";
import { ProjectRepository } from "@/server/features/projects/repositories/ProjectRepository";
import { siteKey } from "@/shared/auditTodo";
import { selectPanelAudits } from "@/shared/panelAudit";
export async function getPanelAuditSelection(projectId: string) {
  const [project, audits] = await Promise.all([
    ProjectRepository.getProjectById(projectId),
    AuditRepository.getAuditsByProject(projectId),
  ]);
  const selected = selectPanelAudits(audits, project?.domain ?? null);
  const previous = selected.snapshot
    ? (audits.find(
        (a) =>
          a.status === "completed" &&
          a.id !== selected.snapshot!.id &&
          a.startedAt < selected.snapshot!.startedAt &&
          siteKey(a.startUrl) === siteKey(selected.snapshot!.startUrl),
      ) ?? null)
    : null;
  return {
    previous,
    domain: project?.domain ?? null,
    ...selected,
  };
}
