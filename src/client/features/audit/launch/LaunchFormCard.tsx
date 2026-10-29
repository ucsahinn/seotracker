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
import { fillParts } from "@/client/features/settings/fillParts";
import { t } from "@/shared/i18n";

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
    <section className="rounded-box border border-base-300 bg-base-100">
      {/* One card, rows split by hairlines: the page-count and speed options
          used to sit in two bordered boxes inside this one. */}
      <form
        className="divide-y divide-[var(--hairline)]"
        onSubmit={(event) => {
          event.preventDefault();
          void launchForm.handleSubmit();
        }}
      >
        <div className="space-y-3 p-4">
          <h2 className="text-sm font-semibold">{t("Yeni denetim başlat")}</h2>

          <div className="grid grid-cols-1 gap-3 lg:grid-cols-12 lg:items-center">
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
                      aria-label={t("Taranacak site adresi")}
                      /*
                       * The error lives outside the form element, so without
                       * these a screen-reader user submitted, focus stayed on
                       * a field that still announced as valid, and the message
                       * sat in an unannounced region they never reached.
                       */
                      aria-invalid={urlError ? true : undefined}
                      aria-describedby={
                        urlError ? "launch-url-error" : undefined
                      }
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
                      <Loader2 className="size-4 animate-spin" />{" "}
                      {t("Başlatılıyor…")}
                    </>
                  ) : (
                    t("Denetimi başlat")
                  )}
                </button>
              )}
            </launchForm.Subscribe>
          </div>

          <LaunchErrors launchForm={launchForm} />
        </div>

        <div className="px-4 py-3">
          <LaunchOptions
            launchForm={launchForm}
            commitMaxPagesInput={commitMaxPagesInput}
            maxPagesLimit={maxPagesLimit}
          />
        </div>
        <div className="px-4 py-3">
          <LighthouseOptions launchForm={launchForm} />
        </div>
      </form>
    </section>
  );
}

function LaunchOptions({
  launchForm,
  commitMaxPagesInput,
  maxPagesLimit,
}: Props) {
  // One sentence around the input, so English can order its own words.
  const [beforeInput, afterInput] = t("En fazla {input} sayfa tara").split(
    "{input}",
  );
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
      <div className="flex items-center gap-2">
        <span className="text-sm" aria-hidden>
          {beforeInput}
        </span>
        <launchForm.Field name="maxPagesInput">
          {(field) => (
            <input
              type="number"
              aria-label={t("En çok taranacak sayfa sayısı")}
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
        <span className="text-sm" aria-hidden>
          {afterInput}
        </span>
      </div>
      <p className="text-xs text-muted">
        {t("{min} ile {max} arasında bir sayı girin.", {
          min: formatNumber(MIN_PAGES),
          max: formatNumber(maxPagesLimit),
        })}
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
    <details className="max-w-prose text-sm text-muted sm:col-span-2">
      <summary className="cursor-pointer py-2">{t("Hız ölçümü")}</summary>
      <div className="mt-1.5 space-y-3 leading-relaxed">
        <p className="text-xs text-muted">
          {hasKey
            ? t(
                "Taranan her sayfanın hızı telefonda ve bilgisayarda ölçülür. En çok {pages} sayfa, yani {checks} ölçüm. Hız aşaması en az yaklaşık {minutes} dakika sürer, Google sınırına takılırsa daha uzun.",
                {
                  pages: formatNumber(pages),
                  checks: formatNumber(checks),
                  minutes: formatNumber(minutes),
                },
              )
            : t(
                "PageSpeed anahtarınız yok. Google'ın ücretsiz kotası küçük olduğu için en çok {pages} sayfa ({checks} ölçüm) ölçülür. Hız aşaması en az yaklaşık {minutes} dakika sürer, Google sınırına takılırsa daha uzun sürer.",
                {
                  pages: formatNumber(UNKEYED_LIGHTHOUSE_PAGE_CAP),
                  checks: formatNumber(
                    UNKEYED_LIGHTHOUSE_PAGE_CAP * LIGHTHOUSE_CHECKS_PER_PAGE,
                  ),
                  minutes: formatNumber(minutes),
                },
              )}
        </p>
        {hasKey ? null : (
          <p className="text-xs text-muted">
            {fillParts(
              t(
                "Tüm sayfaları ölçmek için {settings}'dan ücretsiz bir PageSpeed anahtarı ekleyin.",
              ),
              {
                settings: (
                  <Link to="/settings" className="btn btn-sm min-h-11">
                    {t("Ayarlar")}
                  </Link>
                ),
              },
            )}
          </p>
        )}
      </div>
    </details>
  );
}

function LighthouseOptions({ launchForm }: Pick<Props, "launchForm">) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <label className="flex min-w-0 cursor-pointer items-start gap-3 text-base-content">
        <launchForm.Field name="runLighthouse">
          {(field) => (
            <input
              type="checkbox"
              className="toggle toggle-sm toggle-primary shrink-0"
              checked={Boolean(field.state.value)}
              onChange={(event) => field.handleChange(event.target.checked)}
            />
          )}
        </launchForm.Field>
        {/* `HelpTip`, not `title` on a span: a title on a non-interactive
            element is mouse-hover only, so a keyboard user never saw the
            explanation. */}
        <span className="min-w-0 whitespace-normal text-sm">
          {t("Sayfa hızını da ölç")}{" "}
          <HelpTip label={t("Hız ölçümü")}>
            {t(
              "Google Lighthouse ile taranan her sayfanın telefonda ve bilgisayarda ne kadar hızlı açıldığını ölçer, yavaşlatan sorunları listeler.",
            )}
          </HelpTip>
          <span className="mt-1 block text-xs text-muted">
            {t("Daha uzun sürer.")}
          </span>
        </span>
      </label>

      <label className="flex min-w-0 cursor-pointer items-start gap-3 text-base-content">
        <launchForm.Field name="checkExternal">
          {(field) => (
            <input
              type="checkbox"
              className="toggle toggle-sm toggle-primary shrink-0"
              checked={Boolean(field.state.value)}
              onChange={(event) => field.handleChange(event.target.checked)}
            />
          )}
        </launchForm.Field>
        <span className="min-w-0 whitespace-normal text-sm">
          {t("Dış bağlantıları ve görsel boyutlarını da kontrol et")}{" "}
          <HelpTip label={t("Dış kontroller")}>
            {t(
              "Tarama bittikten sonra başka sitelere verilen bağlantıların açılıp açılmadığına ve sitenizdeki görsel dosyalarının boyutuna bakar. En çok 300 adres sorulur; sosyal ağlar gibi botları engelleyen siteler atlanır.",
            )}
          </HelpTip>
          {/* Both toggles carry a second line, so their labels line up. */}
          <span className="mt-1 block text-xs text-muted">
            {t("Tarama bittikten sonra çalışır.")}
          </span>
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
