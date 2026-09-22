import { GooglePropertyPicker } from "@/client/features/integrations/GooglePropertyPicker";
type PropertyOption = {
  propertyId: string;
  displayName: string;
  accountDisplayName: string;
  isSelected: boolean;
};

type AccountOption = {
  accountId: string;
  email: string | null;
  requiresReconnect: boolean;
  propertiesUnavailable: boolean;
  unavailableReason?: string | null;
  properties: PropertyOption[];
};

export type Ga4PropertySelection = {
  accountId: string;
  propertyId: string;
};

export function Ga4PropertyPicker(props: {
  readOnly?: boolean;
  loading: boolean;
  linking?: boolean;
  error: boolean;
  accounts: AccountOption[];
  selection: Ga4PropertySelection | null;
  onSelect: (selection: Ga4PropertySelection | null) => void;
  onSave: () => void;
  saving: boolean;
  onRetry: () => void;
  onReconnect: () => void;
  secondaryAction?: { label: string; onClick: () => void; disabled?: boolean };
}) {
  return (
    <GooglePropertyPicker
      {...props}
      provider="ga4"
      accounts={props.accounts.map((account) => ({
        ...account,
        unavailable: account.propertiesUnavailable,
        unavailableReason: account.unavailableReason ?? null,
        properties: account.properties.map((property) => ({
          id: property.propertyId,
          name: property.displayName,
          detail: `${property.accountDisplayName} · ${property.propertyId.replace(/^properties\//, "")}`,
          selectable: true,
        })),
      }))}
    />
  );
}
