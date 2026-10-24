import { Link } from "@tanstack/react-router";
import { LifeBuoy, SearchX } from "lucide-react";
import { EmptyState } from "@/client/components/EmptyState";
import { PageHeader, PageShell } from "@/client/components/PageShell";
import { t } from "@/shared/i18n";

/**
 * The page behind a link that leads nowhere.
 *
 * It was a bare "404" in the corner, which reads as a crash. It says what
 * happened in words, and offers the two ways out an operator actually wants:
 * back to the panel, or to Yardım if they were following a link they expected
 * to work.
 */
export function NotFound() {
  return (
    <PageShell width="reading">
      <PageHeader title={t("Sayfa bulunamadı")} />
      <div className="rounded-box border border-base-300 bg-base-100">
        <EmptyState
          icon={SearchX}
          title={t("Bu adreste bir sayfa yok")}
          description={t(
            "Adres yanlış yazılmış ya da sayfa kaldırılmış olabilir. Panelden devam edebilir ya da Yardım'a bakabilirsiniz.",
          )}
          action={
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Link to="/" className="btn btn-primary btn-sm">
                {t("Panele dön")}
              </Link>
              <Link to="/support" className="btn btn-sm gap-1.5">
                <LifeBuoy className="size-4" aria-hidden />
                {t("Yardım")}
              </Link>
            </div>
          }
        />
      </div>
    </PageShell>
  );
}
