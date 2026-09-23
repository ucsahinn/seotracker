import { createServerFn } from "@tanstack/react-start";
import { ActivationRepository } from "@/server/features/activation/repositories/ActivationRepository";
import { getOptionalEnvValue } from "@/server/lib/runtime-env";
import { requireAuthenticatedContext } from "@/serverFunctions/middleware";

/**
 * Whether an AI agent has ever reached this install, and when it last did.
 *
 * Organization-scoped rather than project-scoped, because the agent setup
 * page has no project: an MCP client is configured once for the install, not
 * per project.
 *
 * Two states, and the wording is load-bearing. The page says **bağlandı**
 * (past tense), never **bağlı** (present) — this transport is stateless HTTP
 * with no session to observe, so an agent that configured the server this
 * morning and is idle is indistinguishable from one that was uninstalled.
 * Recency is genuinely known; "connected right now" is not, and rendering it
 * would be a guess dressed as a fact.
 */
export const getAgentConnection = createServerFn({ method: "POST" })
  .middleware(requireAuthenticatedContext)
  .handler(async ({ context }) => {
    const activation = await ActivationRepository.getOrganizationActivation(
      context.organizationId,
    );

    return {
      lastCallAt: activation?.lastMcpToolCallAt ?? null,
      /** The client's own word for itself. A hint for display, never an identity. */
      clientLabel: activation?.lastMcpClientLabel ?? null,
      firstCallAt: activation?.firstMcpToolCallAt ?? null,
      /*
       * Whether a shared secret is set. Only the fact, never the value - the
       * page said flatly "this address requires no authentication", which was
       * a lie on any install that had set one.
       */
      tokenConfigured: Boolean(
        (await getOptionalEnvValue("MCP_TOKEN"))?.trim(),
      ),
    };
  });
