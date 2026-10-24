/*
 * Two short synthesized tones, no audio files.
 *
 * Browsers refuse to start audio before the page has had a user gesture, so
 * the one AudioContext is created (or resumed) on the first pointer or key
 * press and reused after. A tone requested before that is simply skipped.
 */

type Tone = "success" | "error";

const GAIN = 0.06;
let context: AudioContext | null = null;

function getContext(): AudioContext | null {
  if (context) return context;
  if (typeof window === "undefined") return null;
  const Ctor = window.AudioContext;
  if (!Ctor) return null;
  try {
    context = new Ctor();
  } catch {
    return null;
  }
  return context;
}

let unlockInstalled = false;

/** Call once at startup; the first gesture creates and resumes the context. */
export function unlockSoundOnFirstGesture(): void {
  if (unlockInstalled || typeof window === "undefined") return;
  unlockInstalled = true;
  const unlock = () => {
    void getContext()
      ?.resume()
      .catch(() => {});
    window.removeEventListener("pointerdown", unlock);
    window.removeEventListener("keydown", unlock);
  };
  window.addEventListener("pointerdown", unlock);
  window.addEventListener("keydown", unlock);
}

function note(
  ctx: AudioContext,
  frequency: number,
  start: number,
  duration: number,
) {
  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();
  oscillator.type = "sine";
  oscillator.frequency.value = frequency;
  // A 10 ms attack and an exponential tail: no click at either end.
  gain.gain.setValueAtTime(0, start);
  gain.gain.linearRampToValueAtTime(GAIN, start + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  oscillator.connect(gain).connect(ctx.destination);
  oscillator.start(start);
  oscillator.stop(start + duration + 0.02);
}

/**
 * success: a rising major third (C6 then E6), about 150 ms in all.
 * error: one lower tone.
 */
export function playTone(tone: Tone): void {
  const ctx = context;
  if (!ctx || ctx.state !== "running") return;
  const now = ctx.currentTime;
  if (tone === "success") {
    note(ctx, 1046.5, now, 0.08);
    note(ctx, 1318.5, now + 0.07, 0.09);
  } else {
    note(ctx, 330, now, 0.2);
  }
}

/** For a button press: the click itself is the gesture that unlocks audio. */
export async function previewTone(tone: Tone = "success"): Promise<void> {
  const ctx = getContext();
  if (!ctx) return;
  try {
    await ctx.resume();
  } catch {
    return;
  }
  playTone(tone);
}
