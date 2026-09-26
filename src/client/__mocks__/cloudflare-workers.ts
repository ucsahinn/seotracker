/**
 * A stand-in for `cloudflare:workers` in the render suite.
 *
 * Client components in this app import server functions for their types and
 * their call signatures, and those modules reach the workers runtime. The
 * module does not exist outside workerd, so without this alias every render
 * test fails at transform time on an import it never actually calls.
 */
export const env: Record<string, unknown> = {};
export function waitUntil(): void {}
