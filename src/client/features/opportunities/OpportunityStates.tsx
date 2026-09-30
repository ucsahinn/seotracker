import { Link } from "@tanstack/react-router";
import { ChevronDown, Target } from "lucide-react";
import { useState } from "react";
import { EmptyState } from "@/client/components/EmptyState";
import { formatDate } from "@/client/lib/format";

/**
 * What this screen is for, said once at the top. Open by default -- a page
 * whose purpose was unclear is why this exists -- and collapsible so it does
 * not sit above the table forever for someone who has read it.
 */
export function Intro() {
  const [open, setOpen] = useState(true);
  return (
    <section className="rounded-box border border-base-300 bg-base-100 px-4 py-3">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="opportunities-intro"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-2 text-left text-sm font-medium"
      >
        Bu ekran ne işe yarar?
        <ChevronDown
          aria-hidden
          className={`size-4 text-muted transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open ? (
        <p id="opportunities-intro" className="mt-2 text-sm text-muted">
          Google&apos;ın sayfalarınızı gösterdiği ama yeterince tıklanmayan ya
          da birkaç basamak yükselirse çok daha fazla ziyaretçi getirecek
          sayfaları burada topluyoruz; her satır üzerinde çalışmaya değer bir
          sayfa. Bir satıra tıklayın: neden listede olduğunu ve ne yapmanız
          gerektiğini görürsünüz.
        </p>
      ) : null}
    </section>
  );
}

/**
 * This screen needs both Search Console and Analytics, so "not connected" is
 * the expected first state rather than a failure. The server says which one is
 * missing; this used to guess by matching the error text, which never worked
 * because the message reaching the client is a generic one.
 */
export function NotReady({
  projectId,
  missing,
}: {
  projectId: string;
  missing: "needs_ga4" | "needs_gsc";
}) {
  const needsGa4 = missing === "needs_ga4";

  return (
    <div className="rounded-box border border-base-300 bg-base-100">
      <EmptyState
        icon={Target}
        title={
          needsGa4
            ? "Google Analytics bağlı değil"
            : "Search Console bağlı değil"
        }
        description="Bu ekran iki kaynağı birleştirir: sıralamalar Search Console'dan, sayfaların ne kazandırdığı Analytics'ten gelir. İkisi de bağlı olmadan fırsatlar puanlanamaz."
        action={
          <Link
            to="/p/$projectId/settings/integrations"
            params={{ projectId }}
            className="btn btn-primary btn-sm"
          >
            Bağlantıları aç
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
        title="Search Console bu dönem için veri döndürmedi"
        description={`${period} aralığında hiçbir sayfanız arama sonuçlarında görünmedi. Mülk yeni bağlandıysa Google'ın veriyi doldurması birkaç gün sürer.`}
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
