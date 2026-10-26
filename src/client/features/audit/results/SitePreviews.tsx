import { ImageOff } from "lucide-react";
import { useState } from "react";
import { formatCount } from "@/client/lib/format";
import {
  SERP_DESCRIPTION_FONT_PX,
  SERP_DESCRIPTION_MAX_PX,
  SERP_TITLE_MAX_PX,
  textPixelWidth,
  truncateToPixels,
} from "@/shared/serp-pixel-width";
import { t } from "@/shared/i18n";
import type { AuditInsightsData } from "./types";

type StartPage = NonNullable<AuditInsightsData["startPage"]>;

/** "https://example.com/blog/post" as a result prints it: "example.com › blog › post". */
function breadcrumb(url: string): { host: string; trail: string } {
  try {
    const parsed = new URL(url);
    const parts = parsed.pathname.split("/").filter(Boolean);
    return {
      host: parsed.host,
      trail: parts.length > 0 ? ` › ${parts.join(" › ")}` : "",
    };
  } catch {
    return { host: url, trail: "" };
  }
}

/**
 * The start page as a Google result and as a shared link would show it.
 *
 * The title and description are cut by rendered width, as Google cuts them,
 * through the same table the title-width check uses, so the preview and
 * the finding agree on where the ellipsis lands. Google may rewrite either;
 * this shows what the page asks for.
 */
export function SitePreviews({
  page,
  screenshot,
  twitterMeasured,
}: {
  page: StartPage;
  /** The mobile Lighthouse run's final screenshot (data URI), if kept. */
  screenshot: string | null;
  /**
   * False for an audit from before the site probes, which did not record
   * the Twitter card either: "not defined" there would be a guess.
   */
  twitterMeasured: boolean;
}) {
  const previews = (
    <div className="grid items-start gap-4 lg:grid-cols-2">
      <SerpPreview page={page} />
      <SocialPreview page={page} twitterMeasured={twitterMeasured} />
    </div>
  );
  if (!screenshot) return previews;
  return (
    <div className="grid items-start gap-4 lg:grid-cols-[15rem_1fr]">
      <PhoneFrame url={page.url} screenshot={screenshot} />
      {previews}
    </div>
  );
}

/**
 * The start page as a phone showed it at the end of the mobile speed run.
 * One still from Lighthouse, not a live render: what loaded by then.
 */
function PhoneFrame({ url, screenshot }: { url: string; screenshot: string }) {
  return (
    <figure className="mx-auto w-full max-w-[15rem]">
      <div className="rounded-box border border-[var(--hairline)] bg-base-200 p-2 shadow-[var(--shadow-raise)]">
        <p
          className="mb-2 truncate rounded-full bg-base-100 px-3 py-1 text-center text-[11px] text-muted"
          title={url}
        >
          {breadcrumb(url).host}
        </p>
        <div className="overflow-hidden rounded-field border border-[var(--hairline)] bg-base-100">
          <img
            src={screenshot}
            alt={t("{url} adresinin telefondaki görünümü", { url })}
            className="block w-full"
          />
        </div>
      </div>
      <figcaption className="mt-2 text-center text-xs text-subtle">
        {t("Mobil hız ölçümünün son ekran görüntüsü")}
      </figcaption>
    </figure>
  );
}

function SerpPreview({ page }: { page: StartPage }) {
  const { host, trail } = breadcrumb(page.url);
  const title = truncateToPixels(page.title ?? "", SERP_TITLE_MAX_PX);
  const description = truncateToPixels(
    page.metaDescription ?? "",
    SERP_DESCRIPTION_MAX_PX,
    SERP_DESCRIPTION_FONT_PX,
  );
  const titlePx = textPixelWidth(page.title ?? "");

  return (
    <figure className="flex flex-col items-stretch justify-start rounded-box border border-[var(--hairline)] bg-base-100 p-4">
      <figcaption className="mb-3 text-sm font-medium">
        {t("Google arama sonucu önizlemesi")}
      </figcaption>
      <div className="rounded-field border border-[var(--hairline)] bg-base-200/30 p-4 font-[Arial,sans-serif]">
        <div className="flex items-center gap-2.5">
          <span
            aria-hidden
            className="flex size-7 shrink-0 items-center justify-center rounded-full bg-base-200 text-xs font-semibold uppercase text-muted"
          >
            {host.replace(/^www\./, "").charAt(0)}
          </span>
          <span className="min-w-0 leading-tight">
            <span className="block truncate text-sm">{host}</span>
            <span className="block truncate text-xs text-muted">
              {page.url.startsWith("https") ? "https://" : "http://"}
              {host}
              {trail}
            </span>
          </span>
        </div>
        <p className="mt-2 text-xl leading-snug text-[var(--ink-info)]">
          {title.text || (
            <span className="text-subtle">{t("(başlık yok)")}</span>
          )}
        </p>
        <p className="mt-1 text-sm leading-relaxed text-muted">
          {description.text || (
            <span className="text-subtle">
              {t("(meta açıklama yok; Google sayfadan bir parça seçer)")}
            </span>
          )}
        </p>
      </div>
      <ul className="mt-3 space-y-1 text-xs text-muted">
        <li>
          {title.truncated
            ? t(
                "Başlık {px} piksel; yaklaşık {max} pikselden sonrası kesiliyor.",
                {
                  px: formatCount(titlePx),
                  max: formatCount(SERP_TITLE_MAX_PX),
                },
              )
            : page.title
              ? t("Başlık {px} piksel, sığıyor.", { px: formatCount(titlePx) })
              : t("Sayfanın başlığı yok.")}
        </li>
        {description.truncated ? (
          <li>
            {t("Açıklama iki satıra sığmıyor; sonu kesilerek gösterilir.")}
          </li>
        ) : null}
      </ul>
    </figure>
  );
}

function SocialPreview({
  page,
  twitterMeasured,
}: {
  page: StartPage;
  twitterMeasured: boolean;
}) {
  const [broken, setBroken] = useState(false);
  const { host } = breadcrumb(page.url);
  const title = page.ogTitle ?? page.title;
  const description = page.ogDescription ?? page.metaDescription;
  const missing = [
    page.ogTitle ? null : "og:title",
    page.ogDescription ? null : "og:description",
    page.ogImage ? null : "og:image",
  ].filter((name): name is string => name !== null);

  return (
    <figure className="flex flex-col items-stretch justify-start rounded-box border border-[var(--hairline)] bg-base-100 p-4">
      <figcaption className="mb-3 text-sm font-medium">
        {t("Paylaşım kartı önizlemesi (Open Graph)")}
      </figcaption>
      <div className="overflow-hidden rounded-field border border-[var(--hairline)]">
        <div className="flex aspect-[1.91/1] items-center justify-center bg-base-200">
          {page.ogImage && !broken ? (
            <img
              src={page.ogImage}
              alt=""
              loading="lazy"
              referrerPolicy="no-referrer"
              onError={() => setBroken(true)}
              className="size-full object-cover"
            />
          ) : (
            <span className="flex flex-col items-center gap-1.5 text-xs text-subtle">
              <ImageOff aria-hidden className="size-5" />
              {page.ogImage ? t("Görsel açılamadı") : t("og:image yok")}
            </span>
          )}
        </div>
        <div className="space-y-0.5 border-t border-[var(--hairline)] bg-base-200/30 px-3 py-2.5">
          <p className="truncate text-xs text-subtle">{host}</p>
          <p className="truncate text-sm font-semibold">
            {title ?? t("(başlık yok)")}
          </p>
          {description ? (
            <p className="line-clamp-2 text-xs text-muted">{description}</p>
          ) : null}
        </div>
      </div>
      <ul className="mt-3 space-y-1 text-xs text-muted">
        <li>
          {missing.length === 0
            ? t("Open Graph başlığı, açıklaması ve görseli tanımlı.")
            : t(
                "Eksik: {tags}. Paylaşım siteleri yerine sayfadan tahmin eder.",
                {
                  tags: missing.join(", "),
                },
              )}
        </li>
        <li>
          {page.twitterCard
            ? t("Twitter kartı: {card}", { card: page.twitterCard })
            : twitterMeasured
              ? t("Twitter kartı tanımlı değil.")
              : t("Twitter kartı: ölçülmedi.")}
        </li>
      </ul>
    </figure>
  );
}
