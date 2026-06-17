import { ReactNode } from 'react';
import { Header } from './Header';
import { PageBreadcrumb } from './PageBreadcrumb';

export interface BotDocsNavItem {
  label: string;
  href: string;
}

interface BotDocsLayoutProps {
  readonly subtitle: string;
  readonly title: string;
  readonly lead: string;
  readonly breadcrumbs: Array<{ label: string; to?: string }>;
  readonly navItems: BotDocsNavItem[];
  readonly children: ReactNode;
  readonly versionNote?: string;
}

export function BotDocsLayout({
  subtitle,
  title,
  lead,
  breadcrumbs,
  navItems,
  children,
  versionNote,
}: Readonly<BotDocsLayoutProps>) {
  return (
    <>
      <Header subtitle={subtitle} />
      <PageBreadcrumb items={breadcrumbs} />
      <main className="docs-page">
        <section className="docs-page-shell">
          <aside className="docs-sidebar">
            <div className="docs-sidebar-header">
              <p className="docs-sidebar-kicker">Documentation</p>
              <h2 className="docs-sidebar-title">eirish's Foxhole Assistant Docs</h2>
              <p className="docs-sidebar-lead">{lead}</p>
            </div>
            <nav className="docs-sidebar-nav" aria-label="Documentation sections">
              <p className="docs-sidebar-nav-label">Contents</p>
              <ul>
                {navItems.map((item) => (
                  <li key={item.href}>
                    <a href={item.href}>{item.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <article className="docs-main docs-content">
            <header className="docs-page-header">
              <p className="docs-page-kicker">Feature</p>
              <h1 className="docs-page-title">{title}</h1>
              <p className="docs-page-summary">{lead}</p>
              {versionNote && <p className="docs-page-note">{versionNote}</p>}
            </header>
            {children}
          </article>
        </section>
      </main>
    </>
  );
}