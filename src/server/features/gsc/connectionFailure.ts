import {
  GscNotConnectedError,
  type GscService,
  isExpectedGrantFailure,
} from "@/server/features/gsc/services/GscService";

/** Not connected, or a dead/denied grant (token failure or 401/403): the page
 *  renders the connect card. Other statuses (429, 5xx) are real faults. */
export function isExpectedConnectionFailure(error: unknown): boolean {
  return error instanceof GscNotConnectedError || isExpectedGrantFailure(error);
}

type GscRows = Awaited<ReturnType<typeof GscService.getPerformance>>["rows"];

/**
 * The device and appearance rings are optional extras. A 400/429/5xx on one of
 * them must not take the whole report down ("yüklenemedi"); the ring simply
 * stays empty. Connection failures still propagate so the connect card shows.
 */
export async function optionalRows(
  call: Promise<{ rows: GscRows }>,
): Promise<GscRows> {
  try {
    return (await call).rows;
  } catch (error) {
    if (isExpectedConnectionFailure(error)) throw error;
    return [];
  }
}
