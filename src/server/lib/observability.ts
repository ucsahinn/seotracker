/**
 * Local-only observability. This install reports to nobody: errors go to the
 * container log, where `docker compose logs` picks them up, and product events
 * are dropped. The call sites are kept so a future local sink (a table, a log
 * file) has one place to attach.
 */

export function captureServerError(
  error: unknown,
  context?: Record<string, unknown>,
  _distinctId?: string,
): Promise<void> {
  console.error("error:", error, context ?? {});
  return Promise.resolve();
}

export function captureServerEvent(_event: {
  distinctId: string;
  event: string;
  organizationId?: string;
  properties?: Record<string, unknown>;
}): Promise<void> {
  // Product analytics are deliberately not collected.
  return Promise.resolve();
}
