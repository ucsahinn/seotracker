import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { PageSpeedKeyRepository } from "@/server/features/lighthouse/PageSpeedKeyRepository";
import { PageSpeedKeyTestService } from "@/server/features/lighthouse/services/PageSpeedKeyTestService";
import { getPageSpeedKeySource } from "@/server/features/lighthouse/pagespeed-config";
import { requireAuthenticatedContext } from "@/serverFunctions/middleware";

const saveSchema = z.object({ key: z.string().trim().min(1) });

/**
 * The key is never sent back to the browser. The page only needs to know
 * whether one is stored and where it came from; echoing it would put a
 * billable credential in a response, a cache and a devtools panel for no
 * gain. The Google client secret beside it is handled the same way.
 */
export const getPageSpeedKeyStatus = createServerFn({ method: "POST" })
  .middleware(requireAuthenticatedContext)
  .handler(async () => {
    const [stored, source] = await Promise.all([
      PageSpeedKeyRepository.get(),
      getPageSpeedKeySource(),
    ]);

    return { source, updatedAt: stored?.updatedAt ?? null };
  });

export const savePageSpeedKey = createServerFn({ method: "POST" })
  .middleware(requireAuthenticatedContext)
  .validator(saveSchema)
  .handler(async ({ data }) => {
    await PageSpeedKeyRepository.save(data.key);
    return { ok: true as const };
  });

/**
 * Removing the key does not disable the Lighthouse phase; it drops back to
 * Google's keyless allowance, which answers 429 under almost any real audit.
 */
export const clearPageSpeedKey = createServerFn({ method: "POST" })
  .middleware(requireAuthenticatedContext)
  .handler(async () => {
    await PageSpeedKeyRepository.clear();
    return { ok: true as const };
  });

/**
 * Spends one PageSpeed request on a fixed public page to check that the key
 * works. The reply is a state and a fixed Turkish sentence: no key, no Google
 * message.
 */
export const testPageSpeedKey = createServerFn({ method: "POST" })
  .middleware(requireAuthenticatedContext)
  .handler(async () => PageSpeedKeyTestService.testKey());
