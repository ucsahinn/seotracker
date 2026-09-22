import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { GoogleServiceAccountRepository } from "@/server/features/google/GoogleServiceAccountRepository";
import { parseServiceAccountKey } from "@/server/lib/googleServiceAccountKey";
import { clearServiceAccountTokenCache } from "@/server/lib/googleServiceAccountToken";
import { requireAuthenticatedContext } from "@/serverFunctions/middleware";

const saveSchema = z.object({
  /** The whole downloaded file, pasted. Parsed on the server, never echoed. */
  keyJson: z.string().trim().min(1),
});

/**
 * The private key is never sent back to the browser. The page only needs to
 * know whether an account is stored and which one, so that is all this
 * returns — the same rule the OAuth client status follows.
 */
export const getGoogleServiceAccountStatus = createServerFn({ method: "POST" })
  .middleware(requireAuthenticatedContext)
  .handler(async () => {
    const stored = await GoogleServiceAccountRepository.getStatus();
    return {
      clientEmail: stored?.clientEmail ?? null,
      projectId: stored?.projectId ?? null,
      updatedAt: stored?.updatedAt ?? null,
    };
  });

/**
 * A bad key comes back as a value, not an exception.
 *
 * The whole point of parsing here is telling the operator which part of the
 * pasted file is wrong, and a thrown `VALIDATION_ERROR` reaches the browser
 * as the generic "check what you entered" — `toClientError` only lets setup
 * codes keep their message. Same reasoning as `refreshAuditIndexCoverage`
 * returning `needs_gsc` instead of throwing.
 */
export const saveGoogleServiceAccount = createServerFn({ method: "POST" })
  .middleware(requireAuthenticatedContext)
  .validator(saveSchema)
  .handler(async ({ data }) => {
    const parsed = parseServiceAccountKey(data.keyJson);
    if (!parsed.ok) {
      return { ok: false as const, reason: parsed.reason };
    }

    await GoogleServiceAccountRepository.save({
      clientEmail: parsed.key.client_email,
      projectId: parsed.key.project_id ?? null,
      privateKey: parsed.key.private_key,
    });
    // A token minted from the previous key stays valid for up to an hour.
    clearServiceAccountTokenCache();

    return { ok: true as const, clientEmail: parsed.key.client_email };
  });

/**
 * Removing the account falls the install back to the OAuth client, if one is
 * stored. Any connection made through the service account keeps its chosen
 * property and starts working again the moment a credential exists.
 */
export const clearGoogleServiceAccount = createServerFn({ method: "POST" })
  .middleware(requireAuthenticatedContext)
  .handler(async () => {
    await GoogleServiceAccountRepository.clear();
    clearServiceAccountTokenCache();
    return { ok: true as const };
  });
