/**
 * 64-bit SimHash of a page's visible text, for near-duplicate detection.
 *
 * `content_hash` (SHA-256) only groups pages whose text is byte-identical, so
 * two product pages that differ by a price or a colour name never meet. A
 * SimHash moves by a few bits when a few words change, so the Hamming
 * distance between two fingerprints says how much of the text they share.
 *
 * Built from overlapping two-word shingles weighted by how often each
 * occurs, each hashed to 64 bits as two 32-bit halves (FNV-1a, then the
 * murmur3 finaliser) so the whole thing stays in plain 32-bit integer
 * arithmetic -- no BigInt per shingle on a page that can carry a megabyte of
 * text. Two words, not one or three: measured on synthetic text, single
 * words let unrelated pages with a similar vocabulary land within a few bits
 * of each other, and three-word shingles moved five or more bits for a
 * one-word edit on a 200-word page.
 */

const SHINGLE_WORDS = 2;
/**
 * Below this many words of main content there is too little text for two
 * pages to be "the same" in any way a reader would care about.
 */
export const MIN_CONTENT_WORDS = 50;
/*
 * Words fingerprinted per page. The shingle counts are a map, and a
 * megabyte of text would make it six figures of entries on a crawl running
 * pages concurrently; the opening twenty thousand words decide whether two
 * pages say the same thing.
 */
const MAX_WORDS = 20_000;

function fnv1a(text: string): number {
  let hash = 0x811c9dc5;
  for (let i = 0; i < text.length; i++) {
    hash ^= text.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return hash >>> 0;
}

function fmix32(value: number): number {
  let h = value;
  h ^= h >>> 16;
  h = Math.imul(h, 0x85ebca6b);
  h ^= h >>> 13;
  h = Math.imul(h, 0xc2b2ae35);
  h ^= h >>> 16;
  return h >>> 0;
}

function addBits(
  weights: Int32Array,
  offset: number,
  hash: number,
  weight: number,
): void {
  for (let bit = 0; bit < 32; bit++) {
    weights[offset + bit] += (hash >>> bit) & 1 ? weight : -weight;
  }
}

function toBits(weights: Int32Array, offset: number): number {
  let value = 0;
  for (let bit = 0; bit < 32; bit++) {
    if (weights[offset + bit] > 0) value |= 1 << bit;
  }
  return value >>> 0;
}

function hex(value: number): string {
  return value.toString(16).padStart(8, "0");
}

/** 16 hex characters, or null when the text is too short to fingerprint. */
export function computeSimhash(text: string): string | null {
  const words = text
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, MAX_WORDS);
  if (words.length < MIN_CONTENT_WORDS) return null;
  const counts = new Map<string, number>();
  for (let i = 0; i + SHINGLE_WORDS <= words.length; i++) {
    const shingle = words.slice(i, i + SHINGLE_WORDS).join(" ");
    counts.set(shingle, (counts.get(shingle) ?? 0) + 1);
  }
  const weights = new Int32Array(64);
  for (const [shingle, count] of counts) {
    const hash = fnv1a(shingle);
    addBits(weights, 0, fmix32(hash), count);
    addBits(weights, 32, fmix32(hash ^ 0x9e3779b9), count);
  }
  return hex(toBits(weights, 32)) + hex(toBits(weights, 0));
}

function popcount32(value: number): number {
  let v = value - ((value >>> 1) & 0x55555555);
  v = (v & 0x33333333) + ((v >>> 2) & 0x33333333);
  return (Math.imul((v + (v >>> 4)) & 0x0f0f0f0f, 0x01010101) >>> 24) & 0xff;
}

/** Bits that differ between two fingerprints from `computeSimhash`. */
export function simhashDistance(a: string, b: string): number {
  const high = parseInt(a.slice(0, 8), 16) ^ parseInt(b.slice(0, 8), 16);
  const low = parseInt(a.slice(8), 16) ^ parseInt(b.slice(8), 16);
  return popcount32(high >>> 0) + popcount32(low >>> 0);
}
