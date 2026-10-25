import { createAnnouncementHandler } from "./handler";
import { createD1Repository } from "./repository";

interface Env {
  DB: D1Database;
  ADMIN_TOKEN?: string;
  RESPONSE_LIMITER: RateLimit;
}

export default {
  fetch(request: Request, env: Env): Promise<Response> {
    const handler = createAnnouncementHandler(createD1Repository(env.DB), {
      adminToken: env.ADMIN_TOKEN,
      responseLimiter: env.RESPONSE_LIMITER,
    });
    return handler(request);
  },
};
