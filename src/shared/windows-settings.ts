import { z } from "zod";

export const windowsSettingsSchema = z.object({
  autostart: z.boolean(),
  autostartManaged: z.boolean(),
  autoUpdate: z.boolean(),
  autoUpdateManaged: z.boolean(),
});
export type WindowsSettings = z.infer<typeof windowsSettingsSchema>;
export type WindowsSetting = "autostart" | "auto-update";
export type WindowsSettingsStatus =
  | { status: "unsupported" | "unavailable" }
  | { status: "ready"; settings: WindowsSettings };
