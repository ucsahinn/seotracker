/**
 * Whether an MCP request carries the shared secret, with no I/O.
 *
 * Split from `transport.ts` so it can be tested directly: the transport
 * around it needs an MCP handler, an execution context and a resolved
 * identity, none of which this decision depends on.
 */

/**
 * Compare without leaking the answer in how long it takes.
 *
 * Over loopback the timing channel is not the realistic threat, but a token
 * check is exactly the place where a lazy `===` becomes the example someone
 * copies into a context where it does matter.
 */
function tokenMatches(presented: string, expected: string): boolean {
  if (presented.length !== expected.length) return false;
  let diff = 0;
  for (let index = 0; index < presented.length; index += 1) {
    diff |= presented.charCodeAt(index) ^ expected.charCodeAt(index);
  }
  return diff === 0;
}

/**
 * Is this request allowed through?
 *
 * With no token configured every request passes, which keeps the documented
 * setup working: the container binds to loopback, the handler already rejects
 * cross-origin browser calls, and the operator is the only user. What that
 * does not cover is another process on the same machine -- a sibling
 * container, or an agent someone pointed here -- reaching 28 tools, six of
 * which write and one of which spends Google's daily quota. `MCP_TOKEN`
 * closes that without changing anything for an install that does not need it.
 */
export function isMcpRequestAuthorized(
  authorizationHeader: string | null,
  expectedToken: string | undefined,
): boolean {
  const expected = expectedToken?.trim();
  if (!expected) return true;

  const presented = authorizationHeader?.replace(/^Bearer\s+/i, "").trim();
  return Boolean(presented) && tokenMatches(presented!, expected);
}
