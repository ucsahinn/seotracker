import { createMiddleware } from "@tanstack/react-start";
import { z } from "zod";
import { AppError } from "@/server/lib/errors";
import { errorHandlingMiddleware } from "@/middleware/errorHandling";
import type { EnsuredUserContext } from "@/middleware/ensure-user/types";
import { ensureUserMiddleware } from "@/middleware/ensureUser";

const ensuredUserContextSchema: z.ZodType<EnsuredUserContext> = z.object({
  userId: z.string(),
  userEmail: z.string(),
  emailVerified: z.boolean(),
  organizationId: z.string(),
  role: z.string(),
  project: z.any().optional(),
});

function getAuthenticatedContext(context: unknown): EnsuredUserContext {
  const result = ensuredUserContextSchema.safeParse(context);
  if (!result.success) {
    throw new AppError(
      "INTERNAL_ERROR",
      "Authenticated server function context missing",
    );
  }
  return result.data;
}

/*
 * No CSRF middleware here on purpose. A security pass flagged the absence as
 * a likely hole -- in `local_noauth` the operator's browser is an
 * authenticated client, so any page they visit could in principle drive a
 * write. Measured against the running container instead of assumed: a POST to
 * `/_serverFn/<id>` answers 403 Forbidden for a cross-site `Origin`, for a
 * simple content type that skips preflight (`text/plain`,
 * `application/x-www-form-urlencoded`), and for a request carrying no
 * `Origin` at all. Only a same-origin request reaches the handler. The
 * protection is one registration, `createCsrfMiddleware` in `src/start.ts`,
 * and `startInstance.test.ts` asserts it is still there -- because the
 * paragraph you are reading would otherwise talk the next reader out of
 * noticing its removal as effectively as it talks them out of adding a
 * second one.
 */
export const globalServerFunctionMiddleware = [
  errorHandlingMiddleware,
  ensureUserMiddleware,
] as const;

export const requireAuthenticatedContext = [
  createMiddleware({ type: "function" }).server(async ({ next, context }) => {
    const authenticatedContext = getAuthenticatedContext(context);

    return next({
      context: authenticatedContext,
    });
  }),
] as const;

export const requireProjectContext = [
  createMiddleware({ type: "function" }).server(async ({ next, context }) => {
    const authenticatedContext = getAuthenticatedContext(context);

    if (!authenticatedContext.project) {
      throw new AppError(
        "INTERNAL_ERROR",
        "Project context missing from authenticated server function",
      );
    }

    return next({
      context: {
        ...authenticatedContext,
        project: authenticatedContext.project,
        projectId: authenticatedContext.project.id,
      },
    });
  }),
] as const;
