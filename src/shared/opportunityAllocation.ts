import { sort } from "remeda";

/** Stable largest-remainder allocation; ties keep the input order. */
export function allocateGain(
  weights: readonly number[],
  total: number,
): number[] {
  const sum = weights.reduce((a, b) => a + b, 0);
  if (sum <= 0) return weights.map(() => 0);
  const shares = weights.map((weight) => (weight * total) / sum);
  const result = shares.map(Math.floor);
  const order = sort(
    shares.map((share, index) => ({ index, remainder: share - result[index] })),
    (a, b) => b.remainder - a.remainder || a.index - b.index,
  );
  const left = total - result.reduce((a, b) => a + b, 0);
  for (const entry of order.slice(0, left)) result[entry.index] += 1;
  return result;
}
