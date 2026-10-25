import { z } from "zod";
import { CATEGORIES, STATUSES, type Announcement } from "./types";

export const inputSchema = z
  .object({
    title_tr: z.string().trim().min(1).max(120),
    body_tr: z.string().trim().min(1).max(4000),
    title_en: z.string().trim().min(1).max(120),
    body_en: z.string().trim().min(1).max(4000),
    interaction_type: z.enum(["none", "poll", "question"]).default("none"),
    prompt_tr: z.string().trim().max(200).default(""),
    prompt_en: z.string().trim().max(200).default(""),
    options: z
      .array(
        z
          .object({
            label_tr: z.string().trim().min(1).max(80),
            label_en: z.string().trim().min(1).max(80),
          })
          .strict(),
      )
      .max(8)
      .default([]),
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
      value.interaction_type !== "none" &&
      (!value.prompt_tr || !value.prompt_en)
    ) {
      context.addIssue({
        code: "custom",
        path: ["prompt_tr"],
        message:
          "Interactive announcements require prompts in Turkish and English",
      });
    }
    if (value.interaction_type === "poll" && value.options.length < 2) {
      context.addIssue({
        code: "custom",
        path: ["options"],
        message: "Polls require at least two options",
      });
    }
    if (value.interaction_type !== "poll" && value.options.length > 0) {
      context.addIssue({
        code: "custom",
        path: ["options"],
        message: "Only polls can have options",
      });
    }
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

export const statusSchema = z.object({ status: z.enum(STATUSES) }).strict();
export const responseSchema = z
  .object({
    respondent_id: z.string().uuid(),
    option_id: z.string().uuid().nullable().optional(),
    answer: z.string().trim().min(1).max(1000).nullable().optional(),
  })
  .strict();

export const encoder = new TextEncoder();

export function json(value: unknown, status = 200, headers?: HeadersInit) {
  const responseHeaders = new Headers(headers);
  responseHeaders.set("content-type", "application/json; charset=utf-8");
  responseHeaders.set("cache-control", "no-store");
  return new Response(JSON.stringify(value), {
    status,
    headers: responseHeaders,
  });
}

export function cors(headers: HeadersInit = {}): Headers {
  const result = new Headers(headers);
  result.set("access-control-allow-origin", "*");
  if (!result.has("access-control-allow-methods"))
    result.set("access-control-allow-methods", "GET");
  if (!result.has("access-control-allow-headers"))
    result.set("access-control-allow-headers", "if-none-match");
  result.set("access-control-max-age", "86400");
  return result;
}

export async function parseJson(request: Request): Promise<unknown> {
  try {
    return await request.json();
  } catch {
    return null;
  }
}

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

export function bearer(request: Request, token: string | undefined): boolean {
  if (!token || token.length < 32) return false;
  const header = request.headers.get("authorization") ?? "";
  const match = /^Bearer ([\x21-\x7E]+)$/.exec(header);
  return Boolean(match && sameSecret(match[1], token));
}

export function isAnnouncement(value: unknown): value is Announcement {
  return Boolean(
    value && typeof value === "object" && "id" in value && "title_tr" in value,
  );
}
