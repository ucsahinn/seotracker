import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { GoogleOAuthClientRepository } from "@/server/features/google/GoogleOAuthClientRepository";
import { getGoogleOAuthClientSource } from "@/server/features/google/oauth-config";
import { requireAuthenticatedContext } from "@/serverFunctions/middleware";

const saveSchema = z.object({
  clientId: z.string().trim().min(1),
  clientSecret: z.string().trim().min(1),
});

/**
 * The client secret is never sent back to the browser. The page only needs to
 * know whether one is stored and which client it belongs to; echoing the
 * secret would put it in a response, a cache and a devtools panel for no gain.
 */
export const getGoogleOAuthClientStatus = createServerFn({ method: "POST" })
  .middleware(requireAuthenticatedContext)
  .handler(async () => {
    const [stored, source] = await Promise.all([
      GoogleOAuthClientRepository.get(),
      getGoogleOAuthClientSource(),
    ]);

    return {
      source,
      clientId: stored?.clientId ?? null,
      updatedAt: stored?.updatedAt ?? null,
    };
  });

export const saveGoogleOAuthClient = createServerFn({ method: "POST" })
  .middleware(requireAuthenticatedContext)
  .validator(saveSchema)
  .handler(async ({ data }) => {
    await GoogleOAuthClientRepository.save(data);
    return { ok: true as const };
  });

/**
 * Removing the credentials leaves any Google connection made with them in
 * place but unusable, which is the same state as never having configured one.
 */
export const clearGoogleOAuthClient = createServerFn({ method: "POST" })
  .middleware(requireAuthenticatedContext)
  .handler(async () => {
    await GoogleOAuthClientRepository.clear();
    return { ok: true as const };
  });
