import type { ReactNode } from 'react';
import { Header } from './Header';
import { PageBreadcrumb } from './PageBreadcrumb';

interface EditorialPageLayoutProps {
  readonly subtitle: string;
  readonly kicker: string;
  readonly title: string;
  readonly lead?: string;
  readonly meta?: ReactNode;
  readonly breadcrumbs: ReadonlyArray<{ label: string; to?: string }>;
  readonly children: ReactNode;
  readonly className?: string;
}

export function EditorialPageLayout({
  subtitle,
  kicker,
  title,
  lead,
  meta,
  breadcrumbs,
  children,
  className = '',
}: Readonly<EditorialPageLayoutProps>) {
  return (
    <>
      <Header subtitle={subtitle} />
      <PageBreadcrumb items={[...breadcrumbs]} />
      <main className={`editorial-page ${className}`.trim()}>
        <div className="editorial-page-shell">
          <header className="editorial-title-block">
            <p className="editorial-kicker">{kicker}</p>
            <h1 className="editorial-title">{title}</h1>
            {lead && <p className="editorial-lead">{lead}</p>}
            {meta && <div className="editorial-meta">{meta}</div>}
            <hr className="editorial-divider" />
          </header>
          <article className="editorial-content-measure editorial-prose">
            {children}
          </article>
        </div>
      </main>
    </>
  );
}
