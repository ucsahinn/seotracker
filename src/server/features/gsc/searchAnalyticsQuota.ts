import { GscApiError } from "@/server/lib/gscErrors";

// One self-hosted operator: sharing the limiter across properties also stays
// below Google's 1,200 requests/minute per-user limit (600 starts/minute).
// Isolate-local; other installations still rely on Google's quota refusal.
let queue = Promise.resolve();
let nextStart = 0;
let pausedUntil = 0;

/** Pace page starts; a quota refusal pauses all subsequent reads, not a busy retry loop. */
export async function runSearchAnalyticsRequest<T>(
  load: () => Promise<T>,
): Promise<T> {
  const slot = queue.then(async () => {
    const assertAvailable = () => {
      if (Date.now() < pausedUntil)
        throw new GscApiError(
          429,
          "Search Console quota exceeded. Retry after the fifteen-minute cooldown.",
        );
    };
    assertAvailable();
    const delay = nextStart - Date.now();
    if (delay > 0)
      await new Promise<void>((resolve) => setTimeout(resolve, delay));
    assertAvailable();
    nextStart = Date.now() + 100;
  });
  queue = slot.catch(() => {});
  await slot;
  try {
    return await load();
  } catch (error) {
    if (
      error instanceof GscApiError &&
      (error.status === 429 ||
        (error.status === 403 &&
          /quota|rateLimit|dailyLimit/i.test(error.body ?? "")))
    ) {
      // Google recommends waiting fifteen minutes after a load-quota error.
      // The archive retains its cursor, and the UI can resume on a later run.
      pausedUntil = Date.now() + 15 * 60_000;
      throw new GscApiError(
        429,
        "Search Console quota exceeded. Retry after the fifteen-minute cooldown.",
      );
    }
    throw error;
  }
}
