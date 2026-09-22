import { Link } from "@tanstack/react-router";
import { AlertTriangle } from "lucide-react";
import { SafeExternalLink } from "@/client/components/SafeExternalLink";

export function GoogleOAuthSetupWarning({
  integrationName,
  docsUrl,
}: {
  integrationName: string;
  docsUrl: string;
}) {
  return (
    <div className="alert alert-warning items-start text-sm">
      <AlertTriangle className="mt-0.5 size-4 shrink-0" />
      <div className="space-y-1">
        <p className="font-medium">Google istemcisi tanımlı değil</p>
        <p className="text-muted">
          {integrationName} bağlamadan önce Google istemci kimliğinizi ve gizli
          anahtarınızı girin.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/settings"
            className="font-medium underline underline-offset-2"
          >
            Ayarlar'da gir
          </Link>
          <SafeExternalLink
            url={docsUrl}
            label="Kurulum kılavuzunu aç"
            className="inline-flex items-center gap-1 font-medium underline underline-offset-2"
          />
        </div>
      </div>
    </div>
  );
}
