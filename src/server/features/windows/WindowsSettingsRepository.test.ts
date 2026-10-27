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

/*
 * server.log (installed 0.7.0): "Windows settings unavailable" with no cause.
 * Each way the bridge can fail now says which one it was.
 */
it.each([
  [new DOMException("signal timed out", "TimeoutError"), "timeout", null],
  [new TypeError("connect ECONNREFUSED 127.0.0.1:12345"), "connect", null],
  [new Response("locked", { status: 409 }), "status", 409],
  [Response.json({ autostart: "yes" }), "parse", null],
] as const)("tells the failure apart (%#)", async (reply, failure, status) => {
  vi.stubEnv("WINDOWS_SETTINGS_PORT", "12345");
  vi.stubEnv("WINDOWS_SETTINGS_TOKEN", "a".repeat(64));
  vi.stubGlobal(
    "fetch",
    vi.fn(async () => {
      if (reply instanceof Response) return reply;
      throw reply;
    }),
  );

  await expect(WindowsSettingsRepository.read()).rejects.toMatchObject({
    name: "WindowsSettingsBridgeError",
    failure,
    httpStatus: status,
  });
});
