import { z } from "zod";
import {
  CRUX_API_METRICS,
  parseCruxHistory,
  type CruxSeries,
} from "@/shared/cruxHistory";

const ENDPOINT =
  "https://chromeuxreport.googleapis.com/v1/records:queryHistoryRecord";
const TIMEOUT_MS = 15_000;
/** Six months of weekly windows; the API allows 1..40, default 25. */
const PERIOD_COUNT = 26;

type CruxHistoryFormFactor = "PHONE" | "DESKTOP";

export type CruxHistoryResult =
  | { status: "ok"; series: CruxSeries[] }
  /** The API answers 404 for an origin Chrome has too few visitors for. */
  | { status: "no_data" }
  | { status: "error"; message: string };

/**
 * One origin's weekly p75 history. The key goes in the `key` query parameter
 * as Google requires and is never logged or put in a returned message.
 */
export async function fetchCruxHistory(input: {
  origin: string;
  formFactor: CruxHistoryFormFactor;
  apiKey: string;
}): Promise<CruxHistoryResult> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(
      `${ENDPOINT}?key=${encodeURIComponent(input.apiKey)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          origin: input.origin,
          formFactor: input.formFactor,
          metrics: Object.values(CRUX_API_METRICS),
          collectionPeriodCount: PERIOD_COUNT,
        }),
        signal: controller.signal,
      },
    );

    if (response.status === 404) return { status: "no_data" };
    if (!response.ok) {
      return { status: "error", message: await describeFailure(response) };
    }

    const series = parseCruxHistory(await response.json());
    if (!series) {
      return {
        status: "error",
        message: "Google beklenmedik bir yanıt verdi.",
      };
    }
    return series.length === 0
      ? { status: "no_data" }
      : { status: "ok", series };
  } catch {
    return { status: "error", message: "Google'a ulaşılamadı." };
  } finally {
    clearTimeout(timeout);
  }
}

/*
 * A 403 here is almost always one of two things, and Google says which in the
 * body: the Chrome UX Report API is a separate switch in the key's Cloud
 * project (off by default, while the PageSpeed key works), or the key's API
 * restriction leaves it out. Read the reason instead of guessing.
 */
async function describeFailure(response: Response): Promise<string> {
  if (response.status === 429) return "Google'ın istek sınırı doldu.";
  if (response.status === 403 || response.status === 401) {
    const reason = await googleReason(response);
    if (/API_KEY_SERVICE_BLOCKED|blocked|restriction/i.test(reason)) {
      return `Anahtarın API kısıtlaması "Chrome UX Report API"yi dışarıda bırakıyor. Google Cloud Console'da anahtarın kısıtlamasına ekleyip tekrar deneyin.`;
    }
    if (/SERVICE_DISABLED|has not been used|is disabled/i.test(reason)) {
      return `Anahtarın Google Cloud projesinde "Chrome UX Report API" etkin değil. Google Cloud Console'da API bölümünden etkinleştirip tekrar deneyin.`;
    }
    return `Google bu anahtara izin vermedi${reason ? ` (${reason})` : ""}. Anahtarın Google Cloud projesinde "Chrome UX Report API" etkin olmalı ve anahtarın kısıtlamasında yer almalı.`;
  }
  return `Google yanıt vermedi (${response.status}).`;
}

/** Google's error code and reason strings, never the message text (it can echo the project id). */
async function googleReason(response: Response): Promise<string> {
  try {
    const body: unknown = await response.json();
    const parsed = z
      .object({
        error: z.object({
          status: z.string().optional(),
          details: z
            .array(z.object({ reason: z.string().optional() }))
            .optional(),
          message: z.string().optional(),
        }),
      })
      .safeParse(body);
    if (!parsed.success) return "";
    const { status, details, message } = parsed.data.error;
    const reasons = (details ?? []).map((d) => d.reason).filter(Boolean);
    const flag = /has not been used|is disabled|blocked/i.exec(message ?? "");
    return [status, ...reasons, flag?.[0]].filter(Boolean).join(", ");
  } catch {
    return "";
  }
}
