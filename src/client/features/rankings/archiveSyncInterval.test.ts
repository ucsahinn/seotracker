import { expect, it } from "vitest";
import { archiveSyncInterval } from "./archiveSyncInterval";

it("continues a partial archive automatically and refreshes a caught-up archive", () => {
  expect(archiveSyncInterval({ hasMore: true, error: null })).toBe(15_000);
  expect(archiveSyncInterval({ hasMore: false, error: null })).toBe(900_000);
});

it("backs off quota and network failures but waits for operator action on authentication", () => {
  expect(
    archiveSyncInterval({
      hasMore: false,
      error: "failed",
      errorCode: "quota",
    }),
  ).toBe(900_000);
  expect(archiveSyncInterval(undefined, true)).toBe(900_000);
  expect(archiveSyncInterval({ error: "failed", errorCode: "auth" })).toBe(
    false,
  );
  expect(archiveSyncInterval({ notConnected: true })).toBe(false);
});
