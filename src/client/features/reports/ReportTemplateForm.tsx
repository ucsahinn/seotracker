import { toast } from "sonner";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { z } from "zod";
import { Modal } from "@/client/components/Modal";
import { getStandardErrorMessage } from "@/client/lib/error-messages";
import { getFieldError } from "@/client/lib/forms";
import { captureClientEvent } from "@/client/lib/observability";
import { saveReportTemplate } from "@/serverFunctions/reportTemplates";
import type { ReportTemplate } from "@/types/schemas/report-templates";
import { t } from "@/shared/i18n";

// One form for create and edit. Shape only, as at every other boundary: the
// caps come back from the service with their copy and show in the alert.
// Built per render: the messages are in the UI language, unknown at import.
function makeFormSchema() {
  return z.object({
    name: z.string().trim().min(1, t("Şablona bir ad verin.")),
    description: z
      .string()
      .trim()
      .min(1, t("Bu şablonun ne zaman kullanılacağını tek cümleyle yazın.")),
    instructions: z
      .string()
      .trim()
      .min(
        1,
        t("Raporun kime yazıldığını ve hangi bölümlerden oluştuğunu yazın."),
      ),
  });
}

type FormValues = z.infer<ReturnType<typeof makeFormSchema>>;

const INSTRUCTIONS_PLACEHOLDER =
  "Kitle: müşterinin pazarlama sorumlusu, teknik biri değil.\nBölümler, sırayla: Neredeyiz / Bu ay ne yaptık / Ne değişti / Sırada ne var.\nÜslup: sade ve kendinden emin. Her SEO terimini açıkla. Ünlem kullanma.\nİmza: Acme SEO\nVurgu rengi: #1C4ED8";

export function ReportTemplateForm({
  projectId,
  template,
  onClose,
  onSaved,
}: {
  projectId: string;
  /** The template being edited, or undefined when creating one. */
  template?: ReportTemplate;
  onClose: () => void;
  onSaved: () => void;
}) {
  const saveMutation = useMutation({
    // A refusal (duplicate name, the cap) comes back as `{ ok: false }` rather
    // than an error, because thrown errors reach the client stripped to their
    // code. Rethrowing it here gives the form one error branch.
    mutationFn: async (values: FormValues) => {
      const result = await saveReportTemplate({
        data: { projectId, templateId: template?.id, ...values },
      });
      if (!result.ok) throw new Error(result.message);
      return result;
    },
    onSuccess: (result) => {
      captureClientEvent("report_template:saved", {
        project_id: projectId,
        is_update: !result.created,
        source: "app",
      });
      toast.success(
        result.created ? t("Şablon oluşturuldu") : t("Şablon kaydedildi"),
      );
      onSaved();
    },
  });

  const error = saveMutation.error
    ? getStandardErrorMessage(saveMutation.error, t("Şablon kaydedilemedi"))
    : null;

  const form = useForm({
    defaultValues: {
      name: template?.name ?? "",
      description: template?.description ?? "",
      instructions: template?.instructions ?? "",
    },
    validators: { onSubmit: makeFormSchema() },
    onSubmit: ({ value }) => saveMutation.mutate(value),
  });

  return (
    <Modal maxWidth="max-w-2xl" onClose={onClose} labelledBy="template-title">
      <h3 id="template-title" className="text-lg font-semibold">
        {template ? t("Şablonu düzenle") : t("Yeni şablon")}
      </h3>

      <form
        className="space-y-4"
        onSubmit={(event) => {
          event.preventDefault();
          void form.handleSubmit();
        }}
      >
        <form.Field name="name">
          {(field) => (
            <Labelled
              label={t("Ad")}
              error={getFieldError(field.state.meta.errors)}
            >
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder={t("Aylık müşteri değerlendirmesi")}
                value={field.state.value}
                onChange={(event) => field.handleChange(event.target.value)}
              />
            </Labelled>
          )}
        </form.Field>

        <form.Field name="description">
          {(field) => (
            <Labelled
              label={t("Açıklama")}
              hint={t(
                "Ne zaman kullanılacağını anlatan tek cümle. Bir ajan kararını buna bakarak verir.",
              )}
              error={getFieldError(field.state.meta.errors)}
            >
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder={t(
                  "Sürekli çalıştığımız müşterilere gönderdiğimiz aylık güncelleme.",
                )}
                value={field.state.value}
                onChange={(event) => field.handleChange(event.target.value)}
              />
            </Labelled>
          )}
        </form.Field>

        <form.Field name="instructions">
          {(field) => (
            <Labelled
              label={t("Yönerge")}
              hint={t(
                "Projenin geneline ait marka dili Proje bilgisi › Yazım tercihleri altında tutulur.",
              )}
              error={getFieldError(field.state.meta.errors)}
            >
              <textarea
                className="textarea textarea-bordered h-56 w-full font-mono text-xs leading-relaxed"
                placeholder={t(INSTRUCTIONS_PLACEHOLDER)}
                value={field.state.value}
                onChange={(event) => field.handleChange(event.target.value)}
              />
            </Labelled>
          )}
        </form.Field>

        {error ? (
          <div className="alert alert-error" role="alert">
            <span className="text-sm">{error}</span>
          </div>
        ) : null}

        <div className="flex justify-end gap-2">
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={onClose}
          >
            {t("Vazgeç")}
          </button>
          <button
            type="submit"
            className="btn btn-primary btn-sm gap-1"
            disabled={saveMutation.isPending}
          >
            {saveMutation.isPending ? (
              <Loader2 className="size-3 animate-spin" />
            ) : null}
            {template ? t("Değişiklikleri kaydet") : t("Şablon oluştur")}
          </button>
        </div>
      </form>
    </Modal>
  );
}

function Labelled({
  label,
  hint,
  error,
  children,
}: {
  label: string;
  hint?: string;
  error: string | null;
  children: React.ReactNode;
}) {
  return (
    // The wrapping label associates the text with the control, so no id plumbing.
    <label className="block space-y-1.5">
      <span className="block text-sm font-medium">{label}</span>
      {children}
      {hint ? <p className="text-xs text-muted">{hint}</p> : null}
      {error ? (
        <p className="text-sm text-[var(--ink-error)]">{error}</p>
      ) : null}
    </label>
  );
}
