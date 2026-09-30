import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import {
  estimateLighthouseMinutes,
  LIGHTHOUSE_CHECKS_PER_PAGE,
  UNKEYED_LIGHTHOUSE_PAGE_CAP,
} from "@/shared/audit-limits";
import { getPageSpeedKeyStatus } from "@/serverFunctions/pagespeedKey";
import { MIN_PAGES } from "@/client/features/audit/launch/types";
import type { useLaunchController } from "@/client/features/audit/launch/useLaunchController";
import { formatNumber } from "@/client/lib/format";
import { getFieldError, getFormError } from "@/client/lib/forms";
import { HelpTip } from "@/client/components/HelpTip";

type Props = {
  launchForm: ReturnType<typeof useLaunchController>["launchForm"];
  commitMaxPagesInput: () => number;
  maxPagesLimit: number;
};

export function LaunchFormCard({
  commitMaxPagesInput,
  launchForm,
  maxPagesLimit,
}: Props) {
  return (
    <div className="card bg-base-100 border border-base-300">
      <div className="card-body gap-4">
        <h2 className="card-title text-base">Yeni denetim başlat</h2>

        <form
          className="grid grid-cols-1 gap-3 lg:grid-cols-12 lg:items-center"
          onSubmit={(event) => {
            event.preventDefault();
            void launchForm.handleSubmit();
          }}
        >
          <launchForm.Field name="url">
            {(field) => {
              const urlError = getFieldError(field.state.meta.errors);

              return (
                <label
                  className={`input input-bordered w-full lg:col-span-9 ${urlError ? "input-error" : ""}`}
                >
                  <input
                    // A placeholder is not a label: it disappears on the
                    // first keystroke and is never announced as a name.
                    aria-label="Taranacak site adresi"
                    /*
                     * The error lives outside the form element, so without
                     * these a screen-reader user submitted, focus stayed on
                     * a field that still announced as valid, and the message
                     * sat in an unannounced region they never reached.
                     */
                    aria-invalid={urlError ? true : undefined}
                    aria-describedby={urlError ? "launch-url-error" : undefined}
                    placeholder="https://example.com"
                    value={field.state.value}
                    onChange={(event) => {
                      field.handleChange(event.target.value);
                      if (launchForm.state.errorMap.onSubmit) {
                        launchForm.setErrorMap({ onSubmit: undefined });
                      }
                    }}
                  />
                </label>
              );
            }}
          </launchForm.Field>

          <launchForm.Subscribe selector={(state) => state.isSubmitting}>
            {(isSubmitting) => (
              <button
                type="submit"
                className="btn btn-primary btn-sm w-full lg:col-span-3"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="size-4 animate-spin" /> Başlatılıyor…
                  </>
                ) : (
                  "Denetimi başlat"
                )}
              </button>
            )}
          </launchForm.Subscribe>

          <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:col-span-12 lg:items-start">
            <LaunchOptions
              launchForm={launchForm}
              commitMaxPagesInput={commitMaxPagesInput}
              maxPagesLimit={maxPagesLimit}
            />
            <LighthouseOptions launchForm={launchForm} />
          </div>
        </form>

        <LaunchErrors launchForm={launchForm} />
      </div>
    </div>
  );
}

function LaunchOptions({
  launchForm,
  commitMaxPagesInput,
  maxPagesLimit,
}: Props) {
  return (
    <div className="rounded-box border border-base-300 bg-base-200/20 p-3 space-y-2">
      {/* Not a <label>: it wraps nothing and carries no htmlFor, so it
          named no control. The field below gets its own name. */}
      <p className="text-xs font-medium uppercase tracking-wide text-muted">
        Kaç sayfa taransın?
      </p>
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted" aria-hidden>
          En fazla
        </span>
        <launchForm.Field name="maxPagesInput">
          {(field) => (
            <input
              type="number"
              aria-label="En çok taranacak sayfa sayısı"
              min={MIN_PAGES}
              max={maxPagesLimit}
              className="input input-bordered input-sm w-28"
              value={field.state.value}
              onChange={(event) => {
                const next = event.target.value;
                if (!/^\d*$/.test(next)) return;
                field.handleChange(next);
                if (launchForm.state.errorMap.onSubmit) {
                  launchForm.setErrorMap({ onSubmit: undefined });
                }
              }}
              onBlur={commitMaxPagesInput}
            />
          )}
        </launchForm.Field>
      </div>
      <p className="text-xs text-muted">
        {MIN_PAGES} ile {formatNumber(maxPagesLimit)} arasında bir sayı girin.
        Sınırı aşan sayfalar taranmaz.
      </p>
    </div>
  );
}

/** The real number of checks and a realistic duration for this launch. */
function LighthouseEstimate({ maxPages }: { maxPages: number }) {
  // Same key the settings screen uses, so this is usually a cache read.
  const keyQuery = useQuery({
    queryKey: ["pageSpeedKeyStatus"],
    queryFn: () => getPageSpeedKeyStatus(),
  });
  const hasKey = keyQuery.data ? keyQuery.data.source !== null : null;
  if (hasKey === null) return null;

  const pages = hasKey
    ? maxPages
    : Math.min(maxPages, UNKEYED_LIGHTHOUSE_PAGE_CAP);
  const checks = pages * LIGHTHOUSE_CHECKS_PER_PAGE;
  const minutes = estimateLighthouseMinutes(pages);

  return (
    <div className="space-y-1">
      <p className="text-xs text-muted">
        {hasKey
          ? `Taranan her sayfanın hızı telefonda ve bilgisayarda ölçülür. En çok ${formatNumber(pages)} sayfa, yani ${formatNumber(checks)} ölçüm; hız aşamasının yaklaşık ${formatNumber(minutes)} dakika sürmesi beklenir.`
          : `PageSpeed anahtarı yok: Google'ın ücretsiz kotası çok küçük olduğu için en çok ${formatNumber(UNKEYED_LIGHTHOUSE_PAGE_CAP)} sayfa (${formatNumber(UNKEYED_LIGHTHOUSE_PAGE_CAP * LIGHTHOUSE_CHECKS_PER_PAGE)} ölçüm) ölçülür, yaklaşık ${formatNumber(minutes)} dakika sürer.`}
      </p>
      {hasKey ? null : (
        <p className="text-xs text-muted">
          Tüm sayfaları ölçmek için{" "}
          <Link to="/settings" className="link">
            Ayarlar
          </Link>
          'dan ücretsiz bir PageSpeed anahtarı ekleyin.
        </p>
      )}
    </div>
  );
}

function LighthouseOptions({ launchForm }: Pick<Props, "launchForm">) {
  return (
    <div className="rounded-box border border-base-300 bg-base-200/20 p-3 space-y-2">
      <label className="label cursor-pointer justify-start gap-2 p-0">
        <launchForm.Field name="runLighthouse">
          {(field) => (
            <input
              type="checkbox"
              className="toggle toggle-sm toggle-primary"
              checked={Boolean(field.state.value)}
              onChange={(event) => field.handleChange(event.target.checked)}
            />
          )}
        </launchForm.Field>
        {/* `HelpTip`, not `title` on a span: a title on a non-interactive
            element is mouse-hover only, so a keyboard user never saw the
            explanation. */}
        <span className="text-sm font-medium text-muted">
          Sayfa hızını da ölç{" "}
          <HelpTip label="Hız ölçümü">
            Google Lighthouse ile taranan her sayfanın telefonda ve bilgisayarda
            ne kadar hızlı açıldığını ölçer, yavaşlatan sorunları listeler.
          </HelpTip>
        </span>
      </label>

      <launchForm.Subscribe
        selector={(snapshot) => ({
          runLighthouse: snapshot.values.runLighthouse,
          maxPagesInput: snapshot.values.maxPagesInput,
        })}
      >
        {({ runLighthouse, maxPagesInput }) =>
          runLighthouse ? (
            <LighthouseEstimate
              maxPages={Math.max(
                Number.parseInt(maxPagesInput, 10) || MIN_PAGES,
                MIN_PAGES,
              )}
            />
          ) : null
        }
      </launchForm.Subscribe>
    </div>
  );
}

function LaunchErrors({ launchForm }: Pick<Props, "launchForm">) {
  return (
    <div className="space-y-2">
      <launchForm.Field name="url">
        {(field) => {
          const urlError = getFieldError(field.state.meta.errors);

          return urlError ? (
            <p
              id="launch-url-error"
              className="text-sm text-[var(--ink-error)]"
            >
              {urlError}
            </p>
          ) : null;
        }}
      </launchForm.Field>

      <launchForm.Subscribe selector={(state) => state.errorMap.onSubmit}>
        {(submitError) => {
          const errorMessage = getFormError(submitError);

          return errorMessage ? (
            /* `role="alert"`: a form-level failure that appears after a
               submit is exactly the case an assertive region exists for. */
            <div role="alert" className="alert alert-error py-2">
              <span className="text-sm">{errorMessage}</span>
            </div>
          ) : null;
        }}
      </launchForm.Subscribe>
    </div>
  );
}
