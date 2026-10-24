import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { createInterface } from "node:readline";
import { WindowsSettingsRepository } from "../src/server/features/windows/WindowsSettingsRepository";

// The native fixture stores preferences in memory, never in HKCU or config.json.
const executable = process.argv[2];
if (!executable) throw new Error("Pass the compiled native test fixture path.");
const native = spawn(executable, ["--serve"], {
  stdio: ["pipe", "pipe", "pipe"],
  windowsHide: true,
});
const lines = createInterface({ input: native.stdout });
const startupTimeout = setTimeout(() => native.kill(), 10_000);
try {
  const [line] = await Promise.race([
    once(lines, "line") as Promise<[string]>,
    once(native, "exit").then(() => {
      throw new Error("Native test fixture exited before startup.");
    }),
    once(native, "error").then(() => {
      throw new Error("Native test fixture could not start.");
    }),
  ]);
  clearTimeout(startupTimeout);
  const [port, token] = line.split(" ");
  process.env.WINDOWS_SETTINGS_PORT = port;
  process.env.WINDOWS_SETTINGS_TOKEN = token;
  assert.equal((await WindowsSettingsRepository.read())?.autostart, false);
  assert.equal(
    (await WindowsSettingsRepository.set("autostart", true))?.autostart,
    true,
  );
  assert.equal((await WindowsSettingsRepository.read())?.autostart, true);
  assert.equal(
    (await WindowsSettingsRepository.set("autostart", false))?.autostart,
    false,
  );
  assert.equal(
    (await WindowsSettingsRepository.set("auto-update", false))?.autoUpdate,
    false,
  );
  assert.equal((await WindowsSettingsRepository.read())?.autoUpdate, false);
  console.log(
    "TypeScript consumer -> native bridge: read, enable, disable and confirmed state passed.",
  );
} finally {
  clearTimeout(startupTimeout);
  lines.close();
  native.stdin.end();
  delete process.env.WINDOWS_SETTINGS_PORT;
  delete process.env.WINDOWS_SETTINGS_TOKEN;
}
