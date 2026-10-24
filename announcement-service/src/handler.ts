import { z } from "zod";
import {
  CATEGORIES,
  STATUSES,
  type Announcement,
  type AnnouncementInput,
} from "./types";
import type { AnnouncementRepository } from "./repository";
import { adminPage } from "./admin";

const inputSchema = z
  .object({
    title_tr: z.string().trim().min(1).max(120),
    body_tr: z.string().trim().min(1).max(4000),
    title_en: z.string().trim().min(1).max(120),
    body_en: z.string().trim().min(1).max(4000),
    category: z.enum(CATEGORIES),
    status: z.enum(STATUSES).default("draft"),
    publish_at: z
      .string()
      .datetime({ offset: true })
      .default(() => new Date().toISOString()),
    expires_at: z.string().datetime({ offset: true }).nullable().default(null),
  })
  .superRefine((value, context) => {
    if (
      value.expires_at &&
      Date.parse(value.expires_at) <= Date.parse(value.publish_at)
    ) {
      context.addIssue({
        code: "custom",
        path: ["expires_at"],
        message: "Expiry must follow publication",
      });
    }
  });

const statusSchema = z.object({ status: z.enum(STATUSES) }).strict();
const encoder = new TextEncoder();

function sameSecret(provided: string, expected: string): boolean {
  const left = encoder.encode(provided);
  const right = encoder.encode(expected);
  let mismatch = left.length ^ right.length;
  const length = Math.max(left.length, right.length);
  for (let index = 0; index < length; index++) {
    mismatch |= (left[index] ?? 0) ^ (right[index] ?? 0);
  }
  return mismatch === 0;
}

function json(value: unknown, status = 200, headers?: HeadersInit): Response {
  const responseHeaders = new Headers(headers);
  responseHeaders.set("content-type", "application/json; charset=utf-8");
  responseHeaders.set("cache-control", "no-store");
  return new Response(JSON.stringify(value), {
    status,
    headers: responseHeaders,
  });
}

function cors(headers: HeadersInit = {}): Headers {
  const result = new Headers(headers);
  result.set("access-control-allow-origin", "*");
  result.set("access-control-allow-methods", "GET");
  result.set("access-control-allow-headers", "if-none-match");
  result.set("access-control-max-age", "86400");
  return result;
}

async function parseJson(request: Request): Promise<unknown> {
  try {
    return await request.json();
  } catch {
    return null;
  }
}

function bearer(request: Request, token: string | undefined): boolean {
  if (!token || token.length < 32) return false;
  const header = request.headers.get("authorization") ?? "";
  const match = /^Bearer ([\x21-\x7E]+)$/.exec(header);
  return Boolean(match && sameSecret(match[1], token));
}

function isAnnouncement(value: unknown): value is Announcement {
  return Boolean(
    value && typeof value === "object" && "id" in value && "title_tr" in value,
  );
}

export function createAnnouncementHandler(
  repository: AnnouncementRepository,
  options: { adminToken: string | undefined; now?: () => Date },
): (request: Request) => Promise<Response> {
  const now = options.now ?? (() => new Date());
  return async (request) => {
    const url = new URL(request.url);
    const method = request.method.toUpperCase();
    if (method === "OPTIONS" && url.pathname === "/api/announcements")
      return new Response(null, { status: 204, headers: cors() });
    if (url.pathname === "/health" && method === "GET")
      return json({ ok: true });
    if (url.pathname === "/admin" && method === "GET") {
      return new Response(adminPage, {
        headers: {
          "content-type": "text/html; charset=utf-8",
          "cache-control": "no-store",
          "content-security-policy":
            "default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; connect-src 'self'; form-action 'self'; base-uri 'none'; frame-ancestors 'none'",
          "x-content-type-options": "nosniff",
          "referrer-policy": "no-referrer",
        },
      });
    }

    if (url.pathname === "/api/announcements" && method === "GET") {
      const list = (await repository.listPublished(now().toISOString())).map(
        ({
          id,
          title_tr,
          body_tr,
          title_en,
          body_en,
          category,
          publish_at,
          expires_at,
        }) => ({
          id,
          title_tr,
          body_tr,
          title_en,
          body_en,
          category,
          publish_at,
          expires_at,
        }),
      );
      const bytes = encoder.encode(JSON.stringify({ announcements: list }));
      const digest = await crypto.subtle.digest("SHA-256", bytes);
      const etag = `"${Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("")}"`;
      const headers = cors({
        "cache-control": "public, max-age=60, stale-while-revalidate=120",
        etag,
      });
      if (request.headers.get("if-none-match") === etag)
        return new Response(null, { status: 304, headers });
      headers.set("content-type", "application/json; charset=utf-8");
      return new Response(bytes, { headers });
    }

    if (!url.pathname.startsWith("/api/admin/announcements"))
      return json({ error: "Not found" }, 404);
    if (!bearer(request, options.adminToken))
      return json({ error: "Unauthorized" }, 401, {
        "www-authenticate": "Bearer",
      });

    if (url.pathname === "/api/admin/announcements" && method === "GET") {
      return json({ announcements: await repository.listAll() });
    }
    if (url.pathname === "/api/admin/announcements" && method === "POST") {
      const parsed = inputSchema.safeParse(await parseJson(request));
      if (!parsed.success)
        return json(
          {
            error: "Invalid announcement",
            issues: parsed.error.issues.map(({ path, message }) => ({
              path,
              message,
            })),
          },
          400,
        );
      const timestamp = now().toISOString();
      const item: Announcement = {
        ...(parsed.data as AnnouncementInput),
        id: crypto.randomUUID(),
        created_at: timestamp,
        updated_at: timestamp,
      };
      await repository.create(item);
      return json({ announcement: item }, 201);
    }

    const match = /^\/api\/admin\/announcements\/([a-zA-Z0-9-]+)$/.exec(
      url.pathname,
    );
    if (match && method === "PATCH") {
      const existing = await repository.get(match[1]);
      if (!existing || !isAnnouncement(existing))
        return json({ error: "Announcement not found" }, 404);
      const body = await parseJson(request);
      const status = statusSchema.safeParse(body);
      const updatedAt = now().toISOString();
      if (status.success) {
        await repository.setStatus(match[1], status.data.status, updatedAt);
        return json(
          {
            announcement: {
              ...existing,
              status: status.data.status,
              updated_at: updatedAt,
            },
          },
          200,
        );
      }
      const parsed = inputSchema.safeParse(body);
      if (!parsed.success)
        return json(
          {
            error: "Invalid announcement",
            issues: parsed.error.issues.map(({ path, message }) => ({
              path,
              message,
            })),
          },
          400,
        );
      const updated: Announcement = {
        ...existing,
        ...(parsed.data as AnnouncementInput),
        updated_at: updatedAt,
      };
      await repository.update(updated);
      return json({ announcement: updated });
    }

    return json({ error: "Not found" }, 404);
  };
}
