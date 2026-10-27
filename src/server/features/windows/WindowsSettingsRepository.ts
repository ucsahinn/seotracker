import { getOptionalEnvValue } from "@/server/lib/runtime-env";
import { networkErrorReason } from "@/server/lib/fetchRetry";
import {
  windowsSettingsSchema,
  type WindowsSetting,
} from "@/shared/windows-settings";

const BRIDGE_TIMEOUT_MS = 4000;

/**
 * Why the tray launcher's settings bridge did not answer. One bare "Windows
 * settings unavailable" used to cover all four, so neither the log nor the
 * Settings screen could say whether the launcher was gone, busy, refusing or
 * speaking a different version.
 */
type WindowsBridgeFailure = "timeout" | "connect" | "status" | "parse";

export class WindowsSettingsBridgeError extends Error {
  constructor(
    public readonly failure: WindowsBridgeFailure,
    /** HTTP status for `status`, otherwise null. */
    public readonly httpStatus: number | null = null,
  ) {
    super(
      `Windows settings unavailable (${failure}${httpStatus ? ` ${httpStatus}` : ""})`,
    );
    this.name = "WindowsSettingsBridgeError";
  }
}

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
  let response: Response;
  try {
    response = await fetch(`http://127.0.0.1:${port}/settings/${path}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      // Workers supports manual redirects; non-2xx responses are rejected below.
      redirect: "manual",
      signal: AbortSignal.timeout(BRIDGE_TIMEOUT_MS),
    });
  } catch (error) {
    const failure =
      error instanceof Error && error.name === "TimeoutError"
        ? "timeout"
        : "connect";
    // The transport's own words, without the URL; the token is a header and
    // never part of either.
    console.warn(
      `Windows settings bridge ${path}: ${failure}: ${networkErrorReason(error)}`,
    );
    throw new WindowsSettingsBridgeError(failure);
  }
  if (!response.ok) {
    console.warn(`Windows settings bridge ${path}: HTTP ${response.status}`);
    throw new WindowsSettingsBridgeError("status", response.status);
  }
  const parsed = windowsSettingsSchema.safeParse(
    await response.json().catch(() => null),
  );
  if (!parsed.success) {
    console.warn(
      `Windows settings bridge ${path}: unrecognised response (${parsed.error.issues
        .map((issue) => issue.path.join(".") || issue.code)
        .join(", ")})`,
    );
    throw new WindowsSettingsBridgeError("parse");
  }
  return parsed.data;
}

export const WindowsSettingsRepository = {
  read: () => request("read"),
  set: (setting: WindowsSetting, enabled: boolean) =>
    request(`${setting}/${enabled ? "on" : "off"}`),
};
