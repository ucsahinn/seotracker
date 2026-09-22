import { GooglePropertyPicker } from "@/client/features/integrations/GooglePropertyPicker";
type SiteOption = {
  siteUrl: string;
  permissionLevel: string;
  selectable: boolean;
  isSelected: boolean;
};

type AccountOption = {
  accountId: string;
  email: string | null;
  requiresReconnect: boolean;
  propertiesUnavailable: boolean;
  unavailableReason?: string | null;
  sites: SiteOption[];
};

export type GscSiteSelection = {
  accountId: string;
  siteUrl: string;
};

export function SitePicker(props: {
  readOnly?: boolean;
  loading: boolean;
  linking?: boolean;
  error: boolean;
  accounts: AccountOption[];
  selection: GscSiteSelection | null;
  onSelect: (selection: GscSiteSelection | null) => void;
  onSave: () => void;
  saving: boolean;
  onRetry: () => void;
  onReconnect: () => void;
  secondaryAction?: { label: string; onClick: () => void; disabled?: boolean };
}) {
  return (
    <GooglePropertyPicker
      {...props}
      provider="gsc"
      accounts={props.accounts.map((account) => ({
        ...account,
        unavailable: account.propertiesUnavailable,
        unavailableReason: account.unavailableReason ?? null,
        properties: account.sites.map((site) => ({
          id: site.siteUrl,
          name: site.siteUrl,
          selectable: site.selectable,
        })),
      }))}
      selection={
        props.selection
          ? {
              accountId: props.selection.accountId,
              propertyId: props.selection.siteUrl,
            }
          : null
      }
      onSelect={(selection) =>
        props.onSelect(
          selection
            ? {
                accountId: selection.accountId,
                siteUrl: selection.propertyId,
              }
            : null,
        )
      }
    />
  );
}
