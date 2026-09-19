/**
 * Local-only observability. Nothing leaves the browser: this install reports to
 * no analytics or error service. The call sites stay so a future local sink has
 * one place to attach.
 */

export function captureClientEvent(
  _event: string,
  _properties?: Record<string, unknown>,
): void {
  // Product analytics are deliberately not collected.
}

export function captureClientError(
  error: unknown,
  context?: Record<string, unknown>,
): void {
  console.error("error:", error, context ?? {});
}
