import {
  sqliteTable,
  text,
  integer,
  real,
  uniqueIndex,
  primaryKey,
  index,
} from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";
import { organization, user } from "./better-auth-schema";

export const userOnboardingAnswers = sqliteTable(
  "user_onboarding_answers",
  {
    userId: text("user_id")
      .primaryKey()
      .references(() => user.id, { onDelete: "cascade" }),
    organizationId: text("organization_id")
      .notNull()
      .references(() => organization.id, { onDelete: "cascade" }),
    interestedFeatures: text("interested_features").notNull().default("[]"),
    workFor: text("work_for"),
    clientWebsiteCount: text("client_website_count"),
    foundVia: text("found_via"),
    mcpSetupIntent: text("mcp_setup_intent"),
    completedAt: text("completed_at"),
    // Set when the user resolves the Search Console ask, either in current
    // onboarding or via the one-time re-engagement nudge for legacy users.
    // Null = not yet shown/resolved.
    gscNudgeDismissedAt: text("gsc_nudge_dismissed_at"),
    createdAt: text("created_at")
      .notNull()
      .default(sql`(current_timestamp)`),
    updatedAt: text("updated_at")
      .notNull()
      .default(sql`(current_timestamp)`),
  },
  (table) => [
    index("user_onboarding_answers_organization_idx").on(table.organizationId),
  ],
);

// Projects for keyword research
export const projects = sqliteTable(
  "projects",
  {
    id: text("id").primaryKey(),
    organizationId: text("organization_id")
      .notNull()
      .references(() => organization.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    domain: text("domain"),
    // Default DataForSEO location/language for the project, set during
    // onboarding and reused by every project-scoped data call.
    locationCode: integer("location_code").notNull().default(2840),
    languageCode: text("language_code").notNull().default("en"),
    createdAt: text("created_at")
      .notNull()
      .default(sql`(current_timestamp)`),
    // Soft delete: archived projects are hidden everywhere but their data
    // (keywords, rank tracking, audits) is preserved.
    archivedAt: text("archived_at"),
  },
  (table) => [
    // Only the auto-created Default/null-domain project is a singleton. This
    // guards the get-or-create race that can happen when several requests enter
    // a new organization at once, without forbidding users from manually
    // creating multiple projects with the same name or domain later.
    uniqueIndex("projects_one_default_per_organization_idx")
      .on(table.organizationId)
      .where(
        sql`${table.name} = 'Default' AND ${table.domain} IS NULL AND ${table.archivedAt} IS NULL`,
      ),
    // Every project listing filters by organization; the partial-unique index
    // above only covers the Default-project row, so without this the org-scoped
    // list queries seq-scan. Per-org row counts are small, so the archived/
    // created_at ordering sorts cheaply on top of this single-column lookup.
    index("projects_organization_id_idx").on(table.organizationId),
  ],
);

// User-saved keywords within a project. This is the canonical saved list.
export const savedKeywords = sqliteTable(
  "saved_keywords",
  {
    id: text("id").primaryKey(),
    projectId: text("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "cascade" }),
    keyword: text("keyword").notNull(),
    locationCode: integer("location_code").notNull().default(2840),
    languageCode: text("language_code").notNull().default("en"),
    createdAt: text("created_at")
      .notNull()
      .default(sql`(current_timestamp)`),
  },
  (table) => [
    uniqueIndex("saved_keywords_unique_project_keyword_location_language").on(
      table.projectId,
      table.keyword,
      table.locationCode,
      table.languageCode,
    ),
    index("saved_keywords_project_created_idx").on(
      table.projectId,
      table.createdAt,
    ),
  ],
);

export const savedKeywordTags = sqliteTable(
  "saved_keyword_tags",
  {
    id: text("id").primaryKey(),
    projectId: text("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    normalizedName: text("normalized_name").notNull(),
    // Palette key (e.g. "blue", "rose"). Null = derive a stable color from the
    // tag id at render time. See src/shared/tag-colors.ts.
    color: text("color"),
    createdAt: text("created_at")
      .notNull()
      .default(sql`(current_timestamp)`),
  },
  (table) => [
    uniqueIndex("saved_keyword_tags_project_normalized_name_idx").on(
      table.projectId,
      table.normalizedName,
    ),
    index("saved_keyword_tags_project_name_idx").on(
      table.projectId,
      table.name,
    ),
  ],
);

export const savedKeywordTagAssignments = sqliteTable(
  "saved_keyword_tag_assignments",
  {
    savedKeywordId: text("saved_keyword_id")
      .notNull()
      .references(() => savedKeywords.id, { onDelete: "cascade" }),
    tagId: text("tag_id")
      .notNull()
      .references(() => savedKeywordTags.id, { onDelete: "cascade" }),
    createdAt: text("created_at")
      .notNull()
      .default(sql`(current_timestamp)`),
  },
  (table) => [
    uniqueIndex("saved_keyword_tag_assignments_unique_idx").on(
      table.savedKeywordId,
      table.tagId,
    ),
    // No standalone index on savedKeywordId — the unique index above has it as
    // its leftmost column, so it already serves savedKeywordId lookups.
    index("saved_keyword_tag_assignments_tag_idx").on(table.tagId),
  ],
);

// Latest cached metrics for a keyword within a project.
// This is joined onto savedKeywords when rendering the saved keyword list.
export const keywordMetrics = sqliteTable(
  "keyword_metrics",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    projectId: text("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "cascade" }),
    keyword: text("keyword").notNull(),
    locationCode: integer("location_code").notNull(),
    languageCode: text("language_code").notNull().default("en"),
    searchVolume: integer("search_volume"),
    cpc: real("cpc"),
    competition: real("competition"),
    keywordDifficulty: integer("keyword_difficulty"),
    intent: text("intent"),
    monthlySearches: text("monthly_searches"),
    fetchedAt: text("fetched_at")
      .notNull()
      .default(sql`(current_timestamp)`),
  },
  (table) => [
    uniqueIndex("keyword_metrics_unique_project_keyword_location_language").on(
      table.projectId,
      table.keyword,
      table.locationCode,
      table.languageCode,
    ),
    index("keyword_metrics_lookup_idx").on(
      table.projectId,
      table.keyword,
      table.locationCode,
      table.languageCode,
      table.fetchedAt,
    ),
  ],
);

// ============================================================================
// Rank Tracking tables
// ============================================================================

// Dashboard activation milestones. Organization-scoped: MCP OAuth grants are
// user-level, so any member connecting an external MCP client satisfies the
// milestone for the whole organization. Timestamps are first-occurrence only
// and never move once set.
export const organizationActivationState = sqliteTable(
  "organization_activation_state",
  {
    organizationId: text("organization_id")
      .primaryKey()
      .references(() => organization.id, { onDelete: "cascade" }),
    firstMcpAuthorizedAt: text("first_mcp_authorized_at"),
    firstMcpToolCallAt: text("first_mcp_tool_call_at"),
    updatedAt: text("updated_at")
      .notNull()
      .default(sql`(current_timestamp)`),
  },
);

// Per-project state for the dashboard's onboarding checklist. Most steps
// complete via real product state (projects.domain, gsc_connections, MCP
// activation); the competitor step completes on click-through.
export const projectActivationState = sqliteTable("project_activation_state", {
  projectId: text("project_id")
    .primaryKey()
    .references(() => projects.id, { onDelete: "cascade" }),
  competitorStepClickedAt: text("competitor_step_clicked_at"),
  // "I already connected" on the MCP card: hides the card for this project
  // without faking the org-level first-tool-call milestone, which stays
  // truthful and self-heals when a real external call lands.
  mcpCardDismissedAt: text("mcp_card_dismissed_at"),
  // Optional integration pitch: hiding it from the dashboard does not remove
  // the GA4 connection controls from Project Settings.
  ga4CardDismissedAt: text("ga4_card_dismissed_at"),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`(current_timestamp)`),
});

// Personal checklist preferences; completion remains derived from product state.
export const dashboardStepDismissals = sqliteTable(
  "dashboard_step_dismissals",
  {
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    projectId: text("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "cascade" }),
    step: text("step").notNull(),
  },
  (table) => [
    primaryKey({ columns: [table.userId, table.projectId, table.step] }),
    index("dashboard_step_dismissals_project_idx").on(table.projectId),
  ],
);
