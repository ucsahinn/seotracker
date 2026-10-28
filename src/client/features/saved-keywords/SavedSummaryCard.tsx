import { SavedSnapshotNumber } from "./SavedSnapshotNumber";

export function SavedSummaryCard({
  label,
  value,
  numericValue,
  note,
  onClick,
  disabled,
}: {
  label: string;
  value: string;
  numericValue?: number;
  note: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className="min-h-32 rounded-box border border-base-300 bg-base-100 p-4 text-left focus-visible:outline-2 focus-visible:outline-primary"
    >
      <span className="block text-xs text-muted">{label}</span>
      <strong className="my-2 block text-xl">
        {numericValue === undefined ? (
          value
        ) : (
          <SavedSnapshotNumber value={numericValue} />
        )}
      </strong>
      <span className="block text-xs text-muted">{note}</span>
    </button>
  );
}
