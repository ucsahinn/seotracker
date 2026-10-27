import { afterEach, describe, expect, it, vi } from "vitest";
import { getPortFacts, getPortFallback } from "./port-fallback";

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("getPortFallback", () => {
  it("reads the launcher's configured->actual pair", async () => {
    vi.stubEnv("WINDOWS_PORT_FALLBACK", "8787->8788");
    expect(await getPortFallback()).toEqual({
      configured: 8787,
      actual: 8788,
    });
  });

  it.each(["", "8787", "8787->8787", "abc->8788", "8787->70000"])(
    "ignores %j",
    async (value) => {
      vi.stubEnv("WINDOWS_PORT_FALLBACK", value);
      expect(await getPortFallback()).toBeNull();
    },
  );
});

describe("getPortFacts", () => {
  it("prefers the launcher's fallback over the request URL", async () => {
    vi.stubEnv("WINDOWS_PORT_FALLBACK", "8787->8788");
    expect(await getPortFacts("http://localhost:9999/api/health")).toEqual({
      configured: 8787,
      actual: 8788,
      fallback: { configured: 8787, actual: 8788 },
    });
  });

  it("reads the port off the request URL; configured is known only on Windows", async () => {
    vi.stubEnv("WINDOWS_PORT_FALLBACK", "");
    const url = "http://localhost:3001/api/health";
    expect(await getPortFacts(url, "windows")).toMatchObject({
      configured: 3001,
      actual: 3001,
      fallback: null,
    });
    expect(await getPortFacts(url, "docker")).toMatchObject({
      configured: null,
      actual: 3001,
    });
  });
});
