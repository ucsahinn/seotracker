import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";

/*
 * The origin this request was served from, so the healthy pages can name an
 * absolute canonical. A relative one is what `canonical-relative` reports,
 * and the origin differs between localhost and a deploy. Same Host-header
 * rule as the fixture dispatch's `requestOrigin`.
 */
export const getSiteOrigin = createServerFn({ method: "GET" }).handler(() => {
  const request = getRequest();
  const url = new URL(request.url);
  return `${url.protocol}//${request.headers.get("host") ?? url.host}`;
});
