import { pathToFileURL } from "node:url";

// Only published releases from the retired numbering scheme allow a reset.
const RETIRED = new Set(["2.0.0", "2.1.0", "2.2.0", "2.2.1", "2.3.0", "2.4.3"]);
const normalize = (value) => value.replace(/^v/, "");

export function shouldMarkLatest(candidate, current = "") {
  const next = normalize(candidate);
  const previous = normalize(current);
  if (
    !/^\d+\.\d+\.\d+$/.test(next) ||
    (previous && !/^\d+\.\d+\.\d+$/.test(previous))
  ) {
    throw new Error("Release policy requires plain x.y.z versions.");
  }
  if (!previous) return true;
  if (next.startsWith("0.") && RETIRED.has(previous)) return true;
  if (previous.startsWith("0.") && RETIRED.has(next)) return false;
  const left = next.split(".").map(Number);
  const right = previous.split(".").map(Number);
  for (let i = 0; i < 3; i++) {
    if (left[i] !== right[i]) return left[i] > right[i];
  }
  return true;
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  console.log(shouldMarkLatest(process.argv[2] ?? "", process.argv[3] ?? ""));
}
