import { t } from "@/shared/i18n";
import { Link } from "@tanstack/react-router";
import { ChevronDown, Target } from "lucide-react";
import { useEffect, useState } from "react";
import { EmptyState } from "@/client/components/EmptyState";
import { formatCount, formatDate } from "@/client/lib/format";

export const INTRO_STORAGE_KEY = "seotracker:opportunities-intro-collapsed";

/** Storage can be missing or throw (private window, blocked site data); the intro then just stays open. */
function readCollapsed(): boolean {
  try {
    return window.localStorage.getItem(INTRO_STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

function writeCollapsed(collapsed: boolean): void {
  try {
    if (collapsed) window.localStorage.setItem(INTRO_STORAGE_KEY, "1");
    else window.localStorage.removeItem(INTRO_STORAGE_KEY);
  } catch {
    // Not remembered; the toggle still works for this visit.
  }
}

/**
 * What this screen is for, said once at the top. Open the first time -- a
 * page whose purpose was unclear is why this exists -- and collapsible; the
 * choice is kept per browser so it does not reopen on every visit. Read in an
 * effect rather than the initial state so server and client render the same
 * markup.
 */
export function Intro({ collapsedByDefault }: { collapsedByDefault: boolean }) {
  const [stored, setStored] = useState(true);
  // Set once the operator has used the toggle; until then a screen with
  // nothing connected starts closed, so the empty state below is the first
  // thing read.
  const [touched, setTouched] = useState(false);
  useEffect(() => {
    setStored(!readCollapsed());
  }, []);
  const open = touched ? stored : stored && !collapsedByDefault;
  const toggle = () => {
    writeCollapsed(open);
    setStored(!open);
    setTouched(true);
  };
  return (
    <section className="rounded-box border border-base-300 bg-base-100 p-4 shadow-[var(--shadow-raise)]">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="opportunities-intro"
        onClick={toggle}
        className="flex w-full items-center justify-between gap-2 text-left text-sm font-semibold"
      >
        {t("Burası ne işe yarar?")}
        <ChevronDown
          aria-hidden
          className={`size-4 text-muted transition-transform motion-reduce:transition-none ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open ? (
        <p id="opportunities-intro" className="mt-2 text-sm text-muted">
          {t(
            "Her sayfa için tek bir soru: ayda kaç tıklama daha getirebilir ve bunun için ne yapmalı? Tahmin, sitenizin kendi tıklama oranlarından yapılır. Kazancı olmayan sayfalar listede yer almaz. Bir satıra tıklayınca hangi aramaların bu kazancı getirdiğini görürsünüz.",
          )}
        </p>
      ) : null}
    </section>
  );
}

/**
 * The estimate needs Search Console; Analytics only adds a label beside it,
 * so "not connected" names the one source that is actually required.
 */
export function NotReady({ projectId }: { projectId: string }) {
  return (
    <div className="rounded-box border border-base-300 bg-base-100">
      <EmptyState
        icon={Target}
        title={t("Fırsatlar için Search Console gerekir")}
        description={t(
          "Tahminler Search Console'daki aramalardan hesaplanır. Analytics'i de bağlarsanız hangi sayfaların dönüşüm getirdiği yanında görünür.",
        )}
        action={
          <Link
            to="/p/$projectId/settings/integrations"
            params={{ projectId }}
            className="btn btn-primary btn-sm"
          >
            {t("Bağlantıları ayarla")}
          </Link>
        }
      />
    </div>
  );
}

/**
 * Nothing to gain -- and which of the reasons it was decides what to do next,
 * so the screen says which, and names the period it is about.
 */
export function NoOpportunities({
  dateRange,
  pagesConsidered,
  curveInsufficient,
  unknownPages = 0,
  hiddenQueryPages = 0,
  days,
}: {
  dateRange: { startDate: string; endDate: string };
  pagesConsidered: number;
  /** The site has too few queries per position band for any estimate. */
  curveInsufficient: boolean;
  unknownPages?: number;
  /** Pages with impressions but no usable non-brand query rows in this response. */
  hiddenQueryPages?: number;
  days: number;
}) {
  const period = {
    start: formatDate(dateRange.startDate),
    end: formatDate(dateRange.endDate),
  };
  const widen =
    days < 90
      ? ` ${t("Daha uzun bir dönem seçmek daha çok arama gösterebilir.")}`
      : "";

  if (pagesConsidered === 0) {
    return (
      <EmptyState
        icon={Target}
        title={t("Search Console bu dönem için veri vermedi")}
        description={
          t(
            "{start} – {end} aralığında sayfa verisi alınamadı. Bu, hiç gösterim olmadığı anlamına gelmez; Arama performansında bağlı mülkü ve tarihleri kontrol edin.",
            period,
          ) + widen
        }
      />
    );
  }

  if (unknownPages > 0) {
    // 90 days is the longest window this screen offers; suggesting it when it
    // is already selected sends the operator round in a circle.
    if (hiddenQueryPages * 2 >= unknownPages) {
      return (
        <EmptyState
          icon={Target}
          title={t("Bu sayfalar için tahmin edilebilir arama yok")}
          description={`${period.start} – ${period.end}. ${t(
            "{hidden} sayfa gösterim aldı; alınan veride tahmine uygun marka dışı arama bulunamadı. Google'ın gizlediği sorgular, marka ayrımı veya veri sınırları buna yol açabilir. Bu sayfalarda kazanç sıfır değil, bilinmiyor.",
            { hidden: formatCount(hiddenQueryPages) },
          )}${widen}`}
        />
      );
    }
    return (
      <EmptyState
        icon={Target}
        title={t("Tahmin için veri henüz az")}
        description={`${period.start} – ${period.end}. ${t(
          "{count} sayfanın aramaları tahmin için yeterli gösterim almadı ya da sitenizde karşılaştırılacak sıra verisi yok.",
          { count: formatCount(unknownPages) },
        )}${widen}`}
      />
    );
  }

  if (curveInsufficient) {
    return (
      <EmptyState
        icon={Target}
        title={t("Tahmin için veri henüz az")}
        description={
          t(
            "{start} – {end} aralığında sitenizin tıklama oranını sıraya göre ölçecek kadar arama yok. Arama performansında gösterim alan sorguları inceleyin; daha fazla veri birikince tahmin yeniden hesaplanabilir.",
            period,
          ) + widen
        }
      />
    );
  }

  return (
    <EmptyState
      icon={Target}
      title={t("Bu dönemde kazanç beklenen sayfa yok")}
      description={t(
        "{start} – {end} aralığında hesaplanabilen {count} sayfada ek kazanç hesaplanmadı. Bu, yapılacak iş olmadığı anlamına gelmez.",
        { ...period, count: pagesConsidered },
      )}
    />
  );
}
