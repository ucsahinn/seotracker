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
 * A 403 here is almost always the same thing: the Chrome UX Report API is a
 * separate switch in the key's Google Cloud project, off by default, while the
 * PageSpeed key works. Say that, instead of a bare status code.
 */
async function describeFailure(response: Response): Promise<string> {
  if (response.status === 429) return "Google'ın istek sınırı doldu.";
  if (response.status === 403 || response.status === 401) {
    return 'Google bu anahtara izin vermedi. Anahtarın Google Cloud projesinde "Chrome UX Report API" etkin olmalı ve anahtarın API kısıtlamasında yer almalı; ikisini de kontrol edip tekrar deneyin.';
  }
  return `Google yanıt vermedi (${response.status}).`;
}
