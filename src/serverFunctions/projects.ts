import { ProjectOverviewService } from "@/server/features/projects/services/ProjectOverviewService";
import { createServerFn } from "@tanstack/react-start";
import { requireOrgPermission } from "@/server/auth/org-gate";
import { ProjectService } from "@/server/features/projects/services/ProjectService";
import {
  requireAuthenticatedContext,
  requireProjectContext,
} from "@/serverFunctions/middleware";
import {
  archiveProjectSchema,
  createProjectSchema,
  restoreProjectSchema,
  setProjectWebsiteSchema,
  updateProjectSchema,
} from "@/types/schemas/projects";
import { z } from "zod";

const projectScopedSchema = z.object({ projectId: z.string().min(1) });

export const getProjects = createServerFn({ method: "POST" })
  .middleware(requireAuthenticatedContext)
  .handler(async ({ context }) =>
    ProjectService.listProjectsEnsuringOne(context.organizationId),
  );

/** Clicks, last audit and connections per project, from the local database only. */
export const getProjectsOverview = createServerFn({ method: "POST" })
  .middleware(requireAuthenticatedContext)
  .handler(async ({ context }) =>
    ProjectOverviewService.getOverview(context.organizationId),
  );

export const createProject = createServerFn({ method: "POST" })
  .middleware(requireAuthenticatedContext)
  .validator(createProjectSchema)
  .handler(async ({ data, context }) => {
    requireOrgPermission(context, { project: ["create"] });
    return ProjectService.createProject(context.organizationId, data);
  });

export const updateProject = createServerFn({ method: "POST" })
  .middleware(requireProjectContext)
  .validator(updateProjectSchema)
  .handler(async ({ data, context }) =>
    ProjectService.updateProject(context.organizationId, data),
  );

export const archiveProject = createServerFn({ method: "POST" })
  .middleware(requireProjectContext)
  .validator(archiveProjectSchema)
  .handler(async ({ data, context }) => {
    requireOrgPermission(context, { project: ["delete"] });
    return ProjectService.archiveProject(context.organizationId, data);
  });

export const getArchivedProjects = createServerFn({ method: "POST" })
  .middleware(requireAuthenticatedContext)
  .handler(async ({ context }) =>
    ProjectService.listArchivedProjects(context.organizationId),
  );

export const restoreProject = createServerFn({ method: "POST" })
  .middleware(requireAuthenticatedContext)
  .validator(restoreProjectSchema)
  .handler(async ({ data, context }) => {
    requireOrgPermission(context, { project: ["delete"] });
    return ProjectService.restoreProject(context.organizationId, data);
  });

export const getProjectAccess = createServerFn({ method: "POST" })
  .middleware(requireAuthenticatedContext)
  .validator(projectScopedSchema)
  .handler(async ({ data, context }) => {
    return ProjectService.getProjectForOrganization(
      context.organizationId,
      data.projectId,
    );
  });

export const setProjectWebsite = createServerFn({ method: "POST" })
  .middleware(requireProjectContext)
  .validator(setProjectWebsiteSchema)
  .handler(({ data, context }) =>
    ProjectService.setProjectWebsite(context.organizationId, data),
  );
