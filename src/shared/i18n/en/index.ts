import type { Catalog } from "@/shared/i18n";
import { enAnalytics } from "./analytics";
import { enApp } from "./app";
import { enAudit } from "./audit";
import { enSearch } from "./search";
import { enServer } from "./server";
import { enSettings } from "./settings";
import { enShared } from "./shared";

/*
 * One file per area so parallel work never edits the same file. A key that
 * appears in two areas must carry the same English; i18n-check flags it when
 * it does not.
 */
export const en: Catalog = {
  ...enShared,
  ...enServer,
  ...enApp,
  ...enAudit,
  ...enSearch,
  ...enAnalytics,
  ...enSettings,
};
