import type { Announcement, AnnouncementStatus } from "./types";

export interface AnnouncementRepository {
  listPublished(now: string): Promise<Announcement[]>;
  listAll(): Promise<Announcement[]>;
  create(item: Announcement): Promise<void>;
  update(item: Announcement): Promise<void>;
  get(id: string): Promise<Announcement | null>;
  setStatus(
    id: string,
    status: AnnouncementStatus,
    updatedAt: string,
  ): Promise<void>;
}

interface D1DatabaseLike {
  prepare(query: string): {
    bind(...values: unknown[]): {
      all<T = Record<string, unknown>>(): Promise<{ results: T[] }>;
      first<T = Record<string, unknown>>(): Promise<T | null>;
      run(): Promise<unknown>;
    };
  };
}

export function createD1Repository(db: D1DatabaseLike): AnnouncementRepository {
  return {
    async listPublished(now) {
      const result = await db
        .prepare(
          `SELECT * FROM announcements
           WHERE status = 'published' AND publish_at <= ?
             AND (expires_at IS NULL OR expires_at > ?)
           ORDER BY publish_at DESC, created_at DESC LIMIT 100`,
        )
        .bind(now, now)
        .all<Announcement>();
      return result.results;
    },
    async listAll() {
      const result = await db
        .prepare(
          "SELECT * FROM announcements ORDER BY updated_at DESC LIMIT 500",
        )
        .bind()
        .all<Announcement>();
      return result.results;
    },
    async create(item) {
      await db
        .prepare(
          `INSERT INTO announcements
           (id, title_tr, body_tr, title_en, body_en, category, status, publish_at, expires_at, created_at, updated_at)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        )
        .bind(
          item.id,
          item.title_tr,
          item.body_tr,
          item.title_en,
          item.body_en,
          item.category,
          item.status,
          item.publish_at,
          item.expires_at,
          item.created_at,
          item.updated_at,
        )
        .run();
    },
    async update(item) {
      await db
        .prepare(
          `UPDATE announcements SET
           title_tr = ?, body_tr = ?, title_en = ?, body_en = ?,
           category = ?, status = ?, publish_at = ?, expires_at = ?, updated_at = ?
           WHERE id = ?`,
        )
        .bind(
          item.title_tr,
          item.body_tr,
          item.title_en,
          item.body_en,
          item.category,
          item.status,
          item.publish_at,
          item.expires_at,
          item.updated_at,
          item.id,
        )
        .run();
    },
    async get(id) {
      return db
        .prepare("SELECT * FROM announcements WHERE id = ? LIMIT 1")
        .bind(id)
        .first<Announcement>();
    },
    async setStatus(id, status, updatedAt) {
      await db
        .prepare(
          "UPDATE announcements SET status = ?, updated_at = ? WHERE id = ?",
        )
        .bind(status, updatedAt, id)
        .run();
    },
  };
}
