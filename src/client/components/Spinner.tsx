import { Loader2 } from "lucide-react";

/**
 * The one spinner. Four idioms were in use (daisyUI's `loading-spinner` in
 * three sizes and lucide's Loader2 at several), so a button that was saving
 * looked different on every screen.
 *
 * Props
 *   size   "xs" 12px, "sm" 14px (buttons, default), "md" 16px, "lg" 24px
 *   delay  wait ~200ms before showing, so a request that answers at once
 *          never flickers a spinner. Default on; turn it off inside a button
 *          whose label already changed, where the icon is the confirmation.
 *   label  accessible text when the spinner stands alone (a redirect). Inside
 *          a button the button's own label says it, so leave it out.
 * Reduced motion: app.css stops `animate-spin`; the icon stays as a mark.
 *
 * Example
 *   <button className="btn" disabled={pending}>
 *     {pending ? <Spinner delay={false} /> : <Save />} Kaydet
 *   </button>
 */
const SIZE = {
  xs: "size-3",
  sm: "size-3.5",
  md: "size-4",
  lg: "size-6",
} as const;

export function Spinner({
  size = "sm",
  delay = true,
  label,
  className = "",
}: {
  size?: keyof typeof SIZE;
  delay?: boolean;
  label?: string;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex shrink-0 ${delay ? "spinner-delay" : ""} ${className}`.trim()}
      role={label ? "status" : undefined}
    >
      <Loader2 className={`${SIZE[size]} animate-spin`} aria-hidden />
      {label ? <span className="sr-only">{label}</span> : null}
    </span>
  );
}
