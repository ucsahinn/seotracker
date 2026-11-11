/**
 * The Microsoft Store build of the Windows package keeps its data in its
 * package folder, not in `%LOCALAPPDATA%\seowatcher`. Every prompt, command and
 * hint is written for the installer's folder and rewritten here for a Store
 * install, in the three spellings they use (cmd and Explorer, PowerShell, Git
 * Bash), so no second copy of that text exists to drift.
 */
export function withWindowsDataDir(
  text: string,
  storeDataDir: string | null | undefined,
) {
  if (!storeDataDir) return text;
  const tail = storeDataDir.slice("%LOCALAPPDATA%".length);
  return text
    .replaceAll("%LOCALAPPDATA%\\seowatcher", storeDataDir)
    .replaceAll("$env:LOCALAPPDATA\\seowatcher", `$env:LOCALAPPDATA${tail}`)
    .replaceAll(
      "$LOCALAPPDATA/seowatcher",
      `$LOCALAPPDATA${tail.replaceAll("\\", "/")}`,
    );
}
