import { getOptionalEnvValue } from "@/server/lib/runtime-env";
import {
  windowsSettingsSchema,
  type WindowsSetting,
} from "@/shared/windows-settings";

/** Server-only capability: the browser never receives the port or credential. */
async function request(path: string) {
  const port = await getOptionalEnvValue("WINDOWS_SETTINGS_PORT");
  const token = await getOptionalEnvValue("WINDOWS_SETTINGS_TOKEN");
  if (
    !port ||
    !/^\d{1,5}$/.test(port) ||
    Number(port) < 1 ||
    Number(port) > 65535 ||
    !token ||
    !/^[a-f0-9]{64}$/.test(token)
  )
    return null;
  try {
    const response = await fetch(`http://127.0.0.1:${port}/settings/${path}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      // Workers supports manual redirects; non-2xx responses are rejected below.
      redirect: "manual",
      signal: AbortSignal.timeout(4000),
    });
    if (!response.ok) throw new Error("Native settings request failed");
    return windowsSettingsSchema.parse(await response.json());
  } catch {
    // Never forward native errors or credential-bearing request details.
    throw new Error("Windows settings unavailable");
  }
}

export const WindowsSettingsRepository = {
  read: () => request("read"),
  set: (setting: WindowsSetting, enabled: boolean) =>
    request(`${setting}/${enabled ? "on" : "off"}`),
};
