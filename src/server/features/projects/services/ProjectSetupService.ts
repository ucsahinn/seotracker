import { ActivationRepository } from "@/server/features/activation/repositories/ActivationRepository";
import { AuditRepository } from "@/server/features/audit/repositories/AuditRepository";
import { Ga4ConnectionRepository } from "@/server/features/ga4/repositories/Ga4ConnectionRepository";
import { GscConnectionRepository } from "@/server/features/gsc/repositories/GscConnectionRepository";
import { getPageSpeedKeySource } from "@/server/features/lighthouse/pagespeed-config";
import { ProjectContextRepository } from "@/server/features/project-context/repositories/ProjectContextRepository";
import { parseTimestamp } from "@/shared/format";
import { hasFreshOwnAudit, type SetupSignals } from "@/shared/projectSetup";
import { PROJECT_CONTEXT_SECTION_KEYS } from "@/types/schemas/projectContext";

/**
 * Every signal the shared setup checklist needs, read in one call so the
 * dashboard, Proje bilgisi and anything else that asks get the same answer.
 * A read that fails becomes `null` (unknown) rather than "missing".
 */
/** A read that fails becomes `{ ok: false }` instead of failing the call. */
function settle<T>(promise: Promise<T>) {
  return promise.then(
    (value) => ({ ok: true as const, value }),
    () => ({ ok: false as const }),
  );
}

async function getSignals(input: {
  projectId: string;
  organizationId: string;
  domain: string | null;
  now?: number;
}): Promise<SetupSignals & { missingSections: number }> {
  const [gsc, ga4, audits, sections, pageSpeed, activation] = await Promise.all(
    [
      settle(GscConnectionRepository.getByProjectId(input.projectId)),
      settle(Ga4ConnectionRepository.getByProjectId(input.projectId)),
      settle(AuditRepository.getAuditsByProject(input.projectId)),
      settle(ProjectContextRepository.listSections(input.projectId)),
      settle(getPageSpeedKeySource()),
      settle(
        ActivationRepository.getOrganizationActivation(input.organizationId),
      ),
    ],
  );
  const now = input.now ?? Date.now();
  const stored = sections.ok
    ? new Set(sections.value.map((row) => row.key))
    : null;
  const missingSections = stored
    ? PROJECT_CONTEXT_SECTION_KEYS.filter((key) => !stored.has(key)).length
    : 0;
  return {
    searchConsole: gsc.ok ? gsc.value !== null : null,
    analytics: ga4.ok ? ga4.value !== null : null,
    audit: audits.ok
      ? hasFreshOwnAudit(
          audits.value.map((audit) => ({
            status: audit.status,
            startUrl: audit.startUrl,
            startedAt: parseTimestamp(audit.startedAt),
          })),
          input.domain,
          now,
        )
      : null,
    projectInfo: stored ? missingSections === 0 : null,
    pageSpeed: pageSpeed.ok ? pageSpeed.value !== null : null,
    agent: activation.ok
      ? (activation.value?.firstMcpToolCallAt ?? null) !== null
      : null,
    missingSections,
  };
}

export const ProjectSetupService = { getSignals };
