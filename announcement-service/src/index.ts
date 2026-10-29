import { createAnnouncementHandler } from "./handler";
import { createD1Repository } from "./repository";
import { workersAiTranslator } from "./translate";

interface Env {
  DB: D1Database;
  ADMIN_TOKEN?: string;
  RESPONSE_LIMITER: RateLimit;
  AI?: Ai;
}

export default {
  fetch(request: Request, env: Env): Promise<Response> {
    const handler = createAnnouncementHandler(createD1Repository(env.DB), {
      adminToken: env.ADMIN_TOKEN,
      responseLimiter: env.RESPONSE_LIMITER,
      translator: env.AI ? workersAiTranslator(env.AI) : undefined,
    });
    return handler(request);
  },
};
