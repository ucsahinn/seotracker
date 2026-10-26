/**
 * The issue descriptors: id, severity, and the Turkish prose the operator
 * reads.
 *
 * Split by subject rather than kept as one object, because this table only
 * grows -- every check traced to a Google document adds an entry -- and a
 * file-length ceiling should track logic, not how much copy the registry
 * carries.
 */
import type { AuditIssueDescriptor } from "./audit-issue-types";
import { CRAWL_ISSUES } from "./audit-issues/crawl";
import { CONTENT_ISSUES } from "./audit-issues/content";
import { INDEXING_ISSUES } from "./audit-issues/indexing";
import { SPEED_ISSUES } from "./audit-issues/speed";
import { SECURITY_ISSUES } from "./audit-issues/security";
import { LIGHTHOUSE_AUDIT_ISSUES } from "./audit-issues/lighthouse-audits";
import { HTML_CHECK_ISSUES } from "./audit-issues/html-checks";
import { EXTERNAL_CHECK_ISSUES } from "./audit-issues/external-checks";
import { ROBOTS_SITEMAP_CHECK_ISSUES } from "./audit-issues/robots-sitemap-checks";

export const AUDIT_ISSUE_TYPES = {
  ...CRAWL_ISSUES,
  ...CONTENT_ISSUES,
  ...INDEXING_ISSUES,
  ...SPEED_ISSUES,
  ...SECURITY_ISSUES,
  ...LIGHTHOUSE_AUDIT_ISSUES,
  ...HTML_CHECK_ISSUES,
  ...EXTERNAL_CHECK_ISSUES,
  ...ROBOTS_SITEMAP_CHECK_ISSUES,
} as const satisfies Record<string, AuditIssueDescriptor>;
