import { afterEach, expect, it, vi } from "vitest";
import { WindowsSettingsRepository } from "./WindowsSettingsRepository";

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

it("uses the Workers-compatible manual mode and refuses native redirects", async () => {
  vi.stubEnv("WINDOWS_SETTINGS_PORT", "12345");
  vi.stubEnv("WINDOWS_SETTINGS_TOKEN", "a".repeat(64));
  const fetchMock = vi.fn(async (_url: string, _init: RequestInit) => {
    return new Response(null, {
      status: 302,
      headers: { Location: "https://example.com/" },
    });
  });
  vi.stubGlobal("fetch", fetchMock);
  await expect(WindowsSettingsRepository.read()).rejects.toThrow(
    "Windows settings unavailable",
  );
  expect(fetchMock).toHaveBeenCalledOnce();
  // Workers rejects redirect:error before sending any request.
  expect(fetchMock.mock.calls[0][1].redirect).toBe("manual");
});
