import type {
  Announcement,
  AnnouncementOption,
  AnnouncementStatus,
} from "./types";

export interface AnnouncementRepository {
  listPublished(now: string): Promise<Announcement[]>;
  listAll(options?: {
    status?: AnnouncementStatus;
    search?: string;
    offset?: number;
    limit?: number;
  }): Promise<Announcement[]>;
  create(item: Announcement): Promise<void>;
  createWithOptions(
    item: Announcement,
    options: Array<{ id: string; label_tr: string; label_en: string }>,
  ): Promise<void>;
  update(item: Announcement): Promise<void>;
  updateWithOptions(
    item: Announcement,
    options: Array<{ id: string; label_tr: string; label_en: string }>,
  ): Promise<void>;
  get(id: string): Promise<Announcement | null>;
  setStatus(
    id: string,
    status: AnnouncementStatus,
    updatedAt: string,
  ): Promise<void>;
  saveOptions(
    announcementId: string,
    options: Array<{ id: string; label_tr: string; label_en: string }>,
  ): Promise<void>;
  submitResponse(input: {
    id: string;
    announcementId: string;
    respondentHash: string;
    optionId: string | null;
    answer: string | null;
    createdAt: string;
  }): Promise<void>;
  listResponses(
    announcementId: string,
    options?: { limit?: number; offset?: number },
  ): Promise<
    Array<{
      id: string;
      option_id: string | null;
      answer: string | null;
      created_at: string;
    }>
  >;
  getOptions(announcementId: string): Promise<AnnouncementOption[]>;
  deleteResponse(id: string): Promise<void>;
}

interface D1StatementLike {
  all<T = Record<string, unknown>>(): Promise<{ results: T[] }>;
  first<T = Record<string, unknown>>(): Promise<T | null>;
  run(): Promise<unknown>;
}

interface D1DatabaseLike {
  prepare(query: string): { bind(...values: unknown[]): D1StatementLike };
  batch(statements: D1StatementLike[]): Promise<unknown[]>;
}

export class AnnouncementMutationConflictError extends Error {
  constructor() {
    super("Announcement options already have recorded responses");
    this.name = "AnnouncementMutationConflictError";
  }
}

export function createD1Repository(db: D1DatabaseLike): AnnouncementRepository {
  const insertStatement = (item: Announcement) =>
    db
      .prepare(
        `INSERT INTO announcements
         (id, title_tr, body_tr, title_en, body_en, title_de, body_de, title_fr, body_fr, title_it, body_it, title_pt, body_pt,
          category, status, publish_at, expires_at, created_at, updated_at, interaction_type, prompt_tr, prompt_en)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      )
      .bind(
        item.id,
        item.title_tr,
        item.body_tr,
        item.title_en,
        item.body_en,
        item.title_de,
        item.body_de,
        item.title_fr,
        item.body_fr,
        item.title_it,
        item.body_it,
        item.title_pt,
        item.body_pt,
        item.category,
        item.status,
        item.publish_at,
        item.expires_at,
        item.created_at,
        item.updated_at,
        item.interaction_type ?? "none",
        item.prompt_tr ?? "",
        item.prompt_en ?? "",
      );
  const updateStatement = (item: Announcement) =>
    db
      .prepare(
        `UPDATE announcements SET
         title_tr = ?, body_tr = ?, title_en = ?, body_en = ?,
         title_de = ?, body_de = ?, title_fr = ?, body_fr = ?,
         title_it = ?, body_it = ?, title_pt = ?, body_pt = ?,
         category = ?, status = ?, publish_at = ?, expires_at = ?, updated_at = ?,
         interaction_type = ?, prompt_tr = ?, prompt_en = ?
         WHERE id = ?`,
      )
      .bind(
        item.title_tr,
        item.body_tr,
        item.title_en,
        item.body_en,
        item.title_de,
        item.body_de,
        item.title_fr,
        item.body_fr,
        item.title_it,
        item.body_it,
        item.title_pt,
        item.body_pt,
        item.category,
        item.status,
        item.publish_at,
        item.expires_at,
        item.updated_at,
        item.interaction_type ?? "none",
        item.prompt_tr ?? "",
        item.prompt_en ?? "",
        item.id,
      );
  const optionStatements = (
    announcementId: string,
    options: Array<{ id: string; label_tr: string; label_en: string }>,
  ) => [
    db
      .prepare("DELETE FROM announcement_options WHERE announcement_id = ?")
      .bind(announcementId),
    ...options.map((option, position) =>
      db
        .prepare(
          "INSERT INTO announcement_options (id, announcement_id, label_tr, label_en, position) VALUES (?, ?, ?, ?, ?)",
        )
        .bind(
          option.id,
          announcementId,
          option.label_tr,
          option.label_en,
          position,
        ),
    ),
  ];
  return {
    async listPublished(now) {
      const result = await db
        .prepare(
          `SELECT announcements.*,
             (SELECT COUNT(*) FROM announcement_responses r WHERE r.announcement_id = announcements.id) AS response_count
           FROM announcements
           WHERE status = 'published' AND publish_at <= ?
             AND (expires_at IS NULL OR expires_at > ?)
           ORDER BY publish_at DESC, created_at DESC LIMIT 100`,
        )
        .bind(now, now)
        .all<Announcement>();
      return Promise.all(result.results.map((item) => enrich(db, item)));
    },
    async listAll(options = {}) {
      const clauses: string[] = [];
      const values: unknown[] = [];
      if (options.status) {
        clauses.push("status = ?");
        values.push(options.status);
      }
      if (options.search) {
        clauses.push(
          "(title_tr LIKE ? OR body_tr LIKE ? OR title_en LIKE ? OR body_en LIKE ?)",
        );
        const needle = `%${options.search}%`;
        values.push(needle, needle, needle, needle);
      }
      values.push(options.limit ?? 50, options.offset ?? 0);
      const result = await db
        .prepare(
          `SELECT announcements.*,
             (SELECT COUNT(*) FROM announcement_responses r WHERE r.announcement_id = announcements.id) AS response_count
           FROM announcements ${clauses.length ? `WHERE ${clauses.join(" AND ")}` : ""}
           ORDER BY updated_at DESC LIMIT ? OFFSET ?`,
        )
        .bind(...values)
        .all<Announcement>();
      return Promise.all(result.results.map((item) => enrich(db, item)));
    },
    async create(item) {
      await insertStatement(item).run();
    },
    async createWithOptions(item, options) {
      try {
        await db.batch([
          insertStatement(item),
          ...optionStatements(item.id, options),
        ]);
      } catch (error) {
        if (
          error instanceof Error &&
          /announcement option has recorded responses/i.test(error.message)
        )
          throw new AnnouncementMutationConflictError();
        throw error;
      }
    },
    async update(item) {
      await updateStatement(item).run();
    },
    async updateWithOptions(item, options) {
      try {
        await db.batch([
          updateStatement(item),
          ...optionStatements(item.id, options),
        ]);
      } catch (error) {
        if (
          error instanceof Error &&
          /announcement option has recorded responses/i.test(error.message)
        )
          throw new AnnouncementMutationConflictError();
        throw error;
      }
    },
    async get(id) {
      const item = await db
        .prepare(
          `SELECT announcements.*,
          (SELECT COUNT(*) FROM announcement_responses r WHERE r.announcement_id = announcements.id) AS response_count
          FROM announcements WHERE id = ? LIMIT 1`,
        )
        .bind(id)
        .first<Announcement>();
      return item ? enrich(db, item) : null;
    },
    async setStatus(id, status, updatedAt) {
      await db
        .prepare(
          "UPDATE announcements SET status = ?, updated_at = ? WHERE id = ?",
        )
        .bind(status, updatedAt, id)
        .run();
    },
    async saveOptions(announcementId, options) {
      await db.batch(optionStatements(announcementId, options));
    },
    async submitResponse(input) {
      await db
        .prepare(
          "INSERT INTO announcement_responses (id, announcement_id, respondent_hash, option_id, answer, created_at) VALUES (?, ?, ?, ?, ?, ?)",
        )
        .bind(
          input.id,
          input.announcementId,
          input.respondentHash,
          input.optionId,
          input.answer,
          input.createdAt,
        )
        .run();
    },
    async listResponses(announcementId, options = {}) {
      const result = await db
        .prepare(
          "SELECT id, option_id, answer, created_at FROM announcement_responses WHERE announcement_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?",
        )
        .bind(announcementId, options.limit ?? 51, options.offset ?? 0)
        .all<{
          id: string;
          option_id: string | null;
          answer: string | null;
          created_at: string;
        }>();
      return result.results;
    },
    async getOptions(announcementId) {
      return getOptions(db, announcementId);
    },
    async deleteResponse(id) {
      await db
        .prepare("DELETE FROM announcement_responses WHERE id = ?")
        .bind(id)
        .run();
    },
  };
}

async function getOptions(
  db: D1DatabaseLike,
  announcementId: string,
): Promise<AnnouncementOption[]> {
  const result = await db
    .prepare(
      `SELECT o.id, o.label_tr, o.label_en, COUNT(r.id) AS count
    FROM announcement_options o LEFT JOIN announcement_responses r ON r.option_id = o.id
    WHERE o.announcement_id = ? GROUP BY o.id ORDER BY o.position`,
    )
    .bind(announcementId)
    .all<Omit<AnnouncementOption, "count"> & { count: number }>();
  return result.results.map((option) => ({
    ...option,
    count: Number(option.count),
  }));
}

async function enrich(
  db: D1DatabaseLike,
  item: Announcement,
): Promise<Announcement> {
  return {
    ...item,
    interaction_type: item.interaction_type ?? "none",
    prompt_tr: item.prompt_tr ?? "",
    prompt_en: item.prompt_en ?? "",
    options:
      item.interaction_type === "poll" ? await getOptions(db, item.id) : [],
    response_count: Number(item.response_count ?? 0),
  };
}
