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

export function identifyAnalyticsUser(
  _userId: string,
  _properties?: Record<string, unknown>,
): void {
  // No analytics identity to establish.
}

export function resetAnalyticsUser(): void {
  // No analytics identity to clear.
}

export function startAnalyticsCapture(): void {
  // No capture to start.
}
