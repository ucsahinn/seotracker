import {
  GoogleAccessRepository,
  type GoogleAccessScope,
} from "./GoogleAccessRepository";
import { hasServiceAccount } from "@/server/lib/googleServiceAccountToken";
import { googleFailureReason } from "./googleFailureReason";

export async function googleAccessScope(
  input: Omit<GoogleAccessScope, "generation">,
): Promise<GoogleAccessScope> {
  // Read generation before resolving the credential: a concurrent edit can
  // only leave this observation in an old generation, never bless a new one.
  const generation = await GoogleAccessRepository.generation();
  const serviceAccount = await hasServiceAccount();
  return {
    ...input,
    generation,
    accountId: serviceAccount ? "service-account" : input.accountId,
  };
}

export async function observeGoogleAccess<T>(
  scope: GoogleAccessScope,
  read: () => Promise<T>,
): Promise<T> {
  const startedAt = new Date().toISOString();
  let result: T;
  try {
    result = await read();
  } catch (error) {
    try {
      await GoogleAccessRepository.record(
        scope,
        googleFailureReason(error),
        startedAt,
      );
    } catch {
      // Preserve the original provider failure when local evidence storage fails.
      console.error("google.access_evidence_write_failed");
    }
    throw error;
  }
  await GoogleAccessRepository.record(scope, null, startedAt);
  return result;
}

export async function readGoogleAccess(
  input: Omit<GoogleAccessScope, "generation">,
) {
  return GoogleAccessRepository.read(await googleAccessScope(input));
}
