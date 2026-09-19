import * as React from "react";
import { useNavigate } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Modal } from "@/client/components/Modal";
import { getStandardErrorMessage } from "@/client/lib/error-messages";
import { setLastProjectId } from "@/client/lib/active-project";
import {
  DEFAULT_LOCATION_CODE,
  getLanguageCode,
} from "@/shared/keyword-locations";
import { ProjectMarketFields } from "@/client/features/projects/ProjectMarketFields";
import { createProject } from "@/serverFunctions/projects";

export function CreateProjectModal({ onClose }: { onClose: () => void }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [name, setName] = React.useState("");
  const [domain, setDomain] = React.useState("");
  const [market, setMarket] = React.useState({
    locationCode: DEFAULT_LOCATION_CODE,
    languageCode: getLanguageCode(DEFAULT_LOCATION_CODE),
  });

  const createMutation = useMutation({
    mutationFn: () =>
      createProject({
        data: {
          name: name.trim(),
          domain: domain.trim() || undefined,
          ...market,
        },
      }),
    onSuccess: async (created) => {
      setLastProjectId(created.id);
      await queryClient.invalidateQueries({ queryKey: ["projects"] });
      await queryClient.invalidateQueries({
        queryKey: ["dashboardActivation"],
      });
      onClose();
      toast.success("Proje oluşturuldu");
      // Continue setup through the new project’s dashboard.
      void navigate({
        to: "/p/$projectId",
        params: { projectId: created.id },
      });
    },
    onError: (error) =>
      toast.error(getStandardErrorMessage(error, "Proje oluşturulamadı")),
  });

  const isPending = createMutation.isPending;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (isPending) return;
    if (!name.trim()) {
      toast.error("Proje adı gerekli");
      return;
    }
    createMutation.mutate();
  };

  return (
    <Modal
      maxWidth="max-w-md"
      onClose={isPending ? undefined : onClose}
      labelledBy="create-project-title"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 id="create-project-title" className="text-lg font-semibold">
          Yeni proje
        </h2>

        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-medium">Ad</span>
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Acme Inc."
            maxLength={120}
            autoFocus
            className="input input-bordered w-full"
          />
        </label>

        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-medium">
            Alan adı <span className="text-muted">(isteğe bağlı)</span>
          </span>
          <input
            type="text"
            value={domain}
            onChange={(event) => setDomain(event.target.value)}
            placeholder="example.com"
            maxLength={255}
            className="input input-bordered w-full"
          />
          <span className="text-xs text-muted">
            Projeyi oluşturduktan sonra Search Console&apos;u bağlayın; arama ve
            sıralama verileri oradan gelir.
          </span>
        </label>

        <div className="flex flex-col gap-1.5">
          <ProjectMarketFields value={market} onChange={setMarket} />
          <span className="text-xs text-muted">
            Kaydettiğiniz anahtar kelimeler bu ülke ve dile göre saklanır.
            Sonradan proje ayarlarından değiştirebilirsiniz.
          </span>
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={onClose}
            disabled={isPending}
          >
            Vazgeç
          </button>
          <button
            type="submit"
            className="btn btn-primary btn-sm"
            disabled={isPending}
          >
            Proje oluştur
          </button>
        </div>
      </form>
    </Modal>
  );
}
