import { queryOptions } from "@tanstack/react-query";
import { getGoogleOAuthClientStatus } from "@/serverFunctions/googleOAuthClient";
import { getGoogleServiceAccountStatus } from "@/serverFunctions/googleServiceAccount";
import { getPageSpeedKeyStatus } from "@/serverFunctions/pagespeedKey";
import { getUpdateStatus } from "@/serverFunctions/updateCheck";

/*
 * One definition per status read, shared by the settings sections that edit
 * the value and by the help screen that only summarises it. Two call sites
 * with the same key but different functions would silently overwrite each
 * other's cache entry.
 */

export const googleOAuthClientStatusOptions = () =>
  queryOptions({
    queryKey: ["googleOAuthClientStatus"],
    queryFn: () => getGoogleOAuthClientStatus(),
  });

export const googleServiceAccountStatusOptions = () =>
  queryOptions({
    queryKey: ["googleServiceAccountStatus"],
    queryFn: () => getGoogleServiceAccountStatus(),
  });

export const pageSpeedKeyStatusOptions = () =>
  queryOptions({
    queryKey: ["pageSpeedKeyStatus"],
    queryFn: () => getPageSpeedKeyStatus(),
  });

export const updateStatusOptions = () =>
  queryOptions({
    queryKey: ["updateStatus"],
    queryFn: () => getUpdateStatus(),
  });
