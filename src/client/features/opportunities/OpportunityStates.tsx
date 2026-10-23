import { Link } from "@tanstack/react-router";
import { ChevronDown, Target } from "lucide-react";
import { useEffect, useState } from "react";
import { EmptyState } from "@/client/components/EmptyState";
import { formatDate } from "@/client/lib/format";

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
        Burası ne işe yarar?
        <ChevronDown
          aria-hidden
          className={`size-4 text-muted transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open ? (
        <p id="opportunities-intro" className="mt-2 text-sm text-muted">
          Google&apos;ın sayfanızı gösterdiği ama az tıklandığı ya da birkaç
          basamak yükselince çok daha fazla ziyaretçi getirecek sayfaları burada
          topluyoruz. Bir satıra tıklayınca nedenini ve ne yapmanız gerektiğini
          görürsünüz.
        </p>
      ) : null}
    </section>
  );
}

/**
 * This screen needs both Search Console and Analytics, so "not connected" is
 * the expected first state rather than a failure. The server reports only the
 * first missing source, so the copy names both and does not guess.
 */
export function NotReady({ projectId }: { projectId: string }) {
  return (
    <div className="rounded-box border border-base-300 bg-base-100">
      <EmptyState
        icon={Target}
        title="Fırsatlar için Search Console ve Analytics gerekir"
        description="Sıralamalar Search Console'dan, sayfaların kazandırdığı Analytics'ten gelir. İkisini de bağlayınca fırsatlar puanlanır."
        action={
          <Link
            to="/p/$projectId/settings/integrations"
            params={{ projectId }}
            className="btn btn-primary btn-sm"
          >
            Bağlantıları ayarla
          </Link>
        }
      />
    </div>
  );
}

/**
 * Nothing scored — and which of the two reasons it was decides what to do
 * next, so the screen has to say which.
 *
 * The old copy offered both at once ("ya hepsi ilk üçte, ya da henüz kimse
 * görmüyor") and neither is true when Search Console returned no pages at
 * all for the period, which is exactly the state a fresh property is in.
 * It also never named the period, so "no pages" read as a verdict on the
 * site rather than on twenty-eight days of it.
 */
export function NoOpportunities({
  dateRange,
  pagesConsidered,
}: {
  dateRange: { startDate: string; endDate: string };
  pagesConsidered: number;
}) {
  const period = `${formatDate(dateRange.startDate)} – ${formatDate(dateRange.endDate)}`;

  if (pagesConsidered === 0) {
    return (
      <EmptyState
        icon={Target}
        title="Search Console bu dönem için veri vermedi"
        description={`${period} aralığında hiçbir sayfanız arama sonuçlarında görünmedi. Mülkü yeni bağladıysanız Google'ın veriyi doldurması birkaç gün sürer.`}
      />
    );
  }

  return (
    <EmptyState
      icon={Target}
      title="Bu dönemde fırsat çıkmadı"
      description={`${period} aralığında puanlanacak bir sayfa çıkmadı. Dönemi genişletmeyi deneyin.`}
    />
  );
}
