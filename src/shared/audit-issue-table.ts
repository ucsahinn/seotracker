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

export const AUDIT_ISSUE_TYPES = {
  ...CRAWL_ISSUES,
  ...CONTENT_ISSUES,
  ...INDEXING_ISSUES,
} as const satisfies Record<string, AuditIssueDescriptor>;
