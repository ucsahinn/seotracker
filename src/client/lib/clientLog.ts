/**
 * What went wrong in the browser, kept until someone asks for it.
 *
 * The server writes its errors to the container log, where `docker compose
 * logs` finds them. The browser had nowhere: a failed render or a rejected
 * request left a line in a console nobody had open, and by the time the
 * operator writes the report the tab has been reloaded. This is the other
 * half of that pair, and it is the reason a diagnostics bundle is worth
 * more than a screenshot.
 *
 * In memory only. Nothing is sent anywhere, and a reload clears it — this
 * is a buffer for the session the operator is reporting about, not a log
 * file. `sessionStorage` would survive the reload but would also mean the
 * tool quietly keeps a record of its own failures on someone's disk, which
 * is not a thing to do without asking.
 */

type ClientLogEntry = {
  at: string;
  level: "error" | "warn" | "info";
  message: string;
  /** Where it happened, as the app's own route rather than the full URL. */
  route?: string;
  detail?: string;
};

/*
 * A ring, so a page that throws in a render loop cannot grow this without
 * bound. Oldest entries fall off; the newest are the ones being reported.
 */
const LIMIT = 100;
const entries: ClientLogEntry[] = [];

/** Long stacks are the bulk of a bundle and the tail is rarely the answer. */
const MAX_DETAIL = 2000;

export function logClientEvent(
  level: ClientLogEntry["level"],
  message: string,
  detail?: unknown,
): void {
  entries.push({
    at: new Date().toISOString(),
    level,
    message: String(message).slice(0, 500),
    route: currentRoute(),
    detail: describe(detail),
  });
  if (entries.length > LIMIT) entries.splice(0, entries.length - LIMIT);
}

export function readClientLog(): ClientLogEntry[] {
  return [...entries];
}

/**
 * Attaches the global handlers. Called once, from the app root.
 *
 * `window.onerror` and `unhandledrejection` between them catch the two ways
 * a React app fails without telling anyone: a throw outside a boundary, and
 * a promise nobody awaited — which is most of a failed mutation.
 */
export function startClientLog(): void {
  if (typeof window === "undefined") return;

  window.addEventListener("error", (event) => {
    logClientEvent(
      "error",
      event.message || "Uncaught error",
      event.error ?? `${event.filename}:${event.lineno}:${event.colno}`,
    );
  });

  window.addEventListener("unhandledrejection", (event) => {
    logClientEvent("error", "Unhandled promise rejection", event.reason);
  });
}

/*
 * The path, with ids stripped. A route is what a reader needs to find the
 * screen; the project and audit ids in it are the operator's data, and they
 * are already in the bundle where they belong.
 */
function currentRoute(): string | undefined {
  if (typeof window === "undefined") return undefined;
  return window.location.pathname
    .replace(
      /\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/gi,
      "/:id",
    )
    .slice(0, 200);
}

function describe(detail: unknown): string | undefined {
  if (detail === undefined || detail === null) return undefined;
  if (detail instanceof Error) {
    return (detail.stack ?? `${detail.name}: ${detail.message}`).slice(
      0,
      MAX_DETAIL,
    );
  }
  if (typeof detail === "string") return detail.slice(0, MAX_DETAIL);
  try {
    return JSON.stringify(detail)?.slice(0, MAX_DETAIL);
  } catch {
    /*
     * A cyclic value, or one whose toJSON throws. `String(detail)` on an
     * object is "[object Object]", which tells a reader nothing, so name
     * the shape instead.
     */
    return `[unserialisable ${typeof detail}]`;
  }
}
