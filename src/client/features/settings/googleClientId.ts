import { t } from "@/shared/i18n";

export const CLIENT_ID_SUFFIX = ".apps.googleusercontent.com";

/**
 * A Google OAuth client id always ends in `.apps.googleusercontent.com`. The
 * server accepts any non-empty string, so a pasted client *secret*, or an id
 * with a stray space, saved fine and failed later at Google's consent screen
 * with an error that does not mention the id. Catching it here names the
 * actual mistake.
 */
export function clientIdProblem(value: string): string | null {
  const id = value.trim();
  if (id === "") return null;
  if (/\s/.test(id)) return t("Kimlikte boşluk olamaz.");
  if (!id.endsWith(CLIENT_ID_SUFFIX)) {
    return t(
      "Kimlik {suffix} ile bitmeli. Gizli anahtarı değil, OAuth client ID'yi yapıştırın.",
      { suffix: CLIENT_ID_SUFFIX },
    );
  }
  return null;
}
