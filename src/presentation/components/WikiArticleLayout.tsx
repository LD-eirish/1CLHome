import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Header } from './Header';
import { PageBreadcrumb } from './PageBreadcrumb';
import '../styles/library.css';

export interface WikiNavItem {
  label: string;
  href: string;
}

interface WikiArticleLayoutProps {
  readonly subtitle: string;
  readonly title: string;
  readonly lead: string;
  readonly breadcrumbs: Array<{ label: string; to?: string }>;
  readonly navItems: WikiNavItem[];
  readonly children: ReactNode;
  readonly lastUpdated?: string;
}

export function WikiArticleLayout({
  subtitle,
  title,
  lead,
  breadcrumbs,
  navItems,
  children,
  lastUpdated,
}: Readonly<WikiArticleLayoutProps>) {
  return (
    <>
      <Header subtitle={subtitle} />
      <PageBreadcrumb items={breadcrumbs} />
      <main className="wiki-page">
        <div className="wiki-page-shell">
          <aside className="wiki-sidebar">
            <p className="wiki-sidebar-kicker">Info Library</p>
            <Link to="/info-library" className="wiki-sidebar-home">1CL Info Library</Link>
            <p className="wiki-toc-label">Contents</p>
            <ol className="wiki-toc-list">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ol>
          </aside>

          <article className="wiki-content">
            <header className="wiki-article-header">
              <p className="wiki-article-kicker">Article</p>
              <h1 className="wiki-article-title">{title}</h1>
              <p className="wiki-article-lead">{lead}</p>
              {lastUpdated && <p className="wiki-article-meta">Last updated: {lastUpdated}</p>}
            </header>
            <div className="wiki-body">
              {children}
            </div>
          </article>
        </div>
      </main>
    </>
  );
}
