import type { AnnouncementRepository } from "./repository";
import {
  cors,
  encoder,
  json,
  parseJson,
  responseSchema,
} from "./service-utils";

type ResponseLimiter = {
  limit(input: { key: string }): Promise<{ success: boolean }>;
};

export async function handlePublicResponse(
  request: Request,
  announcementId: string,
  repository: AnnouncementRepository,
  now: () => Date,
  responseLimiter?: ResponseLimiter,
): Promise<Response> {
  const limit = await responseLimiter?.limit({
    key: `responses:${request.headers.get("cf-connecting-ip") ?? "unknown"}`,
  });
  if (limit && !limit.success)
    return json(
      {
        error: "Too many responses. Try again shortly.",
        code: "rate_limited",
      },
      429,
      cors({ "retry-after": "60" }),
    );

  const parsed = responseSchema.safeParse(await parseJson(request));
  if (!parsed.success) return json({ error: "Invalid response" }, 400, cors());

  const announcement = await repository.get(announcementId);
  const timestamp = now().toISOString();
  if (
    !announcement ||
    announcement.status !== "published" ||
    Date.parse(announcement.publish_at) > Date.parse(timestamp) ||
    (announcement.expires_at &&
      Date.parse(announcement.expires_at) <= Date.parse(timestamp))
  ) {
    return json(
      { error: "This announcement is not accepting responses" },
      410,
      cors(),
    );
  }

  const { respondent_id, option_id, answer } = parsed.data;
  if (announcement.interaction_type === "poll") {
    if (
      !option_id ||
      !announcement.options?.some((option) => option.id === option_id) ||
      answer
    )
      return json({ error: "Choose a valid poll option" }, 400, cors());
  } else if (announcement.interaction_type === "question") {
    if (option_id || !answer)
      return json({ error: "Enter an answer" }, 400, cors());
  } else {
    return json(
      { error: "This announcement does not accept responses" },
      409,
      cors(),
    );
  }

  const respondentHash = Array.from(
    new Uint8Array(
      await crypto.subtle.digest("SHA-256", encoder.encode(respondent_id)),
    ),
    (byte) => byte.toString(16).padStart(2, "0"),
  ).join("");
  try {
    await repository.submitResponse({
      id: crypto.randomUUID(),
      announcementId: announcement.id,
      respondentHash,
      optionId: option_id ?? null,
      answer: answer ?? null,
      createdAt: timestamp,
    });
  } catch (error) {
    if (error instanceof Error && /unique constraint/i.test(error.message))
      return json(
        {
          error: "A response has already been recorded for this installation",
          code: "already_responded",
        },
        409,
        cors(),
      );
    return json({ error: "Response could not be saved" }, 500, cors());
  }
  return json({ accepted: true }, 201, cors());
}

export async function handlePublicFeed(
  request: Request,
  repository: AnnouncementRepository,
  now: () => Date,
): Promise<Response> {
  const list = (await repository.listPublished(now().toISOString())).map(
    ({
      id,
      title_tr,
      body_tr,
      title_en,
      body_en,
      interaction_type,
      prompt_tr,
      prompt_en,
      options: pollOptions,
      response_count,
      category,
      publish_at,
      expires_at,
    }) => ({
      id,
      title_tr,
      body_tr,
      title_en,
      body_en,
      // Preserve the 0.7.0 feed shape for older clients; admin authors TR/EN.
      title_de: title_en,
      body_de: body_en,
      title_fr: title_en,
      body_fr: body_en,
      title_it: title_en,
      body_it: body_en,
      title_pt: title_en,
      body_pt: body_en,
      interaction_type: interaction_type ?? "none",
      prompt_tr: prompt_tr ?? "",
      prompt_en: prompt_en ?? "",
      options: pollOptions ?? [],
      response_count: response_count ?? 0,
      category,
      publish_at,
      expires_at,
    }),
  );
  const bytes = encoder.encode(JSON.stringify({ announcements: list }));
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  const etag = `"${Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("")}"`;
  const headers = cors({
    "cache-control": "public, max-age=20, stale-while-revalidate=30",
    etag,
  });
  if (request.headers.get("if-none-match") === etag)
    return new Response(null, { status: 304, headers });
  headers.set("content-type", "application/json; charset=utf-8");
  return new Response(bytes, { headers });
}
