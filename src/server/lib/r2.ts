import { env } from "cloudflare:workers";

export async function getJsonFromR2(key: string): Promise<string> {
  const object = await env.R2.get(key);
  if (!object) {
    throw new Error("Audit payload not found");
  }

  return object.text();
}

export async function putTextToR2(
  key: string,
  body: string,
): Promise<{ key: string; sizeBytes: number }> {
  await env.R2.put(key, body, {
    httpMetadata: {
      contentType: "application/json",
    },
  });

  return {
    key,
    sizeBytes: Buffer.byteLength(body),
  };
}

// R2 `delete` takes at most 1000 keys per call.
const R2_DELETE_CHUNK = 1000;

export async function deleteManyFromR2(keys: string[]): Promise<void> {
  for (let i = 0; i < keys.length; i += R2_DELETE_CHUNK) {
    await env.R2.delete(keys.slice(i, i + R2_DELETE_CHUNK));
  }
}
