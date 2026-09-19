import {
  DEFAULT_AUDIT_PAGES,
  MAX_AUDIT_PAGES,
  MIN_AUDIT_PAGES,
} from "@/shared/audit-limits";

export const MIN_PAGES = MIN_AUDIT_PAGES;

/** Self-hosted installs crawl their own sites, so there is one ceiling. */
export function getMaxPagesLimit() {
  return MAX_AUDIT_PAGES;
}

export type LaunchFormValues = {
  url: string;
  maxPagesInput: string;
  runLighthouse: boolean;
};

export const DEFAULT_LAUNCH_FORM_VALUES: LaunchFormValues = {
  url: "",
  maxPagesInput: String(DEFAULT_AUDIT_PAGES),
  runLighthouse: false,
};
