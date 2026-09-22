export function NotFound({ children }: { children?: React.ReactNode }) {
  return (
    <div className="space-y-2 p-4">
      <h1 className="text-2xl">404</h1>
      <div className="text-muted">
        {children || <p>Aradığınız sayfa bulunamadı.</p>}
      </div>
    </div>
  );
}
