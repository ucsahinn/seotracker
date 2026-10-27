import * as React from "react";
import { useBlocker } from "@tanstack/react-router";
import { t } from "@/shared/i18n";

const DraftContext = React.createContext<(id: string, dirty: boolean) => void>(
  () => {},
);

/** One navigation warning across prose and all inline editors. */
export function DraftGuard({ children }: { children: React.ReactNode }) {
  const [dirtyForms, setDirtyForms] = React.useState<Set<string>>(
    () => new Set(),
  );
  const register = React.useCallback((id: string, dirty: boolean) => {
    setDirtyForms((current) => {
      if (current.has(id) === dirty) return current;
      const next = new Set(current);
      if (dirty) next.add(id);
      else next.delete(id);
      return next;
    });
  }, []);
  const dirty = dirtyForms.size > 0;
  useBlocker({
    disabled: !dirty,
    enableBeforeUnload: dirty,
    shouldBlockFn: () =>
      dirty &&
      !window.confirm(
        t(
          "Kaydedilmemiş değişiklikleriniz var. Bu sayfadan ayrılmak istiyor musunuz?",
        ),
      ),
  });
  return (
    <DraftContext.Provider value={register}>{children}</DraftContext.Provider>
  );
}

export function useDirtyDraft(dirty: boolean) {
  const register = React.useContext(DraftContext);
  const id = React.useId();
  React.useEffect(() => {
    register(id, dirty);
    return () => register(id, false);
  }, [register, id, dirty]);
}
