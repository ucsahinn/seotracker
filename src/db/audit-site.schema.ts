import {
  sqliteTable,
  text,
  integer,
  primaryKey,
} from "drizzle-orm/sqlite-core";
import { audits } from "./audit.schema";

// ============================================================================
// Site-level facts of an audit: what the probes learned about the site as a
// whole. Every column is nullable and null means "not measured".
// ============================================================================

const flag = (name: string) => integer(name, { mode: "boolean" });

// One row per audit.
export const auditSiteFacts = sqliteTable("audit_site_facts", {
  auditId: text("audit_id")
    .primaryKey()
    .references(() => audits.id, { onDelete: "cascade" }),
  checkedAt: text("checked_at").notNull(),
  // Start page response
  startFinalUrl: text("start_final_url"),
  startStatus: integer("start_status"),
  startRedirectHops: integer("start_redirect_hops"),
  ttfbMs: integer("ttfb_ms"),
  totalMs: integer("total_ms"),
  htmlBytes: integer("html_bytes"),
  contentType: text("content_type"),
  contentEncoding: text("content_encoding"),
  cacheControl: text("cache_control"),
  serverHeader: text("server_header"),
  xPoweredBy: text("x_powered_by"),
  // Security headers (raw values; null = header absent or not measured,
  // the start status tells which)
  hsts: text("hsts"),
  cspPresent: flag("csp_present"),
  cspFrameAncestors: flag("csp_frame_ancestors"),
  xContentTypeOptions: text("x_content_type_options"),
  xFrameOptions: text("x_frame_options"),
  referrerPolicy: text("referrer_policy"),
  permissionsPolicy: text("permissions_policy"),
  // The start page's response headers as served, `[{ name, value }]`,
  // capped at 40 headers of 200 characters, cookies left out.
  responseHeadersJson: text("response_headers_json"),
  // http:// -> https://
  httpStatus: integer("http_status"),
  httpFinalUrl: text("http_final_url"),
  httpRedirectHops: integer("http_redirect_hops"),
  httpRedirectsToHttps: flag("http_redirects_to_https"),
  // www vs apex
  canonicalHost: text("canonical_host"),
  alternateHost: text("alternate_host"),
  alternateStatus: integer("alternate_status"),
  alternateRedirectsToCanonical: flag("alternate_redirects_to_canonical"),
  // A random missing path
  notFoundUrl: text("not_found_url"),
  notFoundStatus: integer("not_found_status"),
  notFoundRedirectedHome: flag("not_found_redirected_home"),
  notFoundBodyBytes: integer("not_found_body_bytes"),
  // Favicon
  faviconDeclared: flag("favicon_declared"),
  faviconUrl: text("favicon_url"),
  faviconStatus: integer("favicon_status"),
  faviconFound: flag("favicon_found"),
  // robots.txt
  robotsStatus: integer("robots_status"),
  robotsBytes: integer("robots_bytes"),
  robotsHasSitemapLine: flag("robots_has_sitemap_line"),
  robotsDisallowAll: flag("robots_disallow_all"),
  // Sitemap
  sitemapUrl: text("sitemap_url"),
  sitemapUrlCount: integer("sitemap_url_count"),
  // Of those, the addresses on the audited site itself.
  sitemapOnHostUrlCount: integer("sitemap_on_host_url_count"),
  sitemapListedInRobots: flag("sitemap_listed_in_robots"),
  // Well-known files: status of the last URL tried, found = a non-HTML 200
  llmsTxtStatus: integer("llms_txt_status"),
  llmsTxtFound: flag("llms_txt_found"),
  securityTxtStatus: integer("security_txt_status"),
  securityTxtFound: flag("security_txt_found"),
  adsTxtStatus: integer("ads_txt_status"),
  adsTxtFound: flag("ads_txt_found"),
  // DNS: false when any lookup failed (records then partial)
  dnsResolved: flag("dns_resolved"),
  // Domain registration (RDAP)
  registrableDomain: text("registrable_domain"),
  domainRegisteredAt: text("domain_registered_at"),
  domainExpiresAt: text("domain_expires_at"),
  domainRegistrar: text("domain_registrar"),
  // TLS certificate as public Certificate Transparency logs record it
  certIssuer: text("cert_issuer"),
  certNotBefore: text("cert_not_before"),
  certNotAfter: text("cert_not_after"),
});

// Which named crawler robots.txt lets fetch "/". Rows only when robots.txt
// was read.
export const auditSiteCrawlerAccess = sqliteTable(
  "audit_site_crawler_access",
  {
    auditId: text("audit_id")
      .notNull()
      .references(() => audits.id, { onDelete: "cascade" }),
    bot: text("bot").notNull(),
    blocked: integer("blocked", { mode: "boolean" }).notNull(),
  },
  (table) => [primaryKey({ columns: [table.auditId, table.bot] })],
);

// Public DNS records of the audited host and its registrable domain.
export const auditSiteDnsRecords = sqliteTable(
  "audit_site_dns_records",
  {
    auditId: text("audit_id")
      .notNull()
      .references(() => audits.id, { onDelete: "cascade" }),
    recordType: text("record_type", {
      enum: ["A", "AAAA", "NS", "MX", "CAA", "SPF", "DMARC"],
    }).notNull(),
    value: text("value").notNull(),
  },
  (table) => [
    primaryKey({ columns: [table.auditId, table.recordType, table.value] }),
  ],
);
