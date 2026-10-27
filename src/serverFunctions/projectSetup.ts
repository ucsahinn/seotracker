import { createServerFn } from "@tanstack/react-start";
import { ProjectSetupService } from "@/server/features/projects/services/ProjectSetupService";
import { requireProjectContext } from "@/serverFunctions/middleware";
import { dashboardProjectInputSchema } from "@/types/schemas/dashboard";

/** The shared setup checklist's signals for one project (see shared/projectSetup). */
export const getProjectSetup = createServerFn({ method: "POST" })
  .middleware(requireProjectContext)
  .validator(dashboardProjectInputSchema)
  .handler(({ context }) =>
    ProjectSetupService.getSignals({
      projectId: context.projectId,
      organizationId: context.organizationId,
      domain: context.project.domain,
    }),
  );
