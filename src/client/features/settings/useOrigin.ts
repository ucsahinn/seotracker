import * as React from "react";

/**
 * This install's origin, which is what Google must be given as a redirect
 * URI and what an MCP client must be pointed at. Read after mount: the server
 * renders without a `window`, so reading it during render made the first
 * client render differ from the server's whenever the app was opened on
 * anything but localhost:3001 (127.0.0.1, a LAN name, another port) -- a
 * hydration mismatch on the very value the operator is about to copy.
 */
export function useOrigin(): string {
  const [origin, setOrigin] = React.useState("http://localhost:3001");
  React.useEffect(() => setOrigin(window.location.origin), []);
  return origin;
}
