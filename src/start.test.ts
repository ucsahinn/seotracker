import { describe, expect, it, vi } from "vitest";

// `start.ts` reaches the global server-function middleware, which imports
// `waitUntil` from the workers runtime. Module mock, the pattern this suite
// already uses (see `ActivationRepository.test.ts`). `vi.mock` is hoisted
// above the top-level await below, which is what makes that import safe --
// and a top-level one rather than a per-test `await import()`, which pulls
// the whole middleware graph on every run and tipped this test past the
// five-second default under full-suite parallelism.
vi.mock("cloudflare:workers", () => ({
  env: {},
  waitUntil: () => undefined,
}));

const { startOptions } = await import("./start");

/*
 * One `createCsrfMiddleware` registration is all that stands between every
 * write server function and CSRF. A security pass measured the 403 against
 * the running container and wrote the conclusion into a comment in
 * `serverFunctions/middleware.ts` -- which then read as "the framework does
 * this for us", and would have talked the next reader out of noticing the
 * line's removal as effectively as out of adding a second one. This fails
 * instead.
 */
describe("startOptions", () => {
  it("registers request middleware, which is the CSRF filter", () => {
    expect(startOptions.requestMiddleware).toHaveLength(1);
  });
});
