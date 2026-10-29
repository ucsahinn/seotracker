import { useLayoutEffect, useRef, type TextareaHTMLAttributes } from "react";

const sizesItself = () =>
  typeof CSS !== "undefined" &&
  typeof CSS.supports === "function" &&
  CSS.supports("field-sizing", "content");

/**
 * Keep the whole saved note readable, including after a viewport change.
 * `field-sizing: content` grows the field (placeholder included) where the
 * browser supports it; elsewhere the height follows `scrollHeight`. Either
 * way the field never drops below four lines, and stops at most of the
 * viewport so a very long note scrolls inside the field instead of pushing
 * the save button off screen.
 */
export function GrowingTextarea(
  props: TextareaHTMLAttributes<HTMLTextAreaElement>,
) {
  const ref = useRef<HTMLTextAreaElement>(null);
  useLayoutEffect(() => {
    if (sizesItself()) return;
    const resize = () => {
      const field = ref.current;
      if (!field) return;
      field.style.height = "auto";
      field.style.height = field.scrollHeight + "px";
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [props.value]);
  const lines = String(props.value ?? "").split("\n").length;
  return (
    <textarea
      {...props}
      ref={ref}
      rows={Math.max(props.rows ?? 4, Math.min(lines, 20))}
      className={`${props.className ?? ""} min-h-24 max-h-[70vh] resize-y [field-sizing:content]`}
      style={{ ...props.style, overflowY: "auto" }}
    />
  );
}
