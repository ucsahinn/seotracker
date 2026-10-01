/**
 * Change against the previous period as a fraction (0.25 is +25%).
 *
 * Null when there is no usable base: a previous value of zero or below makes
 * the ratio infinite or sign-flipped, and "+Infinity%" is not something to
 * show. Callers render null as "no comparison" rather than as a number.
 */
export function fractionalChange(
  current: number,
  previous: number,
): number | null {
  if (previous <= 0) return null;
  return (current - previous) / previous;
}
