import { beforeEach, expect, it, vi } from "vitest";
import { WindowsSettingsBridgeError } from "./WindowsSettingsRepository";
import { WindowsSettingsService } from "./WindowsSettingsService";

const mocks = vi.hoisted(() => ({
  kind: vi.fn(),
  read: vi.fn(),
  set: vi.fn(),
}));
vi.mock("@/server/lib/install-kind", () => ({ getInstallKind: mocks.kind }));
vi.mock("./WindowsSettingsRepository", async (importOriginal) => ({
  ...(await importOriginal<object>()),
  WindowsSettingsRepository: { read: mocks.read, set: mocks.set },
}));
beforeEach(() => mocks.kind.mockResolvedValue("windows"));

it("does not contact a native bridge in Docker", async () => {
  mocks.kind.mockResolvedValue("docker");
  expect(await WindowsSettingsService.getStatus()).toEqual({
    status: "unsupported",
  });
  await expect(WindowsSettingsService.set("autostart", true)).rejects.toThrow();
  expect(mocks.read).not.toHaveBeenCalled();
  expect(mocks.set).not.toHaveBeenCalled();
});
it("distinguishes an older launcher from a ready native bridge", async () => {
  mocks.read.mockResolvedValue(null);
  expect(await WindowsSettingsService.getStatus()).toEqual({
    status: "unavailable",
  });
  const settings = {
    autostart: true,
    autostartManaged: true,
    autoUpdate: false,
    autoUpdateManaged: false,
  };
  mocks.read.mockResolvedValue(settings);
  expect(await WindowsSettingsService.getStatus()).toEqual({
    status: "ready",
    settings,
  });
});
it("shows the bridge failure's own cause and fix instead of one generic line", async () => {
  mocks.read.mockRejectedValue(new WindowsSettingsBridgeError("timeout"));
  const status = WindowsSettingsService.getStatus();
  await expect(status).rejects.toMatchObject({ code: "CONFLICT" });
  await expect(status).rejects.toThrow("zaman aşımı");
  mocks.set.mockRejectedValue(new WindowsSettingsBridgeError("status", 409));
  await expect(
    WindowsSettingsService.set("auto-update", false),
  ).rejects.toThrow("HTTP 409");
});
