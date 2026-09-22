type UnauthenticatedErrorCardProps = {
  message: string;
  onRetry?: () => void;
};

export function UnauthenticatedErrorCard({
  message,
  onRetry,
}: UnauthenticatedErrorCardProps) {
  return (
    <div className="card w-full max-w-md border border-base-300 bg-base-100 shadow-[var(--shadow-float)]">
      <div className="card-body gap-4">
        <h2 className="card-title">Kimlik doğrulaması gerekli</h2>
        <p className="text-sm text-muted">{message}</p>
        <p className="text-sm text-muted">
          Bu kurulum dış bir kimlik doğrulama katmanı kullanıyor. Oturumunuzu
          tazeleyip tekrar deneyin.
        </p>
        {onRetry ? (
          <div className="card-actions justify-end">
            <button className="btn btn-primary btn-sm" onClick={onRetry}>
              Yeniden dene
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
