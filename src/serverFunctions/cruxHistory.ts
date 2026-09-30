import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getPageSpeedApiKey } from "@/server/features/lighthouse/pagespeed-config";
import {
  fetchCruxHistory,
  type CruxHistoryResult,
} from "@/server/lib/cruxHistory";
import { requireAuthenticatedContext } from "@/serverFunctions/middleware";

const inputSchema = z.object({
  /** Any address on the site; only its origin is sent to Google. */
  url: z.string().url().max(2048),
  formFactor: z.enum(["PHONE", "DESKTOP"]),
});

type CruxHistoryResponse = CruxHistoryResult | { status: "no_key" };

/**
 * Expected outcomes come back as a status, not a thrown error: "no key" and
 * "too little traffic" are states the card explains, not failures.
 */
export const getCruxHistory = createServerFn({ method: "POST" })
  .middleware(requireAuthenticatedContext)
  .validator(inputSchema)
  .handler(async ({ data }): Promise<CruxHistoryResponse> => {
    const url = new URL(data.url);
    if (url.protocol !== "https:" && url.protocol !== "http:") {
      return { status: "no_data" };
    }
    const apiKey = await getPageSpeedApiKey();
    if (!apiKey) return { status: "no_key" };
    return fetchCruxHistory({
      origin: url.origin,
      formFactor: data.formFactor,
      apiKey,
    });
  });
