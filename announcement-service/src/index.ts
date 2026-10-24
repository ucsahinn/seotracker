import { createAnnouncementHandler } from "./handler";
import { createD1Repository } from "./repository";

interface Env {
  DB: D1Database;
  ADMIN_TOKEN?: string;
}

export default {
  fetch(request: Request, env: Env): Promise<Response> {
    const handler = createAnnouncementHandler(createD1Repository(env.DB), {
      adminToken: env.ADMIN_TOKEN,
    });
    return handler(request);
  },
};
