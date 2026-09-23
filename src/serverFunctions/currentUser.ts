import { createServerFn } from "@tanstack/react-start";
import { requireAuthenticatedContext } from "@/serverFunctions/middleware";

/**
 * Who this request resolved to.
 *
 * The sidebar used better-auth's `useSession()`, which posts to
 * `/api/auth/get-session` -- an endpoint no route in this app mounts. It
 * answered 404 on every page load in both auth modes, so the account menu it
 * fed was unreachable and the console carried a failed request on every
 * navigation. Nobody signs in here; the identity is resolved per request from
 * the auth mode and is already sitting in the server-function context, so
 * reading it from there is both correct and one hop shorter.
 */
export const getCurrentUser = createServerFn({ method: "POST" })
  .middleware(requireAuthenticatedContext)
  .handler(({ context }) => ({ email: context.userEmail }));
