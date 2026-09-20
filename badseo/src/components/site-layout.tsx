import type { ReactNode } from "react";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <nav className="nav" aria-label="BadSEO navigation">
        <a className="brand" href="/">
          BADSEO
        </a>
        <span className="nav-links">
          <a href="https://github.com/ucsahinn/seotracker">
            seotracker on GitHub
          </a>
        </span>
      </nav>
      {children}
      <footer className="foot">
        <div className="foot-inner">
          <a className="foot-brand" href="/">
            BADSEO
          </a>
          <span className="foot-links">
            <a href="/#issues">All issues</a>
            <a href="https://github.com/ucsahinn/seotracker">
              seotracker on GitHub
            </a>
            <a href="/privacy">Privacy</a>
          </span>
        </div>
      </footer>
    </>
  );
}
