import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { WindowsSettingsService } from "@/server/features/windows/WindowsSettingsService";
import { requireAuthenticatedContext } from "./middleware";

export const getWindowsSettings = createServerFn({ method: "POST" })
  .middleware(requireAuthenticatedContext)
  .handler(() => WindowsSettingsService.getStatus());

export const setWindowsSetting = createServerFn({ method: "POST" })
  .middleware(requireAuthenticatedContext)
  .validator(
    z
      .object({
        setting: z.enum(["autostart", "auto-update"]),
        enabled: z.boolean(),
      })
      .strict(),
  )
  .handler(({ data }) =>
    WindowsSettingsService.set(data.setting, data.enabled),
  );
