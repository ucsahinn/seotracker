import { useLayoutEffect, useRef, type TextareaHTMLAttributes } from "react";
/** Keep the whole saved note readable, including after a viewport change. */
export function GrowingTextarea(
  props: TextareaHTMLAttributes<HTMLTextAreaElement>,
) {
  const ref = useRef<HTMLTextAreaElement>(null);
  useLayoutEffect(() => {
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
  return (
    <textarea
      {...props}
      ref={ref}
      style={{ ...props.style, overflowY: "hidden" }}
    />
  );
}
