/**
 * What a page's JSON-LD declares, and which properties Google needs that a
 * declared type leaves out.
 *
 * Only the types Google turns into a search feature are judged, and only
 * against the properties Google's own documentation lists for them. Where
 * Google names no required property at all (Article, Organization), the
 * properties it recommends are checked instead, and the gap says so: a
 * finding never claims "required" for something Google calls optional.
 *
 * Nodes are read at the top level and inside `@graph`; a type nested as the
 * value of another node's property (an Organization as `publisher`) is
 * deliberately not judged on its own, because Google reads it as part of
 * the parent.
 */
import type { StructuredDataGap } from "./types";

/** Each group is satisfied by any one of its properties. */
interface Requirement {
  level: StructuredDataGap["level"];
  groups: string[][];
}

const ARTICLE: Requirement = {
  level: "recommended",
  groups: [["headline"], ["image"], ["datePublished"], ["author"]],
};

const REQUIREMENTS: Record<string, Requirement> = {
  Article: ARTICLE,
  NewsArticle: ARTICLE,
  BlogPosting: ARTICLE,
  Product: {
    level: "required",
    groups: [["name"], ["offers", "review", "aggregateRating"]],
  },
  FAQPage: { level: "required", groups: [["mainEntity"]] },
  BreadcrumbList: { level: "required", groups: [["itemListElement"]] },
  Organization: {
    level: "recommended",
    groups: [["name"], ["url"], ["logo"]],
  },
  LocalBusiness: { level: "required", groups: [["name"], ["address"]] },
};

const MAX_TYPES = 20;
const MAX_TYPE_CHARS = 80;
const MAX_GAPS = 10;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function hasValue(value: unknown): boolean {
  if (value === undefined || value === null) return false;
  if (typeof value === "string") return value.trim() !== "";
  if (Array.isArray(value)) return value.length > 0;
  return true;
}

/** `https://schema.org/Product` and `schema:Product` both name Product. */
function typeNames(node: Record<string, unknown>): string[] {
  const raw = node["@type"];
  const list = Array.isArray(raw) ? raw : [raw];
  return list
    .filter((value): value is string => typeof value === "string")
    .map((value) => value.trim().split(/[/:#]/).pop() ?? "")
    .filter(Boolean)
    .map((value) => value.slice(0, MAX_TYPE_CHARS));
}

/** Top-level nodes plus the members of any `@graph`. */
function topLevelNodes(data: unknown): Record<string, unknown>[] {
  const roots = Array.isArray(data) ? data : [data];
  const nodes: Record<string, unknown>[] = [];
  for (const root of roots) {
    if (!isRecord(root)) continue;
    nodes.push(root);
    const graph = root["@graph"];
    if (Array.isArray(graph)) nodes.push(...graph.filter(isRecord));
  }
  return nodes;
}

function asList(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [value];
}

/*
 * The two list types fail inside the list more often than at the top: a
 * breadcrumb item without a position, an FAQ question without an answer.
 * Google rejects the whole rich result for either, so they are named too.
 */
function nestedGaps(type: string, node: Record<string, unknown>): string[] {
  const missing = new Set<string>();
  if (type === "BreadcrumbList") {
    for (const item of asList(node["itemListElement"])) {
      if (!isRecord(item)) continue;
      if (!hasValue(item["position"])) missing.add("itemListElement.position");
      const named =
        hasValue(item["name"]) ||
        (isRecord(item["item"]) && hasValue(item["item"]["name"]));
      if (!named) missing.add("itemListElement.name");
    }
  }
  if (type === "FAQPage") {
    for (const question of asList(node["mainEntity"])) {
      if (!isRecord(question)) continue;
      if (!hasValue(question["name"])) missing.add("mainEntity.name");
      if (!hasValue(question["acceptedAnswer"])) {
        missing.add("mainEntity.acceptedAnswer");
      }
    }
  }
  return [...missing];
}

export interface StructuredDataSummary {
  types: string[];
  gaps: StructuredDataGap[];
  /*
   * A top-level Organization with no sameAs: Google recommends listing the
   * organization's official profiles there. Kept apart from `gaps`, whose
   * recommended set for Organization is the one Google's logo guidance
   * names.
   */
  organizationWithoutSameAs: boolean;
}

/** Add one parsed JSON-LD body's types and gaps to a running summary. */
export function summarizeJsonLd(
  data: unknown,
  summary: StructuredDataSummary,
): void {
  for (const node of topLevelNodes(data)) {
    for (const type of typeNames(node)) {
      if (summary.types.length < MAX_TYPES && !summary.types.includes(type)) {
        summary.types.push(type);
      }
      if (type === "Organization" && !hasValue(node["sameAs"])) {
        summary.organizationWithoutSameAs = true;
      }
      const requirement = REQUIREMENTS[type];
      if (!requirement || summary.gaps.length >= MAX_GAPS) continue;
      const missing = requirement.groups
        .filter((group) => !group.some((prop) => hasValue(node[prop])))
        .map((group) => group.join("/"));
      missing.push(...nestedGaps(type, node));
      if (missing.length > 0) {
        summary.gaps.push({ type, level: requirement.level, missing });
      }
    }
  }
}
