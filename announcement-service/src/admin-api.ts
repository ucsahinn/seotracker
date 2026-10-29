import { STATUSES, type Announcement, type AnnouncementInput } from "./types";
import {
  AnnouncementMutationConflictError,
  type AnnouncementRepository,
} from "./repository";
import { translateFields, type Translator } from "./translate";
import {
  inputSchema,
  isAnnouncement,
  json,
  parseJson,
  statusSchema,
} from "./service-utils";

type OptionInput = Pick<
  AnnouncementInput["options"][number],
  "label_tr" | "label_en"
>;

function pagination(request: Request) {
  const url = new URL(request.url);
  const page = Math.max(
    1,
    Number.parseInt(url.searchParams.get("page") ?? "1", 10) || 1,
  );
  const limit = Math.min(
    100,
    Math.max(
      10,
      Number.parseInt(url.searchParams.get("limit") ?? "50", 10) || 50,
    ),
  );
  return { page, limit };
}

function invalidAnnouncement(
  issues: Array<{ path: PropertyKey[]; message: string }>,
) {
  return json(
    {
      error: "Invalid announcement",
      issues: issues.map(({ path, message }) => ({ path, message })),
    },
    400,
  );
}

function makeOptions(options: OptionInput[]) {
  return options.map((option) => ({ id: crypto.randomUUID(), ...option }));
}

function localizedContent(content: Omit<AnnouncementInput, "options">) {
  return {
    ...content,
    title_de: content.title_en,
    body_de: content.body_en,
    title_fr: content.title_en,
    body_fr: content.body_en,
    title_it: content.title_en,
    body_it: content.body_en,
    title_pt: content.title_en,
    body_pt: content.body_en,
  };
}

async function listAnnouncements(
  request: Request,
  repository: AnnouncementRepository,
) {
  const url = new URL(request.url);
  const { page, limit } = pagination(request);
  const requestedStatus = url.searchParams.get("status");
  const status = STATUSES.find((candidate) => candidate === requestedStatus);
  const announcements = await repository.listAll({
    status,
    search: url.searchParams.get("q")?.trim().slice(0, 100) || undefined,
    limit: limit + 1,
    offset: (page - 1) * limit,
  });
  return json({
    announcements: announcements.slice(0, limit),
    page,
    limit,
    hasMore: announcements.length > limit,
  });
}

async function createAnnouncement(
  request: Request,
  repository: AnnouncementRepository,
  now: () => Date,
) {
  const parsed = inputSchema.safeParse(await parseJson(request));
  if (!parsed.success) return invalidAnnouncement(parsed.error.issues);

  const timestamp = now().toISOString();
  const { options: optionInputs, ...content } = parsed.data;
  const options = makeOptions(optionInputs);
  const item: Announcement = {
    ...localizedContent(content),
    options: options.map((option) => ({ ...option, count: 0 })),
    response_count: 0,
    id: crypto.randomUUID(),
    created_at: timestamp,
    updated_at: timestamp,
  };
  try {
    await repository.createWithOptions(item, options);
  } catch {
    return json({ error: "Announcement could not be saved" }, 500);
  }
  return json({ announcement: item }, 201);
}

async function cloneAnnouncement(
  repository: AnnouncementRepository,
  sourceId: string,
  now: () => Date,
) {
  const source = await repository.get(sourceId);
  if (!source || !isAnnouncement(source))
    return json({ error: "Announcement not found" }, 404);

  const timestamp = now().toISOString();
  const options =
    source.interaction_type === "poll"
      ? makeOptions(
          (source.options ?? []).map(({ label_tr, label_en }) => ({
            label_tr,
            label_en,
          })),
        )
      : [];
  const clone: Announcement = {
    ...source,
    id: crypto.randomUUID(),
    status: "draft",
    publish_at: timestamp,
    expires_at: null,
    created_at: timestamp,
    updated_at: timestamp,
    response_count: 0,
    options: options.map((option) => ({ ...option, count: 0 })),
  };
  try {
    await repository.createWithOptions(clone, options);
  } catch {
    return json({ error: "Announcement could not be cloned" }, 500);
  }
  return json({ announcement: clone }, 201);
}

async function listResponses(
  request: Request,
  repository: AnnouncementRepository,
  announcementId: string,
) {
  const announcement = await repository.get(announcementId);
  if (!announcement) return json({ error: "Announcement not found" }, 404);
  if (announcement.interaction_type === "poll")
    return json({
      interaction_type: "poll",
      response_count: announcement.response_count ?? 0,
      responses: [],
      options: announcement.options ?? [],
      page: 1,
      limit: 0,
      hasMore: false,
    });
  const { page, limit } = pagination(request);
  const responses = await repository.listResponses(announcement.id, {
    limit: limit + 1,
    offset: (page - 1) * limit,
  });
  return json({
    interaction_type: announcement.interaction_type ?? "none",
    response_count: announcement.response_count ?? 0,
    responses: responses.slice(0, limit),
    page,
    limit,
    hasMore: responses.length > limit,
    options: announcement.options ?? [],
  });
}

async function updateAnnouncement(
  request: Request,
  repository: AnnouncementRepository,
  id: string,
  now: () => Date,
) {
  const existing = await repository.get(id);
  if (!existing || !isAnnouncement(existing))
    return json({ error: "Announcement not found" }, 404);

  const body = await parseJson(request);
  const status = statusSchema.safeParse(body);
  const updatedAt = now().toISOString();
  if (status.success) {
    await repository.setStatus(id, status.data.status, updatedAt);
    return json({
      announcement: {
        ...existing,
        status: status.data.status,
        updated_at: updatedAt,
      },
    });
  }

  const parsed = inputSchema.safeParse(body);
  if (!parsed.success) return invalidAnnouncement(parsed.error.issues);
  if ((existing.response_count ?? 0) > 0)
    return json(
      {
        error:
          "This announcement has responses. Clone it to change its content.",
      },
      409,
    );
  if (existing.status === "published" && existing.interaction_type !== "none")
    return json(
      {
        error:
          "Published interactive announcements cannot be edited. Clone it to make changes.",
      },
      409,
    );

  const { options: optionInputs, ...content } = parsed.data;
  const options = makeOptions(optionInputs);
  const updated: Announcement = {
    ...existing,
    ...localizedContent(content),
    updated_at: updatedAt,
    options: options.map((option) => ({ ...option, count: 0 })),
  };
  try {
    await repository.updateWithOptions(updated, options);
  } catch (error) {
    if (!(error instanceof AnnouncementMutationConflictError))
      return json({ error: "Announcement could not be updated" }, 500);
    return json(
      {
        error:
          "The announcement changed while you were editing it. Reload and clone it before making further changes.",
      },
      409,
    );
  }
  return json({ announcement: updated });
}

const TRANSLATE_FIELD_LIMIT = 40;
const TRANSLATE_FIELD_LENGTH = 4000;

/** Drafts English copy from the Turkish fields; it never saves anything. */
async function translateDraft(
  request: Request,
  translator: Translator | undefined,
): Promise<Response> {
  if (!translator)
    return json({ error: "Automatic translation is not configured" }, 503);
  const body: unknown = await request.json().catch(() => null);
  const fields =
    body && typeof body === "object" && "fields" in body
      ? (body as { fields: unknown }).fields
      : null;
  if (
    !Array.isArray(fields) ||
    fields.length === 0 ||
    fields.length > TRANSLATE_FIELD_LIMIT ||
    !fields.every(
      (field): field is string =>
        typeof field === "string" && field.length <= TRANSLATE_FIELD_LENGTH,
    )
  )
    return json(
      { error: "Send 1-40 text fields of up to 4000 characters" },
      400,
    );
  try {
    return json({ fields: await translateFields(fields, translator) });
  } catch {
    return json(
      { error: "Translation failed. Try again or write it by hand." },
      502,
    );
  }
}

export async function handleAdminApiRequest(
  request: Request,
  repository: AnnouncementRepository,
  now: () => Date,
  translator?: Translator,
): Promise<Response> {
  const url = new URL(request.url);
  const method = request.method.toUpperCase();
  if (url.pathname === "/api/admin/translate" && method === "POST")
    return translateDraft(request, translator);
  if (url.pathname === "/api/admin/announcements" && method === "GET")
    return listAnnouncements(request, repository);
  if (url.pathname === "/api/admin/announcements" && method === "POST")
    return createAnnouncement(request, repository, now);

  const cloneMatch =
    /^\/api\/admin\/announcements\/([a-zA-Z0-9-]+)\/clone$/.exec(url.pathname);
  if (cloneMatch && method === "POST")
    return cloneAnnouncement(repository, cloneMatch[1], now);

  const responsesMatch =
    /^\/api\/admin\/announcements\/([a-zA-Z0-9-]+)\/responses$/.exec(
      url.pathname,
    );
  if (responsesMatch && method === "GET")
    return listResponses(request, repository, responsesMatch[1]);

  const deleteMatch = /^\/api\/admin\/responses\/([a-zA-Z0-9-]+)$/.exec(
    url.pathname,
  );
  if (deleteMatch && method === "DELETE") {
    await repository.deleteResponse(deleteMatch[1]);
    return new Response(null, {
      status: 204,
      headers: { "cache-control": "no-store" },
    });
  }

  const announcementMatch =
    /^\/api\/admin\/announcements\/([a-zA-Z0-9-]+)$/.exec(url.pathname);
  if (announcementMatch && method === "PATCH")
    return updateAnnouncement(request, repository, announcementMatch[1], now);

  return json({ error: "Not found" }, 404);
}
